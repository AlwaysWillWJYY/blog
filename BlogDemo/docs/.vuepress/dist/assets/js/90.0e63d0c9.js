(window.webpackJsonp=window.webpackJsonp||[]).push([[90],{550:function(t,a,s){"use strict";s.r(a);var r=s(1),_=Object(r.a)({},(function(){var t=this,a=t._self._c;return a("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[a("h3",{attrs:{id:"java读写锁实现原理"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#java读写锁实现原理"}},[t._v("#")]),t._v(" Java读写锁实现原理")]),t._v(" "),a("p",[t._v("需求：整个项目有一份config.json保存着项目的一些配置，是存储在本地文件的一个资源，并且应用中存在读写（读>>写）更新问题。既然读写并发操作，那么就涉及到操作互斥，所以准备使用读写锁完成。")]),t._v(" "),a("h3",{attrs:{id:"为什么要使用读写锁"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#为什么要使用读写锁"}},[t._v("#")]),t._v(" 为什么要使用读写锁？")]),t._v(" "),a("p",[t._v("与传统锁不同的是，读写锁的规则是可以共享读，但只能有一个写，总结为："),a("strong",[t._v("读与读不互斥，读与写互斥，写与写也互斥")]),t._v(";")]),t._v(" "),a("p",[t._v("而一般的独占锁为：读读互斥、读写互斥、写写也互斥，而实际使用场景中，"),a("code",[t._v("读是远大于写的")]),t._v("，所以使用一般锁，效率很低，读写锁就是为了进行读读共享时的优化。")]),t._v(" "),a("p",[t._v("注意是读远大于写，一般情况下独占锁的效率低于来源于高并发下对于临界区的激烈竞争，导致频繁的上下文切换。因此当并发不是很高的情况下，读写锁由于需要额外维护读锁的状态，可能还不如独占锁的效率高，所以要根据实际需求选择锁的使用。")]),t._v(" "),a("p",[a("strong",[t._v("高并发下，如果读取数据会发生频繁的上下文切换")]),t._v(":使用读写锁。")]),t._v(" "),a("h3",{attrs:{id:"手写一个简单的读写锁"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#手写一个简单的读写锁"}},[t._v("#")]),t._v(" 手写一个简单的读写锁")]),t._v(" "),a("p",[a("img",{attrs:{src:"https://img-blog.csdnimg.cn/45972da9df004402a243b32d40738a8b.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBAbGVlZGNvZGVKb2huMDE=,size_18,color_FFFFFF,t_70,g_se,x_16",alt:"在这里插入图片描述"}})])])}),[],!1,null,null,null);a.default=_.exports}}]);