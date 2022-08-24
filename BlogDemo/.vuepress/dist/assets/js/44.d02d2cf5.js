(window.webpackJsonp=window.webpackJsonp||[]).push([[44],{461:function(v,_,t){"use strict";t.r(_);var p=t(2),a=Object(p.a)({},(function(){var v=this,_=v._self._c;return _("ContentSlotsDistributor",{attrs:{"slot-key":v.$parent.slotKey}},[_("p",[v._v("分布式事务区别于本地事务，是指事务的操作位于不同的节点上，需要保证事务的 AICD 特性。常见的分布式事务场景：跨银行转操作就涉及调用两个异地银行服务。")]),v._v(" "),_("p",[v._v("常见的分布式事务解决方案有：XA协议（2PC和3PC）、TCC、本地消息表、消息事务和最大努力通知。")]),v._v(" "),_("h3",{attrs:{id:"一、两阶段提交-2pc"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#一、两阶段提交-2pc"}},[v._v("#")]),v._v(" 一、两阶段提交（2PC）")]),v._v(" "),_("p",[v._v("两阶段提交（Two-phase Commit，2PC），通过引入协调者（Coordinator）来协调参与者的行为，并最终决定这些参与者是否要真正执行事务。2PC是一种强一致性设计，通过引入一个事务协调者的角色来协调管理各参与者（也可称之为各本地资源）的提交和回滚，二阶段分别指的是准备（投票）和提交两个阶段。")]),v._v(" "),_("p",[_("code",[v._v("1、两阶段")])]),v._v(" "),_("p",[v._v("1）准备阶段\n协调者询问参与者事务是否执行成功，参与者发回事务执行结果。")]),v._v(" "),_("p",[v._v("2）提交阶段")]),v._v(" "),_("p",[v._v("如果事务在每个参与者上都执行成功，事务协调者发送通知让参与者提交事务；否则，协调者发送通知让参与者回滚事务。\n需要注意的是，在准备阶段，参与者执行了事务，但是还未提交。只有在提交阶段接收到协调者发来的通知后，才进行提交或者回滚。")]),v._v(" "),_("p",[_("code",[v._v("2、具体流程")])]),v._v(" "),_("p",[v._v("1）"),_("code",[v._v("准备阶段")]),v._v("协调者会给各参与者发送准备命令，可以把准备命令理解成除了提交事务之外啥事都做完了。")]),v._v(" "),_("p",[v._v("同步等待所有资源的响应之后就进入第二阶段即提交阶段（注意提交阶段不一定是提交事务，也可能是回滚事务）。\n假如在第一阶段所有参与者都返回准备成功，那么协调者则向所有参与者发送提交事务命令，然后等待所有事务都提交成功之后，返回事务执行成功。")]),v._v(" "),_("p",[_("img",{attrs:{src:"https://img-blog.csdnimg.cn/6b0a1ff0d5fb40c397288b6ac52252a8.png",alt:"在这里插入图片描述"}})]),v._v(" "),_("p",[v._v("2）假如在第一阶段有一个参与者返回失败，那么协调者就会向所有参与者发送回滚事务的请求，即分布式事务执行失败。")]),v._v(" "),_("p",[_("img",{attrs:{src:"https://img-blog.csdnimg.cn/bf098174895345d9bdcf9ed4ef4c069e.png",alt:"在这里插入图片描述"}})]),v._v(" "),_("p",[v._v("那可能就有人问了，那第二阶段提交失败的话呢？")]),v._v(" "),_("p",[v._v("这里有两种情况。")]),v._v(" "),_("p",[v._v("第一种是"),_("code",[v._v("第二阶段执行的是回滚事务操作")]),v._v("，那么答案是不断重试，直到所有参与者都回滚了，不然那些在第一阶段准备成功的参与者会一直阻塞着。")]),v._v(" "),_("p",[v._v("第二种是第二阶段执行的是提交事务操作，那么答案也是不断重试，因为有可能一些参与者的事务已经提交成功了，这个时候只有一条路，就是头铁往前冲，不断的重试，直到提交成功，到最后真的不行只能人工介入处理。")]),v._v(" "),_("p",[v._v("3、存在的问题")]),v._v(" "),_("p",[v._v("1）"),_("code",[v._v("同步阻塞")]),v._v("   所有事务参与者在等待其它参与者响应的时候都处于同步阻塞状态，无法进行其它操作。")]),v._v(" "),_("p",[v._v("2）"),_("code",[v._v("单点问题")]),v._v("   协调者在 2PC 中起到非常大的作用，发生故障将会造成很大影响。特别是在阶段二发生故障，所有参与者会一直等待状态，无法完成其它操作。")]),v._v(" "),_("p",[v._v("3）"),_("code",[v._v("数据不一致")]),v._v("   在阶段二，如果协调者只发送了部分 Commit 消息，此时网络发生异常，那么只有部分参与者接收到 Commit 消息，也就是说只有部分参与者提交了事务，使得系统数据不一致。")]),v._v(" "),_("p",[v._v("4）"),_("code",[v._v("太过保守")]),v._v(" 任意一个节点失败就会导致整个事务失败，没有完善的容错机制。")]),v._v(" "),_("h3",{attrs:{id:"二、三阶段提交-3pc"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#二、三阶段提交-3pc"}},[v._v("#")]),v._v(" 二、三阶段提交（3PC）")]),v._v(" "),_("p",[v._v("3PC 的出现是为了解决 2PC 的一些问题，相比于 2PC 它在参与者中也引入了超时机制，并且新增了一个阶段使得参与者可以利用这一个阶段统一各自的状态。")]),v._v(" "),_("p",[v._v("1、三阶段")]),v._v(" "),_("p",[v._v("3PC 包含了三个阶段，分别是准备阶段、预提交阶段和提交阶段，对应的英文就是：CanCommit、PreCommit 和 DoCommit。")]),v._v(" "),_("p",[v._v("看起来是把 2PC 的提交阶段变成了预提交阶段和提交阶段，但是 3PC 的准备阶段协调者只是询问参与者的自身状况，比如你现在还好吗？负载重不重？这类的。而预提交阶段就是和 2PC 的准备阶段一样，除了事务的提交该做的都做了。")]),v._v(" "),_("p",[v._v("2、具体流程")]),v._v(" "),_("p",[_("img",{attrs:{src:"https://img-blog.csdnimg.cn/42a8e0d5f7d84045b83289ee5516e8cb.png",alt:"在这里插入图片描述"}})]),v._v(" "),_("p",[v._v("3、总结")]),v._v(" "),_("p",[v._v("总结一下， 3PC 相对于 2PC 做了一定的改进：引入了参与者超时机制，并且增加了预提交阶段使得故障恢复之后协调者的决策复杂度降低，但整体的交互过程更长了，性能有所下降，并且还是会存在数据不一致问题。")]),v._v(" "),_("p",[v._v("所以 2PC 和 3PC 都不能保证数据100%一致，因此一般都需要有定时扫描补偿机制。")]),v._v(" "),_("p",[v._v("我再说下 3PC 我没有找到具体的实现，所以我认为 3PC 只是纯的理论上的东西，而且可以看到相比于 2PC 它是做了一些努力但是效果甚微，所以只做了解即可。")]),v._v(" "),_("h3",{attrs:{id:"三、补偿事务-tcc"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#三、补偿事务-tcc"}},[v._v("#")]),v._v(" 三、补偿事务（TCC）")]),v._v(" "),_("p",[v._v("1、TCC")]),v._v(" "),_("p",[_("code",[v._v("2PC 和 3PC 都是数据库层面的，而 TCC 是业务层面的分布式事务")]),v._v("，就像我前面说的分布式事务不仅仅包括数据库的操作，还包括发送短信等，这时候 TCC 就派上用场了！")]),v._v(" "),_("p",[v._v("TCC 其实就是采用的补偿机制，其核心思想是：针对每个操作，都要注册一个与其对应的确认和补偿（撤销）操作。它分为三个阶段：")]),v._v(" "),_("p",[v._v("·Try 阶段主要是对业务系统做检测及资源预留")]),v._v(" "),_("p",[v._v("·Confirm 阶段主要是对业务系统做确认提交，Try阶段执行成功并开始执行 Confirm阶段时，默认 Confirm阶段是不会出错的。即：只要Try成功，Confirm一定成功。")]),v._v(" "),_("p",[v._v("·Cancel 阶段主要是在业务执行错误，需要回滚的状态下执行的业务取消，预留资源释放。")]),v._v(" "),_("p",[v._v("举个例子，假入 Bob 要向 Smith 转账，思路大概是： 我们有一个本地方法，里面依次调用")]),v._v(" "),_("p",[v._v("1）首先在 Try 阶段，要先调用远程接口把 Smith 和 Bob 的钱给冻结起来。")]),v._v(" "),_("p",[v._v("2）在 Confirm 阶段，执行远程调用的转账的操作，转账成功进行解冻。")]),v._v(" "),_("p",[v._v("3）如果第2步执行成功，那么转账成功，如果第二步执行失败，则调用远程冻结接口对应的解冻方法 (Cancel)。")]),v._v(" "),_("p",[v._v("2、优缺点")]),v._v(" "),_("p",[_("code",[v._v("TCC 对业务的侵入较大和业务紧耦合")]),v._v("，需要根据特定的场景和业务逻辑来设计相应的操作。还有一点要注意，撤销和确认操作的执行可能需要重试，因此还需要保证操作的幂等。相对于 2PC、3PC ，TCC 适用的范围更大，但是开发量也更大，毕竟都在业务上实现，而且有时候你会发现这三个方法还真不好写。不过也因为是在业务上实现的，所以TCC可以跨数据库、跨不同的业务系统来实现事务。")]),v._v(" "),_("p",[v._v("优点： 跟2PC比起来，实现以及流程相对简单了一些，但数据的一致性比2PC也要差一些。\n缺点： 缺点还是比较明显的，在2,3步中都有可能失败。TCC属于应用层的一种补偿方式，所以需要程序员在实现的时候多写很多补偿的代码，在一些场景中，一些业务流程可能用TCC不太好定义及处理。")]),v._v(" "),_("h3",{attrs:{id:"四、本地消息表-异步确保"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#四、本地消息表-异步确保"}},[v._v("#")]),v._v(" 四、本地消息表（异步确保）")]),v._v(" "),_("p",[v._v("本地消息表与业务数据表处于同一个数据库中，这样就能利用本地事务来保证在对这两个表的操作满足事务特性，并且使用了消息队列来保证最终一致性。")]),v._v(" "),_("p",[v._v("1、在分布式事务操作的一方完成写业务数据的操作之后向本地消息表发送一个消息，本地事务能保证这个消息一定会被写入本地消息表中。")]),v._v(" "),_("p",[v._v("2、之后将本地消息表中的消息转发到 Kafka 等消息队列中，如果转发成功则将消息从本地消息表中删除，否则继续重新转发。")]),v._v(" "),_("p",[v._v("3、在分布式事务操作的另一方从消息队列中读取一个消息，并执行消息中的操作。")]),v._v(" "),_("p",[_("img",{attrs:{src:"https://img-blog.csdnimg.cn/1056eb064c30463b828d02a33fb9fe94.png",alt:"在这里插入图片描述"}})]),v._v(" "),_("p",[v._v("优点： 一种非常经典的实现，避免了分布式事务，实现了最终一致性。")]),v._v(" "),_("p",[v._v("缺点： 消息表会耦合到业务系统中，如果没有封装好的解决方案，会有很多杂活需要处理。")]),v._v(" "),_("h3",{attrs:{id:"五、消息事务"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#五、消息事务"}},[v._v("#")]),v._v(" 五、消息事务")]),v._v(" "),_("p",[v._v("有一些第三方的MQ是支持事务消息的，比如RocketMQ，他们支持事务消息的方式也是类似于采用的二阶段提交，但是市面上一些主流的MQ都是不支持事务消息的，比如 RabbitMQ 和 Kafka 都不支持。")]),v._v(" "),_("p",[v._v("以阿里的 RocketMQ 中间件为例，其思路大致为：")]),v._v(" "),_("p",[v._v("第一阶段Prepared消息，会拿到消息的地址。 第二阶段执行本地事务，第三阶段通过第一阶段拿到的地址去访问消息，并修改状态。")]),v._v(" "),_("p",[v._v("也就是说在业务方法内要想消息队列提交两次请求，一次发送消息和一次确认消息。如果确认消息发送失败了RocketMQ会定期扫描消息集群中的事务消息，这时候发现了Prepared消息，它会向消息发送者确认，所以生产方需要实现一个check接口，RocketMQ会根据发送端设置的策略来决定是回滚还是继续发送确认消息。这样就保证了消息发送与本地事务同时成功或同时失败。")]),v._v(" "),_("p",[_("img",{attrs:{src:"https://img-blog.csdnimg.cn/69878dc9d63e4b68981de97292e2d572.png",alt:"在这里插入图片描述"}})]),v._v(" "),_("h3",{attrs:{id:"六、最大努力通知"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#六、最大努力通知"}},[v._v("#")]),v._v(" 六、最大努力通知")]),v._v(" "),_("p",[v._v("其实我觉得本地消息表也可以算最大努力，事务消息也可以算最大努力。")]),v._v(" "),_("p",[v._v("就本地消息表来说会有后台任务定时去查看未完成的消息，然后去调用对应的服务，当一个消息多次调用都失败的时候可以记录下然后引入人工，或者直接舍弃。这其实算是最大努力了。")]),v._v(" "),_("p",[v._v("事务消息也是一样，当半消息被commit了之后确实就是普通消息了，如果订阅者一直不消费或者消费不了则会一直重试，到最后进入死信队列。其实这也算最大努力。\n所以最大努力通知其实只是表明了一种柔性事务的思想：我已经尽力我最大的努力想达成事务的最终一致了。")]),v._v(" "),_("p",[v._v("适用于对时间不敏感的业务，例如短信通知。")]),v._v(" "),_("h3",{attrs:{id:"七、总结"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#七、总结"}},[v._v("#")]),v._v(" 七、总结")]),v._v(" "),_("p",[v._v("可以看出 2PC 和 3PC 是一种强一致性事务，不过还是有数据不一致，阻塞等风险，而且只能用在数据库层面。")]),v._v(" "),_("p",[v._v("而 TCC 是一种补偿性事务思想，适用的范围更广，在业务层面实现，因此对业务的侵入性较大，每一个操作都需要实现对应的三个方法。")]),v._v(" "),_("p",[v._v("本地消息、事务消息和最大努力通知其实都是最终一致性事务，因此适用于一些对时间不敏感的业务。")])])}),[],!1,null,null,null);_.default=a.exports}}]);