---
title: Kafka三种消费模式
date: 2022-04-14
publish: false
---

### 自动提交offset

    
以下实例代码展示了如何自动提交topic的offset：

![在这里插入图片描述](https://img-blog.csdnimg.cn/e76aa1f9c1674a0d901e6c43f1327926.png)

Properties的实例props中存放的key意义：

1）bootstrap.servers表示要连接的Kafka集群中的节点，其中9092表示端口号；

2）enable.auto.commit为true，表示在auto.commit.interval.ms时间后会自动提交topic的offset，其中auto.commit.interval.ms默认值为5000ms；

3）其中foo和bar为要消费的topic名称，由group.id为test作为consumer group统一进行管理；

4）key.deserializer和value.deserializer表示指定将字节序列化为对象。

### 手动提交offset

生产环境中，需要在数据消费完全后再提交offset，也就是说在数据从kafka的topic取出来后并被逻辑处理后，才算是数据被消费掉，此时需要手动去提交topic的offset。

以下实例代码展示了如何手动提交topic的offset：

![在这里插入图片描述](https://img-blog.csdnimg.cn/69137345a7ce4681a2caf9c05a77358e.png)

本方案的缺点是必须保证所有数据被处理后，才提交topic的offset。为避免数据的重复消费，可以用第三种方案，根据每个partition的数据消费情况进行提交，称之为“at-least-once”。

### 手动提交partition的offset

以下实例代码展示了如何手动提交topic中每一partition的offset：

![在这里插入图片描述](https://img-blog.csdnimg.cn/11106fbc82544a2f96a2146d94915eb1.png)
