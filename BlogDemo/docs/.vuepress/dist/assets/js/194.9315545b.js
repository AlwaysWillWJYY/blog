(window.webpackJsonp=window.webpackJsonp||[]).push([[194],{654:function(v,s,_){"use strict";_.r(s);var e=_(1),t=Object(e.a)({},(function(){var v=this,s=v._self._c;return s("ContentSlotsDistributor",{attrs:{"slot-key":v.$parent.slotKey}},[s("h3",{attrs:{id:"redis特点"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#redis特点"}},[v._v("#")]),v._v(" Redis特点")]),v._v(" "),s("p",[v._v("1、非关系型的键值对数据库，可以根据键以O（1）的时间复杂度取出或插入关联值；")]),v._v(" "),s("p",[v._v("2、Redis的数据是存在内存中的；")]),v._v(" "),s("p",[v._v("3、键值对中的见的类型可以是字符串，整形，浮点型等，且键是唯一的；")]),v._v(" "),s("p",[v._v("4、键值对中的值类型可以是String、hash、list、set、sorted set等；")]),v._v(" "),s("p",[v._v("5、Redis内置了复制，磁盘永久化，LUA脚本，事务，SSL，客户端代理等功能；")]),v._v(" "),s("p",[v._v("6、通过Redis哨兵和自动分区提供高可用性。")]),v._v(" "),s("h3",{attrs:{id:"redis的应用场景-缓存"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#redis的应用场景-缓存"}},[v._v("#")]),v._v(" Redis的应用场景----缓存")]),v._v(" "),s("p",[s("img",{attrs:{src:"https://img-blog.csdnimg.cn/b0856f1b98274bc6a1aa64083405e44b.png",alt:"在这里插入图片描述"}})]),v._v(" "),s("p",[v._v("1）第一次查询数据时，会去数据库查询；")]),v._v(" "),s("p",[v._v("2）从数据库查询的信息会缓存到Redis中；")]),v._v(" "),s("p",[v._v("3）下一次再查询同一个信息，会先去Redis中查找，直接访问Redis时，访问内存，比访问数据库效率高得多。")]),v._v(" "),s("p",[v._v("4）高并发时，Redis缓存可以减轻数据库的压力。")]),v._v(" "),s("p",[v._v("Zset可以实现排行榜。")]),v._v(" "),s("h3",{attrs:{id:"redis的底层数据结构"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#redis的底层数据结构"}},[v._v("#")]),v._v(" Redis的底层数据结构")]),v._v(" "),s("p",[v._v("1、Redis是非关系型数据库，是利用K-V键值对存储数据的；")]),v._v(" "),s("p",[v._v("2、存储海量数据")]),v._v(" "),s("p",[v._v("a.数组 O(1) -> 知道数据的下标   ，连续的内存空间【Redis的底层是使用数组存储数据的，所以可以做到时间复杂度为O(1)】")]),v._v(" "),s("p",[v._v("key : string , int , float.....，Redis的key可以是字符串、整形、浮点型数据")]),v._v(" "),s("p",[v._v("我们通过hash函数，可以将key转为一个整数，对这个整数再进行一些处理，使该整数作为该K-V在数组中的下标，而对应的值就是键对应的值；")]),v._v(" "),s("p",[v._v("补充：")]),v._v(" "),s("p",[v._v("b.树（B+树，红黑树，AVL树），log(N)")]),v._v(" "),s("p",[v._v("c.链表  O(N)")]),v._v(" "),s("p",[v._v("哈希函数：md5 ，crc16")]),v._v(" "),s("p",[v._v("md5(any key) => hashcode -> 自然数【非常大】 % data.size = [0 , data.size - 1]")]),v._v(" "),s("p",[s("code",[v._v("实现原理是，对键取hashcode，将hashcode作为数组的下标，这样每一个键，都有一个在数组中的特定位置，用来存放值")])]),v._v(" "),s("p",[v._v("data[4]：底层设置一个长度为4的数组；")]),v._v(" "),s("p",[v._v("存储值：")]),v._v(" "),s("p",[v._v("set k1 v1\nset k2 v2\nset k3 v3")]),v._v(" "),s("p",[v._v("hash(k1) = hashcode % 4 = 1\nhash(k2) = hashcode % 4 = 2\nhash(k3) = hashcode % 4 = 1")]),v._v(" "),s("p",[v._v("data[0]\ndata[1]   k1  k3  此时出现hash冲突\ndata[2]   k2\ndata[3]")]),v._v(" "),s("p",[v._v("Redis是使用链表的头插法解决哈希冲突。")]),v._v(" "),s("p",[s("img",{attrs:{src:"https://img-blog.csdnimg.cn/1e3858a94cf04e01bbcff13f198520e5.png",alt:"在这里插入图片描述"}})]),v._v(" "),s("p",[v._v("Redis的默认情况下有16个数据库")]),v._v(" "),s("p",[v._v("Redis支持数据类型")]),v._v(" "),s("p",[v._v("String set k1 v1")]),v._v(" "),s("p",[v._v("List lpush some-list  a b c d")]),v._v(" "),s("p",[v._v("字典dict")]),v._v(" "),s("p",[s("code",[v._v("在Redis中所有的key都是String类型：SDS：是Redis自己定义的一种新的数据结构")])]),v._v(" "),s("p",[v._v("String")]),v._v(" "),s("p",[v._v("Redis是使用C语言实现的。")]),v._v(" "),s("p",[v._v("c:\nchar data[] = \"aaa    '\\0'\"；  C语言数组的结尾是'\\0'")]),v._v(" "),s("p",[s("code",[v._v("sds：simple dynamic string 简单的动态字符串")])]),v._v(" "),s("p",[v._v("SDS的字段：")]),v._v(" "),s("p",[v._v("len：当前字符串长度，使用len来控制数据长度")]),v._v(" "),s("p",[v._v("free：字符串的剩余空间")]),v._v(" "),s("p",[v._v("char buf[]：柔性的数组：先开辟较大的数据空间，使用len控制大小，不必频繁扩容")]),v._v(" "),s("p",[v._v("先对key求哈希，获得索引下标的位置，然后将其存储到对应的下标位置。")]),v._v(" "),s("ul",[s("li",[v._v("val指向RedisObject对象")])]),v._v(" "),s("p",[v._v("Redis的值都是RedisObject对象，可以支持丰富的数据类型")]),v._v(" "),s("p",[v._v("RedisObject的数据结构：")]),v._v(" "),s("p",[v._v("type字段：代表当前对象所属的类型：String list set ，指定对于不同类型的值，我们可以进行什么样的操作；")]),v._v(" "),s("p",[v._v("encoding：代表当前数据在底层的存储结构")]),v._v(" "),s("p",[v._v("LRU算法：最近最少使用")]),v._v(" "),s("p",[v._v("*ptr字段：指向了真实数据的存储。")]),v._v(" "),s("p",[v._v("**Redis的底层是一个数组，Redis的存储模式是键值对的存储模式")]),v._v(" "),s("p",[v._v("Redis下对应默认有16个DB，每个DB中的存储结构是字典dict，而字典的实现是一个hashTable")]),v._v(" "),s("p",[v._v("Redis的键的数据结构是Redis自定的一种SDS数据结构：Simple Dynamic String 简单的动态字符串")]),v._v(" "),s("p",[v._v("Redis拿到键之后，会对键进行hash（hash的过程是，使用hash算出键的哈希值，再对数组的长度取模，获得该键值对应该在数组中存在的下标，如果出现哈希冲突，Redis使用链表法和头插法解决哈希冲突）。**")]),v._v(" "),s("p",[s("strong",[v._v("Redis的值可以是多种数据类型，比如String，hash，list，set，zset等，但是Redis将这些数据结构统一封装成RedisObject对象，RedisObject对象中的type字段，可以指定该对象的实际类型。")])]),v._v(" "),s("p",[s("img",{attrs:{src:"https://img-blog.csdnimg.cn/0e7d2e28eded4c9b8d39b59beae7ec64.png",alt:"在这里插入图片描述"}})])])}),[],!1,null,null,null);s.default=t.exports}}]);