---
title: SpringBoot启动
date: 2022-03-23
categories:
 - SpringBoot
tags:
 - SprintBoot
---

## SpringBoot启动流程图

![在这里插入图片描述](https://img-blog.csdnimg.cn/bd141953f5ff4bd2ab174b602fa8a4b2.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBAbGVlZGNvZGVKb2huMDE=,size_20,color_FFFFFF,t_70,g_se,x_16)

### 总览：

  上图为SpringBoot启动结构图，我们发现启动流程主要分为三个部分，第一部分进行SpringApplication的初始化模块，配置一些基本的环境变量、资源、构造器、监听器，第二部分实现了应用具体的启动方案，包括启动流程的监听模块、加载配置环境模块、及核心的创建上下文环境模块，第三部分是自动化配置模块，该模块作为springboot自动配置核心，在后面的分析中会详细讨论。在下面的启动程序中我们会串联起结构中的主要功能。

### 启动：

  每个SpringBoot程序都有一个主入口，也就是main方法，main里面调用SpringApplication.run()启动整个spring-boot程序，该方法所在类需要使用@SpringBootApplication注解，以及@ImportResource注解(if need)，@SpringBootApplication包括三个注解:

  功能如下：@EnableAutoConfiguration：SpringBoot根据应用所声明的依赖来对Spring框架进行自动配置

  @SpringBootConfiguration(内部为@Configuration)：被标注的类等于在spring的XML配置文件中(applicationContext.xml)，装配所有bean事务，提供了一个spring的上下文环境

  @ComponentScan：组件扫描，可自动发现和装配Bean，默认扫描SpringApplication的run方法里的Booter.class所在的包路径下文件，所以最好将该启动类放到根包路径下：

![在这里插入图片描述](https://img-blog.csdnimg.cn/e65a17e7017c4c689b07a4e8f26e70a2.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBAbGVlZGNvZGVKb2huMDE=,size_19,color_FFFFFF,t_70,g_se,x_16)

SpringBoot启动类

首先进入run方法

![在这里插入图片描述](https://img-blog.csdnimg.cn/f70f4a81543e4b4f8d4eef15058ccfe7.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBAbGVlZGNvZGVKb2huMDE=,size_19,color_FFFFFF,t_70,g_se,x_16)

run方法中去创建了一个SpringApplication实例，在该构造方法内，我们可以发现其调用了一个初始化的initialize方法

![在这里插入图片描述](https://img-blog.csdnimg.cn/c71af5cd6da14342a1195821df61a5ce.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBAbGVlZGNvZGVKb2huMDE=,size_20,color_FFFFFF,t_70,g_se,x_16)

![在这里插入图片描述](https://img-blog.csdnimg.cn/50e13f862c54495cba4e9033e6bd30a4.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBAbGVlZGNvZGVKb2huMDE=,size_20,color_FFFFFF,t_70,g_se,x_16)

这里主要是为SpringApplication对象赋一些初值。构造函数执行完毕后，我们回到run方法

![在这里插入图片描述](https://img-blog.csdnimg.cn/2062cb82c14c4dfca00c3bdbdecc5db9.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBAbGVlZGNvZGVKb2huMDE=,size_20,color_FFFFFF,t_70,g_se,x_16)

该方法中实现了如下几个关键步骤：

1.创建了应用的监听器SpringApplicationRunListeners并开始监听

2.加载SpringBoot配置环境(ConfigurableEnvironment)，如果是通过web容器发布，会加载StandardEnvironment，其最终也是继承了ConfigurableEnvironment，类图如下

![在这里插入图片描述](https://img-blog.csdnimg.cn/1447f298584e48d4afbba6eac5db6b63.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBAbGVlZGNvZGVKb2huMDE=,size_10,color_FFFFFF,t_70,g_se,x_16)

可以看出，*Environment最终都实现了PropertyResolver接口，我们平时通过environment对象获取配置文件中指定Key对应的value方法时，就是调用了propertyResolver接口的getProperty方法

3.配置环境(Environment)加入到监听器对象中(SpringApplicationRunListeners)

4.创建run方法的返回对象：ConfigurableApplicationContext(应用配置上下文)，我们可以看一下创建方法：

![在这里插入图片描述](https://img-blog.csdnimg.cn/f5a912dcd4dd4d86bad15c5f31e05811.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBAbGVlZGNvZGVKb2huMDE=,size_20,color_FFFFFF,t_70,g_se,x_16)

方法会先获取显式设置的应用上下文(applicationContextClass)，如果不存在，再加载默认的环境配置（通过是否是web environment判断），默认选择AnnotationConfigApplicationContext注解上下文（通过扫描所有注解类来加载bean），最后通过BeanUtils实例化上下文对象，并返回，ConfigurableApplicationContext类图如下：

![在这里插入图片描述](https://img-blog.csdnimg.cn/933f0d2bdbf143258220b119b5d06cc5.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBAbGVlZGNvZGVKb2huMDE=,size_20,color_FFFFFF,t_70,g_se,x_16)

主要看其继承的两个方向：

LifeCycle：生命周期类，定义了start启动、stop结束、isRunning是否运行中等生命周期空值方法

ApplicationContext：应用上下文类，其主要继承了beanFactory(bean的工厂类)

5.回到run方法内，prepareContext方法将listeners、environment、applicationArguments、banner等重要组件与上下文对象关联

6.接下来的refreshContext(context)方法(初始化方法如下)将是实现spring-boot-starter-*(mybatis、redis等)自动化配置的关键，包括spring.factories的加载，bean的实例化等核心工作。

![在这里插入图片描述](https://img-blog.csdnimg.cn/eca3dda1e4ed417aa3b2e6dcefe9dc5f.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBAbGVlZGNvZGVKb2huMDE=,size_19,color_FFFFFF,t_70,g_se,x_16)

refresh方法

配置结束后，Springboot做了一些基本的收尾工作，返回了应用环境上下文。回顾整体流程，Springboot的启动，主要创建了配置环境(environment)、事件监听(listeners)、应用上下文(applicationContext)，并基于以上条件，在容器中开始实例化我们需要的Bean，至此，通过SpringBoot启动的程序已经构造完成，接下来我们来探讨自动化配置是如何实现。

### 自动化配置：

之前的启动结构图中，我们注意到无论是应用初始化还是具体的执行过程，都调用了SpringBoot自动配置模块

![在这里插入图片描述](https://img-blog.csdnimg.cn/1099aa46314a4c3186b0bbd1bf0f7620.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBAbGVlZGNvZGVKb2huMDE=,size_19,color_FFFFFF,t_70,g_se,x_16)

SpringBoot自动配置模块

 该配置模块的主要使用到了SpringFactoriesLoader，即Spring工厂加载器，该对象提供了loadFactoryNames方法，入参为factoryClass和classLoader，即需要传入上图中的工厂类名称和对应的类加载器，方法会根据指定的classLoader，加载该类加器搜索路径下的指定文件，即spring.factories文件，传入的工厂类为接口，而文件中对应的类则是接口的实现类，或最终作为实现类，所以文件中一般为如下图这种一对多的类名集合，获取到这些实现类的类名后，loadFactoryNames方法返回类名集合，方法调用方得到这些集合后，再通过反射获取这些类的类对象、构造方法，最终生成实例

![在这里插入图片描述](https://img-blog.csdnimg.cn/ef9bf54571a54b259dd9452cd3db2af5.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBAbGVlZGNvZGVKb2huMDE=,size_20,color_FFFFFF,t_70,g_se,x_16)

工厂接口与其若干实现类接口名称

下图有助于我们形象理解自动配置流程

![在这里插入图片描述](https://img-blog.csdnimg.cn/00efa59235824ff7824770478f1bfda3.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBAbGVlZGNvZGVKb2huMDE=,size_20,color_FFFFFF,t_70,g_se,x_16)

SpringBoot自动化配置关键组件关系图 

 mybatis-spring-boot-starter、spring-boot-starter-web等组件的META-INF文件下均含有spring.factories文件，自动配置模块中，SpringFactoriesLoader收集到文件中的类全名并返回一个类全名的数组，返回的类全名通过反射被实例化，就形成了具体的工厂实例，工厂实例来生成组件具体需要的bean。

之前我们提到了EnableAutoConfiguration注解，其类图如下

![在这里插入图片描述](https://img-blog.csdnimg.cn/2de3b2c0da37461ea6524ac5314562cc.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBAbGVlZGNvZGVKb2huMDE=,size_20,color_FFFFFF,t_70,g_se,x_16)

可以发现其最终实现了ImportSelector(选择器)和BeanClassLoaderAware(bean类加载器中间件)，重点关注一下AutoConfigurationImportSelector的selectImports方法

![在这里插入图片描述](https://img-blog.csdnimg.cn/eab6eaad0d6440eaac4f9b171f235ec5.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBAbGVlZGNvZGVKb2huMDE=,size_20,color_FFFFFF,t_70,g_se,x_16)

该方法在springboot启动流程——bean实例化前被执行，返回要实例化的类信息列表。我们知道，如果获取到类信息，spring自然可以通过类加载器将类加载到jvm中，现在我们已经通过spring-boot的starter依赖方式依赖了我们需要的组件，那么这些组建的类信息在select方法中也是可以被获取到的，不要急我们继续向下分析

![在这里插入图片描述](https://img-blog.csdnimg.cn/d9f007a8e83e42f49adf5542f5f16d46.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBAbGVlZGNvZGVKb2huMDE=,size_20,color_FFFFFF,t_70,g_se,x_16)

该方法中的getCandidateConfigurations方法，通过方法注释了解到，其返回一个自动配置类的类名列表，方法调用了loadFactoryNames方法，查看该方法

![在这里插入图片描述](https://img-blog.csdnimg.cn/c608a065127b4f4e8130dbf32ecb6b27.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBAbGVlZGNvZGVKb2huMDE=,size_20,color_FFFFFF,t_70,g_se,x_16)

在上面的代码可以看到自动配置器会跟根据传入的factoryClass.getName()到项目系统路径下所有的spring.factories文件中找到相应的key，从而加载里面的类。我们就选取这个mybatis-spring-boot-autoconfigure下的spring.factories文件

![在这里插入图片描述](https://img-blog.csdnimg.cn/c634c3a3e0d844e2b50f703d6f319748.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBAbGVlZGNvZGVKb2huMDE=,size_20,color_FFFFFF,t_70,g_se,x_16)

进入org.mybatis.spring.boot.autoconfigure.MybatisAutoConfiguration中，主要看一下类头

![在这里插入图片描述](https://img-blog.csdnimg.cn/7e9098b17153474287ed34104c129b9e.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBAbGVlZGNvZGVKb2huMDE=,size_20,color_FFFFFF,t_70,g_se,x_16)

发现@Spring的Configuration，俨然是一个通过注解标注的springBean，继续向下看，

@ConditionalOnClass({ SqlSessionFactory.class, SqlSessionFactoryBean.class})这个注解的意思是：当存在SqlSessionFactory.class, SqlSessionFactoryBean.class这两个类时才解析MybatisAutoConfiguration配置类,否则不解析这一个配置类，make sence，我们需要mybatis为我们返回会话对象，就必须有会话工厂相关类

@CondtionalOnBean(DataSource.class):只有处理已经被声明为bean的dataSource

@ConditionalOnMissingBean(MapperFactoryBean.class)这个注解的意思是如果容器中不存在name指定的bean则创建bean注入，否则不执行

 以上配置可以保证sqlSessionFactory、sqlSessionTemplate、dataSource等mybatis所需的组件均可被自动配置，@Configuration注解已经提供了Spring的上下文环境，所以以上组件的配置方式与Spring启动时通过mybatis.xml文件进行配置起到一个效果。通过分析我们可以发现，只要一个基于SpringBoot项目的类路径下存在SqlSessionFactory.class, SqlSessionFactoryBean.class，并且容器中已经注册了dataSourceBean，就可以触发自动化配置，意思说我们只要在maven的项目中加入了mybatis所需要的若干依赖，就可以触发自动配置，但引入mybatis原生依赖的话，每集成一个功能都要去修改其自动化配置类，那就得不到开箱即用的效果了。所以Spring-boot为我们提供了统一的starter可以直接配置好相关的类，触发自动配置所需的依赖(mybatis)如下：

![在这里插入图片描述](https://img-blog.csdnimg.cn/732d7aef70404e1085fb8f590795c913.png)

这里是截取的mybatis-spring-boot-starter的源码中pom.xml文件中所有依赖:

![在这里插入图片描述](https://img-blog.csdnimg.cn/3a4d0e234ddb4ddea4b98a9b731f4c76.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBAbGVlZGNvZGVKb2huMDE=,size_14,color_FFFFFF,t_70,g_se,x_16)

因为maven依赖的传递性，我们只要依赖starter就可以依赖到所有需要自动配置的类，实现开箱即用的功能。也体现出Springboot简化了Spring框架带来的大量XML配置以及复杂的依赖管理，让开发人员可以更加关注业务逻辑的开发。


