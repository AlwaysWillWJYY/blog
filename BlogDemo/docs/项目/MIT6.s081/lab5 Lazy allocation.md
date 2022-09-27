---
title: 操作系统lab5
date: 2022-09-27
publish: false
---

### 一、Eliminate allocation from sbrk()

* 实验描述

  * 你的第一个任务是将sbrk(n)系统调用的页面分配功能删除，sysproc.c中的sys_sbrk()函数就是该系统调用的具体实现。sbrk(n)将进程的内存大小增加n个字节，然后返回新分配区域的开始。你的新sbrk(n)应该只是将进程的大小(myproc()->sz)增加n并返回原来的size，它不应该分配内存，所以你应该删除对growproc()的调用(但你仍然需要增加进程的size)。

* 思路：修改**kernel/sysproc.c**中的`sys_sbrk()`函数，将原本调用的growproc()函数注释掉，然后让`myproc()->sz`增加`n`。 

  ```cpp
  uint64
  sys_sbrk(void)
  {
    int addr;
    int n;
    if(argint(0, &n) < 0)
      return -1;
    addr = myproc()->sz;
    /* 以前的，注释掉
    if(growproc(n) < 0)
      return -1;
    */
    //下面这行我们添加的
    myproc()->sz += n;
    
    return addr;
  }
  ```

* 结果

