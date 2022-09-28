(window.webpackJsonp=window.webpackJsonp||[]).push([[178],{637:function(v,_,e){"use strict";e.r(_);var o=e(1),d=Object(o.a)({},(function(){var v=this,_=v._self._c;return _("ContentSlotsDistributor",{attrs:{"slot-key":v.$parent.slotKey}},[_("h3",{attrs:{id:"http1-0、1-1和2-0的区别"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#http1-0、1-1和2-0的区别"}},[v._v("#")]),v._v(" HTTP1.0、1.1和2.0的区别？")]),v._v(" "),_("p",[_("code",[v._v("HTTP1.0")]),v._v("和"),_("code",[v._v("HTTP1.1")]),v._v("的区别：")]),v._v(" "),_("p",[v._v("1、长连接：")]),v._v(" "),_("p",[_("code",[v._v("HTTP1.0")]),v._v("的时候需要通过设置参数"),_("code",[v._v("keep-alive")]),v._v("参数来告知服务器端需要建立一个长连接，而"),_("code",[v._v("HTTP1.1")]),v._v("开始，默认就是建立长连接。")]),v._v(" "),_("p",[_("code",[v._v("HTTP")]),v._v("是建立在"),_("code",[v._v("TCP/IP")]),v._v("协议的基础上的，在进行传输时需要进行"),_("code",[v._v("TCP")]),v._v("的三次握手连接，建立连接的过程会造成不必要的开销，所以维持一个长连接可以发送多个请求。")]),v._v(" "),_("p",[v._v("2、节约带宽")]),v._v(" "),_("p",[_("code",[v._v("HTTP1.1")]),v._v("之后允许只发送"),_("code",[v._v("header")]),v._v("请求而不发送请求体"),_("code",[v._v("body")]),v._v("，如果服务器端判定客户端有请求的服务器的权限，则返回100，否则返回401。客户端如果接收到100，才会把请求的"),_("code",[v._v("body")]),v._v("发送给服务器。")]),v._v(" "),_("p",[v._v("这样如果客户端没有访问服务器端的权限，就不用给服务器端发送"),_("code",[v._v("body")]),v._v("了，非常节约带宽。")]),v._v(" "),_("p",[v._v("3、"),_("code",[v._v("host")]),v._v("域")]),v._v(" "),_("p",[_("code",[v._v("HTTP1.0")]),v._v("没有"),_("code",[v._v("host")]),v._v("域这个参数，但是"),_("code",[v._v("HTTP1.1")]),v._v("之后客户端发送请求必须带"),_("code",[v._v("host")]),v._v("域. 服务器上的多个虚拟站点可以共享同一个"),_("code",[v._v("IP")]),v._v("地址和端口。")]),v._v(" "),_("h3",{attrs:{id:"http1-1和http2-0的区别"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#http1-1和http2-0的区别"}},[v._v("#")]),v._v(" HTTP1.1和HTTP2.0的区别？")]),v._v(" "),_("p",[v._v("1、多路复用")]),v._v(" "),_("p",[v._v("允许通过单一的"),_("code",[v._v("HTTP2.0")]),v._v("请求发起多重的请求-响应消息；")]),v._v(" "),_("p",[_("code",[v._v("HTTP2.0")]),v._v("使用了多路复用技术，做到同一个连接并发处理多个请求，而且并发量要比"),_("code",[v._v("HTTP1.1")]),v._v("大好几个数量级；")]),v._v(" "),_("p",[v._v("2、二进制分帧")]),v._v(" "),_("p",[_("code",[v._v("HTTP2.0")]),v._v("在应用层（"),_("code",[v._v("HTTP2.0")]),v._v("）和传输层（"),_("code",[v._v("TCP/UDP")]),v._v("）之间增加了一个二进制分帧层；在二进制分帧层上，"),_("code",[v._v("HTTP 2.0")]),v._v(" 会将所有传输的信息分割为更小的消息和帧,并对它们采用二进制格式的编码 ，其中"),_("code",[v._v("HTTP1.x")]),v._v("的首部信息会被封装到"),_("code",[v._v("Headers")]),v._v("帧，而我们的"),_("code",[v._v("request body")]),v._v("则封装到"),_("code",[v._v("Data")]),v._v("帧里面。")]),v._v(" "),_("p",[v._v("然后，"),_("code",[v._v("HTTP 2.0")]),v._v(" 通信都在一个连接上完成，这个连接可以承载任意数量的双向数据流。相应地，每个数据流以消息的形式发送，而消息由一或多个帧组成，这些帧可以乱序发送，然后再根据每个帧首部的流标识符重新组装。")]),v._v(" "),_("p",[v._v("3、首部压缩")]),v._v(" "),_("p",[_("code",[v._v("HTTP1.1")]),v._v("不支持"),_("code",[v._v("header")]),v._v("数据的压缩，"),_("code",[v._v("HTTP2.0")]),v._v("使用"),_("code",[v._v("HPACK")]),v._v("算法对"),_("code",[v._v("header")]),v._v("的数据进行压缩，这样数据体积小了，在网络上传输的速率更快了；")]),v._v(" "),_("p",[v._v("4、服务器推送")]),v._v(" "),_("p",[_("code",[v._v("HTTP2.0")]),v._v("中，服务器可以对客户端的一个请求发送多个响应。")])])}),[],!1,null,null,null);_.default=d.exports}}]);