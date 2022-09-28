---
title: 操作系统lab7 Multithreading
date: 2022-09-27
publish: false
---

## 一、Uthread: switching between threads

### 要点

* 添加代码到 user/uthread.c 的 thread_create(), thread_schedule() 函数以及 user/uthread_switch.S 的 thread_swtich 函数.
* 确保当 thread_schedule() 第一个运行给定线程时, 该线程执行传递给 thread_create() 的函数在该线程的堆栈中.
* 确保 thread_switch 保存被切换出去的线程的寄存器, 恢复被切换到的线程的寄存器, 并返回到切换到的线程指令中最后停止的位置.

### 思路

该部分实验是在用户模式模拟一个进程有多个用户线程. 通过 thread_create() 创建线程, thread_schedule() 进行线程调度. 这与 xv6 的线程调度是大同小异的.
对于此处用户多线程之间的切换, 也需要保存寄存器信息, 实际上就可以直接参考内核线程切换的 struct context 结构体, 需要保存的寄存器信息是一致的. 而每个线程会有独立的需要执行的函数和线程栈, 则需要在创建线程进行设置.

### 步骤

* 设置线程上下文结构体.
  由于此时用户多线程切换需要保存的寄存器信息和 xv6 内核线程切换需要保存的寄存器信息是一致的, 因此可以直接使用 kernel/proc.h 中定义的 struct context 结构体. 此处为了代码的清晰独立, 单独设置了 struct ctx 结构体, 其成员是和前者一致的

  ```cpp
  // Saved registers for thread context switches. - lab7-1
  struct ctx {
      uint64 ra;
      uint64 sp;
  
      // callee-saved
      uint64 s0;
      uint64 s1;
      uint64 s2;
      uint64 s3;
      uint64 s4;
      uint64 s5;
      uint64 s6;
      uint64 s7;
      uint64 s8;
      uint64 s9;
      uint64 s10;
      uint64 s11;
  };
  ```

  

* 在线程结构体 `struct thread` 中添加线程上下文字段 `context`.很显然, 上文定义的线程上下文结构体 `struct ctx` 是和线程一一对应的, 应作为线程结构体的一个成员变量.

```cpp
struct thread {
  char       stack[STACK_SIZE]; /* the thread's stack */
  int        state;             /* FREE, RUNNING, RUNNABLE */
  struct ctx context;       
};
```

* 添加代码到 thread_create() 函数.thread_create() 函数主要进行线程的初始化操作: 其先在线程数组中找到一个状态为 FREE 即未初始化的线程, 然后设置其状态为 RUNNABLE 等进行初始化.
  这里要注意到, 传递的 thread_create() 参数 func 需要记录, 这样在线程运行时才能运行该函数, 此外线程的栈结构是独立的, 在运行函数时要在线程自己的栈上, 因此也要初始化线程的栈指针. 而在线程进行调度切换时, 同样需要保存和恢复寄存器状态, 而上述二者实际上分别对应着 ra 和 sp 寄存器, 在线程初始化进行设置, 这样在后续调度切换时便能保持其正确性.

  ```cpp
  void 
  thread_create(void (*func)())
  {
    struct thread *t;
  
    for (t = all_thread; t < all_thread + MAX_THREAD; t++) {
      if (t->state == FREE) break;
    }
    t->state = RUNNABLE;
    // YOUR CODE HERE
    // set thread's function address and thread's stack 
    t->context.ra = (uint64) func;
    t->context.sp = (uint64) t->stack + STACK_SIZE;
  }
  ```

