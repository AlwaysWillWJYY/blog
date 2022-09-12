(window.webpackJsonp=window.webpackJsonp||[]).push([[74],{528:function(a,t,s){"use strict";s.r(t);var _=s(1),r=Object(_.a)({},(function(){var a=this,t=a._self._c;return t("ContentSlotsDistributor",{attrs:{"slot-key":a.$parent.slotKey}},[t("h3",{attrs:{id:"_1、同步"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_1、同步"}},[a._v("#")]),a._v(" 1、同步")]),a._v(" "),t("p",[a._v("Java自己去处理IO。")]),a._v(" "),t("h3",{attrs:{id:"_2、异步"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_2、异步"}},[a._v("#")]),a._v(" 2、异步")]),a._v(" "),t("p",[a._v("Java将IO交给操作系统去处理，告诉缓存区大小，处理完成回调。")]),a._v(" "),t("h3",{attrs:{id:"_3、阻塞"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_3、阻塞"}},[a._v("#")]),a._v(" 3、阻塞")]),a._v(" "),t("p",[a._v("使用阻塞IO是，Java调用会一直阻塞到读写完成才会返回。")]),a._v(" "),t("h3",{attrs:{id:"_4、非阻塞"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_4、非阻塞"}},[a._v("#")]),a._v(" 4、非阻塞")]),a._v(" "),t("p",[a._v("使用非阻塞IO时，如果不能立马读写，Java调用会马上返回，当IO事件分布器发出通知可读写时再进行读写，不断循环直到读写完成。")]),a._v(" "),t("h4",{attrs:{id:"bio-一个连接一个线程"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#bio-一个连接一个线程"}},[a._v("#")]),a._v(" BIO--一个连接一个线程")]),a._v(" "),t("p",[a._v("同步阻塞，服务器的实现模式是一个连接一个线程，这样的模式很明显的一个缺陷是：由于客户端连接数与服务器线程数成正比关系，可能会造成不必要的线程开销，严重的还将导致服务器内存溢出。当然，这种情况可以通过线程池技术来改善，但并不能从本质上解决这个弊端。")]),a._v(" "),t("h4",{attrs:{id:"nio-一个请求一个线程"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#nio-一个请求一个线程"}},[a._v("#")]),a._v(" NIO--一个请求一个线程")]),a._v(" "),t("p",[a._v("在JDK1.4之前，Java的IO模型一直都是BIO，但是从JDK1.4开始，JDK引入了新的IO模型NIO，他是同步非阻塞的IO模型。服务器的实现模式是多个请求一个线程，即请求会注册到多路复用器（监听器）Selector上，多路复用器轮询到连接有IO请求时才会启动一个线程处理。")]),a._v(" "),t("h4",{attrs:{id:"aio-一个有效请求一个线程"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#aio-一个有效请求一个线程"}},[a._v("#")]),a._v(" AIO--一个有效请求一个线程")]),a._v(" "),t("p",[a._v("JDK1.7发布了NIO2.0，这就是真正意义上的异步非阻塞IO模型，服务器实现模式为多个有效请求一个线程，客户端IO请求都是由OS先完成再通知服务器应用去启动线程处理（回调）。")]),a._v(" "),t("h3",{attrs:{id:"应用场景"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#应用场景"}},[a._v("#")]),a._v(" 应用场景")]),a._v(" "),t("p",[a._v("BIO适用于连接数目较小且固定的架构，这种方式对服务器资源的要求比较高，并发局限于应用中，JDK1.4以前的唯一选择，但程序直观简单容易理解；")]),a._v(" "),t("p",[a._v("NIO方式适用于连接数多且连接比较短（轻操作）的架构，比如聊天服务器，并发局限于应用中，编程比较复杂，JDK1.4开始支持；")]),a._v(" "),t("p",[a._v("AIO方式适用于连接数目多且连接较长（重操作）的架构，比如相册服务器，充分调用OS参与并发操作，编程比较复杂，JDK7开始支持。")])])}),[],!1,null,null,null);t.default=r.exports}}]);