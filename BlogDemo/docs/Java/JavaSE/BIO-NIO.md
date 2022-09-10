---
title: BIO-NIO
date: 2022-03-02
publish: false
---

### 什么是JavaNIO？

NIO（Non-Blocking I/O,java中,也称为New I/O），是一种同步非阻塞的I/O模型，也是I/O多路复用的基础，已经被越来越多地应用到大型应用服务器,是解决高并发、I/O处理问题的有效方式。

### 传统的BIO

BIO（Blocking I/O）即同步阻塞I/O，在NIO出现之前主要使用BIO及新建线程的方式来解决并发请求，但这样很容易因线程瓶颈而造成限制.

### 多路复用机制是如何支持海量连接

NIO的线程模型对Socket发起的连接不需要每个都创建一个线程，完全可以使用一个Selector来多路复用监听N多个Channel是否有请求，该请求是对应的连接请求，还是发送数据的请求，这里面是基于操作系统底层的Select通知机制的，一个Selector不断的轮询多个Channel，这样避免了创建多个线程，只有当某个Channel有对应的请求的时候才会创建线程，可能说1000个请求，只有100个请求是有数据交互的， 这个时候可能server端就提供10个线程就能够处理这些请求。这样的话就可以避免了创建大量的线程。