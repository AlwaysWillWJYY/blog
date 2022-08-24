(window.webpackJsonp=window.webpackJsonp||[]).push([[131],{594:function(e,t,v){"use strict";v.r(t);var s=v(2),a=Object(s.a)({},(function(){var e=this,t=e._self._c;return t("ContentSlotsDistributor",{attrs:{"slot-key":e.$parent.slotKey}},[t("h3",{attrs:{id:"http协议"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#http协议"}},[e._v("#")]),e._v(" HTTP协议")]),e._v(" "),t("p",[t("strong",[e._v("web应用的过程：")])]),e._v(" "),t("p",[t("img",{attrs:{src:"https://img-blog.csdnimg.cn/fa71651355e24226be4d0fad053bc825.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBAbGVlZGNvZGVKb2huMDE=,size_20,color_FFFFFF,t_70,g_se,x_16",alt:"在这里插入图片描述"}})]),e._v(" "),t("p",[e._v("http协议的组成：")]),e._v(" "),t("p",[e._v("请求：")]),e._v(" "),t("p",[e._v("1）请求行")]),e._v(" "),t("p",[e._v("请求方式：GET、POST")]),e._v(" "),t("p",[e._v("请求的资源：/DemoEE/form.html")]),e._v(" "),t("p",[e._v("协议版本：HTTP/1.1")]),e._v(" "),t("p",[e._v("HTTP/1.0，发送请求，创建一次连接，获得一个web资源，连接断开")]),e._v(" "),t("p",[e._v("HTTP/1.1，发送请求，创建一次连接，获得多个web资源，保持连接")]),e._v(" "),t("p",[e._v("2）请求头")]),e._v(" "),t("p",[e._v("请求头是客户端发送给服务端的信息，以键值对形式存在")]),e._v(" "),t("p",[e._v("User-Agent：用户的信息（浏览器，使用的系统）")]),e._v(" "),t("p",[e._v("Connection：keep-alive")]),e._v(" "),t("p",[e._v("Refer：防盗链（浏览器通知服务器，当前请求来之何处）")]),e._v(" "),t("p",[e._v("cookie")]),e._v(" "),t("p",[e._v("3）请求体（请求参数）")]),e._v(" "),t("p",[e._v("封装请求参数，只有POST请求有请求体，进行表单提交")]),e._v(" "),t("p",[t("strong",[e._v("响应")])]),e._v(" "),t("p",[e._v("1）响应行")]),e._v(" "),t("p",[e._v("响应状态码：")]),e._v(" "),t("p",[e._v("200：请求成功")]),e._v(" "),t("p",[e._v("302：请求重定向")]),e._v(" "),t("p",[e._v("304：请求资源没有改变，访问本地缓存")]),e._v(" "),t("p",[e._v("404：请求资源不存在，通常是用户路径编写错误，也有可能是服务器资源已删除")]),e._v(" "),t("p",[e._v("500：服务器内部错误，通常程序抛异常")]),e._v(" "),t("p",[e._v("状态信息：状态信息是根据状态码变化而变化的\n请求方法")]),e._v(" "),t("ol",{attrs:{start:"2"}},[t("li",[e._v("响应头")])]),e._v(" "),t("p",[t("code",[e._v("location")]),e._v("：指定响应的路径，需要与状态码302配合使用，完成跳转")]),e._v(" "),t("p",[t("code",[e._v("Content-type")]),e._v("：响应正文的类型（MIME类型）取值：text/html;charset=UTF-8（防止响应的汉字乱码）")]),e._v(" "),t("p",[e._v("set-cookie")]),e._v(" "),t("p",[e._v("3）响应体")]),e._v(" "),t("p",[e._v("响应体是服务器回写给客户端的页面正文，浏览器将正文加载到内存，然后解析渲染显示页面内容。")]),e._v(" "),t("p",[t("strong",[e._v("Servlet：服务器组件")])]),e._v(" "),t("p",[e._v("什么是Servlet？")]),e._v(" "),t("p",[e._v("运行在服务器的Java小程序，是sun公司提供的一套规范（接口），用来处理客户端请求，响应给浏览器的动态资源。但servlet的实质是java代码，通过java的API动态的向客户端输出内容")]),e._v(" "),t("p",[e._v("Servlet规范：包含三个技术点")]),e._v(" "),t("p",[e._v("1）Servlet技术")]),e._v(" "),t("p",[e._v("2）Filter技术--过滤器")]),e._v(" "),t("p",[e._v("3）Listener技术--监听器")]),e._v(" "),t("p",[e._v("Servlet快速入门：")]),e._v(" "),t("p",[e._v("实现步骤：")]),e._v(" "),t("p",[e._v("1）创建实现Servlet接口的类")]),e._v(" "),t("p",[e._v("2）覆盖尚未实现的方法--servlet方法")]),e._v(" "),t("p",[e._v("3）在web.xml进行servlet配置")]),e._v(" "),t("p",[e._v("重写Servlet中的方法中需要关注的方法：")]),e._v(" "),t("p",[e._v("1）init()方法")]),e._v(" "),t("p",[e._v("2）service方法")]),e._v(" "),t("p",[e._v("3）destroy方法")]),e._v(" "),t("p",[e._v("配置servlet信息：")]),e._v(" "),t("div",{staticClass:"language- line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[e._v("<servlet>\n    \x3c!--名称任意，但是要跟servlet-mapping中的名称一致--\x3e\n    <servlet-name>QuickStartServlet</servlet-name>\n    \x3c!--真正存在的Servlet类的全路径--\x3e\n    <servlet-class>包名.类名<servlet-class>\n    <init-param>\n        \x3c!--该配置主要用于servlet中的init方法中的参数值的获取，用来进行初始化，在init方法中，通过传入的参数ServletConfig来获取该配置中的内容--\x3e\n        <param-name>url</param-name>\n        <param-value>配置文件的路径</param-value>\n    </init-param>\n</servlet>\n\n<servlet-mapping>\n    <servlet-name>QuickStartServlet</servlet-name>\n    \x3c!--url映射，通过浏览器直接访问的地址，或者前端跳转的接口--\x3e\n    <url-pattren>/quickStart</<url-pattern>\n</servlet-mapping>\n")])]),e._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[e._v("1")]),t("br"),t("span",{staticClass:"line-number"},[e._v("2")]),t("br"),t("span",{staticClass:"line-number"},[e._v("3")]),t("br"),t("span",{staticClass:"line-number"},[e._v("4")]),t("br"),t("span",{staticClass:"line-number"},[e._v("5")]),t("br"),t("span",{staticClass:"line-number"},[e._v("6")]),t("br"),t("span",{staticClass:"line-number"},[e._v("7")]),t("br"),t("span",{staticClass:"line-number"},[e._v("8")]),t("br"),t("span",{staticClass:"line-number"},[e._v("9")]),t("br"),t("span",{staticClass:"line-number"},[e._v("10")]),t("br"),t("span",{staticClass:"line-number"},[e._v("11")]),t("br"),t("span",{staticClass:"line-number"},[e._v("12")]),t("br"),t("span",{staticClass:"line-number"},[e._v("13")]),t("br"),t("span",{staticClass:"line-number"},[e._v("14")]),t("br"),t("span",{staticClass:"line-number"},[e._v("15")]),t("br"),t("span",{staticClass:"line-number"},[e._v("16")]),t("br"),t("span",{staticClass:"line-number"},[e._v("17")]),t("br")])]),t("p",[t("strong",[e._v("浏览器通过访问url路径，可以找到对应的servlet标签，在servlet标签中可以找到写好的Servlet类")])]),e._v(" "),t("p",[e._v("Servlet生命周期")]),e._v(" "),t("p",[e._v("1、第一次访问会调用init方法和service方法")]),e._v(" "),t("p",[e._v("2、第二次或之后的访问，仅会调用service方法")]),e._v(" "),t("p",[e._v("3、destroy销毁方法，web应用从Tomcat中移除，或tomcat关闭的时候会调用。")]),e._v(" "),t("p",[e._v("实际开发中，直接创建类继承HttpServlet")]),e._v(" "),t("p",[e._v("实现步骤：")]),e._v(" "),t("p",[e._v("1）创建类继承HttpServlet类")]),e._v(" "),t("p",[e._v("2）重写doGet和doPost方法：在doGet中调用doPost：不管是get还是post方式，进入servlet组件中执行的都是一块代码")]),e._v(" "),t("p",[e._v("3）在web.xml中进行Servlet的配置")]),e._v(" "),t("p",[t("code",[e._v("servletRequset")]),e._v("：请求对象")]),e._v(" "),t("p",[t("code",[e._v("servletResponse")]),e._v("：响应对象")]),e._v(" "),t("p",[t("strong",[e._v("注解配置：")])]),e._v(" "),t("div",{staticClass:"language-java line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-java"}},[t("code",[e._v("\n"),t("span",{pre:!0,attrs:{class:"token annotation punctuation"}},[e._v("@WebServlet")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("(")]),e._v("urlPatterns "),t("span",{pre:!0,attrs:{class:"token operator"}},[e._v("=")]),e._v(" "),t("span",{pre:!0,attrs:{class:"token string"}},[e._v('"/quickStartHttp"')]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(",")]),e._v("name "),t("span",{pre:!0,attrs:{class:"token operator"}},[e._v("=")]),e._v(" "),t("span",{pre:!0,attrs:{class:"token string"}},[e._v('"QuickStartHttp"')]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(")")]),e._v("\n\n")])]),e._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[e._v("1")]),t("br"),t("span",{staticClass:"line-number"},[e._v("2")]),t("br"),t("span",{staticClass:"line-number"},[e._v("3")]),t("br")])]),t("p",[e._v("Servlet的生命周期")]),e._v(" "),t("p",[e._v("• 默认第一次访问Servlet时创建（init方法）")]),e._v(" "),t("p",[e._v("• 服务器关闭Servlet就销毁了（destroy方法）")]),e._v(" "),t("p",[e._v("每次访问必然执行的方法service(ServletRequest req,ServletResponse res)方法")]),e._v(" "),t("p",[e._v("配置Servlet的url路径：")]),e._v(" "),t("url-pattern",[e._v("/aaa/bbb/*")]),e._v(" "),t("url-pattern",[e._v("*.abc")])],1)}),[],!1,null,null,null);t.default=a.exports}}]);