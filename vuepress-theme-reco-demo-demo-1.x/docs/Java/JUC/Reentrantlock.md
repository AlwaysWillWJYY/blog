---
title: Reentrantlock
date: 2022-03-04
categories:
 - Java
tags:
 - Reentrantlock
 - JUC
---

### 为什么有了synchronized还需要有reentrantlock？

JDK1.6之后才有reentrantlock

1.6之前实现synchronized是重量级锁，调用的操作系统的本地方法

CPU会在用户态和内核态之间频繁切换

而Reentrantlock会尽量让线程同步维护在JVM级别

concurrentHashMap的线程同步---1.7及之前：用的是Reentrantlock，1.8开始使用的synchronized

自旋锁：
自己定义一个类充当一把锁：

```java
class A{
    volalitle int status = 0;   //标识是否有线程上锁成功

    void lock(){
        while(!compareAndSet(0,1)){
            //如果将status的值成功从0改为1，则可以退出循环
            //否则将会一直重复循环，也就是自旋，直到获得锁为止
        }
    }

    void unlock(){
        status = 10;
    }
}
```

自旋锁会大量占用CPU的资源

改进：让得不到锁的线程让出CPU：yield+ 自旋

不能使用wait：wait的主要功能是用来进行线程间的通信，但是wait必须要和synchronized关键字组合，而且使用的底层也是C++

改进：sleep + 自旋

```java
class A{
    volalitle int status = 0;   //标识是否有线程上锁成功

    void lock(){
        while(!compareAndSet(0,1)){
            sleep(10);   //睡眠时间不能确定
        }
    }

    void unlock(){
        status = 10;
    }
}
```
改进：park + 自旋

```java
class A{
    volalitle int status = 0;   //标识是否有线程上锁成功
    Queue parkQueue;   //队列

    void lock(){
        while(!compareAndSet(0,1)){
            park();
        }

        unlock();

    }

    void unlock(){
        status = 0;
        lock_notify();
    }

    void park(){
        //将线程加入等待队列
        parkQueue.add(currentThread);
        //将当前线程释放cpu，阻塞
        releaseCPU();
    }

    void lock_notify(){
        //得到要唤醒的线程：队列得头部线程
        Thread  t = parkQueue.header();
        //唤醒等待线程
        unpark(t);
    }
}
```
`Reentrantlock内部维护了一个status状态量和一个等待队列`

Reentrantlock是公平锁还是非公平锁？

默认的是非公平锁，创建锁的时候加参数true会实现公平锁

公平锁，在一个线程尝试获取锁，调用lock方法的时候，会先判断当前锁的状态，如果锁是自由状态，也不会立即获取锁

而是叫醒等待队列里的第一个线程来获取锁

而非公平锁，连s == 0都不会进行判断，就会立即进行CAS尝试获取锁

**AQS的内部就是一个双向链表：链表中的节点是一个线程**

