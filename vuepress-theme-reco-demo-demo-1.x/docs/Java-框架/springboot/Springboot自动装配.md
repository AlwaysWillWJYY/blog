---
title: SpringBoot自动装配
date: 2022-03-24
categories:
 - SpringBoot
tags:
 - SprintBoot
---

* springboot一大优势就是省去了很多的配置，也就是说当springboot启动的时候，springboot在内部就已经帮忙封装好了，者其实就是springboot的自动装配操作。

## 1、从@SpringBootApplication启动注解入手

* 源码

![在这里插入图片描述](https://img-blog.csdnimg.cn/5ad0d2de029a4d688111921162075510.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBAbGVlZGNvZGVKb2huMDE=,size_20,color_FFFFFF,t_70,g_se,x_16)

初看@SpringBootApplication有很多的注解组成，其实归纳就是一个"三体"结构，重要的只有三个Annotation：

@Configuration(@SpringBootConfiguration实质就是一个@Configuration）

@EnableAutoConfiguration

@ComponentScan

* 也就是说我们在开发的时候，加上上面的上个注解会等同于加上@SpringBootApplication注解

（1）@Configuration注解

* 这个注解实际上就是代表了一个配置类，相当于一个beans.xml文件;

（2）@ComponentScan

* @ComponentScan的功能其实就是自动扫描并加载符合条件的组件或bean定义，最终将这些bean定义加载到容器中；

（3）@EnableAutoConfiguration

* 在spring中有关于@Enablexxx的注解是开启某一项功能的注解，比如@EnableScheduling表示开启spring的定时任务。其原理是借助@Import的帮助，将所有符合自动配置条件的bean定义加载到Ioc容器；
 
* EnableAutoConfiguration代表开启springboot的自动装配

![在这里插入图片描述](https://img-blog.csdnimg.cn/2de5425248c7429d9d9a8cb6680b6b1b.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBAbGVlZGNvZGVKb2huMDE=,size_20,color_FFFFFF,t_70,g_se,x_16)

从源码中可以知道，最关键的要属@Import(EnableAutoConfigurationImportSelector.class)，借助EnableAutoConfigurationImportSelector，@EnableAutoConfiguration可以帮助SpringBoot应用将所有符合条件的@Configuration配置都加载到当前SpringBoot创建并使用的IoC容器。同时借助于Spring框架原有的一个工具类：SpringFactoriesLoader，@EnableAutoConfiguration就可以实现智能的自动配置。

springframework.boot.autoconfigure.EnableAutoConfiguration的值，并将其封装到一个List中返回List<String>configurations =this.getCandidateConfigurations(annotationMetadata,attributes);

//4.对上一步返回的List中的元素去重、排序

configurations =this.removeDuplicates(configurations);

//5.依据第2步中获取的属性值排除一些特定的类

Set<String>exclusions =this.getExclusions(annotationMetadata,attributes);

//6对上一步中所得到的List进行过滤，过滤的依据是条件匹配。这里用到的过滤器是//org.springframework.boot.autoconfigure.condition.OnClassCondition最终返回的是一个ConditionOutcome[]//数组。（PS：很多类都是依赖于其它的类的，当有某个类时才会装配，所以这次过滤的就是根据是否有某个//class进而决定是否装配的。这些类所依赖的类都写在META-INF/spring-autoconfigure-metadata.properties文件里）

![在这里插入图片描述](https://img-blog.csdnimg.cn/9f51c2018266490cb9a57530a9874b7a.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBAbGVlZGNvZGVKb2huMDE=,size_20,color_FFFFFF,t_70,g_se,x_16)

* ·SpringFactoriesLoader中加载配置,SpringFactoriesLoader属于Spring框架私有的一种扩展方案，其主要功能就是从指定的配置文件META-INF/spring.factories加载配置,即根据@EnableAutoConfiguration的完整类名org.springframework.boot.autoconfigure.EnableAutoConfiguration作为查找的Key,获取对应的一组@Configuration类

![在这里插入图片描述](https://img-blog.csdnimg.cn/2c782de64fae47e9b0276c815767ae11.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBAbGVlZGNvZGVKb2huMDE=,size_20,color_FFFFFF,t_70,g_se,x_16)

**总结**:  

@EnableAutoConfiguration作用就是从classpath中搜寻所有的META-INF/spring.factories配置文件，并将其中org.springframework.boot.autoconfigure.EnableutoConfiguration对应的配置项通过反射（Java Refletion）实例化为对应的标注了@Configuration的JavaConfig形式的IoC容器配置类，然后汇总为一个并加载到IoC容器。这些功能配置类要生效的话，会去classpath中找是否有该类的依赖类（也就是pom.xml必须有对应功能的jar包才行）并且配置类里面注入了默认属性值类，功能类可以引用并赋默认值。生成功能类的原则是自定义优先，没有自定义时才会使用自动装配类。

* 所以功能类能生效需要的条件：

（1）spring.factories里面有这个类的配置类（一个配置类可以创建多个围绕该功能的依赖类）

（2）pom.xml里面需要有对应的jar包

### 二、自动装配案例说明以Redis为例

* 1、从spring-boot-autoconfigure.jar/META-INF/spring.factories中获取redis的相关配置类全限定名（有120多个的配置类）RedisAutoConfiguration，一般一个功能配置类围绕该功能，负责管理创建多个相关的功能类，比如RedisAutoConfiguration负责：JedisConnectionFactory、RedisTemplate、StringRedisTemplate这3个功能类的创建


![在这里插入图片描述](https://img-blog.csdnimg.cn/495ae01a30754c02a9358f4d741a59b3.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBAbGVlZGNvZGVKb2huMDE=,size_20,color_FFFFFF,t_70,g_se,x_16)

spring.factories中的redis配置类

* 2、RedisAutoConfiguration配置类生效的一个条件是在classpath路径下有RedisOperations类存在，因此springboot的自动装配机制会会去classpath下去查找对应的class文件。

![在这里插入图片描述](https://img-blog.csdnimg.cn/2e10dfab278b4ca3aab6927aac06a519.png)

* 3.如果pom.xml有对应的jar包,就能匹配到对应依赖class，

![在这里插入图片描述](https://img-blog.csdnimg.cn/661f001cfda1446da000fcd87d3b3cd7.png)

* 4、匹配成功，这个功能配置类才会生效，同时会注入默认的属性配置类@EnableConfigurationProperties(RedisProperties.class)

![在这里插入图片描述](https://img-blog.csdnimg.cn/fc4d868285184d3292c0c3268b2998bc.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBAbGVlZGNvZGVKb2huMDE=,size_18,color_FFFFFF,t_70,g_se,x_16)

* 5.Redis功能配置里面会根据条件生成最终的JedisConnectionFactory、RedisTemplate,并提供了默认的配置形式@ConditionalOnMissingBean(name = "redisTemplate")

![在这里插入图片描述](https://img-blog.csdnimg.cn/12dcd05990dd4a589533864a12ee809e.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBAbGVlZGNvZGVKb2huMDE=,size_20,color_FFFFFF,t_70,g_se,x_16)

* 6.最终创建好的默认装配类，会通过功能配置类里面的 @Bean注解，注入到IOC当中

* 7.用户使用，当用户在配置文件中自定义时候就会覆盖默认的配置@ConditionalOnMissingBean(name = "redisTemplate")

### 三、自动依赖过程总结

1. 通过各种注解实现了类与类之间的依赖关系，容器在启动的时候Application.run，会调用EnableAutoConfigurationImportSelector.class的selectImports方法（其实是其父类的方法）--**这里需要注意，调用这个方法之前发生了什么和是在哪里调用这个方法需要进一步的探讨**

2. selectImports方法最终会调用SpringFactoriesLoader.loadFactoryNames方法来获取一个全面的常用BeanConfiguration列表

3. loadFactoryNames方法会读取FACTORIES_RESOURCE_LOCATION（也就是spring-boot-autoconfigure.jar 下面的spring.factories），获取到所有的Spring相关的Bean的全限定名ClassName，大概120多个

4. selectImports方法继续调用filter(configurations, autoConfigurationMetadata);这个时候会根据这些BeanConfiguration里面的条件，来一一筛选，最关键的是

@ConditionalOnClass，这个条件注解会去classpath下查找，jar包里面是否有这个条件依赖类，所以必须有了相应的jar包，才有这些依赖类，才会生成IOC环境需要的一些默认配置Bean

5. 最后把符合条件的BeanConfiguration注入默认的EnableConfigurationPropertie类里面的属性值，并且注入到IOC环境当中


