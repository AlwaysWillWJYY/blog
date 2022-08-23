---
title: 分布式session
date: 2022-03-31
categories:
 - Java框架
tags:
 - 分布式
---

在搭建完集群环境后，不得不考虑的一个问题就是用户访问产生的session如何处理。如果不做任何处理的话，用户将出现频繁登录的现象，比如集群中存在A、B两台服务器，用户在第一次访问网站时，Nginx通过其负载均衡机制将用户请求转发到A服务器，这时A服务器就会给用户创建一个Session。当用户第二次发送请求时，Nginx将其负载均衡到B服务器，而这时候B服务器并不存在Session，所以就会将用户踢到登录页面。这将大大降低用户体验度，导致用户的流失，这种情况是项目绝不应该出现的。

常见的解决方案有四种：基于cookie，session绑定，session复制和session共享。

### 一、基于客户端cookie存储

`直接将信息存储在cookie中`

cookie是存储在客户端上的一小段数据，客户端通过http协议和服务器进行cookie交互，通常用来存储一些不敏感信息

`缺点：`

·数据存储在客户端，存在安全隐患

·cookie存储大小、类型存在限制

·数据存储在cookie中，如果一次请求cookie过大，会给网络增加更大的开销

### 二、基于session绑定

原理：粘性Session是指将用户锁定到某一个服务器上，比如上面说的例子，用户第一次请求时，负载均衡器将用户的请求转发到了A服务器上，如果负载均衡器设置了粘性Session的话，那么用户以后的每次请求都会转发到A服务器上，相当于把用户和A服务器粘到了一块，这就是粘性Session机制。

优点：简单，不需要对session做任何处理。

缺点：缺乏容错性，如果当前访问的服务器发生故障，用户被转移到第二个服务器上时，他的session信息都将失效。

适用场景：发生故障对客户产生的影响较小；服务器发生故障是低概率事件。

实现方式：以Nginx为例，在upstream模块配置ip_hash属性即可实现粘性Session。

![在这里插入图片描述](https://img-blog.csdnimg.cn/c14ba6805a0743fea4b8aba7c518eb7a.png)

### 三、基于session复制

session复制是小型企业应用使用较多的一种服务器集群session管理机制，在真正的开发使用的并不是很多，通过对web服务器(例如Tomcat)进行搭建集群。

`存在的问题：`

·session同步的原理是在同一个局域网里面通过发送广播来异步同步session的，一旦服务器多了，并发上来了，session需要同步的数据量就大了，需要将其他服务器上的session全部同步到本服务器上，会带来一定的网路开销，在用户量特别大的时候，会出现内存不足的情况

优点：

服务器之间的session信息都是同步的，任何一台服务器宕机的时候不会影响另外服务器中session的状态，配置相对简单

Tomcat内部已经支持分布式架构开发管理机制，可以对tomcat修改配置来支持session复制，在集群中的几台服务器之间同步session对象，使每台服务器上都保存了所有用户的session信息，这样任何一台本机宕机都不会导致session数据的丢失，而服务器使用session时，也只需要在本机获取即可

如何配置：
在Tomcat安装目录下的config目录中的server.xml文件中，将注释打开，tomcat必须在同一个网关内，要不然收不到广播，同步不了session
在web.xml中开启session复制：<distributable/>

### 四、基于session共享（重点redis）

使用分布式缓存方案比如memcached、Redis，但是要求Memcached或Redis必须是集群。

`1、基于Redis持久化session（重点）`

**基于redis存储session方案流程示意图**

![在这里插入图片描述](https://img-blog.csdnimg.cn/cac1846f8daa426ba886b6b896258f38.png)

`引入pom依赖`

![在这里插入图片描述](https://img-blog.csdnimg.cn/3b708658d8574ca496b4a8fc6d02e9a3.png)

`配置redis`

![在这里插入图片描述](https://img-blog.csdnimg.cn/719b85247f3942fb8d57da86c346559e.png)

优点：

·这是企业中使用的最多的一种方式

·spring为我们封装好了spring-session，直接引入依赖即可

·数据保存在redis中，无缝接入，不存在任何安全隐患

·redis自身可做集群，搭建主从，同时方便管理

缺点：

·多了一次网络调用，web容器需要向redis访问

总结：

一般会将web容器所在的服务器和redis所在的服务器放在同一个机房，减少网络开销，走内网进行连接

`2、基于memcached持久化session`

`3、基于数据库持久化session`

原理：就是拿出一个数据库，专门用来存储session信息。保证session的持久化。

优点：服务器出现问题，session不会丢失

缺点：如果网站的访问量很大，把session存储到数据库中，会对数据库造成很大压力，还需要增加额外的开销维护数据库。
