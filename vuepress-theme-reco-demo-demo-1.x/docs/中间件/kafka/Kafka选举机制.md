### 知道leader选举的设计和策略kafka的高可用设计，具体选举的过程如何？

最简单最直观的方案是，leader在zk上创建一个临时节点，所有Follower对此节点注册监听，当leader宕机时，此时ISR里的所有Follower都尝试创建该节点，而创建成功者（Zookeeper保证只有一个能创建成功）即是新的Leader，其它Replica即为Follower。

实际上的实现思路也是这样，只是优化了下，多了个代理控制管理类（controller）。**引入的原因是，当kafka集群业务很多，partition达到成千上万时，当broker宕机时，造成集群内大量的调整，会造成大量Watch事件被触发，Zookeeper负载会过重。**zk是不适合大量写操作的。

* 增加删除topic

* 更新分区副本数量

* 选举分区leader

* 集群broker增加和宕机后的调整

* 当然还有自身的选举controller leader功能controller的功能被写的很重很复杂，代码也很乱，社区都不愿修改他的bug，有准备重构这个功能类。

contoller，zk，其他broker交互流程图。

这些功能都是controller通过监听Zookeeper间接节点出发，然后controller再跟其他的broker具体的去交互实现的（rpc的方式）。这种方式`makes the election process far cheaper and faster for a large number of partitions`

* controller的内部设计：

当前controller启动时会为集群中所有broker创建一个各自的连接。假设你的集群中有100台broker，那么controller启动时会创建100个Socket连接(也包括与它自己的连接！)。具体的类NetworkClient类，底层就是Java NIO reactor模型)。Controller会为每个连接都创建一个对应的请求发送线程（RequestSendThread）。

controller实现如上功能，要先熟悉kafka下zk上的数据存储结构：

```java
brokers列表：ls /brokers/ids
某个broker信息：get /brokers/ids/0
topic信息：get /brokers/topics/kafka10-topic-20170924
partition信息：get /brokers/topics/kafka10-topic-20170924/partitions/0/state
controller中心节点变更次数：get /controller_epoch
conrtoller leader信息：get /controller

broker机器id

某个broker信息

topic信息

partition信息

conrtoller leader信息
```

* partition的leader平衡工具的引入

为了能让partition和replica均匀的分布在broker上，防止一台机器负载较高。有如下分配算法：

将所有N Broker和待分配的i个Partition排序.

将第i个Partition分配到第(i mod n)个Broker上.

将第i个Partition的第j个副本分配到第((i + j) mod n)个Broker上

topic初始创建后，就会符合上述分配。

但是在集群leader又宕机后，此机器的所有partition的leader都会变化，当原来宕机的机器恢复后，加入到集群变成了follower。此时partition的leader就没有均匀的分布。

kafka提供配置参数，去自动触发均衡操作。也可以手动使用脚本触发。

举个例子，比如5个broker，10个分区，3个副本

partition和replica在broker上的分配例子

在新建topic的时，kafka集群按照上述方法去创建分配，leader是均匀分布的，但是时间久了，当某台机器宕机后，follower会变成leader，之前的leader在机器restart之后，赶上了进度，加入了ISR列表，此时变成了fowller，不在提供读写能力。这个时候就会存在leader分配不均的问题

kafka提供工具`kafka-preferred-replica-election.sh`去均衡partition的leader

实现思路是：

引入`preferred-replica`概念，ISR列表里，第一个replica就是preferred-replica，第一个加入列表的肯定是当前机器（就是当前的broker id）。broker宕机后变为follower，但是ISR的preferred-replica不会变，执行kafka-preferred-replica-election.sh脚本就是把****preferred-replica选为leader的过程。

上边是手动触发，也可以配置参数auto.leader.rebalance.enable=true，kafka监控到不均衡度达到多少时自动作均衡

新建一个topic kafka10-topic-20170928，partition的leader均匀分布

初始创建topic后分区信息

模拟broker0宕机后，controller由原来的0变成了2

broker0宕机后controller变更

原来partition1的leader是0，所以需要重新选举，从leader_epoch数字也能看出来，leader变成了2。同时三个partition的isr列表都少了broker0

broker0宕机后，分区状态信息

这个时候，重启broker0，预计下

1、由于broker0上的follower会赶上进度，三个partition的isr列表肯定会吧0都加上。

2、broker0加入集群后，partition1在broker0上的副本会是folllower，leader应该还是2

restart broker0后分区状态信息

嗯这个时候，能看出来leader是分配不均匀的。两个leader在broker2上，一个在broker1上。然后试验下自动均衡脚本工具：

`sh kafka-preferred-replica-election.sh --zookeeper localhost:2181`

执行kafka-preferred-replica-election.sh后

ok，执行后，partition的leader变回broker0（topic最初创建的时候）。分区的选举次数leader_epoch变量也+1

如果嫌kafka的replica分配不好，可以使用提供的工具kafka-reassign-partitions.sh







