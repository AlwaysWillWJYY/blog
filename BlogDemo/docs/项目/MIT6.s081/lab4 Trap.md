---
title: 操作系统lab4 Trap
date: 2022-09-27
publish: false
---

### 一、RISC-V assembly

* 实验描述

  * 了解一些RISC-V程序集很重要，你在6.004中接触过这些程序集。在你的xv6存储库中有一个文件user/call.c。使用make fs.img命令对其进行编译，并在user/call.asm中生成程序的可读汇编版本。
  * 阅读call.asm中函数g、f和main的代码。RISC-V的说明手册在参考地址上。以下是你应该回答的一些问题(将答案存储在文件answers-traps.txt中)：

  ```cpp
  user/_call:     file format elf64-littleriscv
  
  Disassembly of section .text:
  
  0000000000000000 <g>:
  #include "kernel/param.h"
  #include "kernel/types.h"
  #include "kernel/stat.h"
  #include "user/user.h"
  
  int g(int x) {
     0:	1141                	addi	sp,sp,-16
     2:	e422                	sd	s0,8(sp)
     4:	0800                	addi	s0,sp,16
    return x+3;
  }
     6:	250d                	addiw	a0,a0,3
     8:	6422                	ld	s0,8(sp)
     a:	0141                	addi	sp,sp,16
     c:	8082                	ret
  
  000000000000000e <f>:
  
  int f(int x) {
     e:	1141                	addi	sp,sp,-16
    10:	e422                	sd	s0,8(sp)
    12:	0800                	addi	s0,sp,16
    return g(x);
  }
    14:	250d                	addiw	a0,a0,3
    16:	6422                	ld	s0,8(sp)
    18:	0141                	addi	sp,sp,16
    1a:	8082                	ret
  
  000000000000001c <main>:
  
  void main(void) {
    1c:	1141                	addi	sp,sp,-16
    1e:	e406                	sd	ra,8(sp)
    20:	e022                	sd	s0,0(sp)
    22:	0800                	addi	s0,sp,16
    printf("%d %d\n", f(8)+1, 13);
    24:	4635                	li	a2,13
    26:	45b1                	li	a1,12
    28:	00000517          	auipc	a0,0x0
    2c:	7b050513          	addi	a0,a0,1968 # 7d8 <malloc+0xea>
    30:	00000097          	auipc	ra,0x0
    34:	600080e7          	jalr	1536(ra) # 630 <printf>
    exit(0);
    38:	4501                	li	a0,0
    3a:	00000097          	auipc	ra,0x0
    3e:	27e080e7          	jalr	638(ra) # 2b8 <exit>
  ```

  **问题**

  > **问：** 哪些寄存器包含函数的参数？例如，在main对printf的调用中，哪个寄存器保存了13？
  > **答：** `a0-a7`保存函数的参数，其中`a0-a1`还可以保存返回值。在对printf的调用中，13保存在`a2`中，由汇编代码中main函数中的`li a2,13`可以看出。 

  >**问：** main对应的汇编代码中对函数`f`的调用在哪里？ 对`g`的调用在哪里？(提示：编译器可能内联函数)
  >**答：** 没有调用。`g`被内联到`f`中，然后`f`又被内联到main中。由汇编代码中main函数中的`li a1,12`可以看出，直接将最后的结果12传递到了`a1`。 

  >问： 函数printf位于哪个地址？
  >答： 可以通过计算得到：
  >----auipc ra,0x0代表将当前立即数向右移动12位，然后加上pc寄存器的值，赋给ra寄存器。由于立即数为0，因此ra的值即为pc的值0x30。
  >----jalr 1536(ra)代表1536加上ra寄存器的值，然后赋值给pc。将1536转为16进制再加上0x30即为0x0000000000000630，也就是要跳转到printf的地址。

  > **问：** 在`jalr`到main中的printf之后，寄存器`ra`中有什么值？
  > **答：** `ra`寄存器用来保存函数执行以后的下一条指令的地址，因此`ra`寄存器应当存放从printf返回main函数的地址，为`0x38`。 

  >问： 运行以下代码
  >unsigned int i = 0x00646c72;
  >printf("H%x Wo%s", 57616, &i);
  >输出是什么？
  >答：
  >----%x表示以十六进制形式输出整数，因此首先将57616转为16进制数，为0xe110。
  >----%s表示按照字符的格式读取字符并输出，直到读取到 ‘\0’ 为止。RISC-V是小端字节序，因此在内存中存储的形式为0x726c6400。对应的ASCII值为0x72=‘r’，0x6c=‘l’，0x64=‘d’，0x00=‘\0’。
  >----因此最后printf输出的结果为"He110, World\0"。
  >问： 能够得到上述输出是由于RISC-V是小端序的。如果 RISC-V是大端序的，要实现同样的效果，需要将i设置为什么？需要将57616修改为别的值吗？
  >答： 不需要修改57616。i需要进行反转，即i=0x726c6400

  > **问：** 在下面的代码中，'y='之后会打印什么？(注意：答案不是特定值)为什么会发生这种情况？
  > `printf("x=%d y=%d", 3);`
  > **答：** printf需要接收2个参数，将第一个参数3放在`a1`中，第二个参数放在`a2`中。由于没有第二个参数，所有直接输出寄存器`a2`中的值。 

