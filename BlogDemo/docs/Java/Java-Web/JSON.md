---
title: JSON
date: 2022-03-01
---

### JavaScript

功能：可以用来增强用户和HTML页面的交互过程，可以控制HTML元素，让页面有一些动态的效果，增强用户体验；

### JQuery

一个JavaScript的框架，简化JS开发

JQuery是一个快速、简洁的JavaSpring框架，是继Prototype之后又一优秀的JavaScript代码库，JQuery设计的宗旨是“write less，do more”。它封装JavaScript常用的功能代码，提供一种简便的JavaScript设计模式，优化HTML文档操作、事件处理、动画设计和AJAX交互

### AJAX（Asynchronous IavaScript And XML）：异步的JavaScript和XML

1、同步与异步：客户端和服务器相互通信的基础上

* 同步：客户端必须等待服务器的响应，在等待期间客户端不能做其他操作；

* 异步：客户端不需要等待服务器端的响应。在服务器处理请求的过程中，客户端可以进行其他操作；

2、`Ajax`是一种在无需重新加载整个页面的情况下，能够更新部分网页的技术。通过在后台与服务器进行少量的数据交换，Ajax可以使网页实现异步更新。这意味着可以在不重新加载整个网页的情况下，对网页的某部分进行更新。

利用`AJAX`技术可以做什么？

1、注册时，输入用户名自动检测用户名是否已经存在；

2、登录时，是用户名密码错误；

3、删除数据时，将行ID发送到后台，后台在数据库中删除，数据库删除成功后，在页面DOM中将数据也删除。

Ajax的核心是`XMLHttpRequest`对象（XHR）。XHR为向服务器发送请求和解析服务器响应提供了接口。能够以异步的方式从服务器获取新数据。

JQuery提供多个与Ajax有关的方法。

通过JQuery Ajax方法，您能够使用HTTP Get和HTTP Post才能够远程服务器上请求文本。HTML、XML或JSON-同时您能够把这些外部数据直接载入网页的被选元素中。

JQuery AJAX本质就是`XMLHttpRequest`，对他进行了封装，方便调用。

### JSON：JavaScript对象表示法

`json`数据是由键值对构成；




