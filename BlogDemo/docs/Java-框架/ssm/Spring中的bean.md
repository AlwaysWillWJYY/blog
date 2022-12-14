---
title: Spring中的Bean
date: 2022-03-21
publish: false
---

### 1、工厂模式解耦

第一步：创建bean.properties配置文件：把将来需要通过反射机制创建的业务层bean对象service和持久层对象dao的全限定类名以key-value的形式写入到配置文件中；

第二步：创建BeanFactory类实现工厂模式解耦：

工厂模式创建完bean之后，将所有的bean都保存到Map集合中，而我们获取bean的时候只需要根据bean的名称作为get的参数进行调用即可；

### 2、bean创建的三中方式

第一种：使用默认构造函数创建

第二种：使用实例工厂模式创建，此时需要将该工厂对象先实例化，才能调用该对象的成员方法来创建我们需要的bean对象；

第三种：使用静态工厂中的静态方法创建对象，因为获取我们需要的bean对象的方法是静态方法，所以我们不需要实例化静态工厂就可以直接通过静态工厂的类名来调用该静态方法。

### 3、bean的作用范围

bean标签的scope属性用于指定bean的作用范围：

Singleton：单例的（默认的）

prototype：多例的

request：作用于web应用的请求范围

session：作用于web应用的会话范围

global-session：作用于集群环境的会话范围

### 4、bean的生命周期

* 单例对象：

出生：当容器创建时，对象出生

活着：只要容器还在，对象一直活着

死亡：容器销毁，对象消亡

总结：单例对象的生命周期与容器的相同

* 多例对象：

出生：当我们使用对象时，Spring框架为我们创建；

活着：对象在使用过程中一直存活；

死亡：当对象长时间不用且没有别的对象引用时，由Java的垃圾回收机制进行回收。

### 5、@Bean的意思

```
@Bean
public MyBean myBean() {
    // instantiate and configure MyBean obj
    return obj;
}
```
意思是@Bean明确地指示了一种方法，什么方法呢——产生一个bean的方法，并且交给Spring容器管理；从这我们就明白了为啥@Bean是放在方法的注释上了，因为它很明确地告诉被注释的方法，你给我产生一个Bean，然后交给Spring容器。

