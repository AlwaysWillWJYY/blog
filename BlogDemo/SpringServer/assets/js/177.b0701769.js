(window.webpackJsonp=window.webpackJsonp||[]).push([[177],{635:function(_,e,t){"use strict";t.r(e);var s=t(1),v=Object(s.a)({},(function(){var _=this,e=_._self._c;return e("ContentSlotsDistributor",{attrs:{"slot-key":_.$parent.slotKey}},[e("h3",{attrs:{id:"https和http的区别"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#https和http的区别"}},[_._v("#")]),_._v(" HTTPS和HTTP的区别？")]),_._v(" "),e("p",[e("code",[_._v("HTTP")]),_._v("是超文本传输协议：")]),_._v(" "),e("p",[_._v("1、基于请求/响应模式；")]),_._v(" "),e("p",[_._v("2、"),e("code",[_._v("http1.0")]),_._v("之前，"),e("code",[_._v("http")]),_._v("协议是无连接的，每一次连接只能处理一次请求响应；")]),_._v(" "),e("p",[_._v("3、"),e("code",[_._v("HTTP")]),_._v("是无状态的，是指对事务的处理没有记忆，后续如果需要处理之前的数据，必须要重传；")]),_._v(" "),e("p",[_._v("4、传输方式也是明文传输，是不安全的，且无法保证数据的完整性；")]),_._v(" "),e("p",[e("code",[_._v("HTTPS")]),_._v("是在"),e("code",[_._v("HTTP")]),_._v("的基础之上，增加了"),e("code",[_._v("SSL")]),_._v("加密过程，将传输过程中的数据进行加密，"),e("code",[_._v("HTTPS")]),_._v("是安全的传输。")]),_._v(" "),e("p",[_._v("可以保证数据的完整性，防止传输的内容被中间人冒充或篡改。")]),_._v(" "),e("p",[e("code",[_._v("SSL")]),_._v("过程：")]),_._v(" "),e("p",[_._v("1）"),e("code",[_._v("client_hello")]),_._v("：客户端向服务端发送一个明文请求，请求中携带了"),e("code",[_._v("SSL")]),_._v("的版本号，自己支持的加密算法，还有一个随机数"),e("code",[_._v("Random_C")]),_._v("；")]),_._v(" "),e("p",[_._v("2）"),e("code",[_._v("server_hello")]),_._v("：服务端收到客户端的消息之后，选择"),e("code",[_._v("SSL")]),_._v("版本号、从客户端支持的加密算法中选择一个加密算法，并生成一个随机数"),e("code",[_._v("Random_S")]),_._v("；并将自己的证书交给客户端；")]),_._v(" "),e("p",[_._v("3）客户端校验证书，证书对应的公钥b一般会被写死在操作系统中，客户端去操作系统找进行验证；")]),_._v(" "),e("p",[_._v("4）客户端验证证书通过后，会再次生成一个随机数"),e("code",[_._v("Pre-master")]),_._v("，并使用证书公钥加密，发送给服务器，此时客户端已经拥有所有加密所需的随机数："),e("code",[_._v("Random_C")]),_._v("、"),e("code",[_._v("Random_S")]),_._v("、"),e("code",[_._v("Pre_master")]),_._v("，此时客户端计算得到协商秘钥：")]),_._v(" "),e("p",[e("code",[_._v("enc_key = Fun(random_C,randm_S,pre_master)")]),_._v("。该"),e("code",[_._v("fun")]),_._v("为服务端和客户端商量好的加密算法；")]),_._v(" "),e("p",[_._v("5）服务端在接收到客户端使用公钥加密的"),e("code",[_._v("Pre_master")]),_._v("之后，使用私钥将其解密，并在服务端也计算出协商的"),e("code",[_._v("key")]),_._v("：")]),_._v(" "),e("p",[_._v("此时服务端也拥有"),e("code",[_._v("Random_C")]),_._v("、"),e("code",[_._v("Random_S")]),_._v("、"),e("code",[_._v("Pre_master")]),_._v("三个随机数：")]),_._v(" "),e("p",[e("code",[_._v("enc_key = Fun(random_C,random_S,pre_master)")]),_._v("；")]),_._v(" "),e("p",[_._v("6）开始使用协商秘钥和加密算法进行加密通信。")]),_._v(" "),e("p",[e("strong",[_._v("HTTPS")])]),_._v(" "),e("p",[e("img",{attrs:{src:"https://img-blog.csdnimg.cn/c6f07184d17e42af9534ec08eb8d07bc.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBAbGVlZGNvZGVKb2huMDE=,size_12,color_FFFFFF,t_70,g_se,x_16",alt:"在这里插入图片描述"}})]),_._v(" "),e("p",[e("strong",[_._v("对称加密")])]),_._v(" "),e("p",[e("img",{attrs:{src:"https://img-blog.csdnimg.cn/7901828bc9e34b0fbbab88228c4e2eee.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBAbGVlZGNvZGVKb2huMDE=,size_10,color_FFFFFF,t_70,g_se,x_16",alt:"在这里插入图片描述"}})]),_._v(" "),e("p",[e("img",{attrs:{src:"https://img-blog.csdnimg.cn/1ddfc7b7d1474ff4a7187f0b715af705.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBAbGVlZGNvZGVKb2huMDE=,size_13,color_FFFFFF,t_70,g_se,x_16",alt:"在这里插入图片描述"}})]),_._v(" "),e("p",[_._v("对称加密出现的问题：")]),_._v(" "),e("p",[_._v("服务端只会制定一个K，这样黑客也能拿到这个K，对数据进行解密，所以对称加密也不可；")]),_._v(" "),e("p",[e("strong",[_._v("非对称加密")])]),_._v(" "),e("p",[e("img",{attrs:{src:"https://img-blog.csdnimg.cn/4ec43546e50c429093343b91be6f4047.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBAbGVlZGNvZGVKb2huMDE=,size_17,color_FFFFFF,t_70,g_se,x_16",alt:"在这里插入图片描述"}})]),_._v(" "),e("p",[e("img",{attrs:{src:"https://img-blog.csdnimg.cn/f48af502799845b0b40c69b559dfb4de.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBAbGVlZGNvZGVKb2huMDE=,size_20,color_FFFFFF,t_70,g_se,x_16",alt:"在这里插入图片描述"}})]),_._v(" "),e("p",[_._v("非对称加密出现的问题：")]),_._v(" "),e("p",[_._v("服务端向客户端发送数据时，必须使用私钥加密（客户端没有私钥），客户端使用公钥解密,但是黑客也能获取公钥，对于服务端发送给客户端的Y'也能解密，所以不可取；")]),_._v(" "),e("p",[_._v("对称+非对称")]),_._v(" "),e("p",[_._v("先利用非对称加密的方式在客户端和服务端之间协商出一个key，再使用该Key进行对称加密，传输数据")]),_._v(" "),e("p",[_._v("这样一来，客户端和服务端的key是他两共有的，协商好的，别人无法窃取")]),_._v(" "),e("p",[e("img",{attrs:{src:"https://img-blog.csdnimg.cn/7efbef26649b4bcfb8ab994df95d4107.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBAbGVlZGNvZGVKb2huMDE=,size_20,color_FFFFFF,t_70,g_se,x_16",alt:"在这里插入图片描述"}})]),_._v(" "),e("p",[_._v("存在的问题：中间人问题")]),_._v(" "),e("p",[e("img",{attrs:{src:"https://img-blog.csdnimg.cn/c490d2b9a2dc4692bef6f9d398facfee.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBAbGVlZGNvZGVKb2huMDE=,size_18,color_FFFFFF,t_70,g_se,x_16",alt:"在这里插入图片描述"}})]),_._v(" "),e("p",[_._v("如何解决中间人问题：")]),_._v(" "),e("p",[e("img",{attrs:{src:"https://img-blog.csdnimg.cn/3cd1652345a2498489b07fb9e113711c.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBAbGVlZGNvZGVKb2huMDE=,size_15,color_FFFFFF,t_70,g_se,x_16",alt:"在这里插入图片描述"}})]),_._v(" "),e("p",[e("img",{attrs:{src:"https://img-blog.csdnimg.cn/7e99ff609af34c0596044a4278145bfe.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBAbGVlZGNvZGVKb2huMDE=,size_20,color_FFFFFF,t_70,g_se,x_16",alt:"在这里插入图片描述"}})]),_._v(" "),e("p",[e("img",{attrs:{src:"https://img-blog.csdnimg.cn/b9d1e349aeab466c899866f004ad18c9.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBAbGVlZGNvZGVKb2huMDE=,size_20,color_FFFFFF,t_70,g_se,x_16",alt:"在这里插入图片描述"}})]),_._v(" "),e("p",[e("strong",[_._v("对称加密+非对称加密+CA机构的安全认证，解决了中间人问题")])]),_._v(" "),e("p",[_._v("详细讲解协商的过程:")]),_._v(" "),e("p",[e("img",{attrs:{src:"https://img-blog.csdnimg.cn/e6bdca9a801b4a6c80043eccd63b66fc.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBAbGVlZGNvZGVKb2huMDE=,size_20,color_FFFFFF,t_70,g_se,x_16",alt:"在这里插入图片描述"}})]),_._v(" "),e("p",[e("code",[_._v("HTTPS")]),_._v("：使用了")]),_._v(" "),e("p",[_._v("对称加密+非对称加密+"),e("code",[_._v("hash")]),_._v("散列（"),e("code",[_._v("md5")]),_._v("算法)+"),e("code",[_._v("CA")]),_._v("认证")])])}),[],!1,null,null,null);e.default=v.exports}}]);