---
title: 操作系统lab3 Page tables
date: 2022-09-25
publish: false
---

## 一、Print a page table

* 内存布局代码：kern/memlayout.h
* 虚拟内存代码：kernel/vm.c
* 分配、释放物理内存代码：kernel/kalloc.c 

* 实验过程

  * 根据上面`vm.c`的`freewalk`，我们可以类似的写出完整的`vmprint`函数。 

  ```cpp
  void vmp(pagetable_t pagetable, uint64 level)
  {
    for(int i = 0; i < 512; i++)
    {
      pte_t pte = pagetable[i];
      if(pte & PTE_V)
      {
  	  for (int j = 0; j < level; ++j) {
          if (j == 0) printf("..");
          else printf(" ..");
        }
        uint64 child = PTE2PA(pte); // 通过pte映射下一级页表的物理地址
        //打印pte的编号、pte地址、pte对应的物理地址(下一级页表的物理地址)
        printf("%d: pte %p pa %p\n", i, pte, PTE2PA(pte));
        // 查看是否到了最后一级，如果没有则继续递归调用当前函数。
        if ((pte & (PTE_R | PTE_W | PTE_X)) == 0)
        {
          vmp((pagetable_t)child, level+1);
        }    
      }
    }
  }
  
  void vmprint(pagetable_t pagetable)
  {
    printf("page table %p\n", pagetable);
    vmp(pagetable, 1);
  }
  ```

  *  在**kernel/defs.h**中定义`vmprint`和`vmp`的原型。 

  ```cpp
  void vmp(pagetable_t pagetable, uint64 level);
  void vmprint(pagetable_t);
  ```

  *  在**exec.c**文件的`return argc;`之前添加以下代码，用于打印第一个进程的页表信息。 

  ```cpp
  //进程的pid=1代表是第一个进程
  if (p->pid == 1) {
  	vmprint(p->pagetable);
  }
  ```

* 结果

