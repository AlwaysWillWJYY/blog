---
title: Zookeeper定义
date: 2022-04-07
categories:
 - Zookeeper
tags:
 - 中间件
---

### 1、什么是Zookeeper

» Zookeeper 是 Google 的 Chubby一个开源的实现，是 Hadoop 的分布式协调服务

» 它包含一个简单的原语集，分布式应用程序可以基于它实现同步服务，配置维护和命名服务等

### 2、为什么要用Zookeeper

» 大部分分布式应用需要一个主控、协调器或控制器来管理物理分布的子进程（如资源、任务分配等）

» 目前，大部分应用需要开发私有的协调程序，缺乏一个通用的机制

» 协调程序的反复编写浪费，且难以形成通用、伸缩性好的协调器

» Keepalived：提供通用的分布式锁服务，用以协调分布式应用但是：

• Keepalived监控节点不好管理

• Keepalive 采用优先级监控

• 没有协同工作

• 功能单一

• Keepalive可扩展性差

### 3、Zookeeper的优点

![在这里插入图片描述](https://img-blog.csdnimg.cn/ad539f5dd6cb464098afbe2c96c04d5c.png)

### 4、Zookeeper的工作原理

1.每个Server在内存中存储了一份数据；

2.Zookeeper启动时，将从实例中选举一个leader（Paxos协议）

3.Leader负责处理数据更新等操作

4.一个更新操作成功，当且仅当大多数Server在内存中成功修改数据。

![在这里插入图片描述](https://img-blog.csdnimg.cn/317cf2d998e94358a631840b0eb97d94.png)

### 5、Zookeeper能做什么

» Hadoop,使用Zookeeper的事件处理确保整个集群只有一个NameNode,存储配置信息等.

» HBase,使用Zookeeper的事件处理确保整个集群只有一个HMaster,察觉HRegionServer联机和宕机,存储访问控制列表等.

### 6、Zookeeper的特性

» Zookeeper是简单的

» Zookeeper是富有表现力的

» Zookeeper具有高可用性

» Zookeeper采用松耦合交互方式

» Zookeeper是一个资源库
