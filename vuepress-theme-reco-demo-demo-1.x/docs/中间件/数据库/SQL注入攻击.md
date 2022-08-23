---
title: SQL注入攻击
date: 2022-04-10
categories:
 - 中间件
tags:
 - Mysql
 - 安全
---
## （1）防止SQL攻击

过滤用户输入的数据中是否含有非法字符；
分步检验：先使用用户名来查询用户，如果找到了再比较用户密码；

### SQL注入问题

在拼接SQL时，有一些SQL的特殊关键字参与字符串的拼接。会造成安全性问题。

1.随便输入用户名 输入密码：a'or 'a' ='a’

2.
```sql
sql：select * from user where username = ‘fhdsjkf’ and  ‘password’ = ‘a’ or ‘a’ = ‘a’
```

这样进行拼接之后是一个恒为true的查询条件，所以会引发安全问题。
静态的sql在sql语句写出时，就已经拼接好成了一个完整的SQL语句对应的字符串，所以会出现SQL注入问题
使用PreparedStatement；

## （2）PreparedStatement是什么？

PreparedStatement叫做预编译声明；
PreparedStatement是Statement的子接口，你可以使用PreparedStatement来替换Statement

## （3）PreparedStatement的好处：

防止SQL攻击；
提高代码的可读性，和可维护性；
提高效率；

## （4）PreparedStatement的使用

使用Connection的PreparedStatement(String sql)：即创建它时就让它与一条SQL模板绑定；
调用PreparedStatement的setXXX()系列的方法为问号（占位符）设置值；
调用executeUpdate()或executeQuery()方法；


