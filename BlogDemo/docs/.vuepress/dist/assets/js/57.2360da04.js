(window.webpackJsonp=window.webpackJsonp||[]).push([[57],{516:function(s,a,t){"use strict";t.r(a);var e=t(1),r=Object(e.a)({},(function(){var s=this,a=s._self._c;return a("ContentSlotsDistributor",{attrs:{"slot-key":s.$parent.slotKey}},[a("h3",{attrs:{id:"oop的新生机"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#oop的新生机"}},[s._v("#")]),s._v(" OOP的新生机")]),s._v(" "),a("h3",{attrs:{id:"oop新生机前夕"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#oop新生机前夕"}},[s._v("#")]),s._v(" OOP新生机前夕")]),s._v(" "),a("p",[s._v("OOP即面向对象的程序设计，谈起了OOP，我们就不得不了解一下POP即面向过程程序设计，它是以功能为中心来进行思考和组织的一种编程方式，强调的是系统的数据被加工和处理的过程，说白了就是注重功能性的实现，效果达到就好了，而OOP则注重封装，强调整体性的概念，以对象为中心，将对象的内部组织与外部环境区分开来。之前看到过一个很贴切的解释，博主把它们画成一幅图如下：")]),s._v(" "),a("p",[a("img",{attrs:{src:"https://img-blog.csdnimg.cn/c8cd0cf9e9394e4db426c6d196ed564b.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBAbGVlZGNvZGVKb2huMDE=,size_20,color_FFFFFF,t_70,g_se,x_16",alt:"在这里插入图片描述"}})]),s._v(" "),a("p",[s._v("显然代码冗余也得到了解决，这种通过继承抽取通用代码的方式也称为纵向拓展，与之对应的还有横向拓展(现在不需急于明白，后面的分析中它将随处可见)。事实上有了上述两种解决方案后，在大部分业务场景的代码冗余问题也得到了实实在在的解决，原理如下图：")]),s._v(" "),a("p",[a("img",{attrs:{src:"https://img-blog.csdnimg.cn/cc3c299c2ec84b29addfcbd4460c847f.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBAbGVlZGNvZGVKb2huMDE=,size_20,color_FFFFFF,t_70,g_se,x_16",alt:"在这里插入图片描述"}})]),s._v(" "),a("p",[s._v("但是随着软件开发的系统越来越复杂，工程师认识到，传统的OOP程序经常表现出一些不自然的现象，"),a("strong",[s._v("核心业务中总掺杂着一些不相关联的特殊业务，如日志记录，权限验证，事务控制，性能检测，错误信息检测等等")]),s._v("，这些特殊业务可以说和核心业务没有根本上的关联而且核心业务也不关心它们，比如在用户管理模块中，该模块本身只关心与用户相关的业务信息处理，至于其他的业务完全可以不理会，我们看一个简单例子协助理解这个问题")]),s._v(" "),a("p",[s._v("上述代码中我们注意到一些问题，权限，日志，事务都不是用户管理的核心业务，也就是说用户管理模块除了要处理自身的核心业务外，还需要处理权限，日志，事务等待这些杂七杂八的不相干业务的外围操作，而且这些外围操作同样会在其他业务模块中出现，这样就会造成如下问题。")]),s._v(" "),a("p",[s._v("代码混乱：核心业务模块可能需要兼顾处理其他不相干的业务外围操作，这些外围操作可能会混乱核心操作的代码，而且当外围模块有重大修改时也会影响到核心模块，这显然是不合理的。")]),s._v(" "),a("p",[s._v("代码分散和冗余：同样的功能代码，在其他的模块几乎随处可见，导致代码分散并且冗余度高。")]),s._v(" "),a("p",[s._v("代码质量低扩展难：由于不太相关的业务代码混杂在一起，无法专注核心业务代码，当进行类似无关业务扩展时又会直接涉及到核心业务的代码，导致拓展性低。")]),s._v(" "),a("p",[s._v("显然前面分析的两种解决方案已束手无策了，那么该如何解决呢？事实上我们知道诸如日志，权限，事务，性能监测等业务几乎涉及到了所有的核心模块，如果把这些特殊的业务代码直接到核心业务模块的代码中就会造成上述的问题，而"),a("strong",[s._v("工程师更希望的是这些模块可以实现热插拔特性而且无需把外围的代码入侵到核心模块中，这样在日后的维护和扩展也将会有更佳的表现")]),s._v("，假设现在我们把日志、权限、事务、性能监测等外围业务看作单独的关注点(也可以理解为单独的模块)，每个关注点都可以在需要它们的时刻及时被运用而且无需提前整合到核心模块中，这种形式相当下图：")]),s._v(" "),a("p",[a("img",{attrs:{src:"https://img-blog.csdnimg.cn/c69ba2b8bfec4823b8dc00baee34d377.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBAbGVlZGNvZGVKb2huMDE=,size_20,color_FFFFFF,t_70,g_se,x_16",alt:"在这里插入图片描述"}})]),s._v(" "),a("p",[s._v("从图可以看出，每个关注点与核心业务模块分离，作为单独的功能，横切几个核心业务模块，这样的做的好处是显而易见的，每份功能代码不再单独入侵到核心业务类的代码中，即核心模块只需关注自己相关的业务，"),a("strong",[s._v("当需要外围业务(日志，权限，性能监测、事务控制)时，这些外围业务会通过一种特殊的技术自动应用到核心模块中，这些关注点有个特殊的名称，叫做“横切关注点”，上图也很好的表现出这个概念，另外这种抽象级别的技术也叫AOP（面向切面编程），正如上图所展示的横切核心模块的整面，因此AOP的概念就出现了")]),s._v("，而所谓的特殊技术也就面向切面编程的实现技术，AOP的实现技术有多种，其中与Java无缝对接的是一种称为AspectJ的技术。那么这种切面技术（AspectJ）是如何在Java中的应用呢？不必担心，也不必全面了解AspectJ，本篇博文也不会这样进行，对于AspectJ，我们只会进行简单的了解，从而为理解Spring中的AOP打下良好的基础(Spring AOP 与AspectJ 实现原理上并不完全一致，但功能上是相似的，这点后面会分析)，毕竟Spring中已实现AOP主要功能，开发中直接使用Spring中提供的AOP功能即可，除非我们想单独使用AspectJ的其他功能。这里还需要注意的是，AOP的出现确实解决外围业务代码与核心业务代码分离的问题，但它并不会替代OOP，如果说OOP的出现是把编码问题进行模块化，那么AOP就是把涉及到众多模块的某一类问题进行统一管理，因此在实际开发中AOP和OOP同时存在并不奇怪，后面将会慢慢体会带这点，好的，已迫不及待了，让我们开始了解神一样的AspectJ吧。")]),s._v(" "),a("h3",{attrs:{id:"神一样的aspectj-aop的领跑者"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#神一样的aspectj-aop的领跑者"}},[s._v("#")]),s._v(" 神一样的AspectJ-AOP的领跑者")]),s._v(" "),a("p",[s._v("这里先进行一个简单案例的演示，然后引出AOP中一些晦涩难懂的抽象概念，放心，通过本篇博客，我们将会非常轻松地理解并掌握它们。编写一个HelloWord的类，然后利用AspectJ技术切入该类的执行过程。")]),s._v(" "),a("p",[a("img",{attrs:{src:"https://img-blog.csdnimg.cn/4bb06262dcb64a32a59dfabaea8a0ac8.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBAbGVlZGNvZGVKb2huMDE=,size_13,color_FFFFFF,t_70,g_se,x_16",alt:"在这里插入图片描述"}})]),s._v(" "),a("p",[s._v("编写AspectJ类，注意关键字为aspect(MyAspectJDemo.aj,其中aj为AspectJ的后缀)，含义与class相同，即定义一个AspectJ的类：")]),s._v(" "),a("p",[a("img",{attrs:{src:"https://img-blog.csdnimg.cn/f3ab2e5a55e94547a352ed44c4886c70.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBAbGVlZGNvZGVKb2huMDE=,size_20,color_FFFFFF,t_70,g_se,x_16",alt:"在这里插入图片描述"}})]),s._v(" "),a("p",[s._v("OK，运行main函数")]),s._v(" "),a("p",[a("img",{attrs:{src:"https://img-blog.csdnimg.cn/d69abdc77dfc414f820004481ce06633.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBAbGVlZGNvZGVKb2huMDE=,size_20,color_FFFFFF,t_70,g_se,x_16",alt:"在这里插入图片描述"}})]),s._v(" "),a("p",[s._v("对于结果不必太惊讶，完全是意料之中。我们发现，明明只运行了main函数，却在sayHello函数运行前后分别进行了权限验证和日志记录，事实上这就是AspectJ的功劳了。对aspectJ有了感性的认识后，再来聊聊aspectJ到底是什么？AspectJ是一个java实现的AOP框架，它能够对java代码进行AOP编译（一般在编译期进行），让java代码具有AspectJ的AOP功能（当然需要特殊的编译器），可以这样说AspectJ是目前实现AOP框架中最成熟，功能最丰富的语言，更幸运的是，AspectJ与java程序完全兼容，几乎是无缝关联，因此对于有java编程基础的工程师，上手和使用都非常容易。在案例中,"),a("strong",[s._v("我们使用aspect关键字定义了一个类，这个类就是一个切面")]),s._v(",它可以是单独的日志切面(功能)，也可以是权限切面或者其他，"),a("strong",[s._v("在切面内部使用了pointcut定义了两个切点，一个用于权限验证，一个用于日志记录，而所谓的切点就是那些需要应用切面的方法，如需要在sayHello方法执行前后进行权限验证和日志记录，那么就需要捕捉该方法，而pointcut就是定义这些需要捕捉的方法")]),s._v("(常常是不止一个方法的),这些方法也称为目标方法，最后还定义了两个通知,**通知就是那些需要在目标方法前后执行的函数，如before()即前置通知在目标方法之前执行，即在sayHello()方法执行前进行权限验证，另一个是after()即后置通知，在sayHello()之后执行，如进行日志记录.**到这里也就可以确定，切面就是切点和通知的组合体，组成一个单独的结构供后续使用，下图协助理解。")]),s._v(" "),a("p",[a("img",{attrs:{src:"https://img-blog.csdnimg.cn/8d8a6fb1336c43c88ff0e389b9a1456a.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBAbGVlZGNvZGVKb2huMDE=,size_20,color_FFFFFF,t_70,g_se,x_16",alt:"在这里插入图片描述"}})]),s._v(" "),a("p",[s._v("这里简单说明一下切点的定义语法：关键字为pointcut，定义切点，后面跟着函数名称，最后编写匹配表达式，此时函数一般使用call()或者execution()进行匹配，这里我们统一使用call()：")]),s._v(" "),a("p",[s._v("pointcut函数名：匹配表达式")]),s._v(" "),a("p",[s._v("案例：recordLog()是函数名称，自定义的，* 表示任意返回值，接着就是需要拦截的目标函数，sayHello(..)的..，表示任意参数类型。这里理解即可，后面Spring AOP会有关于切点表达式的分析，整行代码的意思是使用pointcut定义一个名为recordLog的切点函数，其需要拦截的(切入)的目标方法是HelloWord类下的sayHello方法，参数不限。")]),s._v(" "),a("p",[s._v("pointcut recordLog():call(* HelloWorld.sayHello(…));\n关于定义通知的语法：首先通知有5种类型分别如下：")]),s._v(" "),a("p",[a("code",[s._v("before")]),s._v(" 目标方法执行前执行，前置通知")]),s._v(" "),a("p",[a("code",[s._v("after")]),s._v(" 目标方法执行后执行，后置通知")]),s._v(" "),a("p",[a("code",[s._v("fter returning")]),s._v("目标方法返回时执行 ，后置返回通知")]),s._v(" "),a("p",[a("code",[s._v("after throwing")]),s._v(" 目标方法抛出异常时执行 异常通知")]),s._v(" "),a("p",[a("code",[s._v("around")]),s._v(" 在目标函数执行中执行，可控制目标函数是否执行，环绕通知")]),s._v(" "),a("p",[s._v("[返回值类型] 通知函数名称(参数) [returning/throwing表达式] ： 连接点函数（切点函数）{\n函数体;\n}")]),s._v(" "),a("p",[s._v("案例如下，其中要注意around通知即环绕通知，可以通过proceed()方法控制目标函数是否执行。")]),s._v(" "),a("p",[a("img",{attrs:{src:"https://img-blog.csdnimg.cn/b661b2d7b14d454cb30753002e683d8a.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBAbGVlZGNvZGVKb2huMDE=,size_13,color_FFFFFF,t_70,g_se,x_16",alt:"在这里插入图片描述"}})]),s._v(" "),a("p",[s._v("切入点（pointcut）和通知（advice）的概念已比较清晰，而切面则是定义切入点和通知的组合如上述使用aspect关键字定义的MyAspectJDemo，"),a("strong",[s._v("把切面应用到目标函数的过程称为织入(weaving)")]),s._v("。在前面定义的HelloWord类中除了sayHello函数外，还有main函数，以后可能还会定义其他函数，"),a("strong",[s._v("而这些函数都可以称为目标函数，也就是说这些函数执行前后也都可以切入通知的代码，这些目标函数统称为连接点，切入点(pointcut)的定义正是从这些连接点中过滤出来的")]),s._v("，下图协助理解。")]),s._v(" "),a("p",[a("img",{attrs:{src:"https://img-blog.csdnimg.cn/97c29538faff47b3aa13bd8c528d93a8.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBAbGVlZGNvZGVKb2huMDE=,size_20,color_FFFFFF,t_70,g_se,x_16",alt:"在这里插入图片描述"}})]),s._v(" "),a("h3",{attrs:{id:"aspectj方式及其原理概要"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#aspectj方式及其原理概要"}},[s._v("#")]),s._v(" AspectJ方式及其原理概要")]),s._v(" "),a("p",[s._v("经过前面的简单介绍，我们已初步掌握了AspectJ的一些语法和概念，但这样仍然是不够的，我们仍需要了解AspectJ应用到java代码的过程（这个过程称为织入）"),a("strong",[s._v("对于织入这个概念，可以简单理解为aspect(切面)应用到目标函数(类)的过程")]),s._v("。对于这个过程，"),a("strong",[s._v("一般分为动态织入和静态织入，动态织入的方式是在运行时动态将要增强的代码织入到目标类中，这样往往是通过动态代理技术完成的，如Java JDK的动态代理(Proxy，底层通过反射实现)或者CGLIB的动态代理(底层通过继承实现)，Spring AOP采用的就是基于运行时增强的代理技术")]),s._v(",这点后面会分析，这里主要重点分析一下静态织入，ApectJ采用的就是静态织入的方式。ApectJ主要采用的是编译期织入，在这个期间使用AspectJ的acj编译器(类似javac)把aspect类编译成class字节码后，在java目标类编译时织入，即先编译aspect类再编译目标类。")]),s._v(" "),a("p",[a("img",{attrs:{src:"https://img-blog.csdnimg.cn/86c7ff7fc6b94daca4b8fff777546974.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBAbGVlZGNvZGVKb2huMDE=,size_20,color_FFFFFF,t_70,g_se,x_16",alt:"在这里插入图片描述"}})]),s._v(" "),a("h3",{attrs:{id:"基于aspect-spring-aop开发"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#基于aspect-spring-aop开发"}},[s._v("#")]),s._v(" 基于Aspect Spring AOP开发")]),s._v(" "),a("p",[s._v("Spring AOP 与ApectJ 的目的一致，都是为了统一处理横切业务，但与AspectJ不同的是，Spring AOP 并不尝试提供完整的AOP功能(即使它完全可以实现)，Spring AOP 更注重的是与Spring IOC容器的结合，并结合该优势来解决横切业务的问题，因此在AOP的功能完善方面，相对来说AspectJ具有更大的优势，同时,Spring注意到AspectJ在AOP的实现方式上依赖于特殊编译器(ajc编译器)，因此"),a("strong",[s._v("Spring很机智回避了这点，转向采用动态代理技术的实现原理来构建Spring AOP的内部机制（动态织入），这是与AspectJ（静态织入）最根本的区别")]),s._v("。在AspectJ 1.5后，引入@Aspect形式的注解风格的开发，Spring也非常快地跟进了这种方式，因此Spring 2.0后便使用了与AspectJ一样的注解。请注意，Spring 只是使用了与 AspectJ 5 一样的注解，但仍然没有使用 AspectJ 的编译器，底层依是动态代理技术的实现，因此并不依赖于 AspectJ 的编译器。下面我们先通过一个简单的案例来演示Spring AOP的入门程序。")]),s._v(" "),a("h3",{attrs:{id:"简单案例快速入门"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#简单案例快速入门"}},[s._v("#")]),s._v(" 简单案例快速入门")]),s._v(" "),a("p",[s._v("定义目标类接口和实现类")]),s._v(" "),a("div",{staticClass:"language- line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[s._v("/**\n * Created by zejian on 2017/2/19.\n * Blog : http://blog.csdn.net/javazejian [原文地址,请尊重原创]\n */\n//接口类\npublic interface UserDao {\n\n    int addUser();\n\n    void updateUser();\n\n    void deleteUser();\n\n    void findUser();\n}\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br"),a("span",{staticClass:"line-number"},[s._v("3")]),a("br"),a("span",{staticClass:"line-number"},[s._v("4")]),a("br"),a("span",{staticClass:"line-number"},[s._v("5")]),a("br"),a("span",{staticClass:"line-number"},[s._v("6")]),a("br"),a("span",{staticClass:"line-number"},[s._v("7")]),a("br"),a("span",{staticClass:"line-number"},[s._v("8")]),a("br"),a("span",{staticClass:"line-number"},[s._v("9")]),a("br"),a("span",{staticClass:"line-number"},[s._v("10")]),a("br"),a("span",{staticClass:"line-number"},[s._v("11")]),a("br"),a("span",{staticClass:"line-number"},[s._v("12")]),a("br"),a("span",{staticClass:"line-number"},[s._v("13")]),a("br"),a("span",{staticClass:"line-number"},[s._v("14")]),a("br"),a("span",{staticClass:"line-number"},[s._v("15")]),a("br")])]),a("div",{staticClass:"language- line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[s._v('//实现类\nimport com.zejian.spring.springAop.dao.UserDao;\nimport org.springframework.stereotype.Repository;\n\n/**\n * Created by zejian on 2017/2/19.\n * Blog : http://blog.csdn.net/javazejian [原文地址,请尊重原创]\n */\n@Repository\npublic class UserDaoImp implements UserDao {\n    @Override\n        public int addUser() {\n            System.out.println("add user ......");\n            return 6666;\n        }\n\n    @Override\n        public void updateUser() {\n            System.out.println("update user ......");\n        }\n\n    @Override\n        public void deleteUser() {\n            System.out.println("delete user ......");\n        }\n\n    @Override\n        public void findUser() {\n            System.out.println("find user ......");\n        }\n}\n\n')])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br"),a("span",{staticClass:"line-number"},[s._v("3")]),a("br"),a("span",{staticClass:"line-number"},[s._v("4")]),a("br"),a("span",{staticClass:"line-number"},[s._v("5")]),a("br"),a("span",{staticClass:"line-number"},[s._v("6")]),a("br"),a("span",{staticClass:"line-number"},[s._v("7")]),a("br"),a("span",{staticClass:"line-number"},[s._v("8")]),a("br"),a("span",{staticClass:"line-number"},[s._v("9")]),a("br"),a("span",{staticClass:"line-number"},[s._v("10")]),a("br"),a("span",{staticClass:"line-number"},[s._v("11")]),a("br"),a("span",{staticClass:"line-number"},[s._v("12")]),a("br"),a("span",{staticClass:"line-number"},[s._v("13")]),a("br"),a("span",{staticClass:"line-number"},[s._v("14")]),a("br"),a("span",{staticClass:"line-number"},[s._v("15")]),a("br"),a("span",{staticClass:"line-number"},[s._v("16")]),a("br"),a("span",{staticClass:"line-number"},[s._v("17")]),a("br"),a("span",{staticClass:"line-number"},[s._v("18")]),a("br"),a("span",{staticClass:"line-number"},[s._v("19")]),a("br"),a("span",{staticClass:"line-number"},[s._v("20")]),a("br"),a("span",{staticClass:"line-number"},[s._v("21")]),a("br"),a("span",{staticClass:"line-number"},[s._v("22")]),a("br"),a("span",{staticClass:"line-number"},[s._v("23")]),a("br"),a("span",{staticClass:"line-number"},[s._v("24")]),a("br"),a("span",{staticClass:"line-number"},[s._v("25")]),a("br"),a("span",{staticClass:"line-number"},[s._v("26")]),a("br"),a("span",{staticClass:"line-number"},[s._v("27")]),a("br"),a("span",{staticClass:"line-number"},[s._v("28")]),a("br"),a("span",{staticClass:"line-number"},[s._v("29")]),a("br"),a("span",{staticClass:"line-number"},[s._v("30")]),a("br"),a("span",{staticClass:"line-number"},[s._v("31")]),a("br"),a("span",{staticClass:"line-number"},[s._v("32")]),a("br")])]),a("p",[s._v("使用spring2.0引入注解的方式，编写Spring AOP的aspect类：")]),s._v(" "),a("p",[a("img",{attrs:{src:"https://img-blog.csdnimg.cn/a8aa34250f90489a87a731b53aef8c59.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBAbGVlZGNvZGVKb2huMDE=,size_20,color_FFFFFF,t_70,g_se,x_16",alt:"在这里插入图片描述"}})]),s._v(" "),a("p",[a("img",{attrs:{src:"https://img-blog.csdnimg.cn/8ec119113d284420a1e2a1668f175e26.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBAbGVlZGNvZGVKb2huMDE=,size_20,color_FFFFFF,t_70,g_se,x_16",alt:"在这里插入图片描述"}})]),s._v(" "),a("p",[s._v("编写配置文件交给Spring IOC容器管理：")]),s._v(" "),a("p",[a("img",{attrs:{src:"https://img-blog.csdnimg.cn/e13e391294a74e58a1c6a29d2c755e7d.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBAbGVlZGNvZGVKb2huMDE=,size_20,color_FFFFFF,t_70,g_se,x_16",alt:"在这里插入图片描述"}})]),s._v(" "),a("p",[s._v("编写测试类：")]),s._v(" "),a("p",[a("img",{attrs:{src:"https://img-blog.csdnimg.cn/b97bf5df6cdb415db656d39a83c420e8.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBAbGVlZGNvZGVKb2huMDE=,size_20,color_FFFFFF,t_70,g_se,x_16",alt:"在这里插入图片描述"}})]),s._v(" "),a("p",[s._v("简单说明一下，定义了一个目标类UserDaoImpl，利用Spring2.0引入的aspect注解开发功能定义aspect类即MyAspect，在该aspect类中，编写了5种注解类型的通知函数，分别是前置通知@Before、后置通知@AfterReturning、环绕通知@Around、异常通知@AfterThrowing、最终通知@After，这5种通知与前面分析AspectJ的通知类型几乎是一样的，并注解通知上使用execution关键字定义的切点表达式，即指明该通知要应用的目标函数，当只有一个execution参数时，value属性可以省略，当含两个以上的参数，value必须注明，如存在返回值时。当然除了把切点表达式直接传递给通知注解类型外，还可以使用@pointcut来定义切点匹配表达式，这个与AspectJ使用关键字pointcut是一样的，后面分析。目标类和aspect类定义完成后，最后需要在xml配置文件中进行配置，同样的所有类的创建都交由SpringIOC容器处理，注意，使用Spring AOP 的aspectJ功能时，需要使用以下代码启动aspect的注解功能支持：")]),s._v(" "),a("p",[s._v("<aop:aspectj-autoproxy />")]),s._v(" "),a("p",[a("img",{attrs:{src:"https://img-blog.csdnimg.cn/bca74da123c543dd8d5b2fcbc6e1e16b.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBAbGVlZGNvZGVKb2huMDE=,size_20,color_FFFFFF,t_70,g_se,x_16",alt:"在这里插入图片描述"}})]),s._v(" "),a("h3",{attrs:{id:"再谈谈spring-aop术语"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#再谈谈spring-aop术语"}},[s._v("#")]),s._v(" 再谈谈Spring AOP术语")]),s._v(" "),a("p",[s._v("通过简单案例的分析，也就很容易知道，Spring AOP 的实现是遵循AOP规范的，特别是以AspectJ（与java无缝整合）为参考，因此在AOP的术语概念上与前面分析的AspectJ的AOP术语是一样的，如切点(pointcut)定义需要应用通知的目标函数，通知则是那些需要应用到目标函数而编写的函数体，切面(Aspect)则是通知与切点的结合。织入(weaving)，将aspect类应用到目标函数(类)的过程，只不过Spring AOP底层是通过动态代理技术实现罢了。")]),s._v(" "),a("h3",{attrs:{id:"基于注解的spring-aop开发"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#基于注解的spring-aop开发"}},[s._v("#")]),s._v(" 基于注解的Spring AOP开发")]),s._v(" "),a("p",[a("strong",[s._v("定义切入点函数")])]),s._v(" "),a("p",[s._v("在案例中，定义过滤切入点函数时，是直接把execution已定义匹配表达式作为值传递给通知类型的如下：")]),s._v(" "),a("p",[a("img",{attrs:{src:"https://img-blog.csdnimg.cn/dc6276b304d24953851e878de6935a13.png",alt:"在这里插入图片描述"}})]),s._v(" "),a("p",[s._v("除了上述方法外，还可以采用和AspectJ中使用pointcut关键字类似的方式定义切入点表达式：使用@Pointcut注解：")]),s._v(" "),a("p",[a("img",{attrs:{src:"https://img-blog.csdnimg.cn/a3265f35ae134fefb75a58b1a2e3f7fd.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBAbGVlZGNvZGVKb2huMDE=,size_20,color_FFFFFF,t_70,g_se,x_16",alt:"在这里插入图片描述"}})]),s._v(" "),a("p",[s._v("使用@Pointcut注解进行定义，应用到通知函数afterDemo()时直接传递切点表达式的函数名称myPointcut()即可，比较简单，下面接着介绍切点指示符。")]),s._v(" "),a("h3",{attrs:{id:"spring-aop的实现原理概要"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#spring-aop的实现原理概要"}},[s._v("#")]),s._v(" Spring Aop的实现原理概要")]),s._v(" "),a("p",[s._v("前面的分析中，我们谈到Spring AOP的实现原理是基于动态织入的动态代理技术，而AspectJ则是静态织入，而动态代理技术又分为Java JDK动态代理和CGLIB动态代理，前者是基于反射技术的实现，后者是基于继承的机制实现，下面通过一个简单的例子来分析这两种技术的代码实现。")]),s._v(" "),a("h4",{attrs:{id:"jdk动态代理"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#jdk动态代理"}},[s._v("#")]),s._v(" JDK动态代理")]),s._v(" "),a("p",[s._v("先看一个简单的例子，声明一个A类并实现ExInterface接口，利用JDK动态代理技术在execute()执行前后织入权限验证和日志记录，注意这里仅是演示代码并不代表实际应用。")]),s._v(" "),a("p",[a("img",{attrs:{src:"https://img-blog.csdnimg.cn/b89674db95814e4fa14b295ef561e898.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBAbGVlZGNvZGVKb2huMDE=,size_16,color_FFFFFF,t_70,g_se,x_16",alt:"在这里插入图片描述"}})]),s._v(" "),a("p",[a("img",{attrs:{src:"https://img-blog.csdnimg.cn/a2c54110a0634ce9bea9c3c3e9077ea0.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBAbGVlZGNvZGVKb2huMDE=,size_20,color_FFFFFF,t_70,g_se,x_16",alt:"在这里插入图片描述"}})]),s._v(" "),a("p",[s._v("运行结果:")]),s._v(" "),a("p",[a("img",{attrs:{src:"https://img-blog.csdnimg.cn/95c09e6015e541908d3c8232d717bc32.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBAbGVlZGNvZGVKb2huMDE=,size_20,color_FFFFFF,t_70,g_se,x_16",alt:"在这里插入图片描述"}})]),s._v(" "),a("p",[s._v("在A的execute方法里面并没有调用任何权限和日志的代码，也没有直接操作a对象，相反地只是调用了proxy代理对象的方法，最终结果却是预期的，这就是动态代理技术，是不是跟Spring AOP似曾相识？实际上动态代理的底层是通过反射技术来实现，只要拿到A类的class文件和A类的实现接口，很自然就可以生成相同接口的代理类并调用a对象的方法了，关于底层反射技术的实现，暂且不过多讨论，请注意实现java的动态代理是有先决条件的，该条件是目标对象必须带接口，如A类的接口是ExInterface，通过ExInterface接口动态代理技术便可以创建与A类类型相同的代理对象，如下代码演示了创建并调用时利用多态生成的proxy对象：")]),s._v(" "),a("p",[a("img",{attrs:{src:"https://img-blog.csdnimg.cn/5acb1f4d0fc144daac0a34e31042d7d8.png",alt:"在这里插入图片描述"}})]),s._v(" "),a("p",[s._v("代理对象的创建时通过Proxy类达到的，Proxy类由JDK提供，利用Proxy的new ProxyInstance方法便可以动态生成代理对象proxy，底层通过反射实现的，该方法需要3个参数：")]),s._v(" "),a("p",[a("img",{attrs:{src:"https://img-blog.csdnimg.cn/5da784df9c244cd183fddfe27f2ffeff.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBAbGVlZGNvZGVKb2huMDE=,size_20,color_FFFFFF,t_70,g_se,x_16",alt:"在这里插入图片描述"}})]),s._v(" "),a("p",[s._v("到此并没结束，因为有接口还是远远不够，代理类（Demo中的JDKProxy）还需要实现InvocationHandler接口，也是由JDK提供，代理类必须实现的并重写invoke方法，"),a("strong",[s._v("完全可以把InvocationHandler看成一个回调函数(Callback)，Proxy方法创建代理对象proxy后，当调用execute方法(代理对象也实现ExInterface)时,将会回调InvocationHandler#invoke方法，因此我们可以在invoke方法中来控制被代理对象(目标对象)的方法执行，从而在该方法前后动态增加其他需要执行的业务")]),s._v("，Demo中的代码很好体现了这点：")]),s._v(" "),a("p",[a("img",{attrs:{src:"https://img-blog.csdnimg.cn/63e725a16ad14618944f1efda2554a02.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBAbGVlZGNvZGVKb2huMDE=,size_20,color_FFFFFF,t_70,g_se,x_16",alt:"在这里插入图片描述"}})]),s._v(" "),a("p",[s._v("invoke方法有三个参数：")]),s._v(" "),a("ul",[a("li",[a("p",[s._v("Object proxy ：生成的代理对象")])]),s._v(" "),a("li",[a("p",[s._v("Method method：目标对象的方法，通过反射调用")])]),s._v(" "),a("li",[a("p",[s._v("Object[] args：目标对象方法的参数")])])]),s._v(" "),a("p",[s._v("这就是Java JDK动态代理的代码实现过程，小结一下，运用JDK动态代理，被代理类(目标对象，如A类)，必须已有实现接口如(ExInterface)，因为JDK提供的Proxy类将通过目标对象的类加载器ClassLoader和Interface，以及句柄(Callback)创建与A类拥有相同接口的代理对象proxy，该代理对象将拥有接口ExInterface中的所有方法，同时代理类必须实现一个类似回调函数的InvocationHandler接口并重写该接口中的invoke方法，当调用proxy的每个方法(如案例中的proxy#execute())时，invoke方法将被调用，利用该特性，可以在invoke方法中对目标对象(被代理对象如A)方法执行的前后动态添加其他外围业务操作，此时无需触及目标对象的任何代码，也就实现了外围业务的操作与目标对象(被代理对象如A)完全解耦合的目的。当然缺点也很明显需要拥有接口，这也就有了后来的CGLIB动态代理了.")])])}),[],!1,null,null,null);a.default=r.exports}}]);