(window.webpackJsonp=window.webpackJsonp||[]).push([[216],{675:function(t,a,s){"use strict";s.r(a);var v=s(1),_=Object(v.a)({},(function(){var t=this,a=t._self._c;return a("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[a("h3",{attrs:{id:"缓存穿透"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#缓存穿透"}},[t._v("#")]),t._v(" 缓存穿透")]),t._v(" "),a("p",[t._v("key对应的数据在数据库并不存在，每次针对key的请求从缓存中获取不到，请求都会到数据库中，从而可能压垮数据库。比如用一个不存在的用户ID获取用户信息，不论缓存还是数据库都没有，若黑客利用此漏洞进行攻击可能压垮数据库。")]),t._v(" "),a("p",[t._v("解决方法：")]),t._v(" "),a("p",[t._v("1）采用布隆过滤器，将所有可能存在的数据哈希到一个足够大的bitMap中，一个一定不存在的数据会被这个bitmap拦截，从而避免了对吸层数据库的查询压力；")]),t._v(" "),a("p",[t._v("2）如果一个查询返回的结果是空，我们仍然把这个空结果进行缓存，但是他的过期时间会很短。")]),t._v(" "),a("h3",{attrs:{id:"缓存击穿"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#缓存击穿"}},[t._v("#")]),t._v(" 缓存击穿")]),t._v(" "),a("p",[t._v("key对应的数据存在在数据库中，但是在Redis中过期，此时若有大量的并发请求过来，这些请求发现缓存过期一般都会从后端DB加载数据并回设到缓存，这个时候大并发额请求可能会瞬间使DB崩溃。（注意：缓存击穿是指一条数据过期时，有大量并发的请求请求查询该数据，导致的数据库崩溃；而缓存雪崩是指在某一瞬间，有大量的缓存数据同时过期，此时有大量的请求来访问这些数据，导致的数据库崩溃。）")]),t._v(" "),a("p",[t._v("解决方法：\n1、使用互斥锁，在缓存失效时，不允许所有线程同时请求消息。")]),t._v(" "),a("h3",{attrs:{id:"缓存雪崩"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#缓存雪崩"}},[t._v("#")]),t._v(" 缓存雪崩")]),t._v(" "),a("p",[t._v("当缓存服务器重启或者大量缓存集中在某一个时间段失效，这样在失效的时候，也会给后端系统(比如DB)带来很大压力")]),t._v(" "),a("p",[t._v("解决方法：")]),t._v(" "),a("p",[t._v("设置不同数据的失效时间进行错开，设置随机的失效时间。")])])}),[],!1,null,null,null);a.default=_.exports}}]);