(window.webpackJsonp=window.webpackJsonp||[]).push([[102],{565:function(_,v,t){"use strict";t.r(v);var s=t(2),a=Object(s.a)({},(function(){var _=this,v=_._self._c;return v("ContentSlotsDistributor",{attrs:{"slot-key":_.$parent.slotKey}},[v("h3",{attrs:{id:"单例模式-singleton"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#单例模式-singleton"}},[_._v("#")]),_._v(" 单例模式（SingleTon）")]),_._v(" "),v("h4",{attrs:{id:"_1、什么是单例模式"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#_1、什么是单例模式"}},[_._v("#")]),_._v(" 1、什么是单例模式？")]),_._v(" "),v("p",[_._v("单例模式是一种常用的软件设计模式，其定义是单例对象的类只能允许一个实例存在。")]),_._v(" "),v("p",[v("code",[_._v("许多时候整个系统只需要拥有一个的全局对象，这样有利于我们协调系统整体的行为")]),_._v("。比如在某个服务器程序中，该服务器的配置信息存放在一个文件中，这些配置数据由一个单例对象统一读取，然后服务进程中的其他对象再通过这个单例对象获取这些配置信息。这种方式简化了在复杂环境下的配置管理。")]),_._v(" "),v("p",[v("img",{attrs:{src:"https://img-blog.csdnimg.cn/74641354f8124fea84f333d7d59d0b42.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBAbGVlZGNvZGVKb2huMDE=,size_20,color_FFFFFF,t_70,g_se,x_16",alt:"在这里插入图片描述"}})]),_._v(" "),v("p",[v("code",[_._v("单例的实现主要是通过以下两个步骤：")])]),_._v(" "),v("ul",[v("li",[v("p",[_._v("将该类的构造方法定义为私有方法，这样其他处的代码就无法通过调用该类的构造方法来实例化该类的对象，只有通过该类提供的静态方法来得到该类的唯一实例；")])]),_._v(" "),v("li",[v("p",[_._v("在该类内提供一个静态方法，当我们调用这个方法时，如果类持有的引用不为空就返回这个引用，如果类保持的引用为空就创建该类的实例并将实例的引用赋予该类保持的引用。")])])]),_._v(" "),v("h4",{attrs:{id:"_2、单例模式的使用场景"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#_2、单例模式的使用场景"}},[_._v("#")]),_._v(" 2、单例模式的使用场景")]),_._v(" "),v("p",[_._v("举一个小例子，在我们的windows桌面上，我们打开了一个回收站，当我们试图再次打开一个新的回收站时，Windows系统并不会为你弹出一个新的回收站窗口。也就是说在整个系统运行的过程中，系统只维护一个回收站的实例。这就是一个典型的单例模式运用。")]),_._v(" "),v("p",[_._v("继续说回收站，我们在实际使用中并不存在需要同时打开两个回收站窗口的必要性。假如我每次创建回收站时都需要消耗大量的资源，而每个回收站之间资源是共享的，那么在没有必要多次重复创建该实例的情况下，创建了多个实例，这样做就会给系统造成不必要的负担，造成资源浪费。")]),_._v(" "),v("p",[_._v("再举一个例子，网站的计数器，一般也是采用单例模式实现，如果你存在多个计数器，每一个用户的访问都刷新计数器的值，这样的话你的实计数的值是难以同步的。但是如果采用单例模式实现就不会存在这样的问题，而且还可以避免线程安全问题。同样多线程的线程池的设计一般也是采用单例模式，这是由于线程池需要方便对池中的线程进行控制.")]),_._v(" "),v("p",[_._v("同样，对于一些应用程序的日志应用，或者web开发中读取配置文件都适合使用单例模式，如HttpApplication 就是单例的典型应用。")]),_._v(" "),v("p",[_._v("从上述的例子中我们可以总结出适合使用单例模式的场景和优缺点：")]),_._v(" "),v("ul",[v("li",[_._v("适用场景：")])]),_._v(" "),v("p",[_._v("1.需要生成唯一序列的环境")]),_._v(" "),v("p",[_._v("2.需要频繁实例化然后销毁的对象。")]),_._v(" "),v("p",[_._v("3.创建对象时耗时过多或者耗资源过多，但又经常用到的对象。")]),_._v(" "),v("p",[_._v("4.方便资源相互通信的环境")]),_._v(" "),v("h4",{attrs:{id:"_3、单例模式的优缺点"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#_3、单例模式的优缺点"}},[_._v("#")]),_._v(" 3、单例模式的优缺点")]),_._v(" "),v("ul",[v("li",[_._v("优点：")])]),_._v(" "),v("ol",[v("li",[v("p",[_._v("在内存中只有一个对象，节省内存空间；")])]),_._v(" "),v("li",[v("p",[_._v("避免频繁的创建销毁对象，可以提高性能；")])]),_._v(" "),v("li",[v("p",[_._v("避免对共享资源的多重占用，简化访问；")])]),_._v(" "),v("li",[v("p",[_._v("为整个系统提供一个全局访问点。")])])]),_._v(" "),v("ul",[v("li",[_._v("缺点：")])]),_._v(" "),v("ol",[v("li",[v("p",[_._v("不适用于变化频繁的对象；")])]),_._v(" "),v("li",[v("p",[_._v("滥用单例将带来一些负面问题，如为了节省资源将数据库连接池对象设计为的单例类，可能会导致共享连接池对象的程序过多而出现连接池溢出；")])]),_._v(" "),v("li",[v("p",[_._v("如果实例化的对象长时间不被利用，系统会认为该对象是垃圾而被回收，这可能会导致对象状态的丢失；")])])]),_._v(" "),v("h4",{attrs:{id:"_4、单例模式的实现"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#_4、单例模式的实现"}},[_._v("#")]),_._v(" 4、单例模式的实现")]),_._v(" "),v("p",[_._v("1、饿汉式")]),_._v(" "),v("p",[v("img",{attrs:{src:"https://img-blog.csdnimg.cn/ca3e712cf3b840029882797581c006d1.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBAbGVlZGNvZGVKb2huMDE=,size_17,color_FFFFFF,t_70,g_se,x_16",alt:"在这里插入图片描述"}})]),_._v(" "),v("p",[_._v("为什么叫饿汉式：")]),_._v(" "),v("p",[_._v("我们知道，"),v("code",[_._v("类加载的方式是按需加载，且加载一次")]),_._v("。因此，在上述单例类被加载时，就会实例化一个对象并交给自己的引用，供系统使用；而且，由于这个类在整个生命周期中只会被加载一次，因此只会创建一个实例，即能够充分保证单例。")]),_._v(" "),v("ul",[v("li",[v("p",[_._v("优点：这种写法比较简单，就是在类装载的时候就完成实例化。避免了线程同步问题。")])]),_._v(" "),v("li",[v("p",[_._v("缺点：在类装载的时候就完成实例化，没有达到Lazy Loading的效果。如果从始至终从未使用过这个实例，则会造成内存的浪费。")])])]),_._v(" "),v("p",[_._v("2、懒汉式")]),_._v(" "),v("p",[v("img",{attrs:{src:"https://img-blog.csdnimg.cn/46d7255c88b04a158c17531cfd3cadf1.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBAbGVlZGNvZGVKb2huMDE=,size_15,color_FFFFFF,t_70,g_se,x_16",alt:"在这里插入图片描述"}})]),_._v(" "),v("p",[_._v("我们从懒汉式单例可以看到，单例实例被"),v("code",[_._v("延迟加载")]),_._v("，即只有在真正使用的时候才会实例化一个对象并交给自己的引用。")]),_._v(" "),v("p",[_._v("这种写法起到了Lazy Loading的效果，但是只能在单线程下使用。如果在多线程下，一个线程进入了if (singleton == null)判断语句块，还未来得及往下执行，另一个线程也通过了这个判断语句，这时便会产生多个实例。所以在多线程环境下不可使用这种方式。")]),_._v(" "),v("p",[_._v("3、双重加锁机制")]),_._v(" "),v("p",[v("img",{attrs:{src:"https://img-blog.csdnimg.cn/a1e59a41e861487aa6d27c9106792df3.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBAbGVlZGNvZGVKb2huMDE=,size_14,color_FFFFFF,t_70,g_se,x_16",alt:"在这里插入图片描述"}})]),_._v(" "),v("p",[_._v("Double-Check概念对于多线程开发者来说不会陌生，如代码中所示，我们进行了两次if (singleton == null)检查，这样就可以保证线程安全了。这样，实例化代码只用执行一次，后面再次访问时，判断if (singleton == null)，直接return实例化对象。")]),_._v(" "),v("p",[_._v("使用双重检测同步延迟加载去创建单例的做法是一个非常优秀的做法，"),v("code",[_._v("其不但保证了单例，而且切实提高了程序运行效率")])]),_._v(" "),v("p",[_._v("优点：线程安全；延迟加载；效率较高。")])])}),[],!1,null,null,null);v.default=a.exports}}]);