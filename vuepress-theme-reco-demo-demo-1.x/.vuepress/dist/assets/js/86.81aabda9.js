(window.webpackJsonp=window.webpackJsonp||[]).push([[86],{489:function(_,e,v){"use strict";v.r(e);var t=v(2),p=Object(t.a)({},(function(){var _=this,e=_._self._c;return e("ContentSlotsDistributor",{attrs:{"slot-key":_.$parent.slotKey}},[e("h3",{attrs:{id:"线程的状态"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#线程的状态"}},[_._v("#")]),_._v(" 线程的状态")]),_._v(" "),e("ol",[e("li",[e("p",[_._v("新建状态（New）：新创建了一个线程对象；")])]),_._v(" "),e("li",[e("p",[_._v("就绪状态（Runnable）：线程对象创建后，其他线程调用了该对象的start()方法。该状态的线程位于“可运行线程池”中，变得可运行，只等待获取CPU的使用权；")])])]),_._v(" "),e("p",[_._v("即在就绪状态的线程除"),e("code",[_._v("CPU")]),_._v("之后，所有的运行所需要的资源都准备就绪了；")]),_._v(" "),e("ol",{attrs:{start:"3"}},[e("li",[e("p",[_._v("运行状态（Running）：就绪状态的线程获取了CPU，执行程序代码；")])]),_._v(" "),e("li",[e("p",[_._v("阻塞状态（BLOCKED）：阻塞状态是线程因为某种原因放弃CPU使用权，暂时停止运行。直到线程进入就绪状态，才有机会转到运行状态；")])])]),_._v(" "),e("p",[_._v("阻塞的情况分三种：")]),_._v(" "),e("p",[_._v("a. 等待阻塞：运行的线程执行wait()方法，该线程会释放占用的所有资源，JVM会把该线程放入“等待池”中。进入这个状态后，是不能自动唤醒的；\n必须依靠其他线程调用notify()或notifyAll()方法才能被唤醒；")]),_._v(" "),e("p",[_._v("b. 同步阻塞：运行的线程在获取对象的同步锁时，若该同步锁被别的线程占用了，则JVM会把该线程放入到“锁池”中；")]),_._v(" "),e("p",[_._v("c. 其他阻塞：运行的线程执行sleep()或join()方法，或者发出I/O请求时，JVM会把线程置为阻塞状态，当sleep()状态超时、join()等待线程终止或者超时，I/O操作处理完毕时，线程重新进入就绪状态；")]),_._v(" "),e("ol",{attrs:{start:"5"}},[e("li",[_._v("死亡状态(Dead)：线程执行完了或者因异常退出了run()方法，该线程结束生命周期。")])]),_._v(" "),e("p",[_._v("线程状态转换图：")]),_._v(" "),e("p",[e("img",{attrs:{src:"https://img-blog.csdnimg.cn/762a4c446f58422eb3788f4c7ecc6b7f.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBAbGVlZGNvZGVKb2huMDE=,size_20,color_FFFFFF,t_70,g_se,x_16",alt:"在这里插入图片描述"}})]),_._v(" "),e("p",[_._v("1）线程的实现由两种方式，一是继承Thread类，二是实现Runnable接口，但不管怎样，当我们new了这个对象后，线程就进入了初始化状态；")]),_._v(" "),e("p",[_._v("2）当该对象调用了start()方法，就进入就绪状态；")]),_._v(" "),e("p",[_._v("3）进入就绪状态后，当该对象被操作系统选中后，获得CPU时间片就会进入运行状态；")]),_._v(" "),e("p",[_._v("4）进入运行状态后情况就比较复杂了：")]),_._v(" "),e("p",[_._v("（1）run()方法或main()方法结束后，线程就进入终止状态；")]),_._v(" "),e("p",[_._v("（2）当线程调用了自身的sleep()方法或其他线程的join()方法，进程让出CPU，然后就会进入阻塞状态（该状态既停止当前线程，但并不释放所占有的资源，即调用sleep()函数后，线程不会释放它的“锁标志“。）当sleep()结束或join()结束后，该线程进入可运行状态，继续等待OS分配CPU时间片；")]),_._v(" "),e("p",[_._v("典型地，sleep()被用在等待某个资源就绪的情形；测试发现条件不满足后，让线程阻塞一段时间后重新测试，直到条件满足为止。")]),_._v(" "),e("p",[_._v("（3）线程调用了yield()方法，意思是放弃当前获得的CPU时间片，回到就绪状态，这时与其他进程处于同等竞争状态，OS有可能会接着又让这个进程进入运行状态；调用 yield() 的效果等价于调度程序认为该线程已执行了足够的时间片从而需要转到另一个线程。yield()只是使当前线程重新回到可执行状态，所以执行yield()的线程有可能在进入到可执行状态后马上又被执行。")]),_._v(" "),e("p",[_._v("（4）当线程刚进入可运行状态（注意，还没运行），发现将要调用的资源被synchronize（同步），获取不到锁标记，将会立即进入锁池状态，等待获取锁标记（这时的锁池里也许已经有了其他线程在等待获取锁标记，这时它们处于队列状态，既先到先得），一旦线程获得锁标记后，就转入就绪状态，等待OS分配CPU时间片。")]),_._v(" "),e("p",[_._v("（5）suspend() 和 resume()方法：两个方法配套使用，suspend()使得线程进入阻塞状态，并且不会自动恢复，必须其对应的resume()被调用，才能使得线程重新进入可执行状态。 典型地，suspend()和 resume() 被用在等待另一个线程产生的结果的情形：测试发现结果还没有产生后，让线程阻塞，另一个线程产生了结果后，调用resume()使其恢复。")]),_._v(" "),e("p",[_._v("（6）wait()和 notify() 方法：当线程调用wait()方法后会进入等待队列（进入这个状态会释放所占有的所有资源，与阻塞状态不同），进入这个状态后，是不能自动唤醒的，必须依靠其他线程调用notify()或notifyAll()方法才能被唤醒（由于notify()只是唤醒一个线程，但我们由不能确定具体唤醒的是哪一个线程，也许我们需要唤醒的线程不能够被唤醒，")]),_._v(" "),e("p",[_._v("因此在实际使用时，一般都用notifyAll()方法，唤醒有所线程），线程被唤醒后会进入锁池，等待获取锁标记。")]),_._v(" "),e("p",[e("code",[_._v("wait()")]),_._v(" 使得线程进入阻塞状态，它有两种形式：")]),_._v(" "),e("p",[_._v("一种允许指定以ms为单位的时间作为参数，另一种没有参数。前者当对应的notify()被调用或超出指定时间时线程重新进入可执行状态即就绪状态，后者则必须对应的notify()被调用。")]),_._v(" "),e("p",[_._v("当调用"),e("code",[_._v("wait()")]),_._v("后，线程会释放掉它所占有的“锁标志”，从而使线程所在对象中的其它synchronized数据可被别的线程使用。")]),_._v(" "),e("p",[_._v("wait()和notify()因为会对对象的“锁标志”进行操作，所以它们必须在synchronized函数或synchronizedblock中进行调用。")]),_._v(" "),e("p",[_._v("如果在non-synchronized函数或non-synchronizedblock中进行调用，虽然能编译通过，但在运行时会发生IllegalMonitorStateException的异常。")]),_._v(" "),e("h3",{attrs:{id:"sleep和wait方法的区别"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#sleep和wait方法的区别"}},[_._v("#")]),_._v(" "),e("code",[_._v("sleep")]),_._v("和"),e("code",[_._v("wait")]),_._v("方法的区别？")]),_._v(" "),e("p",[_._v("1）sleep是Thread的静态方法，wait是Object的方法，任何对象实例都能调用；")]),_._v(" "),e("p",[_._v("2）因为sleep()是static静态方法，他不能改变对象的机锁（原因：因为一个类中的静态资源在类class被java虚拟机加载时就已经被初始化，而非静态资源要在对象实例化时候才会被初始化。Sleep()方法是静态的，只依赖于类，不依赖于对象，而锁是对象锁，所以不能改变锁），当一个synchronized块中调用了sleep()方法，线程虽然进入休眠，但是对象的机锁没有被释放，其他线程换依然无法访问这个对象。Wait()是Object类的方法，当一个线程执行到wait方法时，就进入到一个和该对象相关的等待池，同时释放对象的机锁，使得其他线程能够访问，可以通过notify()/notifyAll()方法来唤醒等待的线程。")]),_._v(" "),e("p",[_._v("3）sleep方法需要抛异常，wait方法不需要")]),_._v(" "),e("p",[_._v("4）sleep方法可以在任何地方使用，wait方法只能在同步方法的同步代码块中使用")]),_._v(" "),e("p",[_._v("5）wait(1000)与sleep(1000)与sleep(0)的区别")]),_._v(" "),e("p",[_._v("Thread.Sleep(1000) 意思是在未来的1000毫秒内本线程不参与CPU竞争，1000毫秒过去之后，这时候也许另外一个线程正在使用CPU，那么这时候操作系统是不会重新分配CPU的，直到那个线程挂起或结束，即使这个时候恰巧轮到操作系统进行CPU 分配，那么当前线程也不一定就是总优先级最高的那个，CPU还是可能被其他线程抢占去。")]),_._v(" "),e("p",[_._v("另外值得一提的是Thread.Sleep(0)的作用，就是触发操作系统立刻重新进行一次CPU竞争，竞争的结果也许是当前线程仍然获得CPU控制权，也许会换成别的线程获得CPU控制权。")]),_._v(" "),e("p",[_._v("wait(1000)表示将锁释放1000毫秒，到时间后如果锁没有被其他线程占用，则再次得到锁，然后wait方法结束，执行后面的代码，如果锁被其他线程占用，则等待其他线程释放锁。注意，设置了超时时间的"),e("code",[_._v("wait")]),_._v("方法一旦过了超时时间，并不需要其他线程执行"),e("code",[_._v("notify")]),_._v("也能自动解除阻塞，但是如果没设置超时时间的"),e("code",[_._v("wait")]),_._v("方法必须等待其他线程执行"),e("code",[_._v("notify")]),_._v("。")]),_._v(" "),e("h3",{attrs:{id:"线程的run-和start-方法有什么区别"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#线程的run-和start-方法有什么区别"}},[_._v("#")]),_._v(" 线程的run()和start()方法有什么区别？")]),_._v(" "),e("p",[_._v("调用start方法可启动线程，而run方法只是thread的一个普通方法调用，还是在主线程里执行。把需要并行处理的代码放在run()方法中，start()方法启动线程将自动调用run()方法，这是由jvm的内存机制规定的。并且run()方法必须是public访问权限，返回值类型为void。")]),_._v(" "),e("h3",{attrs:{id:"线程的调度"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#线程的调度"}},[_._v("#")]),_._v(" 线程的调度")]),_._v(" "),e("p",[_._v("线程调度是指系统为线程分配处理器使用权的过程，主要的调度方式有两种：")]),_._v(" "),e("p",[e("strong",[_._v("协同式线程调度")]),_._v("：线程执行时间由线程本身来控制，线程把自己的工作执行完之后，要主动通知系统切换到另一个线程上。最大的好处就是实现简单，且切换操作对线程自己是可知的，没啥线程同步问题。坏处是线程执行的时间不可控制，如果有一个线程有问题，可能会一直阻塞在那里；")]),_._v(" "),e("p",[e("strong",[_._v("抢占式线程调度")]),_._v("：每个线程将由系统来分配执行时间，线程的切换不由线程本身来决定（Java中，Thread.yield()可以让出执行时间，但是无法获得执行时间）。线程执行的时间系统可控，也不会有一个线程导致整个进程阻塞。")]),_._v(" "),e("p",[e("strong",[_._v("Java线程调度是抢占式调度，Java线程在运行的过程中多个线程之间是协作式的。")])]),_._v(" "),e("h3",{attrs:{id:"关于线程的几个重要方法"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#关于线程的几个重要方法"}},[_._v("#")]),_._v(" 关于线程的几个重要方法：")]),_._v(" "),e("p",[_._v("（1）线程睡眠--sleep")]),_._v(" "),e("p",[_._v("让当前正在执行的线程暂停一段时间，并进入阻塞状态")]),_._v(" "),e("p",[_._v("a. sleep是静态方法，最好不要用Thread的实例对象调用它，因为它睡眠的始终是当前正在运行的线程，而不是调用它的线程对象，它只对正在运行状态的线程对象有效；")]),_._v(" "),e("p",[_._v("b. 不管程序员怎么编写调度，只能最大限度的影响线程执行的次序，而不能做到精准的控制，如调用Thread.sleep(1000)使线程睡眠1s，可能结果会大于1S")]),_._v(" "),e("p",[_._v("(2)线程让步---yield")]),_._v(" "),e("p",[_._v("Yield()方法只是让当前线程暂停一下，重新进入就绪的线程池中，让系统的线程调度器重新调度一次，完全可能会出现这样的情况：当某个线程调用yield()方法之后，线程调度器又将其调度出来重新进入运行状态运行。")]),_._v(" "),e("p",[_._v("sleep()方法和yield()方法的区别如下：")]),_._v(" "),e("p",[_._v("①、sleep方法暂停当前线程后，会进入阻塞状态，只有当睡眠时间到了，才会转入就绪状态。而yield方法调用后，是直接进入就绪状态，所以有可能刚进入就绪状态，又被调度到运行状态。")]),_._v(" "),e("p",[_._v("②、sleep方法声明抛出了InterruptedException，所以调用sleep方法的时候要捕获该异常，或者显示声明抛出该异常。而yield方法则没有声明抛出任务异常。")]),_._v(" "),e("p",[_._v("③、sleep方法比yield方法有更好的可移植性，通常不要依靠yield方法来控制并发线程的执行。")]),_._v(" "),e("p",[_._v("（3）线程合并---join")]),_._v(" "),e("p",[_._v("将几个并行的线程的线程合并为一个单线程执行，应用场景是当一个线程必须等待另一个线程执行完毕时才能执行，Thread类提供了join这个方法来完成该功能，join方法不是静态方法。")]),_._v(" "),e("p",[_._v("（4）线程的优先级")]),_._v(" "),e("p",[_._v("Thread类提供了"),e("code",[_._v("setPriority(int newPriority)")]),_._v("和"),e("code",[_._v("getPriority()")]),_._v("方法来设置和返回一个指定线程的优先级，应该使用"),e("code",[_._v("MAX_PRIORITY")]),_._v("、"),e("code",[_._v("MIN_PRIORITY")]),_._v("和"),e("code",[_._v("NORM_PRIORITY")]),_._v("三个静态常量来设定优先级，这样才能保证程序最好的可移植性。")]),_._v(" "),e("p",[_._v("（5）守护线程--setDaemon(true)")]),_._v(" "),e("p",[_._v("JVM的垃圾回收、内存管理等线程都是守护线程。还有就是在做数据库应用时候，使用的数据库连接池，连接池本身也包含着很多后台线程，监控连接个数、超时时间、状态等等。")]),_._v(" "),e("p",[_._v("（6）如何结束一个线程")]),_._v(" "),e("p",[_._v("Thread.stop()、Thread.suspend、Thread.resume、Runtime.runFinalizersOnExit这些终止线程运行的方法已经被废弃了，使用它们是极端不安全的！想要安全有效的结束一个线程，可以使用下面的方法：")]),_._v(" "),e("p",[_._v("①、正常执行完run方法，然后结束掉")]),_._v(" "),e("p",[_._v("②、控制循环条件和判断条件的标识符来结束掉线程")]),_._v(" "),e("p",[_._v("③、使用interrupt结束一个线程")]),_._v(" "),e("p",[_._v("每个Thread都有一个中断状态，默认为false。可以通过Thread对象的isInterrupted()方法来判断该线程的中断状态。可以通过Thread对象的interrupt()方法将中断状态设置为true。")]),_._v(" "),e("p",[_._v("当一个线程处于"),e("code",[_._v("sleep")]),_._v("、"),e("code",[_._v("wait")]),_._v("、"),e("code",[_._v("join")]),_._v("这三种状态之一的时候，如果此时他的中断状态为true，那么它就会抛出一个InterruptedException的异常，并将中断状态重新设置为false。")]),_._v(" "),e("p",[_._v("线程池的创建方法:")]),_._v(" "),e("p",[e("code",[_._v("Executors")]),_._v("的创建线程池的方法，创建出来的线程池都实现了ExecutorService接口。常用的方法有以下几个：")]),_._v(" "),e("p",[_._v("a、newFiexedThreadPool(int Threads)：创建固定数目线程的线程池。")]),_._v(" "),e("p",[_._v("b、newCachedThreadPool()：创建一个可缓存的线程池，调用execute 将重用以前构造的线程（如果线程可用）。如果没有可用的线程，则创建一个新线程并添加到池中。终止并从缓存中移除那些已有 60 秒钟未被使用的线程。")]),_._v(" "),e("p",[_._v("c、newSingleThreadExecutor()创建一个单线程化的Executor。")]),_._v(" "),e("p",[_._v("d、newScheduledThreadPool(int corePoolSize)创建一个支持定时及周期性的任务执行的线程池，多数情况下可用来替代Timer类。")]),_._v(" "),e("p",[e("strong",[_._v("线程的几种状态：")])]),_._v(" "),e("p",[_._v("新建状态")]),_._v(" "),e("p",[_._v("就绪状态")]),_._v(" "),e("p",[_._v("运行状态")]),_._v(" "),e("p",[_._v("阻塞状态")]),_._v(" "),e("p",[_._v("条件等待状态")]),_._v(" "),e("p",[_._v("限时等待状态")]),_._v(" "),e("p",[_._v("死亡状态")])])}),[],!1,null,null,null);e.default=p.exports}}]);