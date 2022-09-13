(window.webpackJsonp=window.webpackJsonp||[]).push([[72],{532:function(_,v,e){"use strict";e.r(v);var t=e(1),p=Object(t.a)({},(function(){var _=this,v=_._self._c;return v("ContentSlotsDistributor",{attrs:{"slot-key":_.$parent.slotKey}},[v("h3",{attrs:{id:"一、为什么要使用分布式锁"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#一、为什么要使用分布式锁"}},[_._v("#")]),_._v(" 一、为什么要使用分布式锁？")]),_._v(" "),v("p",[_._v("为了保证一个方法在高并发情况下的同一时间只能被同一个线程执行，在传统单体应用单机部署的情况下，可以使用Java并发处理相关的API(如ReentrantLcok或synchronized)进行互斥控制。但是，随着业务发展的需要，原单体单机部署的系统被演化成分布式系统后，由于分布式系统多线程、多进程并且分布在不同机器上，这将使原单机部署情况下的并发控制锁策略失效，为了解决这个问题就需要一种跨JVM的互斥机制来控制共享资源的访问，这就是分布式锁要解决的问题。")]),_._v(" "),v("p",[v("img",{attrs:{src:"https://img-blog.csdnimg.cn/ce4a3b51ded44965b5cbb107142f72eb.png",alt:"在这里插入图片描述"}})]),_._v(" "),v("h3",{attrs:{id:"二、分布式锁需要具备的条件"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#二、分布式锁需要具备的条件"}},[_._v("#")]),_._v(" 二、分布式锁需要具备的条件")]),_._v(" "),v("p",[_._v("分布式锁应该具备的条件，如下")]),_._v(" "),v("p",[_._v("·在分布式系统环境下，一个方法在同一时间只能被一个机器的一个线程执行；")]),_._v(" "),v("p",[_._v("·高可用的获取锁与释放锁；")]),_._v(" "),v("p",[_._v("·高性能的获取锁与释放锁；")]),_._v(" "),v("p",[_._v("·具备可重入特性；")]),_._v(" "),v("p",[_._v("·具备锁失效机制，防止死锁；")]),_._v(" "),v("p",[_._v("·具备非阻塞锁特性，即没有获取到锁将直接返回获取锁失败。")]),_._v(" "),v("h3",{attrs:{id:"三、分布式锁的三种实现方式"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#三、分布式锁的三种实现方式"}},[_._v("#")]),_._v(" 三、分布式锁的三种实现方式")]),_._v(" "),v("p",[_._v("目前几乎很多大型网站及应用都是分布式部署的，分布式场景中的数据一致性问题一直是一个比较重要的话题。分布式的CAP理论告诉我们“任何一个分布式系统都无法同时满足一致性（Consistency）、可用性（Availability）和分区容错性（Partition tolerance），最多只能同时满足两项。”所以，很多系统在设计之初就要对这三者做出取舍。在互联网领域的绝大多数的场景中，都需要牺牲强一致性来换取系统的高可用性，系统往往只需要保证“最终一致性”，只要这个最终时间是在用户可以接受的范围内即可。")]),_._v(" "),v("p",[_._v("在很多场景中，我们为了保证数据的最终一致性，需要很多的技术方案来支持，比如分布式事务、分布式锁等。有的时候，我们需要保证一个方法在同一时间内只能被同一个线程执行。")]),_._v(" "),v("p",[v("img",{attrs:{src:"https://img-blog.csdnimg.cn/855cdbfb3a1f46f4aa50afe29b80b04f.png",alt:"在这里插入图片描述"}})]),_._v(" "),v("p",[_._v("尽管有这三种方案，但是不同的业务也要根据自己的情况进行选型，他们之间没有最好只有更适合！")]),_._v(" "),v("h4",{attrs:{id:"_1、基于数据库的实现方式"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#_1、基于数据库的实现方式"}},[_._v("#")]),_._v(" 1、基于数据库的实现方式")]),_._v(" "),v("p",[_._v("基于数据库的实现方式的核心思想是：在数据库中创建一个表，表中包含方法名等字段，并在方法名字段上创建唯一索引，想要执行某个方法，就使用这个方法名向表中插入数据，成功插入则获取锁，执行完成后删除对应的行数据释放锁。")]),_._v(" "),v("p",[v("code",[_._v("注意：唯一索引是基于数据库的一种基本玩法，使用数据库实现分布式锁还有很多其他的玩法！")])]),_._v(" "),v("p",[_._v("使用基于数据库的这种实现方式很简单，但是对于分布式锁应该具备的条件来说，它有一些问题需要解决及优化：")]),_._v(" "),v("p",[_._v("·因为是基于数据库实现的，数据库的可用性和性能将直接影响分布式锁的可用性及性能，所以，数据库需要双机部署、数据同步、主备切换；")]),_._v(" "),v("p",[_._v("·不具备可重入的特性，因为同一个线程在释放锁之前，行数据一直存在，无法再次成功插入数据，所以，需要在表中新增一列，用于记录当前获取到锁的机器和线程信息，在再次获取锁的时候，先查询表中机器和线程信息是否和当前机器和线程相同，若相同则直接获取锁；")]),_._v(" "),v("p",[_._v("·没有锁失效机制，因为有可能出现成功插入数据后，服务器宕机了，对应的数据没有被删除，当服务恢复后一直获取不到锁，所以，需要在表中新增一列，用于记录失效时间，并且需要有定时任务清除这些失效的数据；")]),_._v(" "),v("p",[_._v("·不具备阻塞锁特性，获取不到锁直接返回失败，所以需要优化获取逻辑，循环多次去获取。")]),_._v(" "),v("p",[_._v("·在实施的过程中会遇到各种不同的问题，为了解决这些问题，实现方式将会越来越复杂；依赖数据库需要一定的资源开销，性能问题需要考虑。")]),_._v(" "),v("p",[_._v("1）优点：借助数据库，方案简单。")]),_._v(" "),v("p",[_._v("2）缺点：在实际实施的过程中会遇到各种不同的问题，为了解决这些问题，实现方式将会越来越复杂；依赖数据库需要一定的资源开销，性能问题需要考虑")]),_._v(" "),v("h4",{attrs:{id:"_2、基于redis的实现方式"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#_2、基于redis的实现方式"}},[_._v("#")]),_._v(" 2、基于Redis的实现方式")]),_._v(" "),v("p",[v("code",[_._v("1、选用Redis实现分布式锁原因")])]),_._v(" "),v("p",[_._v("（1）Redis有很高的性能；\n（2）Redis命令对此支持较好，实现起来比较方便")]),_._v(" "),v("p",[v("code",[_._v("2、使用命令介绍")])]),_._v(" "),v("p",[_._v("（1）SETNX")]),_._v(" "),v("p",[v("img",{attrs:{src:"https://img-blog.csdnimg.cn/f6a58708ca0a4b6d89390126143e5ad5.png",alt:"在这里插入图片描述"}})]),_._v(" "),v("p",[_._v("（2）expire")]),_._v(" "),v("p",[v("img",{attrs:{src:"https://img-blog.csdnimg.cn/d42f756e35a14c6796c16041671371b2.png",alt:"在这里插入图片描述"}})]),_._v(" "),v("p",[_._v("（3）delete")]),_._v(" "),v("p",[v("img",{attrs:{src:"https://img-blog.csdnimg.cn/f93e618fc4e74bbbae47df6a790f1a8f.png",alt:"在这里插入图片描述"}})]),_._v(" "),v("p",[_._v("在使用Redis实现分布式锁的时候，主要就会使用到这三个命令。")]),_._v(" "),v("p",[v("code",[_._v("3、实现思想")])]),_._v(" "),v("p",[_._v("（1）获取锁的时候，使用setnx加锁，并使用expire命令为锁添加一个超时时间，超过该时间则自动释放锁，锁的value值为一个随机生成的UUID，通过此在释放锁的时候进行判断。")]),_._v(" "),v("p",[_._v("（2）获取锁的时候还设置一个获取的超时时间，若超过这个时间则放弃获取锁。")]),_._v(" "),v("p",[_._v("（3）释放锁的时候，通过UUID判断是不是该锁，若是该锁，则执行delete进行锁释放。")]),_._v(" "),v("p",[v("code",[_._v("4、代码实现")])]),_._v(" "),v("p",[_._v("1）方法一：使用setnx命令加锁")]),_._v(" "),v("p",[v("img",{attrs:{src:"https://img-blog.csdnimg.cn/8f25f8e01875475fa4554399ee748740.png",alt:"在这里插入图片描述"}})]),_._v(" "),v("p",[_._v("「代码解释：」")]),_._v(" "),v("p",[_._v("·setnx命令，意思就是 set if not exist，如果lockKey不存在，把key存入Redis，保存成功后如果result返回1，表示设置成功，如果非1，表示失败，别的线程已经设置过了。")]),_._v(" "),v("p",[_._v("·expire()，设置过期时间，防止死锁，假设，如果一个锁set后，一直不删掉，那这个锁相当于一直存在，产生死锁。")]),_._v(" "),v("p",[_._v("（讲到这里，我还要和面试官强调一个“但是”）")]),_._v(" "),v("p",[_._v("思考，我上面的方法哪里与缺陷？继续给面试官解释...")]),_._v(" "),v("p",[_._v("加锁总共分两步，第一步jedis.setnx，第二步jedis.expire设置过期时间，setnx与expire不是一个原子操作，如果程序执行完第一步后异常了，第二步jedis.expire(lockKey, expireTime)没有得到执行，相当于这个锁没有过期时间，有产生死锁的可能。正对这个问题如何改进？")]),_._v(" "),v("p",[_._v("2）方法二：改进")]),_._v(" "),v("p",[v("img",{attrs:{src:"https://img-blog.csdnimg.cn/b2f67833311c4e498cb08867be375ad3.png",alt:"在这里插入图片描述"}})]),_._v(" "),v("p",[_._v("「代码解释：」\n将加锁和设置过期时间合二为一，一行代码搞定，原子操作。")]),_._v(" "),v("p",[_._v("(没等面试官开口追问，面试官很满意了)")]),_._v(" "),v("div",{staticClass:"language- extra-class"},[v("pre",[v("code",[_._v("「面试官：」那解锁操作呢？\n\n「我：」\n\n释放锁就是删除key\n\n「使用del命令解锁」\n")])])]),v("p",[v("img",{attrs:{src:"https://img-blog.csdnimg.cn/05e17b720eca495e8ec21a8a456676cf.png",alt:"在这里插入图片描述"}})]),_._v(" "),v("p",[_._v("「代码解释：」")]),_._v(" "),v("p",[_._v("通过 jedis 客户端的 eval 方法和 script 脚本一行代码搞定，解决方法一中的原子问题。")]),_._v(" "),v("p",[_._v("5、优缺点")]),_._v(" "),v("p",[_._v("优点：高性能，借助Redis实现比较方便。")]),_._v(" "),v("p",[_._v("缺点：线程获取锁后，如果处理时间过长会导致锁超时失效(失效时间我设置多长时间为好？如何设置的失效时间太短，方法没等执行完，锁就自动释放了，那么就会产生并发问题。如果设置的时间太长，其他获取锁的线程就可能要平白的多等一段时间。这个问题使用数据库实现分布式锁同样存在)，所以，通过超时时间来控制锁的失效时间并不是十分的靠谱。")]),_._v(" "),v("h4",{attrs:{id:"_3、基于zookeeper的实现方式"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#_3、基于zookeeper的实现方式"}},[_._v("#")]),_._v(" 3、基于zookeeper的实现方式")]),_._v(" "),v("p",[_._v("ZooKeeper是一个为分布式应用提供一致性服务的开源组件，它内部是一个分层的文件系统目录树结构，规定同一个目录下只能有一个唯一文件名。基于ZooKeeper实现分布式锁的步骤如下：")]),_._v(" "),v("p",[_._v("（1）创建一个目录mylock；")]),_._v(" "),v("p",[_._v("（2）线程A想获取锁就在mylock目录下创建临时顺序节点；")]),_._v(" "),v("p",[_._v("（3）获取mylock目录下所有的子节点，然后获取比自己小的兄弟节点，如果不存在，则说明当前线程顺序号最小，获得锁；")]),_._v(" "),v("p",[_._v("（4）线程B获取所有节点，判断自己不是最小节点，设置监听比自己次小的节点；")]),_._v(" "),v("p",[_._v("（5）线程A处理完，删除自己的节点，线程B监听到变更事件，判断自己是不是最小的节点，如果是则获得锁。")]),_._v(" "),v("p",[_._v("ZooKeeper内部是一个分层的文件系统目录树结构，规定同一个目录下只能有一个唯一文件名。大致思想即为：每个客户端对某个方法加锁时，在zookeeper上的与该方法对应的指定节点的目录下，生成一个唯一的瞬时有序节点。判断是否获取锁的方式很简单，只需要判断有序节点中序号最小的一个。当释放锁的时候，只需将这个瞬时节点删除即可。同时，其可以避免服务宕机导致的锁无法释放，而产生的死锁问题。")]),_._v(" "),v("p",[_._v("这里推荐一个Apache的开源库Curator，它是一个ZooKeeper客户端，Curator提供的InterProcessMutex是分布式锁的实现，acquire方法用于获取锁，release方法用于释放锁。")]),_._v(" "),v("p",[_._v("1）优点：具备高可用、可重入、阻塞锁特性，可解决失效死锁问题。")]),_._v(" "),v("p",[_._v("2）缺点：因为需要频繁的创建和删除节点，性能上不如Redis方式。")]),_._v(" "),v("h3",{attrs:{id:"四、三种方式对比"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#四、三种方式对比"}},[_._v("#")]),_._v(" 四、三种方式对比")]),_._v(" "),v("p",[_._v("1、数据库分布式锁实现缺点：")]),_._v(" "),v("p",[_._v("·db操作性能较差，并且有锁表的风险")]),_._v(" "),v("p",[_._v("·非阻塞操作失败后，需要轮询，占用cpu资源;")]),_._v(" "),v("p",[_._v("·长时间不commit或者长时间轮询，可能会占用较多连接资源")]),_._v(" "),v("p",[_._v("2、Redis(缓存)分布式锁实现缺点：")]),_._v(" "),v("p",[_._v("·锁删除失败 过期时间不好控制")]),_._v(" "),v("p",[_._v("·非阻塞，操作失败后，需要轮询，占用cpu资源;")]),_._v(" "),v("p",[_._v("3、ZK分布式锁实现缺点：")]),_._v(" "),v("p",[_._v("性能不如redis实现，主要原因是写操作（获取锁释放锁）都需要在Leader上执行，然后同步到follower。")]),_._v(" "),v("p",[_._v("4、总结")]),_._v(" "),v("p",[_._v("从理解的难易程度角度（从低到高）数据库 > 缓存 > Zookeeper")]),_._v(" "),v("p",[_._v("从实现的复杂性角度（从低到高）Zookeeper >= 缓存 > 数据库")]),_._v(" "),v("p",[_._v("从性能角度（从高到低）缓存 > Zookeeper >= 数据库")]),_._v(" "),v("p",[_._v("从可靠性角度（从高到低）Zookeeper > 缓存 > 数据库")])])}),[],!1,null,null,null);v.default=p.exports}}]);