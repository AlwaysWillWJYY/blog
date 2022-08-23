---
title: HTTP和HTTPS
date: 2022-05-14
categories:
 - 计算机网络
tags:
 - 计算机网络
---

### HTTPS和HTTP的区别？

`HTTP`是超文本传输协议：

1、基于请求/响应模式；

2、`http1.0`之前，`http`协议是无连接的，每一次连接只能处理一次请求响应；

3、`HTTP`是无状态的，是指对事务的处理没有记忆，后续如果需要处理之前的数据，必须要重传；

4、传输方式也是明文传输，是不安全的，且无法保证数据的完整性；

`HTTPS`是在`HTTP`的基础之上，增加了`SSL`加密过程，将传输过程中的数据进行加密，`HTTPS`是安全的传输。

可以保证数据的完整性，防止传输的内容被中间人冒充或篡改。

`SSL`过程：

1）`client_hello`：客户端向服务端发送一个明文请求，请求中携带了`SSL`的版本号，自己支持的加密算法，还有一个随机数`Random_C`；

2）`server_hello`：服务端收到客户端的消息之后，选择`SSL`版本号、从客户端支持的加密算法中选择一个加密算法，并生成一个随机数`Random_S`；并将自己的证书交给客户端；

3）客户端校验证书，证书对应的公钥b一般会被写死在操作系统中，客户端去操作系统找进行验证；

4）客户端验证证书通过后，会再次生成一个随机数`Pre-master`，并使用证书公钥加密，发送给服务器，此时客户端已经拥有所有加密所需的随机数：`Random_C`、`Random_S`、`Pre_master`，此时客户端计算得到协商秘钥：

`enc_key = Fun(random_C,randm_S,pre_master)`。该`fun`为服务端和客户端商量好的加密算法；

5）服务端在接收到客户端使用公钥加密的`Pre_master`之后，使用私钥将其解密，并在服务端也计算出协商的`key`：

此时服务端也拥有`Random_C`、`Random_S`、`Pre_master`三个随机数：

`enc_key = Fun(random_C,random_S,pre_master)`；

6）开始使用协商秘钥和加密算法进行加密通信。

**HTTPS**

![在这里插入图片描述](https://img-blog.csdnimg.cn/c6f07184d17e42af9534ec08eb8d07bc.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBAbGVlZGNvZGVKb2huMDE=,size_12,color_FFFFFF,t_70,g_se,x_16)

**对称加密**

![在这里插入图片描述](https://img-blog.csdnimg.cn/7901828bc9e34b0fbbab88228c4e2eee.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBAbGVlZGNvZGVKb2huMDE=,size_10,color_FFFFFF,t_70,g_se,x_16)

![在这里插入图片描述](https://img-blog.csdnimg.cn/1ddfc7b7d1474ff4a7187f0b715af705.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBAbGVlZGNvZGVKb2huMDE=,size_13,color_FFFFFF,t_70,g_se,x_16)

对称加密出现的问题：

服务端只会制定一个K，这样黑客也能拿到这个K，对数据进行解密，所以对称加密也不可；

**非对称加密**

![在这里插入图片描述](https://img-blog.csdnimg.cn/4ec43546e50c429093343b91be6f4047.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBAbGVlZGNvZGVKb2huMDE=,size_17,color_FFFFFF,t_70,g_se,x_16)

![在这里插入图片描述](https://img-blog.csdnimg.cn/f48af502799845b0b40c69b559dfb4de.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBAbGVlZGNvZGVKb2huMDE=,size_20,color_FFFFFF,t_70,g_se,x_16)

非对称加密出现的问题：

服务端向客户端发送数据时，必须使用私钥加密（客户端没有私钥），客户端使用公钥解密,但是黑客也能获取公钥，对于服务端发送给客户端的Y'也能解密，所以不可取；

对称+非对称

先利用非对称加密的方式在客户端和服务端之间协商出一个key，再使用该Key进行对称加密，传输数据

这样一来，客户端和服务端的key是他两共有的，协商好的，别人无法窃取

![在这里插入图片描述](https://img-blog.csdnimg.cn/7efbef26649b4bcfb8ab994df95d4107.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBAbGVlZGNvZGVKb2huMDE=,size_20,color_FFFFFF,t_70,g_se,x_16)

存在的问题：中间人问题

![在这里插入图片描述](https://img-blog.csdnimg.cn/c490d2b9a2dc4692bef6f9d398facfee.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBAbGVlZGNvZGVKb2huMDE=,size_18,color_FFFFFF,t_70,g_se,x_16)

如何解决中间人问题：

![在这里插入图片描述](https://img-blog.csdnimg.cn/3cd1652345a2498489b07fb9e113711c.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBAbGVlZGNvZGVKb2huMDE=,size_15,color_FFFFFF,t_70,g_se,x_16)

![在这里插入图片描述](https://img-blog.csdnimg.cn/7e99ff609af34c0596044a4278145bfe.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBAbGVlZGNvZGVKb2huMDE=,size_20,color_FFFFFF,t_70,g_se,x_16)

![在这里插入图片描述](https://img-blog.csdnimg.cn/b9d1e349aeab466c899866f004ad18c9.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBAbGVlZGNvZGVKb2huMDE=,size_20,color_FFFFFF,t_70,g_se,x_16)

**对称加密+非对称加密+CA机构的安全认证，解决了中间人问题**

详细讲解协商的过程:

![在这里插入图片描述](https://img-blog.csdnimg.cn/e6bdca9a801b4a6c80043eccd63b66fc.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBAbGVlZGNvZGVKb2huMDE=,size_20,color_FFFFFF,t_70,g_se,x_16)

`HTTPS`：使用了

对称加密+非对称加密+`hash`散列（`md5`算法)+`CA`认证
