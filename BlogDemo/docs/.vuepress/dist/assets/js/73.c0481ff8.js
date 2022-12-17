(window.webpackJsonp=window.webpackJsonp||[]).push([[73],{536:function(v,_,e){"use strict";e.r(_);var t=e(1),c=Object(t.a)({},(function(){var v=this,_=v._self._c;return _("ContentSlotsDistributor",{attrs:{"slot-key":v.$parent.slotKey}},[_("h2",{attrs:{id:"高并发"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#高并发"}},[v._v("#")]),v._v(" 高并发")]),v._v(" "),_("h3",{attrs:{id:"一、什么是高并发"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#一、什么是高并发"}},[v._v("#")]),v._v(" 一、什么是高并发")]),v._v(" "),_("p",[_("code",[v._v("高并发（High Concurrency）")]),v._v("是互联网分布式系统架构设计中必须考虑的因素之一，"),_("code",[v._v("它通常是指，通过设计保证系统能够同时并行处理很多请求。")])]),v._v(" "),_("p",[v._v("高并发相关常用的一些指标有响应时间（Response Time），吞吐量（Throughput），每秒查询率QPS（Query Per Second），并发用户数等。")]),v._v(" "),_("p",[_("code",[v._v("响应时间")]),v._v("：系统对请求做出响应的时间。例如系统处理一个HTTP请求需要200ms，这个200ms就是系统的响应时间。")]),v._v(" "),_("p",[_("code",[v._v("吞吐量")]),v._v("：单位时间内处理的请求数量。")]),v._v(" "),_("p",[_("code",[v._v("QPS")]),v._v("：每秒响应请求数。在互联网领域，这个指标和吞吐量区分的没有这么明显。")]),v._v(" "),_("p",[_("code",[v._v("并发用户数")]),v._v("：同时承载正常使用系统功能的用户数量。例如一个即时通讯系统，同时在线量一定程度上代表了系统的并发用户数。")]),v._v(" "),_("h3",{attrs:{id:"二、如何提升系统的并发能力"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#二、如何提升系统的并发能力"}},[v._v("#")]),v._v(" 二、如何提升系统的并发能力")]),v._v(" "),_("p",[v._v("互联网分布式架构设计，提高系统并发能力的方式，方法论上主要有两种："),_("code",[v._v("垂直扩展（Scale Up）与水平扩展（Scale Out）。")])]),v._v(" "),_("p",[_("code",[v._v("垂直扩展")]),v._v("：提升单机处理能力。垂直扩展的方式又有两种：")]),v._v(" "),_("p",[v._v("（1）增强单机硬件性能，例如：增加CPU核数如32核，升级更好的网卡如万兆，升级更好的硬盘如SSD，扩充硬盘容量如2T，扩充系统内存如128G；")]),v._v(" "),_("p",[v._v("（2）提升单机架构性能，例如：使用Cache来减少IO次数，使用异步来增加单服务吞吐量，使用无锁数据结构来减少响应时间；")]),v._v(" "),_("p",[v._v("在互联网业务发展非常迅猛的早期，如果预算不是问题，强烈建议使用“增强单机硬件性能”的方式提升系统并发能力，因为这个阶段，公司的战略往往是发展业务抢时间，而“增强单机硬件性能”往往是最快的方法。")]),v._v(" "),_("p",[v._v("不管是提升单机硬件性能，还是提升单机架构性能，都有一个致命的不足：单机性能总是有极限的。所以互联网分布式架构设计高并发终极解决方案还是水平扩展。")]),v._v(" "),_("p",[_("code",[v._v("水平扩展")]),v._v("：只要增加服务器数量，就能线性扩充系统性能。水平扩展对系统架构设计是有要求的，如何在架构各层进行可水平扩展的设计，以及互联网公司架构各层常见的水平扩展实践，是本文重点讨论的内容。")]),v._v(" "),_("h3",{attrs:{id:"三、常见的互联网分层架构"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#三、常见的互联网分层架构"}},[v._v("#")]),v._v(" 三、常见的互联网分层架构")]),v._v(" "),_("p",[_("img",{attrs:{src:"https://img-blog.csdnimg.cn/77227a145734490884cf2914be72e421.png",alt:"在这里插入图片描述"}})]),v._v(" "),_("p",[v._v("常见互联网分布式架构如上，分为：")]),v._v(" "),_("p",[v._v("（1）"),_("code",[v._v("客户端层")]),v._v("：典型调用方是浏览器browser或者手机应用APP")]),v._v(" "),_("p",[v._v("（2）"),_("code",[v._v("反向代理层")]),v._v("：系统入口，反向代理")]),v._v(" "),_("p",[v._v("（3）"),_("code",[v._v("站点应用层")]),v._v("：实现核心应用逻辑，返回html或者json")]),v._v(" "),_("p",[v._v("（4）"),_("code",[v._v("服务层")]),v._v("：如果实现了服务化，就有这一层")]),v._v(" "),_("p",[v._v("（5）"),_("code",[v._v("数据-缓存层")]),v._v("：缓存加速访问存储")]),v._v(" "),_("p",[v._v("（6）"),_("code",[v._v("数据-数据库层")]),v._v("：数据库固化数据存储")]),v._v(" "),_("p",[v._v("整个系统各层次的水平扩展，又分别是如何实施的呢？")]),v._v(" "),_("h3",{attrs:{id:"四、分层水平扩展架构实践"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#四、分层水平扩展架构实践"}},[v._v("#")]),v._v(" 四、分层水平扩展架构实践")]),v._v(" "),_("p",[_("code",[v._v("反向代理层的水平扩展")])]),v._v(" "),_("p",[_("img",{attrs:{src:"https://img-blog.csdnimg.cn/9fcf84202f2f47bda3fd0110a0dd3b35.png",alt:"在这里插入图片描述"}})]),v._v(" "),_("p",[v._v("反向代理层的水平扩展，是通过“DNS轮询”实现的：dns-server对于一个域名配置了多个解析ip，每次DNS解析请求来访问dns-server，会轮询返回这些ip。")]),v._v(" "),_("p",[v._v("当nginx成为瓶颈的时候，只要增加服务器数量，新增nginx服务的部署，增加一个外网ip，就能扩展反向代理层的性能，做到理论上的无限高并发。")]),v._v(" "),_("p",[_("code",[v._v("站点层的水平扩展")])]),v._v(" "),_("p",[_("img",{attrs:{src:"https://img-blog.csdnimg.cn/6a1ba73993c74c6b9e90819e41f715d5.png",alt:"在这里插入图片描述"}})]),v._v(" "),_("p",[v._v("站点层的水平扩展，是通过“nginx”实现的。通过修改nginx.conf，可以设置多个web后端。")]),v._v(" "),_("p",[v._v("当web后端成为瓶颈的时候，只要增加服务器数量，新增web服务的部署，在nginx配置中配置上新的web后端，就能扩展站点层的性能，做到理论上的无限高并发。")]),v._v(" "),_("p",[_("code",[v._v("服务层的水平扩展")])]),v._v(" "),_("p",[_("img",{attrs:{src:"https://img-blog.csdnimg.cn/1f9f7cce5b724e308ccce839e5d629c8.png",alt:"在这里插入图片描述"}})]),v._v(" "),_("p",[v._v("服务层的水平扩展，是通过“服务连接池”实现的。")]),v._v(" "),_("p",[v._v("站点层通过RPC-client调用下游的服务层RPC-server时，RPC-client中的连接池会建立与下游服务多个连接，当服务成为瓶颈的时候，只要增加服务器数量，新增服务部署，在RPC-client处建立新的下游服务连接，就能扩展服务层性能，做到理论上的无限高并发。如果需要优雅的进行服务层自动扩容，这里可能需要配置中心里服务自动发现功能的支持。")]),v._v(" "),_("p",[_("code",[v._v("数据层的水平扩展")])]),v._v(" "),_("p",[v._v("在数据量很大的情况下，数据层（缓存，数据库）涉及数据的水平扩展，将原本存储在一台服务器上的数据（缓存，数据库）水平拆分到不同服务器上去，以达到扩充系统性能的目的。")]),v._v(" "),_("p",[v._v("互联网数据层常见的水平拆分方式有这么几种，以数据库为例：")]),v._v(" "),_("p",[_("code",[v._v("按照范围水平拆分")])]),v._v(" "),_("p",[_("img",{attrs:{src:"https://img-blog.csdnimg.cn/2f70881d912541aa964e0fa6735b3c5b.png",alt:"在这里插入图片描述"}})]),v._v(" "),_("p",[v._v("每一个数据服务，存储一定范围的数据，上图为例：")]),v._v(" "),_("p",[v._v("user0库，存储uid范围1-1kw\nuser1库，存储uid范围1kw-2kw")]),v._v(" "),_("p",[v._v("这个方案的好处是：")]),v._v(" "),_("p",[v._v("（1）规则简单，service只需判断一下uid范围就能路由到对应的存储服务；")]),v._v(" "),_("p",[v._v("（2）数据均衡性较好；")]),v._v(" "),_("p",[v._v("（3）比较容易扩展，可以随时加一个uid[2kw,3kw]的数据服务；")]),v._v(" "),_("p",[v._v("不足是：")]),v._v(" "),_("p",[v._v("（1）请求的负载不一定均衡，一般来说，新注册的用户会比老用户更活跃，大range的服务请求压力会更大；")]),v._v(" "),_("p",[_("code",[v._v("按照哈希表水平拆分")])]),v._v(" "),_("p",[_("img",{attrs:{src:"https://img-blog.csdnimg.cn/2973bbac9efd445eaf05ef5846407e30.png",alt:"在这里插入图片描述"}})]),v._v(" "),_("p",[v._v("每一个数据库，存储某个key值hash后的部分数据，上图为例：")]),v._v(" "),_("p",[v._v("user0库，存储偶数uid数据\nuser1库，存储奇数uid数据")]),v._v(" "),_("p",[v._v("这个方案的好处是：")]),v._v(" "),_("p",[v._v("（1）规则简单，service只需对uid进行hash能路由到对应的存储服务；")]),v._v(" "),_("p",[v._v("（2）数据均衡性较好；")]),v._v(" "),_("p",[v._v("（3）请求均匀性较好；")]),v._v(" "),_("p",[v._v("不足是：")]),v._v(" "),_("p",[v._v("（1）不容易扩展，扩展一个数据服务，hash方法改变时候，可能需要进行数据迁移；")]),v._v(" "),_("p",[_("code",[v._v("这里需要注意的是，通过水平拆分来扩充系统性能，与主从同步读写分离来扩充数据库性能的方式有本质的不同。")])]),v._v(" "),_("p",[v._v("通过水平拆分扩展数据库性能：")]),v._v(" "),_("p",[v._v("（1）每个服务器上存储的数据量是总量的1/n，所以单机的性能也会有提升；")]),v._v(" "),_("p",[v._v("（2）n个服务器上的数据没有交集，各个服务器上数据的并集是数据的全集；")]),v._v(" "),_("p",[v._v("（3）数据水平拆分到了n个服务器上，理论上读性能扩充了n倍，写性能也扩充了n倍（其实远不止n倍，因为单机的数据量变为了原来的1/n）；")]),v._v(" "),_("p",[v._v("通过主从同步读写分离扩展数据库性能：")]),v._v(" "),_("p",[v._v("（1）每个服务器上存储的数据量是和总量相同；")]),v._v(" "),_("p",[v._v("（2）n个服务器上的数据都一样，都是全集；")]),v._v(" "),_("p",[v._v("（3）理论上读性能扩充了n倍，写仍然是单点，写性能不变；")]),v._v(" "),_("p",[v._v("缓存层的水平拆分和数据库层的水平拆分类似，也是以范围拆分和哈希拆分的方式居多，就不再展开。")]),v._v(" "),_("h3",{attrs:{id:"五、总结"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#五、总结"}},[v._v("#")]),v._v(" 五、总结")]),v._v(" "),_("p",[_("code",[v._v("高并发（High Concurrency）")]),v._v("是互联网分布式系统架构设计中必须考虑的因素之一，它通常是指，通过设计保证系统能够同时并行处理很多请求。")]),v._v(" "),_("p",[v._v("提高系统并发能力的方式，方法论上主要有两种："),_("code",[v._v("垂直扩展（Scale Up）与水平扩展（Scale Out）")]),v._v("。前者垂直扩展可以通过提升单机硬件性能，或者提升单机架构性能，来提高并发性，但单机性能总是有极限的，互联网分布式架构设计高并发终极解决方案还是后者：水平扩展。")]),v._v(" "),_("p",[v._v("互联网分层架构中，各层次水平扩展的实践又有所不同：")]),v._v(" "),_("p",[v._v("（1）反向代理层可以通过“DNS轮询”的方式来进行水平扩展；")]),v._v(" "),_("p",[v._v("（2）站点层可以通过nginx来进行水平扩展；")]),v._v(" "),_("p",[v._v("（3）服务层可以通过服务连接池来进行水平扩展；")]),v._v(" "),_("p",[v._v("（4）数据库可以按照数据范围，或者数据哈希的方式来进行水平扩展；")]),v._v(" "),_("p",[v._v("各层实施水平扩展后，能够通过增加服务器数量的方式来提升系统的性能，做到理论上的性能无限。")]),v._v(" "),_("h2",{attrs:{id:"高并发的常见应对方案"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#高并发的常见应对方案"}},[v._v("#")]),v._v(" 高并发的常见应对方案")]),v._v(" "),_("h3",{attrs:{id:"一、高并发是什么"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#一、高并发是什么"}},[v._v("#")]),v._v(" 一、高并发是什么？")]),v._v(" "),_("p",[v._v("在互联网时代，高并发，通常是指，在某个时间点，有很多个访问同时到来。")]),v._v(" "),_("p",[_("code",[v._v("高并发，通常关心的系统指标与业务指标？")])]),v._v(" "),_("p",[v._v("·"),_("code",[v._v("QPS")]),v._v("：每秒钟查询量，广义的，通常指指每秒请求数")]),v._v(" "),_("p",[v._v("·"),_("code",[v._v("响应时间")]),v._v("：从请求发出到收到响应花费的时间，例如：系统处理一个HTTP请求需要100ms，这个100ms就是系统的响应时间")]),v._v(" "),_("p",[v._v("·"),_("code",[v._v("带宽")]),v._v("：计算带宽大小需关注两个指标，峰值流量和页面的平均大小")]),v._v(" "),_("p",[v._v("·"),_("code",[v._v("PV")]),v._v("：综合浏览量(Page View)，即页面浏览量或者点击量，通常关注在24小时内访问的页面数量，即“日PV”")]),v._v(" "),_("p",[v._v("·"),_("code",[v._v("UV")]),v._v("：独立访问(UniQue Visitor)，即去重后的访问用户数，通常关注在24小时内访问的用户，即“日UV”")]),v._v(" "),_("h3",{attrs:{id:"二、关于三种应对大并发的常见优化方案"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#二、关于三种应对大并发的常见优化方案"}},[v._v("#")]),v._v(" 二、关于三种应对大并发的常见优化方案")]),v._v(" "),_("p",[_("code",[v._v("【数据库缓存】")])]),v._v(" "),_("p",[_("code",[v._v("为什么要使用数据库缓存？")])]),v._v(" "),_("p",[v._v("缓存数据是为了让客户端很少甚至不访问数据库，减少磁盘IO，提高并发量，提高应用数据的响应速度。")]),v._v(" "),_("p",[_("code",[v._v("【CDN加速】")])]),v._v(" "),_("p",[_("code",[v._v("什么是CDN？")])]),v._v(" "),_("p",[v._v("CDN的全称是Content Delivery NetWork，CDN系统能够实时地根据网络流量和各个节点的连接、负载状况以及到用户的距离等综合信息将用户的请求重新导向离用户最近的服务节点上。")]),v._v(" "),_("p",[_("code",[v._v("使用CDN的优势？")])]),v._v(" "),_("p",[v._v("CDN的本质是内存缓存，就近访问，它提高了企业站点(尤其含有大量图片和静态页面站点)的访问速度，跨运营商的网络加速，保证不同网络的用户都得到良好的访问质量。")]),v._v(" "),_("p",[v._v("同时，减少远程访问的带宽，分担网络流量，减轻原站点WEB服务器负载。")]),v._v(" "),_("p",[_("code",[v._v("【服务器的集群化，以及负载均衡】")])]),v._v(" "),_("p",[_("code",[v._v("什么是七层负载均衡？")])]),v._v(" "),_("p",[v._v("七层负载均衡，是基于http协议等应用信息的负载均衡，最常用的就是Nginx，它能够自动剔除工作不正常的后端服务器，上传文件使用异步模式，支持多种分配策略，可以分配权重，分配方式灵活。")]),v._v(" "),_("p",[v._v("内置策略：IP Hash、加权轮询")]),v._v(" "),_("p",[v._v("扩展策略：fair策略、通用hash、一致性hash")]),v._v(" "),_("p",[_("code",[v._v("什么是加权轮询策略？")])]),v._v(" "),_("p",[v._v("首先将请求都分给高权重的机器，直到该机器的权值降到了比其他机器低，才开始将请求分给下一个高权重的机器，即体现了加权权重，又体现了轮询。")]),v._v(" "),_("h3",{attrs:{id:"高可用"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#高可用"}},[v._v("#")]),v._v(" 高可用")]),v._v(" "),_("h4",{attrs:{id:"一、什么是高可用"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#一、什么是高可用"}},[v._v("#")]),v._v(" 一、什么是高可用？")]),v._v(" "),_("p",[_("code",[v._v("高可用HA（High Availability）")]),v._v("是分布式系统架构设计中必须考虑的因素之一，它通常是指，通过设计减少系统不能提供服务的时间。")]),v._v(" "),_("p",[v._v("假设系统一直能够提供服务，我们说系统的可用性是100%。")]),v._v(" "),_("p",[v._v("如果系统每运行100个时间单位，会有1个时间单位无法提供服务，我们说系统的可用性是99%。")]),v._v(" "),_("p",[v._v("很多公司的高可用目标是4个9，也就是99.99%，这就意味着，系统的年停机时间为8.76个小时。")]),v._v(" "),_("p",[v._v("百度的搜索首页，是业内公认高可用保障非常出色的系统，甚至人们会通过www.baidu.com 能不能访问来判断“网络的连通性”，百度高可用的服务让人留下了“网络通畅，百度就能访问”，“百度打不开，应该是网络连不上”的印象，这其实是对百度HA最高的褒奖。")]),v._v(" "),_("h4",{attrs:{id:"二、如何保障系统的高可用"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#二、如何保障系统的高可用"}},[v._v("#")]),v._v(" 二、如何保障系统的高可用")]),v._v(" "),_("p",[v._v("我们都知道，"),_("code",[v._v("单点（就是数据只有一份或者服务器只有一个，一个崩了，就没办法了）是系统高可用的大敌")]),v._v("，单点往往是系统高可用最大的风险和敌人，应该尽量在系统设计的过程中避免单点。方法论上，"),_("code",[v._v("高可用保证的原则是“集群化”，或者叫“冗余”")]),v._v("：只有一个单点，挂了服务会受影响；如果有冗余备份，挂了还有其他backup能够顶上。")]),v._v(" "),_("p",[_("code",[v._v("保证系统高可用，架构设计的核心准则是：冗余。")])]),v._v(" "),_("p",[v._v("有了冗余之后，还不够，每次出现故障需要人工介入恢复势必会增加系统的不可服务实践。所以，又往往是通过“"),_("code",[v._v("自动故障转移")]),v._v("”来实现系统的高可用。")]),v._v(" "),_("p",[v._v("接下来我们看下典型互联网架构中，如何通过冗余+自动故障转移来保证系统的高可用特性。")]),v._v(" "),_("h4",{attrs:{id:"三、常见的互联网分层架构-2"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#三、常见的互联网分层架构-2"}},[v._v("#")]),v._v(" 三、常见的互联网分层架构")]),v._v(" "),_("p",[_("img",{attrs:{src:"https://img-blog.csdnimg.cn/5bde181d59754054a538353d1bf71332.png",alt:"在这里插入图片描述"}})]),v._v(" "),_("p",[v._v("常见互联网分布式架构如上，分为：")]),v._v(" "),_("p",[v._v("（1）"),_("code",[v._v("客户端层")]),v._v("：典型调用方是浏览器browser或者手机应用APP")]),v._v(" "),_("p",[v._v("（2）"),_("code",[v._v("反向代理层")]),v._v("：系统入口，反向代理")]),v._v(" "),_("p",[v._v("（3）"),_("code",[v._v("站点应用层")]),v._v("：实现核心应用逻辑，返回html或者json")]),v._v(" "),_("p",[v._v("（4）"),_("code",[v._v("服务层")]),v._v("：如果实现了服务化，就有这一层")]),v._v(" "),_("p",[v._v("（5）"),_("code",[v._v("数据-缓存层")]),v._v("：缓存加速访问存储")]),v._v(" "),_("p",[v._v("（6）"),_("code",[v._v("数据-数据库层")]),v._v("：数据库固化数据存储")]),v._v(" "),_("p",[v._v("整个系统的高可用，又是通过每一层的冗余+自动故障转移来综合实现的。")]),v._v(" "),_("h4",{attrs:{id:"四、分层高可用架构实践"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#四、分层高可用架构实践"}},[v._v("#")]),v._v(" 四、分层高可用架构实践")]),v._v(" "),_("p",[_("code",[v._v("【客户端->反向代理层】的高可用")])]),v._v(" "),_("p",[_("img",{attrs:{src:"https://img-blog.csdnimg.cn/9be7999c94234a10958f273e7542d981.png",alt:"在这里插入图片描述"}})]),v._v(" "),_("p",[v._v("【客户端层】到【反向代理层】的高可用，是通过反向代理层的冗余来实现的。以nginx为例：有两台nginx，一台对线上提供服务，另一台冗余以保证高可用，"),_("code",[v._v("常见的实践是keepalived存活探测")]),v._v("，相同virtual IP提供服务。")]),v._v(" "),_("p",[_("img",{attrs:{src:"https://img-blog.csdnimg.cn/7726fb79d82140adb2c3f3a7cdeb711a.png",alt:"在这里插入图片描述"}})]),v._v(" "),_("p",[v._v("【自动故障转移】：当nginx挂了的时候，"),_("code",[v._v("keepalived能够探测到")]),v._v("，会自动的进行故障转移，将流量自动迁移到shadow-nginx，由于使用的是相同的virtual IP，这个切换过程对调用方是透明的。")]),v._v(" "),_("p",[v._v("【反向代理层->站点层】的高可用")]),v._v(" "),_("p",[_("img",{attrs:{src:"https://img-blog.csdnimg.cn/cbc8c4924408482d95addd6f63ff5bc8.png",alt:"在这里插入图片描述"}})]),v._v(" "),_("p",[v._v("【反向代理层】到【站点层】的高可用，是通过站点层的冗余来实现的。假设反向代理层是nginx，nginx.conf里能够配置多个web后端，并且nginx能够探测到多个后端的存活性。")]),v._v(" "),_("p",[_("img",{attrs:{src:"https://img-blog.csdnimg.cn/41b4093bd0d64a73a294e408dffe1780.png",alt:"在这里插入图片描述"}})]),v._v(" "),_("p",[_("code",[v._v("自动故障转移")]),v._v("：当web-server挂了的时候，"),_("code",[v._v("nginx能够探测到")]),v._v("，会自动的进行故障转移，将流量自动迁移到其他的web-server，整个过程由nginx自动完成，对调用方是透明的。")]),v._v(" "),_("p",[v._v("【站点层->服务层】的高可用")]),v._v(" "),_("p",[_("img",{attrs:{src:"https://img-blog.csdnimg.cn/2746db5765294daab744c863d21f7201.png",alt:"在这里插入图片描述"}})]),v._v(" "),_("p",[v._v("【站点层】到【服务层】的高可用，是通过服务层的冗余来实现的。“服务连接池”会建立与下游服务多个连接，每次请求会“随机”选取连接来访问下游服务。")]),v._v(" "),_("p",[_("img",{attrs:{src:"https://img-blog.csdnimg.cn/d07a853e78714ddabe97e033cb8275cc.png",alt:"在这里插入图片描述"}})]),v._v(" "),_("p",[_("code",[v._v("自动故障转移")]),v._v("：当service挂了的时候，"),_("code",[v._v("service-connection-pool")]),v._v("能够探测到，会自动的进行故障转移，将流量自动迁移到其他的service，整个过程由连接池自动完成，对调用方是透明的（所以说RPC-client中的服务连接池是很重要的基础组件）。")]),v._v(" "),_("p",[v._v("【服务层->缓存层】的高可用")]),v._v(" "),_("p",[_("img",{attrs:{src:"https://img-blog.csdnimg.cn/b40ec7ead3604a02a56d0c6b59694afe.png",alt:"在这里插入图片描述"}})]),v._v(" "),_("p",[v._v("【服务层】到【缓存层】的高可用，是通过缓存数据的冗余来实现的。")]),v._v(" "),_("p",[v._v("缓存层的数据冗余又有几种方式：第一种是利用客户端的封装，service对cache进行双读或者双写。")]),v._v(" "),_("p",[_("img",{attrs:{src:"https://img-blog.csdnimg.cn/d62c274defe545f58da28bcad8ca1f75.png",alt:"在这里插入图片描述"}})]),v._v(" "),_("p",[v._v("缓存层也可以"),_("code",[v._v("通过支持主从同步的缓存集群来解决缓存层的高可用问题。")])]),v._v(" "),_("p",[v._v("以redis为例，"),_("code",[v._v("redis天然支持主从同步，redis官方也有sentinel哨兵机制，来做redis的存活性检测。")])]),v._v(" "),_("p",[_("img",{attrs:{src:"https://img-blog.csdnimg.cn/e2738de27a1f4db4b05244257b635c1d.png",alt:"在这里插入图片描述"}})]),v._v(" "),_("p",[v._v("自动故障转移：当redis主挂了的时候，"),_("code",[v._v("sentinel")]),v._v("能够探测到，会通知调用方访问新的redis，整个过程由sentinel和redis集群配合完成，对调用方是透明的。")]),v._v(" "),_("p",[v._v("说完缓存的高可用，这里要多说一句，业务对缓存并不一定有“高可用”要求，更多的对缓存的使用场景，是用来“加速数据访问”：把一部分数据放到缓存里，如果缓存挂了或者缓存没有命中，是可以去后端的数据库中再取数据的。")]),v._v(" "),_("p",[v._v("这类允许“cache miss”的业务场景，缓存架构的建议是：")]),v._v(" "),_("p",[_("img",{attrs:{src:"https://img-blog.csdnimg.cn/42b54b17ad27433bb1ddd432ea4d053d.png",alt:"在这里插入图片描述"}})]),v._v(" "),_("p",[v._v("将kv缓存封装成服务集群，上游设置一个代理（代理可以用集群冗余的方式保证高可用），代理的后端根据缓存访问的key水平切分成若干个实例，每个实例的访问并不做高可用。")]),v._v(" "),_("p",[_("img",{attrs:{src:"https://img-blog.csdnimg.cn/80982d692a4e4da791cc6b3c6477a6a9.png",alt:"在这里插入图片描述"}})]),v._v(" "),_("p",[_("code",[v._v("缓存实例挂了屏蔽")]),v._v("：当有水平切分的实例挂掉时，代理层直接返回cache miss，此时缓存挂掉对调用方也是透明的。key水平切分实例减少，不建议做re-hash，这样容易引发缓存数据的不一致。")]),v._v(" "),_("p",[v._v("【服务层->数据库层】的高可用")]),v._v(" "),_("p",[v._v("大部分互联网技术，数据库层都用了“"),_("code",[v._v("主从同步，读写分离")]),v._v("”架构，所以数据库层的高可用，又分为“读库高可用”与“写库高可用”两类。")]),v._v(" "),_("p",[v._v("【服务层->数据库层”读“】的高可用")]),v._v(" "),_("p",[_("img",{attrs:{src:"https://img-blog.csdnimg.cn/e26d11b7e0424b60b2dee5158fb8755f.png",alt:"在这里插入图片描述"}})]),v._v(" "),_("p",[v._v("【服务层】到【数据库读】的高可用，是通过读库的冗余来实现的。")]),v._v(" "),_("p",[v._v("既然冗余了读库，一般来说就至少有2个从库，“数据库连接池”会建立与读库多个连接，每次请求会路由到这些读库。")]),v._v(" "),_("p",[_("img",{attrs:{src:"https://img-blog.csdnimg.cn/4871102c22a74f66b0f0712a7749f45c.png",alt:"在这里插入图片描述"}})]),v._v(" "),_("p",[_("code",[v._v("自动故障转移")]),v._v("：当读库挂了的时候，"),_("code",[v._v("db-connection-pool")]),v._v("能够探测到，会自动的进行故障转移，将流量自动迁移到其他的读库，整个过程由连接池自动完成，对调用方是透明的（所以说DAO中的数据库连接池是很重要的基础组件）。")]),v._v(" "),_("p",[v._v("【服务层->数据库层”写“】的高可用")]),v._v(" "),_("p",[_("img",{attrs:{src:"https://img-blog.csdnimg.cn/4c54423d1bdc4b8baaf579d47cc9d3e8.png",alt:"在这里插入图片描述"}})]),v._v(" "),_("p",[v._v("【服务层】到【数据库写】的高可用，是通过写库的冗余来实现的。")]),v._v(" "),_("p",[v._v("以mysql为例，可以设置两个mysql双主同步，一台对线上提供服务，另一台冗余以保证高可用，常见的实践是keepalived存活探测，相同virtual IP提供服务。")]),v._v(" "),_("p",[_("img",{attrs:{src:"https://img-blog.csdnimg.cn/4af0bb0ac77d45b2ba58db0b5e9663fd.png",alt:"在这里插入图片描述"}})]),v._v(" "),_("p",[_("code",[v._v("自动故障转移")]),v._v("：当写库挂了的时候，keepalived能够探测到，会自动的进行故障转移，将流量自动迁移到"),_("code",[v._v("shadow-db-master")]),v._v("，由于使用的是相同的virtual IP，这个切换过程对调用方是透明的。")]),v._v(" "),_("h3",{attrs:{id:"五、总结-2"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#五、总结-2"}},[v._v("#")]),v._v(" 五、总结")]),v._v(" "),_("p",[v._v("高可用HA（High Availability）是分布式系统架构设计中必须考虑的因素之一，它通常是指，通过设计减少系统不能提供服务的时间。")]),v._v(" "),_("p",[v._v("方法论上，高可用是通过冗余+自动故障转移来实现的。")]),v._v(" "),_("p",[v._v("整个互联网分层系统架构的高可用，又是通过每一层的冗余+自动故障转移来综合实现的，具体的：")]),v._v(" "),_("p",[v._v("（1）【客户端层】到【反向代理层】的高可用，是通过反向代理层的冗余实现的，常见实践是keepalived + virtual IP自动故障转移")]),v._v(" "),_("p",[v._v("（2）【反向代理层】到【站点层】的高可用，是通过站点层的冗余实现的，常见实践是nginx与web-server之间的存活性探测与自动故障转移")]),v._v(" "),_("p",[v._v("（3）【站点层】到【服务层】的高可用，是通过服务层的冗余实现的，常见实践是通过service-connection-pool来保证自动故障转移")]),v._v(" "),_("p",[v._v("（4）【服务层】到【缓存层】的高可用，是通过缓存数据的冗余实现的，常见实践是缓存客户端双读双写，或者利用缓存集群的主从数据同步与sentinel保活与自动故障转移；更多的业务场景，对缓存没有高可用要求，可以使用缓存服务化来对调用方屏蔽底层复杂性")]),v._v(" "),_("p",[v._v("（5）【服务层】到【数据库“读”】的高可用，是通过读库的冗余实现的，常见实践是通过db-connection-pool来保证自动故障转移")]),v._v(" "),_("p",[v._v("（6）【服务层】到【数据库“写”】的高可用，是通过写库的冗余实现的，常见实践是keepalived + virtual IP自动故障转移")])])}),[],!1,null,null,null);_.default=c.exports}}]);