### 二、Backtrace

* 实验描述
  
*  对于调试来说，回溯通常很有用：当栈上的某一点发生错误，可以通过回溯得到上方的函数调用列表。现需要在**kernel/printf.c**中实现`backtrace()`函数，并在系统调用`sys_sleep`中插入对该函数的调用。然后在xv6中运行`bttest`，它会调用`sys_sleep`。 
  
* 思路

  *  将`backtrace`的原型添加到**kernel/defs.h**。 
  *  接着要将`backtrace`的定义添加到**kernel/printf.c**中。由于现在才开编写该函数，只知道首先要打印一行`backtrace:\n`。 
  *  xv6中用一个页来存储栈，且向低地址扩展，所以当fp到达最高地址时说明到达栈底； 返回地址位于`fp-8`处，前一个栈帧的帧指针位于`fp-16`。于是我们需要循环地打印返回地址，然后移动到前一个栈帧。 

  ```cpp
  void backtrace(void) {
    printf("backtrace:\n");
    uint64 fp = r_fp();
    while(fp < PGROUNDUP(fp))
    {
      uint64 ra = *(uint64*)(fp-8);
      printf("%p\n", ra);
      fp = *(uint64*)(fp-16);
    }
  }
  ```

  *  在**kernel/printf.c**的`painc`中添加`backtrace`的调用。 
  *  在**kernel/sysproc.c**中的系统调用`sys_sleep`里面也添加对`backtrace`的调用。 

