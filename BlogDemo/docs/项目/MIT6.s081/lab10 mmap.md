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

  在 kernel/sysfile.c 中实现系统调用 sys_munmap(). 根据实验要求, 该系统调用即将映射的部分内存进行取消映射, 同时若为 MAP_SHARED 则需要将对文件映射内存的修改会写到文件中(在 Linux 中, 会写文件是有 mmap 自动完成的, 与本实验不同).

  * 首先也是对参数的提取, munmap 只有 addr 和 length 两个参数.

  * 然后对参数进行简单的检查. len 需要非负; 此外根据 Linux 手册, addr 需要是PGSIZE 的整数倍.

  * 接下来同 usertrap() 中类似, 根据 addr 和 length 找到对于的 VMA 结构体. 未找到则返回失败.

  * 然后主要就是判断当前取消映射的部分是否有 MAP_SHARED 标志位, 有的话则需要将该部分写回文件. 当然在此之前先判断 len 是否为 0, 若是的话则直接返回成功, 无需后续的工作.
    该部分为该系统调用的最为复杂的部分, 需要考虑的有两点: 一是哪些页面需要写入, 另一方面是每次写回文件的写入大小. 对于前者, 根据实验指导, 选择使用脏页标志位(PTE_D)进行记录, 拥有该标志位则表明改部分被修改过, 则需要将该页面写回文件中, 具体脏页标志位的设置见后续. 对于后者, 由于是根据脏页会写文件的, 因此能够想到写入大小为 PGSIZE, 但由于 len 可能不为 PGSIZE 的整倍数, 此处还需要进行判断. 此外, 根据实验指导, 参考 filewrite() 函数, 一次写入文件的大小还受日志 block 的影响, 因此可能会再分批次写入文件(实际上 PGSIZE 大于 maxsz, 整页需要写会文件时会被分为两次).

  * 在将修改内容写回文件后, 便可以使用 uvmunmap() 将改部分页面在用户页表中取消映射.
    这里采用的是向上页面取整的取消页表映射方法, 实际上感觉有些不合理, 因为可能有一部分页面仍未取消文件映射, 但考虑到 addr 需要页面对齐, 因此不会在页面中间取消文件映射, 否则后半部分将无法取消文件映射.
    此外, 此处修改了 uvmunmap() 函数的 PTE_V 标志位的检查部分, 和之前 Lazy allocation 的实验相同, 取消映射的页面可能并未实际分配, 此时跳过即可.

  * 最后还要更新一下 VMA 结构体. 因为取消文件映射的部分可能只是 VMA 结构体中文件映射内存的一部分, 但根据实验指导, 取消映射的部分不会在文件映射内存的中间, 即不会由于取消文件映射产生新的一块内存, 因此只需要更新原本 VMA 结构体的相关参数即可. 在整个 VMA 结构体中记录的内存都取消映射时, 则将该 VMA 结构体清空.

    ```cpp
    // lab10
    uint64 sys_munmap(void) {
      uint64 addr, va;
      int len;
      struct proc *p = myproc();
      struct vm_area *vma = 0;
      uint maxsz, n, n1;
      int i;
    
      if (argaddr(0, &addr) < 0 || argint(1, &len) < 0) {
        return -1;
      }
      if (addr % PGSIZE || len < 0) {
        return -1;
      }
    
      // find the VMA
      for (i = 0; i < NVMA; ++i) {
        if (p->vma[i].addr && addr >= p->vma[i].addr
            && addr + len <= p->vma[i].addr + p->vma[i].len) {
          vma = &p->vma[i];
          break;
        }
      }
      if (!vma) {
        return -1;
      }
    
      if (len == 0) {
        return 0;
      }
    
      if ((vma->flags & MAP_SHARED)) {
        // the max size once can write to the disk
        maxsz = ((MAXOPBLOCKS - 1 - 1 - 2) / 2) * BSIZE;
        for (va = addr; va < addr + len; va += PGSIZE) {
          if (uvmgetdirty(p->pagetable, va) == 0) {
            continue;
          }
          // only write the dirty page back to the mapped file
          n = min(PGSIZE, addr + len - va);
          for (i = 0; i < n; i += n1) {
            n1 = min(maxsz, n - i);
            begin_op();
            ilock(vma->f->ip);
            if (writei(vma->f->ip, 1, va + i, va - vma->addr + vma->offset + i, n1) != n1) {
              iunlock(vma->f->ip);
              end_op();
              return -1;
            }
            iunlock(vma->f->ip);
            end_op();
          }
        }
      }
      uvmunmap(p->pagetable, addr, (len - 1) / PGSIZE + 1, 1);
      // update the vma
      if (addr == vma->addr && len == vma->len) {
        vma->addr = 0;
        vma->len = 0;
        vma->offset = 0;
        vma->flags = 0;
        vma->prot = 0;
        fileclose(vma->f);
        vma->f = 0;
      } else if (addr == vma->addr) {
        vma->addr += len;
        vma->offset += len;
        vma->len -= len;
      } else if (addr + len == vma->addr + vma->len) {
        vma->len -= len;
      } else {
        panic("unexpected munmap");
      }
      return 0;
    }
    ```

