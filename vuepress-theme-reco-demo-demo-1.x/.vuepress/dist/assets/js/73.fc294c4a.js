(window.webpackJsonp=window.webpackJsonp||[]).push([[73],{476:function(s,a,t){"use strict";t.r(a);var n=t(2),e=Object(n.a)({},(function(){var s=this,a=s._self._c;return a("ContentSlotsDistributor",{attrs:{"slot-key":s.$parent.slotKey}},[a("h3",{attrs:{id:"一、前言"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#一、前言"}},[s._v("#")]),s._v(" 一、前言")]),s._v(" "),a("p",[s._v("装饰模式实际上是一直提倡的"),a("code",[s._v("组合代替继承")]),s._v("的实践方式,个人认为要理解装饰者模式首先需要理解为什么需要组合代替继承,继承又是为什么让人深恶痛绝.")]),s._v(" "),a("p",[a("strong",[s._v("为什么建议使用组合代替继承?")])]),s._v(" "),a("p",[a("code",[s._v("面向对象的特性有继承与封装,但两者却又有一点矛盾,继承意味子类依赖了父类中的实现,一旦父类中改变实现则会对子类造成影响,这是打破了封装性的一种表现. 而组合就是巧用封装性来实现继承功能的代码复用.")])]),s._v(" "),a("h3",{attrs:{id:"二、什么是装饰模式"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#二、什么是装饰模式"}},[s._v("#")]),s._v(" 二、什么是装饰模式")]),s._v(" "),a("p",[s._v("1.定义：")]),s._v(" "),a("p",[a("code",[s._v("装饰器模式又名包装(Wrapper)模式。装饰器模式以对客户端透明的方式拓展对象的功能，是继承关系的一种替代方案。")])]),s._v(" "),a("p",[s._v("2.意图:")]),s._v(" "),a("p",[a("code",[s._v("动态地给一个对象添加一些额外的职责。就增加功能来说，Decorator模式相比生成子类更为灵活。")])]),s._v(" "),a("p",[s._v("3.别名")]),s._v(" "),a("p",[s._v("包装器Wrapper")]),s._v(" "),a("p",[s._v("4.动机")]),s._v(" "),a("p",[s._v("有时我们希望给某个对象而不是整个类添加一些功能。例如，一个图形用户界面工具箱允许你对任意一个用户界面组件添加一些组件，例如边框，或是一些行为，例如窗口滚动等。")]),s._v(" "),a("p",[s._v("5.作用")]),s._v(" "),a("p",[s._v("在不修改原有的接口的情况下，让类表现的更好。")]),s._v(" "),a("p",[s._v("6.问题")]),s._v(" "),a("p",[s._v("自然是继承有一些问题\n继承会导致超类和子类之间存在强耦合性，当超类改变时，子类也会随之改变；\n超类的内部细节对于子类是可见的，继承常常被认为破坏了封装性；")]),s._v(" "),a("h3",{attrs:{id:"三、装饰者模式的结构"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#三、装饰者模式的结构"}},[s._v("#")]),s._v(" 三、装饰者模式的结构")]),s._v(" "),a("p",[s._v("在装饰器模式中的角色有:")]),s._v(" "),a("p",[s._v("• 抽象构件(Component)角色：给出一个抽象接口，已规范准备接收附加责任的对象。")]),s._v(" "),a("p",[s._v("• 具体构件(ConcreteComponent)角色：定义一个将要接收附加责任的类")]),s._v(" "),a("p",[s._v("• 装饰(Decorator)角色：持有一个构件(Component)对象的实例，并定义一个与抽象构件接口一致的接口。")]),s._v(" "),a("p",[s._v("• 具体装饰(ConcreteDecorator)角色：负责给构件对象“贴上”附加的责任。")]),s._v(" "),a("h3",{attrs:{id:"四、装饰者模式的使用场景"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#四、装饰者模式的使用场景"}},[s._v("#")]),s._v(" 四、装饰者模式的使用场景")]),s._v(" "),a("ol",[a("li",[a("p",[s._v("需要扩展一个类的功能或给一个类增加附加责任。")])]),s._v(" "),a("li",[a("p",[s._v("需要动态地给一个对象增加功能，这些功能可以再动态地撤销。")])]),s._v(" "),a("li",[a("p",[s._v("需要增加由一些基本功能的排列组合而产生的非常大量的功能")])])]),s._v(" "),a("h3",{attrs:{id:"五、装饰者模式的优缺点"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#五、装饰者模式的优缺点"}},[s._v("#")]),s._v(" 五、装饰者模式的优缺点")]),s._v(" "),a("p",[a("code",[s._v("优点")]),s._v("：")]),s._v(" "),a("ol",[a("li",[a("p",[s._v("装饰这模式和继承的目的都是扩展对象的功能，但装饰者模式比继承更灵活")])]),s._v(" "),a("li",[a("p",[s._v("通过使用不同的具体装饰类以及这些类的排列组合，设计师可以创造出很多不同行为的组合")])]),s._v(" "),a("li",[a("p",[s._v("装饰者模式有很好地可扩展性")])])]),s._v(" "),a("p",[a("code",[s._v("缺点")]),s._v("：")]),s._v(" "),a("p",[s._v("装饰者模式会导致设计中出现许多小对象，如果过度使用，会让程序变的更复杂。并且更多的对象会是的差错变得困难，特别是这些对象看上去都很像。")]),s._v(" "),a("h3",{attrs:{id:"六、装饰者模式的实现"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#六、装饰者模式的实现"}},[s._v("#")]),s._v(" 六、装饰者模式的实现")]),s._v(" "),a("p",[a("img",{attrs:{src:"https://img-blog.csdnimg.cn/edf7f3a46bdf4fc38236b85f02e1e44b.png",alt:"在这里插入图片描述"}})]),s._v(" "),a("p",[s._v("装饰模式就是给一个对象增加一些新的功能，而且是动态的，要求装饰对象和被装饰对象实现同一个接口，装饰对象持有被装饰对象的一个实例：")]),s._v(" "),a("p",[s._v("本例中：")]),s._v(" "),a("p",[s._v("装饰者是Decorator对象")]),s._v(" "),a("p",[s._v("装饰者的构造方法中的参数是被装饰对象")]),s._v(" "),a("p",[s._v("被装饰者是Source对象")]),s._v(" "),a("p",[a("img",{attrs:{src:"https://img-blog.csdnimg.cn/070eb3c9793c475e8ef72b473fdb4bad.png",alt:"在这里插入图片描述"}})]),s._v(" "),a("h3",{attrs:{id:"七、总结"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#七、总结"}},[s._v("#")]),s._v(" 七、总结")]),s._v(" "),a("p",[s._v("装饰者模式本质上来说是AOP思想的一种实现方式，其持有被装饰者，因此可以控制被装饰者的行为从而达到了AOP的效果。")]),s._v(" "),a("p",[a("strong",[s._v("要点：")])]),s._v(" "),a("p",[s._v("1：继承属于扩展形式一种，但不见的是达到弹性设计的最佳方式，组合优于继承。")]),s._v(" "),a("p",[s._v("2：应该允许行为可以被拓展，而无需修改现有的代码。")]),s._v(" "),a("p",[s._v("3：装饰者模式意味着一群装饰者类，这些类用来包装具体组件。")]),s._v(" "),a("p",[s._v("4：装饰者类反映出被装饰组件类型。")]),s._v(" "),a("p",[s._v("5：可以使用无数个装饰者包装一个组件。")]),s._v(" "),a("p",[s._v("6：装饰者会导致设计中出现许多小对象，如果过度使用，会让程序变得很复杂。")]),s._v(" "),a("p",[a("code",[s._v("装饰模式和代理模式的区别")])]),s._v(" "),a("p",[s._v("举个生动的例子：")]),s._v(" "),a("p",[s._v("代理模式和装饰器模式很像，这里用【到咖啡馆喝咖啡】作例子来讲解。")]),s._v(" "),a("p",[s._v("基础实现")]),s._v(" "),a("p",[s._v("定义一个咖啡的接口。")]),s._v(" "),a("div",{staticClass:"language-java line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-java"}},[a("code",[a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("public")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("interface")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token class-name"}},[s._v("Coffee")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n    "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("/**\n     * 打印当前咖啡里有什么\n     */")]),s._v("\n    "),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("void")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("printMaterial")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br"),a("span",{staticClass:"line-number"},[s._v("3")]),a("br"),a("span",{staticClass:"line-number"},[s._v("4")]),a("br"),a("span",{staticClass:"line-number"},[s._v("5")]),a("br"),a("span",{staticClass:"line-number"},[s._v("6")]),a("br")])]),a("p",[s._v("定义一个苦咖啡的实现。")]),s._v(" "),a("div",{staticClass:"language-java line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-java"}},[a("code",[a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("public")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("class")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token class-name"}},[s._v("BitterCoffee")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("implements")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token class-name"}},[s._v("Coffee")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n    "),a("span",{pre:!0,attrs:{class:"token annotation punctuation"}},[s._v("@Override")]),s._v("\n        "),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("public")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("void")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("printMaterial")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n            "),a("span",{pre:!0,attrs:{class:"token class-name"}},[s._v("System")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),s._v("out"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("println")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"咖啡"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n        "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br"),a("span",{staticClass:"line-number"},[s._v("3")]),a("br"),a("span",{staticClass:"line-number"},[s._v("4")]),a("br"),a("span",{staticClass:"line-number"},[s._v("5")]),a("br"),a("span",{staticClass:"line-number"},[s._v("6")]),a("br")])]),a("p",[s._v("定义一个默认的点咖啡逻辑。")]),s._v(" "),a("div",{staticClass:"language-java line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-java"}},[a("code",[a("span",{pre:!0,attrs:{class:"token annotation punctuation"}},[s._v("@Test")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("public")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("void")]),s._v(" orderCoffee "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n    "),a("span",{pre:!0,attrs:{class:"token class-name"}},[s._v("Coffee")]),s._v(" coffee "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("new")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token class-name"}},[s._v("BitterCoffee")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n    coffee"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("printMaterial")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("// 咖啡")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br"),a("span",{staticClass:"line-number"},[s._v("3")]),a("br"),a("span",{staticClass:"line-number"},[s._v("4")]),a("br"),a("span",{staticClass:"line-number"},[s._v("5")]),a("br")])]),a("p",[s._v("装饰器模式")]),s._v(" "),a("p",[s._v("你喝了一口咖啡，觉得有点苦，于是你就想加点糖。")]),s._v(" "),a("p",[s._v("定义一个咖啡装饰器（加糖）。")]),s._v(" "),a("div",{staticClass:"language-java line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-java"}},[a("code",[a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("public")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("class")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token class-name"}},[s._v("CoffeeDecorator")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("implements")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token class-name"}},[s._v("Coffee")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n    "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("/**\n     * 持有一个咖啡对象\n     */")]),s._v("\n    "),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("private")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("final")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token class-name"}},[s._v("Coffee")]),s._v(" coffee"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n    "),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("public")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token class-name"}},[s._v("CoffeeDecorator")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),a("span",{pre:!0,attrs:{class:"token class-name"}},[s._v("Coffee")]),s._v(" coffee"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n        "),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("this")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),s._v("coffee "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" coffee"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n    "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n    "),a("span",{pre:!0,attrs:{class:"token annotation punctuation"}},[s._v("@Override")]),s._v("\n        "),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("public")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("void")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("printMaterial")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n            "),a("span",{pre:!0,attrs:{class:"token class-name"}},[s._v("System")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),s._v("out"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("println")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"糖"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n            "),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("this")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),s._v("coffee"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("printMaterial")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n        "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br"),a("span",{staticClass:"line-number"},[s._v("3")]),a("br"),a("span",{staticClass:"line-number"},[s._v("4")]),a("br"),a("span",{staticClass:"line-number"},[s._v("5")]),a("br"),a("span",{staticClass:"line-number"},[s._v("6")]),a("br"),a("span",{staticClass:"line-number"},[s._v("7")]),a("br"),a("span",{staticClass:"line-number"},[s._v("8")]),a("br"),a("span",{staticClass:"line-number"},[s._v("9")]),a("br"),a("span",{staticClass:"line-number"},[s._v("10")]),a("br"),a("span",{staticClass:"line-number"},[s._v("11")]),a("br"),a("span",{staticClass:"line-number"},[s._v("12")]),a("br"),a("span",{staticClass:"line-number"},[s._v("13")]),a("br"),a("span",{staticClass:"line-number"},[s._v("14")]),a("br"),a("span",{staticClass:"line-number"},[s._v("15")]),a("br")])]),a("p",[s._v("定义一个咖啡加糖的应用逻辑。")]),s._v(" "),a("div",{staticClass:"language-java line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-java"}},[a("code",[a("span",{pre:!0,attrs:{class:"token annotation punctuation"}},[s._v("@Test")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("public")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("void")]),s._v(" addSugerIntoCoffee "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n    "),a("span",{pre:!0,attrs:{class:"token class-name"}},[s._v("Coffee")]),s._v(" coffee "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("new")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token class-name"}},[s._v("BitterCoffee")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("// 点了一杯苦咖啡")]),s._v("\n    coffee "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("new")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token class-name"}},[s._v("SugarDecorator")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("coffee"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("// 给咖啡加了点糖")]),s._v("\n    coffee"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("printMaterial")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("// 糖 咖啡")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br"),a("span",{staticClass:"line-number"},[s._v("3")]),a("br"),a("span",{staticClass:"line-number"},[s._v("4")]),a("br"),a("span",{staticClass:"line-number"},[s._v("5")]),a("br"),a("span",{staticClass:"line-number"},[s._v("6")]),a("br")])]),a("p",[s._v("装饰器适用场景：我有一个对象，但是这个对象的功能不能使我满意（咖啡太苦了），我就拿装饰器给他装饰一下（给咖啡加糖）。")]),s._v(" "),a("p",[s._v("装饰器的作用在于，我们将拿到的咖啡传递给装饰器，装饰器把咖啡加好糖之后再返回给我，咖啡并不是装饰器自己的，是我给装饰器的")]),s._v(" "),a("p",[s._v("如果我想加奶，我就再创建一个加奶的装饰器，然后把咖啡传给加奶的装饰器，装饰器就会返给我一杯加奶的咖啡")]),s._v(" "),a("p",[s._v("代理模式（静态代理）")]),s._v(" "),a("p",[s._v("约好的朋友来了，要给她点一杯咖啡，你知道咖啡很苦，决定直接点一杯加了糖的咖啡给她。")]),s._v(" "),a("p",[s._v("定义一个加糖咖啡的类。")]),s._v(" "),a("div",{staticClass:"language-java line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-java"}},[a("code",[a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("public")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("class")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token class-name"}},[s._v("CoffeeProxy")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("implements")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token class-name"}},[s._v("Coffee")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n    "),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("private")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("final")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token class-name"}},[s._v("Coffee")]),s._v(" coffee"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n    "),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("public")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token class-name"}},[s._v("CoffeeProxy")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n        "),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("this")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),s._v("coffee "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("new")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token class-name"}},[s._v("BitterCoffee")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n    "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n    "),a("span",{pre:!0,attrs:{class:"token annotation punctuation"}},[s._v("@Override")]),s._v("\n        "),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("public")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("void")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("printMaterial")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n            "),a("span",{pre:!0,attrs:{class:"token class-name"}},[s._v("System")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),s._v("out"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("println")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"糖"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n            "),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("this")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),s._v("coffee"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("printMaterial")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n        "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br"),a("span",{staticClass:"line-number"},[s._v("3")]),a("br"),a("span",{staticClass:"line-number"},[s._v("4")]),a("br"),a("span",{staticClass:"line-number"},[s._v("5")]),a("br"),a("span",{staticClass:"line-number"},[s._v("6")]),a("br"),a("span",{staticClass:"line-number"},[s._v("7")]),a("br"),a("span",{staticClass:"line-number"},[s._v("8")]),a("br"),a("span",{staticClass:"line-number"},[s._v("9")]),a("br"),a("span",{staticClass:"line-number"},[s._v("10")]),a("br"),a("span",{staticClass:"line-number"},[s._v("11")]),a("br")])]),a("p",[s._v("然后定义一个点加糖咖啡的逻辑。")]),s._v(" "),a("div",{staticClass:"language-java line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-java"}},[a("code",[a("span",{pre:!0,attrs:{class:"token annotation punctuation"}},[s._v("@Test")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("public")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("void")]),s._v(" addSugerIntoCoffee "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n    "),a("span",{pre:!0,attrs:{class:"token class-name"}},[s._v("Coffee")]),s._v(" coffee "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("new")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token class-name"}},[s._v("CoffeeProxy")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n    coffee"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("printMaterial")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("// 加糖 咖啡")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br"),a("span",{staticClass:"line-number"},[s._v("3")]),a("br"),a("span",{staticClass:"line-number"},[s._v("4")]),a("br"),a("span",{staticClass:"line-number"},[s._v("5")]),a("br")])]),a("p",[s._v("对于代理模式而言，类似于，我需要一个新的功能，我就直接创建一个新的类，我想和加糖的咖啡")]),s._v(" "),a("p",[s._v("我就直接创建一个加糖咖啡的类，在这个类里，我们直接向咖啡中加糖，然后给我们的就是一杯加好糖的咖啡")]),s._v(" "),a("p",[a("code",[s._v("装饰器和代理模式的区别")])]),s._v(" "),a("p",[s._v("对装饰器模式来说，装饰者（Decorator）和被装饰者（Decoratee）都实现一个接口。对代理模式来说，代理类（Proxy Class）和真实处理的类（Real Class）都实现同一个接口。此外，不论我们使用哪一个模式，都可以很容易地在真实对象的方法前面或者后面加上自定义的方法。")]),s._v(" "),a("p",[s._v("在上面的例子中，"),a("code",[s._v("装饰器模式是使用的调用者从外部传入的被装饰对象（coffee），调用者只想要你把他给你的对象装饰（加强）一下。而代理模式使用的是代理对象在自己的构造方法里面new的一个被代理的对象，不是调用者传入的。调用者不知道你找了其他人")]),s._v("，他也不关心这些事，只要你把事情做对了即可。")]),s._v(" "),a("p",[s._v("装饰器模式关注于在一个对象上动态地添加方法，而代理模式关注于控制对对象的访问。换句话说，用代理模式，代理类可以对它的客户隐藏一个对象的具体信息。"),a("code",[s._v("因此当使用代理模式的时候，我们常常在一个代理类中创建一个对象的实例；当使用装饰器模式的时候，我们通常的做法是将原始对象作为一个参数传给装饰器的构造器。")])]),s._v(" "),a("p",[s._v("装饰器模式和代理模式的使用场景不一样，比如IO流使用的是装饰者模式，可以层层增加功能。而代理模式则一般是用于增加特殊的功能，有些动态代理不支持多层嵌套。")]),s._v(" "),a("p",[s._v("代理和装饰其实从另一个角度更容易去理解两个模式的区别：代理更多的是强调对对象的访问控制，比如说，访问A对象的查询功能时，访问B对象的更新功能时，访问C对象的删除功能时，都需要判断对象是否登陆，那么我需要将判断用户是否登陆的功能抽提出来，并对A对象、B对象和C对象进行代理，使访问它们时都需要去判断用户是否登陆，简单地说就是将某个控制访问权限应用到多个对象上；而装饰器更多的强调给对象加强功能，比如说要给只会唱歌的A对象添加跳舞功能，添加说唱功能等，简单地说就是将多个功能附加在一个对象上。")]),s._v(" "),a("p",[s._v("所以，代理模式注重的是对对象的某一功能的流程把控和辅助，它可以控制对象做某些事，重心是为了借用对象的功能完成某一流程，而非对象功能如何。而装饰模式注重的是对对象功能的扩展，不关心外界如何调用，只注重对对象功能加强，装饰后还是对象本身。")]),s._v(" "),a("p",[a("img",{attrs:{src:"https://img-blog.csdnimg.cn/0f28140f08a34cca8334602d4da0e6c9.png",alt:"在这里插入图片描述"}})])])}),[],!1,null,null,null);a.default=e.exports}}]);