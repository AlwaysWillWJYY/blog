(window.webpackJsonp=window.webpackJsonp||[]).push([[240],{699:function(_,v,e){"use strict";e.r(v);var t=e(1),a=Object(t.a)({},(function(){var _=this,v=_._self._c;return v("ContentSlotsDistributor",{attrs:{"slot-key":_.$parent.slotKey}},[v("h3",{attrs:{id:"一、mvcc介绍"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#一、mvcc介绍"}},[_._v("#")]),_._v(" 一、MVCC介绍")]),_._v(" "),v("p",[_._v("MVCC-多版本并发控制")]),_._v(" "),v("h4",{attrs:{id:"什么是当前读和快照读"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#什么是当前读和快照读"}},[_._v("#")]),_._v(" 什么是当前读和快照读？")]),_._v(" "),v("ul",[v("li",[_._v("当前读")])]),_._v(" "),v("p",[_._v("像select lock in share mode(共享锁)，select for update;update,insert,delete（排他锁）这些操作都是一种当前读。就是它读取的是记录的最新版本，读取时要保证其他并发事务不能修改当前记录，会对读取的记录进行加锁。")]),_._v(" "),v("ul",[v("li",[_._v("快照读")])]),_._v(" "),v("p",[_._v("像不加锁的select操作就是快照读，即不加锁的非阻塞读；快照读的前提是隔离级别不是串行级别，串行级别下的快照读会退化成当前读；之所以出现快照读的情况，是基于提高并发性能的考虑，快照读的实现是基于多版本并发控制，即MVCC,可以认为MVCC是行锁的一个变种，但它在很多情况下，避免了加锁操作，降低了开销；既然是基于多版本，即快照读可能读到的并不一定是数据的最新版本，而有可能是之前的历史版本")]),_._v(" "),v("p",[_._v("说白了MVCC就是为了实现读-写冲突不加锁，而这个读指的就是快照读, 而非当前读，当前读实际上是一种加锁的操作，是悲观锁的实现")]),_._v(" "),v("h3",{attrs:{id:"当前读、快照读和mvcc的关系"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#当前读、快照读和mvcc的关系"}},[_._v("#")]),_._v(" 当前读、快照读和MVCC的关系")]),_._v(" "),v("ul",[v("li",[v("p",[_._v("准确的说，MVCC多版本并发控制指的是”维护一个数据的多个版本，使得读写操作没有冲突“这么一个概念。")])]),_._v(" "),v("li",[v("p",[_._v("而在MySQL中，实现这么一个MVCC理想概念，我们需要MySQL提供具体的功能去实现它，而快照读就是MySQL为我们实现。")])]),_._v(" "),v("li",[v("p",[_._v("MVCC理想模型其中的一个具体非阻塞读功能。而相对而言，当前读就是悲观锁的具体功能实现。")])])]),_._v(" "),v("p",[_._v("要再说的细致一些，快照读本身也是一个抽象概念，再深入研究。MVCC模型在MySQL中的具体实现则是由3个隐式字段，undo日志，Read View等去完成的。")]),_._v(" "),v("h3",{attrs:{id:"mvcc能解决什么问题-好处是"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#mvcc能解决什么问题-好处是"}},[_._v("#")]),_._v(" MVCC能解决什么问题，好处是？")]),_._v(" "),v("p",[v("strong",[_._v("数据库并发场景有三种，分别为：")])]),_._v(" "),v("p",[_._v("• 读-读：不存在任何问题，也不需要并发控制")]),_._v(" "),v("p",[_._v("• 读-写：有线程安全问题，可能会造成事务隔离性问题，可能遇到脏读，幻读，不可重复读")]),_._v(" "),v("p",[_._v("• 写-写：有线程安全问题，可能存在更新丢失问题，比如第一类更新丢失，第二类更新丢失")]),_._v(" "),v("p",[v("strong",[_._v("MVCC带来的好处是：")])]),_._v(" "),v("p",[_._v("MVCC是一种用来解决读-写冲突的无锁并发控制，也就是为事务分配单向增长的时间戳，为每个修改保存一个版本，版本与事务时间戳关联，读操作只读该事务开始前的数据库的快照。所以MVCC可以为数据库解决以下问题：")]),_._v(" "),v("ul",[v("li",[v("p",[_._v("在并发读写数据库时，可以做到在读操作时不用阻塞写操作，写操作也不用阻塞读操作，提高了数据库并发读写的性能")])]),_._v(" "),v("li",[v("p",[_._v("同时还可以解决脏读，幻读，不可重复读等事务隔离问题，但不能解决更新丢失问题")])])]),_._v(" "),v("p",[v("strong",[_._v("总结:")])]),_._v(" "),v("p",[_._v("MVCC就是因为大牛们，不满意只让数据库采用悲观锁这样性能不佳的形式去解决读-写冲突问题，而提出的解决方案，所以在数据库中，因为有了MVCC，所以我们可以形成两个组合：")]),_._v(" "),v("p",[_._v("• MVCC + 悲观锁")]),_._v(" "),v("p",[_._v("MVCC解决读写冲突，悲观锁解决写写冲突")]),_._v(" "),v("p",[_._v("• MVCC + 乐观锁")]),_._v(" "),v("p",[_._v("MVCC解决读写冲突，乐观锁解决写写冲突")]),_._v(" "),v("p",[_._v("这种组合的方式就可以最大程度的提高数据库并发性能，并解决读写冲突，和写写冲突导致的问题")]),_._v(" "),v("h3",{attrs:{id:"二、mvcc的实现原理"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#二、mvcc的实现原理"}},[_._v("#")]),_._v(" 二、MVCC的实现原理")]),_._v(" "),v("p",[_._v("MVCC的目的就是多版本并发控制，在数据库中的实现，就是为了解决读写冲突，它的实现原理主要是依赖记录中的 3个隐式字段，undo日志 ，Read View 来实现的。所以我们先来看看这个三个point的概念")]),_._v(" "),v("h4",{attrs:{id:"隐式字段"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#隐式字段"}},[_._v("#")]),_._v(" 隐式字段")]),_._v(" "),v("p",[_._v("每行记录除了我们自定义的字段外，还有数据库隐式定义的DB_TRX_ID,DB_ROLL_PTR,DB_ROW_ID等字段")]),_._v(" "),v("p",[_._v("• DB_TRX_ID")]),_._v(" "),v("p",[_._v("6byte，最近修改(修改/插入)事务ID：记录创建这条记录/最后一次修改该记录的事务ID")]),_._v(" "),v("p",[_._v("• DB_ROLL_PTR")]),_._v(" "),v("p",[_._v("7byte，回滚指针，指向这条记录的上一个版本（存储于rollback segment里）")]),_._v(" "),v("p",[_._v("• DB_ROW_ID")]),_._v(" "),v("p",[_._v("6byte，隐含的自增ID（隐藏主键），如果数据表没有主键，InnoDB会自动以DB_ROW_ID产生一个聚簇索引")]),_._v(" "),v("p",[_._v("实际还有一个删除flag隐藏字段, 既记录被更新或删除并不代表真的删除，而是删除flag变了")]),_._v(" "),v("p",[v("img",{attrs:{src:"https://img-blog.csdnimg.cn/aaeceee9d6364188abefbaa75737412a.png",alt:"在这里插入图片描述"}})]),_._v(" "),v("p",[_._v("如上图，DB_ROW_ID是数据库默认为该行记录生成的唯一隐式主键，DB_TRX_ID是当前操作该记录的事务ID,而DB_ROLL_PTR是一个回滚指针，用于配合undo日志，指向上一个旧版本")]),_._v(" "),v("h4",{attrs:{id:"undo日志"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#undo日志"}},[_._v("#")]),_._v(" undo日志")]),_._v(" "),v("p",[v("code",[_._v("undo log")]),_._v("主要分为两种：")]),_._v(" "),v("p",[_._v("• insert undo log")]),_._v(" "),v("p",[_._v("代表事务在insert新记录时产生的undo log, 只在事务回滚时需要，并且在事务提交后可以被立即丢弃")]),_._v(" "),v("p",[_._v("• update undo log")]),_._v(" "),v("p",[_._v("事务在进行update或delete时产生的undo log; 不仅在事务回滚时需要，在快照读时也需要；所以不能随便删除，只有在快速读或事务回滚不涉及该日志时，对应的日志才会被purge线程统一清除")]),_._v(" "),v("p",[v("code",[_._v("purge")]),_._v(":")]),_._v(" "),v("p",[_._v("• 从前面的分析可以看出，为了实现InnoDB的MVCC机制，更新或者删除操作都只是设置一下老记录的deleted_bit，并不真正将过时的记录删除。")]),_._v(" "),v("p",[_._v("• 为了节省磁盘空间，InnoDB有专门的purge线程来清理deleted_bit为true的记录。为了不影响MVCC的正常工作，purge线程自己也维护了一个read view（这个read view相当于系统中最老活跃事务的read view）;如果某个记录的deleted_bit为true，并且DB_TRX_ID相对于purge线程的read view可见，那么这条记录一定是可以被安全清除的。")]),_._v(" "),v("p",[_._v("对MVCC有帮助的实质是update undo log ，undo log实际上就是存在rollback segment中旧记录链，它的执行流程如下：")]),_._v(" "),v("p",[_._v("一、 比如一个有个事务插入person表插入了一条新记录，记录如下，name为Jerry, age为24岁，隐式主键是1，事务ID和回滚指针，我们假设为NULL:")]),_._v(" "),v("p",[v("img",{attrs:{src:"https://img-blog.csdnimg.cn/aef6039ff1484f198465da446d7f3e91.png",alt:"在这里插入图片描述"}})]),_._v(" "),v("p",[_._v("二、 现在来了一个事务1对该记录的name做出了修改，改为Tom")]),_._v(" "),v("p",[_._v("• 在事务1修改该行(记录)数据时，数据库会先对该行加排他锁")]),_._v(" "),v("p",[_._v("• 然后把该行数据拷贝到undo log中，作为旧记录，既在undo log中有当前行的拷贝副本")]),_._v(" "),v("p",[_._v("• 拷贝完毕后，修改该行name为Tom，并且修改隐藏字段的事务ID为当前事务1的ID, 我们默认从1开始，之后递增，回滚指针指向拷贝到undo log的副本记录，既表示我的上一个版本就是它")]),_._v(" "),v("p",[_._v("• 事务提交后，释放锁")]),_._v(" "),v("p",[v("img",{attrs:{src:"https://img-blog.csdnimg.cn/21e33b108e7e4bdd94eb0a04cccb2d92.png",alt:"在这里插入图片描述"}})]),_._v(" "),v("p",[_._v("三、 又来了个事务2修改person表的同一个记录，将age修改为30岁")]),_._v(" "),v("p",[_._v("• 在事务2修改该行数据时，数据库也先为该行加锁")]),_._v(" "),v("p",[_._v("• 然后把该行数据拷贝到undo log中，作为旧记录，发现该行记录已经有undo log了，那么最新的旧数据作为链表的表头，插在该行记录的undo log最前面")]),_._v(" "),v("p",[_._v("• 修改该行age为30岁，并且修改隐藏字段的事务ID为当前事务2的ID, 那就是2，回滚指针指向刚刚拷贝到undo log的副本记录")]),_._v(" "),v("p",[_._v("• 事务提交，释放锁")]),_._v(" "),v("p",[v("img",{attrs:{src:"https://img-blog.csdnimg.cn/3503c08d179348d2bcdddd4725ff2da9.png",alt:"在这里插入图片描述"}})]),_._v(" "),v("h3",{attrs:{id:"read-view-读视图"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#read-view-读视图"}},[_._v("#")]),_._v(" Read View（读视图）")]),_._v(" "),v("p",[_._v("什么是Read View？")]),_._v(" "),v("p",[_._v("什么是Read View，说白了Read View就是事务进行快照读操作的时候生产的读视图(Read View)，在该事务执行的快照读的那一刻，会生成数据库系统当前的一个快照，记录并维护系统当前活跃事务的ID(当每个事务开启时，都会被分配一个ID, 这个ID是递增的，所以最新的事务，ID值越大)")]),_._v(" "),v("p",[_._v("所以我们知道 Read View主要是用来做可见性判断的, 即当我们某个事务执行快照读的时候，对该记录创建一个Read View读视图，把它比作条件用来判断当前事务能够看到哪个版本的数据，既可能是当前最新的数据，也有可能是该行记录的undo log里面的某个版本的数据。")]),_._v(" "),v("p",[_._v("Read View遵循一个可见性算法，主要是将要被修改的数据的最新记录中的DB_TRX_ID（即当前事务ID）取出来，与系统当前其他活跃事务的ID去对比（由Read View维护），如果DB_TRX_ID跟Read View的属性做了某些比较，不符合可见性，那就通过DB_ROLL_PTR回滚指针去取出Undo Log中的DB_TRX_ID再比较，即遍历链表的DB_TRX_ID（从链首到链尾，即从最近的一次修改查起），直到找到满足特定条件的DB_TRX_ID, 那么这个DB_TRX_ID所在的旧记录就是当前事务能看见的最新老版本。")]),_._v(" "),v("p",[_._v("• 首先比较DB_TRX_ID < up_limit_id, 如果小于，则当前事务能看到DB_TRX_ID 所在的记录，如果大于等于进入下一个判断")]),_._v(" "),v("p",[_._v("• 接下来判断 DB_TRX_ID 大于等于 low_limit_id , 如果大于等于则代表DB_TRX_ID 所在的记录在Read View生成后才出现的，那对当前事务肯定不可见，如果小于则进入下一个判断")]),_._v(" "),v("p",[_._v("• 判断DB_TRX_ID 是否在活跃事务之中，trx_list.contains(DB_TRX_ID)，如果在，则代表我Read View生成时刻，你这个事务还在活跃，还没有Commit，你修改的数据，我当前事务也是看不见的；如果不在，则说明，你这个事务在Read View生成之前就已经Commit了，你修改的结果，我当前事务是能看见的")]),_._v(" "),v("h3",{attrs:{id:"整体流程"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#整体流程"}},[_._v("#")]),_._v(" 整体流程")]),_._v(" "),v("p",[_._v("我们在了解了隐式字段，undo log，以及Read View概念之后，就可以来看看MVCC实现的整体流程是怎么样了。")]),_._v(" "),v("p",[_._v("可以模拟一下整体的流程。")]),_._v(" "),v("p",[_._v("当事务2对某行数据执行了快照读，数据库为该行数据生成一个Read View读视图，假设当前事务ID为2，此时还有事务1和事务3在活跃中，事务4在事务2快照读前一刻提交更新了，所以Read View记录了系统当前活跃事务1，3的ID，维护在一个列表上，假设我们称为trx_list。")]),_._v(" "),v("p",[v("img",{attrs:{src:"https://img-blog.csdnimg.cn/73a4faff8aef4654b1445a0b60f53261.png",alt:"在这里插入图片描述"}})]),_._v(" "),v("p",[_._v("Read View不仅仅会通过一个列表trx_list来维护事务2执行快照读那刻系统正活跃的事务ID，还会有两个属性up_limit_id（记录trx_list列表中事务ID最小的ID），low_limit_id(记录trx_list列表中事务ID最大的ID，也有人说快照读那刻系统尚未分配的下一个事务ID也就是目前已出现过的事务ID的最大值+1，我更倾向于后者；所以在这里例子中up_limit_id就是1，low_limit_id就是4 + 1 = 5，trx_list集合的值是1,3，Read View如下图")]),_._v(" "),v("p",[v("img",{attrs:{src:"https://img-blog.csdnimg.cn/fc8a2382d97a46a6bfb6228105f0d88f.png",alt:"在这里插入图片描述"}})]),_._v(" "),v("p",[_._v("我们的例子中，只有事务4修改过该行记录，并在事务2执行快照读前，就提交了事务，所以当前该行当前数据的undo log如下图所示；我们的事务2在快照读该行记录的时候，就会拿该行记录的DB_TRX_ID去跟up_limit_id,low_limit_id和活跃事务ID列表(trx_list)进行比较，判断当前事务2能看到该记录的版本是哪个。")]),_._v(" "),v("p",[v("img",{attrs:{src:"https://img-blog.csdnimg.cn/8fdfb21dc0c54275a321ae84c0f0a686.png",alt:"在这里插入图片描述"}})]),_._v(" "),v("p",[_._v("所以先拿该记录DB_TRX_ID字段记录的事务ID 4去跟Read View的的up_limit_id比较，看4是否小于up_limit_id(1)，所以不符合条件，继续判断 4 是否大于等于 low_limit_id(5)，也不符合条件，最后判断4是否处于trx_list中的活跃事务, 最后发现事务ID为4的事务不在当前活跃事务列表中, 符合可见性条件，所以事务4修改后提交的最新结果对事务2快照读时是可见的，所以事务2能读到的最新数据记录是事务4所提交的版本，而事务4提交的版本也是全局角度上最新的版本")]),_._v(" "),v("p",[v("img",{attrs:{src:"https://img-blog.csdnimg.cn/0676881395194fd2b808758defbdd5b9.png",alt:"在这里插入图片描述"}})]),_._v(" "),v("p",[_._v("也正是Read View生成时机的不同，从而造成RC,RR级别下快照读的结果的不同")]),_._v(" "),v("h3",{attrs:{id:"三、mvcc相关问题"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#三、mvcc相关问题"}},[_._v("#")]),_._v(" 三、MVCC相关问题")]),_._v(" "),v("h4",{attrs:{id:"rr-可重复读-是如何在rc-读已提交-级的基础上解决不可重复读的"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#rr-可重复读-是如何在rc-读已提交-级的基础上解决不可重复读的"}},[_._v("#")]),_._v(" RR（可重复读）是如何在RC（读已提交）级的基础上解决不可重复读的？")]),_._v(" "),v("p",[_._v("当前读和快照读在RR级别下的区别：")]),_._v(" "),v("p",[_._v("表1：")]),_._v(" "),v("p",[v("img",{attrs:{src:"https://img-blog.csdnimg.cn/7af4a344af4e4639bf649e85b3bc16c3.png",alt:"在这里插入图片描述"}})]),_._v(" "),v("p",[_._v("表2：")]),_._v(" "),v("p",[v("img",{attrs:{src:"https://img-blog.csdnimg.cn/a51cab2a310e4a4d8cd2bdb7228de05e.png",alt:"在这里插入图片描述"}})]),_._v(" "),v("p",[_._v("而在表2这里的顺序中，事务B在事务A提交后的快照读和当前读都是实时的新数据400，why?")]),_._v(" "),v("p",[_._v("这里与上表的唯一区别仅仅是表1的事务B在事务A修改金额前快照读过一次金额数据，而表2的事务B在事务A修改金额前没有进行过快照读。")]),_._v(" "),v("p",[_._v("所以我们知道事务中快照读的结果是非常依赖该事务首次出现快照读的地方，即某个事务中首次出现快照读的地方非常关键，它有决定该事务后续快照读结果的能力。")]),_._v(" "),v("p",[_._v("我们这里测试的是更新，同时删除和更新也是一样的，如果事务B的快照读是在事务A操作之后进行的，事务B的快照读也是能读取到最新的数据的")]),_._v(" "),v("h4",{attrs:{id:"rc、rr级别下的innodb快照读有什么不同"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#rc、rr级别下的innodb快照读有什么不同"}},[_._v("#")]),_._v(" RC、RR级别下的InnoDB快照读有什么不同？")]),_._v(" "),v("p",[_._v("正是Read View生成的时机不同，从而造成RC、RR级别下的快照读的结果不同。")]),_._v(" "),v("p",[_._v("• 在RR级别下的某个事务的对某条记录的第一次快照读会创建一个快照及Read View, 将当前系统活跃的其他事务记录起来，此后在调用快照读的时候，还是使用的是同一个Read View，所以只要当前事务在其他事务提交更新之前使用过快照读，那么之后的快照读使用的都是同一个Read View，所以对之后的修改不可见；")]),_._v(" "),v("p",[_._v("• 即RR级别下，快照读生成Read View时，Read View会记录此时所有其他活动事务的快照，这些事务的修改对于当前事务都是不可见的。而早于Read View创建的事务所做的修改均是可见")]),_._v(" "),v("p",[_._v("• 而在RC级别下的，事务中，每次快照读都会新生成一个快照和Read View, 这就是我们在RC级别下的事务中可以看到别的事务提交的更新的原因")]),_._v(" "),v("p",[_._v("总之在RC隔离级别下，是每个快照读都会生成并获取最新的Read View；而在RR隔离级别下，则是同一个事务中的第一个快照读才会创建Read View, 之后的快照读获取的都是同一个Read View。")])])}),[],!1,null,null,null);v.default=a.exports}}]);