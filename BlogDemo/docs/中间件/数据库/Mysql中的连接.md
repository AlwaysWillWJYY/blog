---
title: MySQL中的连接
date: 2022-04-10

---

用两个表a_table、b_table，关键字段 a_table.a_id和b_table.b_id来演示一下MySQL内连接、外连接

前提：建表语句：

```sql
CREATE TABLE `a_table` (
        `a_id` int(11) DEFAULT NULL,
        `a_name` varchar(10) DEFAULT NULL,
        `a_part` varchar(10) DEFAULT NULL
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8

CREATE TABLE `b_table` (
        `b_id` int(11) DEFAULT NULL,
        `b_name` varchar(10) DEFAULT NULL,
        `b_part` varchar(10) DEFAULT NULL
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8
```

表测试数据：

![在这里插入图片描述](https://img-blog.csdnimg.cn/9b06c43d7d1f4e34a68352daa3e7b31b.png)

### 一、内连接

关键字：`inner join on`

语句：
```sql
select * from a_table a inner join b_table b on a.a_id = b.b_id;
```

蓝色的字段是在给要查询的表起别名
红色的字段是内连接的关键字

执行结果

![在这里插入图片描述](https://img-blog.csdnimg.cn/c8dc9bb7b44b401581313732bf4229ce.png)

说明：组合两个表中的记录，返回关键字段相符的记录，也就是返回两个表的交集。

![在这里插入图片描述](https://img-blog.csdnimg.cn/724f7ec22d9b4e14b0ba03f86a9592ba.png)

### 二、左连接（左外连接）

关键字：`left join on/left outer join on`

语句：
```sql
select * from a_table a left join b_table b on a.a_id = b.b_id;
```

执行结果：

![在这里插入图片描述](https://img-blog.csdnimg.cn/c127cf58427345c9811c74118b8afb26.png)

说明：

Left join是left outer join的简写，全称为左外接连，是外连接的一种。
左（外）连接，左表(a_table)的记录会被全部显示出来，而右表(b_table)只会显示符合搜索条件的记录。右表不足的地方均为null。

![在这里插入图片描述](https://img-blog.csdnimg.cn/d29336ebc8e4497eb451a904d9bd8d78.png)

### 三、右连接（右外连接）

关键字：`right join on/right outer join on`

语句：
```sql
select * from a_table a right outer join b_table b on a.a_id = b.b_id;
```

执行结果：

![在这里插入图片描述](https://img-blog.csdnimg.cn/3c87a53a5561435c86a610fd37f004d1.png)

说明：
右外连接与左外连接相反，左表只会显示符合搜索要求的记录，其余均为Null，而右表会将所有记录显示出来。

![在这里插入图片描述](https://img-blog.csdnimg.cn/99a8ccffc0384686ac97471ab781dcd3.png)

### 多表查询：

1、交叉连接查询（基本不会使用-得到的是两个表的乘积）

·语法：select * from A,B

2、内连接查询（使用关键字inner join  ---inner可以省略）

·隐式内连接：select * from A,B where 条件

·显示内连接：select * from A inner join B on 条件

3、外连接查询（使用关键字outer join  ---outer可省略）

·左外连接：left outer join

Select * from A left outer join B on 条件；

·右外连接：right outer join

Select * from A right outer join B on 条件；