* 添加代码到 thread_schedule() 函数.thread_schedule() 函数负责进行用户多线程间的调度. 此处是通过函数的主动调用进行的线程切换. 其主要工作就是从当前线程在线程数组的位置开始寻找一个 RUNNABLE 状态的线程进行运行. 实际上与 kernel/proc.c 中的 scheduler() 函数是很相似的. 而很明显在找到线程后就需要进行线程的切换, 调用函数 thread_switch().
  thread_switch() 根据其在 user/thread.c 中的外部声明以及指导书的要求可以推断出, 该函数应该是定义在 user/uthread_switch.S, 用汇编代码实现. 因此其功能应该与 kernel/swtch.S 中的 swtch() 函数一致, 进行线程切换时的寄存器代码的保存与恢复.

  ```cpp
  extern void thread_switch(struct ctx *old, struct ctx *new);
  
  void 
  thread_schedule(void)
  {
    struct thread *t, *next_thread;
  
    /* Find another runnable thread. */
    next_thread = 0;
    t = current_thread + 1;
    for(int i = 0; i < MAX_THREAD; i++){
      if(t >= all_thread + MAX_THREAD)
        t = all_thread;
      if(t->state == RUNNABLE) {
        next_thread = t;
        break;
      }
      t = t + 1;
    }
  
    if (next_thread == 0) {
      printf("thread_schedule: no runnable threads\n");
      exit(-1);
    }
  
    if (current_thread != next_thread) {         /* switch threads?  */
      next_thread->state = RUNNING;
      t = current_thread;
      current_thread = next_thread;
      /* YOUR CODE HERE
       * Invoke thread_switch to switch from t to next_thread:
       * thread_switch(??, ??);
       */
      thread_switch(&t->context, &current_thread->context);   
    } else
      next_thread = 0;
  }
  ```

  

* 最后在 user/uthread_switch.S 中添加 thread_switch 的代码. 正如上文所述, 该函数实际上功能与 kernel/swtch.S 中的 swtch 函数一致, 而由于此处 struct ctx 与内核的 struct context 结构体的成员是相同的, 因此该函数可以直接复用 kernel/swtch.S 中的 swtch 代码.

  ```cpp
  sd ra, 0(a0)
      sd sp, 8(a0)
      sd s0, 16(a0)
      sd s1, 24(a0)
      sd s2, 32(a0)
      sd s3, 40(a0)
      sd s4, 48(a0)
      sd s5, 56(a0)
      sd s6, 64(a0)
      sd s7, 72(a0)
      sd s8, 80(a0)
      sd s9, 88(a0)
      sd s10, 96(a0)
      sd s11, 104(a0)
  
      ld ra, 0(a1)
      ld sp, 8(a1)
      ld s0, 16(a1)
      ld s1, 24(a1)
      ld s2, 32(a1)
      ld s3, 40(a1)
      ld s4, 48(a1)
      ld s5, 56(a1)
      ld s6, 64(a1)
      ld s7, 72(a1)
      ld s8, 80(a1)
      ld s9, 88(a1)
      ld s10, 96(a1)
      ld s11, 104(a1)
  	ret    /* return to ra */
  ```

* 结果

