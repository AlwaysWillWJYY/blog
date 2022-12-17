(window.webpackJsonp=window.webpackJsonp||[]).push([[213],{672:function(s,a,t){"use strict";t.r(a);var e=t(1),n=Object(e.a)({},(function(){var s=this,a=s._self._c;return a("ContentSlotsDistributor",{attrs:{"slot-key":s.$parent.slotKey}},[a("h3",{attrs:{id:"问题1-nginx是用来干嘛的"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#问题1-nginx是用来干嘛的"}},[s._v("#")]),s._v(" 问题1:Nginx是用来干嘛的?")]),s._v(" "),a("p",[s._v("Nginx是一个高性能的HTTP和反向代理服务器，这个基本是用来前端服务器集群后做负载均衡和动静分离用的。")]),s._v(" "),a("p",[s._v("负载均衡即是代理服务器将接收的请求均衡的分发到各服务器中。")]),s._v(" "),a("p",[s._v("用于HTTP、HTTPS、SMTP、POP3和IMAP协议。")]),s._v(" "),a("p",[a("img",{attrs:{src:"https://img-blog.csdnimg.cn/3b79566fac904078ac18bf2de550dc7a.png",alt:"在这里插入图片描述"}})]),s._v(" "),a("h3",{attrs:{id:"问题2-负载均衡原理"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#问题2-负载均衡原理"}},[s._v("#")]),s._v(" 问题2：负载均衡原理")]),s._v(" "),a("p",[s._v("Nginx是通过反向代理实现的负载均衡。")]),s._v(" "),a("p",[s._v("什么是正向代理与反向代理？")]),s._v(" "),a("p",[s._v("正向代理就是，客户端通过一台代理服务器访问服务端。")]),s._v(" "),a("p",[s._v("反向代理就是，服务端通过代理服务器为客户端提供服务。")]),s._v(" "),a("h3",{attrs:{id:"问题3-负载均衡的几种常用方式-几种策略"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#问题3-负载均衡的几种常用方式-几种策略"}},[s._v("#")]),s._v(" 问题3：负载均衡的几种常用方式？几种策略")]),s._v(" "),a("p",[s._v("1、轮询（默认）")]),s._v(" "),a("p",[s._v("2、weight（权重） ，即指定轮询几率，weight和访问比率成正比，用于后端服务器性能不均的\n情况。")]),s._v(" "),a("div",{staticClass:"language-java line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-java"}},[a("code",[s._v("upstream backserver "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n    server "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("192.168")]),a("span",{pre:!0,attrs:{class:"token number"}},[s._v(".0")]),a("span",{pre:!0,attrs:{class:"token number"}},[s._v(".14")]),s._v(" weight"),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("3")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n    server "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("192.168")]),a("span",{pre:!0,attrs:{class:"token number"}},[s._v(".0")]),a("span",{pre:!0,attrs:{class:"token number"}},[s._v(".15")]),s._v(" weight"),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("7")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br"),a("span",{staticClass:"line-number"},[s._v("3")]),a("br"),a("span",{staticClass:"line-number"},[s._v("4")]),a("br")])]),a("p",[s._v("权重越高，在被访问的概率越大，如上例，分别是30%，70%。")]),s._v(" "),a("p",[s._v("但是上述方式存在一个问题就是说，在负载均衡系统中，假如用户在某台服务器上登录了，那么该用户第二次请求的时候，因为我们是负载均衡系统，每次请求都会重新定位到服务器集群中的某一个，那么已经登录某一个服务器的用户再重新定位到另一个服务器，其登录信息将会丢失，这样显然是不妥的。")]),s._v(" "),a("p",[s._v("3、ip_hash：   每个请求按访问ip的hash结果分配，这样每个访客固定访问一个后端服务器，可以解决session的问题。")]),s._v(" "),a("p",[s._v("4、url_hash（第三方）：按访问URL的hash结果进行分配请求，使每个URL定向到同一个后端服务器，后端服务器为缓存时比较有效。在upstream中加入hash语句，server语句中不能写入weight等其他的参数，hash_method是使用hash算法。")]),s._v(" "),a("p",[s._v("5、fair（第三方） ：按后端服务器的响应时间来分配请求，响应时间短的优先分配。")]),s._v(" "),a("h3",{attrs:{id:"问题4-session不同步怎么办-因为nginx默认的轮询方法是有这个问题的"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#问题4-session不同步怎么办-因为nginx默认的轮询方法是有这个问题的"}},[s._v("#")]),s._v(" 问题4：session不同步怎么办?（因为Nginx默认的轮询方法是有这个问题的）")]),s._v(" "),a("p",[s._v("我们可以采用ip_hash指令解决这个问题，如果客户已经访问了某个服务器，当用户再次访问时，会将该请求通过哈希算法，自动定位到该服务器。即每个访客固定访问一个后端服务器，可以解决session的问题。")]),s._v(" "),a("p",[s._v("其他办法：那就是用spring_session+redis，把session放到缓存中实现session共享。")]),s._v(" "),a("h3",{attrs:{id:"问题5-使用-反向代理服务器-的优点是什么"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#问题5-使用-反向代理服务器-的优点是什么"}},[s._v("#")]),s._v(" 问题5：使用“反向代理服务器”的优点是什么?")]),s._v(" "),a("p",[s._v("反向代理服务器可以隐藏源服务器的存在和特征。它充当互联网云和web服务器之间的中间层。这对于安全方面来说是很好的，特别是当您使用web托管服务时。")])])}),[],!1,null,null,null);a.default=n.exports}}]);