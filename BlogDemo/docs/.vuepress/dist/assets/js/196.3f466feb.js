(window.webpackJsonp=window.webpackJsonp||[]).push([[196],{654:function(n,_,t){"use strict";t.r(_);var v=t(1),i=Object(v.a)({},(function(){var n=this,_=n._self._c;return _("ContentSlotsDistributor",{attrs:{"slot-key":n.$parent.slotKey}},[_("h3",{attrs:{id:"_1、nginx-的简介"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#_1、nginx-的简介"}},[n._v("#")]),n._v(" 1、Nginx 的简介")]),n._v(" "),_("p",[n._v("Nginx 是由俄罗斯人 Igor Sysoev 设计开发的，开发工作从2002 年开始，第一次公开发布在 2004 年 10 月 4 日。")]),n._v(" "),_("p",[n._v("官方网站为："),_("code",[n._v("http://nginx.org/")]),n._v("。它是一款免费开源的高性能 HTTP 代理服务器及反向代理服务器（Reverse Proxy）产品，同时它还可以提供 IMAP/POP3 邮件代理服务等功能。它高并发性能很好，官方测试能够支撑 5 万的并发量；运行时内存和 CPU 占用率低，配置简单，容易上手，而且运行非常稳定。")]),n._v(" "),_("h3",{attrs:{id:"_2、nginx-的常用功能"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#_2、nginx-的常用功能"}},[n._v("#")]),n._v(" 2、Nginx 的常用功能")]),n._v(" "),_("p",[n._v("其实 Nginx 的功能特别多，这里我只介绍几个常用的功能，具体的大家可以参考官网介绍。")]),n._v(" "),_("p",[_("code",[n._v("①、反向代理")]),n._v(":")]),n._v(" "),_("p",[n._v("这是 Nginx 服务器作为 WEB 服务器的主要功能之一，客户端向服务器发送请求时，会首先经过 Nginx 服务器，由服务器将请求分发到相应的 WEB 服务器。正向代理是代理客户端，而反向代理则是代理服务器，Nginx 在提供反向代理服务方面，通过使用正则表达式进行相关配置，采取不同的转发策略，配置相当灵活，而且在配置后端转发请求时，完全不用关心网络环境如何，可以指定任意的IP地址和端口号，或其他类型的连接、请求等")]),n._v(" "),_("p",[_("code",[n._v("②、负载均衡")]),n._v(":")]),n._v(" "),_("p",[n._v("这也是 Nginx 最常用的功能之一，负载均衡，一方面是将单一的重负载分担到多个网络节点上做并行处理，每个节点处理结束后将结果汇总返回给用户，这样可以大幅度提高网络系统的处理能力；另一方面将大量的前端并发请求或数据流量分担到多个后端网络节点分别处理，这样可以有效减少前端用户等待相应的时间。而 Nginx 负载均衡都是属于后一方面，主要是对大量前端访问或流量进行分流，已保证前端用户访问效率，并可以减少后端服务器处理压力。")]),n._v(" "),_("p",[_("code",[n._v("③、Web 缓存")]),n._v(":")]),n._v(" "),_("p",[n._v("在很多优秀的网站中，Nginx 可以作为前置缓存服务器，它被用于缓存前端请求，从而提高 Web服务器的性能。Nginx 会对用户已经访问过的内容在服务器本地建立副本，这样在一段时间内再次访问该数据，就不需要通过 Nginx 服务器向后端发出请求。减轻网络拥堵，减小数据传输延时，提高用户访问速度。")])])}),[],!1,null,null,null);_.default=i.exports}}]);