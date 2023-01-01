(window.webpackJsonp=window.webpackJsonp||[]).push([[60],{518:function(s,n,a){"use strict";a.r(n);var t=a(1),e=Object(t.a)({},(function(){var s=this,n=s._self._c;return n("ContentSlotsDistributor",{attrs:{"slot-key":s.$parent.slotKey}},[n("h3",{attrs:{id:"_1、获取class对象的方式-3种"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#_1、获取class对象的方式-3种"}},[s._v("#")]),s._v(" 1、获取Class对象的方式（3种）")]),s._v(" "),n("p",[n("code",[s._v("方式一")]),s._v("：通过Object类中的getClass()方法（先创建对象，根据对象获得class）")]),s._v(" "),n("p",[s._v("Person p = new Person();\nClass c = p.getClass();")]),s._v(" "),n("p",[n("code",[s._v("方式二")]),s._v("：通过类名.class获取到字节码文件对象（任意数据类型都具备一个叫class静态属性，看上去要比第一种方式简单）")]),s._v(" "),n("p",[s._v("Class c2 = Person.class;")]),s._v(" "),n("p",[n("code",[s._v("方式三")]),s._v("：通过Class类中的方法（将类名作为字符串传递给Class类中的静态方法forName(全限定类名)即可）（这种方法是反射）")]),s._v(" "),n("p",[s._v('Class c3 = Class.forName("Person");')]),s._v(" "),n("p",[n("strong",[s._v("注意：第三种和前两种的区别")])]),s._v(" "),n("p",[s._v("前两种你必须明确Person类型，后面是指定这种类型的字符串就行。这种扩展更强。在不需要知道类的前提下，只要提供字符串，按照配置文件加载就可以了。")]),s._v(" "),n("h3",{attrs:{id:"_2、获取全部构造方法-公有构造器方法-私有构造器方法-获取公有成员变量、暴力获取私有成员变量"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#_2、获取全部构造方法-公有构造器方法-私有构造器方法-获取公有成员变量、暴力获取私有成员变量"}},[s._v("#")]),s._v(" 2、获取全部构造方法，公有构造器方法，私有构造器方法，获取公有成员变量、暴力获取私有成员变量")]),s._v(" "),n("p",[s._v("获取公有的带参/不带参的构造器方法")]),s._v(" "),n("div",{staticClass:"language- line-numbers-mode"},[n("pre",{pre:!0,attrs:{class:"language-text"}},[n("code",[s._v('//1.获取Class对象\nClassc=Class.forName("com.cifeng.entity.Person");//类名、包名\n\n//2.获取指定的构造方法\n\n//public Person()/Person类空参的构造方法\n//Constructor con=c.getConstructor(null);//获取空参的构造方法\n//public Person(String name,int age,String address);//Person类含参的构造方法\n\nConstructor con=c.getConstructor(String.class,int.class,String.class);\n\n//通过构造方法类中的Constructor的方法，构造对象\n//Objectobj=con.newInstance(null);//空参的构造方法\n//constructor对象是类的构造器对象，每个类都有自己的构造器\n//利用构造器对象可以实例化对象\n\nObject obj=con.newInstance("小明",22,"哈尔滨");\n\n//显示\nSystem.out.println(obj);\n')])]),s._v(" "),n("div",{staticClass:"line-numbers-wrapper"},[n("span",{staticClass:"line-number"},[s._v("1")]),n("br"),n("span",{staticClass:"line-number"},[s._v("2")]),n("br"),n("span",{staticClass:"line-number"},[s._v("3")]),n("br"),n("span",{staticClass:"line-number"},[s._v("4")]),n("br"),n("span",{staticClass:"line-number"},[s._v("5")]),n("br"),n("span",{staticClass:"line-number"},[s._v("6")]),n("br"),n("span",{staticClass:"line-number"},[s._v("7")]),n("br"),n("span",{staticClass:"line-number"},[s._v("8")]),n("br"),n("span",{staticClass:"line-number"},[s._v("9")]),n("br"),n("span",{staticClass:"line-number"},[s._v("10")]),n("br"),n("span",{staticClass:"line-number"},[s._v("11")]),n("br"),n("span",{staticClass:"line-number"},[s._v("12")]),n("br"),n("span",{staticClass:"line-number"},[s._v("13")]),n("br"),n("span",{staticClass:"line-number"},[s._v("14")]),n("br"),n("span",{staticClass:"line-number"},[s._v("15")]),n("br"),n("span",{staticClass:"line-number"},[s._v("16")]),n("br"),n("span",{staticClass:"line-number"},[s._v("17")]),n("br"),n("span",{staticClass:"line-number"},[s._v("18")]),n("br"),n("span",{staticClass:"line-number"},[s._v("19")]),n("br"),n("span",{staticClass:"line-number"},[s._v("20")]),n("br")])]),n("p",[s._v("获取私有的构造方法")]),s._v(" "),n("p",[s._v("**私有化构造方法之后，我们不能在类的外部创建类的实例对象了")]),s._v(" "),n("p",[s._v("如果我们想在Person类的外部使用Person类的对象，只能在person类的内部实例化一个Person类的对象，然后调用这个对象，而不能再外部实例化新的对象。")]),s._v(" "),n("p",[s._v("外部的Person类的所有对象只能是对Person内部newperson对象的引用。")]),s._v(" "),n("p",[s._v("外部一千一万个对象也都只能是对Person内部newperson对象的引用。")]),s._v(" "),n("p",[s._v("因为外部定义的Person类对象没有实例化能力。这就是单例设计模式，从头至尾只有一个对象的实例（单例）**")]),s._v(" "),n("p",[n("img",{attrs:{src:"https://img-blog.csdnimg.cn/img_convert/5fb4ea088750fd4c394c307867aa5ee0.png",alt:""}})]),s._v(" "),n("p",[s._v("获取成员变量")]),s._v(" "),n("p",[n("img",{attrs:{src:"https://img-blog.csdnimg.cn/img_convert/f576eb55cad2178f9dfaf3c320071861.png",alt:""}})]),s._v(" "),n("h3",{attrs:{id:"_3、一个私有的属性-没有set方法-如何修改值-反射获取私有变量并赋值"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#_3、一个私有的属性-没有set方法-如何修改值-反射获取私有变量并赋值"}},[s._v("#")]),s._v(" 3、一个私有的属性，没有set方法，如何修改值->反射获取私有变量并赋值")]),s._v(" "),n("p",[s._v("通过反射机制修改类中的私有属性值（暴力反射）")]),s._v(" "),n("p",[n("img",{attrs:{src:"https://img-blog.csdnimg.cn/img_convert/5f8936b205eba8725864132e3981a9a4.png",alt:""}})]),s._v(" "),n("h3",{attrs:{id:"_4、获取空参成员方法-有参成员方法"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#_4、获取空参成员方法-有参成员方法"}},[s._v("#")]),s._v(" 4、获取空参成员方法，有参成员方法")]),s._v(" "),n("p",[n("img",{attrs:{src:"https://img-blog.csdnimg.cn/img_convert/5a799c83f107915ebc8f3480a22e00ed.png",alt:""}})]),s._v(" "),n("p",[n("img",{attrs:{src:"https://img-blog.csdnimg.cn/img_convert/4d732fc15e530ecac91666ec95b54817.png",alt:""}})]),s._v(" "),n("p",[n("strong",[s._v("对于类的私有成员变量和私有的方法，我们在访问时需要开启暴力访问模式：\nsetAccessible(true);")])]),s._v(" "),n("h3",{attrs:{id:"_5、如何向arraylist里添加一个integer类型的量"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#_5、如何向arraylist里添加一个integer类型的量"}},[s._v("#")]),s._v(" 5、如何向ArrayList"),n("String",[s._v("里添加一个Integer类型的量")])],1),s._v(" "),n("p",[s._v("泛型擦除（“伪泛型”）：编译后的Class文件没有泛型")]),s._v(" "),n("p",[s._v("不对集合类进行操作，通过反射获取ArrayList类的class文件对象，调用add方法")]),s._v(" "),n("p",[n("img",{attrs:{src:"https://img-blog.csdnimg.cn/img_convert/b79db8db6f4ced0b81eb12d02ad00a0a.png",alt:""}})]),s._v(" "),n("h3",{attrs:{id:"_6、java的newinstance-和new的区别-反射机制-通过类名来获取该类的实例化对象"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#_6、java的newinstance-和new的区别-反射机制-通过类名来获取该类的实例化对象"}},[s._v("#")]),s._v(" 6、Java的newInstance()和new的区别（反射机制，通过类名来获取该类的实例化对象）")]),s._v(" "),n("p",[s._v('Class c = Class.forName("包名.类名");')]),s._v(" "),n("p",[s._v("Object obj = c.newInstance();   //通过类名来获取该类的实例化对象")]),s._v(" "),n("p",[s._v("从JVM的角度看，我们使用new关键字的时候，这个要new的类可以没有加载；在new时加载类\n但是使用newInstance时候，就必须保证：")]),s._v(" "),n("ol",[n("li",[n("p",[s._v("这个类已经加载；")])]),s._v(" "),n("li",[n("p",[s._v("这个类已经连接了，而完成上面两个步骤的正是class的静态方法forName()这个方法，这个静态方法调用了启动类加载器。newInstance实际上是把new这个方式分解为两个步骤。首先调用class的加载方法加载某个类，然后实例化")])])]),s._v(" "),n("p",[n("code",[s._v("newInstance")]),s._v("：弱类型。低效率。只能调用无参构造")]),s._v(" "),n("p",[n("code",[s._v("New")]),s._v(":强类型。相对高效。能调用任何public构造")]),s._v(" "),n("p",[n("code",[s._v("newInstance()")]),s._v("是实现IOC、反射、面对接口编程和依赖倒置等技术方法的必然选择，new只能实现具体类的实例化，不适合于接口编程。")])])}),[],!1,null,null,null);n.default=e.exports}}]);