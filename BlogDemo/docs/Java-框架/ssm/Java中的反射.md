---
title: Java的反射技术
date: 2022-03-20
publish: false
---

### 1、获取Class对象的方式（3种）

`方式一`：通过Object类中的getClass()方法（先创建对象，根据对象获得class）

Person p = new Person();
Class c = p.getClass();

`方式二`：通过类名.class获取到字节码文件对象（任意数据类型都具备一个叫class静态属性，看上去要比第一种方式简单）

Class c2 = Person.class;

`方式三`：通过Class类中的方法（将类名作为字符串传递给Class类中的静态方法forName(全限定类名)即可）（这种方法是反射）

Class c3 = Class.forName("Person");

**注意：第三种和前两种的区别**

前两种你必须明确Person类型，后面是指定这种类型的字符串就行。这种扩展更强。在不需要知道类的前提下，只要提供字符串，按照配置文件加载就可以了。

### 2、获取全部构造方法，公有构造器方法，私有构造器方法，获取公有成员变量、暴力获取私有成员变量

获取公有的带参/不带参的构造器方法

```
//1.获取Class对象
Classc=Class.forName("com.cifeng.entity.Person");//类名、包名

//2.获取指定的构造方法

//public Person()/Person类空参的构造方法
//Constructor con=c.getConstructor(null);//获取空参的构造方法
//public Person(String name,int age,String address);//Person类含参的构造方法

Constructor con=c.getConstructor(String.class,int.class,String.class);

//通过构造方法类中的Constructor的方法，构造对象
//Objectobj=con.newInstance(null);//空参的构造方法
//constructor对象是类的构造器对象，每个类都有自己的构造器
//利用构造器对象可以实例化对象

Object obj=con.newInstance("小明",22,"哈尔滨");

//显示
System.out.println(obj);
```

获取私有的构造方法

**私有化构造方法之后，我们不能在类的外部创建类的实例对象了

如果我们想在Person类的外部使用Person类的对象，只能在person类的内部实例化一个Person类的对象，然后调用这个对象，而不能再外部实例化新的对象。

外部的Person类的所有对象只能是对Person内部newperson对象的引用。

外部一千一万个对象也都只能是对Person内部newperson对象的引用。

因为外部定义的Person类对象没有实例化能力。这就是单例设计模式，从头至尾只有一个对象的实例（单例）**

![](https://img-blog.csdnimg.cn/img_convert/5fb4ea088750fd4c394c307867aa5ee0.png)

获取成员变量

![](https://img-blog.csdnimg.cn/img_convert/f576eb55cad2178f9dfaf3c320071861.png)


### 3、一个私有的属性，没有set方法，如何修改值->反射获取私有变量并赋值

通过反射机制修改类中的私有属性值（暴力反射）

![](https://img-blog.csdnimg.cn/img_convert/5f8936b205eba8725864132e3981a9a4.png)

### 4、获取空参成员方法，有参成员方法

![](https://img-blog.csdnimg.cn/img_convert/5a799c83f107915ebc8f3480a22e00ed.png)

![](https://img-blog.csdnimg.cn/img_convert/4d732fc15e530ecac91666ec95b54817.png)

**对于类的私有成员变量和私有的方法，我们在访问时需要开启暴力访问模式：
setAccessible(true);**

### 5、如何向ArrayList<String>里添加一个Integer类型的量

泛型擦除（“伪泛型”）：编译后的Class文件没有泛型

不对集合类进行操作，通过反射获取ArrayList类的class文件对象，调用add方法

![](https://img-blog.csdnimg.cn/img_convert/b79db8db6f4ced0b81eb12d02ad00a0a.png)

### 6、Java的newInstance()和new的区别（反射机制，通过类名来获取该类的实例化对象）

Class c = Class.forName("包名.类名");

Object obj = c.newInstance();   //通过类名来获取该类的实例化对象

从JVM的角度看，我们使用new关键字的时候，这个要new的类可以没有加载；在new时加载类
但是使用newInstance时候，就必须保证：

1. 这个类已经加载；

2. 这个类已经连接了，而完成上面两个步骤的正是class的静态方法forName()这个方法，这个静态方法调用了启动类加载器。newInstance实际上是把new这个方式分解为两个步骤。首先调用class的加载方法加载某个类，然后实例化

`newInstance`：弱类型。低效率。只能调用无参构造

`New`:强类型。相对高效。能调用任何public构造

`newInstance()`是实现IOC、反射、面对接口编程和依赖倒置等技术方法的必然选择，new只能实现具体类的实例化，不适合于接口编程。



