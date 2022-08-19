(window.webpackJsonp=window.webpackJsonp||[]).push([[55],{458:function(a,_,r){"use strict";r.r(_);var t=r(2),s=Object(t.a)({},(function(){var a=this,_=a._self._c;return _("ContentSlotsDistributor",{attrs:{"slot-key":a.$parent.slotKey}},[_("p",[a._v("由于Java面向对象的思想，在JVM中需要大量存储对象，存储时为了实现一些额外的功能，需要在对象中添加一些标记字段用于增强对象功能，这些标记字段组成对象头。")]),a._v(" "),_("h3",{attrs:{id:"_1、对象头形式"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#_1、对象头形式"}},[a._v("#")]),a._v(" 1、对象头形式")]),a._v(" "),_("p",[a._v("JVM中的对象头的方式有以下两种（以32位JVM为例）")]),a._v(" "),_("h4",{attrs:{id:"_1-1普通对象"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#_1-1普通对象"}},[a._v("#")]),a._v(" 1.1普通对象")]),a._v(" "),_("p",[_("img",{attrs:{src:"https://img-blog.csdnimg.cn/00253657569a4c58a4f54430c8980bd6.png",alt:"在这里插入图片描述"}})]),a._v(" "),_("h4",{attrs:{id:"_1-2数组对象"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#_1-2数组对象"}},[a._v("#")]),a._v(" 1.2数组对象")]),a._v(" "),_("p",[_("img",{attrs:{src:"https://img-blog.csdnimg.cn/d0f14ab8d6ab4457a5981ef75edb873e.png",alt:"在这里插入图片描述"}})]),a._v(" "),_("h3",{attrs:{id:"_2、对象头的组成"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#_2、对象头的组成"}},[a._v("#")]),a._v(" 2、对象头的组成")]),a._v(" "),_("h4",{attrs:{id:"_2-1mark-word"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#_2-1mark-word"}},[a._v("#")]),a._v(" 2.1Mark Word")]),a._v(" "),_("p",[a._v("这部分主要用来存储对象自身的运行时数据，如hashCode、gc分代年龄。MarkWord的位长度为JVM一个位数的大小，也就是说32位的JVM的MarkWord的长度为32为，64位JVM为64位。")]),a._v(" "),_("p",[a._v("为了让一个字大小存储更多的信息，JVM将字的最两个位设置为标记为位，不同标记位下的MarkWord示意如下：")]),a._v(" "),_("p",[_("img",{attrs:{src:"https://img-blog.csdnimg.cn/7422f602489b45829782b9e73c22a594.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBAbGVlZGNvZGVKb2huMDE=,size_14,color_FFFFFF,t_70,g_se,x_16",alt:"在这里插入图片描述"}})]),a._v(" "),_("p",[a._v("其中各部分含义如下：")]),a._v(" "),_("p",[a._v("lock：2位的锁状态标记，由于希望用尽可能少的二进制位表示尽可能多的信息，所以设置了lock标记。该标记的值不同，整个mark word表示的含义不同。")]),a._v(" "),_("p",[_("img",{attrs:{src:"https://img-blog.csdnimg.cn/ffb42de314b64481b66edb089150ff68.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBAbGVlZGNvZGVKb2huMDE=,size_10,color_FFFFFF,t_70,g_se,x_16",alt:"在这里插入图片描述"}})]),a._v(" "),_("p",[a._v("Biased_lock：对象是否启用偏向锁标记，只占1个二进制位。为1时表示对象启用偏向锁，为0时表示对象没有偏向锁；")]),a._v(" "),_("p",[a._v("age：4位的Java对象年龄。在GC中，如果对象在Survivor（幸存区）复制一次，年龄增加1。当对象年龄达到设定的阈值，将会晋升老年代。在默认情况下，并行GC年龄阈值为15，并发GC的年龄阈值为6。由于age只有4位，所以最大值是15，这就是-XX:MaxTenuringThreshold虚拟机参数最大值为15的原因；")]),a._v(" "),_("p",[a._v("Identity_hashCode:25位的对象标识Hash码，采用延迟加载技术。调用方法System.identityHashCode()计算，并会将结果写到对象头中。当对象被锁定时，该值会移动到管程Monitor中。")]),a._v(" "),_("p",[_("img",{attrs:{src:"https://img-blog.csdnimg.cn/889e206c37dc4006857534275ed7173a.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBAbGVlZGNvZGVKb2huMDE=,size_20,color_FFFFFF,t_70,g_se,x_16",alt:"在这里插入图片描述"}})]),a._v(" "),_("p",[_("img",{attrs:{src:"https://img-blog.csdnimg.cn/b5ae8ecc0e8a45c38deb03fc29981eae.png",alt:"在这里插入图片描述"}})]),a._v(" "),_("p",[_("code",[a._v("Thread")]),a._v(":持有偏向锁的线程ID；")]),a._v(" "),_("p",[_("code",[a._v("Epoch")]),a._v(":偏向锁时间戳")]),a._v(" "),_("p",[_("code",[a._v("Ptr_to_lock_record")]),a._v("：指向栈中锁记录指针")]),a._v(" "),_("p",[_("code",[a._v("Ptr_to_heavyweight_monitor")]),a._v("：指向管程Monitor的指针")]),a._v(" "),_("p",[a._v("JDK1.6以后的版本在处理同步锁时存在锁升级的概念，JVM对于同步锁的处理是从偏向锁开始的，随着竞争越来越激烈，处理方式从偏向锁升级到轻量级锁，最终升级到重量级锁。")]),a._v(" "),_("h3",{attrs:{id:"jvm一般是这样使用锁和mark-word的"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#jvm一般是这样使用锁和mark-word的"}},[a._v("#")]),a._v(" JVM一般是这样使用锁和Mark Word的：")]),a._v(" "),_("p",[a._v("1，当没有被当成锁时，这就是一个普通的对象，Mark Word记录对象的HashCode，锁标志位是01，是否偏向锁那一位是0。")]),a._v(" "),_("p",[a._v("2，当对象被当做同步锁并有一个线程A抢到了锁时，锁标志位还是01，但是否偏向锁那一位改成1，前23bit记录抢到锁的线程id，表示进入偏向锁状态。")]),a._v(" "),_("p",[a._v("3，当线程A再次试图来获得锁时，JVM发现同步锁对象的标志位是01，是否偏向锁是1，也就是偏向状态，Mark Word中记录的线程id就是线程A自己的id，表示线程A已经获得了这个偏向锁，可以执行同步锁的代码。")]),a._v(" "),_("p",[a._v("4，当线程B试图获得这个锁时，JVM发现同步锁处于偏向状态，但是Mark Word中的线程id记录的不是B，那么线程B会先用CAS操作试图获得锁，这里的获得锁操作是有可能成功的，因为线程A一般不会自动释放偏向锁。如果抢锁成功，就把Mark Word里的线程id改为线程B的id，代表线程B获得了这个偏向锁，可以执行同步锁代码。如果抢锁失败，则继续执行步骤5。")]),a._v(" "),_("p",[a._v("5，偏向锁状态抢锁失败，代表当前锁有一定的竞争，偏向锁将升级为轻量级锁。JVM会在当前线程的线程栈中开辟一块单独的空间，里面保存指向对象锁Mark Word的指针，同时在对象锁Mark Word中保存指向这片空间的指针。上述两个保存操作都是CAS操作，如果保存成功，代表线程抢到了同步锁，就把Mark Word中的锁标志位改成00，可以执行同步锁代码。如果保存失败，表示抢锁失败，竞争太激烈，继续执行步骤6。")]),a._v(" "),_("p",[a._v("6，轻量级锁抢锁失败，JVM会使用自旋锁，自旋锁不是一个锁状态，只是代表不断的重试，尝试抢锁。从JDK1.7开始，自旋锁默认启用，自旋次数由JVM决定。如果抢锁成功则执行同步锁代码，如果失败则继续执行步骤7。")]),a._v(" "),_("p",[a._v("7，自旋锁重试之后如果抢锁依然失败，同步锁会升级至重量级锁，锁标志位改为10。在这个状态下，未抢到锁的线程都会被阻塞。")]),a._v(" "),_("h4",{attrs:{id:"_2-2class-pointer"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#_2-2class-pointer"}},[a._v("#")]),a._v(" 2.2class pointer")]),a._v(" "),_("p",[a._v("这一部分用于存储对象的类型指针，该指针指向它的类元数据，JVM通过这个指针确定对象是哪个类的实例。该指针的位长度为JVM的一个字大小，即32位的JVM为32位，64位的JVM为64位。")]),a._v(" "),_("p",[a._v("如果应用的对象过多，使用64位的指针将浪费大量内存，统计而言，64位的JVM将会比32位的JVM多耗费50%的内存。为了节约内存可以使用选项+UseCompressedOops开启指针压缩，其中，oop即ordinary object pointer普通对象指针。开启该选项后，下列指针将压缩至32位：")]),a._v(" "),_("ol",[_("li",[_("p",[a._v("每个Class的属性指针（即静态变量）")])]),a._v(" "),_("li",[_("p",[a._v("每个对象的属性指针（即对象变量）")])]),a._v(" "),_("li",[_("p",[a._v("普通对象数组的每个元素指针")])])]),a._v(" "),_("p",[a._v("当然，也不是所有的指针都会压缩，一些特殊类型的指针JVM不会优化，比如指向PermGen的Class对象指针(JDK8中指向元空间的Class对象指针)、本地变量、堆栈元素、入参、返回值和NULL指针等。")]),a._v(" "),_("h4",{attrs:{id:"_2-3-array-length"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#_2-3-array-length"}},[a._v("#")]),a._v(" 2.3 array length")]),a._v(" "),_("p",[a._v("如果对象是一个数组，那么对象头还需要有额外的空间用于存储数组的长度，这部分数据的长度也随着JVM架构的不同而不同；32位的JVM上，长度为32位；64位JVM则为64位。64位JVM如果开启+UseCompressedOops选项，该区域长度也将由64位压缩至32位。")])])}),[],!1,null,null,null);_.default=s.exports}}]);