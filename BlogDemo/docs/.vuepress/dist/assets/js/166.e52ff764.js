(window.webpackJsonp=window.webpackJsonp||[]).push([[166],{626:function(_,v,t){"use strict";t.r(v);var s=t(1),e=Object(s.a)({},(function(){var _=this,v=_._self._c;return v("ContentSlotsDistributor",{attrs:{"slot-key":_.$parent.slotKey}},[v("h3",{attrs:{id:"tcp-udp协议的区别"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#tcp-udp协议的区别"}},[_._v("#")]),_._v(" TCP/UDP协议的区别")]),_._v(" "),v("p",[v("code",[_._v("TCP")]),_._v("的优点：")]),_._v(" "),v("p",[_._v("可靠、稳定，TCP的可靠体现在传递数据之前，会有三次握手来建立连接，而且在数据传递时，有确认、窗口、重传、拥塞控制机制，在数据传完后，还会断开连接来节约系统资源（四次挥手）。")]),_._v(" "),v("p",[v("code",[_._v("TCP")]),_._v("的缺点：")]),_._v(" "),v("p",[_._v("慢、效率低，占用系统资源高，易被攻击，"),v("code",[_._v("TCP")]),_._v("在传递数据之前，要先建立连接，这会消耗时间，而且在数据传递时，确认机制、重传机制、拥塞控制机制等都会消耗大量的时间。而且要在每台设备上维护所有的传输连接，事实上，每个连接都会占用系统的"),v("code",[_._v("CPU")]),_._v("、内存等硬件资源。而且，因为TCP有确认机制，三次握手机制，这些也容易导致"),v("code",[_._v("TCP")]),_._v("被人利用，实现DOS、DDOS、CC等攻击。")]),_._v(" "),v("p",[v("code",[_._v("UDP")]),_._v("的优点:")]),_._v(" "),v("p",[_._v("快、比TCP稍安全，UDP没有TCP的握手、确认、窗口、重传、拥塞控制等机制，UDP是一个无状态的传输协议，所以它在传输数据时非常快。")]),_._v(" "),v("p",[v("code",[_._v("UDP")]),_._v("的缺点：")]),_._v(" "),v("p",[_._v("不可靠、不稳定、因为UDP没有TCP那些可靠的机制，在数据传递时，如果网络质量不好，就很容易丢包。")]),_._v(" "),v("p",[_._v("总结：")]),_._v(" "),v("ol",[v("li",[_._v("TCP是基于连接的有状态的网络传输协议，效率较低，比较可靠稳定，能保证数据的正确性；")])]),_._v(" "),v("p",[_._v("TCP有三次握手、四次挥手等建立连接和释放连接的过程，容易导致针对TCP的攻击；")]),_._v(" "),v("p",[_._v("TCP对系统资源要求较多；")]),_._v(" "),v("p",[_._v("TCP是面向流模式的，即是TCP协议可以应用层传来的报文进行拆分，传递后还可以合并；")]),_._v(" "),v("p",[_._v("适用于对网络通讯的质量要求较高，数据传输要求精准无误的场景：传输文件")]),_._v(" "),v("ol",{attrs:{start:"2"}},[v("li",[_._v("UDP是基于无连接的无状态的网络传输协议，效率较高，安全性较高，但是可靠性较低，网络质量差时，可能会导致丢包；")])]),_._v(" "),v("p",[_._v("UDP协议对系统资源的要求较少，且UDP的程序结构较为简单；")]),_._v(" "),v("p",[_._v("UDP是面向数据报的，不能够灵活的控制读写数据的次数和数量，应用层交给UDP多长的报文, UDP原样发送, 既不会拆分, 也不会合并；")]),_._v(" "),v("p",[_._v("适用于对网络质量要求不高，但是对网络通讯速度要尽可能块的场景：QQ语音、QQ视频等")]),_._v(" "),v("h3",{attrs:{id:"三次握手-四次挥手"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#三次握手-四次挥手"}},[_._v("#")]),_._v(" 三次握手/四次挥手")]),_._v(" "),v("p",[_._v("序号和确认号详解：")]),_._v(" "),v("p",[_._v("序号是发送端给接收端发送的数据的首字节占要发送数据的总字节里的位置；")]),_._v(" "),v("p",[_._v("确认号是发送端告诉接收端给发送端发送数据时要从哪开始发；")]),_._v(" "),v("p",[v("img",{attrs:{src:"https://img-blog.csdnimg.cn/a19eb906e51947ce8c15235333c22535.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBAbGVlZGNvZGVKb2huMDE=,size_13,color_FFFFFF,t_70,g_se,x_16",alt:"在这里插入图片描述"}})]),_._v(" "),v("p",[_._v("标记位0/1")]),_._v(" "),v("p",[v("img",{attrs:{src:"https://img-blog.csdnimg.cn/6fcb6ad03f9044ae877be25d64d39ea7.png",alt:"在这里插入图片描述"}})]),_._v(" "),v("p",[_._v("TCP的连接建立（三次握手）")]),_._v(" "),v("p",[v("img",{attrs:{src:"https://img-blog.csdnimg.cn/9eba3e68a1b54128a0a5b1e43b49653e.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBAbGVlZGNvZGVKb2huMDE=,size_18,color_FFFFFF,t_70,g_se,x_16",alt:"在这里插入图片描述"}})]),_._v(" "),v("p",[_._v("TCP用三次握手建立TCP连接的各状态")]),_._v(" "),v("p",[v("img",{attrs:{src:"https://img-blog.csdnimg.cn/cb5d70ba93b642ed99b12c03944fc57d.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBAbGVlZGNvZGVKb2huMDE=,size_13,color_FFFFFF,t_70,g_se,x_16",alt:"在这里插入图片描述"}})]),_._v(" "),v("p",[_._v("TCP的连接释放（四次挥手）")]),_._v(" "),v("p",[v("img",{attrs:{src:"https://img-blog.csdnimg.cn/570b2e37b69a4486b854089ad672651d.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBAbGVlZGNvZGVKb2huMDE=,size_10,color_FFFFFF,t_70,g_se,x_16",alt:"在这里插入图片描述"}})]),_._v(" "),v("p",[v("img",{attrs:{src:"https://img-blog.csdnimg.cn/c2d39cadb57040a48daead2bb8c844ff.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBAbGVlZGNvZGVKb2huMDE=,size_13,color_FFFFFF,t_70,g_se,x_16",alt:"在这里插入图片描述"}})]),_._v(" "),v("p",[_._v("TCP的11种状态")]),_._v(" "),v("p",[v("img",{attrs:{src:"https://img-blog.csdnimg.cn/5f630d6402654e80b18e7960054f5b1d.png",alt:"在这里插入图片描述"}})]),_._v(" "),v("p",[v("strong",[_._v("客户端TCP状态迁移：")])]),_._v(" "),v("p",[v("code",[_._v("CLOSED->SYN_SENT->ESTABLISHED->FIN_WAIT_1->FIN_WAIT_2->TIME_WAIT->CLOSED")])]),_._v(" "),v("p",[v("strong",[_._v("服务器TCP状态迁移：")])]),_._v(" "),v("p",[v("code",[_._v("CLOSED->LISTEN->SYN收到->ESTABLISHED->CLOSE_WAIT->LAST_ACK_CLOSED")])]),_._v(" "),v("p",[_._v("11种状态：")]),_._v(" "),v("p",[v("code",[_._v("LISTEN")]),_._v("-侦听来自远方TCP端口的连接请求；")]),_._v(" "),v("p",[v("code",[_._v("SYN-SENT")]),_._v("-在发送连接请求后等待匹配的连接请求；")]),_._v(" "),v("p",[v("code",[_._v("SYN-RECEIVED")]),_._v("-在收到和发送一个连接请求后等待对连接请求的确认；")]),_._v(" "),v("p",[v("code",[_._v("ESTABLISHED")]),_._v("-代表一个打开的连接，数据可以传送给用户；")]),_._v(" "),v("p",[v("code",[_._v("FIN-WAIT-1")]),_._v("-等待远程TCP的连接中断请求，或先前的连接中断请求的确认；")]),_._v(" "),v("p",[v("code",[_._v("FIN-WAIT-2")]),_._v("-从远程TCP等待连接中断请求；")]),_._v(" "),v("p",[v("code",[_._v("CLOSE-WAIT")]),_._v("-等待从本地用户发来的连接中断请求；")]),_._v(" "),v("p",[v("code",[_._v("CLOSING")]),_._v("-等待远程TCP对连接中断的确认")]),_._v(" "),v("p",[_._v("这种状态比较特殊，属于一种罕见的例外状态。正常情况下，当你发送FIN报文后，按理说应该是先收到（或者同时收到）对方的ACK报文，再收到对方的FIN报文。但是CLOSING状态表示你发送FIN报文后，并没有收到对方的ACK报文，反而却也收到了对方的FIN报文。什么时候会出现这种情况呢？那就是双方几乎同时close一个SOCKET的话，就会出现同时发送FIN报文的情况，也即会出现CLOSING状态，表示双方都正在关闭SOCKET连接。")]),_._v(" "),v("p",[v("code",[_._v("LAST-ACK")]),_._v("-等待原来发向远程TCP的连接中断请求的确认；")]),_._v(" "),v("p",[v("code",[_._v("TIME-WAIT")]),_._v("-等待足够的时间以确保远程TCP接收到连接中断请求的确认；")]),_._v(" "),v("p",[v("code",[_._v("CLOSED")]),_._v("-没有任何连接状态")])])}),[],!1,null,null,null);v.default=e.exports}}]);