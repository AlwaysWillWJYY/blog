---
title: Controller为什么是单例模式
date: 2022-03-19
categories:
 - SSM
tags:
 - SSM
---


### @Controller为什么是单例模式

1、不要在Controller中定义成员变量；

2、万一必须要定义一个非静态成员变量时，则通过注解@Scope("prototype")，将其设置为多例模式

为什么Spring默认将Controller设置为单例的？

1、性能问题：单例不需要频繁的创建对象；

2、不需要：一般来说只要不在Controller中定义属性，单例模式就不会出现线程安全问题。
