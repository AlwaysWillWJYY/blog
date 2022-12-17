(window.webpackJsonp=window.webpackJsonp||[]).push([[198],{656:function(_,v,e){"use strict";e.r(v);var o=e(1),c=Object(o.a)({},(function(){var _=this,v=_._self._c;return v("ContentSlotsDistributor",{attrs:{"slot-key":_.$parent.slotKey}},[v("h3",{attrs:{id:"tcp三次握手-四次挥手"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#tcp三次握手-四次挥手"}},[_._v("#")]),_._v(" TCP三次握手，四次挥手?")]),_._v(" "),v("p",[v("code",[_._v("TCP")]),_._v("的三次握手：")]),_._v(" "),v("p",[_._v("首先客户端向服务器发送一个建立连接的请求，请求的"),v("code",[_._v("SYN")]),_._v("位为1，表示是一个建立连接的请求，"),v("code",[_._v("ACK")]),_._v("位为0，表示确认号无效；")]),_._v(" "),v("p",[_._v("服务器收到客户端的请求之后，也会向客户端发送一个请求，"),v("code",[_._v("SYN")]),_._v("位为1，表示是建立连接的请求，请求的"),v("code",[_._v("ACK")]),_._v("为也为1，表明此时的确认号是有效的；")]),_._v(" "),v("p",[_._v("客户端接收到服务器端发送来的请求之后，客户端会再向服务器端发送一个请求，此时请求的"),v("code",[_._v("ACK")]),_._v("位也为1，连接建立完毕。")]),_._v(" "),v("p",[v("code",[_._v("TCP")]),_._v("为什么要有第三次握手？")]),_._v(" "),v("p",[_._v("防止已经失效的连接又重新传到了服务器端，造成错误。")]),_._v(" "),v("p",[_._v("比如客户端在向服务端发送建立连接的请求，但是该请求并未达到服务器端,此时客户端重新发送了一个建立连接的请求，此时该请求被服务器端接收到了，服务器端向客户端发送确认建立连接的请求，如果只有两次握手，此时客户端和服务器端就会认为连接已经建立，开始进行数据的传输,但此时客户端之前发送给服务器端的建立连接的请求又突然到达服务器端了，此时就会出现错误。")]),_._v(" "),v("p",[v("code",[_._v("TCP")]),_._v("的四次挥手？")]),_._v(" "),v("p",[_._v("第一次挥手，客户端向服务端发送一个"),v("code",[_._v("FIN")]),_._v("，用来关闭从客户端到服务器的数据传送，然后客户端进入"),v("code",[_._v("FIN_WAIT_1")]),_._v("状态；")]),_._v(" "),v("p",[_._v("第二次挥手，服务器接收到"),v("code",[_._v("FIN")]),_._v("后，向客户端发送一个"),v("code",[_._v("ACK")]),_._v("，服务器进入"),v("code",[_._v("CLOSE_WAIT")]),_._v("状态，客户端接收到"),v("code",[_._v("ACK")]),_._v("之后进入到"),v("code",[_._v("FIN_WAIT_2")]),_._v("状态；")]),_._v(" "),v("p",[_._v("第三次挥手，服务器发送一个"),v("code",[_._v("FIN")]),_._v("，用来关闭从服务器到客户端的数据传送，服务器进入"),v("code",[_._v("LAST_ACK")]),_._v("状态；")]),_._v(" "),v("p",[_._v("第四次挥手，客户端接收到"),v("code",[_._v("FIN")]),_._v("之后，客户端进入"),v("code",[_._v("TIME_WAIT")]),_._v("状态，发送"),v("code",[_._v("ACK")]),_._v("给服务器端，服务器端进入"),v("code",[_._v("CLOSED")]),_._v("状态，完成四次握手。")]),_._v(" "),v("p",[_._v("如果只有三次挥手，那么在第三次挥手的时候如果服务器端发送给客户端的确认断开连接的数据包丢失，那么客户端就会一直等待服务器端再次发送断开连接的确认，但此时服务器端已经关闭了。")]),_._v(" "),v("p",[_._v("为什么客户端要有"),v("code",[_._v("TIME_WAIT")]),_._v("状态，且时间为"),v("code",[_._v("2MSL")]),_._v("，因为最后一次客户端给服务器端发送"),v("code",[_._v("ACK")]),_._v("时，如果服务器端没有接收到，会再给客户端发送"),v("code",[_._v("FIN")]),_._v("，如果此时客户端已经关闭了，那么服务器端将永远无法关闭了")]),_._v(" "),v("p",[_._v("等待"),v("code",[_._v("2MSL")]),_._v("就是为了确认服务器端已经接收到客户端最后一次挥手的"),v("code",[_._v("ACK")]),_._v("。")]),_._v(" "),v("p",[v("strong",[_._v("MSL是Maximum Segment LifeTime：报文最大生存时间，他是任何报文在网络上存在的最长时间，超过这个时间报文将被丢弃。因为tcp报文（segment）是ip数据报（datagram）的数据部分，具体称谓请参见《数据在网络各层中的称呼》一文，而ip头中有一个TTL域，TTL是time to live的缩写，中文可以译为“生存时间”，这个生存时间是由源主机设置初始值但不是存的具体时间，而是存储了一个ip数据报可以经过的最大路由数，每经过一个处理他的路由器此值就减1，当此值为0则数据报将被丢弃，同时发送ICMP报文通知源主机。RFC 793中规定MSL为2分钟，实际应用中常用的是30秒，1分钟和2分钟等。")])]),_._v(" "),v("p",[v("strong",[_._v("2MSL即两倍的MSL，TCP的TIME_WAIT状态也称为2MSL等待状态，当TCP的一端发起主动关闭，在发出最后一个ACK包后，即第3次握手完成后发送了第四次握手的ACK包后就进入了TIME_WAIT状态，必须在此状态上停留两倍的MSL时间，等待2MSL时间主要目的是怕最后一个ACK包对方没收到，那么对方在超时后将重发第三次握手的FIN包，主动关闭端接到重发的FIN包后可以再发一个ACK应答包。在TIME_WAIT状态时两端的端口不能使用，要等到2MSL时间结束才可继续使用。当连接处于2MSL等待阶段时任何迟到的报文段都将被丢弃。不过在实际应用中可以通过设置SO_REUSEADDR选项达到不必等待2MSL时间结束再使用此端口")])])])}),[],!1,null,null,null);v.default=c.exports}}]);