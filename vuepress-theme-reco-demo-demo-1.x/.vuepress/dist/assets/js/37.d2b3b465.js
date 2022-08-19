(window.webpackJsonp=window.webpackJsonp||[]).push([[37],{440:function(t,a,v){"use strict";v.r(a);var _=v(2),p=Object(_.a)({},(function(){var t=this,a=t._self._c;return a("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[a("p",[t._v("Spring的两种动态代理方式：JDK和Cglib")]),t._v(" "),a("h3",{attrs:{id:"一、原理区别"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#一、原理区别"}},[t._v("#")]),t._v(" 一、原理区别")]),t._v(" "),a("p",[t._v("Java动态代理是利用反射机制生成一个实现代理接口的匿名类，在调用具体方法前调用invokeHandler来处理。")]),t._v(" "),a("p",[t._v("而cglib动态代理是利用asm开源包，对代理对象的class文件加载进来，通过修改器字节码生成子类来处理。")]),t._v(" "),a("p",[t._v("1、如果目标对象实现了接口，默认情况下会采用JDK的动态代理实现AOP；")]),t._v(" "),a("p",[t._v("2、如果目标对象实现了接口，可以强制使用CGlib实现AOP；")]),t._v(" "),a("p",[t._v("3、如果目标对象没有实现接口，必须采用Cglib库，Spring会自动在JDK动态代理和CGLIB之间转换。")]),t._v(" "),a("p",[t._v("如何强制使用CGLIB实现AOP：")]),t._v(" "),a("p",[t._v("（1）添加CGLIB库，SPRING_HOME/cglib/*.jar；")]),t._v(" "),a("p",[t._v("（2）在Spring配置文件中加入"),a("RouterLink",{attrs:{to:'aop:aspectj-autoproxy-target-class/="true"/'}},[t._v('aop:aspectj-autoproxy-target-class="true"/')])],1),t._v(" "),a("p",[t._v("JDK动态代理和CGLIB字节码生成的区别？")]),t._v(" "),a("p",[t._v("（1）JDK动态代理只能对实现了接口的类生成代理，而不针对类；")]),t._v(" "),a("p",[t._v("（2）CGLIB是针对类实现代理，主要是指定的类生成一个子类，覆盖其中的方法；")]),t._v(" "),a("p",[t._v("因为是继承，所以该类或方法最好不要声明为final。")])])}),[],!1,null,null,null);a.default=p.exports}}]);