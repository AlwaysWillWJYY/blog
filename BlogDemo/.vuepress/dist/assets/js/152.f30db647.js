(window.webpackJsonp=window.webpackJsonp||[]).push([[152],{558:function(a,s,t){"use strict";t.r(s);var r=t(2),e=Object(r.a)({},(function(){var a=this,s=a._self._c;return s("ContentSlotsDistributor",{attrs:{"slot-key":a.$parent.slotKey}},[s("h2",{attrs:{id:"数据库事务transanction正确执行的四个基本要素。"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#数据库事务transanction正确执行的四个基本要素。"}},[a._v("#")]),a._v(" 数据库事务transanction正确执行的四个基本要素。")]),a._v(" "),s("p",[a._v("ACID：原子性（Atomicity）、\n一致性（Correspondence）、\n隔离性（Isolation）、\n持久性（Durability）")]),a._v(" "),s("p",[a._v("1、"),s("strong",[a._v("原子性")]),a._v("：事务开始后所有操作，要么全部做完，要么全部不做，不可能停滞在中间环节。如果事务在执行过程中发生错误，事务会被回滚（Rollback）到事务开始前的状态；")]),a._v(" "),s("p",[a._v("2、"),s("strong",[a._v("一致性")]),a._v("：事务开始前和结束后，数据库的完整性约束没有被破坏。比如A向B转账，不可能A被扣了钱，B却没收到转账")]),a._v(" "),s("p",[a._v("3、"),s("strong",[a._v("隔离性")]),a._v("：同一时间，只允许一个事务请求同一数据，不同事务之间彼此没有任何干扰。比如A正在从一张银行卡中取钱，在A取钱的过程中，B不能向这张银行卡转账。")]),a._v(" "),s("p",[a._v("4、"),s("strong",[a._v("持久性")]),a._v("：事务完成后，事务对数据库的所有更新将被保存起来，不会回滚。")]),a._v(" "),s("h3",{attrs:{id:"事务的传播特性"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#事务的传播特性"}},[a._v("#")]),a._v(" 事务的传播特性")]),a._v(" "),s("p",[a._v("事务的传播行为就是多个事务方法调用时，如何定义方法间事务的传播。Spring中定义了7中传播行为：")]),a._v(" "),s("p",[a._v("（1）propagation_required：如果当前没有事务，则新建一个事务，如果已经存在一个事务，加入到该事务中，这是Spring默认的选择；")]),a._v(" "),s("p",[a._v("（2）propagation_supports：支持当前事务，如果没有当前事务，就以非事务方式执行；")]),a._v(" "),s("p",[a._v("（3）propagation_mandatory：使用当前事务，如果没有当前事务，就抛出异常；")]),a._v(" "),s("p",[a._v("（4）propagation_required_new：新建事务，如果当前存在事务，把当前事务挂起。")]),a._v(" "),s("p",[a._v("（5）propagation_not_supported：以非事务方式执行操作，如果当前存在事务，就把当前事务挂起。")]),a._v(" "),s("p",[a._v("（6）propagation_never：以非事务方式执行操作，如果当前事务存在则抛出异常。")]),a._v(" "),s("p",[a._v("（7）propagation_nested：如果当前存在事务，则在嵌套事务内执行。如果当前没有事务，则执行与propagation_required类似的操作。")]),a._v(" "),s("h3",{attrs:{id:"事务的并发问题"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#事务的并发问题"}},[a._v("#")]),a._v(" 事务的并发问题")]),a._v(" "),s("p",[s("code",[a._v("脏读")]),a._v("：事务A读取了事务B更新的数据，然后B回滚操作，那么A读取到的数据是脏数据；")]),a._v(" "),s("p",[s("code",[a._v("不可重复读")]),a._v("：事务A多次读取同一数据，事务B在事务A多次读取的过程中，对数据做了更新并提交，导致事务A多次读取同一数据时，结果不一致；")]),a._v(" "),s("p",[s("code",[a._v("幻读")]),a._v("：系统管理员A将数据库中的所有学生成绩从具体分数改为ABCDEF等级，但是系统管理员B就在这个时候插入了一条具体分数的记录，当系统管理员A修改结束后，发现有一条数据没有改过来，就好像产生了幻觉一样。")]),a._v(" "),s("p",[a._v("不可重复读和幻读很容易混淆，不可重复读侧重于修改，幻读侧重于删除或新增。解决不可重复读的问题只需要锁住满足条件的行，解决幻读需要锁表。")]),a._v(" "),s("h3",{attrs:{id:"事务的隔离级别"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#事务的隔离级别"}},[a._v("#")]),a._v(" 事务的隔离级别")]),a._v(" "),s("ul",[s("li",[a._v("读未提交（read-uncommitted）：")])]),a._v(" "),s("p",[a._v("读未提交，顾名思义，就是可以读到未提交的内容。\n因此，在这种隔离界别下，查询是不会加锁的，也由于查询的不加锁，所以这种隔离级别的一致性是最差的，可能会产生“脏读”、“不可重复读”、“幻读”")]),a._v(" "),s("ul",[s("li",[a._v("读提交（read-committed）：")])]),a._v(" "),s("p",[a._v("读提交、顾名思义，就是只能读到已经提交了的内容。")]),a._v(" "),s("p",[s("code",[a._v("这是各种系统中最常用的一种隔离级别，也是SQL Server和Oracle的默认隔离级别。")])]),a._v(" "),s("p",[a._v("这种隔离级别能够有效的避免脏读，但除非在查询中显示的加锁，如：")]),a._v(" "),s("div",{staticClass:"language-sql line-numbers-mode"},[s("pre",{pre:!0,attrs:{class:"language-sql"}},[s("code",[s("span",{pre:!0,attrs:{class:"token keyword"}},[a._v("Select")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token operator"}},[a._v("*")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token keyword"}},[a._v("from")]),a._v(" T "),s("span",{pre:!0,attrs:{class:"token keyword"}},[a._v("where")]),a._v(" ID "),s("span",{pre:!0,attrs:{class:"token operator"}},[a._v("=")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token number"}},[a._v("2")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token keyword"}},[a._v("lock")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token operator"}},[a._v("in")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token keyword"}},[a._v("share")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token keyword"}},[a._v("mode")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(";")]),a._v("\n"),s("span",{pre:!0,attrs:{class:"token keyword"}},[a._v("Select")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token operator"}},[a._v("*")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token keyword"}},[a._v("from")]),a._v(" T "),s("span",{pre:!0,attrs:{class:"token keyword"}},[a._v("where")]),a._v(" ID "),s("span",{pre:!0,attrs:{class:"token operator"}},[a._v("=")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token number"}},[a._v("2")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token keyword"}},[a._v("for")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token keyword"}},[a._v("update")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(";")]),a._v("\n")])]),a._v(" "),s("div",{staticClass:"line-numbers-wrapper"},[s("span",{staticClass:"line-number"},[a._v("1")]),s("br"),s("span",{staticClass:"line-number"},[a._v("2")]),s("br")])]),s("p",[a._v("不然，普通的查询是不会加锁的。")]),a._v(" "),s("ul",[s("li",[a._v("可重复读（Repeat read）：")])]),a._v(" "),s("p",[a._v("可重复读，顾名思义，就是专门针对“不可重复读”这种情况而制定的隔离级别，自然，它就可以有效的避免“不可重复读”。"),s("code",[a._v("而它也是MySQL的默认隔离级别")]),a._v("。")]),a._v(" "),s("ul",[s("li",[a._v("串行化（Serializable）")])]),a._v(" "),s("p",[a._v("这是数据库最高的隔离级别，这种隔离级别下，事务“串行化顺序执行”，也就是一个一个排队执行。")]),a._v(" "),s("p",[a._v("这种级别下，“脏读”、“不可重复读”、“幻读”都可以解决，但是执行效率很差，性能开销量也大。")]),a._v(" "),s("p",[a._v("隔离级别的性能：")]),a._v(" "),s("div",{staticClass:"language-sql line-numbers-mode"},[s("pre",{pre:!0,attrs:{class:"language-sql"}},[s("code",[s("span",{pre:!0,attrs:{class:"token keyword"}},[a._v("Read")]),s("span",{pre:!0,attrs:{class:"token operator"}},[a._v("-")]),s("span",{pre:!0,attrs:{class:"token keyword"}},[a._v("uncommitted")]),s("span",{pre:!0,attrs:{class:"token operator"}},[a._v(">")]),s("span",{pre:!0,attrs:{class:"token keyword"}},[a._v("read")]),s("span",{pre:!0,attrs:{class:"token operator"}},[a._v("-")]),s("span",{pre:!0,attrs:{class:"token keyword"}},[a._v("committed")]),s("span",{pre:!0,attrs:{class:"token operator"}},[a._v(">")]),s("span",{pre:!0,attrs:{class:"token keyword"}},[a._v("repeat")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token keyword"}},[a._v("read")]),s("span",{pre:!0,attrs:{class:"token operator"}},[a._v(">")]),s("span",{pre:!0,attrs:{class:"token keyword"}},[a._v("serializable")]),a._v("\n")])]),a._v(" "),s("div",{staticClass:"line-numbers-wrapper"},[s("span",{staticClass:"line-number"},[a._v("1")]),s("br")])]),s("p",[a._v("隔离级别的安全性：")]),a._v(" "),s("div",{staticClass:"language-sql line-numbers-mode"},[s("pre",{pre:!0,attrs:{class:"language-sql"}},[s("code",[s("span",{pre:!0,attrs:{class:"token keyword"}},[a._v("Read")]),s("span",{pre:!0,attrs:{class:"token operator"}},[a._v("-")]),s("span",{pre:!0,attrs:{class:"token keyword"}},[a._v("uncommitted")]),s("span",{pre:!0,attrs:{class:"token operator"}},[a._v("<")]),s("span",{pre:!0,attrs:{class:"token keyword"}},[a._v("read")]),s("span",{pre:!0,attrs:{class:"token operator"}},[a._v("-")]),s("span",{pre:!0,attrs:{class:"token keyword"}},[a._v("committed")]),s("span",{pre:!0,attrs:{class:"token operator"}},[a._v("<")]),s("span",{pre:!0,attrs:{class:"token keyword"}},[a._v("repeat")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token keyword"}},[a._v("read")]),s("span",{pre:!0,attrs:{class:"token operator"}},[a._v("<")]),s("span",{pre:!0,attrs:{class:"token keyword"}},[a._v("serializable")]),a._v("\n")])]),a._v(" "),s("div",{staticClass:"line-numbers-wrapper"},[s("span",{staticClass:"line-number"},[a._v("1")]),s("br")])]),s("h3",{attrs:{id:"事务的几种实现方式"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#事务的几种实现方式"}},[a._v("#")]),a._v(" 事务的几种实现方式")]),a._v(" "),s("p",[a._v("（1）编程式事务管理对于基于POJO的应用来说是唯一选择，我们需要在代码中调用beginTransactin()、commit()、rollback()等事务管理的相关方法，这就是编程式事务管理；")]),a._v(" "),s("p",[a._v("（2）基于TransactionProxyFactoryBean的声明式事务管理（SpringAOP）")]),a._v(" "),s("p",[a._v("（3）基于@Transaction的声明式事务管理；")]),a._v(" "),s("p",[a._v("（4）基于AspectJavaAOP配置事务。")]),a._v(" "),s("h2",{attrs:{id:"事务的隔离级别的实现原理"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#事务的隔离级别的实现原理"}},[a._v("#")]),a._v(" 事务的隔离级别的实现原理")]),a._v(" "),s("p",[a._v("在MySQL中只有innodb支持事务，所以这里说的事务隔离级别指的是innodb下的事务隔离级别。")]),a._v(" "),s("p",[a._v("读未提交：一个事务可以读取到另一个事务未提交的修改。这样会带来脏读、幻读、不可重复读的问题。")]),a._v(" "),s("p",[a._v("读已提交：一个事务只能读取另一个事务已经提交的修改。其避免了脏读，但仍存在不可重复读和幻读的问题。")]),a._v(" "),s("p",[a._v("可重复读：同一个事务中多次读取相同的数据返回的结果是一样的，其避免了脏读和不可重复读，但幻读依然存在。")]),a._v(" "),s("p",[a._v("串行化：事务串行化。避免以上所有问题。")]),a._v(" "),s("p",[a._v("MySQL的默认隔离级别是可重复读，并且解决了幻读的问题。简单来说，MySQL的默认隔离级别解决了脏读、幻读、不可重复读的问题。")]),a._v(" "),s("h2",{attrs:{id:"mvcc"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#mvcc"}},[a._v("#")]),a._v(" MVCC")]),a._v(" "),s("p",[a._v("MVCC是”多版本并发控制“。这项技术使得InnoDB的事务隔离级别下执行一致性读操作有了保证。换言之，就是为了查询一些正在被另一个事务更新的行，并且可以看到他们被更新之前的值。这是一个可以用来增强并发性的强大的技术，因为这样一来的话，查询就不用等待另一个事务释放锁。这项技术在数据库领域并不是普遍使用的。")]),a._v(" "),s("p",[s("strong",[a._v("说明")]),a._v("：")]),a._v(" "),s("p",[a._v("InnoDB会给数据库中的每一行增加三个字段，它们分"),s("code",[a._v("DB_TRX_ID、DB_ROLL_PTR、DB_ROW_ID")]),a._v("。")]),a._v(" "),s("p",[a._v("但是，为了理解的方便，我们可以这样去理解，所以接下来的讲解中也还是用这两个字段的方式去理解。")]),a._v(" "),s("h2",{attrs:{id:"增删改查"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#增删改查"}},[a._v("#")]),a._v(" 增删改查：")]),a._v(" "),s("p",[a._v("在InnoDB中，给每行增加两个隐藏字段来实现MVCC，一个用来记录数据行的创建时间，另一个用来记录行的过期时间（删除时间）。在实际操作中，存储的并不是时间，而是事务的版本号，每开启一个新事务，事务的版本号就会递增。")]),a._v(" "),s("p",[a._v("于是乎，默认的隔离级别（REPEATABLE READ）下，增删查改变成了这样：")]),a._v(" "),s("h3",{attrs:{id:"slect"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#slect"}},[a._v("#")]),a._v(" SLECT")]),a._v(" "),s("p",[a._v("• SELECT")]),a._v(" "),s("p",[a._v("读取创建版本小于或等于当前事务版本号，并且删除版本为空或大于当前事务版本号的记录。这样可以保证在读取之前记录是存在的。")]),a._v(" "),s("h3",{attrs:{id:"insert"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#insert"}},[a._v("#")]),a._v(" INSERT")]),a._v(" "),s("p",[a._v("• INSERT")]),a._v(" "),s("p",[a._v("将当前事务的版本号保存至行的创建版本号。")]),a._v(" "),s("h3",{attrs:{id:"update"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#update"}},[a._v("#")]),a._v(" UPDATE")]),a._v(" "),s("p",[a._v("• UPDATE")]),a._v(" "),s("p",[a._v("新插入一行，并以当前事务的版本号作为新行的创建版本号，同时将原记录行的删除版本号设置为当前事务版本号")]),a._v(" "),s("h3",{attrs:{id:"delete"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#delete"}},[a._v("#")]),a._v(" DELETE")]),a._v(" "),s("p",[a._v("• DELETE")]),a._v(" "),s("p",[a._v("将当前事务的版本号保存至行的删除版本号")])])}),[],!1,null,null,null);s.default=e.exports}}]);