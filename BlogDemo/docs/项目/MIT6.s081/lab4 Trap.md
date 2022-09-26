---
title: 操作系统lab4
date: 2022-09-26
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

