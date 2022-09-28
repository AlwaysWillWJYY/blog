(window.webpackJsonp=window.webpackJsonp||[]).push([[172],{630:function(_,v,o){"use strict";o.r(v);var c=o(1),e=Object(c.a)({},(function(){var _=this,v=_._self._c;return v("ContentSlotsDistributor",{attrs:{"slot-key":_.$parent.slotKey}},[v("h3",{attrs:{id:"dns解析过程"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#dns解析过程"}},[_._v("#")]),_._v(" DNS解析过程")]),_._v(" "),v("p",[v("img",{attrs:{src:"https://img-blog.csdnimg.cn/74cac88facd1489aaa7cc8ba0b1be5c6.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBAbGVlZGNvZGVKb2huMDE=,size_19,color_FFFFFF,t_70,g_se,x_16",alt:"在这里插入图片描述"}})]),_._v(" "),v("p",[v("strong",[_._v("根域名服务器: 最高层次的域名服务器，也是最重要的域名服务器")]),_._v("。所有的根域名服务器都知道所有的顶级域名服务器的域名和"),v("code",[_._v("IP")]),_._v("地址。不管是哪一个本地域名服务器，若要对因特网上任何一个域名进行解析，只要自己无法解析，就首先求助根域名服务器。所以根域名服务器是最重要的域名服务器。假定所有的根域名服务器都瘫痪了，那么整个"),v("code",[_._v("DNS")]),_._v("系统就无法工作。需要注意的是，"),v("strong",[_._v("在很多情况下，根域名服务器并不直接把待查询的域名直接解析出"),v("code",[_._v("IP")]),_._v("地址，而是告诉本地域名服务器下一步应当找哪一个顶级域名服务器进查询")]),_._v("。")]),_._v(" "),v("p",[_._v("全球一共有13台根域名服务器，其中10台分布在美国，剩余三台在英国，瑞典和日本。")]),_._v(" "),v("p",[_._v("顶级域名服务器：负责管理在该顶级域名服务器注册的二级域名。")]),_._v(" "),v("p",[_._v("权限域名服务器：负责一个“区”的域名服务器。")]),_._v(" "),v("p",[_._v("本地域名服务器：本地服务器不属于下图的域名服务器的层次结构，但是它对域名系统非常重要。当一个主机发出"),v("code",[_._v("DNS")]),_._v("查询请求时，这个查询请求报文就发送给本地域名服务器。")]),_._v(" "),v("p",[v("strong",[_._v("域名解析过程")])]),_._v(" "),v("p",[_._v("那么我们的"),v("code",[_._v("DNS")]),_._v("是怎么解析一个域名的呢？")]),_._v(" "),v("p",[_._v("1.现在我有一台计算机，通过"),v("code",[_._v("ISP")]),_._v("接入了互联网，那么"),v("code",[_._v("ISP")]),_._v("就会给我分配一个"),v("code",[_._v("DNS")]),_._v("服务器，这个"),v("code",[_._v("DNS")]),_._v("服务器不是权威服务器，而是相当于一个代理的"),v("code",[_._v("dns")]),_._v("解析服务器，他会帮你迭代权威服务器返回的应答，然后把最终查到"),v("code",[_._v("IP")]),_._v("返回给你。")]),_._v(" "),v("p",[_._v("2.现在的我计算机要向这台"),v("code",[_._v("ISPDNS")]),_._v("发起请求查询"),v("code",[_._v("www.baidu.com")]),_._v("这个域名了，(经网友提醒：这里其实准确来说不是"),v("code",[_._v("ISPDNS")]),_._v("，而应该是用户自己电脑网络设置里的"),v("code",[_._v("DNS")]),_._v("，并不一定是"),v("code",[_._v("ISPDNS")]),_._v("。比如也有可能你手工设置了"),v("code",[_._v("8.8.8.8")]),_._v(")")]),_._v(" "),v("p",[_._v("3."),v("code",[_._v("ISPDNS")]),_._v("拿到请求后，先检查一下自己的缓存中有没有这个地址，有的话就直接返回。这个时候拿到的"),v("code",[_._v("ip")]),_._v("地址，会被标记为非权威服务器的应答。")]),_._v(" "),v("p",[_._v("4.如果缓存中没有的话，"),v("code",[_._v("ISPDNS")]),_._v("会从配置文件里面读取13个根域名服务器的地址（这些地址是不变的，直接在"),v("code",[_._v("BIND")]),_._v("的配置文件中），")]),_._v(" "),v("p",[_._v("5.然后向其中一台发起请求。")]),_._v(" "),v("p",[_._v("6.根服务器拿到这个请求后，知道他是"),v("code",[_._v("com.")]),_._v("这个顶级域名下的，所以就会返回"),v("code",[_._v("com")]),_._v("域中的"),v("code",[_._v("DNS")]),_._v("记录，一般来说是13台主机名和"),v("code",[_._v("IP")]),_._v("。")]),_._v(" "),v("p",[_._v("7.然后"),v("code",[_._v("ISPDNS")]),_._v("向其中一台再次发起请求，"),v("code",[_._v("com")]),_._v("域的服务器发现你这请求是"),v("code",[_._v("baidu.com")]),_._v("这个域的，我一查发现了这个域的DNS，那我就返回给你，你再去查。\n（目前百度有4台baidu.com的顶级域名服务器）。")]),_._v(" "),v("p",[_._v("8.ISPDNS不厌其烦的再次向baidu.com这个域的权威服务器发起请求，baidu.com收到之后，查了下有www的这台主机，就把这个IP返回给你了，")]),_._v(" "),v("p",[_._v("9.然后"),v("code",[_._v("ISPDNS")]),_._v("拿到了之后，将其返回给了客户端，并且把这个保存在高速缓存中。")]),_._v(" "),v("p",[_._v("一、 "),v("strong",[_._v("主机向本地域名服务器的查询一般都是采用递归查询")])]),_._v(" "),v("p",[_._v("所谓递归查询就是：如果主机所询问的本地域名服务器不知道被查询的域名的"),v("code",[_._v("IP")]),_._v("地址，那么本地域名服务器就以"),v("code",[_._v("DNS")]),_._v("客户的身份，向其它根域名服务器继续发出查询请求报文(即替主机继续查询)，而不是让主机自己进行下一步查询。")]),_._v(" "),v("p",[_._v("因此，递归查询返回的查询结果或者是所要查询的"),v("code",[_._v("IP")]),_._v("地址，或者是报错，表示无法查询到所需的"),v("code",[_._v("IP")]),_._v("地址")]),_._v(" "),v("p",[_._v("二、 "),v("strong",[_._v("本地域名服务器向根域名服务器的查询的迭代查询")])]),_._v(" "),v("p",[_._v("迭代查询的特点：当根域名服务器收到本地域名服务器发出的迭代查询请求报文时，要么给出所要查询的"),v("code",[_._v("IP")]),_._v("地址，要么告诉本地服务器：“你下一步应当向哪一个域名服务器进行查询”。")]),_._v(" "),v("p",[_._v("然后让本地服务器进行后续的查询。根域名服务器通常是把自己知道的顶级域名服务器的"),v("code",[_._v("IP")]),_._v("地址告诉本地域名服务器，让本地域名服务器再向顶级域名服务器查询。")]),_._v(" "),v("p",[_._v("顶级域名服务器在收到本地域名服务器的查询请求后，要么给出所要查询的"),v("code",[_._v("IP")]),_._v("地址，要么告诉本地服务器下一步应当向哪一个权限域名服务器进行查询。")])])}),[],!1,null,null,null);v.default=e.exports}}]);