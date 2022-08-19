### HTTP协议

**web应用的过程：**

![在这里插入图片描述](https://img-blog.csdnimg.cn/fa71651355e24226be4d0fad053bc825.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBAbGVlZGNvZGVKb2huMDE=,size_20,color_FFFFFF,t_70,g_se,x_16)

http协议的组成：

请求：

1）请求行

请求方式：GET、POST

请求的资源：/DemoEE/form.html

协议版本：HTTP/1.1

HTTP/1.0，发送请求，创建一次连接，获得一个web资源，连接断开

HTTP/1.1，发送请求，创建一次连接，获得多个web资源，保持连接

2）请求头

请求头是客户端发送给服务端的信息，以键值对形式存在

User-Agent：用户的信息（浏览器，使用的系统）

Connection：keep-alive

Refer：防盗链（浏览器通知服务器，当前请求来之何处）

cookie

3）请求体（请求参数）

封装请求参数，只有POST请求有请求体，进行表单提交

**响应**

1）响应行

响应状态码：

200：请求成功

302：请求重定向

304：请求资源没有改变，访问本地缓存

404：请求资源不存在，通常是用户路径编写错误，也有可能是服务器资源已删除

500：服务器内部错误，通常程序抛异常

状态信息：状态信息是根据状态码变化而变化的
请求方法

2) 响应头

`location`：指定响应的路径，需要与状态码302配合使用，完成跳转

`Content-type`：响应正文的类型（MIME类型）取值：text/html;charset=UTF-8（防止响应的汉字乱码）

set-cookie

3）响应体

响应体是服务器回写给客户端的页面正文，浏览器将正文加载到内存，然后解析渲染显示页面内容。

**Servlet：服务器组件**

什么是Servlet？

运行在服务器的Java小程序，是sun公司提供的一套规范（接口），用来处理客户端请求，响应给浏览器的动态资源。但servlet的实质是java代码，通过java的API动态的向客户端输出内容

Servlet规范：包含三个技术点

1）Servlet技术

2）Filter技术--过滤器

3）Listener技术--监听器

Servlet快速入门：

实现步骤：

1）创建实现Servlet接口的类

2）覆盖尚未实现的方法--servlet方法

3）在web.xml进行servlet配置

重写Servlet中的方法中需要关注的方法：

1）init()方法

2）service方法

3）destroy方法

配置servlet信息：

```
<servlet>
    <!--名称任意，但是要跟servlet-mapping中的名称一致-->
    <servlet-name>QuickStartServlet</servlet-name>
    <!--真正存在的Servlet类的全路径-->
    <servlet-class>包名.类名<servlet-class>
    <init-param>
        <!--该配置主要用于servlet中的init方法中的参数值的获取，用来进行初始化，在init方法中，通过传入的参数ServletConfig来获取该配置中的内容-->
        <param-name>url</param-name>
        <param-value>配置文件的路径</param-value>
    </init-param>
</servlet>

<servlet-mapping>
    <servlet-name>QuickStartServlet</servlet-name>
    <!--url映射，通过浏览器直接访问的地址，或者前端跳转的接口-->
    <url-pattren>/quickStart</<url-pattern>
</servlet-mapping>
```
**浏览器通过访问url路径，可以找到对应的servlet标签，在servlet标签中可以找到写好的Servlet类**

Servlet生命周期

1、第一次访问会调用init方法和service方法

2、第二次或之后的访问，仅会调用service方法

3、destroy销毁方法，web应用从Tomcat中移除，或tomcat关闭的时候会调用。

实际开发中，直接创建类继承HttpServlet

实现步骤：

1）创建类继承HttpServlet类

2）重写doGet和doPost方法：在doGet中调用doPost：不管是get还是post方式，进入servlet组件中执行的都是一块代码

3）在web.xml中进行Servlet的配置

`servletRequset`：请求对象

`servletResponse`：响应对象

**注解配置：**
```java

@WebServlet(urlPatterns = "/quickStartHttp",name = "QuickStartHttp")

```
Servlet的生命周期

• 默认第一次访问Servlet时创建（init方法）

• 服务器关闭Servlet就销毁了（destroy方法）

每次访问必然执行的方法service(ServletRequest req,ServletResponse res)方法

配置Servlet的url路径：

<!--虚拟目录匹配-->

<url-pattern>/aaa/bbb/*</url-pattern>

<!--扩展名匹配-->

<url-pattern>*.abc</url-pattern>
