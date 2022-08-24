(window.webpackJsonp=window.webpackJsonp||[]).push([[111],{516:function(_,v,t){"use strict";t.r(v);var e=t(2),s=Object(e.a)({},(function(){var _=this,v=_._self._c;return v("ContentSlotsDistributor",{attrs:{"slot-key":_.$parent.slotKey}},[v("h2",{attrs:{id:"计算机网络概述"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#计算机网络概述"}},[_._v("#")]),_._v(" 计算机网络概述")]),_._v(" "),v("h3",{attrs:{id:"osi与tcp-ip各层结构与功能-都有哪些协议"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#osi与tcp-ip各层结构与功能-都有哪些协议"}},[_._v("#")]),_._v(" OSI与TCP/IP各层结构与功能，都有哪些协议？")]),_._v(" "),v("p",[_._v("应用层：为所有需要网络的应用提供服务：应用层最常用的协议是HTTP协议")]),_._v(" "),v("p",[_._v("表现层：将应用层需要传输的数据进行编码，解码等操作")]),_._v(" "),v("p",[_._v("传输层：将应用层传输来的数据进行分片，添加TCP首部，首部中封装了通信的IP地址和目标端口号，传输层实现了网络通信中进程与进程上的逻辑连接；传输实现的是可靠传输（"),v("code",[_._v("TCP")]),_._v("）和"),v("code",[_._v("UDP")]),_._v("（不可靠）")]),_._v(" "),v("p",[_._v("网络层：将传输层传来的数据，添加"),v("code",[_._v("IP")]),_._v("首部，网络层的"),v("code",[_._v("IP")]),_._v("协议是用来进行路由的，网络层实现了主机与主机之间的逻辑连接；（"),v("code",[_._v("IP")]),_._v("协议）")]),_._v(" "),v("p",[_._v("网络接口层：规定了网络通信中一系列物理接口的标准。")]),_._v(" "),v("p",[v("code",[_._v("OSI")]),_._v("七层模型")]),_._v(" "),v("p",[v("img",{attrs:{src:"https://img-blog.csdnimg.cn/ee3d72bd5b274ecc8d5dc3f2d616f1e4.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBAbGVlZGNvZGVKb2huMDE=,size_19,color_FFFFFF,t_70,g_se,x_16",alt:"在这里插入图片描述"}})]),_._v(" "),v("h3",{attrs:{id:"_1-1局域网"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#_1-1局域网"}},[_._v("#")]),_._v(" 1.1局域网")]),_._v(" "),v("p",[_._v("特点：覆盖范围小，自己花钱买设备，带宽固定（根据交换机而定），自己维护")]),_._v(" "),v("h3",{attrs:{id:"_1-2-internet"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#_1-2-internet"}},[_._v("#")]),_._v(" 1.2 Internet")]),_._v(" "),v("p",[v("code",[_._v("Internet")]),_._v("由许多"),v("code",[_._v("ISP")]),_._v("组成\n"),v("code",[_._v("ISP")]),_._v("：（"),v("code",[_._v("Internet Service Provider")]),_._v("）互联网服务提供商")]),_._v(" "),v("h3",{attrs:{id:"_1-3广域网"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#_1-3广域网"}},[_._v("#")]),_._v(" 1.3广域网")]),_._v(" "),v("p",[_._v("距离较远，超过100m，花钱租宽带，链路也不是自己维护。")]),_._v(" "),v("p",[v("code",[_._v("ADSL")]),_._v("拨号上网："),v("code",[_._v("ADSL")]),_._v("拨号上网的意思指的是通过拨打"),v("code",[_._v("ISP")]),_._v("的接入号连接到"),v("code",[_._v("Internet")]),_._v("上。")]),_._v(" "),v("p",[_._v("光纤接入的方式也是广域网。")]),_._v(" "),v("h3",{attrs:{id:"_1-4计算机数据通信过程"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#_1-4计算机数据通信过程"}},[_._v("#")]),_._v(" 1.4计算机数据通信过程")]),_._v(" "),v("p",[v("img",{attrs:{src:"https://img-blog.csdnimg.cn/8a1626565f65461ba69c9845c35749ac.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBAbGVlZGNvZGVKb2huMDE=,size_14,color_FFFFFF,t_70,g_se,x_16",alt:"在这里插入图片描述"}})]),_._v(" "),v("p",[v("img",{attrs:{src:"https://img-blog.csdnimg.cn/bb485de72d464bc7960b7fb500e291a6.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBAbGVlZGNvZGVKb2huMDE=,size_14,color_FFFFFF,t_70,g_se,x_16",alt:"在这里插入图片描述"}})]),_._v(" "),v("h3",{attrs:{id:"_1-5osi参考模型"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#_1-5osi参考模型"}},[_._v("#")]),_._v(" 1.5"),v("code",[_._v("OSI")]),_._v("参考模型")]),_._v(" "),v("ul",[v("li",[v("p",[_._v("应用层 所有能产生网络流量的程序（qq、淘宝等，而记事本等不算，因为不需要网络）")])]),_._v(" "),v("li",[v("p",[_._v("表示层 在进行传输之前，有些文件需要进行处理，加密，压缩等操作。【比如qq聊天的内容需要加密，才能发送】图片等会以二进制传输，英文文档以"),v("code",[_._v("ASCLL")]),_._v("码进行传输，在客户端需要进行合理的编码解码才能正确显示内容")])]),_._v(" "),v("li",[v("p",[_._v("会话层 查木马"),v("code",[_._v("netstat -n")]),_._v("（指令）（会话：每次打开不同的网站，建立不同的会话，这样不会导致服务器传输过来的数据出现混乱）。")])])]),_._v(" "),v("p",[_._v("查看会话：在cmd窗口中输入:netstat -n")]),_._v(" "),v("p",[v("strong",[_._v("通过查看会话，查看计算机是否有木马，木马程序没有对话框，但是木马需要与外界进行会话，可以查看")])]),_._v(" "),v("ul",[v("li",[_._v("传输层 可靠传输（"),v("code",[_._v("tcp")]),_._v("） 流量控制 不可靠传输（"),v("code",[_._v("udp")]),_._v("）")])]),_._v(" "),v("p",[v("strong",[_._v("可靠传输：在传输过程中，如果客户端始终不给服务器端收到数据的消息，则服务器端会重复的发送该数据，直到客户端有回应为止")]),_._v("。")]),_._v(" "),v("p",[_._v("流量控制：传输层可以控制数据传输的快慢。")]),_._v(" "),v("p",[_._v("不可靠传输：比如在利用"),v("code",[_._v("DNS")]),_._v("获取域名对应的"),v("code",[_._v("ip")]),_._v("地址时，客户端发送一个数据包询问域名对应的"),v("code",[_._v("ip")]),_._v("，"),v("code",[_._v("DNS")]),_._v("端回应一个数据包即可说清楚问题，此时不需要建立会话。（这类通讯是不可靠传输）")]),_._v(" "),v("p",[_._v("还有一种不可靠传输：比如qq的聊天记录，都是通过一个数据包进行传输。")]),_._v(" "),v("ul",[v("li",[v("p",[_._v("网络层 负责选择最佳路径 规划ip地址")])]),_._v(" "),v("li",[v("p",[_._v("数据链路层 定义了帧的开始和结束 实现透明传输 差错校验")])]),_._v(" "),v("li",[v("p",[_._v("物理层 定义了网络设备的接口标准 电器标准 如何在数据链路层传输更快的速度")])])])])}),[],!1,null,null,null);v.default=s.exports}}]);