---
title: GET 和 POST
date: 2022-05-13
publish: false

---

### GET 和 POST

1、定义

`HTTP`协议中两种发送请求的方式

`HTTP`底层是`TCP/IP`。所以`GET`和`POST`的底层也是`TCP/IP`，也就是说，`GET/POST`都是`TCP`连接。

2、`POST`和`GET`请求的区别？

对于`GET`方式的请求：

浏览器会把`http header`和`data`一并发出去，服务器响应`200`（返回数据）；

而对于`POST`请求，浏览器先发送`header`，服务器响应`100 continue`，浏览器再发送`data`，服务器响应`200 ok`（返回数据）

即`GET`产生一个数据包；`POST`产生两个数据包。

1. get请求时不安全的，因为在传输过程，数据被放在请求的URL中，参数可见；

POST的所有操作对于用户而言是不可见的

2. Get传送的数据量小，因为受到URL长度的限制；POST传输的数据量较大，一般认为不受限制；

3. GET限制Form表单的数据集的值必须为ASCLL字符，而POST支持整个ISO10646字符集

4. GET执行效率却比POST方法好。Get是form默认提交方法。


