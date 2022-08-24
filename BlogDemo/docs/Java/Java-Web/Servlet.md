---
title: Servlet
date: 2022-03-01
publish: false
---

### Servlet：server applet 运行在服务器端的小程序

`Servlet`是一个接口（规则），定义了`Java`类被浏览器访问到（Tomcat识别）的规则；该`Java`类会被Tomcat识别并执行相应的代码，实现动态资源的接收和响应。

* Servlet的执行原理：

1、当服务器接收到客户端浏览器的请求之后，会解析请求的URL路径，获取访问的Servlet的资源路径；

2、查找web.xml文件，是否有对应的<url-pattern>标签体内容；

3、如果有，则再找打对应的<servlet-class>全类名；

4、Tomcat会将将字节码加载进内存，并为其创建对象；

5、调用其方法。

![在这里插入图片描述](https://img-blog.csdnimg.cn/8b1b1cac60e94ea3a5bd936905b5878a.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBAbGVlZGNvZGVKb2huMDE=,size_18,color_FFFFFF,t_70,g_se,x_16)

### HTTP的请求消息数据格式

对于`HTTP`协议而言，在我们获取请求消息时，我们可以将整个请求消息创建为一个对象，该对象中可以有相应的方法，来获取请求消息中的一些信息，针对这些信息，我们可以做出相应的响应。而根据请求消息，做出响应的这个过程应该由`service`方法来实现，因为该方法的参数本就是请求对象和响应对象（service()方法也就是doGet()和doPost()方法）

**1、请求行**

请求方式 请求的`URL` 请求协议/版本

`GET /login.html HTTP1.1`

* 请求方式：

* HTTP的请求方式有7中，常用的是`get`和`post`请求

* Get：

1、请求参数在请求行中，在URL后

2、请求的URL长度有限制

3、不太安全（在URL后，能直接看见）

* Post

1、请求参数在请求体中

2、请求的URL长度是没有限制的

3、相对安全

**2、请求头：客户端告诉服务器的一些信息**

请求头名称：请求头值

* 常见的请求头：

1、`User-Agent`：浏览器告诉服务器，我访问你使用的浏览器版本信息

* 可以在服务器端获取该头的信息，解决浏览器兼容问题

2、Referer http://localhost/login.html

* 告诉服务器，当前请求从哪里来？

作用：

    1、防盗链

    2、统计工作

3、keep-alive：保持长连接（HTTP1.0需要此参数来保持长连接，HTTP1.1之后，默认就是长连接）

**3、请求空行**

空行，就是用于分割Post请求的请求头和请求体的。

**4、请求体（正文）**：

* 封装`POST`请求的请求参数（`GET`请求没有请求体）：`Post`请求比如在提交表单时，要将表单中的表单项参数提交到服务端

### 一、servlet简介

**1、什么是servlet**

Servlet是运行在服务器端的小程序，是sun公司提供一套规范（接口），用来处理客户端请求、响应给浏览器的动态资源。但Servlet的实质就是Java代码，通过Java的API动态的向客户端输出内容。

`servlet`规范：包含三个技术点

1）servlet技术

2）filter技术---过滤器

3）listener技术--监听器

**2、Servlet快速入门**

实现步骤：

1）创建类实现Servlet接口

2）覆盖尚未实现的方法---service方法

3）在web.xml中进行servlet配置

但在实际开发中，我们不会直接去实现servlet接口，因为那样需要覆盖的方法太多了，我们一般创建类继承HttpServlet

实现步骤：

1）创建类继承HttpServlet类；

2）覆盖doGet和doPost方法；

3）在web.xml中进行servlet配置

### 二、Servlet中的API（生命周期）

#### （1）Servlet接口中的方法

1）init（ServletConfig config）

何时执行：servlet对象创建的时候执行；

`ServletConfig`：代表的是该servlet对象的配置信息。

2）service（ServletRequest request,ServletResqonse response）

何时执行：每次请求都会执行；

ServletRequest：代表请求 认为ServletRequest内部封装的是HTTP请求消息；

ServletResponse：代表响应 认为要封装的是响应的信息。

3）destroy

何时执行：servlet被销毁的时候执行


#### (2)Servlet的生命周期

1）Servlet何时创建

默认第一次访问servlet时创建该对象

2）Servlet何时销毁

服务器关闭servlet就销毁了

3）每次访问必然执行的方法

service(ServletRequest req, ServletResponse res)方法
