(window.webpackJsonp=window.webpackJsonp||[]).push([[204],{663:function(a,e,r){"use strict";r.r(e);var _=r(1),v=Object(_.a)({},(function(){var a=this,e=a._self._c;return e("ContentSlotsDistributor",{attrs:{"slot-key":a.$parent.slotKey}},[e("h2",{attrs:{id:"基础题目"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#基础题目"}},[a._v("#")]),a._v(" 基础题目")]),a._v(" "),e("h3",{attrs:{id:"_1、apache-kafka-是什么"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#_1、apache-kafka-是什么"}},[a._v("#")]),a._v(" 1、Apache Kafka 是什么?")]),a._v(" "),e("p",[a._v("Apach Kafka 是一款分布式流处理框架，用于实时构建流处理应用。它有一个核心 的功能广为人知，即作为企业级的消息引擎被广泛使用。")]),a._v(" "),e("p",[a._v("你一定要先明确它的流处理框架地位，这样能给面试官留 下一个很专业的印象。")]),a._v(" "),e("h3",{attrs:{id:"_2、什么是消费者组"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#_2、什么是消费者组"}},[a._v("#")]),a._v(" 2、什么是消费者组?")]),a._v(" "),e("p",[a._v("消费者组是 Kafka 独有的概念，如果面试官问这 个，就说明他对此是有一定了解的。我先给出标准答案：")]),a._v(" "),e("p",[a._v("1、定义：即消费者组是 Kafka 提供的可扩展且具有容错性的消费者机制。")]),a._v(" "),e("p",[a._v("2、原理：在 Kafka 中，消费者组是一个由多个消费者实例 构成的组。多个实例共同订阅若干个主题，实现共同消费。同一个组下的每个实例都配置有 相同的组 ID，被分配不同的订阅分区。当某个实例挂掉的时候，其他实例会自动地承担起 它负责消费的分区。\n此时，又有一个小技巧给到你:消费者组的题目，能够帮你在某种程度上掌控下面的面试方\n向。")]),a._v(" "),e("p",[a._v("• 如果你擅长位移值原理，就不妨再提一下"),e("code",[a._v("消费者组的位移提交机制")]),a._v(";")]),a._v(" "),e("p",[a._v("• 如果你擅长 Kafka Broker，可以提一下"),e("code",[a._v("消费者组与 Broker 之间的交互")]),a._v(";")]),a._v(" "),e("p",[a._v("• 如果你擅长与消费者组完全不相关的 Producer，那么就可以这么说:“"),e("code",[a._v("消费者组要消 费的数据完全来自于 Producer 端生产的消息，我对 Producer 还是比较熟悉的")]),a._v("。”")]),a._v(" "),e("h3",{attrs:{id:"_3、在-kafka-中-zookeeper-的作用是什么"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#_3、在-kafka-中-zookeeper-的作用是什么"}},[a._v("#")]),a._v(" 3、在 Kafka 中，ZooKeeper 的作用是什么?")]),a._v(" "),e("p",[a._v("这是一道能够帮助你脱颖而出的题目。碰到这个题目，请在心中暗笑三声。")]),a._v(" "),e("p",[a._v("目前，Kafka 使用 ZooKeeper 存放集群元数据、成员管理、Controller 选举，以及其他一些管理类任务。之后，等 KIP-500 提案完成后，Kafka 将完全不再依赖 于 ZooKeeper。")]),a._v(" "),e("p",[a._v("记住，"),e("code",[a._v("一定要突出“目前”")]),a._v("，以彰显你非常了解社区的演进计划。“存放元数据”是指主题 分区的所有数据都保存在 ZooKeeper 中，且以它保存的数据为权威，其他“人”都要与它 保持对齐。“成员管理”是指 Broker 节点的注册、注销以及属性变更，等 等。“Controller 选举”是指选举集群 Controller，而其他管理类任务包括但不限于主题 删除、参数配置等。")]),a._v(" "),e("p",[a._v("不过，抛出 KIP-500 也可能是个双刃剑。碰到非常资深的面试官，他可能会进一步追问你 KIP-500 是做的。一言以蔽之:KIP-500 思想，"),e("code",[a._v("是使用社区自研的基于 Raft 的共识算法， 替代 ZooKeeper，实现 Controller 自选举。")])]),a._v(" "),e("h3",{attrs:{id:"_4、解释下-kafka-中位移-offset-的作用"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#_4、解释下-kafka-中位移-offset-的作用"}},[a._v("#")]),a._v(" 4、解释下 Kafka 中位移(offset)的作用")]),a._v(" "),e("p",[a._v("在 Kafka 中，每个 主题分区下的每条消息都被赋予了一个唯一的 ID 数值，用于标识它在分区中的位置。这个 ID 数值，就被称为位移，或者叫偏移量。一旦消息被写入到分区日志，它的位移值将不能 被修改。")]),a._v(" "),e("p",[a._v("答完这些之后，你还可以把整个面试方向转移到你希望的地方。常见方法有以下 3 种:")]),a._v(" "),e("ol",[e("li",[e("p",[a._v("如果你深谙 Broker 底层日志写入的逻辑，可以强调下消息在日志中的存放格式;")])]),a._v(" "),e("li",[e("p",[a._v("如果你明白位移值一旦被确定不能修改，可以强调下“Log Cleaner 组件都不能影响位 移值”这件事情;")])]),a._v(" "),e("li",[e("p",[a._v("如果你对消费者的概念还算熟悉，可以再详细说说位移值和消费者位移值之间的区别。")])])]),a._v(" "),e("h3",{attrs:{id:"_5、阐述下-kafka-中的领导者副本-leader-replica-和追随者副本-follower-replica-的区别"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#_5、阐述下-kafka-中的领导者副本-leader-replica-和追随者副本-follower-replica-的区别"}},[a._v("#")]),a._v(" 5、阐述下 Kafka 中的领导者副本(Leader Replica)和追随者副本 (Follower Replica)的区别")]),a._v(" "),e("p",[a._v("这道题表面上是考核你对 Leader 和 Follower 区别的理解，但很容易引申到 Kafka 的同步 机制上。因此，我建议你主动出击，一次性地把隐含的考点也答出来，也许能够暂时把面试 官“唬住”，并体现你的专业性。")]),a._v(" "),e("p",[e("code",[a._v("Kafka 副本当前分为领导者副本和追随者副本。只有 Leader 副本才能 对外提供读写服务，响应 Clients 端的请求。Follower 副本只是采用拉(PULL)的方 式，被动地同步 Leader 副本中的数据，并且在 Leader 副本所在的 Broker 宕机后，随时 准备应聘 Leader 副本。")])]),a._v(" "),e("p",[a._v("通常来说，回答到这个程度，其实才只说了 60%，因此，我建议你再回答两个额外的加分 项。")]),a._v(" "),e("p",[a._v("• "),e("code",[a._v("强调 Follower 副本也能对外提供读服务")]),a._v("。自 Kafka 2.4 版本开始，社区通过引入新的 Broker 端参数，允许 Follower 副本有限度地提供读服务。")]),a._v(" "),e("p",[a._v("• "),e("code",[a._v("强调 Leader 和 Follower 的消息序列在实际场景中不一致")]),a._v("。很多原因都可能造成 Leader 和 Follower 保存的消息序列不一致，比如程序 Bug、网络问题等。这是很严重 的错误，必须要完全规避。你可以补充下，之前确保一致性的主要手段是高水位机制， 但高水位值无法保证 Leader 连续变更场景下的数据一致性，因此，社区引入了 Leader Epoch 机制，来修复高水位值的弊端。关于“Leader Epoch 机制”，国内的资料不是 很多，它的普及度远不如高水位，不妨大胆地把这个概念秀出来，力求惊艳一把。")]),a._v(" "),e("h2",{attrs:{id:"实操题目"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#实操题目"}},[a._v("#")]),a._v(" 实操题目")]),a._v(" "),e("h3",{attrs:{id:"_6、如何设置-kafka-能接收的最大消息的大小"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#_6、如何设置-kafka-能接收的最大消息的大小"}},[a._v("#")]),a._v(" 6、如何设置 Kafka 能接收的最大消息的大小?")]),a._v(" "),e("p",[e("code",[a._v("这道题除了要回答消费者端的参数设置之外，一定要加上 Broker 端的设置，这样才算完整")]),a._v("。毕竟，如果 Producer 都不能向 Broker 端发送数据很大的消息，又何来消费一说呢? 因此，你需要同时设置 Broker 端参数和 Consumer 端参数。")]),a._v(" "),e("p",[a._v("• Broker 端参数:message.max.bytes、max.message.bytes(主题级别)和 replica.fetch.max.bytes。")]),a._v(" "),e("p",[a._v("• Consumer 端参数:fetch.message.max.bytes。")]),a._v(" "),e("p",[a._v("Broker 端的最后一个参数比较容易遗漏。我们必须调整 Follower 副本能够接收的最大消 息的大小，否则，副本同步就会失败。因此，把这个答出来的话，就是一个加分项。")]),a._v(" "),e("h3",{attrs:{id:"_7、监控-kafka-的框架都有哪些"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#_7、监控-kafka-的框架都有哪些"}},[a._v("#")]),a._v(" 7、监控 Kafka 的框架都有哪些?")]),a._v(" "),e("p",[a._v("面试官其实是在 考察你对监控框架的了解广度，或者说，你是否知道很多能监控 Kafka 的框架或方法。下 面这些就是 Kafka 发展历程上比较有名气的监控系统。")]),a._v(" "),e("ol",[e("li",[e("p",[a._v("Kafka Manager:应该算是最有名的专属 Kafka 监控框架了，是独立的监控系统。")])]),a._v(" "),e("li",[e("p",[a._v("Kafka Monitor:LinkedIn 开源的免费框架，支持对集群进行系统测试，并实时监控测试结果。")])]),a._v(" "),e("li",[e("p",[a._v("CruiseControl:也是 LinkedIn 公司开源的监控框架，用于实时监测资源使用率，以及 提供常用运维操作等。无 UI 界面，只提供 REST API。")])]),a._v(" "),e("li",[e("p",[a._v("JMX 监控:由于 Kafka 提供的监控指标都是基于 JMX 的，因此，市面上任何能够集成 JMX 的框架都可以使用，比如 Zabbix 和 Prometheus。")])]),a._v(" "),e("li",[e("p",[a._v("已有大数据平台自己的监控体系:像 Cloudera 提供的 CDH 这类大数据平台，天然就提 供 Kafka 监控方案。")])]),a._v(" "),e("li",[e("p",[a._v("JMXTool:社区提供的命令行工具，能够实时监控 JMX 指标。答上这一条，属于绝对 的加分项，因为知道的人很少，而且会给人一种你对 Kafka 工具非常熟悉的感觉。如果 你暂时不了解它的用法，可以在命令行以无参数方式执行一下kafka-run-class.sh kafka.tools.JmxTool，学习下它的用法。")])])]),a._v(" "),e("h3",{attrs:{id:"_8、broker-的-heap-size-如何设置"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#_8、broker-的-heap-size-如何设置"}},[a._v("#")]),a._v(" 8、Broker 的 Heap Size 如何设置?")]),a._v(" "),e("p",[a._v("如何设置 Heap Size 的问题，其实和 Kafka 关系不大，它是一类非常通用的面试题目。一 旦你应对不当，面试方向很有可能被引到 JVM 和 GC 上去，那样的话，你被问住的几率就 会增大。因此，我建议你简单地介绍一下 Heap Size 的设置方法，并把重点放在 Kafka Broker 堆大小设置的最佳实践上。")]),a._v(" "),e("p",[a._v("比如，你可以这样回复:"),e("code",[a._v("任何 Java 进程 JVM 堆大小的设置都需要仔细地进行考量和测 试。一个常见的做法是，以默认的初始 JVM 堆大小运行程序，当系统达到稳定状态后，手动触发一次 Full GC，然后通过 JVM 工具查看 GC 后的存活对象大小。之后，将堆大小设 置成存活对象总大小的 1.5~2 倍。对于 Kafka 而言，这个方法也是适用的。不过，业界有 个最佳实践，那就是将 Broker 的 Heap Size 固定为 6GB。经过很多公司的验证，这个大 小是足够且良好的。")])]),a._v(" "),e("h3",{attrs:{id:"_9、如何估算-kafka-集群的机器数量"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#_9、如何估算-kafka-集群的机器数量"}},[a._v("#")]),a._v(" 9、如何估算 Kafka 集群的机器数量?")]),a._v(" "),e("p",[a._v("这道题目考查的是"),e("code",[a._v("机器数量和所用资源之间的关联关系")]),a._v("。所谓资源，也就是 CPU、内存、磁盘和带宽。")]),a._v(" "),e("p",[a._v("通常来说，CPU 和内存资源的充足是比较容易保证的，因此，你需要从磁盘空间和带宽占用两个维度去评估机器数量。")]),a._v(" "),e("p",[a._v("在预估磁盘的占用时，你一定不要忘记计算副本同步的开销。如果一条消息占用 1KB 的磁 盘空间，那么，在有 3 个副本的主题中，你就需要 3KB 的总空间来保存这条消息。显式地 将这些考虑因素答出来，能够彰显你考虑问题的全面性，是一个难得的加分项。")]),a._v(" "),e("p",[a._v("对于评估带宽来说，常见的带宽有 1Gbps 和 10Gbps，但你要切记，"),e("code",[a._v("这两个数字仅仅是最大值")]),a._v("。因此，你最好和面试官确认一下给定的带宽是多少。然后，明确阐述出当带宽占用接 近总带宽的 90% 时，丢包情形就会发生。这样能显示出你的网络基本功。")]),a._v(" "),e("h3",{attrs:{id:"_10、leader-总是-1-怎么破"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#_10、leader-总是-1-怎么破"}},[a._v("#")]),a._v(" 10、Leader 总是 -1，怎么破?")]),a._v(" "),e("p",[a._v("在生产环境中，你一定碰到过“某个主题分区不能工作了”的情形。使用命令行查看状态的 话，会发现 Leader 是 -1，于是，你使用各种命令都无济于事，最后只能用“重启大 法”。")]),a._v(" "),e("p",[a._v("但是，有没有什么办法，可以不重启集群，就能解决此事呢?这就是此题的由来。")]),a._v(" "),e("p",[a._v("我直接给答案:"),e("code",[a._v("删除 ZooKeeper 节点 /controller，触发 Controller 重选举。 Controller 重选举能够为所有主题分区重刷分区状态，可以有效解决因不一致导致的 Leader 不可用问题")]),a._v("。我几乎可以断定，当面试官问出此题时，要么就是他真的不知道怎么 解决在向你寻求答案，要么他就是在等你说出这个答案。所以，千万别一上来就说“来个重 启”之类的话。")]),a._v(" "),e("h2",{attrs:{id:"炫技式题目"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#炫技式题目"}},[a._v("#")]),a._v(" 炫技式题目")]),a._v(" "),e("p",[a._v("后续补充")]),a._v(" "),e("h2",{attrs:{id:"深度思考题"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#深度思考题"}},[a._v("#")]),a._v(" 深度思考题")]),a._v(" "),e("p",[a._v("后续补充")])])}),[],!1,null,null,null);e.default=v.exports}}]);