(window.webpackJsonp=window.webpackJsonp||[]).push([[69],{472:function(v,_,t){"use strict";t.r(_);var a=t(2),s=Object(a.a)({},(function(){var v=this,_=v._self._c;return _("ContentSlotsDistributor",{attrs:{"slot-key":v.$parent.slotKey}},[_("h3",{attrs:{id:"一、引言"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#一、引言"}},[v._v("#")]),v._v(" 一、引言")]),v._v(" "),_("p",[v._v("我们都知道，数据库连接是很珍贵的资源，频繁的开关数据库连接是非常浪费服务器的CPU资源以及内存的，所以我们一般都是使用数据库连接池来解决这一问题，即创造一堆等待被使用的连接，等到用的时候就从池里取一个，不用了再放回去，数据库连接在整个应用启动期间，几乎是不关闭的，除非是超过了最大闲置时间。")]),v._v(" "),_("p",[v._v("但是在程序员编写程序的时候，会经常使用connection.close()这样的方法，去关闭数据库连接，而且这样做是对的，所以你并不能告诉程序员们说，你们使用连接都不要关了，去调用一个其他的类似归还给连接池的方法吧。这是不符合程序员的编程思维的，也很勉强，而且具有风险性，因为程序员会忘的。")]),v._v(" "),_("p",[v._v("解决这一问题的办法就是使用代理模式，因为代理模式可以替代原有类的行为，所以我们要做的就是替换掉connection的close行为.")]),v._v(" "),_("p",[_("strong",[v._v("也就是说我们利用归还连接的行为替代了原来类中关闭连接的行为，这就是代理模式。")])]),v._v(" "),_("h3",{attrs:{id:"二、什么是代理模式"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#二、什么是代理模式"}},[v._v("#")]),v._v(" 二、什么是代理模式")]),v._v(" "),_("p",[v._v("代理模式——就是给某一个对象提供一个代理，并由代理对象控制对原对象的引用。在一些情况下，一个客户不想或者不能直接引用一个对象，而代理对象可以在客户端和目标对象之间起到中介的作用。例如电脑桌面的快捷方式就是一个代理对象，快捷方式是它所引用的程序的一个代理。")]),v._v(" "),_("h3",{attrs:{id:"代理模式的结构"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#代理模式的结构"}},[v._v("#")]),v._v(" 代理模式的结构")]),v._v(" "),_("p",[_("img",{attrs:{src:"https://img-blog.csdnimg.cn/638cf6c602b64b89ad5e433477ab715d.png",alt:"在这里插入图片描述"}})]),v._v(" "),_("p",[v._v("(1) "),_("code",[v._v("Subject（抽象主题角色）")]),v._v("：它声明了真实主题和代理主题的共同接口，这样一来在任何使用真实主题的地方都可以使用代理主题，客户端通常需要针对抽象主题角色进行编程。")]),v._v(" "),_("p",[v._v("(2)"),_("code",[v._v("Proxy（代理主题角色）")]),v._v("：它包含了对真实主题的引用，从而可以在任何时候操作真实主题对象；在代理主题角色中提供一个与真实主题角色相同的接口，以便在任何时候都可以替代真实主题；代理主题角色还可以控制对真实主题的使用，负责在需要的时候创建和删除真实主题对象，并对真实主题对象的使用加以约束。通常，在代理主题角色中，客户端在调用所引用的真实主题操作之前或之后还需要执行其他操作，而不仅仅是单纯调用真实主题对象中的操作。")]),v._v(" "),_("p",[v._v("(3)"),_("code",[v._v("RealSubject（真实主题角色）")]),v._v("：它定义了代理角色所代表的真实对象，在真实主题角色中实现了真实的业务操作，客户端可以通过代理主题角色间接调用真实主题角色中定义的操作。")]),v._v(" "),_("h3",{attrs:{id:"四、代理模式和装饰模式的异同"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#四、代理模式和装饰模式的异同"}},[v._v("#")]),v._v(" 四、代理模式和装饰模式的异同")]),v._v(" "),_("p",[v._v("代理模式和装饰模式的代码实现方式很相同，"),_("code",[v._v("主要不同点是代理模式关注与被代理对象行为的控制，然而装饰模式关注于在一个对象上动态的添加方法")]),v._v("。")]),v._v(" "),_("p",[v._v("代理模式可以对客户端隐藏被代理对象的具体实现，代理模式的时候常常是在一个代理类中创建一个对象的实例，"),_("code",[v._v("当使用装饰模式的时候，将原始对象转为一个参数传递给装饰者的构造器中")])]),v._v(" "),_("p",[v._v("代理模式强调的是"),_("code",[v._v("限制")]),v._v("，装饰模式强调的是"),_("code",[v._v("增强")])]),v._v(" "),_("h3",{attrs:{id:"五、代理模式和委托"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#五、代理模式和委托"}},[v._v("#")]),v._v(" 五、代理模式和委托")]),v._v(" "),_("p",[v._v("代理：是把一些事情交给某人帮忙去完成。\n委托：是当某件事情发生的时候，顺便干某件事情。委托就相当于一个触发器罢了。")]),v._v(" "),_("h3",{attrs:{id:"六、代理模式的种类"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#六、代理模式的种类"}},[v._v("#")]),v._v(" 六、代理模式的种类")]),v._v(" "),_("p",[v._v("在实际开发过程中，代理类的实现比上述代码要复杂很多，代理模式根据其目的和实现方式不同可分为很多种类，其中常用的几种代理模式简要说明如下：")]),v._v(" "),_("p",[v._v("(1) "),_("code",[v._v("远程代理(Remote Proxy)")]),v._v("：为一个位于不同的地址空间的对象提供一个本地的代理对象，这个不同的地址空间可以是在同一台主机中，也可是在另一台主机中，远程代理又称为大使(Ambassador)。")]),v._v(" "),_("p",[v._v("(2) "),_("code",[v._v("虚拟代理(Virtual Proxy)")]),v._v("：如果需要创建一个资源消耗较大的对象，先创建一个消耗相对较小的对象来表示，真实对象只在需要时才会被真正创建。")]),v._v(" "),_("p",[v._v("(3) "),_("code",[v._v("保护代理(Protect Proxy)")]),v._v("：控制对一个对象的访问，可以给不同的用户提供不同级别的使用权限。")]),v._v(" "),_("p",[v._v("(4) "),_("code",[v._v("缓冲代理(Cache Proxy)")]),v._v("：为某一个目标操作的结果提供临时的存储空间，以便多个客户端可以共享这些结果。")]),v._v(" "),_("p",[v._v("(5) "),_("code",[v._v("智能引用代理(Smart Reference Proxy)")]),v._v("：当一个对象被引用时，提供一些额外的操作，例如将对象被调用的次数记录下来等。")]),v._v(" "),_("h3",{attrs:{id:"七、代理模式的应用场景"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#七、代理模式的应用场景"}},[v._v("#")]),v._v(" 七、代理模式的应用场景")]),v._v(" "),_("p",[v._v("代理模式的类型较多，不同类型的代理模式有不同的优缺点，它们应用于不同的场合：")]),v._v(" "),_("p",[v._v("(1) 当客户端对象需要访问远程主机中的对象时可以使用远程代理。")]),v._v(" "),_("p",[v._v("(2) 当需要用一个消耗资源较少的对象来代表一个消耗资源较多的对象，从而降低系统开销、缩短运行时间时可以使用虚拟代理，例如一个对象需要很长时间才能完成加载时。")]),v._v(" "),_("p",[v._v("(3) 当需要为某一个被频繁访问的操作结果提供一个临时存储空间，以供多个客户端共享访问这些结果时可以使用缓冲代理。通过使用缓冲代理，系统无须在客户端每一次访问时都重新执行操作，只需直接从临时缓冲区获取操作结果即可。")]),v._v(" "),_("p",[v._v("(4) 当需要控制对一个对象的访问，为不同用户提供不同级别的访问权限时可以使用保护代理。")]),v._v(" "),_("p",[v._v("(5) 当需要为一个对象的访问（引用）提供一些额外的操作时可以使用智能引用代理。")]),v._v(" "),_("h3",{attrs:{id:"八、代理模式的优缺点"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#八、代理模式的优缺点"}},[v._v("#")]),v._v(" 八、代理模式的优缺点")]),v._v(" "),_("p",[_("code",[v._v("优点")]),v._v("：")]),v._v(" "),_("p",[v._v("(1) 能够协调调用者和被调用者，"),_("code",[v._v("在一定程度上降低了系统的耦合度")]),v._v("。")]),v._v(" "),_("p",[v._v("(2) 客户端可以针对抽象主题角色进行编程，"),_("code",[v._v("增加和更换代理类无须修改源代码，符合开闭原则，系统具有较好的灵活性和可扩展性")]),v._v("。")]),v._v(" "),_("p",[_("code",[v._v("缺点")]),v._v(":")]),v._v(" "),_("p",[v._v("(1) 由于在客户端和真实主题之间增加了代理对象，因此有些类型的代理模式可能会造成请求的处理速度变慢，例如保护代理。")]),v._v(" "),_("p",[v._v("(2) 实现代理模式需要额外的工作，而且有些代理模式的实现过程较为复杂，例如远程代理。")]),v._v(" "),_("h3",{attrs:{id:"九、代理模式的实现"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#九、代理模式的实现"}},[v._v("#")]),v._v(" 九、代理模式的实现")]),v._v(" "),_("p",[_("img",{attrs:{src:"https://img-blog.csdnimg.cn/08499255c61d4bf9b1909c3f81d54eb3.png",alt:"在这里插入图片描述"}})]),v._v(" "),_("p",[_("img",{attrs:{src:"https://img-blog.csdnimg.cn/7569ca64085645148b670e8baff84ce1.png",alt:"在这里插入图片描述"}})]),v._v(" "),_("p",[_("img",{attrs:{src:"https://img-blog.csdnimg.cn/6f807f099db84ebe8a602ecbc14808e1.png",alt:"在这里插入图片描述"}})]),v._v(" "),_("p",[_("img",{attrs:{src:"https://img-blog.csdnimg.cn/368906523a6f44cfa93f5bda5325d865.png",alt:"在这里插入图片描述"}})]),v._v(" "),_("p",[_("img",{attrs:{src:"https://img-blog.csdnimg.cn/e3b008b630f34b2bb64b4c1b34541521.png",alt:"在这里插入图片描述"}})]),v._v(" "),_("p",[_("code",[v._v("代理模式就是，代理类和被代理类同时实现一个接口，该接口中的方法是被代理类需要被修改的方法 代理类在其内部创建一个被代理类的对象，并利用该对象实现被代理类中方法的修改，这样以后需要调用被代理对象修改后的方法的情况下 我们只需要创建代理对象实例，并且调用该方法即可。")])])])}),[],!1,null,null,null);_.default=s.exports}}]);