![在这里插入图片描述](https://img-blog.csdnimg.cn/f6d72aa1801745908f294eea91ec704f.png)

![在这里插入图片描述](https://img-blog.csdnimg.cn/761cc17f9449463a8b56a9f4f141715d.png)



## 二、Using threads

### 预处理

* 使用`make ph`命令构建 `ph` 程序, 该程序包含一个线程不安全的哈希表 

* 运行 `./ph 1` 即使用单线程运行该哈希表 

![在这里插入图片描述](https://img-blog.csdnimg.cn/0de4b6d368154d30bd9c44e30b008d93.png)

* 运行 `./ph 2` 即使用两个线程运行该哈希表, 输出如下, 可以看到其 put 速度近乎先前 2 倍, 但是有 16445 个键丢失, 也说明了该哈希表非线程安全. 

![在这里插入图片描述](https://img-blog.csdnimg.cn/a94fcc155b09415da31ba43fd2958927.png)

> 该哈希表的线程安全问题是: 多个线程同时调用 put() 对同一个 bucket 进行数据插入时, 可能会使得先插入的 entry 丢失. 结合代码具体来讲, 假设有 A 和 B 两个线程同时 put(), 由于该哈希表的桶数 NBUCKET为 5, 哈希函数为 key%NBUCKET, 而插入的 key 为 keys[b*n+i], 而 b=NKEYS/nthread=100000/2=50000, 而 b%NBUCKET==0, 因此对于 A 和 B 两个线程, 在 i 相同时实际上会在同一个 bucket 插入数据. 假设 A 和 B 都运行到 put() 函数的 insert() 处, 还未进入该函数内部, 这就会导致两个线程 insert() 的后两个参数是相同的, 都是当前 bucket 的链表头, 如若线程 A 调用 insert() 插入完 entry 后, 切换到线程 B 再调用 insert() 插入 entry, 则会导致线程 A 刚刚插入的 entry 丢失.

### 要点

- 使用互斥锁 `pthread_mutex_t` 来进行数据一致性的保护.
- 通过避免并发 `put()` 在哈希表中读取或写入的内存重叠来提高并行速度, 可以考虑哈希表的每个 bucket 加锁.

### 步骤

* 定义互斥锁数组. 此处主要通过加互斥锁来解决线程不安全的问题. 此处没有选择使用一个互斥锁, 这样会导致访问整个哈希表都是串行的. 而考虑到对该哈希表, 实际上只有对同一 bucket 操作时才可能造成数据的丢失, 不同 bucket 之间是互不影响的, 因此此处是构建了一个互斥锁数组, 每个 bucket 对应一个互斥锁.

  ```cpp
  pthread_mutex_t locks[NBUCKET];
  ```

* 在 `main()` 函数中对所有互斥锁进行初始化.

```cpp
for(int i = 0; i < NBUCKET; ++i) {
      pthread_mutex_init(&locks[i], NULL);
  }
```

* 在 put() 中加锁.由于线程安全问题是由于对 bucket 中的链表操作时产生的, 因此要在对链表操作的前后加锁.
  但实际上, 对于加锁的临界区可以缩小至 insert() 函数. 原因是 insert() 函数采取头插法插入 entry, 在函数的最后才使用 *p=e 修改 bucket 链表头 table[i] 的值, 也就是说, 在前面操作的同时, 并不会对 bucket 链表进行修改, 因此可以缩小临界区的方法. 实际上加锁的范围可以缩小至 *p=e 前后, 但由于需要修改 insert() 函数, 此处便未这样修改.
*  不需要在 `get()` 中加锁. 只是读操作
*  修改 `NBUCKET` 避免并发写入内存重叠. 选择7作为桶数

### 结果

![在这里插入图片描述](https://img-blog.csdnimg.cn/c0d90f47447f4bb5a96adcd53d859098.png)

## 三、Barrier

### 预处理

* `make barrier`命令后执行`./ barrier 2` 

![在这里插入图片描述](https://img-blog.csdnimg.cn/6a00340991ea41419e987ccc5b74b42e.png)

### 要点

- 实现满足线程同步的 barrier.
- 使用条件变量 `pthread_cond_t` 配合互斥锁完成多线程同步.、

### 思路:

* 此处主要涉及互斥锁和条件变量配合达到线程同步.
* 首先条件变量的操作需要在互斥锁锁定的临界区内.然后进行条件判断, 此处即判断是否所有的线程都进入了 barrier() 函数, 若不满足则使用 pthread_cond_wait() 将当前线程休眠, 等待唤醒; 若全部线程都已进入 barrier() 函数, 则最后进入的线程会调用 pthread_cond_broadcast() 唤醒其他由条件变量休眠的线程继续运行.
* 需要注意的是, 对于 pthread_cond_wait() 涉及三个操作: 原子的释放拥有的锁并阻塞当前线程, 这两个操作是原子的; 第三个操作是由条件变量唤醒后会再次获取锁.

### 步骤

在 `barrier()` 函数中添加如下代码.注意对于变量 `bstate.round` 和 `bstate.nthread` 的设置需要在 `pthread_cond_broadcast()` 唤醒其它线程之前, 否则其他线程进入下一轮循环时可能这两个字段的值还未得到修改

```cpp
//互斥锁
if(++bstate.nthread != nthread)  {    // not all threads reach    
    pthread_cond_wait(&bstate.barrier_cond,&bstate.barrier_mutex);  // wait other threads
  } else {  // all threads reach
    bstate.nthread = 0; // reset nthread
    ++bstate.round; // increase round
    pthread_cond_broadcast(&bstate.barrier_cond);   // wake up all sleeping threads
  }
//互斥锁
```

### 结果

![在这里插入图片描述](https://img-blog.csdnimg.cn/0659d7c97d7646bebe83371bf2f6bfb0.png)

![在这里插入图片描述](https://img-blog.csdnimg.cn/be955d401a8e4b6f92334cc6249460b8.png)

