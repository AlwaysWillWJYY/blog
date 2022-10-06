---
title: 操作系统lab10 mmap
date: 2022-10-06
publish: false
---

## mmap

### 要点:

* 实现只考虑内存映射文件的 mmap 和 munmap 系统调用.
* mmap 参数 addr 一直为 0, 由内核决定映射文件的虚拟地址.
* mmap 参数 flags 只考虑 MAP_SHARED 和 MAP_PRIVATE.
* mmap 使用懒分配进行内存映射.
* 定义一个 VMA 结构体来描述一块虚拟内存的信息. 可以用定长数组记录.

### 步骤

* `Makefile` 修改和系统调用定义

  * 在 `Makefile` 中添加 `$U/_mmaptest` 
  * 添加有关 `mmap` 和 `munmap` 系统调用的定义声明. 包括 `kernel/syscall.h`, `kernel/syscall.c`, `user/usys.pl` 和 `user/user.h`. 
  * 定义 `vm_area` 结构体及其数组

* 定义 `vm_area` 结构体及其数组

  * 在 kernel/proc.h 中定义 struct vm_area 结构体.
    vm_area 即 Virtual Memory Area, VMA, 此处用于表示使用 mmap 系统调用文件映射的虚拟内存的区域的位置、大小、权限等(实际上在 Linux 中会用来表示整个虚拟内存区域的相关信息, 包括堆、栈等, 而在此部分实验中出于简单考虑只用于表示文件映射部分内存).
    struct vm_area 中具体记录的内存信息和 mmap 系统调用的参数基本对应, 包括映射的起始地址、映射内存长度(大小)、权限、mmap 标志位、文件偏移以及指向的文件结构体指针.

    ```cpp
    struct vm_area {
        uint64 addr;    // mmap address
        int len;    // mmap memory length
        int prot;   // permission
        int flags;  // the mmap flags
        int offset; // the file offset
        struct file* f;     // pointer to the mapped file
    };
    ```

  * 在 struct proc 结构体中定义相关字段.
    处于简单, 根据实验指导的提示, 对于每个进程都使用一个 VMA 的数组来记录映射的内存(实际上根据 Linux 的相关实现, 使用链表效果会更好).
    此处定义了 NVMA 表示 VMA 数组的大小. 并在 struct proc 结构体中定义了 vma 数组, 且容易知道 VMA 是进程的私有字段, 因此对于 xv6 的进程单用户线程的系统, 访问 VMA 是无需加锁的.

    ```cpp
    #define NVMA 16     
    
    // Per-process state
    struct proc {
      // ...
      struct inode *cwd;           // Current directory
      char name[16];               // Process name (debugging)
      struct vm_area vma[NVMA];   
    };
    ```

* 编写 `mmap` 系统调用

  *  在 `kernel/sysfile.c` 中实现系统调用 `sys_mmap()`. 

  ```cpp
  //在kernel/memlayout.h 中定义了 MMAPMINADDR 宏定义, 用于表示 mmap 可以用于映射的最低地址
  #define MMAPMINADDR (TRAPFRAME - 10 * PGSIZE)
  
  // lab10
  uint64 sys_mmap(void) {
    uint64 addr;
    int len, prot, flags, offset;
    struct file *f;
    struct vm_area *vma = 0;
    struct proc *p = myproc();
    int i;
  
    if (argaddr(0, &addr) < 0 || argint(1, &len) < 0
        || argint(2, &prot) < 0 || argint(3, &flags) < 0
        || argfd(4, 0, &f) < 0 || argint(5, &offset) < 0) {
      return -1;
    }
    if (flags != MAP_SHARED && flags != MAP_PRIVATE) {
      return -1;
    }
    // the file must be written when flag is MAP_SHARED
    if (flags == MAP_SHARED && f->writable == 0 && (prot & PROT_WRITE)) {
      return -1;
    }
    // offset must be a multiple of the page size
    if (len < 0 || offset < 0 || offset % PGSIZE) {
      return -1;
    }
  
    // allocate a VMA for the mapped memory
    for (i = 0; i < NVMA; ++i) {
      if (!p->vma[i].addr) {
        vma = &p->vma[i];
        break;
      }
    }
    if (!vma) {
      return -1;
    }
  
    // assume that addr will always be 0, the kernel 
    //choose the page-aligned address at which to create
    //the mapping
    addr = MMAPMINADDR;
    for (i = 0; i < NVMA; ++i) {
      if (p->vma[i].addr) {
        // get the max address of the mapped memory  
        addr = max(addr, p->vma[i].addr + p->vma[i].len);
      }
    }
    addr = PGROUNDUP(addr);
    if (addr + len > TRAPFRAME) {
      return -1;
    }
    vma->addr = addr;   
    vma->len = len;
    vma->prot = prot;
    vma->flags = flags;
    vma->offset = offset;
    vma->f = f;
    filedup(f);     // increase the file's reference count
  
    return addr;
  }
  ```

