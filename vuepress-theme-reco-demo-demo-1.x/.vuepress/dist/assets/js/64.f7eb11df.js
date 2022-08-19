(window.webpackJsonp=window.webpackJsonp||[]).push([[64],{467:function(_,t,e){"use strict";e.r(t);var s=e(2),a=Object(s.a)({},(function(){var _=this,t=_._self._c;return t("ContentSlotsDistributor",{attrs:{"slot-key":_.$parent.slotKey}},[t("p",[t("img",{attrs:{src:"https://img-blog.csdnimg.cn/380f3450df9f4e03a930410fa8c4cded.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBAbGVlZGNvZGVKb2huMDE=,size_16,color_FFFFFF,t_70,g_se,x_16",alt:"在这里插入图片描述"}})]),_._v(" "),t("h3",{attrs:{id:"_1、乐观锁vs悲观锁"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_1、乐观锁vs悲观锁"}},[_._v("#")]),_._v(" 1、乐观锁VS悲观锁")]),_._v(" "),t("p",[_._v("乐观锁与悲观锁是一种广义上的概念，体现了看待线程同步的不同角度。在Java和数据库中都有此概念对应的实际应用。")]),_._v(" "),t("p",[_._v("先说概念。对于同一个数据的并发操作，悲观锁认为自己在使用数据的时候一定有别的线程来修改数据，因此在获取数据的时候会先加锁，确保数据不会被别的线程修改。"),t("code",[_._v("Java中，synchronized关键字和Lock的实现类都是悲观锁")]),_._v("。")]),_._v(" "),t("p",[t("code",[_._v("悲观的意思是，在对一个同步数据访问之前就悲观的认为会有其他线程来一起并发的访问数据，在还没有进行真实的数据修改之前就先加好锁，让其他线程进不来。而乐观锁认为自己在使用数据时不会有别的线程修改数据，所以不会添加锁，只是在更新数据的时候去判断之前有没有别的线程更新了这个数据")]),_._v("。")]),_._v(" "),t("p",[_._v("如果这个数据没有被更新，当前线程将自己修改的数据成功写入。如果数据已经被其他线程更新，则根据不同的实现方式执行不同的操作（例如报错或者自动重试）。")]),_._v(" "),t("p",[_._v("乐观锁在Java中是通过使用无锁编程来实现，最常采用的是CAS算法，Java原子类中的递增操作就通过CAS自旋实现的。")]),_._v(" "),t("p",[_._v("CAS：Compare and Set（比较再修改）")]),_._v(" "),t("p",[t("code",[_._v("乐观锁是直接对数据进行操作的，但是乐观锁会在操作数据前查询一次数据的值，在操作完数据之后，需要将更新后的资源进行同步时，再次取出此时的同步数据的值，与先前取出的值进行比较，若该值没有变化，则说明在当前线程进行修改的过程中没有其他线程修改了同步资源，此时当前线程进行更新操作，否则，重试或报错。")])]),_._v(" "),t("p",[t("img",{attrs:{src:"https://img-blog.csdnimg.cn/2545f81a8f2540098a67661ab31e9c9e.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBAbGVlZGNvZGVKb2huMDE=,size_20,color_FFFFFF,t_70,g_se,x_16",alt:"在这里插入图片描述"}})]),_._v(" "),t("p",[t("strong",[_._v("注意：CAS存在一个很明显的问题，即ABA问题。")])]),_._v(" "),t("p",[_._v('如果变量V初次读取的时候是A，并且在准备赋值的时候检查到它仍然是A，那能说明它的值没有被其他线程修改过了吗？如果在这段期间它的值曾经被改成了B，然后又改回A，那CAS操作就会误认为它从来没有被修改过。针对这种情况，java并发包中提供了一个带有标记的原子引用类"AtomicStampedReference"，它可以通过控制变量值的版本来保证CAS的正确性。')]),_._v(" "),t("p",[_._v("根据从上面的概念描述我们可以发现：")]),_._v(" "),t("ul",[t("li",[t("p",[_._v("悲观锁适合写操作多的场景，先加锁可以确保写操作的正确执行；")])]),_._v(" "),t("li",[t("p",[_._v("乐观锁适用于读操作多的场景，不加锁的特点能够使其读操作的性能大幅提升；")])])]),_._v(" "),t("p",[t("img",{attrs:{src:"https://img-blog.csdnimg.cn/7d83a42a186e45379b67955a00bbdead.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBAbGVlZGNvZGVKb2huMDE=,size_20,color_FFFFFF,t_70,g_se,x_16",alt:"在这里插入图片描述"}})]),_._v(" "),t("p",[_._v("通过调用方法示例，我们可以发现悲观锁基本都是在显示的锁定之后再操作同步资源，而乐观锁则直接去操作同步资源。那么，为何乐观锁能够做到不锁定同步资源也能正确的实现线程同步呢？---CAS")]),_._v(" "),t("p",[_._v("CAS全称 Compare And Swap（比较与交换），是一种无锁算法。在不使用锁（没有线程被阻塞）的情况下实现多线程之间的变量同步。java.util.concurrent包中的原子类就是通过CAS来实现了乐观锁。")]),_._v(" "),t("p",[_._v("CAS算法涉及到三个操作数:")]),_._v(" "),t("ul",[t("li",[t("p",[_._v("需要读写的内存值 V。")])]),_._v(" "),t("li",[t("p",[_._v("进行比较的值 A。")])]),_._v(" "),t("li",[t("p",[_._v("要写入的新值 B。")])])]),_._v(" "),t("p",[_._v("当且仅当 V 的值等于 A 时，CAS通过原子方式用新值B来更新V的值（“比较+更新”整体是一个原子操作），否则不会执行任何操作。一般情况下，“更新”是一个不断重试的操作。")]),_._v(" "),t("p",[_._v("之前提到java.util.concurrent包中的原子类，就是通过CAS来实现了乐观锁，那么我们进入原子类AtomicInteger的源码，看一下AtomicInteger的定义：")]),_._v(" "),t("p",[t("img",{attrs:{src:"https://img-blog.csdnimg.cn/841647a39f364b45bfc02235edc8b0b8.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBAbGVlZGNvZGVKb2huMDE=,size_20,color_FFFFFF,t_70,g_se,x_16",alt:"在这里插入图片描述"}})]),_._v(" "),t("p",[_._v("根据定义我们可以看出各属性的作用：")]),_._v(" "),t("ul",[t("li",[t("p",[_._v("unsafe： 获取并操作内存的数据。")])]),_._v(" "),t("li",[t("p",[_._v("valueOffset： 存储value在AtomicInteger中的偏移量。")])]),_._v(" "),t("li",[t("p",[_._v("value： 存储AtomicInteger的int值，该属性需要借助volatile关键字保证其在线程间是可见的。")])])]),_._v(" "),t("p",[_._v("接下来，我们查看AtomicInteger的自增函数incrementAndGet()的源码时，发现自增函数底层调用的是unsafe.getAndAddInt()。但是由于JDK本身只有Unsafe.class，只通过class文件中的参数名，并不能很好的了解方法的作用，所以我们通过OpenJDK 8 来查看Unsafe的源码：")]),_._v(" "),t("p",[t("img",{attrs:{src:"https://img-blog.csdnimg.cn/da4c294142cd4c3a830458ebb88de206.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBAbGVlZGNvZGVKb2huMDE=,size_20,color_FFFFFF,t_70,g_se,x_16",alt:"在这里插入图片描述"}})]),_._v(" "),t("p",[_._v("根据OpenJDK 8的源码我们可以看出，getAndAddInt()循环获取给定对象o中的偏移量处的值v，然后判断内存值是否等于v。如果相等则将内存值设置为 v + delta，否则返回false，继续循环进行重试，直到设置成功才能退出循环，并且将旧值返回。整个“比较+更新”操作封装在compareAndSwapInt()中，在JNI里是借助于一个CPU指令完成的，属于原子操作，可以保证多个线程都能够看到同一个变量的修改值。")]),_._v(" "),t("p",[_._v("后续JDK通过CPU的cmpxchg指令，去比较寄存器中的 A 和 内存中的值 V。如果相等，就把要写入的新值 B 存入内存中。如果不相等，就将内存值 V 赋值给寄存器中的值 A。然后通过Java代码中的while循环再次调用cmpxchg指令进行重试，直到设置成功为止。")]),_._v(" "),t("h3",{attrs:{id:"_2、自旋锁vs适应自旋锁"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_2、自旋锁vs适应自旋锁"}},[_._v("#")]),_._v(" 2、自旋锁VS适应自旋锁")]),_._v(" "),t("p",[_._v("阻塞或唤醒一个Java线程需要系统切换CPU状态来完成，这种状态转换需要耗费处理器时间。如果同步代码块内容过于简单，状态转换消耗的时间可能要比用户代码执行的时间还要长；")]),_._v(" "),t("p",[_._v("在许多场景下，同步资源的锁定时间很短，为了这一小段时间去切换线程，线程挂起和恢复现场花费可能会让系统得不偿失。如果物理机器有多个处理器，能够让两个或者以上线程同时并行执行，我们就可以让后面那个请求锁的线程不放弃CPU执行时间，看看持有锁的线程是否很快会释放锁。")]),_._v(" "),t("p",[_._v("而为了让当前线程“稍等一下”，我们需要让当前线程进行自旋，如果在自旋完成后前面锁定同步资源的线程已经释放了锁，那么当前线程就可以不必阻塞而直接获取同步资源，从而避免频繁的线程切换。这就是自旋锁。")]),_._v(" "),t("p",[t("img",{attrs:{src:"https://img-blog.csdnimg.cn/7dbe673bc3ff4996a1df425b1524cb57.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBAbGVlZGNvZGVKb2huMDE=,size_20,color_FFFFFF,t_70,g_se,x_16",alt:"在这里插入图片描述"}})]),_._v(" "),t("p",[_._v("自旋锁本身是有缺点的，它不能代替阻塞。自旋等待虽然避免了线程切换的开销，但它要占用处理器时间。如果锁被占用的时间很短，自旋等待的效果就会非常好。反之，如果锁被占用的时间很长，那么自旋的线程只会白白浪费处理器资源。所以，自旋等待的时间必须要有一定的限制，如果自旋超过了限定次数（默认是10次，可以使用-XX:PreBlockSpin虚拟机参数来来更改）没有成功获得锁，就应当挂起线程。")]),_._v(" "),t("p",[_._v("自旋锁的实现原理同样也是CAS，AtomicInteger中调用unsafe进行自增操作中的do-while循环就是一个自旋操作，如果修改数值失败则通过循环来执行自旋，直到修改成功。")]),_._v(" "),t("p",[t("img",{attrs:{src:"https://img-blog.csdnimg.cn/316f0c012bea4470ac2fbb385a441cd2.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBAbGVlZGNvZGVKb2huMDE=,size_20,color_FFFFFF,t_70,g_se,x_16",alt:"在这里插入图片描述"}})]),_._v(" "),t("p",[_._v("自旋锁在JDK1.4.2中引入，使用-XX:+UseSpinning来开启。JDK 6中变为默认开启，并且引入了自适应的自旋锁（适应性自旋锁）。")]),_._v(" "),t("p",[_._v("自适应意味着自旋的时间（次数）不再固定，而是由前一次在同一个锁上的自旋时间及锁的拥有者的状态来决定。如果在同一个锁对象上，自旋等待刚刚成功获得过锁，并且持有锁的线程正在运行中，那么虚拟机就会认为这次自旋也是很有可能再次成功，进而它将允许自旋等待持续相对更长的时间。如果对于某个锁，自旋很少成功获得过，那在以后尝试获取这个锁时将可能省略掉自旋过程，直接阻塞线程，避免浪费处理器资源。")]),_._v(" "),t("p",[_._v("自旋锁总结：")]),_._v(" "),t("ul",[t("li",[t("p",[_._v("自旋锁存在是为了解决线程频繁切换消耗处理器资源的问题；")])]),_._v(" "),t("li",[t("p",[_._v("自旋锁在尝试获取同步资源失败后，不会被挂起阻塞，而是一直在自旋等待占有同步资源的线程释放锁；")])]),_._v(" "),t("li",[t("p",[_._v("自旋锁对于所占用较短的线程等待效果是很好的，但是如果占有锁的线程执行时间很长，自旋锁会浪费处理器资源；")])]),_._v(" "),t("li",[t("p",[_._v("为了解决这一问题，对于自旋锁的自旋次数，要进行一定的限制；")])]),_._v(" "),t("li",[t("p",[_._v("为了让自旋锁的自旋次数有针对性，设计出自适应自旋锁来解决自旋次数问题。")])])]),_._v(" "),t("h3",{attrs:{id:"_3、无锁vs偏向锁vs轻量级锁vs重量级锁"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_3、无锁vs偏向锁vs轻量级锁vs重量级锁"}},[_._v("#")]),_._v(" 3、无锁VS偏向锁VS轻量级锁VS重量级锁")]),_._v(" "),t("p",[_._v("这四种锁是指锁的状态，专门针对synchronized的。")]),_._v(" "),t("p",[_._v("为什么Synchronized能实现线程同步？")]),_._v(" "),t("p",[_._v("在回答这个问题之前我们需要了解两个重要的概念：“Java对象头”、“Monitor”")]),_._v(" "),t("p",[_._v("Java对象头")]),_._v(" "),t("p",[_._v("synchronized是悲观锁，在操作同步资源之前需要给同步资源加锁，这把锁就存在Java对象头里，而Java对象头又是什么呢？")]),_._v(" "),t("p",[_._v("我们以HotSpot虚拟机为例，Hotspot的对象头主要包括两部分数据：Mark Word（标记字段）、Klass Pointer（类型指针）")]),_._v(" "),t("p",[_._v("Mark Word:默认存储对象的HashCode，分代年龄和锁标志位信息。这些信息都是与对象自身定义无关的数据，所以Mark Word被设计成一个非固定的数据结构以便在极小的空间内存储尽可能多的数据。它会根据对象的状态复用自己的存储空间，也就是说在运行期间Mark Word里存储的数据会随着锁标志位的变化而变化。")]),_._v(" "),t("p",[_._v("Klass Point：对象指向它的类元数据的指针，虚拟机通过这个指针来确定对象是哪个类的实现。")]),_._v(" "),t("p",[_._v("Monitor（管程）：\n管程可以理解为一个同步工具或者一种同步机制，通常被描述为一个对象。每一个Java对象都有一把看不见的锁，称为内部锁或者Monitor锁。")]),_._v(" "),t("p",[_._v("Monitor是线程私有的数据结构，每一个线程都有一个可用的Monitor record列表，同时还有一个全局的可用列表。每一个被锁住的对象都会和一个Monitor关联，同时monitor中有一个Owner字段存放拥有该锁的线程的唯一标识，表示该锁被这个线程占用。")]),_._v(" "),t("p",[_._v("现在话题回到synchronized，synchronized通过Monitor来实现线程同步，Monitor是依赖于底层的操作系统的Mutex Lock（互斥锁）来实现的线程同步。")]),_._v(" "),t("p",[_._v("如同我们在自旋锁中提到的“阻塞或唤醒一个Java线程需要操作系统切换CPU状态来完成，这种状态转换需要耗费处理器时间。如果同步代码块中的内容过于简单，状态转换消耗的时间有可能比用户代码执行的时间还要长”。这种方式就是synchronized最初实现同步的方式，这就是JDK 6之前synchronized效率低的原因。"),t("code",[_._v("这种依赖于操作系统Mutex Lock所实现的锁我们称之为“重量级锁”")]),_._v("，JDK 6中为了减少获得锁和释放锁带来的性能消耗，引入了“偏向锁”和“轻量级锁”。所以目前锁一共有4种状态，级别从低到高依次是：无锁、偏向锁、轻量级锁和重量级锁。"),t("strong",[_._v("锁状态只能升级不能降级。")])]),_._v(" "),t("p",[_._v("通过上面的介绍，我们对synchronized的加锁机制以及相关知识有了一个了解，那么下面我们给出四种锁状态对应的的Mark Word内容，然后再分别讲解四种锁状态的思路以及特点：")]),_._v(" "),t("p",[t("img",{attrs:{src:"https://img-blog.csdnimg.cn/06d9eacee26144cf88d4abae9d206425.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBAbGVlZGNvZGVKb2huMDE=,size_20,color_FFFFFF,t_70,g_se,x_16",alt:"在这里插入图片描述"}})]),_._v(" "),t("p",[t("strong",[_._v("无锁")])]),_._v(" "),t("p",[_._v("无锁没有对资源进行锁定，所有的线程都能访问并修改同一个资源，但同时只有一个线程能修改成功。\n无锁的特点就是修改操作在循环内进行，线程会不断的尝试修改共享资源。如果没有冲突就修改成功并退出，否则就会继续循环尝试。如果有多个线程修改同一个值，必定会有一个线程能修改成功，而其他修改失败的线程会不断重试直到修改成功。上面我们介绍的CAS原理及应用即是无锁的实现。无锁无法全面代替有锁，但无锁在某些场合下的性能是非常高的。")]),_._v(" "),t("p",[t("strong",[_._v("偏向锁")])]),_._v(" "),t("p",[t("code",[_._v("偏向锁是指一段同步代码一直被一个线程所访问，那么该线程会自动获取锁，降低获取锁的代价")]),_._v("。")]),_._v(" "),t("p",[_._v("在大多数情况下，锁总是由同一线程多次获得，不存在多线程竞争，所以出现了偏向锁。其目标就是在只有一个线程执行同步代码块时能够提高性能。")]),_._v(" "),t("p",[_._v("当一个线程访问同步代码块并获取锁时，会在Mark Word里存储锁偏向的线程ID。在线程进入和退出同步块时不再通过CAS操作来加锁和解锁，而是检测Mark Word里是否存储着指向当前线程的偏向锁。引入偏向锁是为了在无多线程竞争的情况下尽量减少不必要的轻量级锁执行路径，因为轻量级锁的获取及释放依赖多次CAS原子指令，而偏向锁只需要在置换ThreadID的时候依赖一次CAS原子指令即可。")]),_._v(" "),t("p",[t("strong",[_._v("偏向锁只有遇到其他线程尝试竞争偏向锁时，持有偏向锁的线程才会释放锁，线程不会主动释放偏向锁。")])]),_._v(" "),t("p",[_._v("偏向锁的撤销，需要等待全局安全点（在这个时间点上没有字节码正在执行），它会首先暂停拥有偏向锁的线程，判断锁对象是否处于被锁定状态。撤销偏向锁后恢复到无锁（标志位为“01”）或轻量级锁（标志位为“00”）的状态。偏向锁在JDK 6及以后的JVM里是默认启用的。可以通过JVM参数关闭偏向锁：-XX:-UseBiasedLocking=false，关闭之后程序默认会进入轻量级锁状态。")]),_._v(" "),t("p",[t("strong",[_._v("轻量级锁")])]),_._v(" "),t("p",[t("code",[_._v("是指当锁是偏向锁的时候，被另外的线程所访问，偏向锁就会升级为轻量级锁，其他线程会通过自旋的形式尝试获取锁，不会阻塞，从而提高性能。")])]),_._v(" "),t("p",[_._v("在代码进入同步块的时候，如果同步对象锁状态为无锁状态（锁标志位为“01”状态，是否为偏向锁为“0”），虚拟机首先将在当前线程的栈帧中建立一个名为锁记录（Lock Record）的空间，用于存储锁对象目前的Mark Word的拷贝，然后拷贝对象头中的Mark Word复制到锁记录中。")]),_._v(" "),t("p",[_._v("拷贝成功后，虚拟机将使用CAS操作尝试将对象的Mark Word更新为指向Lock Record的指针，并将Lock Record里的owner指针指向对象的Mark Word。")]),_._v(" "),t("p",[_._v("如果这个更新动作成功了，那么这个线程就拥有了该对象的锁，并且对象Mark Word的锁标志位设置为“00”，表示此对象处于轻量级锁定状态。")]),_._v(" "),t("p",[_._v("如果轻量级锁的更新操作失败了，虚拟机首先会检查对象的Mark Word是否指向当前线程的栈帧，如果是就说明当前线程已经拥有了这个对象的锁，那就可以直接进入同步块继续执行，否则说明多个线程竞争锁。")]),_._v(" "),t("p",[t("strong",[_._v("若当前只有一个等待线程，则该线程通过自旋进行等待。但是当自旋超过一定的次数，或者一个线程在持有锁，一个在自旋，又有第三个来访时，轻量级锁升级为重量级锁。")])]),_._v(" "),t("p",[t("strong",[_._v("重量级锁")])]),_._v(" "),t("p",[_._v("升级为重量级锁时，锁标志的状态值变为“10”，此时Mark Word中存储的是指向重量级锁的指针，此时等待锁的线程都会进入阻塞状态。\n整体的锁状态升级流程如下：")]),_._v(" "),t("p",[t("img",{attrs:{src:"https://img-blog.csdnimg.cn/6304c59c09774c3b8ff9285ab5ef3790.png",alt:"在这里插入图片描述"}})]),_._v(" "),t("p",[_._v("锁升级流程总结：")]),_._v(" "),t("p",[_._v("最开始对象处于无锁状态，所有线程都可以访问该对象，所有线程都可以通过CAS来试图修改该对象，但只有一个线程可以修改成功；")]),_._v(" "),t("p",[_._v("当有一个线程一直访问该对象时，该对象就会升级为偏向锁，在thread_id中存下当前的线程id，这样该线程以后再访问该对象就无须再进行CAS操作，而只要读取该对象头中thread_id是否为当前线程id即可，而在更改偏向锁时，也只需进行一次CAS操作来修改thread_id即可；")]),_._v(" "),t("p",[_._v("当由另一个线程也想访问当前的同步资源时，此时偏向锁会释放，此时偏向锁会升级为轻量级锁，获得锁对象的线程执行同步代码，而其他线程则不会被阻塞而是会自选等待当前线程释放锁；")]),_._v(" "),t("p",[_._v("当自旋的线程自旋多次都获取不到锁对象，且接二连三的有更多的线程来竞争同步资源时，此时为了防止多个线程自旋浪费处理器资源，轻量级锁升级为重量级锁，只有获得锁对象的线程继续执行同步代码块，而其他线程都会进入阻塞状态。")]),_._v(" "),t("p",[t("strong",[_._v("4、公平锁VS非公平锁")])]),_._v(" "),t("p",[_._v("公平锁是指多个线程按照申请锁的顺序来获取锁，线程直接进入队列中排队，队列中的第一个线程才能获得锁。"),t("code",[_._v("公平锁的优点是等待锁的线程不会饿死。缺点是整体吞吐效率相对非公平锁要低，等待队列中除第一个线程以外的所有线程都会阻塞，CPU唤醒阻塞线程的开销比非公平锁大")]),_._v("。")]),_._v(" "),t("p",[_._v("非公平锁是多个线程加锁时直接尝试获取锁，获取不到才会到等待队列的队尾等待。但如果此时锁刚好可用，那么这个线程可以无需阻塞直接获取到锁，所以非公平锁有可能出现后申请锁的线程先获取锁的场景."),t("code",[_._v("非公平锁的优点是可以减少唤起线程的开销，整体的吞吐效率高，因为线程有几率不阻塞直接获得锁，CPU不必唤醒所有线程。缺点是处于等待队列中的线程可能会饿死，或者等很久才会获得锁。")])]),_._v(" "),t("p",[t("img",{attrs:{src:"https://img-blog.csdnimg.cn/676e5becea484564bc99ff9513e34004.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBAbGVlZGNvZGVKb2huMDE=,size_20,color_FFFFFF,t_70,g_se,x_16",alt:"在这里插入图片描述"}})]),_._v(" "),t("p",[t("img",{attrs:{src:"https://img-blog.csdnimg.cn/c328123851654ef5b298185a7f388155.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBAbGVlZGNvZGVKb2huMDE=,size_20,color_FFFFFF,t_70,g_se,x_16",alt:"在这里插入图片描述"}})]),_._v(" "),t("p",[_._v("接下来我们通过ReentrantLock的源码来讲解公平锁和非公平锁。")]),_._v(" "),t("p",[t("img",{attrs:{src:"https://img-blog.csdnimg.cn/027bfec35a094227ab3461f19c6933a0.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBAbGVlZGNvZGVKb2huMDE=,size_20,color_FFFFFF,t_70,g_se,x_16",alt:"在这里插入图片描述"}})]),_._v(" "),t("p",[_._v("根据代码可知，ReentrantLock里面有一个内部类Sync，Sync继承AQS（AbstractQueuedSynchronizer），添加锁和释放锁的大部分操作实际上都是在Sync中实现的。它有公平锁FairSync和非公平锁NonfairSync两个子类。ReentrantLock默认使用非公平锁，也可以通过构造器来显示的指定使用公平锁。")]),_._v(" "),t("p",[_._v("下面我们来看一下公平锁与非公平锁的加锁方法的源码:")]),_._v(" "),t("p",[t("img",{attrs:{src:"https://img-blog.csdnimg.cn/86bd8ee91d8045629a3b38e3610b5f9c.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBAbGVlZGNvZGVKb2huMDE=,size_20,color_FFFFFF,t_70,g_se,x_16",alt:"在这里插入图片描述"}})]),_._v(" "),t("p",[_._v("通过上图中的源代码对比，我们可以明显的看出公平锁与非公平锁的lock()方法唯一的区别就在于公平锁在获取同步状态时多了一个限制条件：hasQueuedPredecessors()。")]),_._v(" "),t("p",[t("img",{attrs:{src:"https://img-blog.csdnimg.cn/31c03652b0ae4285b966bd10f8d2e210.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBAbGVlZGNvZGVKb2huMDE=,size_20,color_FFFFFF,t_70,g_se,x_16",alt:"在这里插入图片描述"}})]),_._v(" "),t("p",[_._v("再进入hasQueuedPredecessors()，可以看到该方法主要做一件事情：主要是判断当前线程是否位于同步队列中的第一个。如果是则返回true，否则返回false。\n综上，公平锁就是通过同步队列来实现多个线程按照申请锁的顺序来获取锁，从而实现公平的特性。非公平锁加锁时不考虑排队等待问题，直接尝试获取锁，所以存在后申请却先获得锁的情况。")]),_._v(" "),t("p",[t("strong",[_._v("5、可重入锁VS不可重入锁")])]),_._v(" "),t("p",[_._v("可重入锁又名递归锁，是指在同一个线程在外层获取锁的时候，再进入该线程的内存方法会自动获取锁（前提是锁对象得是同一个对象或者class），不会因为之前已经获得过还没释放而阻塞。Java中的ReentrantLock和synchronized都是可重入锁，可重入锁的一个优点是可一定程度避免死锁。下面用代码分析：")]),_._v(" "),t("p",[t("img",{attrs:{src:"https://img-blog.csdnimg.cn/7c24516b602d447faa3107dd806b7e80.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBAbGVlZGNvZGVKb2huMDE=,size_20,color_FFFFFF,t_70,g_se,x_16",alt:"在这里插入图片描述"}})]),_._v(" "),t("p",[_._v("在上面的代码中，类中的两个方法都是被内置锁synchronized修饰的，doSomething()方法中调用doOthers()方法。因为内置锁是可重入的，所以同一个线程在调用doOthers()时可以直接获得当前对象的锁，进入doOthers()进行操作。")]),_._v(" "),t("p",[_._v("如果是一个不可重入锁，那么当前线程在调用doOthers()之前需要将执行doSomething()时获取当前对象的锁释放掉，实际上该对象锁已被当前线程所持有，且无法释放。所以此时会出现死锁。")]),_._v(" "),t("p",[_._v("而为什么可重入锁就可以在嵌套调用时可以自动获得锁呢？我们通过图示和源码来分别解析一下。")]),_._v(" "),t("p",[_._v("还是打水的例子，有多个人在排队打水，此时管理员允许锁和同一个人的多个水桶绑定。这个人用多个水桶打水时，第一个水桶和锁绑定并打完水之后，第二个水桶也可以直接和锁绑定并开始打水，所有的水桶都打完水之后打水人才会将锁还给管理员。这个人的所有打水流程都能够成功执行，后续等待的人也能够打到水。这就是可重入锁.")]),_._v(" "),t("p",[t("img",{attrs:{src:"https://img-blog.csdnimg.cn/e60ffecf88404ea9b3729518a7977344.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBAbGVlZGNvZGVKb2huMDE=,size_20,color_FFFFFF,t_70,g_se,x_16",alt:"在这里插入图片描述"}})]),_._v(" "),t("p",[_._v("但如果是非可重入锁的话，此时管理员只允许锁和同一个人的一个水桶绑定。第一个水桶和锁绑定打完水之后并不会释放锁，导致第二个水桶不能和锁绑定也无法打水。当前线程出现死锁，整个等待队列中的所有线程都无法被唤醒。")]),_._v(" "),t("p",[t("img",{attrs:{src:"https://img-blog.csdnimg.cn/6189b2d0f6624d5fb037a8625cd44366.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBAbGVlZGNvZGVKb2huMDE=,size_20,color_FFFFFF,t_70,g_se,x_16",alt:"在这里插入图片描述"}})]),_._v(" "),t("p",[_._v("之前我们说过ReentrantLock和synchronized都是重入锁，那么我们通过重入锁ReentrantLock以及非可重入锁NonReentrantLock的源码来对比分析一下为什么非可重入锁在重复调用同步资源时会出现死锁。")]),_._v(" "),t("p",[_._v("首先ReentrantLock和NonReentrantLock都继承父类AQS，其父类AQS中维护了一个同步状态status来计数重入次数，status初始值为0。")]),_._v(" "),t("p",[_._v("当线程尝试获取锁时，可重入锁先尝试获取并更新status值，如果status == 0表示没有其他线程在执行同步代码，则把status置为1，当前线程开始执行。如果status != 0，则判断当前线程是否是获取到这个锁的线程，如果是的话执行status+1，且当前线程可以再次获取锁。而非可重入锁是直接去获取并尝试更新当前status的值，如果status != 0的话会导致其获取锁失败，当前线程阻塞。")]),_._v(" "),t("p",[_._v("释放锁时，可重入锁同样先获取当前status的值，在当前线程是持有锁的线程的前提下。如果status-1 == 0，则表示当前线程所有重复获取锁的操作都已经执行完毕，然后该线程才会真正释放锁。而非可重入锁则是在确定当前线程是持有锁的线程之后，直接将status置为0，将锁释放。")]),_._v(" "),t("p",[t("img",{attrs:{src:"https://img-blog.csdnimg.cn/8e34101991de431684b808ef26d80a50.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBAbGVlZGNvZGVKb2huMDE=,size_20,color_FFFFFF,t_70,g_se,x_16",alt:"在这里插入图片描述"}})]),_._v(" "),t("h3",{attrs:{id:"_6、独享锁vs共享锁"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_6、独享锁vs共享锁"}},[_._v("#")]),_._v(" 6、独享锁VS共享锁")]),_._v(" "),t("p",[_._v("ReentrantLock和ReentrantReadWriteLock的源码来介绍独享锁和共享锁。")]),_._v(" "),t("p",[_._v("独享锁也叫排他锁，是指该锁一次只能被一个线程所持有。如果线程T对数据A加上排它锁后，则其他线程不能再对A加任何类型的锁。获得排它锁的线程即能读数据又能修改数据。JDK中的synchronized和JUC中Lock的实现类就是互斥锁。")]),_._v(" "),t("p",[_._v("共享锁是指该锁可被多个线程所持有。"),t("code",[_._v("如果线程T对数据A加上共享锁后，则其他线程只能对A再加共享锁，不能加排它锁。获得共享锁的线程只能读数据，不能修改数据")]),_._v("。")]),_._v(" "),t("p",[_._v("独享锁与共享锁也是通过AQS来实现的，通过实现不同的方法，来实现独享或者共享。")]),_._v(" "),t("p",[_._v("下图为ReentrantReadWriteLock的部分源码：")]),_._v(" "),t("p",[t("img",{attrs:{src:"https://img-blog.csdnimg.cn/13b5a90323ba404cac7b2e231fc9ff67.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBAbGVlZGNvZGVKb2huMDE=,size_20,color_FFFFFF,t_70,g_se,x_16",alt:"在这里插入图片描述"}})]),_._v(" "),t("p",[_._v("我们看到ReentrantReadWriteLock有两把锁：ReadLock和WriteLock，由词知意，一个读锁一个写锁，合称“读写锁”。再进一步观察可以发现ReadLock和WriteLock是靠内部类Sync实现的锁。Sync是AQS的一个子类，这种结构在CountDownLatch、ReentrantLock、Semaphore里面也都存在。")]),_._v(" "),t("p",[_._v("在ReentrantReadWriteLock里面，读锁和写锁的锁主体都是Sync，但读锁和写锁的加锁方式不一样。"),t("code",[_._v("读锁是共享锁，写锁是独享锁")]),_._v("。读锁的共享锁可保证并发读非常高效，而读写、写读、写写的过程互斥，因为读锁和写锁是分离的。所以ReentrantReadWriteLock的并发性相比一般的互斥锁有了很大提升。")]),_._v(" "),t("p",[_._v("那读锁和写锁的具体加锁方式有什么区别呢？在了解源码之前我们需要回顾一下其他知识。")]),_._v(" "),t("p",[_._v("在最开始提及AQS的时候我们也提到了state字段（int类型，32位），该字段用来描述有多少线程获持有锁。")]),_._v(" "),t("p",[_._v("在独享锁中这个值通常是0或者1（如果是重入锁的话state值就是重入的次数），在共享锁中state就是持有锁的数量。但是在ReentrantReadWriteLock中有读、写两把锁，所以需要在一个整型变量state上分别描述读锁和写锁的数量（或者也可以叫状态）。于是将state变量“按位切割”切分成了两个部分，高16位表示读锁状态（读锁个数），低16位表示写锁状态（写锁个数）。如下图所示：")]),_._v(" "),t("p",[t("img",{attrs:{src:"https://img-blog.csdnimg.cn/2750e2ca372f4368a9b21f488f61a6ba.png",alt:"在这里插入图片描述"}})]),_._v(" "),t("p",[_._v("了解了概念之后我们再来看代码，先看写锁的加锁源码：")]),_._v(" "),t("p",[t("img",{attrs:{src:"https://img-blog.csdnimg.cn/31967fa038d04d5d8a3653d1085c3fb2.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBAbGVlZGNvZGVKb2huMDE=,size_20,color_FFFFFF,t_70,g_se,x_16",alt:"在这里插入图片描述"}})]),_._v(" "),t("ul",[t("li",[t("p",[_._v("这段代码首先取到当前锁的个数c，然后再通过c来获取写锁的个数w。因为写锁是低16位，所以取低16位的最大值与当前的c做与运算（ int w = exclusiveCount(c); ），高16位和0与运算后是0，剩下的就是低位运算的值，同时也是持有写锁的线程数目。")])]),_._v(" "),t("li",[t("p",[_._v("在取到写锁线程的数目后，首先判断是否已经有线程持有了锁。如果已经有线程持有了锁（c!=0），则查看当前写锁线程的数目，如果写线程数为0（即此时存在读锁）或者持有锁的线程不是当前线程就返回失败（涉及到公平锁和非公平锁的实现）。")])]),_._v(" "),t("li",[t("p",[_._v("如果写入锁的数量大于最大数（65535，2的16次方-1）就抛出一个Error。")])]),_._v(" "),t("li",[t("p",[_._v("如果当且写线程数为0（那么读线程也应该为0，因为上面已经处理c!=0的情况），并且当前线程需要阻塞那么就返回失败；如果通过CAS增加写线程数失败也返回失败。")])]),_._v(" "),t("li",[t("p",[_._v("如果c=0，w=0或者c>0，w>0（重入），则设置当前线程或锁的拥有者，返回成功！")])])]),_._v(" "),t("p",[_._v("tryAcquire()除了重入条件（当前线程为获取了写锁的线程）之外，增加了一个读锁是否存在的判断。如果存在读锁，则写锁不能被获取，原因在于：必须确保写锁的操作对读锁可见，如果允许读锁在已被获取的情况下对写锁的获取，那么正在运行的其他读线程就无法感知到当前写线程的操作。")]),_._v(" "),t("p",[_._v("因此，只有等待其他读线程都释放了读锁，写锁才能被当前线程获取，而写锁一旦被获取，则其他读写线程的后续访问均被阻塞。写锁的释放与ReentrantLock的释放过程基本类似，每次释放均减少写状态，当写状态为0时表示写锁已被释放，然后等待的读写线程才能够继续访问读写锁，同时前次写线程的修改对后续的读写线程可见。")]),_._v(" "),t("p",[_._v("接着是读锁的代码：")]),_._v(" "),t("p",[t("img",{attrs:{src:"https://img-blog.csdnimg.cn/fe73f93de5af49e09336ffc9aecbf9dc.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBAbGVlZGNvZGVKb2huMDE=,size_20,color_FFFFFF,t_70,g_se,x_16",alt:"在这里插入图片描述"}})]),_._v(" "),t("p",[_._v("可以看到在tryAcquireShared(int unused)方法中，如果其他线程已经获取了写锁，则当前线程获取读锁失败，进入等待状态。如果当前线程获取了写锁或者写锁未被获取，则当前线程（线程安全，依靠CAS保证）增加读状态，成功获取读锁。读锁的每次释放（线程安全的，可能有多个读线程同时释放读锁）均减少读状态，减少的值是“1<<16”。所以读写锁才能实现读读的过程共享，而读写、写读、写写的过程互斥。")]),_._v(" "),t("p",[_._v("此时，我们再回头看一下互斥锁ReentrantLock中公平锁和非公平锁的加锁源码：")]),_._v(" "),t("p",[t("img",{attrs:{src:"https://img-blog.csdnimg.cn/234c930800a4410c9b952819835162de.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBAbGVlZGNvZGVKb2huMDE=,size_20,color_FFFFFF,t_70,g_se,x_16",alt:"在这里插入图片描述"}})]),_._v(" "),t("p",[_._v("我们发现在ReentrantLock虽然有公平锁和非公平锁两种，但是它们添加的都是独享锁。根据源码所示，当某一个线程调用lock方法获取锁时，如果同步资源没有被其他线程锁住，那么当前线程在使用CAS更新state成功后就会成功抢占该资源。而如果公共资源被占用且不是被当前线程占用，那么就会加锁失败。所以可以确定ReentrantLock无论读操作还是写操作，添加的锁都是都是独享锁。")]),_._v(" "),t("h3",{attrs:{id:"_7、死锁"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_7、死锁"}},[_._v("#")]),_._v(" 7、死锁")]),_._v(" "),t("p",[t("strong",[_._v("什么是死锁？")])]),_._v(" "),t("p",[_._v("所谓死锁，是指多个线程在运行过程中因争夺资源而造成的一种僵局，当线程处于这种僵持状态时，若无外力作用，它们都将无法再向前推进。 因此我们举个例子来描述，如果此时有一个线程A，按照先锁a再获得锁b的的顺序获得锁，而在此同时又有另外一个线程B，按照先锁b再锁a的顺序获得锁。如下图所示：")]),_._v(" "),t("p",[t("img",{attrs:{src:"https://img-blog.csdnimg.cn/854f955b3231491bad2a5ef63fcdee8f.png",alt:"在这里插入图片描述"}})]),_._v(" "),t("p",[_._v("线程A持有锁a在等待所b，线程B持有锁b在等待锁a，线程A、B都持有对方想要的锁，却不肯释放自己持有的锁，就形成了死锁。")]),_._v(" "),t("p",[t("strong",[_._v("产生死锁的原因？")])]),_._v(" "),t("p",[_._v("a. 竞争资源")]),_._v(" "),t("ul",[t("li",[_._v("系统中的资源可以分为两类:")])]),_._v(" "),t("ol",[t("li",[t("p",[_._v("可剥夺资源，是指某进程在获得这类资源后，该资源可以再被其他进程或系统剥夺，CPU和主存均属于可剥夺性资源；")])]),_._v(" "),t("li",[t("p",[_._v("另一类资源是不可剥夺资源，当系统把这类资源分配给某进程后，再不能强行收回，只能在进程用完后自行释放，如磁带机、打印机等。")])])]),_._v(" "),t("ul",[t("li",[t("p",[_._v("产生死锁中的竞争资源之一指的是竞争不可剥夺资源（例如：系统中只有一台打印机，可供进程P1使用，假定P1已占用了打印机，若P2继续要求打印机打印将阻塞）")])]),_._v(" "),t("li",[t("p",[_._v("产生死锁中的竞争资源另外一种资源指的是竞争临时资源（临时资源包括硬件中断、信号、消息、缓冲区内的消息等），通常消息通信顺序进行不当，则会产生死锁")])])]),_._v(" "),t("p",[_._v("b. 进程间推进顺序非法")]),_._v(" "),t("ul",[t("li",[t("p",[_._v("若P1保持了资源R1,P2保持了资源R2，系统处于不安全状态，因为这两个进程再向前推进，便可能发生死锁")])]),_._v(" "),t("li",[t("p",[_._v("例如，当P1运行到P1：Request（R2）时，将因R2已被P2占用而阻塞；当P2运行到P2：Request（R1）时，也将因R1已被P1占用而阻塞，于是发生进程死锁")])])]),_._v(" "),t("h3",{attrs:{id:"死锁产生的四个必要条件"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#死锁产生的四个必要条件"}},[_._v("#")]),_._v(" 死锁产生的四个必要条件？")]),_._v(" "),t("p",[_._v("1、互斥条件：线程要求对所分配的资源进行排他性控制，即在某一段时间内某个资源仅能为一个线程所占用；")]),_._v(" "),t("p",[_._v("2、请求和保持条件：当线程因请求资源而阻塞时，对已获得的资源保持不放；")]),_._v(" "),t("p",[_._v("3、不剥夺条件：进程已获得的资源在未使用完之前，不能剥夺，只能在使用完之后由自己释放；")]),_._v(" "),t("p",[_._v("4、环路等待条件：在发生死锁时，必然存在一个线程-资源的环形链。")]),_._v(" "),t("h3",{attrs:{id:"解决死锁的基本方法"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#解决死锁的基本方法"}},[_._v("#")]),_._v(" 解决死锁的基本方法")]),_._v(" "),t("p",[t("strong",[_._v("预防死锁：")])]),_._v(" "),t("ul",[t("li",[t("p",[_._v("资源一次性分配：一次性分配所有资源，这样不会再有请求了（破坏请求条件）")])]),_._v(" "),t("li",[t("p",[_._v("只有有一个资源得不到分配，也不给这个进程分配其他资源（破坏保持条件）")])]),_._v(" "),t("li",[t("p",[_._v("可剥夺资源：即当某个进程获得部分资源时，但得不到其他资源时，则释放已占用的资源（破坏不可剥夺条件）")])]),_._v(" "),t("li",[t("p",[_._v("资源有序分配法：系统给每类资源一个编号，每一个进程按编号递增顺序请求资源，释放则相反（破坏环路等待条件）")])])]),_._v(" "),t("p",[_._v("1、以确定的顺序获得锁")]),_._v(" "),t("p",[_._v("如果必须获取多个锁，那么在设计的时候需要充分考虑不同线程之前获得锁的顺序。按照上面的例子，两个线程获得锁的时序图如下：")]),_._v(" "),t("p",[t("img",{attrs:{src:"https://img-blog.csdnimg.cn/062d16cbba9e4290b2bc4f1202853ac7.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBAbGVlZGNvZGVKb2huMDE=,size_11,color_FFFFFF,t_70,g_se,x_16",alt:"在这里插入图片描述"}})]),_._v(" "),t("p",[_._v("如果此时把获得锁的时序改成：")]),_._v(" "),t("p",[t("img",{attrs:{src:"https://img-blog.csdnimg.cn/6008d572dfde4d27b0663a9f54565ff2.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBAbGVlZGNvZGVKb2huMDE=,size_11,color_FFFFFF,t_70,g_se,x_16",alt:"在这里插入图片描述"}})]),_._v(" "),t("p",[_._v("那么死锁就永远不会发生。 针对两个特定的锁，开发者可以尝试按照锁对象的hashCode值大小的顺序，分别获得两个锁，这样锁总是会以特定的顺序获得锁，那么死锁也不会发生。问题变得更加复杂一些，如果此时有多个线程，都在竞争不同的锁，简单按照锁对象的hashCode进行排序（单纯按照hashCode顺序排序会出现“环路等待”），可能就无法满足要求了，这个时候开发者可以使用银行家算法，所有的锁都按照特定的顺序获取，同样可以防止死锁的发生.")]),_._v(" "),t("p",[_._v("2、超时放弃")]),_._v(" "),t("p",[_._v("当使用synchronized关键词提供的内置锁时，只要线程没有获得锁，那么就会永远等待下去，然而Lock接口提供了boolean tryLock(long time, TimeUnit unit) throws InterruptedException方法，该方法可以按照固定时长等待锁，因此线程可以在获取锁超时以后，主动释放之前已经获得的所有的锁。通过这种方式，也可以很有效地避免死锁。 还是按照之前的例子，时序图如下：")]),_._v(" "),t("p",[t("img",{attrs:{src:"https://img-blog.csdnimg.cn/bcf52e227509403db804dae9358dfdf5.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBAbGVlZGNvZGVKb2huMDE=,size_14,color_FFFFFF,t_70,g_se,x_16",alt:"在这里插入图片描述"}})]),_._v(" "),t("p",[t("strong",[_._v("避免死锁:")])]),_._v(" "),t("p",[_._v("预防死锁的几种策略，会严重地损害系统性能。因此在避免死锁时，要施加较弱的限制，从而获得较满意的系统性能。由于在避免死锁的策略中，允许进程动态地申请资源。因而，系统在进行资源分配之前预先计算资源分配的安全性。若此次分配不会导致系统进入不安全的状态，则将资源分配给进程；否则，进程等待。其中最具有代表性的避免死锁算法是银行家算法。")]),_._v(" "),t("p",[_._v("银行家算法：首先需要定义状态和安全状态的概念。系统的状态是当前给进程分配的资源情况。因此，状态包含两个向量Resource（系统中每种资源的总量）和Available（未分配给进程的每种资源的总量）及两个矩阵Claim（表示进程对资源的需求）和Allocation（表示当前分配给进程的资源）。安全状态是指至少有一个资源分配序列不会导致死锁。当进程请求一组资源时，假设同意该请求，从而改变了系统的状态，然后确定其结果是否还处于安全状态。如果是，同意这个请求；如果不是，阻塞该进程知道同意该请求后系统状态仍然是安全的。银行家算法：首先需要定义状态和安全状态的概念。系统的状态是当前给进程分配的资源情况。因此，状态包含两个向量Resource（系统中每种资源的总量）和Available（未分配给进程的每种资源的总量）及两个矩阵Claim（表示进程对资源的需求）和Allocation（表示当前分配给进程的资源）。安全状态是指至少有一个资源分配序列不会导致死锁。当进程请求一组资源时，假设同意该请求，从而改变了系统的状态，然后确定其结果是否还处于安全状态。如果是，同意这个请求；如果不是，阻塞该进程知道同意该请求后系统状态仍然是安全的。")])])}),[],!1,null,null,null);t.default=a.exports}}]);