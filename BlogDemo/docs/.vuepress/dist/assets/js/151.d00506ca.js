(window.webpackJsonp=window.webpackJsonp||[]).push([[151],{611:function(_,v,a){"use strict";a.r(v);var t=a(1),r=Object(t.a)({},(function(){var _=this,v=_._self._c;return v("ContentSlotsDistributor",{attrs:{"slot-key":_.$parent.slotKey}},[v("h3",{attrs:{id:"_1、进程和线程以及他们的区别"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#_1、进程和线程以及他们的区别"}},[_._v("#")]),_._v(" 1、进程和线程以及他们的区别")]),_._v(" "),v("ul",[v("li",[v("p",[_._v("进程是对运行时程序的封装，是系统进行资源调度和分配的基本单位，实现了操作系统的并发；")])]),_._v(" "),v("li",[v("p",[_._v("线程是进程的子任务，是CPU调度和分派的基本单位，用于保证程序的实时性、实现进程内部的并发；")])]),_._v(" "),v("li",[v("p",[_._v("一个程序至少有一个进程，一个进程至少有一个线程，线程依赖于进程而存在；")])]),_._v(" "),v("li",[v("p",[_._v("进程执行过程中拥有独立的内存单元，而多个线程共享进程的内存。")])])]),_._v(" "),v("p",[_._v("同一进程的的不同线程中，他们共享哪些资源？")]),_._v(" "),v("p",[_._v("a. 堆：由于堆是在进程空间中开辟出来的，所以它是理所当然的被共享的；因此new出来的都是共享的（16位平台上分全局堆和局部堆，局部堆是独享的）")]),_._v(" "),v("p",[_._v("b. 全局变量：它与具体某一函数无关，所以也与特定线程无关；因此是共享的；")]),_._v(" "),v("p",[_._v("c. 静态变量：虽然对于静态变量来说，它在代码中是“放”在某一函数中的，但是其存放位置和全局变量一样，存于堆中开辟的.bss和.data段，是共享的；")]),_._v(" "),v("p",[_._v("d. 文件等公用资源 这个是共享的，使用这些公共资源的线程必须同步。Win32提供了几种同步资源的方式，包括信号、临界区、事件和互斥体。")]),_._v(" "),v("p",[_._v("e. 线程共享的环境包括：进程代码段、进程的共有数据（利用这些共享的数据，线程很容易的实现相互之间的通讯）、进程打开的文件描述符、信号的处理器、进程的当前目录和进程用户IID与进程组ID。")]),_._v(" "),v("p",[v("strong",[_._v("线程独享哪些资源：")])]),_._v(" "),v("p",[_._v("a. 栈 栈是独享的")]),_._v(" "),v("p",[_._v("b. 寄存器 程序计数器PC")]),_._v(" "),v("h3",{attrs:{id:"_2、并行和并发的区别"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#_2、并行和并发的区别"}},[_._v("#")]),_._v(" 2、并行和并发的区别")]),_._v(" "),v("ul",[v("li",[_._v("并发")])]),_._v(" "),v("p",[_._v("并发（Concurrent），在操作系统中，是指一个时间段中有几个程序都处于已启动运行到运行完毕之间，且这几个程序都是在同一个处理机上运行。并发是逻辑上的同时 ，而不是物理上的同时。")]),_._v(" "),v("p",[v("img",{attrs:{src:"https://img-blog.csdnimg.cn/993bccacaf804a6e9d8a0d0069436e83.png",alt:"在这里插入图片描述"}})]),_._v(" "),v("ul",[v("li",[_._v("并行：")])]),_._v(" "),v("p",[_._v("并行（Parallel），当系统有一个以上CPU时，当一个CPU执行一个进程时，另一个CPU可以执行另一个进程，两个进程互不抢占CPU资源，可以同时进行，这种方式我们称之为并行(Parallel)。只有计算机有多核CPU时，才能并行的执行进程。")]),_._v(" "),v("h3",{attrs:{id:"_3、进程间的通信的几种方式"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#_3、进程间的通信的几种方式"}},[_._v("#")]),_._v(" 3、进程间的通信的几种方式")]),_._v(" "),v("ul",[v("li",[v("p",[_._v("管道（pipe）及命名管道(named pipe)：管道可用于具有亲缘关系的父子进程间的通信，有名管道除了具有管道所具有的功能外，它还允许无亲缘关系进程间的通信；")])]),_._v(" "),v("li",[v("p",[_._v("信号（singnal）：信号是一种比较复杂的通信方式，用于通知接收进程某个事件已经发生;")])]),_._v(" "),v("li",[v("p",[_._v("消息队列：消息队列是消息链接表，它克服了上两种通信方式中信号量有限的缺点，具有写权限的进程可以按照一定规则向消息队列中添加信息；对消息队列有读权限的进程则可以从消息队列中读取消息；")])]),_._v(" "),v("li",[v("p",[_._v("共享内存：可以说是最有用的进程间通信方式。它使得多个进程可以访问同一块内存空间，不同进程可以及时看到对方进程中对共享内存中数据的更新。这种方式需要依靠某种同步操作，如互斥锁和信号量等。")])]),_._v(" "),v("li",[v("p",[_._v("信号量：主要作为进程之间及同一进程不同线程之间的同步和互斥手段；")])]),_._v(" "),v("li",[v("p",[_._v("套接字：这是一种更为一般的进程间通信机制，它可以用于网络中不同机器之间的进程间通信，应用非常广泛；")])])]),_._v(" "),v("h3",{attrs:{id:"_4、线程间同步的方式"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#_4、线程间同步的方式"}},[_._v("#")]),_._v(" 4、线程间同步的方式")]),_._v(" "),v("ul",[v("li",[v("p",[_._v("互斥量Synchronized/Lock：采用互斥对象机制，只有拥有互斥对象的线程才有访问公共资源的权限。因为互斥对象只有一个，所以可以保证公共资源不会被多个线程同时访问；")])]),_._v(" "),v("li",[v("p",[_._v("信号量Semaphore：它允许同一时刻多个线程访问同一资源，但是需要控制同一时刻访问此资源的最大线程数量；")])]),_._v(" "),v("li",[v("p",[_._v("事件（信号），Wait/Notify：通过通知操作的方式来保持多线程同步，还可以方便的实现多线程优先级的比较工作。")])])]),_._v(" "),v("h3",{attrs:{id:"_5、什么是死锁-产生死锁的条件"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#_5、什么是死锁-产生死锁的条件"}},[_._v("#")]),_._v(" 5、什么是死锁，产生死锁的条件？")]),_._v(" "),v("p",[_._v("1）死锁的概念")]),_._v(" "),v("p",[_._v("在两个或者多个并发的进程中，其中一个进程1持有A同步资源，但同时在等待B同步资源，才能继续执行")]),_._v(" "),v("p",[_._v("与此同时，有另一个进程2持有B同步资源，但同时在等待A同步资源，才能继续执行")]),_._v(" "),v("p",[_._v("进程1和进程2都在等待对方的资源，且不会释放自己已持有的资源，这样就会导致线程1、2互相等待，形成死锁")]),_._v(" "),v("p",[_._v("2）死锁形成的四个必要条件？")]),_._v(" "),v("ol",[v("li",[v("p",[v("strong",[_._v("互斥")]),_._v("：只要有一个共有的资源必须属于非共享模式，即一次只能交给一个进程使用；若其他进程申请使用该资源，必须等到当前进程释放该资源才行；")])]),_._v(" "),v("li",[v("p",[v("strong",[_._v("占有并等待")]),_._v("：一个进程至少占有一个非共享资源，且在等待其他的非共享资源，而等待的资源被其他线程所持有；")])]),_._v(" "),v("li",[v("p",[v("strong",[_._v("非抢占")]),_._v("：进程不能被抢占，即进程持有的资源只有在进程执行完成后才会被释放；")])]),_._v(" "),v("li",[v("p",[v("strong",[_._v("循环等待")]),_._v("：若干进程之间形成一种头尾相连的循环等待链。")])])]),_._v(" "),v("p",[_._v("3）死锁处理的基本策略和常用的方法")]),_._v(" "),v("p",[_._v("（1）预防死锁：使死锁成立的四个条件破坏；")]),_._v(" "),v("p",[_._v("（2）避免死锁：动态地检测资源分配状态，以确保循环等待条件不成立。")]),_._v(" "),v("p",[_._v("（3）死锁解除：死锁解除的常用两种方法为进程终止和资源抢占。所谓的进程终止是指简单地终止一个或多个进程以打破循环等待，包括两种方式：终止所有死锁进程和一次只终止一个进程直到取消死锁为止；所谓资源抢占是指从一个或多个死锁进程那里抢占一个或多个资源，此时必须考虑三个问题：")]),_._v(" "),v("p",[_._v("a. 选择一个牺牲品；")]),_._v(" "),v("p",[_._v("b. 回滚：回滚到安全状态；")]),_._v(" "),v("p",[_._v("c. 饥饿（在代价因素中加上回滚次数，回滚的越多则越不可能继续被作为牺牲品，避免一个进程总是被回滚）")]),_._v(" "),v("h3",{attrs:{id:"_6、分页和分段有什么区别-内存管理"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#_6、分页和分段有什么区别-内存管理"}},[_._v("#")]),_._v(" 6、分页和分段有什么区别（内存管理？）")]),_._v(" "),v("p",[_._v("段式存储管理是一种符合用户视角的内存分配管理方案。在段式存储管理中，将程序的地址空间划分为若干段（segment），如代码段，数据段，堆栈段；这样每个进程有一个二维地址空间，相互独立，互不干扰。段式管理的优点是：没有内存碎片（因为段大小可变，改变段来消除内存碎片）。但是段换入换出时，会产生外部碎片。（比如4K的段换5K的段，会产生1K的外碎片）")]),_._v(" "),v("p",[_._v("页式存储管理方案是一种用户视角内存与物理内存相分离的内存分配管理方案。在页式存储管理中，将程序的逻辑地址划分为固定大小的页（page），而物理内存划分为同样大小的帧，程序加载时，可以将任意一页放入内存中的任意一个帧，这些帧不必连续，从而实现了离散分离。页式存储管理的优点是：没有外碎片（因为页的大小固定），但是会产生内碎片（一个页填不满）。")]),_._v(" "),v("h4",{attrs:{id:"段式处理和页式处理的不同点"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#段式处理和页式处理的不同点"}},[_._v("#")]),_._v(" 段式处理和页式处理的不同点：")]),_._v(" "),v("ul",[v("li",[v("p",[v("strong",[_._v("目的不同")]),_._v("：分页是由于系统管理的需要而不是用户的需要，它是信息的"),v("strong",[_._v("物理单位")]),_._v("；分段的目的是为了能更好地满足用户的需要，它是信息的"),v("strong",[_._v("逻辑单位")]),_._v("，它含有一组其意义相对完整的信息；")])]),_._v(" "),v("li",[v("p",[v("strong",[_._v("大小不同")]),_._v("：页的大小固定且由系统决定，而段的长度却不固定，由其所完成的功能决定；")])]),_._v(" "),v("li",[v("p",[v("strong",[_._v("地址空间不同")]),_._v("： 段向用户提供二维地址空间；页向用户提供的是一维地址空间；")])]),_._v(" "),v("li",[v("p",[v("strong",[_._v("信息共享")]),_._v("：段是信息的逻辑单位，便于存储保护和信息的共享，页的保护和共享受到限制；")])]),_._v(" "),v("li",[v("p",[v("strong",[_._v("内存碎片")]),_._v("：页式存储管理的优点是没有外部碎片（因为页的大小固定），但会产生内部碎片（一个页可能填充不满）；而段式管理的优点是没有内碎片（因为段大小可变，改变段大小来消除内碎片）。但段换入换出时，会产生外碎片（比如4k的段换5k的段，会产生1k的外碎片）。")])])]),_._v(" "),v("p",[v("img",{attrs:{src:"https://img-blog.csdnimg.cn/e28ea10376c94bf2ba1bef441e9fa58d.png",alt:"在这里插入图片描述"}})]),_._v(" "),v("h3",{attrs:{id:"_7、进程同步有哪几种机制"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#_7、进程同步有哪几种机制"}},[_._v("#")]),_._v(" 7、进程同步有哪几种机制")]),_._v(" "),v("p",[_._v("原子操作、信号量机制、自选锁管程、会合、分布式系统")]),_._v(" "),v("h3",{attrs:{id:"_8、虚拟地址、逻辑地址、线性地址、物理地址的区别"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#_8、虚拟地址、逻辑地址、线性地址、物理地址的区别"}},[_._v("#")]),_._v(" 8、虚拟地址、逻辑地址、线性地址、物理地址的区别")]),_._v(" "),v("p",[v("strong",[_._v("虚拟地址")]),_._v("：指的是由程序产生的由段选择符和段内偏移地址两个部分组成的地址。为什么叫它是虚拟的地址呢？因为这两部分组成的地址并没有直接访问物理内存，而是要通过分段地址的变换机构处理或映射后才会对应到相应的物理内存地址。")]),_._v(" "),v("p",[v("strong",[_._v("逻辑地址")]),_._v("：指由程序产生的与段相关的偏移地址部分。不过有些资料是直接把逻辑地址当成虚拟地址，两者并没有明确的界限")]),_._v(" "),v("p",[v("strong",[_._v("线性地址")]),_._v("：指的是虚拟机到物理地址变换之间的中间层，是处理器寻址的内存空间（称为线性地址空间）中的地址。程序代码会产生逻辑地址，或者说是段中的偏移地址，加上相应段的基址就生成了一个线性地址。如果启用了分页机制，那么线性地址可以再经过变换产生物理地址。若是没有采用分页机制，那么线性地址就是物理地址。")]),_._v(" "),v("p",[v("strong",[_._v("物理地址")]),_._v("：指的是现在CPU外部地址总线上的寻址物理内存的地址信号，是地址变换的最终结果。")]),_._v(" "),v("h3",{attrs:{id:"_9、什么时候用多线程-什么时候用多进程"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#_9、什么时候用多线程-什么时候用多进程"}},[_._v("#")]),_._v(" 9、什么时候用多线程？什么时候用多进程？")]),_._v(" "),v("p",[_._v("1）需要频繁创建销毁的优先用线程")]),_._v(" "),v("p",[_._v("因为频繁创建和销毁进程的代价很大；")]),_._v(" "),v("p",[_._v("2）需要进行大量计算的优先使用线程")]),_._v(" "),v("p",[_._v("所谓大量计算，就是要耗费很多CPU，切换频繁")]),_._v(" "),v("p",[_._v("3）强相关处理用线程，弱相关的处理用进程")]),_._v(" "),v("p",[_._v("什么是强相关，什么是弱相关？")]),_._v(" "),v("p",[_._v("一般的Server需要完成如下任务：消息收发、消息处理。“消息收发”和“消息处理”就是弱相关的任务，而“消息处理”里面可能又分为“消息解码”、“业务处理”，这两个任务相对来说的相关性就强多了。因此“消息收发”和“消息处理”可以分进程设计，“消息解码”、“业务处理”可以分线程设计。")]),_._v(" "),v("p",[_._v("4）可能要拓展到多机分布的用进程，多核分布的用线程")]),_._v(" "),v("h3",{attrs:{id:"_10、java创建线程的四种方式"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#_10、java创建线程的四种方式"}},[_._v("#")]),_._v(" 10、Java创建线程的四种方式")]),_._v(" "),v("p",[v("strong",[_._v("继承Thread类、实现Runnable接口、使用ExecutorService、Callable、Future实现有返回结果的多线程、通过线程池创建线程")]),_._v("。其中前两种方式线程执行完后都没有返回值，只有最后一种是带返回值的。")]),_._v(" "),v("p",[_._v("1、继承Thread类：")]),_._v(" "),v("p",[_._v("继承Thread类的方法尽管被列为一种多线程的实现方式，但Thread本质上也是实现了Runnable接口的一个实例，它代表一个线程的实例，并且，启动线程的唯一方法就是通过Thread类的start()实例方法。Start()方法是一个native方法，它将启动一个新线程，并执行run()方法。这种实现多线程很简单，通过自己的类直接extend Thread，并复写run()方法，就可以启动新线程并执行自己定义的run()方法。")]),_._v(" "),v("p",[_._v("2、实现"),v("code",[_._v("Runnable")]),_._v("接口：")]),_._v(" "),v("p",[_._v("如果自己的类已经extends另一个类，就无法直接extends Thread（一个类只能继承一个父类），此时，，必须实现一个Runnable接口。")]),_._v(" "),v("p",[_._v("使用ExecutorService、Callable、Future实现有返回结果的多线程：")]),_._v(" "),v("p",[_._v("可返回值的任务必须实现"),v("code",[_._v("Callable")]),_._v("接口，类似的，无返回值的任务必须实现"),v("code",[_._v("Runnable")]),_._v("接口。执行"),v("code",[_._v("Callable")]),_._v("任务后，可以获取一个"),v("code",[_._v("Future")]),_._v("对象，在该对象上调用get就可以获取到Callable任务返回的Object了，再结合线程池接口ExecutorService就可以实现有返回结果的多线程。")])])}),[],!1,null,null,null);v.default=r.exports}}]);