* 编写 page fault 处理代码

  由于在 sys_mmap() 中对文件映射的内存采用的是 Lazy allocation, 因此需要对访问文件映射内存产生的 page fault 进行处理. 和之前 Lazy allocation 和 COW 的实验相同, 即修改 kernel/trap.c 中 usertrap() 的代码.

  * 首先就是添加对 page fault 情况的 trap 的检查, 由于映射的内存未分配, 而且该内存读写执行都是有可能的, 因此所有类型的 page fault 都可能发生, 因此 r_scause() 的值包括 12, 13 和 15 三种情况.
  * 接下来则是根据发生 page fault 的地址去当前进程的 VMA 数组中找对应的 VMA 结构体.这里需要额外说明的是, 根据 mmap 的 Linux 手册, 文件映射时参数 length 实际上可以超过文件(从 offset 起)的大小, 而且文件映射是以页面为单位的, 因此对应超过文件实际大小的部分, 内容都会是 0, 可以访问修改, 但最后都不会写回文件中. 但是这里寻找 VMA 时对于内存上限是通过 va < p->vma[i].addr + p->vma[i].len 进行比较的(没有增加 PGROUNDUP() 是因为 va 事先进行了 PGROUNDDOWN() 向下取整).
    找到对应的 VMA 则表明本次 page fault 是由于访问文件映射的内存产生的, 进而继续后面的工作.
  * 然后会对 Store Page fault 进行单独的判断, 此处先略过, 这部分是用于脏页标志位(PTE_D)设置的, 在后续进行统一阐述.
  * 然后就是进行 Lazy allocation, 使用 kalloc() 先分配一个物理页, 并使用 memset() 进行清空(该步骤是有必要的, kalloc() 分配的页面初始充满 0x5 脏数据).
  * 紧接着使用 readi() 根据发生 page fault 的地址从文件的相应部分读取内容到分配的物理页. 这里读取的大小即为 PGSIZE, 若超过文件大小在 readi() 内部会被截取, 并不影响. 在这个过程前后需要对文件的 inode 进行加锁.
  * 在读取完文件数据后, 很重要的就是设置该部分的访问权限, 访问权限根据 VMA 中记录的 mmap 的 prot 参数转换为 PTE 的权限标志位. 对于读和执行权限比较简单, 对于写权限此处只有本次是 Store Page fault 时才会设置, 具体原因见后续脏页标志位的说明.
  * 最后即可使用 mappages() 将物理页映射到用户进程的页面值.

  ```cpp
  void
  usertrap(void)
  {
    // ...
    if(r_scause() == 8){
      // ...
    } else if (r_scause() == 12 || r_scause() == 13
               || r_scause() == 15) { // mmap page fault - lab10
      char *pa;
      uint64 va = PGROUNDDOWN(r_stval());
      struct vm_area *vma = 0;
      int flags = PTE_U;
      int i;
      // find the VMA
      for (i = 0; i < NVMA; ++i) {
        // like the Linux mmap, it can modify the remaining bytes in
        //the end of mapped page
        if (p->vma[i].addr && va >= p->vma[i].addr
            && va < p->vma[i].addr + p->vma[i].len) {
          vma = &p->vma[i];
          break;
        }
      }
      if (!vma) {
        goto err;
      }
      // set write flag and dirty flag to the mapped page's PTE
      if (r_scause() == 15 && (vma->prot & PROT_WRITE)
          && walkaddr(p->pagetable, va)) {
        if (uvmsetdirtywrite(p->pagetable, va)) {
          goto err;
        }
      } else {
        if ((pa = kalloc()) == 0) {
          goto err;
        }
        memset(pa, 0, PGSIZE);
        ilock(vma->f->ip);
        if (readi(vma->f->ip, 0, (uint64) pa, va - vma->addr + vma->offset, PGSIZE) < 0) {
          iunlock(vma->f->ip);
          goto err;
        }
        iunlock(vma->f->ip);
        if ((vma->prot & PROT_READ)) {
          flags |= PTE_R;
        }
        // only store page fault and the mapped page can be written
        //set the PTE write flag and dirty flag otherwise don't set
        //these two flag until next store page falut
        if (r_scause() == 15 && (vma->prot & PROT_WRITE)) {
          flags |= PTE_W | PTE_D;
        }
        if ((vma->prot & PROT_EXEC)) {
          flags |= PTE_X;
        }
        if (mappages(p->pagetable, va, PGSIZE, (uint64) pa, flags) != 0) {
          kfree(pa);
          goto err;
        }
      }
    }else if((which_dev = devintr()) != 0){
      // ok
    } else {
  err:
      printf("usertrap(): unexpected scause %p pid=%d\n", r_scause(), p->pid);
      printf("            sepc=%p stval=%p\n", r_sepc(), r_stval());
      p->killed = 1;
    }
    // ...
  }  
  ```

* 编写 `munmap` 系统调用

