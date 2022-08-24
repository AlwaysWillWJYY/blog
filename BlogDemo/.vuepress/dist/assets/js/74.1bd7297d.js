(window.webpackJsonp=window.webpackJsonp||[]).push([[74],{481:function(_,v,t){"use strict";t.r(v);var s=t(2),a=Object(s.a)({},(function(){var _=this,v=_._self._c;return v("ContentSlotsDistributor",{attrs:{"slot-key":_.$parent.slotKey}},[v("h3",{attrs:{id:"一、什么是简单工厂模式"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#一、什么是简单工厂模式"}},[_._v("#")]),_._v(" 一、什么是简单工厂模式？")]),_._v(" "),v("p",[_._v("简单工厂模式又称为静态工厂模式，实质是由一个工厂类根据传入的参数，动态决定应该创建哪一个产品类（这些产品类继承自一个父类或接口）的实例。简单工厂模式的创建目标，所有创建的对象都是充当这个角色的某个具体类的实例。")]),_._v(" "),v("p",[_._v("其实就是将一个具体类的实例化交给一个静态工厂方法来执行，它不属于GOF的23种设计模式，但现实中却经常会用到，而且思想也非常简单。")]),_._v(" "),v("h3",{attrs:{id:"二、简单工厂模式的结构"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#二、简单工厂模式的结构"}},[_._v("#")]),_._v(" 二、简单工厂模式的结构")]),_._v(" "),v("p",[_._v("简单工厂模式包含如下角色：")]),_._v(" "),v("p",[_._v("Factory："),v("code",[_._v("工厂角色")])]),_._v(" "),v("p",[_._v("Product："),v("code",[_._v("抽象产品角色")])]),_._v(" "),v("p",[_._v("ConcreteProduct："),v("code",[_._v("具体产品角色")])]),_._v(" "),v("p",[v("img",{attrs:{src:"https://img-blog.csdnimg.cn/5b84cf7b67e147889f06114c3b99b762.png",alt:"在这里插入图片描述"}})]),_._v(" "),v("h3",{attrs:{id:"三、简单工厂模式的使用场景"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#三、简单工厂模式的使用场景"}},[_._v("#")]),_._v(" 三、简单工厂模式的使用场景")]),_._v(" "),v("p",[_._v("1.前几天苹果公司刚发布IPhone Xs和iPhone XR，那么问题来了，苹果公司的代工厂到底生产多少种尺寸的手机呢?")]),_._v(" "),v("ul",[v("li",[v("p",[_._v("由工厂决定生产哪种型号的的手机，苹果公司的工厂就是一个工厂类，是简单工厂模式的核心类。")])]),_._v(" "),v("li",[v("p",[_._v("iPhoneX、iPhoneXs、iphoneXr都是苹果手机，只是型号不同。苹果手机类满足抽象的定义，各个型号的手机类是其具体实现。")])])]),_._v(" "),v("p",[_._v("2.考虑一个简单的软件应用场景，一个软件系统可以提供多个外观不同的按钮（如圆形按钮、矩形按钮、菱形按钮等），这些按钮都源自同一个基类，不过在继承基类后不同的子类修改了部分属性从而使得它们可以呈现不同的外观，如果我们希望在使用这些按钮时，不需要知道这些具体按钮类的名字，只需要知道表示该按钮类的一个参数，并提供一个调用方便的方法，把该参数传入方法即可返回一个相应的按钮对象，此时，就可以使用简单工厂模式。")]),_._v(" "),v("p",[_._v("在以下情况下可以使用简单工厂模式：")]),_._v(" "),v("p",[_._v("`工厂类负责创建的对象比较少：由于创建的对象较少，不会造成工厂方法中的业务逻辑太过复杂。")]),_._v(" "),v("p",[_._v("客户端只知道传入工厂类的参数，对于如何创建对象不关心：客户端既不需要关心创建细节，甚至连类名都不需要记住，只需要知道类型所对应的参数。`")]),_._v(" "),v("h3",{attrs:{id:"四、简单工厂模式和工厂方法模式的区别"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#四、简单工厂模式和工厂方法模式的区别"}},[_._v("#")]),_._v(" 四、简单工厂模式和工厂方法模式的区别")]),_._v(" "),v("p",[v("strong",[_._v("简单工厂模式：")])]),_._v(" "),v("p",[_._v("（1）工厂类负责创建的对象比较少，由于创建的对象较少，不会造成工厂方法中的业务逻辑太过复杂。")]),_._v(" "),v("p",[_._v("（2）客户端只知道传入工厂类的参数，对于如何创建对象并不关心。")]),_._v(" "),v("p",[v("strong",[_._v("工厂方法模式：")])]),_._v(" "),v("p",[_._v("（1）客户端不知道它所需要的对象的类。")]),_._v(" "),v("p",[_._v("（2）抽象工厂类通过其子类来指定创建哪个对象。")]),_._v(" "),v("h3",{attrs:{id:"五、简单工厂模式和策略模式的异同"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#五、简单工厂模式和策略模式的异同"}},[_._v("#")]),_._v(" 五、简单工厂模式和策略模式的异同")]),_._v(" "),v("p",[_._v("策略模式和简单工厂模式看起来非常相似，都是通过多态来实现不同子类的选取，这种思想应该是从程序的整体来看得出的。")]),_._v(" "),v("p",[_._v("如果从使用这两种模式的角度来看的话，我们会发现在"),v("code",[_._v("简单工厂模式中我们只需要传递相应的条件就能得到想要的一个对象，然后通过这个对象实现算法的操作")]),_._v("。")]),_._v(" "),v("p",[_._v("而策略模式，使用时必须首先创建一个想使用的类对象，然后将该对象做为参数传递进去，通过该对象调用不同的算法。")]),_._v(" "),v("p",[_._v("在简单工厂模式中实现了通过条件选取一个类去实例化对象，策略模式则将选取相应对象的工作交给模式的使用者，它本身不去做选取工作。")]),_._v(" "),v("p",[_._v("结合下面的代码和下面的释义不难看出，其实两个的差别很微妙,Factory是直接创建具体的对象并用该对象去执行相应的动作，而Context将这个操作给了Context类，没有创建具体的对象，实现的代码的进一步封装，客户端代码并不需要知道具体的实现过程。")]),_._v(" "),v("h3",{attrs:{id:"六、简单工厂模式的优缺点"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#六、简单工厂模式的优缺点"}},[_._v("#")]),_._v(" 六、简单工厂模式的优缺点")]),_._v(" "),v("ul",[v("li",[_._v("优点：")])]),_._v(" "),v("p",[_._v("工厂类是整个模式的关键.包含了必要的逻辑判断,根据外界给定的信息,决定究竟应该创建哪个具体类的对象.")]),_._v(" "),v("p",[_._v("通过使用工厂类,外界可以从直接创建具体产品对象的尴尬局面摆脱出来,仅仅需要负责“消费”对象就可以了。")]),_._v(" "),v("p",[_._v("而不必管这些对象究竟如何创建及如何组织的．明确了各自的职责和权利，有利于整个软件体系结构的优化。")]),_._v(" "),v("ul",[v("li",[_._v("缺点:")])]),_._v(" "),v("p",[_._v("由于工厂类集中了所有实例的创建逻辑，违反了开闭原则，将全部创建逻辑集中到了一个工厂类中；")]),_._v(" "),v("p",[v("code",[_._v("它所能创建的类只能是事先考虑到的，如果需要添加新的类，则就需要改变工厂类了。")])]),_._v(" "),v("p",[_._v("当系统中的具体产品类不断增多时候，可能会出现要求工厂类根据不同条件创建不同实例的需求．")]),_._v(" "),v("p",[_._v("这种对条件的判断和对具体产品类型的判断交错在一起，很难避免模块功能的蔓延，对系统的维护和扩展非常不利；")]),_._v(" "),v("p",[v("strong",[_._v("开闭原则定义：一个软件实体如类、模块和函数应该对扩展开放，对修改关闭。")])]),_._v(" "),v("p",[v("strong",[_._v("开放-封闭原则")]),_._v("的意思就是说，你设计的时候，时刻要考虑，尽量让这个类是足够好，写好了就不要去修改了，如果新需求来，我们增加一些类就完事了，原来的代码能不动则不动。这个原则有两个特性，一个是说“对于扩展是开放的”，另一个是说“对于更改是封闭的”。面对需求，对程序的改动是通过增加新代码进行的，而不是更改现有的代码。这就是“开放-封闭原则”的精神所在。")]),_._v(" "),v("h3",{attrs:{id:"七、简单工厂模式的实现"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#七、简单工厂模式的实现"}},[_._v("#")]),_._v(" 七、简单工厂模式的实现")]),_._v(" "),v("p",[v("img",{attrs:{src:"https://img-blog.csdnimg.cn/dd5345b1409c4274a4bc2f454ce87ce9.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBAbGVlZGNvZGVKb2huMDE=,size_20,color_FFFFFF,t_70,g_se,x_16",alt:"在这里插入图片描述"}})]),_._v(" "),v("p",[v("img",{attrs:{src:"https://img-blog.csdnimg.cn/4bca2ce8d52a4de198239289a5464829.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBAbGVlZGNvZGVKb2huMDE=,size_20,color_FFFFFF,t_70,g_se,x_16",alt:"在这里插入图片描述"}})]),_._v(" "),v("p",[v("img",{attrs:{src:"https://img-blog.csdnimg.cn/43732cbcc2104d5aad7940b50517f41a.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBAbGVlZGNvZGVKb2huMDE=,size_20,color_FFFFFF,t_70,g_se,x_16",alt:"在这里插入图片描述"}})]),_._v(" "),v("p",[v("img",{attrs:{src:"https://img-blog.csdnimg.cn/4bdce3efe8a442368744fe0a07c73465.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBAbGVlZGNvZGVKb2huMDE=,size_20,color_FFFFFF,t_70,g_se,x_16",alt:"在这里插入图片描述"}})]),_._v(" "),v("p",[v("code",[_._v("在使用工厂类创建产品对象时，我们只是传入了产品的某个属性，工厂就可以根据我们传入的属性创建出对应的对象实例，这就是简单工厂模式。")])]),_._v(" "),v("h3",{attrs:{id:"八、总结"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#八、总结"}},[_._v("#")]),_._v(" 八、总结")]),_._v(" "),v("p",[_._v("创建型模式对类的实例化过程进行了抽象，能够将对象的创建与对象的使用过程分离。")]),_._v(" "),v("p",[_._v("简单工厂模式又称为静态工厂方法模式，它属于类创建型模式。"),v("code",[_._v("在简单工厂模式中，可以根据参数的不同返回不同类的实例")]),_._v("。")]),_._v(" "),v("p",[_._v("简单工厂模式专门定义一个类来负责创建其他类的实例，被创建的实例通常都具有共同的父类。")]),_._v(" "),v("p",[_._v("简单工厂模式"),v("code",[_._v("包含三个角色")]),_._v("：工厂角色负责实现创建所有实例的内部逻辑；抽象产品角色是所创建的所有对象的父类，负责描述所有实例所共有的公共接口；具体产品角色是创建目标，所有创建的对象都充当这个角色的某个具体类的实例。")]),_._v(" "),v("p",[_._v("简单工厂模式的"),v("code",[_._v("要点")]),_._v("在于：当你需要什么，只需要传入一个正确的参数，就可以获取你所需要的对象，而无须知道其创建细节。")]),_._v(" "),v("p",[_._v("简单工厂模式"),v("code",[_._v("最大的优点")]),_._v("在于实现对象的创建和对象的使用分离，将对象的创建交给专门的工厂类负责，但是其最大的缺点在于工厂类不够灵活，增加新的具体产品需要修改工厂类的判断逻辑代码，而且产品较多时，工厂方法代码将会非常复杂。")]),_._v(" "),v("p",[_._v("简单工厂模式"),v("code",[_._v("适用情况")]),_._v("包括：工厂类负责创建的对象比较少；客户端只知道传入工厂类的参数，对于如何创建对象不关心。")])])}),[],!1,null,null,null);v.default=a.exports}}]);