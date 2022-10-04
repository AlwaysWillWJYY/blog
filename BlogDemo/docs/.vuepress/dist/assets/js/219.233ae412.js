(window.webpackJsonp=window.webpackJsonp||[]).push([[219],{677:function(t,s,e){"use strict";e.r(s);var a=e(1),v=Object(a.a)({},(function(){var t=this,s=t._self._c;return s("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[s("p",[t._v("主从切换技术的方法是：当主服务器宕机后，需要手动把一台从服务器切换为主服务器，这就需要人工干预。费时费力，还会造成一段时间内的服务不可用。这不是一种推荐的方式，更多时候，我们优先考虑哨兵模式。")]),t._v(" "),s("h3",{attrs:{id:"一、哨兵模式概述"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#一、哨兵模式概述"}},[t._v("#")]),t._v(" 一、哨兵模式概述")]),t._v(" "),s("p",[t._v("哨兵模式是一种特殊模式，首先Redis提供了哨兵的命令，哨兵是一个独立的进程，作为进程，他会独立执行。其原理是哨兵通过发送命令，等待Redis服务器响应，从而监控运行多个Redis实例。")]),t._v(" "),s("p",[s("img",{attrs:{src:"https://img-blog.csdnimg.cn/9e57dbe83f614ca68b79000c1a5fc47d.png",alt:"在这里插入图片描述"}})]),t._v(" "),s("p",[t._v("这里的哨兵有两个作用:")]),t._v(" "),s("p",[t._v("·通过发送命令，让Redis服务器返回监控其运行状态，包括主服务器和从服务器。")]),t._v(" "),s("p",[t._v("·当哨兵监测到master宕机，会自动将slave切换成master，然后通过发布订阅模式通知其他的从服务器，修改配置文件，让他们切换主机。")]),t._v(" "),s("p",[t._v("然而一个哨兵进程对Redis服务器进行监控，可能会出现问题。因此，我们可以使用多个哨兵进行监控。各个哨兵之间还会进行监控，这样就形成了多哨兵模式。")]),t._v(" "),s("p",[t._v("用文字描述一下"),s("code",[t._v("故障切换（failover）")]),t._v("的过程。假设主服务器宕机，哨兵1先检测到这个结果，系统并不会马上进行failover过程，仅仅是哨兵1主观认为主服务器不可用，这个现象称为"),s("code",[t._v("主观下线")]),t._v("。当后面的哨兵也检测到主服务器不可用，并且数量达到一定值时，那么哨兵之间就会进行一次投票，投票的结果由一个哨兵发起，进行failover操作。切换成功后，就会通过发布订阅模式，让各个哨兵把自己监控的从服务器实现切换主机，这个过程称为"),s("code",[t._v("客观下线")]),t._v("。这样对于客户端而言，一切都是透明的。")]),t._v(" "),s("h3",{attrs:{id:"二、redis配置哨兵模式"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#二、redis配置哨兵模式"}},[t._v("#")]),t._v(" 二、Redis配置哨兵模式")]),t._v(" "),s("p",[t._v("一主二从三哨兵")]),t._v(" "),s("p",[s("img",{attrs:{src:"https://img-blog.csdnimg.cn/b9c65018660144db81dc8c3d4062e913.png",alt:"在这里插入图片描述"}})]),t._v(" "),s("p",[s("img",{attrs:{src:"https://img-blog.csdnimg.cn/b1860e256ea14b238cf06581ae006a48.png",alt:"在这里插入图片描述"}})])])}),[],!1,null,null,null);s.default=v.exports}}]);