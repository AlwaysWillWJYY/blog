(window.webpackJsonp=window.webpackJsonp||[]).push([[67],{524:function(s,e,n){"use strict";n.r(e);var v=n(1),_=Object(v.a)({},(function(){var s=this,e=s._self._c;return e("ContentSlotsDistributor",{attrs:{"slot-key":s.$parent.slotKey}},[e("h3",{attrs:{id:"分布式session的解决方案"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#分布式session的解决方案"}},[s._v("#")]),s._v(" 分布式session的解决方案：")]),s._v(" "),e("p",[s._v("分布式部署出现的session问题：")]),s._v(" "),e("p",[s._v("当部署好分布式集群后，整个集群内会有多台服务器，假设有服务器AB")]),s._v(" "),e("p",[s._v("当浏览器向服务器发送第一次请求时，经过Nginx负载均衡，该请求到达服务器A，并在服务器A上保留一个一份session")]),s._v(" "),e("p",[s._v("而当下一次，浏览器再次访问服务器时，负载均衡之后，将该请求送达服务器B，此时服务器B上并没有该session，就会让用户重新登录。")]),s._v(" "),e("p",[e("strong",[s._v("解决方法：")])]),s._v(" "),e("p",[e("code",[s._v("1、粘性session，就是将浏览器和session绑定，浏览器每次访问的请求都会到达服务器A")])]),s._v(" "),e("p",[s._v("好处：简单，不用处理session\n坏处：如果服务器A发生故障，那么服务器A所存储的所有session都会失效")]),s._v(" "),e("p",[e("code",[s._v("2、服务器session复制")])]),s._v(" "),e("p",[s._v("集群中的每一台服务器上都复制其他所有服务器上的session，当有服务器上存储了新的session，就广播给其他服务器，在其他服务器上也存储下这份session。")]),s._v(" "),e("p",[s._v("好处：可容错，各个服务器上的session可以实时响应")]),s._v(" "),e("p",[s._v("坏处：会给网络造成大量的负担")]),s._v(" "),e("p",[e("code",[s._v("3、session持久化到数据库中")])]),s._v(" "),e("p",[s._v("将所有服务器的session都持久化到数据库中")]),s._v(" "),e("p",[s._v("优点：即使服务器崩溃，session数据也不会丢失")]),s._v(" "),e("p",[s._v("缺点：如果网站的访问量很大，容易给数据库造成很大的压力。")]),s._v(" "),e("p",[e("code",[s._v("4、使用两级缓存机制")])]),s._v(" "),e("p",[s._v("将服务器的session存储到数据库之后，在服务器与数据库之间设置Redis缓存，当服务器需要查找session时，先去数据库找，然后将数据同步到Redis缓存中，下一次再访问直接访问缓存即可")]),s._v(" "),e("p",[s._v("优点：持久化存储session，减缓数据库的压力。")])])}),[],!1,null,null,null);e.default=_.exports}}]);