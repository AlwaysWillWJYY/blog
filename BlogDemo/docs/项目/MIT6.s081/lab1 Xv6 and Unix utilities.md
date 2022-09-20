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

