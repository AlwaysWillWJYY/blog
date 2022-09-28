---
title: 操作系统lab6
date: 2022-09-27
publish: false
---

####  要点

- 修改 `uvmcopy()`, `usertrap()`, `copyout()` 等函数
- 对物理页记录引用数(reference count), 当引用数为 0 时才实际进行释放.
- 标记 COW 的` PTE`, 利用保留的 `RSW `比特位.
- 无可分配内存时杀死进程

#### 步骤

* 构造 COW 物理页的引用计数结构,相关函数和`defs.h`的声明

```cpp
// COW reference count
struct {
  uint8 ref_cnt;
  struct spinlock lock;
} cows[(PHYSTOP - KERNBASE) >> 12];

// increase the reference count
void increfcnt(uint64 pa) {
  if (pa < KERNBASE) {
    return;
  }
  pa = (pa - KERNBASE) >> 12;
  acquire(&cows[pa].lock);
  ++cows[pa].ref_cnt;
  release(&cows[pa].lock);
}

// decrease the reference count
uint8 decrefcnt(uint64 pa) {
  uint8 ret;
  if (pa < KERNBASE) {
    return 0;
  }
  pa = (pa - KERNBASE) >> 12;
  acquire(&cows[pa].lock);
  ret = --cows[pa].ref_cnt;
  release(&cows[pa].lock);
  return ret;
}

// cow.c - lab6
void            increfcnt(uint64 pa);
uint8           decrefcnt(uint64 pa);
```

* 对于 COW 机制下的物理页, 需要其对应的虚拟页的 `PTE` 的标记位进行区分, 用于在引发 page fault 时识别出是 COW 机制, 并进行新物理页的分配.根据提示, 可以使用 `PTE` 中保留的两个 `RSW` 比特位中的一位. 在 `kernel/riscv.h` 中定义 COW 标志位. 

   ```cpp
  #define PTE_COW(1l << 8)
   ```

  

* `uvmcopy() `函数用于在 fork() 时子进程拷贝父进程的用户页表. 而 COW 实际上影响的就是该部分, 并非实际拷贝, 而是将子进程虚拟页同样映射在与父进程相同的物理页上. 因此对于该函数主要修改之处就是将原本的 `kalloc() `分配去掉.   此外, 由于是写时复制, 因此需要对父进程和子进程该物理页对应的虚拟页` PTE `的标志位进行处理, 移除原本的写标志位` PTE_W`, 并添加 COW 标志位 `PTE_COW`.  在最后需要调用` increfcnt() `对当前物理页的引用计数加 1.

```cpp
(*pte) &= ~PTE_W;
(*pte) |= PTE_COW;
pa = PTE2PA(*pte);
flags = PTE_FLAGS(*pte);
if(mappages(new, i, PGSIZE, pa, flags) != 0){
    goto err;
}
```