![在这里插入图片描述](https://img-blog.csdnimg.cn/bd37d1c4c24e437f8b436c07e045d272.png)

![在这里插入图片描述](https://img-blog.csdnimg.cn/8b40e4d81b00429b83450dac8405e5a5.png)

### 二、A kernel page table per process

* 实验背景
  
* xv6有一个独立的内核页表，每当在内核中执行操作时都会使用它。内核页表直接映射到物理地址，因此内核虚拟地址 x 直接映射到物理地址 x。xv6为每个进程的用户地址空间提供了一个单独的页表，仅包含该进程的用户内存的映射，从虚拟地址0开始。因为内核页表不包含这些映射，所以用户地址在内核中是无效的。因此，当内核需要使用通过系统调用传递的用户指针(例如，传递给write()的缓冲区指针)时，内核必须首先将指针转换为物理地址。本节和下一节的目标是允许内核直接使用用户指针。
  
* 实验目的

  * 你的第一项工作是修改内核，以便每个进程在内核中执行时都使用自己的内核页表副本。
  * 修改struct proc为每个进程维护一个内核页表，并修改调度器使其在切换进程时切换内核页表。对于这一步，每个进程的内核页表应该与现有的全局内核页表相同。
  * 如果usertests运行正确，你就通过了这部分的实验。

* 实验提示

  * 为进程添加一个代表内核页表的字段到struct proc。
  * 为一个新的进程生成内核页表的合理方法是实现kvminit的修改版本，该修改版本生成新页表，而不是修改kernel_pagetable。你需要从allocproc调用此函数。
  * 确保每个进程的内核页表都有该进程的内核栈的映射。在未修改的xv6中，所有内核栈都在procinit中设置。你需要将部分或全部功能移至allocproc。
  * 修改scheduler()以便将进程的内核页表加载到内核的satp寄存器中(请参阅kvminithart以获得灵感)。在调用w_satp()之后不要忘记调用sfence_vma()。
  * scheduler()应该在没有进程运行时使用kernel_pagetable。
  * 在freeproc中释放进程的内核页表。
  * 你将需要一种方法来释放页表，而无需同时释放叶物理内存页面。
  * vmprint在调试页表时可能会派上用场。
  * 修改xv6的函数或添加新的函数都可以。你可能至少需要在kernel/vm.c和kernel/proc.c中执行此操作。(但是，不要修改kernel/vmcopyin.c、kernel/stats.c、user/usertests.c和user/stats.c。）
  * 缺少页表映射可能会导致内核遇到页面错误。它将打印一个包含sepc=0x00000000XXXXXXXX的错误。你可以通过在kernel/kernel.asm中搜索XXXXXXXX来找出故障发生的位置。

* 思路:

  *   根据实验提示①，先去**kernen/proc.h**中查看`struct proc`,添加内核页表

  ```cpp
  pagetable_t proc_kernel_pagetable; 
  ```

  *  根据实验提示②，首先查看**kernel/vm.c**中的`kvminit`函数。该函数通过`kalloc`为内核创建一个空的页表，然后通过`kvmmap`完成直接映射操作。 

  ```cpp
  void
  ukvmmap(pagetable_t kpagetable,uint64 va, uint64 pa, uint64 sz, int perm)
  {
    if(mappages(kpagetable, va, sz, pa, perm) != 0)
      panic("ukvmmap");
  }
  
  pagetable_t ukvminit()
  {
    pagetable_t kpagetable = (pagetable_t)kalloc();
    memset(kpagetable, 0, PGSIZE);
  
    ukvmmap(kpagetable, UART0, UART0, PGSIZE, PTE_R | PTE_W);
    ukvmmap(kpagetable, VIRTIO0, VIRTIO0, PGSIZE, PTE_R | PTE_W);
    ukvmmap(kpagetable, CLINT, CLINT, 0x10000, PTE_R | PTE_W);
    ukvmmap(kpagetable, PLIC, PLIC, 0x400000, PTE_R | PTE_W);
    ukvmmap(kpagetable, KERNBASE, KERNBASE, (uint64)etext-KERNBASE, PTE_R | PTE_X);
    ukvmmap(kpagetable, (uint64)etext, (uint64)etext, PHYSTOP-(uint64)etext, PTE_R | PTE_W);
    ukvmmap(kpagetable, TRAMPOLINE, (uint64)trampoline, PGSIZE, PTE_R | PTE_X);
  
    return kpagetable;
  }
  ```

  *  将`ukvminit`和`ukvmmap`函数的声明添加在`kernel/defs.h`中，否则会链接不到这两个函数 

  ```cpp
  void ukvmmap(pagetable_t kpagetable, uint64 va, uint64 pa, uint64 sz, int perm);
  pagetable_t ukvminit();
  ```

  *  在`allocproc`中有创建空用户内核页表的代码 

  ```cpp
  p->proc_kernel_pagetable = ukvminit();
    if(p->proc_kernel_pagetable == 0){
  	  freeproc(p);
  	  release(&p->lock);
  	  return 0;
  }
  ```

  ```cpp
  char *pa = kalloc();
  if(pa == 0)
    panic("kalloc");
  uint64 va = KSTACK((int) (p - proc));
  ukvmmap(p->proc_kernel_pagetable,va, (uint64)pa, PGSIZE, PTE_R | PTE_W);
  p->kstack = va;
  ```
  
  * 进行到这一步，独立的用户进程内核页表创建完成了，进程对应的内核栈也已经映射完成了。下一步需要确保在切换进程时能够将对应进程的用户内核页表的地址载入SATP寄存器中，所以要在**kernel/proc.c**的`scheduler`函数中进行修改。 
  
  ```cpp
  void
  scheduler(void)
  {
    struct proc *p;
    struct cpu *c = mycpu();
    
    c->proc = 0;
    for(;;){
      // Avoid deadlock by ensuring that devices can interrupt.
      intr_on();
      
      int found = 0;
      for(p = proc; p < &proc[NPROC]; p++) {
        acquire(&p->lock);
        if(p->state == RUNNABLE) {
          // Switch to chosen process.  It is the process's job
          // to release its lock and then reacquire it
          // before jumping back to us.
          p->state = RUNNING;
          c->proc = p;
  				
  				
  		//在切换任务前，将用户内核页表替换到stap寄存器中
          w_satp(MAKE_SATP(p->proc_kernel_pagetable));
          // 清除快表缓存
          sfence_vma();
          swtch(&c->context, &p->context);   
          //该进程执行结束后，将SATP寄存器的值设置为全局内核页表地址
          kvminithart(); 
          
          
          c->proc = 0;
          found = 1;
        }
        release(&p->lock);
      }
  #if !defined (LAB_FS)
      if(found == 0) {
        intr_on();
        asm volatile("wfi");
      }
  #else
      ;
  #endif
    }
  }
  ```
  
  > 需要注意的是： 释放页表的第一步是先释放页表内的内核栈，因为页表内存储的内核栈地址本身就是一个虚拟地址，需要先将这个地址指向的物理地址进行释放。然后是释放页表，直接遍历所有的页表，释放所有有效的页表项即可，这个功能可以仿照freewalk函数。由于freewalk函数将对应的物理地址也直接释放了，我们这里释放的进程的内核页表仅仅只是用户进程的一个备份，释放时仅释放页表的映射关系即可，不能将真实的物理地址也释放了。因此不能直接调用freewalk函数，而是需要进行更改，我们创建一个针对释放进程内核页表的版本proc_freekernelpagetable。
  
  ```cpp
  void 
  proc_freekernelpagetable(pagetable_t pagetable){
    for (int i = 0; i < 512; ++i) {
      pte_t pte = pagetable[i];
      if ((pte & PTE_V)) {
        pagetable[i] = 0;
        if ((pte & (PTE_R | PTE_W | PTE_X)) == 0) {
          uint64 child = PTE2PA(pte);
          proc_freekernelpagetable((pagetable_t)child);
        }
      } else if (pte & PTE_V) {
        panic("proc free kernelpagetable : leaf");
      }
    }
    kfree((void*)pagetable);
  }
  
  static void
  freeproc(struct proc *p)
  {
    if(p->trapframe)
      kfree((void*)p->trapframe);
    p->trapframe = 0;
  
  // 删除内核栈
    if (p->kstack) {
      // 通过页表地址， kstack虚拟地址 找到最后一级的页表项
      pte_t* pte = walk(p->proc_kernel_pagetable, p->kstack, 0);
      if (pte == 0)
        panic("freeproc : kstack");
      // 删除页表项对应的物理地址
      kfree((void*)PTE2PA(*pte));
    }
    p->kstack = 0;
  
  
    if(p->pagetable)
      proc_freepagetable(p->pagetable, p->sz);
    p->pagetable = 0;
  
  
  // 删除kernel pagetable
    if (p->proc_kernel_pagetable) 
      proc_freekernelpagetable(p->proc_kernel_pagetable);
  
    p->sz = 0;
    p->pid = 0;
    p->parent = 0;
    p->name[0] = 0;
    p->chan = 0;
    p->killed = 0;
    p->xstate = 0;
    p->state = UNUSED;
  }
  ```
  
  * ```cpp
    //由于在这里调用了walk，所以要将walk声明在defs.h中
    pte_t * walk(pagetable_t pagetable, uint64 va, int alloc);
    ```

* 结果

  ![在这里插入图片描述](https://img-blog.csdnimg.cn/dfec26e2910c42ad9f2050e348186922.png)

  ![在这里插入图片描述](https://img-blog.csdnimg.cn/42585d5c7d174e2995a3e8d4d8cd1a13.png)

### 三、Simplify copyin/copyinstr

* 实验描述

内核的copyin函数读取用户指针指向的内存。copyin通过将这些指针转换为物理地址来实现这一点，内核可以直接取消引用。它通过在软件中遍历进程页表来执行此转换。你在这部分实验中的工作是将用户映射添加到每个进程的内核页表(在上一节中创建)，从而允许copyin(和相关的字符串函数copyinstr)直接取消引用用户指针。

* 条件

将kernel/vm.c中的copyin主体替换为对copyin_new的调用(在kernel/vmcopyin.c中定义)。对copyinstr和copyinstr_new执行相同的操作。将用户地址的映射添加到每个进程的内核页表，以便copyin_new和copyinstr_new工作。如果usertests运行正确并且所有的make Grade测试都通过了，那么你就通过了这个实验。
注：该方案依赖于用户虚拟地址范围，不与内核用于其自己的指令和数据的虚拟地址范围重叠。xv6使用从零开始的虚拟地址作为用户地址空间，幸运的是内核的内存从更高的地址开始。但是，这种方案确实将用户进程的最大大小限制为小于内核的最低虚拟地址。内核启动后，该地址是xv6中的0xC000000，即PLIC寄存器的地址。参见kernel/vm.c、kernel/memlayout.h中的kvminit()以及文中的图3-4。你需要修改xv6以防止用户进程变得大于PLIC地址。

* 实验提示
  * 先用对copyin_new的调用替换copyin()，然后让它工作，然后再转到copyinstr。
  * 在内核更改进程的用户映射的每一点，都以相同的方式更改进程的内核页表。 这些点包括fork()、exec()和sbrk()。
  * 不要忘记在userinit的内核页表中包含第一个进程的用户页表。
  * 用户地址的PTE在进程的内核页表中需要什么权限？(在内核模式下无法访问设置了PTE_U的页面)
  * 不要忘记上述PLIC限制。

* 思路:

  *  `copyin_new`和`copyinstr_new`是源码就有的，在**kernel/vmcopyin.c**中 , 现在需要先将`copyin_new`和`copyinstr_new`的声明添加到**kernel/defs.h**中 

  ```cpp
  int copyin_new(pagetable_t pagetable, char *dst, uint64 srcva, uint64 len);
  int copyinstr_new(pagetable_t pagetable, char *dst, uint64 srcva, uint64 max);
  
  
  int
  copyin(pagetable_t pagetable, char *dst, uint64 srcva, uint64 len)
  {
    return copyin_new(pagetable, dst, srcva, len);
  }
  
  int
  copyinstr(pagetable_t pagetable, char *dst, uint64 srcva, uint64 max)
  {
    return copyinstr_new(pagetable, dst, srcva, max);
  }
  ```

  *  `fork`、`exec`和`growproc`(`sbrk`通过`growproc`完成内存伸缩)会改变进程的用户页表，需要加上随之改变进程的内核页表的功能，即将进程的用户页表的映射关系复制一份到进程的内核页表中。具体的赋值操作可参考`uvmcopy`，其作用是在fork子进程时，拷贝父进程的页表。 并且在defs.h中声明.

   ```cpp
  int
  uvmcopy_not_physical(pagetable_t old, pagetable_t new, uint64 begin, uint64 end)
  {
    pte_t *pte, *newPte;
    uint64 pa, i;
    uint flags;
    char *mem;
  
    for(i = PGROUNDDOWN(begin); i < end; i += PGSIZE){
      if((pte = walk(old, i, 0)) == 0)
        panic("uvmcopy_not_physical: pte should exist");
      if((newPte = walk(new, i, 1)) == 0)
        panic("uvmcopy_not_physical:page not present");
      pa = PTE2PA(*pte);
      flags = PTE_FLAGS(*pte) & (~PTE_U);
  
      *newPte = PA2PTE(pa) | flags;
    }
    return 0;
  }
   ```

  fork代码:

  ```cpp
    // Copy user memory from parent to child.
    if(uvmcopy(p->pagetable, np->pagetable, p->sz) < 0 || uvmcopy_not_physical(np->pagetable, np->proc_kernel_pagetable, 0, p->sz) < 0){
      freeproc(np);
      release(&np->lock);
      return -1;
    }
  ```

  exec代码:

  ```cpp
  //在映射之前要先检测程序大小是否超过PLIC，防止remap。同时，映射前要先清除[0，PLIC]中原本的内容，再将要执行的程序映射到[0，PLIC]中。
  
    if((sz1 = uvmalloc(pagetable, sz, ph.vaddr + ph.memsz)) == 0)
       goto bad;
  
     // 添加检测，防止程序大小超过 PLIC
     if(sz1 >= PLIC)
       goto bad;
  
    ------
      
    // Commit to the user image.
    oldpagetable = p->pagetable;
    p->pagetable = pagetable;
  
  
  //  清除内核页表中对程序内存的旧映射，然后重新建立映射。
    uvmunmap(p->proc_kernel_pagetable, 0, PGROUNDDOWN(p->sz)/PGSIZE, 0);
    uvmcopy_not_physical(pagetable, p->proc_kernel_pagetable, 0, sz);
  
  
    p->sz = sz;
    p->trapframe->epc = elf.entry;  // initial program counter = main
    p->trapframe->sp = sp; // initial stack pointer
    proc_freepagetable(oldpagetable, oldsz);
  }
  ```

  *  在**sysproc.c**中的`sys_sbrk`中可以发现，执行内存相关的函数为`growproc`。 

  ```cpp
  int
  growproc(int n)
  {
    uint sz;
    struct proc *p = myproc();
  
    sz = p->sz;
    if(n > 0){
      if(PGROUNDDOWN(sz + n) >= PLIC)
        return -1;
      if((sz = uvmalloc(p->pagetable, sz, sz + n)) == 0) {
        return -1;
      }
      uvmcopy_not_physical(p->pagetable, p->proc_kernel_pagetable, p->sz, sz);
    } else if(n < 0){
      sz = uvmdealloc(p->pagetable, sz, sz + n);
  	
  	// 缩小 kernel_pagetable 的相应映射
      int newsz = p->sz + n;
      if(PGROUNDDOWN(newsz) < PGROUNDUP(p->sz))
      {
        int npages = (PGROUNDUP(p->sz) - PGROUNDUP(newsz)) / PGSIZE;
        uvmunmap(p->proc_kernel_pagetable, PGROUNDUP(newsz), npages, 0);
      }
  
    }
    p->sz = sz;
    return 0;
  }
  
  //userinit的内核页表中包含第一个进程的用户页表。
  uvmcopy_not_physical(p->pagetable, p->proc_kernel_pagetable, 0, p->sz);
  ```

* xv6工作目录中执行make grade结果：

![在这里插入图片描述](https://img-blog.csdnimg.cn/df0632bc66ab4e71889154b44af1f369.png)