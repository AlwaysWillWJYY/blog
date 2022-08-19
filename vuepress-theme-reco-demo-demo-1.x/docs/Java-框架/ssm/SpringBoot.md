### 项目中为什么使用SpringBoot？

1、SpringBoot开箱即用，无需繁琐的配置，但同时SpringBoot也允许修改默认的配置来满足特定的需求；

2、SpringBoot对导入的jar包可以进行系统的版本管理；

3、SpringBoot为大型项目提供了一些非功能性的特性，比如内嵌了服务器，还有安全模块；

4、使用SpringBoot还提供了一系列的测试框架。

### SpringBoot中的配置文件类型？

1、pproperties配置文件；properties配置文件是使用key=value的形式进行配置；

2、yaml/yml；yml是使用：和空格进行配置，空格决定了层级关系；

3、xml；

### SpringBoot的启动过程？

1、添加SpringBoot起步依赖：spring-boot-starter-parent；

2、SpringBoot要集成SpringMVC进行Controller的开发，所以要导web的依赖：spring-boot-starter-web；

3、编写SpringBoot引导类：使用的是@SpringBootApplication注解；

### SpringBoot的配置文件

1、SpringBoot是基于约定的，所以很多配置都是默认的，但是如果想要进行特定的配置，使用application.properties或者application.yml进行配置；

2、SpringBoot会默认从Resources目录下加载application.properties或application.yml文件；

3、配置文件和配置类的属性映射方式：

1）使用@Value注解：我们可以通过@Value注解将配置文件的值映射到一个Spring管理的bean字段上；

2）通过注解@ConfigurationProperties（prefix="配置文件中key的前缀"）可以将配置文件中的配置自动与实体进行映射；

### Spring如何实现自动配置？

SpringBoot自动配置主要通过@EnableAutoConfiguration，@Conditional，@EnableConfigurationProperties或者@ConfigurationProperties等几个注解来进行自动配置完成的。

1、@EnableAutoConfiguration开启自动配置，主要作用就是调用Spring-core包里的loadFactoryNames()，将autoconfig包里已经写好的自动配置加载进来；

2、@Conditional条件注解，通过判断类路径下有没有相应配置的jar包来确定是否加载自动配置这个类；

3、@EnableConfigurationProperties的作用就是，给自动配置提供具体的配置参数，只需要写在application.properties中，就可以通过映射写入配置类的POJO属性中。

SpringBoot的启动类就是加了@SpringBootConfiguration注解的类。