* modify trap handler(构造 COW 机制函数)

  * 声明一个新函数` walkcowaddr()`, 当前面对 `va` 和 `pte `的判断保留, 然后添加对 `PTE_W` 标志位的判断, 若无该标记, 则进一步判断是否有 `PTE_COW `标志位. 因为无论是引发 page fault 还是 `copyout()`, 都是在写操作时才会考虑进行 COW 操作, 读操作可以正常进行, 而写操作时当前页面不可读, 若无 `PTE_COW `标记位则该物理页本身就不可写, 直接返回 0 表示失败; 反之有 `PTE_COW `标记位则表明需要进行` COW `操作, 接着分配新的物理页并重新映射的用户页表中, 并返回新的物理地址. 需要注意新的物理页的 `PTE_COW `标志位需要移除, 而` PTE_W` 标志位需要添加, 正好与` uvmcopy() `复制时是相反的.

    ```cpp
    uint64 walkcowaddr(pagetable_t pagetable, uint64 va) {
      pte_t *pte;
      uint64 pa;
      char* mem;
      uint flags;
    
      if (va >= MAXVA)
        return 0;
    
      pte = walk(pagetable, va, 0);
      if (pte == 0)
          return 0;
      if ((*pte & PTE_V) == 0)
          return 0;
      if ((*pte & PTE_U) == 0)
        return 0;
      pa = PTE2PA(*pte);
      // 判断写标志位是否没有
      if ((*pte & PTE_W) == 0) {
        // pte without COW flag cannot allocate page 
        if ((*pte & PTE_COW) == 0) {
            return 0;
        }
        // 分配新物理页
        if ((mem = kalloc()) == 0) {
          return 0;
        }
        // 拷贝页表内容
        memmove(mem, (void*)pa, PGSIZE);
        // 更新标志位
        flags = (PTE_FLAGS(*pte) & (~PTE_COW)) | PTE_W;
        // 取消原映射
        uvmunmap(pagetable, PGROUNDDOWN(va), 1, 1);
        // 更新新映射
        if (mappages(pagetable, PGROUNDDOWN(va), PGSIZE, (uint64)mem, flags) != 0) {
          kfree(mem);
          return 0;
        }
        return (uint64)mem;    // COW情况下返回新物理地址
      }
      return pa;
    }
    ```

  * 在编写好 `walkcowaddr() `函数后, 便只需在 `usertrap() `和 `copyout() `中调用即可. 对于前者, 和 Lazy Allocation 相同, 需要增加一个 trap 的判断条件, 但此处只考虑 `r_scause()`==15 的条件, 因为只有在 store 指令写操作时触发 page fault 才考虑 COW 机制, 而不是和 Lazy Allocation 一样需要读写均考虑. 对于` copyout() `函数则比较简单, 只需要将原本的 `walkaddr() `更改为 `walkcowaddr() `即可.

    ```cpp
    void
    usertrap(void)
    {
      // ...
      if(r_scause() == 8){
        // ...
      } else if(r_scause() == 15) { // COW
        if (walkcowaddr(p->pagetable, r_stval()) == 0) {
          goto bad;
        }
      } else if((which_dev = devintr()) != 0){
        // ok
      } else {
    bad:    
        printf("usertrap(): unexpected scause %p pid=%d\n", r_scause(), p->pid);
        printf("            sepc=%p stval=%p\n", r_sepc(), r_stval());
        p->killed = 1;
      }
      // ...
    }
    ```

    

*  修改引用计数相关函数

  * 上文只在 `uvmcopy()` 中考虑了引用计数的操作, 因此最后很重要的是对引用计数的其他相关函数进行修改, 保证引用计数的整个流程中数组的正确性. 

  1. 根据指导书, 首先考虑的就是 `kernel/kalloc.c`的 `kalloc()` 函数. 在调用该函数时, 则表明需要将一个物理页分配给一个进程, 并对应一虚拟页. 因此, 需要调用 `increfcnt()` 函数对引用计数加 1, 即从原本的 0 加至 1.
  2. 接下来就是` kalloc() `函数对应的 `kernel/kalloc.c `中的 `kfree() `函数, 用于物理页的释放. 在真正将物理页回收到`kmem.freelist` 前, 需要对物理页的引用计数减 1, 并判断是否为 0, 若不为 0 则表明仍有其他进程引用该物理页, 则直接返回不回收; 反之才进行真正的回收.
     该改动也对照了上文中 do_free 参数为 1 的情况, 因为在 `kfree() `中首先是对引用计数进行减 1, 只有减至 0 才会真正释放.
  3. 需要同样进行修改的还有 `kernel/kalloc.c `中的 `freerange()` 函数. 该函数被 `kinit() `函数调用, 其主要作用就是对物理内存空间中未使用的部分以物理页划分调用 `kfree()` 将其添加至` kmem.freelist` 中. 这里的问题在于对于 cows 数组中的` ref_cnt` 字段初始值为 0, 在初始调用` freerange() `的 free() 函数时会将引用计数减 1, 由于其类型为` uint8,` 会产生下溢变为 255, 从而不能将物理页回收至` kmem.freelist `中, 引发错误. 因此, 需要在调用 free() 之前再调用 `increfcnt()` 来先将引用计数变为 1, 这样在 free() 时正好可以减至 0 进行回收.

* 结果

![在这里插入图片描述](https://img-blog.csdnimg.cn/2fc4fb11cbea44bfa0e46d6bebce61ba.png)

​						![在这里插入图片描述](https://img-blog.csdnimg.cn/1db44bf346ac41d88ef9f4f1152622ea.png)	

​					![在这里插入图片描述](https://img-blog.csdnimg.cn/47e98ba44de74ce0b4de4f2d4a7d0f6d.png)

