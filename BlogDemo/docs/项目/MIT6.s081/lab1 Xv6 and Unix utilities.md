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

