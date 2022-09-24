---


title: 操作系统lab1
date: 2022-09-16
publish: false
---

## 概览

* **[参考文档](https://mit-public-courses-cn-translatio.gitbook.io/mit6-s081/)**
* **[xv6 book](https://pdos.csail.mit.edu/6.828/2020/xv6/book-riscv-rev1.pdf)**

在安装好环境后就可以开始实验了。这部分的实验主要是写五个系统调用的命令，分别是 `sleep`, `pingpong`, `primes`, `find` 和 `xargs`。建议先看一下上述`xv6`的第一章，主要看一下 `1.1-1.3` 

### 任务一(sleep)

这是最简单的一个任务，直接调用提供的 `sleep` 方法即可，纯属为了好上手。头文件参考其他的 `user` 目录下的 `.c` 文件即可。 

```c
#include "kernel/types.h"
#include "kernel/stat.h"
#include "user/user.h"
int main(int argc, char *argv[])
{
  if (argc < 2)
  {
	fprintf(2, "Usage: sleep time...\n");
	exit(1);
  }
  int time = atoi(argv[1]);
  sleep(time);
  exit(0);
}
```

 在写完 `.c` 代码后，需要在 `Makefile` 文件中的 `UPROGS` 字段中添加 `$U/_[sleep]\`，然后才能使用 `./grade-lab-util` 进行测试。 

![在这里插入图片描述](https://img-blog.csdnimg.cn/2852aae1b21946fe9d578c7bf9297f54.png)

### 任务二(pingpong)

使用 `pipe()` 和 `fork()` 实现父进程发送一个字符，子进程成功接收该字符后打印 `received ping`，再向父进程发送一个字符，父进程成功接收后打印 `received pong`。 

* 文件描述符

这里需要懂得什么是文件描述符。在 Linux 操作系统中，一切皆文件，内核通过文件描述符访问文件。每个进程都会默认打开3个文件描述符,即0、1、2。其中0代表标准输入流（`stdin`）、1代表标准输出流（`stdout`）、2代表标准错误流（`stderr`）。可以使用 > 或 >> 的方式重定向。

* 管道

管道是操作系统进程间通信的一种方式，可以使用 pipe() 函数进行创建。有在管道创建后，就有两个文件描述符，一个是负责读，一个是负责写。两个描述符对应内核中的同一块内存，管道的主要特点：

数据在管道中以字节流的形式传输，由于管道是半双工的，管道中的数据只能单向流动。

管道只能用于具有亲缘关系的进程通信，父子进程或者兄弟进程。

在 fork() 后，父进程和子进程拥有相同的管道描述符，通常为了安全起见，我们关闭一个进程的读描述符和另一个进程的写描述符，这样就可以让数据更安全地传输。

```c
#include "kernel/types.h"
#include "user/user.h"

int main(int argc, char *argv[]) {
  int p1[2], p2[2];
  char buffer[] = {'l'};
  int len = sizeof(buffer);
  //父进程写，子进程读的管道
  pipe(p1);
  //子进程写，父进程读的管道
  pipe(p2);
  if (fork() == 0) {
	close(p1[1]);
	close(p2[0]);
    //子进程从pipe1的读端读取字符数组
	if (read(p1[0], buffer, len) != len) {
	  printf("child read error!\n");
	  exit(1);
	}
	printf("%d: received ping\n", getpid());
    //子进程向pipe2的写端，写入字符数组
	if (write(p2[1], buffer, len) != len) {
	  printf("child write error\n");
	  exit(1);
	}
	exit(0);
  } else {//父进程
	close(p1[0]);
	close(p2[1]);
    //父进程向pipe1的写端，写字符数组
	if (write(p1[1], buffer, len) != len) {
	  printf("parent write error!\n");
	  exit(1);
	}
    //父进程从pipe2的读端，读字符数组
	if (read(p2[0], buffer, len) != len) {
	  printf("parent read error!\n");
	  exit(1);
	}
	printf("%d: received pong\n");
	exit(0);
  }
  exit(0);
}
```

结果:

![在这里插入图片描述](https://img-blog.csdnimg.cn/cf127783a27f4ce9a5c413cd0d221d35.png)

### 任务三（primes）

* 将2-35中的素数打印出来，要求利用管道理念。 每次得到一个素数时，在所有小于 n 的数中，删除它的倍数，然后不断迭代，剩下的就全是素数了。
* 实现思想是，只要还没获取到所有的素数，便不断遍历/递归。每次递归时：
  * 先在父进程中创建一个子进程。
  * 利用子进程将剩下的所有数全都写到管道中。
  * 在父进程中，将数不断读出来，管道中第一个数一定是素数，然后删除它的倍数（如果不是它的倍数，就继续更新数组，同时记录数组中目前已有的数字数量）。

```c
#include "kernel/types.h"
#include "user/user.h"

#define INDEX_READ 0
#define INDEX_WRITE 1

//创建函数是因为会反复调用这个函数（递归）
void child(int fds_p2c[])
{
    //通讯方向：父进程到子进程，子进程不需要写
    close(fds_p2c[INDEX_WRITE]);

    int i;
    if (read(fds_p2c[INDEX_READ], &i, sizeof(i)) == 0)
    {
        //如果已经读不到数字了，说明已经全部素数都输出完毕了。这个时候子进程可以关闭管道，直接退出。
        close(fds_p2c[INDEX_READ]);
        exit(0);
    }
    printf("prime %d\n", i);
    int num = 0;
    //子进程到孙子进程的管道
    int fds_c2gc[2];
    pipe(fds_c2gc);
    int pid;
    //孙子进程,递归调用本函数
    if ((pid = fork()) == 0)
    {
        child(fds_c2gc);
    }
    //子进程
    else
    {
        //通讯方向：子进程到孙子进程，子进程不需要读
        close(fds_c2gc[INDEX_READ]);
        while (read(fds_p2c[INDEX_READ], &num, sizeof(num)) > 0)
        {
            //如果可以不整除才发出去
            if (num % i != 0)
            {
                write(fds_c2gc[INDEX_WRITE], &num, sizeof(num));
            }
        }
        close(fds_c2gc[INDEX_WRITE]);
        //一样要等待所有的子进程结束
        wait(0);
    }

    //子进程结束
    exit(0);
}

int main(int argc, char *argv[])
{
    int fds_p2c[2]; //父进程到子进程
    pipe(fds_p2c);
    int pid;
    //子进程
    if ((pid = fork()) == 0)
    {
        child(fds_p2c);
    }
    //父进程
    else
    {
        //通讯方向：父进程到子进程，子进程不需要读
        close(fds_p2c[INDEX_READ]);
        for (int i = 2; i <= 35; i++)
        {
            //传i的地址
            write(fds_p2c[INDEX_WRITE], &i, sizeof(i));
        }

        //必须关闭管道，否则子进程在read函数阻塞
        close(fds_p2c[INDEX_WRITE]);

        //等待子进程结束
        wait(0);
    }

    //父进程结束
    exit(0);
}
```

### 任务四、find

* stat是文件信息的结构体 , 可以根据type区分是目录还是具体文件（linux中目录也是文件） 
* fstat(fd, &st)可以将fd文件描述符（int类型）指向的文件的stat结构体信息赋值到st中。 
* stat(path, &st) ,其中path为char*,表示某文件的路径，st为stat结构体.将该文件的stat结构体信息赋值到st中。
* fmtname（./a.txt)将path后面的文件名a.txt输出
* memmove(p, de.name, DIRSIZ), 将de.name所指向地址的前DIRSIZ个字节拷贝到p所指向的地址中。

```c
#include "kernel/types.h"
#include "kernel/fcntl.h"
#include "kernel/stat.h"
#include "kernel/fs.h"
#include "user/user.h"

/*
	将路径格式化为文件名
*/
char* fmt_name(char *path){
  static char buf[DIRSIZ+1];
  char *p;

  // Find first character after last slash.
  for(p=path+strlen(path); p >= path && *p != '/'; p--);
  p++;
  memmove(buf, p, strlen(p)+1);
  return buf;
}
/*
	系统文件名与要查找的文件名，若一致，打印系统文件完整路径
*/
void eq_print(char *fileName, char *findName){
	if(strcmp(fmt_name(fileName), findName) == 0){
		printf("%s\n", fileName);
	}
}
/*
	在某路径中查找某文件
*/
void find(char *path, char *findName){
	int fd;
	struct stat st;	
	if((fd = open(path, O_RDONLY)) < 0){
		fprintf(2, "find: cannot open %s\n", path);
		return;
	}
	if(fstat(fd, &st) < 0){
		fprintf(2, "find: cannot stat %s\n", path);
		close(fd);
		return;
	}
    //buf是用来记录文件前缀的，这样才会打印出之前的目录
	char buf[512], *p;	
	struct dirent de;
	switch(st.type){	
		case T_FILE:
			eq_print(path, findName);			
			break;
		case T_DIR:
			if(strlen(path) + 1 + DIRSIZ + 1 > sizeof buf){
				printf("find: path too long\n");
				break;
			}
			strcpy(buf, path);
			p = buf+strlen(buf);
            //在末尾添加/ 比如 path为 a/b/c 经过这步后变为 a/b/c/<-p
			*p++ = '/';
            // 如果是文件夹，则循环读这个文件夹里面的文件
			while(read(fd, &de, sizeof(de)) == sizeof(de)){
				if(de.inum == 0 || de.inum == 1 || strcmp(de.name, ".")==0 || strcmp(de.name, "..")==0)
					continue;	
                //拼接出形如 a/b/c/de.name 的新路径(buf)
				memmove(p, de.name, strlen(de.name));
				p[strlen(de.name)] = 0;
                //递归进行查找
				find(buf, findName);
			}
			break;
	}
	close(fd);	
}

int main(int argc, char *argv[]){
	if(argc < 3){
		printf("find: find <path> <fileName>\n");
		exit(0);
	}
	find(argv[1], argv[2]);
	exit(0);
}
```

### 任务五、xargs实验

实现类似unix xargs类似功能，比如echo hello too|xargs echo bye，要输出bye hello too；
即等价于echo bye hello too，将上个命令输出的每行作为参数，拼接到xargs后面的指令后面。
echo hello too输出为hello too，将其拼接到echo bye后面，就是echo bye hello too。

```c
#include "kernel/types.h"
#include "user/user.h"

int main(int argc, char* argv[]) {
  if (argc < 2) {
    printf("xargs <command>\n");
    exit(1);
  }

  // 添加命令运行参数的二维数组
  char* commandArgv[32];
  int commandSize = argc - 1;
  // 将原本argv中的参数拷贝到新的参数数组中
  for (int i = 0; i < commandSize; ++i) {
    commandArgv[i] = argv[i + 1];
  }

  char inputBuffer[512]; // 输入缓冲
  char inputChar; // 输入字符
  int inputNum = 0; // 输入字符计数
  while (read(0, &inputChar, sizeof(char)) > 0) {
    if (inputChar == '\n') { // 遇到回车时执行
      // 将当前指令添加到运行参数的二维数组中
      inputBuffer[inputNum] = 0; // 在字符数组最后添加'\0'
      commandArgv[commandSize++] = inputBuffer; // 将标准输入获取的参数拼接到参数数组中 
      commandArgv[commandSize] = 0; // 添加参数数组的结尾
      if (fork() == 0) {
        exec(argv[1], commandArgv); // 子进程中执行目标命令
      }
      wait(0); // 等待子进程命令执行结束
      commandSize = argc - 1; // 初始化，保留argv中参数，准备执行下一行
      inputNum = 0;
    } else if (inputChar == ' ') {
      inputBuffer[inputNum++] = 0; // 遇到空格添加分割符
    } else {
      inputBuffer[inputNum++] = inputChar; // 正常字符输入
    }
  }
  exit(0);
}
```



![在这里插入图片描述](https://img-blog.csdnimg.cn/31d8ecb31acd494ea32eb94f596eb106.png)