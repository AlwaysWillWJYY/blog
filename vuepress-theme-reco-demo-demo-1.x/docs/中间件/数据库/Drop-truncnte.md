---
title: Drop-truncnte
date: 2022-04-07
categories:
 - 数据库
tags:
 - Mysql
---

（1）`Delete语句执行删除的过程是每次从表中删除一行`，并且同时将改行的删除操作作为事务记录在日志中保存起来以便进行回滚操作；
Truncate Table 则一次性地从表中删除所有的数据并不把单独的删除操作记录记入日志保存，删除行是不能恢复的。并且在删除的过程中不会激活与表有关的删除触发器。执行速度快。

（2）表和索引所占空间

当表被TRUNCATE 后，这个表和索引所占用的空间会恢复到初始大小，

DELETE操作不会减少表或索引所占用的空间，

drop语句将表所占用的空间全释放掉。

（3）应用范围。

TRUNCATE 只能对TABLE；   DELETE可以是table和view

（4）`TRUNCATE 和DELETE只删除数据， DROP则删除整个表（结构和数据）。`

truncate与不带where的delete ：只删除数据，而不删除表的结构（定义）drop语句将删除表的结构被依赖的约束（constrain),触发器（trigger)索引（index);依赖于该表的存储过程/函数将被保留，但其状态会变为：invalid。

（5）delete语句为DML,这个操作会被放到 rollback segment中,事务提交后才生效。如果有相应的 tigger,执行的时候将被触发。truncate、drop是DLL，操作立即生效，原数据不放到 rollback segment中，不能回滚。

（6）要删除部分数据行采用delete且注意结合where来约束影响范围。回滚段要足够大。要删除表用drop;若想保留表而将表中数据删除，如
果于事务无关，用truncate即可实现。如果和事务有关，或想触发trigger,还是用delete。

（7）对于外键（foreign key ）约束引用的表，不能使用 truncate table，而应使用不带 where 子句的 delete 语句。

（8）在速度上，一般来说，drop> truncate > delete。

（9）truncate直接删除表，之后重新建表，auto_increment将置为0，重新开始，detele删除的数据之后，auto_increment不会重置
