---
title: Spring中的两种代理
date: 2022-03-20
publish: false
---

Spring的两种动态代理方式：JDK和Cglib

### 一、原理区别

Java动态代理是利用反射机制生成一个实现代理接口的匿名类，在调用具体方法前调用invokeHandler来处理。

而cglib动态代理是利用asm开源包，对代理对象的class文件加载进来，通过修改器字节码生成子类来处理。

1、如果目标对象实现了接口，默认情况下会采用JDK的动态代理实现AOP；

2、如果目标对象实现了接口，可以强制使用CGlib实现AOP；

3、如果目标对象没有实现接口，必须采用Cglib库，Spring会自动在JDK动态代理和CGLIB之间转换。

如何强制使用CGLIB实现AOP：

（1）添加CGLIB库，SPRING_HOME/cglib/*.jar；

（2）在Spring配置文件中加入<aop:aspectj-autoproxy-target-class="true"/>

JDK动态代理和CGLIB字节码生成的区别？

（1）JDK动态代理只能对实现了接口的类生成代理，而不针对类；

（2）CGLIB是针对类实现代理，主要是指定的类生成一个子类，覆盖其中的方法；

因为是继承，所以该类或方法最好不要声明为final。
