---
title: 常考Sql
date: 2022-04-05
---

### 基础

`创建数据库`

```sql
Create database database-name
```
`删除数据库`

```sql
Drop database dbname
```

`创建新表`

```sql
Create table tabname(col1 type1 [not null] [primary key] , col2 type2 [not null],…)
```

`根据已有表创建新表`

```sql
Create table tab_new like table_old
```

`删除新表`:

```sql
Drop table tablename
```

`增加一个列`

```sql
Alter table tabname add column col type
```
注：列增加后将不能删除。DB2中列加上后数据类型也不能改变，唯一可以改变的是增加varchar类型的长度。

`添加主键`
```sql
Alter table tabname add primary key(col)
```
**建议在创建表的时候就确定主键，这样在向表中添加数据的时候回自动根据聚集索引的原则，根据列的逻辑顺序，决定数据存储的物理顺序
如果在后续添加主键的话，需要进行移动的数据就太多了**

`删除主键`

```sql
Alter table tabname drop primary key(col)
```

`创建索引`
```sql
Create [unique] index idxname on tabname(col…,)
```

`删除索引`

```sql
Drop index idxname
```
注：索引是不可更改的，想更改必须删除重新建

`几个简单的基本SQL语句`
```sql
选择：select * from table1 where 范围
插入：insert into table1（field1，field2） values（value1，value2）
删除：delete from table1 where 范围
更新：update table1 set field1 = value1 where 范围
查找：select * from table1 where field1 like "%value1%" ----like的语法很精妙，查资料！
排序：select * from table1 order by field1,field2 [desc]
总数：select count as totalcount from table1
求和：select sum(field1) as sumvalue from table1
平均：select avg(field1) as avgvalue from table1
最大：select max(field1) as maxvalue from table1
最小：select min(field1) as minvalue from table1
```

`使用外连接`
```sql
Left (outer) join on【左外连接】
Select a.a,a.b,a.c,b.c,b.d,b.f from a left outer join b on a.a = b.c
right(outer) join on【右外连接】
```

### 查询实例总结：

首先我们使用MySQL创建两张表

* ---创建人力资源管理系统数据表

```sql
drop database if exists hrs;
create database hrs default charset utf8;
```

* ---切换数据库上下文环境
```sql
use hrs;
```

* ---删除表

```sql
drop table if exists tb_emp;
drop table if exists tb_dept;
```
* ---创建部门表

```sql
create table tb_dept(
        dno int comment '部门编号',
        dname varhchar(10) not null comment '部门名称',
        dloc varchar(20) not null commnet '部门所在地',
        primary key (dno)
        );
```

* ---添加部门记录

```sql
insert into tb_dept values(10 , '会计部' , '北京'),
       (20 , '研发部' , '成都' ),
       (30 , '销售部' , '重庆' ),
       (20 , '运维部' , '深圳' )
```

* ---创建员工表

```sql
create table tb_emp(
        eno int comment '员工编号',
        ename varchar(20) not null comment '员工姓名',
        job varchar(20) not null comment '员工职位',
        mgr int comment '主管编号',
        sal int not null comment '员工工资',
        comm int comment '每月补贴',
        dno int comment '所在部门编号',
        primary key (eno),
        foreign key (dno) references tb_dept(dno)
        )
```

* ---添加员工记录

```sql
insert into tb_emp values 
(7800, '张三丰', '总裁', null, 9000, 1200, 20),
    (2056, '乔峰', '分析师', 7800, 5000, 1500, 20),
    (3088, '李莫愁', '设计师', 2056, 3500, 800, 20),
    (3211, '张无忌', '程序员', 2056, 3200, null, 20),
    (3233, '丘处机', '程序员', 2056, 3400, null, 20),
    (3251, '张翠山', '程序员', 2056, 4000, null, 20),
    (5566, '宋远桥', '会计师', 7800, 4000, 1000, 10),
    (5234, '郭靖', '出纳', 5566, 2000, null, 10),
    (3344, '黄蓉', '销售主管', 7800, 3000, 800, 30),
    (1359, '胡一刀', '销售员', 3344, 1800, 200, 30),
    (4466, '苗人凤', '销售员', 3344, 2500, null, 30),
    (3244, '欧阳锋', '程序员', 3088, 3200, null, 20),
    (3577, '杨过', '会计', 5566, 2200, null, 10),
    (3588, '朱九真', '会计', 5566, 2500, null, 10);
```

### 下面是查询语句：

* ---查询薪资最高的员工姓名和工资

```sql
select ename,sal from tb_emp 
where sal=(select max(sal) from tb_emp);
```

* ---查询员工的姓名和年薪（(工资+补贴) * 12）

```sql
select ename, (sal + ifnull(comm , 0)) * 12 as annsal
from tb_emp order by annsal desc;
```

* ---查询有员工的部门的编号和人数

```sql
select dno, count (dno) as total from tb_emp group by dno;
```

* ---查询所有部门的名称和人数

```sql
--当列有二义性的时候需要使用完全限定名
select dname , total from tb_dept t1,
       (select dno ,count (dno) as total from tb_emp group by dno) t2
       where t1.dno = t2.dno;

       select dname as 部门名称，ifnull(total , 0 ) as 人数
       from tb_dept t1 left outer join 
       (select dno , count (dno) as total from tb_emp group by dno) t2
       on t1.dno = t2.dno;
```

* ---查询薪资最高的员工（boss除外）的姓名和工资
```sql
select ename , sal from tb_emp
where sal = (select max(sal) from tb_emp where mgr is not null);
```

* ---查询薪资超过平均薪水的员工的姓名和工资

```sql
select ename ,sal from tb_emp
where sal > (select avg(sal) from tb_emp);
```

* ---查询薪资排名4~6名的员工姓名和工资

```sql
select ename, sal from tb_emp order by sal desc limit 3,3;
select ename, sal from tb_emp order by sal desc limit 3 offset 3;
```
