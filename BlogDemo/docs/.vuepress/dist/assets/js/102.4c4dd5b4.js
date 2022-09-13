(window.webpackJsonp=window.webpackJsonp||[]).push([[102],{560:function(t,a,e){"use strict";e.r(a);var p=e(1),v=Object(p.a)({},(function(){var t=this,a=t._self._c;return a("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[a("p",[a("img",{attrs:{src:"https://img-blog.csdnimg.cn/fde85562f7bc4601a5505833ee6fb0a1.png",alt:"在这里插入图片描述"}})]),t._v(" "),a("p",[t._v("适配器模式(Adapter Pattern)：将一个接口转换成客户希望的另一个接口，使接口不兼容的那些类可以一起工作，其别名为包装器(Wrapper)。适配器模式既可以作为类结构型模式，也可以作为对象结构型模式。")]),t._v(" "),a("p",[t._v("在适配器模式中，我们通过增加一个新的适配器类来解决接口不兼容的问题，使得原本没有任何关系的类可以协同工作。")]),t._v(" "),a("p",[t._v("目标抽象类原来和适配者类之间毫无关系，现在想要适配者类实现目标抽象类的一些方法，让我们的适配器起到中介的作用。")]),t._v(" "),a("p",[t._v("类似于给手机充电，在手机和插座之间我们需要一个电源适配器来进行中转")]),t._v(" "),a("p",[t._v("根据适配器类与适配者类的关系不同，适配器模式可分为对象适配器和类适配器两种，"),a("code",[t._v("在对象适配器模式中，适配器与适配者之间是关联关系；在类适配器模式中，适配器与适配者之间是继承（或实现）关系。")])]),t._v(" "),a("p",[t._v("角色\n"),a("code",[t._v("Target（目标抽象类）")]),t._v("：目标抽象类定义客户所需接口，可以是一个抽象类或接口，也可以是具体类。")]),t._v(" "),a("p",[a("code",[t._v("Adapter（适配器类）")]),t._v("：适配器可以调用另一个接口，作为一个转换器，对Adaptee和Target进行适配，适配器类是适配器模式的核心，在对象适配器中，它通过继承Target并关联一个Adaptee对象使二者产生联系。")]),t._v(" "),a("p",[a("code",[t._v("Adaptee（适配者类）")]),t._v("：适配者即被适配的角色，它定义了一个已经存在的接口，这个接口需要适配，适配者类一般是一个具体类，包含了客户希望使用的业务方法，在某些情况下可能没有适配者类的源代码。")]),t._v(" "),a("p",[a("img",{attrs:{src:"https://img-blog.csdnimg.cn/a088ad3e3c614fd38954a5a64e3352ca.png",alt:"在这里插入图片描述"}})]),t._v(" "),a("p",[a("img",{attrs:{src:"https://img-blog.csdnimg.cn/fbcb6d2795d646c4bec04bad56cff092.png",alt:"在这里插入图片描述"}})]),t._v(" "),a("h3",{attrs:{id:"适配器模式总结"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#适配器模式总结"}},[t._v("#")]),t._v(" 适配器模式总结")]),t._v(" "),a("ol",[a("li",[a("p",[t._v("将目标类和适配者类解耦，通过引入一个适配器类来重用现有的适配者类，无须修改原有结构。")])]),t._v(" "),a("li",[a("p",[t._v("增加了类的透明性和复用性，将具体的业务实现过程封装在适配者类中，对于客户端类而言是透明的，而且提高了适配者的复用性，同一个适配者类可以在多个不同的系统中复用。")])]),t._v(" "),a("li",[a("p",[t._v("灵活性和扩展性都非常好，通过使用配置文件，可以很方便地更换适配器，也可以在不修改原有代码的基础上增加新的适配器类，完全符合“开闭原则”。")])])])])}),[],!1,null,null,null);a.default=v.exports}}]);