![在这里插入图片描述](https://img-blog.csdnimg.cn/3c29538d43514f369328919f7039fe0a.png)

### 二、Lazy allocation

* 实验描述
  * 修改trap.c中的代码，通过将新分配的物理内存页面映射到故障地址，然后返回用户空间让进程继续执行，来响应来自用户空间的页面故障。`您应该在产生“usertrap(): ...”消息的printf`调用之前添加代码。修改您需要的任何其他 xv6 内核代码以使`echo hi`工作。 

* 提示

  * 您可以通过查看 usertrap() 中的 r_scause() 是 13 还是 15 来检查错误是否是页面错误。
  * `r_stval()`返回 RISC-V `stval`寄存器，其中包含导致页面错误的虚拟地址。
  * 从 vm.c 中的 uvmalloc() 窃取代码，这是 sbrk() 调用的（通过 growproc()）。您需要调用 kalloc() 和 mappages()。
  * 使用 PGROUNDDOWN(va) 将错误的虚拟地址向下舍入到页面边界。
  * uvmunmap() 会恐慌；如果某些页面未映射，请修改它以不恐慌。
  * 如果内核崩溃，在 kernel/kernel.asm 中查找 sepc
  * 使用 pgtbl 实验室的`vmprint`函数打印页表的内容。
  * 如果您看到错误“incomplete type proc”，请包含“spinlock.h”，然后包含“proc.h”。

* 思路

  * 在**kernel/trap.c**中的usertrap()函数中添加对`r_scause()`为13或15情况的判断和处理。 

  ```cpp
  else if(r_scause() == 13 || r_scause() == 15)
  ```

  * 通过`r_stval()`可以知道此处就是导致page fault的虚拟地址，我们要在这里分配物理内存并进行映射，于是我们先记录该地址。同时根据实验提示，需要使用`PGROUNDDOWN`将错误的虚拟地址向下舍入到页面边界。 

  *  **kernel/vm.c**中的`uvmalloc`实现了内存分配与映射,将其中的代码复制到前面判断r_scause()为13或15那里，然后进行一些修改，我们这里只需要在指定位置分配1个page内存并完成映射即可。 

  ```cpp
  else if(r_scause == 13 || r_scause == 15){
      uint64 va = r_stval(); //引起pagefault的虚拟地址，需要分配物理内存并映射
      va = PGROUNDDOWN(va); //向下取整
      uint64 ka = (uint64)kalloc(); //分配内存
      if(ka == 0){  
        p->killed = 1; //分配物理内存失败，则杀死进程，且打印相关信息
        printf("usertrap(): kalloc() failed\n");
      }else{
        memset((void*)ka, 0, PGSIZE); //初始化置0
        if(mappages(p->pagetable, va, PGSIZE, ka, PTE_U | PTE_W| PTE_R) != 0)
        {
        //映射失败，则杀死进程，且打印相关信息
          kfree((void*)ka);
          printf("usertrap(): mappages() failed\n");
          p->killed = 1;
        }
      }
    } 
  ```

  * kernel/vm.c中的uvmunmap()会触发panic，这是因为我们实现的是lazy allocation，这些页面还未映射，page不存在。之后运行lazytests的时候还会产生uvmunmap: walk异常，也需要忽略。所以修改对应的两个函数，让它们在发现未映射的时候直接跳过就行了。

  ```cpp
  if((pte = walk(pagetable, a, 0)) == 0)
  // panic("uvmunmap: walk"); 注释掉
    continue;
  if((*pte & PTE_V) == 0)
  //panic("uvmunmap: not mapped"); 注释掉
    continue;
  ```

* 结果

![在这里插入图片描述](https://img-blog.csdnimg.cn/e869e3033f6a4c8a9e1b2f9ab4805a6b.png)

### 三、Lazytests and Usertests

* 实验描述

  * 我们为您提供了`lazytests`，这是一个xv6 用户程序，用于测试一些可能会给您的惰性内存分配器带来压力的特定情况。修改你的内核代码，让所有的`惰性测试` 和用户测试`都`通过。

* 实验提示

  * 处理sbrk()参数为负数的情况。 
  * 如果一个进程在高于任何使用 sbrk() 分配的虚拟内存地址上发生页面错误，则终止该进程。
  * 正确处理 fork() 中的父子内存副本。
  * 处理进程将有效地址从 sbrk() 传递给系统调用（例如读或写），但尚未分配该地址的内存的情况。
  * 正确处理内存不足：如果 kalloc() 在页面错误处理程序中失败，则终止当前进程。
  * 处理用户堆栈下方无效页面上的故障。
  * 如果你的内核通过了`lazytests`和`usertests`，则代表你的解决方案是正确的： 

* 思路:

  * 给sbrk添加处理参数为负数的情况。即dealloc相应的内存n，注意n不能大于p->sz。 

  ```cpp
  if(n < 0)
    {
      if(addr + n < 0) return -1;
      else uvmdealloc(myproc()->pagetable, myproc()->sz, myproc()->sz+n);  
    }
  ```

  * 如果读入的虚拟地址比p->sz大、读入的虚拟地址比进程的用户栈小、申请空间不够、映射失败的时候都需要终止进程。 

  ```cpp
  uint64 va = r_stval();
      if (va < p->sz && va > PGROUNDDOWN(p->trapframe->sp)){
  		uint64 ka = (uint64) kalloc();
          if (ka == 0) p->killed = -1; //分配内存失败
          else
          {
          	memset((void*)ka, 0, PGSIZE);
            	va = PGROUNDDOWN(va);
            	if (mappages(p->pagetable, va, PGSIZE, ka, PTE_U | PTE_W| PTE_R) != 0)
            	{
            		//映射失败
              	kfree((void*)ka);
              	p->killed = -1;
            	}
          }
      }
      else p->killed = -1; 	//读入的虚拟地址比p->sz大，比用户栈小
  ```

  * 需要处理**kernel/proc.c**的`fork()`函数中父进程向子进程拷贝时的Lazy allocation 情况。可以看到fork()是通过`uvmcopy()`将父进程页表向子进程拷贝的。对于`uvmcopy()`的处理和 `uvmunmap()`一致，只需要将PTE不存在和无效的两种情况由引发panic改为continue跳过即可。

    ```cpp
    if((pte = walk(old, i, 0)) == 0)
      //panic("uvmcopy: pte should exist");  //注释掉原来这行
      continue; //添加
    if((*pte & PTE_V) == 0)
      //panic("uvmcopy: page not present");  //注释掉原来这行
      continue; //添加
    ```

  * 当调用系统调用(如read、write)的时候，内核会访问未被分配的页表，此时不会进入usertrap， 所以这时需要分配内存。我们查看sys_read和sys_write的调用顺序可以发现：sys_read()->fileread()->readi()->either_copyout()->copyout()->walkaddr()。我们看看walkaddr()的代码

    ```cpp
    // Look up a virtual address, return the physical address,
    // or 0 if not mapped.
    // Can only be used to look up user pages.
    uint64
    walkaddr(pagetable_t pagetable, uint64 va)
    {
      pte_t *pte;
      uint64 pa;
    
      if(va >= MAXVA)
        return 0;
      pte = walk(pagetable, va, 0);
      if(pte == 0)
        return 0;
      if((*pte & PTE_V) == 0)
        return 0;
      if((*pte & PTE_U) == 0)
        return 0;
      pa = PTE2PA(*pte);
      return pa;
    }
    ```

    该函数实现的功能是：PTE无效、不存在、无PTE_U标志位时，都会返回0表示失败。现在我们需要添加Lazy allocation功能，所以PTE无效、不存在时需要分配、映射内存。将上面 **(2、)** 里面的代码部分重复处理一下即可。 

    ```cpp
    uint64
    walkaddr(pagetable_t pagetable, uint64 va)
    {
      pte_t *pte;
      uint64 pa;
      struct proc *p=myproc();  // lab5-3
    
      if(va >= MAXVA)
        return 0;
    
      pte = walk(pagetable, va, 0);
      if(pte == 0 || (*pte & PTE_V) == 0) {
        // va is on the user heap  
        if(va >= PGROUNDUP(p->trapframe->sp) && va < p->sz){
            char *pa;
            if ((pa = kalloc()) == 0) {
                return 0;
            }
            memset(pa, 0, PGSIZE);
            if (mappages(p->pagetable, PGROUNDDOWN(va), PGSIZE,
                         (uint64) pa, PTE_W | PTE_R | PTE_U) != 0) {
                kfree(pa);
                return 0;
            }
        } else {
            return 0;
        }
      }
      if((*pte & PTE_U) == 0)
        return 0;
      pa = PTE2PA(*pte);
      return pa;
    }
    ```

  *  需要在**vm.c**中先包含**spinlock.h**，然后包含**proc.h**。 

* 结果

![在这里插入图片描述](https://img-blog.csdnimg.cn/f697019640614f15befce489e3f64f34.png)

![在这里插入图片描述](https://img-blog.csdnimg.cn/8ebc6e4e949d4d4e9301c891f80a8631.png)

![在这里插入图片描述](https://img-blog.csdnimg.cn/9f515945f5b249bea7374171bacbd739.png)