* 脏页标志位设置

  * 首先是在 `kernel/riscv.h` 中定义了脏页标志位 `PTE_D`,`#define PTE_D (1L << 7) `

  * 接下来在 kernel/vm.c 中定义了 uvmgetdirty() 以及 uvmsetdirtywrite() 两个函数. 前者用于读取脏页标志位, 后者用于写入脏页标志位和写标志位(因为两个标志位是同时更新的). 因为返回 PTE 的 walk() 是内部函数, 所有此处选择了定义这两个函数专门用于脏页标志位的相关读写.

    ```cpp
    // get the dirty flag of the va's PTE
    int uvmgetdirty(pagetable_t pagetable, uint64 va) {
      pte_t *pte = walk(pagetable, va, 0);
      if(pte == 0) {
        return 0;
      }
      return (*pte & PTE_D);
    }
    
    // set the dirty flag and write flag of the va's PTE
    int uvmsetdirtywrite(pagetable_t pagetable, uint64 va) {
      pte_t *pte = walk(pagetable, va, 0);
      if(pte == 0) {
        return -1;
      }
      *pte |= PTE_D | PTE_W;
      return 0;
    }
    ```

  * 接下来就是关于如何设置脏页标志位. 思路也比较简单, 和 COW 机制有些类似, 即利用 page fault 进行脏页标志位的设置. 对于脏页, 即有修改的页面, 其页面权限一定是可写的, 因此考虑在第一次写页面时通过 trap 处理对页面的 PTE 增加脏页标志位. 主要有两种情景:
    一种是对未映射的可写页面进行写操作, 根据前文内容, 此时会通过 trap 进行物理页的分配, 即 Lazy allocation. 而由于触发本次 page fault 的是写操作, 因此后续指令一定会对该页面的内容进行修改, 因此即可添加 PTE_D 脏页标志位.
    另一种则是对未映射的可写页面进行读操作或执行操作, 此时同样会进行物理页的分配, 但虽然该页面可写, 但是此时是读操作, 并未修改页面的内容, 因此此时不能添加 PTE_D 标志位, 需要后续写操作时再进行添加. 于是在此时, 并不设置 PTE 的写标志位 PTE_W, 这样页面当前是不可写的, 若后续对页面写操作便会再次触发 page fault, 此时再添加写标志位和脏页标志位.
    具体的代码在上述步骤的 kernel/trap.c 的 usertrap() 中. 上文提到的读写执行操作, 可以通过 r_scause() 的返回值进行区分; 而在上述步骤中找到对应 VMA 结构体后的代码 if (r_scause() == 15 && (vma->prot & PROT_WRITE) && walkaddr(p->pagetable, va)) 即用于区分上述两种情况, r_scause() 为 15 即 Store Page fault, 写操作, 此时 VMA 中记录的映射内存需要同样可写, 且 walkaddr() 返回非 0 值表明已经对该页面分配了内存. 这便是用于上述的第二种情况再次触发 page fault 时进行判断. else 子句中则是步骤中描述的页面分配过程, 而其中通过代码 if (r_scause() == 15 && (vma->prot & PROT_WRITE)) 进行脏页标志位和写标志位的设置, 对应上述的第一种情况.

  * 在 usertrap() 中完成了脏页标志位的设置, 在后续 munmap() 便可以通过调用 uvmgetdirty() 来确定页面是否被修改.

