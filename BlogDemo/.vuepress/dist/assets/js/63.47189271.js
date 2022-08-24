(window.webpackJsonp=window.webpackJsonp||[]).push([[63],{469:function(_,v,a){"use strict";a.r(v);var t=a(2),s=Object(t.a)({},(function(){var _=this,v=_._self._c;return v("ContentSlotsDistributor",{attrs:{"slot-key":_.$parent.slotKey}},[v("h3",{attrs:{id:"_1、如何判断对象已-死"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#_1、如何判断对象已-死"}},[_._v("#")]),_._v(" 1、如何判断对象已“死”")]),_._v(" "),v("p",[_._v("Java堆中存放着几乎所有的对象实例，垃圾回收器在对进行垃圾回收前，首先要判断这些对象哪些还存活，哪些已经“死去”。判断对象是否存活的几种算法：")]),_._v(" "),v("h4",{attrs:{id:"_1-1引用计数法"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#_1-1引用计数法"}},[_._v("#")]),_._v(" 1.1引用计数法")]),_._v(" "),v("p",[_._v("引用计数法的描述：给对象增加一个引用计数器，每当有一个地方引用它，计数器就+1；当引用失效时，计数器-1；任何时刻计数器为0的对象就是不能再被使用的，即对象“死亡”。")]),_._v(" "),v("p",[_._v("引用计数法实现简单，判定效率也高，在大部分情况下都是一个较好的算法。比如Python语言就是采用引用计数法来进行内存管理的。")]),_._v(" "),v("p",[v("strong",[_._v("但是，在主流的JVM中没有使用引用计数法来管理内存，最主要的原因就是引用计数法无法解决对象的循环引用问题。")])]),_._v(" "),v("p",[_._v("范例：循环引用问题：")]),_._v(" "),v("p",[v("img",{attrs:{src:"https://img-blog.csdnimg.cn/d038277d6a94450ebef22bd0e67984b4.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBAbGVlZGNvZGVKb2huMDE=,size_20,color_FFFFFF,t_70,g_se,x_16",alt:"在这里插入图片描述"}})]),_._v(" "),v("p",[_._v("当两个对象互相引用，而没有其他对象引用这两个对象时，这两个对象该被当做垃圾进行回收，但是如果采用引用计数法来进行判定的话，这两个对象都无法被回收，而JVM虚拟机却将这两个对象都回收了，可见JVM使用的并不是引用计数法。")]),_._v(" "),v("h4",{attrs:{id:"_1-2-可达性分析算法"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#_1-2-可达性分析算法"}},[_._v("#")]),_._v(" 1.2 可达性分析算法")]),_._v(" "),v("p",[_._v("在上面讲了，Java并不采用引用计数法来判断对象是否已“死”，而采用"),v("code",[_._v("“可达性分析”来判断对象是否存活")]),_._v("（同样采用此法的还有C#、Lisp-最小的一门采用动态内存分配的语言）")]),_._v(" "),v("p",[v("code",[_._v("此算法的核心思想：通过一系列称为“GC Roots”的对象作为起点，从这些节点开始向下搜索，搜索走过的路径称为“引用链”，当一个对象到“GC Roots”没有任何引用链相连时（从GC Roots到这个对象不可达）时，就证明该对象已死：")])]),_._v(" "),v("p",[v("img",{attrs:{src:"https://img-blog.csdnimg.cn/bc86323216c94bfcb8c014da04198a55.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBAbGVlZGNvZGVKb2huMDE=,size_17,color_FFFFFF,t_70,g_se,x_16",alt:"在这里插入图片描述"}})]),_._v(" "),v("p",[_._v("对象Object5 —Object7之间虽然彼此还有联系，但是它们到 GC Roots 是不可达的，因此它们会被判定为可回收对象。")]),_._v(" "),v("p",[_._v("在Java语言中，可作为GC Roots的对象包含以下几种：")]),_._v(" "),v("ol",[v("li",[v("p",[_._v("虚拟机栈（栈帧中的本地变量表）中引用的对象；")])]),_._v(" "),v("li",[v("p",[_._v("方法区中静态属性引用的变量；")])]),_._v(" "),v("li",[v("p",[_._v("方法区中常量引用的对象；")])]),_._v(" "),v("li",[v("p",[_._v("本地方法栈中（Native方法）引用的对象。")])])]),_._v(" "),v("p",[_._v("在JDK1.2以前，Java中引用的定义很传统: 如果引用类型的数据中存储的数值代表的是另一块内存的起始地址，就称这块内存代表着一个引用。这种定义有些狭隘，一个对象在这种定义下只有被引用或者没有被引用两种状态。")]),_._v(" "),v("p",[_._v("我们希望能描述这一类对象: 当内存空间还足够时，则能保存在内存中；如果内存空间在进行垃圾回收后还是非常紧张，则可以抛弃这些对象。很多系统中的缓存对象都符合这样的场景。")]),_._v(" "),v("p",[_._v("在JDK1.2之后，Java对引用的概念做了扩充，将引用分为强引用(Strong Reference)、软引用(Soft Reference)、弱引用(Weak Reference)和虚引用(Phantom Reference)四种，这四种引用的强度依次递减。")]),_._v(" "),v("ul",[v("li",[v("p",[_._v('强引用: 强引用指的是在程序代码之中普遍存在的，类似于"Object obj = new Object()"这类的引用，只要强引用还存在，垃圾回收器永远不会回收掉被引用的对象实例。')])]),_._v(" "),v("li",[v("p",[_._v("软引用: 软引用是用来描述一些还有用但是不是必须的对象。对于软引用关联着的对象，在系统将要发生内存溢出之前，会把这些对象列入回收范围之中进行第二次回收。如果这次回收还是没有足够的内存，才会抛出内存溢出异常。在JDK1.2之后，提供了SoftReference类来实现软引用")])]),_._v(" "),v("li",[v("p",[_._v("弱引用: 弱引用也是用来描述非必需对象的。但是它的强度要弱于软引用。被弱引用关联的对象只能生存到下一次垃圾回收发生之前。当垃圾回收器开始进行工作时，无论当前内容是否够用，都会回收掉只被弱引用关联的对象。在JDK1.2之后提供了WeakReference类来实现弱引用。")])]),_._v(" "),v("li",[v("p",[_._v("虚引用: 虚引用也被称为幽灵引用或者幻影引用，它是最弱的一种引用关系。一个对象是否有虚引用的存在，完全不会对其生存时间构成影响，也无法通过虚引用来取得一个对象实例。为一个对象设置虚引用的唯一目的就是能在这个对象被收集器回收时收到一个系统通知。在JDK1.2之后，提供了PhantomReference类来实现虚引用。")])])]),_._v(" "),v("h3",{attrs:{id:"生存还是死亡"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#生存还是死亡"}},[_._v("#")]),_._v(" 生存还是死亡？")]),_._v(" "),v("p",[v("code",[_._v('即使在可达性分析算法中不可达的对象，也并非"非死不可"的，这时候他们暂时处在"缓刑"阶段')]),_._v('.要宣告一个对象的真正死亡，至少要经历两次标记过程: 如果对象在进行可达性分析之后发现没有与GC Roots相连接的引用链，那它将会被第一次标记并且进行一次筛选，筛选的条件是此对象是否有必要执行finalize()方法。当对象没有覆盖finalize()方法或者finalize()方法已经被JVM调用过，虚拟机会将这两种情况都视为"没有必要执行"，此时的对象才是真正"死"的对象。')]),_._v(" "),v("p",[v("code",[_._v("如果这个对象被判定为有必要执行fianlize()方法，那么这个对象将会被放置在一个叫做F-Queue的队列之中，并在稍后由一个虚拟机自动建立的、低优先级的Finalizer线程去执行它（这里所说的执行指的是虚拟机会触发finalize()方法）")]),_._v('fianlize()方法是对象逃脱死亡的最后一次机会，稍后GC将对F-Queue中的对象进行第二次小规模标记，如果对象在finalize()中成功拯救自己(只需要重新与引用链上的任何一个对象建立起关联关系即可)，那在第二次标记时它将会被移除出"即将回收"的集合；如果对象这时候还是没有逃脱，那基本上它就是真的被回收了。')]),_._v(" "),v("p",[_._v("范例：对象的自我拯救")]),_._v(" "),v("p",[v("img",{attrs:{src:"https://img-blog.csdnimg.cn/00a7f0f64c174600a2ec875c6baf40e6.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBAbGVlZGNvZGVKb2huMDE=,size_20,color_FFFFFF,t_70,g_se,x_16",alt:"在这里插入图片描述"}})]),_._v(" "),v("p",[_._v("从上面代码示例我们发现，ﬁnalize方法确实被JVM触发，并且对象在被收集前成功逃脱。")]),_._v(" "),v("p",[_._v("但是从结果上我们发现，两个完全一样的代码片段，结果是一次逃脱成功，一次失败。这是因为"),v("code",[_._v("任何一个对象的ﬁnalize()方法都只会被系统自动调用一次，如果相同的对象在逃脱一次后又面临一次回收，它的ﬁnalize()方法不会被再次执行，因此第二段代码的自救行动失败。")])]),_._v(" "),v("h3",{attrs:{id:"_2、回收方法区"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#_2、回收方法区"}},[_._v("#")]),_._v(" 2、回收方法区")]),_._v(" "),v("p",[_._v("方法区（永久代）的垃圾回收主要收集两部分内容：废弃常量和无用类")]),_._v(" "),v("p",[_._v('回收废弃常量和回收Java堆中的对象十分类似。以常量池中字面量(直接量)的回收为例，假如一个字符串"abc"常量进入了常量池中，但是当前系统没有任何一个String对象引用常量池中的"abc"常量，也没有其他地方引用这个字面量，如果此时发生GC并且有必要的话，这个"abc"常量会被系统清理出常量池。常量池中的其他类(接口)、方法、字段的符号引用也与此类似。')]),_._v(" "),v("p",[_._v('判定一个类是否是"无用类"则相对复杂很多。类需要同时满足下面三个条件才会被算是"无用的类"：')]),_._v(" "),v("p",[_._v("**\n1.该类的所有实例都已经被回收(即在Java堆中不存在任何该类的实例)")]),_._v(" "),v("p",[_._v("2.加载该类的ClassLoader已被回收")]),_._v(" "),v("p",[_._v("3.该类对应的Class对象没有任何其他地方被引用，无法在任何地方通过反射访问该类的方法\n**")]),_._v(" "),v("p",[_._v("JVM可以对同时满足上述3个条件的无用类进行回收，也仅仅是“可以”而不是必然。在大量使用反射、动态代理等场景都需要JVM具备类卸载的功能来防止永久代的溢出。")]),_._v(" "),v("h3",{attrs:{id:"_3、垃圾回收算法"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#_3、垃圾回收算法"}},[_._v("#")]),_._v(" 3、垃圾回收算法")]),_._v(" "),v("h4",{attrs:{id:"_3-1-标记-清除算法"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#_3-1-标记-清除算法"}},[_._v("#")]),_._v(" 3.1 标记-清除算法")]),_._v(" "),v("p",[v("code",[_._v("“标记-清除”算法是最基础的收集算法。算法分为标记和清除两个阶段：首先标记出所有需要回收的对象，在标记完成后同一回收所有被标记的对象（标记过程参见1.2可达性分析）")]),_._v("。后续的收集算法都是基于这种思路并对其不足加以改进而已。")]),_._v(" "),v("p",[_._v("“标记-清除”算法的两个不足之处：")]),_._v(" "),v("p",[_._v("1、效率问题：标记和清除算法的效率都不高；")]),_._v(" "),v("p",[_._v("2、空间问题：标记清除后会产生大量连续不断的内存碎片，空间碎片太多可能会导致以后在程序运行中分配较大对象时，无法找到足够连续内存而不得不提前触发另一次垃圾收集（垃圾回收时需要STW：stop the world，对程序的性能影响极大）")]),_._v(" "),v("p",[v("img",{attrs:{src:"https://img-blog.csdnimg.cn/7b2295421f31401abb33dffd74fc3977.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBAbGVlZGNvZGVKb2huMDE=,size_20,color_FFFFFF,t_70,g_se,x_16",alt:"在这里插入图片描述"}})]),_._v(" "),v("h4",{attrs:{id:"_3-2-复制算法-新生代回收算法"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#_3-2-复制算法-新生代回收算法"}},[_._v("#")]),_._v(" 3.2 复制算法（新生代回收算法）")]),_._v(" "),v("p",[_._v("“复制”算法是为了解决“标记-清除”的效率问题。它将可用内存按容量划分为大小相等的两块，每次只使用其中一块。当这块内存需要进行垃圾回收时，会将此区域还存活着的对象复制到另一块上面，然后再把已经使用过的内存区域一次清理掉。这样做的好处是每次都对整个半区进行回收，内存分配时也就不需要考虑内存碎片等的复杂情况，只需要移动堆顶指针，按顺序分配即可。此算法实现简单，运行高效。算法的执行流程如下图：")]),_._v(" "),v("p",[v("img",{attrs:{src:"https://img-blog.csdnimg.cn/4e96dde968f7443794768bef8ffbd8b5.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBAbGVlZGNvZGVKb2huMDE=,size_20,color_FFFFFF,t_70,g_se,x_16",alt:"在这里插入图片描述"}})]),_._v(" "),v("p",[v("strong",[_._v("现在的商用虚拟机（包括HotSpot）都是采用这种收集算法来回收新生代")])]),_._v(" "),v("p",[_._v("新生代中98%的对象都是“朝生夕死”的，所以并不需要按照1：1的比例来划分内存空间，"),v("strong",[_._v("而是将内存（新生代内存）分为一块较大的Eden（伊甸园）空间和两块较小的Survivor（幸存者）空间，每次使用Eden和其中一块Survivor（两个Survivor区域一个称为From区，另一个称为To区域，From区和To区不是固定的，而是逻辑上的，第一次从From区到To区，之后当前的To区又会变为From区）。当回收时，将Eden和Survivor中还存活的对象一次性复制到另一块Survivor空间上，最后清理掉Eden和刚才用过的Survivor空间。")])]),_._v(" "),v("p",[_._v("当Survivor空间不够用的时候，需要依赖其他内存（老年代）进行"),v("code",[_._v("分配担保")]),_._v("。")]),_._v(" "),v("p",[_._v("Hotspot默认Eden和Survivor的大小比例为8：1，也就是说Eden：Survivor From：Survivor To = 8：1：1，所以每次新生代可用内存空间为整个新生代容量的90%，而剩下的10%用来存放回收后存活的对象。")]),_._v(" "),v("p",[_._v("HotSpot实现复制算法流程如下：")]),_._v(" "),v("ul",[v("li",[v("p",[_._v("1、当Eden区满的时候，会触发第一次Minor gc（新生代GC），把还存活着的对象拷贝到Survivor From区；当Eden区再次触发Minor gc时，会扫描Eden区和From区，对两个区域进行垃圾回收，经过这次回收后还存活的对象，则直接复制到To区域，并将Eden和From区清空；")])]),_._v(" "),v("li",[v("p",[_._v("当后续Eden区又发生Minor gc的时候，会对Eden区和To区进行垃圾回收，存活的对象复制到From区，并将Eden区和To区清空；")])]),_._v(" "),v("li",[v("p",[_._v("部分对象会在From区域和To区域复制来复制去，如此交换15次（由JVM参数MaxTenuringThreshold决定，这个参数默认是15：因为在对象头区域的Mark Word中的age字段只有4位，最大能表示的数只有15），最终如果还存活，就存入老年代；")])])]),_._v(" "),v("p",[v("img",{attrs:{src:"https://img-blog.csdnimg.cn/c3efb8a7b6094b1686d2507718b6057a.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBAbGVlZGNvZGVKb2huMDE=,size_20,color_FFFFFF,t_70,g_se,x_16",alt:"在这里插入图片描述"}})]),_._v(" "),v("h4",{attrs:{id:"_3-3-标记整理算法-老年代回收算法"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#_3-3-标记整理算法-老年代回收算法"}},[_._v("#")]),_._v(" 3.3 标记整理算法（老年代回收算法）")]),_._v(" "),v("p",[_._v("复制收集算法在对象存活率较高时会进行比较多的复制操作，效率会变低。因此在老年代一般不能使用复制算法。\n（因为老年代的对象存活率都很高，如果每次发生GC时，都采用复制收集算法，那么要复制的对象就很多，效率低下）")]),_._v(" "),v("p",[v("code",[_._v("针对老年代的特点，提出了一种称之为“标记-整理算法”。标记过程仍与“标记-清理”过程一致，但后续步骤不是直接对可回收对象进行清理，而是让所有存活对象移向一端，然后直接清理掉端边界以外的内存")]),_._v(",流程图如下：")]),_._v(" "),v("p",[v("img",{attrs:{src:"https://img-blog.csdnimg.cn/25e57ce40ac94bdb8413e8d665747219.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBAbGVlZGNvZGVKb2huMDE=,size_20,color_FFFFFF,t_70,g_se,x_16",alt:"在这里插入图片描述"}})]),_._v(" "),v("p",[v("strong",[_._v("标记-整理算法会解决标记-清理算法中出现大量内存碎片的问题。")])]),_._v(" "),v("h4",{attrs:{id:"_3-4-分代收集算法"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#_3-4-分代收集算法"}},[_._v("#")]),_._v(" 3.4 分代收集算法")]),_._v(" "),v("p",[_._v("当前JVM垃圾回收都采用的是“分代收集（Generational Collection）”算法，这个算法并没有新思想，只是根据对象存活周期的不同将内存划分为几块。")]),_._v(" "),v("p",[v("code",[_._v("一般是把Java堆分为新生代和老年代。在新生代中，每次垃圾回收都有大批对象死去，只有少量对象存活，因此我们采用的是复制算法；而老年代中对象的存活率高、没有额外空间对它进行分配担保，就必须采取“标记-清理”或“标记-整理”算法。")])]),_._v(" "),v("p",[_._v("面试题：请问了解Minor GC和Full GC么？这两种GC有什么不一样？")]),_._v(" "),v("p",[_._v("1、Minor GC又称新生代GC：指的是发生在新生代的垃圾收集。因为Java对象大都具备朝生夕死的特性，因此Minor GC（采用复制算法）非常频繁，一般回收速度也较快；")]),_._v(" "),v("p",[_._v("2、Full GC又称为老年代GC或者Major GC：指发生在老年代的垃圾收集。出现了Major GC，经常会伴随至少一次Minor GC（并非绝对，大多情况下，在进行Full GC之前会试试看能不能通过Minor GC解决内存溢出的问题，如果解决不了才会Full GC）。Major GC的速度一般会比Minor GC慢10倍以上。")]),_._v(" "),v("h3",{attrs:{id:"_4、stw-stop-the-world"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#_4、stw-stop-the-world"}},[_._v("#")]),_._v(" 4、STW（stop the world）")]),_._v(" "),v("p",[_._v("在标记的过程中, 在对象被标记之后, 用户的线程做了一些操作, 所有对象都不再依赖这个对象了, 那么这个对象应该被回收, 但是在这次遍历中不会被回收了")]),_._v(" "),v("p",[_._v("对于情况一: 该回收的没回收还是能忍的, 因为下次遍历时就能进行回收了")]),_._v(" "),v("p",[_._v("对于情况二: 不该回收的回收了是没有办法忍的, 因为明明用户逻辑还需要的对象就直接被回收了, 会导致出错.")]),_._v(" "),v("p",[_._v("先分析一下这两种情况产生的原因——都是由于GC线程与用户逻辑并行运行导致的. 那么应该怎么解决这个问题呢?")]),_._v(" "),v("p",[_._v("让GC线程和用户逻辑的线程不要同时运行, 先运行用户逻辑的线程, 运行到需要GC的时候, 就把所有用户逻辑的线程给停住, 然后启动GC线程去进行标记清除, 在GC线程标记清除运行结束后, 再继续进行用户逻辑的线程. 这种方法就是大名鼎鼎的STW (Stop-The-World, 意思是在GC的时候停下用户逻辑的全世界)。")]),_._v(" "),v("p",[_._v("STW本质是通过把GC和用户逻辑搞成串行的方法, 来避免上面的两种并发可能会导致的问题. 但是它引入了一个很大的代价, 就是会停止用户逻辑的运行一段时间, 举个例子, 用户逻辑是一个JAVA的网站的服务, 那么一旦它开始进行GC后就不再接受用户的请求了, 这个网站在这段时间内就是不可用(不响应任何请求)的状态。")]),_._v(" "),v("h3",{attrs:{id:"_5、垃圾回收器【serial-gc】"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#_5、垃圾回收器【serial-gc】"}},[_._v("#")]),_._v(" 5、垃圾回收器【Serial GC】")]),_._v(" "),v("h4",{attrs:{id:"_5-1-串行"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#_5-1-串行"}},[_._v("#")]),_._v(" 5.1 串行")]),_._v(" "),v("ul",[v("li",[v("p",[_._v("单线程垃圾回收器：该线程运行时，其他线程都暂停")])]),_._v(" "),v("li",[v("p",[_._v("使用场景：堆内存较小，适合个人电脑（CPU核数较小）")])])]),_._v(" "),v("p",[v("img",{attrs:{src:"https://img-blog.csdnimg.cn/714559f7f71245ce943f28318dc5c89a.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBAbGVlZGNvZGVKb2huMDE=,size_13,color_FFFFFF,t_70,g_se,x_16",alt:"在这里插入图片描述"}})]),_._v(" "),v("h4",{attrs:{id:"_5-2-吞吐量优先【parallel-gc】"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#_5-2-吞吐量优先【parallel-gc】"}},[_._v("#")]),_._v(" 5.2 吞吐量优先【Parallel GC】")]),_._v(" "),v("ul",[v("li",[v("p",[_._v("多线程")])]),_._v(" "),v("li",[v("p",[_._v("堆内存较大，需要多核CPU的支持，工作在服务器上")])]),_._v(" "),v("li",[v("p",[_._v("目标：让单位时间内，STW的时间最短")])])]),_._v(" "),v("p",[_._v("例如：1小时内发生2次垃圾回收，每次垃圾回收0.2s 所以1小时内一共花费了0.4s")]),_._v(" "),v("ul",[v("li",[_._v("垃圾回收时间在程序运行时间中的占比，占比越小，说明吞吐量越大")])]),_._v(" "),v("p",[v("img",{attrs:{src:"https://img-blog.csdnimg.cn/4113479cec134399b18db93d81a59cd1.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBAbGVlZGNvZGVKb2huMDE=,size_14,color_FFFFFF,t_70,g_se,x_16",alt:"在这里插入图片描述"}})]),_._v(" "),v("h4",{attrs:{id:"_5-3-响应时间优先【cms】"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#_5-3-响应时间优先【cms】"}},[_._v("#")]),_._v(" 5.3 响应时间优先【CMS】")]),_._v(" "),v("ul",[v("li",[v("p",[_._v("多线程")])]),_._v(" "),v("li",[v("p",[_._v("堆内存较大，需要多核CPU的支持，工作在服务器上")])]),_._v(" "),v("li",[v("p",[_._v("目标：垃圾回收时，让单次的STW【Stop The World】的时间尽可能短")])])]),_._v(" "),v("p",[_._v("例如：1小时内发生5次垃圾回收，每次STW时间都是0.1s  所以一小时内一共花费了0.5s")]),_._v(" "),v("p",[_._v("【如果CPU是单核的，那么即是采用后两种支持多线程的方式回收，那也是多线程争抢时间片，然后轮流执行，并不能实现多线程同时执行】")]),_._v(" "),v("p",[v("img",{attrs:{src:"https://img-blog.csdnimg.cn/f2e6fc2c97b14301bcf9223fe3681045.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBAbGVlZGNvZGVKb2huMDE=,size_16,color_FFFFFF,t_70,g_se,x_16",alt:"在这里插入图片描述"}})]),_._v(" "),v("h4",{attrs:{id:"_5-1-garbage-first-g1-垃圾回收器"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#_5-1-garbage-first-g1-垃圾回收器"}},[_._v("#")]),_._v(" 5.1 Garbage First（G1）垃圾回收器")]),_._v(" "),v("p",[_._v("适用场景：")]),_._v(" "),v("ul",[v("li",[v("p",[_._v("同时注重吞吐量（Throughtput）和低延迟（Low latency），默认的暂停目标是200ms")])]),_._v(" "),v("li",[v("p",[_._v("超大堆内存，会将堆划分为多个大小相等的Region（区域）")])])]),_._v(" "),v("p",[_._v("堆内存过大会导致回收速度减慢，化整为零，变为小的区域进行回收")]),_._v(" "),v("ul",[v("li",[_._v("整体上是标记+整理算法，两个区域之间是复制算法")])]),_._v(" "),v("p",[_._v("相关JVM参数：")]),_._v(" "),v("ul",[v("li",[v("p",[_._v("-XX:+UserG1GC【在jdk1.8需要手动打开】")])]),_._v(" "),v("li",[v("p",[_._v("-XX:G1HeapRegionSize=size【设置区域的大小】")])]),_._v(" "),v("li",[v("p",[_._v("-XX:MaxGCPauseMillis=time【暂停目标设置】")])])]),_._v(" "),v("p",[v("img",{attrs:{src:"https://img-blog.csdnimg.cn/d9bd025534904069a4ba8cb9f7092bba.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBAbGVlZGNvZGVKb2huMDE=,size_13,color_FFFFFF,t_70,g_se,x_16",alt:"在这里插入图片描述"}})]),_._v(" "),v("p",[v("img",{attrs:{src:"https://img-blog.csdnimg.cn/db4e0720350b4594a098520f43cb6364.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBAbGVlZGNvZGVKb2huMDE=,size_17,color_FFFFFF,t_70,g_se,x_16",alt:"在这里插入图片描述"}})]),_._v(" "),v("p",[_._v("5）Full GC")]),_._v(" "),v("ul",[v("li",[v("p",[_._v("Serial GC")])]),_._v(" "),v("li",[v("p",[_._v("新生代内存不足发生的垃圾回收器-minor gc")])]),_._v(" "),v("li",[v("p",[_._v("老年代内存不足发生的垃圾回收器-full gc")])]),_._v(" "),v("li",[v("p",[_._v("ParallelGC")])]),_._v(" "),v("li",[v("p",[_._v("新生代内存不足发生的垃圾回收器-minor gc")])]),_._v(" "),v("li",[v("p",[_._v("老年代内存不足发生的垃圾回收器-full gc")])]),_._v(" "),v("li",[v("p",[_._v("CMS")])]),_._v(" "),v("li",[v("p",[_._v("新生代内存不足发生的垃圾回收器-minor gc")])]),_._v(" "),v("li",[v("p",[_._v("老年代内存不足：并发没有失败时，处于并发清理阶段，不是Full GC, 并发失败时，会触发串行回收：Full GC")])]),_._v(" "),v("li",[v("p",[_._v("G1")])]),_._v(" "),v("li",[v("p",[_._v("新生代内存不足发生的垃圾回收器-minor gc")])]),_._v(" "),v("li",[v("p",[_._v("老年代内存不足：如果并发清理的速度，快于产生新垃圾的速度，就不会触发Full GC")])])]),_._v(" "),v("p",[_._v("当垃圾产生的速度，大于并发清理的速度，此时就会触发串行回收，Full GC【此时的Full GC 也是多线程的】")]),_._v(" "),v("p",[v("img",{attrs:{src:"https://img-blog.csdnimg.cn/2ff77b983cc5460d892689a0c4cff660.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBAbGVlZGNvZGVKb2huMDE=,size_17,color_FFFFFF,t_70,g_se,x_16",alt:"在这里插入图片描述"}})]),_._v(" "),v("p",[v("img",{attrs:{src:"https://img-blog.csdnimg.cn/889610cd91f243b197c1dd60580d408d.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBAbGVlZGNvZGVKb2huMDE=,size_16,color_FFFFFF,t_70,g_se,x_16",alt:"在这里插入图片描述"}})])])}),[],!1,null,null,null);v.default=s.exports}}]);