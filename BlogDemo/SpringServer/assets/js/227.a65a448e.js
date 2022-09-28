(window.webpackJsonp=window.webpackJsonp||[]).push([[227],{686:function(n,o,t){"use strict";t.r(o);var a=t(1),_=Object(a.a)({},(function(){var n=this,o=n._self._c;return o("ContentSlotsDistributor",{attrs:{"slot-key":n.$parent.slotKey}},[o("h3",{attrs:{id:"innodb存储引擎"}},[o("a",{staticClass:"header-anchor",attrs:{href:"#innodb存储引擎"}},[n._v("#")]),n._v(" InnoDB存储引擎")]),n._v(" "),o("p",[n._v("InnoDB是事务型数据库的首选引擎，支持事务安全表（ACID：事务的几个性：原子性、一致性、隔离性、持久性），支持行锁定和外键，InnoDB是MySQL的默认引擎，InnoDB的主要特性有：")]),n._v(" "),o("p",[n._v("1、InnoDB给MySQL提供了具有提交、回滚和崩溃恢复能力的事物安全（ACID兼容）存储引擎。InnoDB锁定在行级并且也在SELECT语句中提供一个类似"),o("code",[n._v("Oracle")]),n._v("的非锁定读。这些功能增加了多用户部署和性能。在SQL查询中，可以自由地将InnoDB类型的表和其他MySQL的表类型混合起来，甚至在同一个查询中也可以混合")]),n._v(" "),o("p",[n._v("2、InnoDB是为处理巨"),o("code",[n._v("大数据量")]),n._v("的最大性能设计。它的CPU效率可能是任何其他基于磁盘的关系型数据库引擎锁不能匹敌的")]),n._v(" "),o("p",[n._v("3、InnoDB存储引擎完全与MySQL服务器整合，InnoDB存储引擎为在主内存中缓存数据和索引而维持它自己的缓冲池。InnoDB将它的表和索引在一个逻辑表空间中，表空间可以包含数个文件（或原始磁盘文件）。这与MyISAM表不同，比如在MyISAM表中每个表被存放在分离的文件中。InnoDB表可以是任何尺寸，即使在文件尺寸被限制为2GB的"),o("code",[n._v("操作系统")]),n._v("上")]),n._v(" "),o("p",[n._v("4、InnoDB支持外键完整性约束，存储表中的数据时，每张表的存储都按主键顺序存放，如果没有显示在表定义时指定主键，InnoDB会为每一行生成一个6字节的ROWID，并以此作为主键")]),n._v(" "),o("p",[n._v("5、InnoDB被用在众多需要高性能的大型数据库站点上")]),n._v(" "),o("p",[n._v("InnoDB不创建目录，使用InnoDB时，MySQL将在MySQL数据目录下创建一个名为ibdata1的10MB大小的自动扩展数据文件，以及两个名为ib_logfile0和ib_logfile1的5MB大小的日志文件")]),n._v(" "),o("h3",{attrs:{id:"mysiam存储引擎"}},[o("a",{staticClass:"header-anchor",attrs:{href:"#mysiam存储引擎"}},[n._v("#")]),n._v(" MySIAM存储引擎")]),n._v(" "),o("p",[n._v("MyISAM基于ISAM存储引擎，并对其进行扩展。它是在web、数据仓储和其他应用环境下最常使用的存储引擎之一。MyISAM拥有较高的插入、查询速度，但不支持事务。")]),n._v(" "),o("h3",{attrs:{id:"memory存储引擎"}},[o("a",{staticClass:"header-anchor",attrs:{href:"#memory存储引擎"}},[n._v("#")]),n._v(" MEMORY存储引擎")]),n._v(" "),o("p",[n._v("Memory存储引擎将表中的数据存储到内存中，为查询和引用其他表数据提供快速访问。")]),n._v(" "),o("p",[o("img",{attrs:{src:"https://img-blog.csdnimg.cn/81be962f39644261a9755246af40a95b.png",alt:"在这里插入图片描述"}})])])}),[],!1,null,null,null);o.default=_.exports}}]);