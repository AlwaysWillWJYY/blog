---
title: 操作系统lab3
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

  *  在`allocproc`中有创建空用户页表的代码 

  ```cpp
  p->proc_kernel_pagetable = ukvminit();
    if(p->proc_kernel_pagetable == 0){
  	  freeproc(p);
  	  release(&p->lock);
  	  return 0;
  }
  ```

  