*  修改 `exit` 和 `fork` 系统调用

  上述内容完成了基本的 `mmap` 和 `munmap` 系统调用的部分. 最后需要对 `exit` 和 `fork` 两个系统调用进行修改, 添加对进程文件映射内存及 VMA 数组的处理. 

  * 修改 `kernel/proc.c` 中的 `exit()` 函数.
    在进程退出时, 需要像 `munmap()` 一样对文件映射部分内存进行取消映射. 因此添加的代码与 `munmap()` 中部分基本一样, 区别在于需要遍历 VMA 数组对所有文件映射内存进行取消映射, 而且是整个部分取消.

  ```cpp
  void
  exit(int status)
  {
    // ...
    if(p == initproc)
      panic("init exiting");
  
    // unmap the mapped memory - lab10
    for (i = 0; i < NVMA; ++i) {
      if (p->vma[i].addr == 0) {
        continue;
      }
      vma = &p->vma[i];
      if ((vma->flags & MAP_SHARED)) {
        for (va = vma->addr; va < vma->addr + vma->len; va += PGSIZE) {
          if (uvmgetdirty(p->pagetable, va) == 0) {
            continue;
          }
          n = min(PGSIZE, vma->addr + vma->len - va);
          for (r = 0; r < n; r += n1) {
            n1 = min(maxsz, n - i);
            begin_op();
            ilock(vma->f->ip);
            if (writei(vma->f->ip, 1, va + i, va - vma->addr + vma->offset + i, n1) != n1) {
              iunlock(vma->f->ip);
              end_op();
              panic("exit: writei failed");
            }
            iunlock(vma->f->ip);
            end_op();
          }
        }
      }
      uvmunmap(p->pagetable, vma->addr, (vma->len - 1) / PGSIZE + 1, 1);
      vma->addr = 0;
      vma->len = 0;
      vma->offset = 0;
      vma->flags = 0;
      vma->offset = 0;
      fileclose(vma->f);
      vma->f = 0;
    }
  
    // Close all open files.
    for(int fd = 0; fd < NOFILE; fd++){
      if(p->ofile[fd]){
        struct file *f = p->ofile[fd];
        fileclose(f);
        p->ofile[fd] = 0;
      }
    }
    // ...
  }
  ```

  * 修改 kernel/proc.c 中的 fork() 函数.
    在使用 fork() 创建子进程时, 需要将父进程的 VMA 结构体进行拷贝, 从而获得相同的文件映射内存. 由于文件映射内存使用了 Lazy allocation, 所以此时的处理可以比较简单, 直接对父进程的 VMA 数组进行拷贝即可, 当子进程使用文件映射内存时则会通过 page fault 进行页面分配.
    当然, 此处可以进行优化, 采用 COW 机制让父子进程指向相同文件映射物理页面, 对于不可写的文件映射内存会十分方便, 且可写的内存则通过 COW 机制重新进行更新. 

  ```cpp
  int
  fork(void)
  {
    // ...
    // increment reference counts on open file descriptors.
    for(i = 0; i < NOFILE; i++)
      if(p->ofile[i])
        np->ofile[i] = filedup(p->ofile[i]);
    np->cwd = idup(p->cwd);
  
    // copy all of VMA - lab10
    for (i = 0; i < NVMA; ++i) {
      if (p->vma[i].addr) {
        np->vma[i] = p->vma[i];
        filedup(np->vma[i].f);
      }
    }
  
    safestrcpy(np->name, p->name, sizeof(p->name));
    // ...
  }
  ```



### 结果

![在这里插入图片描述](https://img-blog.csdnimg.cn/22dead4350564a7e83dcb63e59430df9.png)

![在这里插入图片描述](https://img-blog.csdnimg.cn/a53fc651a8ed474a8b36a0a6125b2119.png)

![在这里插入图片描述](https://img-blog.csdnimg.cn/7c9681e23850443e851aaa15003062b6.png)

