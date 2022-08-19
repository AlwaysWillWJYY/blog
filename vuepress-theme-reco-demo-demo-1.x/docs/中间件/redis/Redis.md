---
title: Redis简介
date: 2022-04-22
categories:
 - Redis
tags:
 - Redis
---

### Redis特点

1、非关系型的键值对数据库，可以根据键以O（1）的时间复杂度取出或插入关联值；

2、Redis的数据是存在内存中的；

3、键值对中的见的类型可以是字符串，整形，浮点型等，且键是唯一的；

4、键值对中的值类型可以是String、hash、list、set、sorted set等；

5、Redis内置了复制，磁盘永久化，LUA脚本，事务，SSL，客户端代理等功能；

6、通过Redis哨兵和自动分区提供高可用性。

### Redis的应用场景----缓存

![在这里插入图片描述](https://img-blog.csdnimg.cn/b0856f1b98274bc6a1aa64083405e44b.png)

1）第一次查询数据时，会去数据库查询；

2）从数据库查询的信息会缓存到Redis中；

3）下一次再查询同一个信息，会先去Redis中查找，直接访问Redis时，访问内存，比访问数据库效率高得多。

4）高并发时，Redis缓存可以减轻数据库的压力。

Zset可以实现排行榜。

### Redis的底层数据结构

1、Redis是非关系型数据库，是利用K-V键值对存储数据的；

2、存储海量数据

a.数组 O(1) -> 知道数据的下标   ，连续的内存空间【Redis的底层是使用数组存储数据的，所以可以做到时间复杂度为O(1)】

key : string , int , float.....，Redis的key可以是字符串、整形、浮点型数据

我们通过hash函数，可以将key转为一个整数，对这个整数再进行一些处理，使该整数作为该K-V在数组中的下标，而对应的值就是键对应的值；

补充：

b.树（B+树，红黑树，AVL树），log(N)

c.链表  O(N)

哈希函数：md5 ，crc16

md5(any key) => hashcode -> 自然数【非常大】 % data.size = [0 , data.size - 1]

`实现原理是，对键取hashcode，将hashcode作为数组的下标，这样每一个键，都有一个在数组中的特定位置，用来存放值`

data[4]：底层设置一个长度为4的数组；

存储值：

set k1 v1
set k2 v2
set k3 v3

hash(k1) = hashcode % 4 = 1
hash(k2) = hashcode % 4 = 2
hash(k3) = hashcode % 4 = 1

data[0]
data[1]   k1  k3  此时出现hash冲突
data[2]   k2
data[3]

Redis是使用链表的头插法解决哈希冲突。

![在这里插入图片描述](https://img-blog.csdnimg.cn/1e3858a94cf04e01bbcff13f198520e5.png)

Redis的默认情况下有16个数据库

Redis支持数据类型

String set k1 v1

List lpush some-list  a b c d

字典dict

`在Redis中所有的key都是String类型：SDS：是Redis自己定义的一种新的数据结构`

String

Redis是使用C语言实现的。

c:
char data[] = "aaa    '\0'"；  C语言数组的结尾是'\0'

`sds：simple dynamic string 简单的动态字符串`

SDS的字段：

len：当前字符串长度，使用len来控制数据长度

free：字符串的剩余空间 

char buf[]：柔性的数组：先开辟较大的数据空间，使用len控制大小，不必频繁扩容

先对key求哈希，获得索引下标的位置，然后将其存储到对应的下标位置。

* val指向RedisObject对象

Redis的值都是RedisObject对象，可以支持丰富的数据类型

RedisObject的数据结构：

type字段：代表当前对象所属的类型：String list set ，指定对于不同类型的值，我们可以进行什么样的操作；

encoding：代表当前数据在底层的存储结构

LRU算法：最近最少使用

*ptr字段：指向了真实数据的存储。

**Redis的底层是一个数组，Redis的存储模式是键值对的存储模式

Redis下对应默认有16个DB，每个DB中的存储结构是字典dict，而字典的实现是一个hashTable

Redis的键的数据结构是Redis自定的一种SDS数据结构：Simple Dynamic String 简单的动态字符串

Redis拿到键之后，会对键进行hash（hash的过程是，使用hash算出键的哈希值，再对数组的长度取模，获得该键值对应该在数组中存在的下标，如果出现哈希冲突，Redis使用链表法和头插法解决哈希冲突）。**

**Redis的值可以是多种数据类型，比如String，hash，list，set，zset等，但是Redis将这些数据结构统一封装成RedisObject对象，RedisObject对象中的type字段，可以指定该对象的实际类型。**

![在这里插入图片描述](https://img-blog.csdnimg.cn/0e7d2e28eded4c9b8d39b59beae7ec64.png)




