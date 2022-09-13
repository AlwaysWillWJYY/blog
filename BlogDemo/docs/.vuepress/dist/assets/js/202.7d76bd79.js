(window.webpackJsonp=window.webpackJsonp||[]).push([[202],{662:function(s,e,v){"use strict";v.r(e);var i=v(1),_=Object(i.a)({},(function(){var s=this,e=s._self._c;return e("ContentSlotsDistributor",{attrs:{"slot-key":s.$parent.slotKey}},[e("h3",{attrs:{id:"主题"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#主题"}},[s._v("#")]),s._v(" 主题")]),s._v(" "),e("p",[s._v("Redis主从复制、哨兵机制、Redis集群")]),s._v(" "),e("h3",{attrs:{id:"目标"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#目标"}},[s._v("#")]),s._v(" 目标")]),s._v(" "),e("p",[s._v("·理解什么是Redis的主从复制、哨兵机制、官方集群方案Cluster")]),s._v(" "),e("p",[s._v("·会搭建Redis主从、哨兵、Redis Cluster")]),s._v(" "),e("p",[s._v("·理解Redis主从的问题")]),s._v(" "),e("p",[s._v("·理解Redis主从的实现原理（全量同步，增量同步，部分同步的概念）")]),s._v(" "),e("p",[s._v("·理解Redis哨兵机制的实现原理")]),s._v(" "),e("p",[s._v("·理解Cluster的实现原理")]),s._v(" "),e("h3",{attrs:{id:"redis主从复制"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#redis主从复制"}},[s._v("#")]),s._v(" Redis主从复制")]),s._v(" "),e("p",[s._v("生产上永远不可能用单机，所有的节点，包括应用节点，中间件节点，数据节点等都要保证高可用，最基本的要求。")]),s._v(" "),e("p",[e("code",[s._v("主从必然存在延迟问题")]),s._v("，Redis按照分布式集群来讲，就不是强一致性的CPA结构，只保证了高可用AP，没有保证强一致性CP，所以必然存在延迟。")]),s._v(" "),e("p",[s._v("CAP：")]),s._v(" "),e("p",[s._v("一致性（Consistency）")]),s._v(" "),e("p",[s._v("可用性（Availability）")]),s._v(" "),e("p",[s._v("分区容忍性（Partition tolerance）")]),s._v(" "),e("p",[s._v("如果业务需要主从机制必须强一致，那就要考虑适不适合选择Redis了。")]),s._v(" "),e("h3",{attrs:{id:"什么是主从复制"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#什么是主从复制"}},[s._v("#")]),s._v(" 什么是主从复制")]),s._v(" "),e("p",[s._v("如果单机情况下，机器重启，内存数据丢失，如何保证数据的高可用呢？持久化方案如果单机，这台机器的硬件坏了，例如硬盘坏了，或者访问压力太大，服务器崩溃，如果保证数据的高可用？主从复制")]),s._v(" "),e("p",[s._v("Redis的主从机制：主负责读写，从一般只读不能写（客户端）。")]),s._v(" "),e("p",[s._v("和Mysql主从复制的原因一样，Redis虽然读取写入的速度都特别快，但是也会产生读压力特别大的情况。为了分担读压力，Redis支持主从复制，Redis的主从结构可以采用一主多从或者级联结构，Redis主从复制可以根据是否是全量分为全量同步和增量同步。下图为级联结构。 如下图：")]),s._v(" "),e("p",[e("img",{attrs:{src:"https://img-blog.csdnimg.cn/c40fc0bffe2d4097a038cf3f11714122.png",alt:"在这里插入图片描述"}})]),s._v(" "),e("p",[s._v("主从复制特点：")]),s._v(" "),e("p",[s._v("1）采用异步复制；")]),s._v(" "),e("p",[s._v("2）一个主redis可以含有多个从redis；")]),s._v(" "),e("p",[s._v("3）每个从redis可以接收来自其他从redis服务器的连接；")]),s._v(" "),e("p",[s._v("4）主从复制对于主redis服务器来说是非阻塞的，这意味着当从服务器在进行主从复制同步过程中，主redis仍然可以处理外界的访问请求；")]),s._v(" "),e("p",[s._v("5）主从复制对于从redis服务器来说也是非阻塞的，这意味着，即使从redis在进行主从复制过程中也可以接受外界的查询请求，只不过这时候从redis返回的是以前老的数据，如果你不想这样，那么在启动redis时，可以在配置文件中进行设置，那么从redis在复制同步过程中来自外界的查询请求都会返回错误给客户端；（虽然说主从复制过程中对于从redis是非阻塞的，但是当从redis从主redis同步过来最新的数据后还需要将新数据加载到内存中，在加载到内存的过程中是阻塞的，在这段时间内的请求将会被阻，对于大数据集，加载到内存的时间也是比较多的）；")]),s._v(" "),e("p",[s._v("6）主从复制提高了redis服务的扩展性，避免单个redis服务器的读写访问压力过大的问题，同时也可以给为数据备份及冗余提供一种解决方案；")]),s._v(" "),e("p",[s._v("7）为了避免主redis服务器写磁盘压力带来的开销，可以配置让主redis不在将数据持久化到磁盘，而是通过连接让一个配置的从redis服务器及时的将相关数据持久化到磁盘，不过这样会存在一个问题，就是主redis服务器一旦重启，因为主redis服务器数据为空，这时候通过主从同步可能导致从redis服务器上的数据也被清空；")])])}),[],!1,null,null,null);e.default=_.exports}}]);