(window.webpackJsonp=window.webpackJsonp||[]).push([[69],{473:function(e,t,r){"use strict";r.r(t);var n=r(2),o=Object(n.a)({},(function(){var e=this,t=e._self._c;return t("ContentSlotsDistributor",{attrs:{"slot-key":e.$parent.slotKey}},[t("h3",{attrs:{id:"一、概念"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#一、概念"}},[e._v("#")]),e._v(" 一、概念")]),e._v(" "),t("p",[e._v("Tomcat服务器是一个开源的轻量级web应用服务器，在中小型系统和并发量小的场合下被普遍使用，是开发和调试servlet，JSP程序的首选。")]),e._v(" "),t("h3",{attrs:{id:"二、原理"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#二、原理"}},[e._v("#")]),e._v(" 二、原理")]),e._v(" "),t("p",[t("code",[e._v("Tomcat")]),e._v("结构图:")]),e._v(" "),t("p",[t("img",{attrs:{src:"https://img-blog.csdnimg.cn/05e503d1015541aaac0c8260ff51d4f0.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBAbGVlZGNvZGVKb2huMDE=,size_8,color_FFFFFF,t_70,g_se,x_16",alt:"在这里插入图片描述"}})]),e._v(" "),t("p",[e._v("Tomcat主要组件：服务器Server、服务Service、连接器Connector、容器Container。连接器Connector和容器Container是Tomcat的核心。")]),e._v(" "),t("p",[e._v("一个Container容器和一个或多个Connector组合在一起，加上其他一些支持的组件共同组成一个Service服务，有了Service服务便可以对外提供能力了，但是Service服务的生存需要一个环境，这个环境便是Server，Server组件为Service服务的正常使用提供了生存环境，Server组件可以同时管理一个或多个Service服务。")]),e._v(" "),t("h3",{attrs:{id:"三、两大组件"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#三、两大组件"}},[e._v("#")]),e._v(" 三、两大组件")]),e._v(" "),t("p",[e._v("1、"),t("code",[e._v("Connector")])]),e._v(" "),t("p",[e._v("一个Connecter将在某个指定的端口上侦听客户请求，接收浏览器的发过来的 tcp 连接请求，创建一个 Request 和 Response 对象分别用于和请求端交换数据，然后会产生一个线程来处理这个请求并把产生的 Request 和 Response 对象传给处理Engine(Container中的一部分)，从Engine出获得响应并返回客户。")]),e._v(" "),t("p",[e._v("Tomcat中有两个经典的Connector，一个直接侦听来自Browser的HTTP请求，另外一个来自其他的WebServer请求。HTTP/1.1 Connector在端口8080处侦听来自客户Browser的HTTP请求，AJP/1.3 Connector在端口8009处侦听其他Web Server（其他的HTTP服务器）的Servlet/JSP请求。")]),e._v(" "),t("p",[e._v("Connector 最重要的功能就是接收连接请求然后分配线程让 Container 来处理这个请求，所以这必然是多线程的，多线程的处理是 Connector 设计的核心。")]),e._v(" "),t("p",[e._v("2、"),t("code",[e._v("Container")])]),e._v(" "),t("p",[t("img",{attrs:{src:"https://img-blog.csdnimg.cn/ceab79464ec0429e8e41a5b8f4d4e4c0.png",alt:"在这里插入图片描述"}})]),e._v(" "),t("p",[t("code",[e._v("Container")]),e._v("是容器的父接口，该容器的设计用的是典型的责任链的设计模式，它由四个自容器组件构成，分别是Engine、Host、Context、Wrapper。这四个组件是负责关系，存在包含关系。通常一个Servlet class对应一个Wrapper，如果有多个Servlet定义多个Wrapper，如果有多个Wrapper就要定义一个更高的Container，如Context。")]),e._v(" "),t("p",[e._v("Context 还可以定义在父容器 Host 中，Host 不是必须的，但是要运行 war 程序，就必须要 Host，因为 war 中必有 web.xml 文件，这个文件的解析就需要 Host 了，如果要有多个 Host 就要定义一个 top 容器 Engine 了。而 Engine 没有父容器了，一个 Engine 代表一个完整的 Servlet 引擎。")]),e._v(" "),t("ul",[t("li",[e._v("Engine 容器")])]),e._v(" "),t("p",[e._v("Engine 容器比较简单，它只定义了一些基本的关联关系")]),e._v(" "),t("ul",[t("li",[e._v("Host 容器")])]),e._v(" "),t("p",[e._v("Host 是 Engine 的子容器，一个 Host 在 Engine 中代表一个虚拟主机，这个虚拟主机的作用就是运行多个应用，它负责安装和展开这些应用，并且标识这个应用以便能够区分它们。它的子容器通常是 Context，它除了关联子容器外，还有就是保存一个主机应该有的信息。")]),e._v(" "),t("ul",[t("li",[e._v("Context 容器")])]),e._v(" "),t("p",[e._v("Context 代表 Servlet 的 Context，它具备了 Servlet 运行的基本环境，理论上只要有 Context 就能运行 Servlet 了。"),t("strong",[e._v("简单的 Tomcat 可以没有 Engine 和 Host")]),e._v("。Context 最重要的功能就是管理它里面的 Servlet 实例，Servlet 实例在 Context 中是以 Wrapper 出现的，还有一点就是 Context 如何才能找到正确的 Servlet 来执行它呢？ Tomcat5 以前是通过一个 Mapper 类来管理的，Tomcat5 以后这个功能被移到了 request 中，在前面的时序图中就可以发现获取子容器都是通过 request 来分配的。")]),e._v(" "),t("ul",[t("li",[e._v("Wrapper 容器")])]),e._v(" "),t("p",[e._v("Wrapper 代表一个 Servlet，它负责管理一个 Servlet，包括的 Servlet 的装载、初始化、执行以及资源回收。Wrapper 是最底层的容器，它没有子容器了，所以调用它的 addChild 将会报错.")]),e._v(" "),t("p",[e._v("Wrapper 的实现类是 StandardWrapper，StandardWrapper 还实现了拥有一个 Servlet 初始化信息的 ServletConfig，由此看出 StandardWrapper 将直接和 Servlet 的各种信息打交道。")]),e._v(" "),t("p",[e._v("3、"),t("code",[e._v("其他组件")])]),e._v(" "),t("p",[e._v("Tomcat 还有其它重要的组件，如安全组件 security、logger 日志组件、session、mbeans、naming 等其它组件。这些组件共同为 Connector 和 Container 提供必要的服务。")]),e._v(" "),t("h3",{attrs:{id:"四、http请求过程"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#四、http请求过程"}},[e._v("#")]),e._v(" 四、HTTP请求过程")]),e._v(" "),t("p",[t("img",{attrs:{src:"https://img-blog.csdnimg.cn/30894265dcd443e1b6489137fdf1813f.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBAbGVlZGNvZGVKb2huMDE=,size_12,color_FFFFFF,t_70,g_se,x_16",alt:"在这里插入图片描述"}})]),e._v(" "),t("p",[e._v("Tomcat Server处理一个HTTP请求的过程:")]),e._v(" "),t("p",[e._v("1、用户点击网页内容，请求被发送到本机端口8080，被在那里监听的Coyote HTTP/1.1 Connector获得。")]),e._v(" "),t("p",[e._v("2、Connector把该请求交给它所在的Service的Engine来处理，并等待Engine的回应。")]),e._v(" "),t("p",[e._v("3、Engine获得请求localhost/test/index.jsp，匹配所有的虚拟主机Host。")]),e._v(" "),t("p",[e._v("4、Engine匹配到名为localhost的Host（即使匹配不到也把请求交给该Host处理，因为该Host被定义为该Engine的默认主机），名为localhost的Host获得请求/test/index.jsp，匹配它所拥有的所有的Context。Host匹配到路径为/test的Context（如果匹配不到就把该请求交给路径名为“ ”的Context去处理）。")]),e._v(" "),t("p",[e._v("5、path=“/test”的Context获得请求/index.jsp，在它的mapping table中寻找出对应的Servlet。Context匹配到URL PATTERN为*.jsp的Servlet,对应于JspServlet类。")]),e._v(" "),t("p",[e._v("6、构造HttpServletRequest对象和HttpServletResponse对象，作为参数调用JspServlet的doGet（）或doPost（）.执行业务逻辑、数据存储等程序。")]),e._v(" "),t("p",[e._v("7、Context把执行完之后的HttpServletResponse对象返回给Host。")]),e._v(" "),t("p",[e._v("8、Host把HttpServletResponse对象返回给Engine。")]),e._v(" "),t("p",[e._v("9、Engine把HttpServletResponse对象返回Connector。")]),e._v(" "),t("p",[e._v("10、Connector把HttpServletResponse对象返回给客户Browser。")]),e._v(" "),t("p",[t("strong",[e._v("Tomcat线程池的默认线程数")])]),e._v(" "),t("p",[e._v("200")])])}),[],!1,null,null,null);t.default=o.exports}}]);