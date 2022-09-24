---
title: 操作系统lab2
date: 2022-09-24
publish: false
---

### 任务一、System call tracing

* 将相应的文件添加到*user/user.h*和*user/usys.pl*中，向*kernel/syscall.h*文件中添加本实验所需要添加的系统调用号。
* 向*kernel/sysproc.c*中添加系统调用函数*sys_trace*，以及需要在进程的结构体中，新建一个变量Mask由低位开始偏移系统调用号个bit的值(通过观察*syscall.h*文件以及题目中给的case可以发现系统调用号对应二进制的bit)。
* 还需要在*kernel/proc.c/fork*函数中使得子进程继承父进程的Mask属性。
* 参照*kernel/syscall.c*中别的系统调用，通过阅读*user/trace.c*代码，使用*argint*函数来提取命令行中的第一个参数作为掩码赋给进程属性Mask，还需要定义系统调用号对应的系统调用名数组。
* 需要注意的点，a0作为返回值且a7作为系统调用号，在*trace*调用后打印信息时需要用到

```cpp
struct proc {
  // ...
  int mask;	   		             // mask for trace system call
};
```

在kernel/sysproc.c中添加sys_trace函数，从用户栈中取出mask，并保存到当前进程的proc结构体中。

```cpp
uint64
sys_trace(void)
{
  int mask;
  
  if(argint(0, &mask) < 0)
    return -1;
    
  myproc()->mask = mask;
  return 0;
}
```

 由于我们要跟踪的是各个系统调用，因此我们需要在syscall函数（kernel/syscall.c）中添加处理逻辑。 

```cpp
void
syscall(void)
{
  int num;
  struct proc *p = myproc();
 
  num = p->trapframe->a7;    // 系统调用编号
  if(num > 0 && num < NELEM(syscalls) && syscalls[num]) {
    p->trapframe->a0 = syscalls[num]();
    // 当前系统调用需要被跟踪，打印相关信息
    if(p->mask && ((p->mask >> num) & 1)){
    	printf("%d: syscall %s -> %d\n", 
    					p->pid, syscall_nums[num], p->trapframe->a0);
		}
  } else {
    printf("%d %s: unknown sys call %d\n",
            p->pid, p->name, num);
    p->trapframe->a0 = -1;
  }
}

//子进程继承父进程mask
np->mask = p->mask;
```

 还有最后一步，添加系统调用编号。 

```cpp
static uint64 (*syscalls[])(void) = {
// ..
[SYS_trace]   sys_trace,
};
 
static char *syscall_nums[] = {
//..
"trace",
};
```



![](https://img-blog.csdnimg.cn/983bd50c947f412399af0e00efd2d9f2.png)

### 任务二、Sysinfo

添加一个系统调用sysinfo，它收集有关正在运行的系统的信息。

系统已经给出sysinfo将要用到的sysinfo结构体定义：

```cpp
struct sysinfo {
  uint64 freemem;   // amount of free memory (bytes)
  uint64 nproc;     // number of process
};
```

* #### user/user.h中声明系统调用和结构体

  * 声明结构体

  ```cpp
  struct stat;
  struct rtcdate;
  struct sysinfo;
  ```

  *  声明系统调用 

  ```cpp
  // system calls
  int fork(void);
  int exit(int) __attribute__((noreturn));
  int wait(int*);
  int pipe(int*);
  int write(int, const void*, int);
  int read(int, void*, int);
  int close(int);
  int kill(int);
  int exec(char*, char**);
  int open(const char*, int);
  int mknod(const char*, short, short);
  int unlink(const char*);
  int fstat(int fd, struct stat*);
  int link(const char*, const char*);
  int mkdir(const char*);
  int chdir(const char*);
  int dup(int);
  int getpid(void);
  char* sbrk(int);
  int sleep(int);
  int uptime(void);
  int trace(int);
  int sysinfo(struct sysinfo*);
  ```

* #### 添加entry

  * 在 `user/usys.pl`中，添加`entry("sysinfo")` 

  ```cpp
  entry("fork");
  entry("exit");
  entry("wait");
  entry("pipe");
  entry("read");
  entry("write");
  entry("close");
  entry("kill");
  entry("exec");
  entry("open");
  entry("mknod");
  entry("unlink");
  entry("fstat");
  entry("link");
  entry("mkdir");
  entry("chdir");
  entry("dup");
  entry("getpid");
  entry("sbrk");
  entry("sleep");
  entry("uptime");
  entry("trace");
  entry("sysinfo");
  ```

* ####  添加系统调用编号

  *  在`kernel/syscall.h`中，添加`#define SYS_sysinfo 23`

* #### 添加全局声明

  *  在`kernel/syscall.c`中，添加`extern uint64 sys_sysinfo(void);` 

* ####  添加系统调用表

  *  在`kernel/syscall.c`中，添加`[SYS_trace] sys_trace,`

* #### 实现sysinfo的功能

  * 获取空闲内存

  ```cpp
  // 计算空闲内存
  uint64 cnt_free_mem(void){
    acquire(&kmem.lock);  //上锁
    uint64 free_mem_count = 0;
  
    struct run *r = kmem.freelist;
    while(r){
      free_mem_count += PGSIZE;
      r = r->next;
    }
    release(&kmem.lock);
    return free_mem_count;
  }
  ```

  * 将该函数放到kernel/defs.h中声明

* 

* 

* 

* 

* 

  