* 结果

  ![在这里插入图片描述](https://img-blog.csdnimg.cn/70db26a1ccce47d4891563c5df649db7.png)

  ![在这里插入图片描述](https://img-blog.csdnimg.cn/044da5a06b4b44ea980d63898dd29098.png)

### 三、Alarm

* 实验要求

  在本练习中，你将向xv6添加一个功能，该功能会在进程使用CPU时定期提醒它。这对于想要限制占用CPU时间的计算绑定进程、想要计算但又想要采取一些定期操作的进程可能很有用。更通俗地讲，你将实现一种原始形式的用户级中断/故障处理程序。例如，你可以使用类似的东西来处理应用程序中的页面错误。如果它通过了警报测试和用户测试，则你的解决方案是正确的。
  ----你应该添加一个新的sigalarm(interval, handler)系统调用。如果应用程序调用sigalarm(n, fn)，那么在程序消耗每n个CPU时间“tick”之后，内核应该调用应用程序函数fn。当fn返回时，应用程序应该从中断的地方继续。在xv6中，tick是一个相当任意的时间单位，由硬件定时器产生中断的频率决定。如果应用程序调用sigalarm(0, 0)，内核应停止生成定期警报调用。
  ----你将在xv6存储库中找到文件user/alarmtest.c，将其添加到Makefile。在你添加sigalarm和sigreturn系统调用之前，它不会正确编译。

* test0: invoke handler 实验提示

  *  你需要修改 Makefile 以使**alarmtest.c**编译为xv6用户程序。 
  *  放入**user/user.h**的正确声明是： 
  *  更新**user/usys.pl**(生成**user/usys.S**)、**kernel/syscall.h**和**kernel/syscall.c**以允许`alarmtest`调用sigalarm和sigreturn系统调用。 
  * 现在，你的`sys_sigreturn`应该只返回0。
  * 你的`sys_sigalarm()`应该将警报间隔和指向处理函数的指针存储在`proc`结构(在**kernel/proc.h**中)的新字段中。 
  * 你需要跟踪自上次调用进程的警报处理程序以来已经过去了多少tick。为此，你还需要在`struct proc`中新加一个字段。你可以在**proc.c**中的`allocproc()`中初始化`proc`的各字段。 
  * 对于每个tick，硬件时钟都会强制中断，该中断在**kernel/trap.c**中的`usertrap()`中处理。 
  * 如果有计时器中断，但你只想操纵进程的警报tick，你需要以下代码 
  * 仅当进程有未完成的计时器时才调用警报函数。请注意，用户的警报函数的地址可能为0(例如，在**user/alarmtest.asm**中，`periodic`在地址0处)。 
  * 你需要修改`usertrap()`以便在进程的警报间隔到期时，用户进程执行处理函数。当RISC-V上的trap返回到用户空间时，是什么决定了用户空间代码恢复执行的指令地址？ 
  * 如果你告诉qemu只使用一个CPU，那么使用gdb查看trap会更容易。你可以通过运行下面指令实现。 
  * 如果alarmtest打印出“alarm!”，你就成功了。 

* 思路

  * 在Makefile的`UPROGS`中添加`$U/_alarmtest\` 
  * 在**user/user.h**中放入`sigalarm`和`sigreturn`的声明。 
  * 更新**user/usys.pl**(生成**user/usys.S**)。 
  * 更新**kernel/syscall.h** ,更新 **kernel/syscall.c** 
  * 在**kernel/sysproc.c**中编写`sys_sigreturn`，返回0。 
  * 将警报间隔和指向警报处理函数的指针存储在`proc`结构中。 

  ```cpp
  int interval;              // alarm interval time
  uint64 handler;            // alarm handle function
  uint64 ticks;                 // how many ticks have passed since the last call
  ```

  *  在**kernel/proc.c**中的`allocproc()`中初始化`proc`字段。 

  * 如果有时钟中断，我们操作进程的警报tick，因此在`if (which_dev==2)`情况下进行处理; 如果tick没到达设定的间隔，则将tick++;如果tick达到设定的间隔，则将tick清零，同时转去相应的处理程序handler。此处主要考虑如何调用处理函数handler。在usertrap中页表已经切换为内核页表，而handler仍然是用户页表的函数虚拟地址，因此不能直接调用。这里我们将p->trapfram->epc置为p->handler，这样在返回到用户空间时，程序计数器为handler定时函数的地址，便达到了执行定时函数的目的。(这里做的其实就是在内核态进行赋值，返回到用户态再执行。)

    ```cpp
    if(which_dev == 2){
      if(p->interval)
      {
        if(p->ticks == p->interval)
        {
          p->ticks = 0;
          p->trapframe->epc = p->handler;
        }
        p->ticks++;
      }
      yield();
    }
    ```

  * 最后，我们还需要来完成`sys_sigalarm`函数的定义。该函数主要完成对proc结构体中与警报程序相关的成员变量进行赋值。 

  ```cpp
  uint64 sys_sigalarm(void)
  {
    int interval;
    uint64 handler;
    struct proc * p;
    // sigalarm的第一个参数为ticks，第二个参数为void(*handler)()
    if(argint(0, &interval) < 0 || argaddr(1, &handler) < 0 || interval < 0) {
      return -1;
    }
    p = myproc();
    p->interval = interval;
    p->handler = handler;
    p->ticks = 0;
    return 0;
  }
  ```

* 结果

![在这里插入图片描述](https://img-blog.csdnimg.cn/cbada879a174453c8fc8a0dd6b058ba9.png)





* test1/test2(): resume interrupted code
* 实验描述

> ----有可能alarmtest在打印“alarm!”后在test0或test1中崩溃，或者alarmtest打印“test1 failed”，或者alarmtest退出而不打印“test1 pass”。
> ----要解决此问题，你必须确保在警报处理程序完成后，控制权返回到用户程序最初被定时器中断所中断的指令。
> ----你还必须确保寄存器内容恢复到它们在中断时保持的值，以便用户程序可以在警报后不受干扰地继续运行。
> ----最后，你应该在每次关闭后清零警报计数器，以便定期调用处理程序。
> ----我们已经为设计了一种解决方案：用户警报处理程序需要在完成后调用sigreturn系统调用。如alarmtest.c中的periodic。这意味着你可以将代码添加到usertrap和sys_sigreturn中，它们会协同工作以使用户进程在处理完警报后正确恢复。

* 提示：
  * 您的解决方案将要求你保存和恢复寄存器----你需要保存和恢复哪些寄存器才能正确恢复中断的代码？(提示：会很多) 
  * 当计时器关闭时，让`usertrap`在`struct proc`中保存足够的状态，以便`sigreturn`可以正确返回到被中断的用户代码。 
  * 防止对警报处理程序的重入调用----如果处理程序尚未返回，内核不应再次调用它。 test2对此会进行测试。 
  * 一旦你通过了test0、test1和test2，运行usertests以确保你没有破坏内核的任何其他部分。 

* 思路

  * 在proc结构体中添加一个指向trapframe副本的指针。 

  ```cpp
  struct proc {
  	int interval;              // alarm interval time
  	uint64 handler;            // alarm handle function
  	uint64 ticks;                 // how many ticks have passed since the last call
  	struct trapframe* trapframecopy; //添加
  }
  ```

  * 在**kernel/trap.c**的`usertrap`中覆盖`p->trapframe->epc`将trapframe的副本进行保存。同时，将之前调用`handler`后执行的`ticks=0`删除，以实现防止`handler`重入。 

  ```cpp
  // give up the CPU if this is a timer interrupt.
  if(which_dev == 2){
    if(p->interval)
    {
      if(p->ticks == p->interval)
      {
      p->trapframecopy = p->trapframe + 512;  
      memmove(p->trapframecopy,p->trapframe,sizeof(struct trapframe));    // 复制trapframe
      p->trapframe->epc = (uint64)p->handler;
      }
      p->ticks++;
    }
  ```

  * 在sys_sigreturn中将trapframecopy拷贝到原trapframe中。恢复后将trapframecopy置零，表示当前没有副本。同时在拷贝trapframecopy前做了一个地址判断，是为了防止用户程序未调用sigalarm便使用了该系统调用。此时没有trapframecopy是无效的，可以避免错误拷贝

    ```cpp
    uint64 sys_sigreturn(void) {
        struct proc* p = myproc();
        // trapframecopy must have the copy of trapframe
        if(p->trapframecopy != p->trapframe + 512) {
            return -1;
        }
        memmove(p->trapframe, p->trapframecopy, sizeof(struct trapframe));   // restore the trapframe
        p->ticks = 0;     // prevent re-entrant
        p->trapframecopy = 0;    // 置零
        return 0;
    }
    ```

* 结果

![在这里插入图片描述](https://img-blog.csdnimg.cn/0eb0aa7a1bc84c3db096a793aaef5063.png)

![在这里插入图片描述](https://img-blog.csdnimg.cn/364bffb50a7e48f59ddddab0ecb59744.png)

