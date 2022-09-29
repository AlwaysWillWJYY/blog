---
title: 操作系统locks
date: 2022-09-28
publish: false
---

## 一、Memory allocator

### 预处理

*  在 xv6 中运行 `kalloctest`, 输出如下: 

![在这里插入图片描述](https://img-blog.csdnimg.cn/3e16c783374843bba51879582940f0bc.png)

可以看到, test1 测试失败. 结合实验中 `struct spinlock` 的字段和相关代码可以得到, `kmem` 锁的争用情况: `acquire()` 被调用了 433016 次, 且自旋尝试获取锁的次数为 3427124 次, 同时 `kmem` 锁也是最具争用性的 5 个锁之一. 

### 要点

- 重新设计内存分配器, 避免使用单个锁和单个空闲内存页链表, 以达到减轻所争用.
- 每个 CPU 都有其自己的空闲内存页链表和对应的锁.
- 当前 CPU 的空闲内存页链表为空时要能偷取其他 CPU 的空闲内存页链表
- `cpuid()`函数返回当前的 CPU 核序号, 但需要在前后关闭中断

### 步骤

* 构造内存页 kmems 数组.根据指导书要求, 此处每个 CPU 需要有一个空闲内存页链表以及相应的锁, 即将原本在 kernel/kalloc.c 中定义的 kmem 结构体替换为 kmems 数组, 数组的大小即为 CPU 的核心数 NCPU.
  此处为 kmems 结构体额外添加了一个 lockname 的字段, 用于记录每个锁的名称.

  ```cpp
  struct {
    struct spinlock lock;
    struct run *freelist;
    char lockname[8];     // save lock's name 
  } kmems[NCPU];  // a free list and a lock per CPU 
  ```

* 修改初始化函数 kinit().kinit() 函数中主要会初始化 kmem 的锁并调用 freearrange() 初始化分配物理页.
  由于此处 kmems 是一个数组, 因此这里需要将原本对 kmem 中锁的初始化替换为一个初始化 kmems 数组中锁的循环.
  这里利用了 snprintf() 函数来设置每个锁的名称, 将名称存储到 lockname 字段. 之所以这样做, 是因为在 initlock() 函数中, 锁名称的记录是指针的浅拷贝 lk->name=name, 因此对于每个锁的名称需要使用全局的内存进行记录而非函数的局部变量, 以防止内存丢失. 此外, 为了配合 kalloctest 的输出, 需要保证每个锁的名称以"kmem"开头.

  ```cpp
  void
  kinit()
  {
    // init the kmem array
    int i;
    for (i = 0; i < NCPU; ++i) {
      snprintf(kmems[i].lockname, 8, "kmem_%d", i);    // the name of the lock
      initlock(&kmems[i].lock, kmems[i].lockname);
    }
  //  initlock(&kmem.lock, "kmem");   // lab8-1
    freerange(end, (void*)PHYSTOP);
  }
  ```

* 修改 kfree() 函数.kfree() 函数用于回收物理页到 freelist. 指导书要求初始时 freearrange() 将空闲内存分配给当前运行 CPU 的 freelist. 而 freearrange() 内部就是调用 kfree() 进行的内存回收. 同样的, 这里我们也将每次调用 kfree() 释放的物理页由当前运行的 CPU 的 freelist 进行回收.
  修改方法比较简单, 即使用 cpuid() 函数获取当前 CPU 核心的序号, 使用 kmems 中对应的锁和 freelist 进行回收.

  ```cpp
  void
  kfree(void *pa)
  {
    struct run *r;
    int c;    // cpuid - lab8-1
  
    if(((uint64)pa % PGSIZE) != 0 || (char*)pa < end || (uint64)pa >= PHYSTOP)
      panic("kfree");
  
    // Fill with junk to catch dangling refs.
    memset(pa, 1, PGSIZE);
  
    r = (struct run*)pa;
  
    // get the current core number - lab8-1
    push_off();
    c = cpuid();
    pop_off();
    // free the page to the current cpu's freelist - lab8-1
    acquire(&kmems[c].lock);
    r->next = kmems[c].freelist;
    kmems[c].freelist = r;
    release(&kmems[c].lock);
  }
  ```

* 修改 kalloc() 函数.与 kfree() 函数回收物理页相对的, 就是 kalloc() 函数进行物理页的分配.
  此处先不考虑偷取其他 CPU 的空闲物理页. 同样的, 需要调用 cpuid() 获取当前 CPU 核心的序号, 使用 kmems 中对应的锁和 freelist 进行物理页的分配.

*  编写偷取物理页函数 `steal()`.  最后考虑偷取物理页的情况: 当前 CPU 的空闲物理页链表 `freelist` 为空, 但此时其他 CPU 可能仍有空闲物理页, 因此需要当前 CPU 去偷取其他 CPU 的部分物理页. 

  * 首先考虑寻找仍有空闲物理页的 CPU 的方法, 此处便是选择的最为简单的循环遍历: 从当前 CPU 序号的下一个开始, 循环 NCPU-1 次, 即**依次遍历剩余的 CPU 的空闲物理页链表, 直到找到一个链表不为空的**.

  * 接下来考虑偷取物理页的数量, 指导书中仅说明为"部分", 此处选择的是偷取目标 CPU 一半的空闲物理页, 即对于 n 个空闲物理页偷取 ⌈ n / 2 ⌉ 个物理页. 由于物理页是通过单向链表组织的, 因此此处采用了"快慢双指针"的算法来得到链表的中间结点, 将原链表一分为二, 后半部分作为目标 CPU 剩余的空闲物理页, 前半部分即偷取到的物理页.

  * 最后考虑加锁的问题.
    首先可以肯定的是, 在遍历寻找有空闲物理页的 CPU 时以及使用算法分割链表的过程中, 是需要使用当前 CPU 的锁进行加锁的.接下来考虑当前需要偷取的 CPU 的加锁情况, 根据分析可以看到, 在偷取时, 只是寻找其他 CPU 的空闲物理页, 对其他 CPU 的链表可能进行操作, 但不影响当前 CPU 的链表, 因此此时不能对当前 CPU 的空闲物理页链表加锁. 一旦加锁, 如若此时有另一个 CPU 同样要偷取其他 CPU 的物理页而遍历到当前 CPU 尝试获取其锁, 二者便会发生死锁.
    经过再次考虑, 会发现若不同时加锁也会有一定的问题, 但由于此处对于一个 CPU 而言不可能同时运行两个线程, 因此不会出现两个线程同时读取到同一 CPU 的空闲物理页为空然后同时去偷取其他 CPU 物理页致使的内存丢失情况.而最后分割获取到偷取到的空闲物理页, 对当前 CPU 的空闲物理页链表进行更新时, 再进行加锁.

    ```cpp
    struct run *steal(int cpu_id) {
        int i;
        int c = cpu_id;
        struct run *fast, *slow, *head;
        // 若传递的cpuid和实际运行的cpuid出现不一致,则引发panic
        // 加入该判断以检查在kalloc()调用steal时CPU不会被切换
        if(cpu_id != cpuid()) {
          panic("steal");
        }    
        // 遍历其他NCPU-1个CPU的空闲物理页链表 
        for (i = 1; i < NCPU; ++i) {
            if (++c == NCPU) {
                c = 0;
            }
            acquire(&kmems[c].lock);
            // 若链表不为空
            if (kmems[c].freelist) {
                // 快慢双指针算法将链表一分为二
                slow = head = kmems[c].freelist;
                fast = slow->next;
                while (fast) {
                    fast = fast->next;
                    if (fast) {
                        slow = slow->next;
                        fast = fast->next;
                    }
                }
                // 后半部分作为当前CPU的空闲链表
                kmems[c].freelist = slow->next;
                release(&kmems[c].lock);
                // 前半部分的链表结尾清空,由于该部分链表与其他链表不再关联,因此无需加锁
                slow->next = 0;
                // 返回前半部分的链表头
                return head;
            }
            release(&kmems[c].lock);
        }
        // 若其他CPU物理页均为空则返回空指针
        return 0;
    }
    
    // Allocate one 4096-byte page of physical memory.
    // Returns a pointer that the kernel can use.
    // Returns 0 if the memory cannot be allocated.
    void *
    kalloc(void)
    {
      struct run *r;
      int c;
      push_off();
      c = cpuid();
      pop_off();
      // get the page from the current cpu's freelist
      acquire(&kmems[c].lock);
      r = kmems[c].freelist;
      if(r)
        kmems[c].freelist = r->next;
      release(&kmems[c].lock);
      // 若当前CPU空闲物理页为空,且偷取到了物理页
      if(!r && (r = steal(c))) {
        // 加锁修改当前CPU空闲物理页链表
        acquire(&kmems[c].lock);
        kmems[c].freelist = r->next;
        release(&kmems[c].lock);
      }
    
      if(r)
        memset((char*)r, 5, PGSIZE); // fill with junk
      return (void*)r;
    }
     
    ```

### 结果

* 在 xv6 中执行 kalloctest, 输出如下, 可以看到对于每个 CPU 的物理页锁的争用情况相比之前有明显下降, acquire() 整体次数大幅减少, 最多被调用了 178033 次, 比修改前次数减少了一半多, 且自旋尝试获取锁的次数均为 0 次. 同时 kmems 中的锁也不再是最具争用性的 5 个锁. 测试 test1 和 test2 也均通过

![在这里插入图片描述](https://img-blog.csdnimg.cn/7c2c528fe0034e0aa8435af94713e3e1.png)

*  在 xv6 中执行 `usertests sbrkmuch` 进行测试: 

![在这里插入图片描述](https://img-blog.csdnimg.cn/1e26ab8e6cf54992b846a828fe0ecce9.png)

*  在 xv6 中执行 `usertests`测试: 

![在这里插入图片描述](https://img-blog.csdnimg.cn/3fffae89ccf94b9fb4e0d2411e952f07.png)

## 二、Buffer cache

### 预处理

* 在xv6中运行` bcachetest `,输出如下:

![在这里插入图片描述](https://img-blog.csdnimg.cn/4d37bae0fe6149d7a6787a813ac53429.png)

可以看到, test0 测试失败. 其中`bcache` 锁的争用情况: `acquire()` 被调用了 1760378 次, 且自旋尝试获取锁的次数为 743833 次, 同时 `bcache` 锁也是最具争用性的 5 个锁之一. 

### 要点

- 修改 `bget()` 和 `brelse()` 以尽可能减少锁争用.
- 使用线程安全的哈希表来寻找cache 中的块号
- 移除缓冲区的链表结构, 使用最近使用时间的时间戳的缓冲区来代替.

### 思路

* 将原本管理缓存块的双向链表移除, 采用哈希表来管理, 这样**每个 bucket 有一个锁**而非只有一个 bcache 的全局锁, 这样便可以减少锁的争用.
* 此处仍然**使用了一个 `bcache` 的全局锁, 用于初始分配缓存块到哈希表**.此外, 对于**整个哈希表, 也有一个全局锁**, 因为当缓存块全部分配后, 是通过时间戳来寻找 bucket 中引用计数为 0 的缓存块, 对其进行重用, 此时可能会将其移至新的 bucket, 所以需要对哈希表整体加锁, 保证只有一个线程能够对哈希表整体操作, 保证其全局一致性.
  这里 bcache 的全局锁和哈希表的全局锁是两个锁, 且不能使用一个代替. 具体见下文说明.
* 此处的实现考虑了 bcachetest 中不会发生的并发场景: 包括两个线程并发使用同一块, 两个线程并发寻找未使用块的情况.

### 步骤

* 修改 `buf` 和 `bcache` 结构体

  *  修改 `kernel/buf.h` 中的 `buf` 结构体. 

    由于此处不再使用双向链表而采用哈希表, 对于哈希表 bucket 中的链式结构, 此处笔者使用的是单向链表(当然双向链表同样可以满足), 所以不再需要 prev 字段.
    此外, 由于对于寻找未使用的缓存块的 LRU 算法改成了基于时间戳比较的算法, 因此添加了 timestamp 字段用于记录最后使用缓存块的时间.

    ```cpp
    struct buf {
      int valid;   // has data been read from disk?
      int disk;    // does disk "own" buf?
      uint dev;
      uint blockno;
      struct sleeplock lock;
      uint refcnt;
    //  struct buf *prev; // LRU cache list 
      struct buf *next;     // hash list
      uchar data[BSIZE];
      uint timestamp;   // the buf last using time
    };
    ```

  * 修改 kernel/bio.c 中的 bcache 结构体.
    根据上文思路, 此处添加了 size 字段, 用于记录已经分配到哈希表的缓存块 struct buf 的数量; 添加了 buckets[NBUCKET] 数组, 作为哈希表的 bucket 数组, 其中 NBUCKET 为 bucket 的数目, 根据指导书此处设置为 13; 添加 locks[NBUCKET] 字段, 用于作为每个 bucket 对应的锁; 添加了 hashlock 字段, 作为哈希表的全局锁, 用于对哈希表整体加锁.

    ```cpp
    // lab8-2
    #define NBUCKET 13      // the count of hash table's buckets
    #define HASH(blockno) (blockno % NBUCKET)
    
    struct {
      struct spinlock lock;   // used for the buf alloc and size
      struct buf buf[NBUF];
      int size;     // record the count of used buf - lab8-2
      struct buf buckets[NBUCKET];  // lab8-2
      struct spinlock locks[NBUCKET];   // buckets' locks - lab8-2
      struct spinlock hashlock;     // the hash table's lock - lab8-2
      // Linked list of all buffers, through prev/next.
      // Sorted by how recently the buffer was used.
      // head.next is most recent, head.prev is least.
    //  struct buf head;    // lab8-2
    } bcache;
    ```

* 修改非主要函数

  * 修改 kernel/bio.c 中的 binit() 函数.
    该函数主要用于缓存块和相关锁的初始化.
    由于不再使用双向链表, 因此相关的代码即可注释掉.
    此外需要将新增的 size 字段, 以及哈希表的 bucket 数组的锁 locks[NBUCKET] 以及哈希表全局锁 hashlock 进行初始化.

    ```cpp
    void
    binit(void)
    {
      int i;
      struct buf *b;
    
      bcache.size = 0;  // lab8-2
      initlock(&bcache.lock, "bcache");
      initlock(&bcache.hashlock, "bcache_hash");    // init hash lock - lab8-2
      // init all buckets' locks  - lab8-2
      for(i = 0; i < NBUCKET; ++i) {
        initlock(&bcache.locks[i], "bcache_bucket");
      }
    
    // lab8-2
    //  // Create linked list of buffers
    //  bcache.head.prev = &bcache.head;
    //  bcache.head.next = &bcache.head;
      for(b = bcache.buf; b < bcache.buf+NBUF; b++){
    // lab8-2
    //    b->next = bcache.head.next;
    //    b->prev = &bcache.head;
        initsleeplock(&b->lock, "buffer");
    //    bcache.head.next->prev = b;
    //    bcache.head.next = b;
      }
    }
    ```

  * 修改 kernel/bio.c 中的 brelse() 函数.
    该函数用于释放缓存块. 在原本的实现中, 若其引用计数为 0, 则将其移至双向链表表头, 这样双向链表表头是最近使用的, 表尾是最近未使用的, 构成一个 LRU 序列, 方便 bget() 函数寻找缓存块.
    而此处要使用基于时间戳的 LRU 实现, 因此不再使用双向链表, 只需要将当前的时间戳记录的缓存块的 timestamp 字段.
    此外, 由于是通过哈希表管理, 加锁也由原本的全局锁改为缓存块所在的 bucket 的锁.

    ```cpp
    extern uint ticks;  
    
    void
    brelse(struct buf *b)
    {
      int idx;
      if(!holdingsleep(&b->lock))
        panic("brelse");
    
      releasesleep(&b->lock);
    
      // change the lock - lab8-2
      idx = HASH(b->blockno);
      acquire(&bcache.locks[idx]);
      b->refcnt--;
      if (b->refcnt == 0) {
        // no one is waiting for it.
    // lab8-2
    //    b->next->prev = b->prev;
    //    b->prev->next = b->next;
    //    b->next = bcache.head.next;
    //    b->prev = &bcache.head;
    //    bcache.head.next->prev = b;
    //    bcache.head.next = b;
        b->timestamp = ticks;
      }
      
      release(&bcache.locks[idx]);
    }
    ```

  * 