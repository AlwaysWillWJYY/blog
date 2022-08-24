---
title: HTTP
date: 2022-05-14
publish: false

---

### HTTP

1、HTTP常见的状态码

![在这里插入图片描述](https://img-blog.csdnimg.cn/144d7564a7254e6b9eb31358464ebb95.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBAbGVlZGNvZGVKb2huMDE=,size_14,color_FFFFFF,t_70,g_se,x_16)

2xx：

200 OK：

表示客户端发送给服务器的请求被正常处理并返回。

204 No Content：

表示客户端发送给服务器端的请求得到了处理，但在返回的响应报文中不含实体的主体部分（没有资源可以返回）;

206 Patial Content：

表示客户端进行了范围请求，并且服务器成功执行了这部分的get请求，响应报文中包含由Content-Range指定范围的实体内容。

3xx：

301 Moved Permanently：

永久性重定向，表示请求的资源被分配了新的URL，之后应使用更改后的URL；

302 Found：

临时性重定向，表示请求的资源被分配了新的URL，希望本次访问用新的URL；

4xx：

400 `Bad Request`：

表示请求报文中存在语法错误；

401 `Unauthorized`：

未经许可，需要通过`HTTP`认证；

403 Forbidden：

服务器拒绝该次访问（访问权限出现问题）

404 Not Found：

表示服务器上无法找到请求的资源，除此之外，也可以在服务器拒绝请求但不想给拒绝原因时使用；

5xx：

500 Inter Server Error：

表示服务器在执行请求时发生了错误，也有可能是web应用存在的bug或某些临时的错误时；

503 Server Unavailable：

表示服务器暂时处于超负载或正在进行停机维护，无法处理请求；

2、HTTP的请求方式

**简单介绍**

HTTP是超文本传输协议，其定义了客户端与服务器之间文本传输的规范。HTTP默认使用的端口是80 ，这个端口指的是服务端的端口，而客户端的端口是动态分配的。当我们没有指定端口访问时，浏览器会默认帮我们添加80端口。我们也可以自己指定访问端口如：http://www.ip138.com:80。需要注意的是，现在大多访问都是用了HTTPS协议，而HTTPS协议的默认端口是443，如果使用80端口访问HTTPS协议的服务器可能会被拒绝。

`HTTP`请求的方法：

HTTP/1.1中共定义了八种方法，来表明Request-URL指定的资源不同的操作方式

HTTP1.0定义了三种请求方法：Get、Post和Head方法

HTTP1.1新增了5种请求方法：OPTIONS、PUT、DELETE、TRACE和CONNECT方法

![在这里插入图片描述](https://img-blog.csdnimg.cn/c3820b2fd0d6435f934d37b3aa6ffff2.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBAbGVlZGNvZGVKb2huMDE=,size_20,color_FFFFFF,t_70,g_se,x_16)

1、OPTIONS

返回服务器针对特定资源所支持的HTTP请求方法，也可以利用向web服务器发送‘*’的请求来测试服务器的功能性

2、HEAD

向服务器索与GET请求相一致的响应，只不过响应体将不会被返回。这一方法可以再不必传输整个响应内容的情况下，就可以获取包含在响应小消息头中的元信息。

3、GET

向特定的资源发出请求。注意：GET方法不应当被用于产生“副作用”的操作中，例如在Web Application中，其中一个原因是GET可能会被网络蜘蛛等随意访问。Loadrunner中对应get请求函数：web_link和web_url

4、POST

向指定资源提交数据进行处理请求（例如提交表单或者上传文件）。数据被包含在请求体中。POST请求可能会导致新的资源的建立和/或已有资源的修改。 Loadrunner中对应POST请求函数：web_submit_data,web_submit_form

5、PUT

向指定资源位置上传其最新内容

6、DELETE

请求服务器删除Request-URL所标识的资源

7、TRACE

回显服务器收到的请求，主要用于测试或诊断

8、CONNECT

HTTP/1.1协议中预留给能够将连接改为管道方式的代理服务器。

`HTTP`工作原理:

`HTTP`协议定义web客户端如何从web服务器请求web页面，以及服务器如何把web页面传送给客户端。HTTP协议采用了请求/响应模型。客户端向服务器发送一个请求报文，请求报文包含请求的方法、URL、协议版本、请求头部和请求数据。服务器以一个状态行作为响应，响应的内容包括协议的版本、成功或者错误代码、服务器信息。响应头部和响应数据.

`HTTP`请求/响应步骤

客户端连接到`web`服务器->发送`HTTP`请求->服务端接收请求并返回`http`响应->释放`TCP`连接->客户端浏览器解析`HTML`内容

1、客户端连接到web服务器

一个HTTP客户端，通常是浏览器，与web服务器的HTTP端口（默认为80）建立一个TV平套接字连接。例如：http://www.baidu.com

2、发送HTTP请求

通过TCP套接字，客户端向web服务器发送一个文本的请求报文，一个请求报文由请求行、请求头部、空行和请求数据四个部分组成。

3、服务器接收请求并返回HTTP响应

Web服务器解析请求，定位请求资源，服务器将资源副本写到TCP套接字，由客户端读取，一个响应由状态行、响应头部、空行和响应数据四部分组成。

4、释放TCP连接

若Connection模式为close，则服务器主动关闭TCP连接，客户端被动关闭连接，释放TCP连接。若Connection模式为keepalive，则连接会保持一段时间，在该时间内可以继续接受请求。

5、客户端浏览器解析HTML内容

客户端浏览器首先解析状态行，查看表明请求是否成功的状态代码。然后解析每一个响应头，响应头告知以下为若干字节的HTML文档和文档的字符集。客户端浏览器读取响应数据HTML，根据HTML的语法对其进行格式化，并在浏览器窗口中显示。

**HTTP请求消息request**

客户端发送一个HTTP请求到服务器端的请求消息至少包括以下格式：

请求行（request line）、请求头部（request head）、空行和请求数据四个部分。

![在这里插入图片描述](https://img-blog.csdnimg.cn/cc4f5a4c9c9f4ebc81219a0c82c944d1.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBAbGVlZGNvZGVKb2huMDE=,size_12,color_FFFFFF,t_70,g_se,x_16)

请求行以一个方法符号开头，以空格分开，后面跟着请求的`URL`和协议的版本号。

Get请求例子，使用Charles抓取的request：

GET /562f25980001b1b106000338.jpg HTTP/1.1

Host    img.mukewang.com

User-Agent    Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.106 Safari/537.36

Accept    image/webp,image/*,*/*;q=0.8

Referer    http://www.imooc.com/

Accept-Encoding    gzip, deflate, sdch

Accept-Language    zh-CN,zh;q=0.8

**第一部分：请求行，用来说明请求类型,要访问的资源以及所使用的HTTP版本**.

GET说明请求类型为GET,[/562f25980001b1b106000338.jpg]为要访问的资源，该行的最后一部分说明使用的是`HTTP1.1`版本。

**第二部分：请求头部，紧接着请求行（即第一行）之后的部分，用来说明服务器要使用的附加信息**

从第二行起为请求头部，`HOST`将指出请求的目的地.`User-Agent`,服务器端和客户端脚本都能访问它,它是浏览器类型检测逻辑的重要基础.该信息由你的浏览器来定义,并且在每个请求中自动发送等等

**第三部分：空行，请求头部后面的空行是必须的**

即使第四部分的请求数据为空，也必须有空行。

**第四部分：请求数据也叫主体，可以添加任意的其他数据。**

这个例子的请求数据为空。

**POST请求例子，使用Charles抓取的request：**

POST / HTTP1.1

Host:www.wrox.com

User-Agent:Mozilla/4.0 (compatible; MSIE 6.0; Windows NT 5.1; SV1; .NET CLR 2.0.50727; .NET CLR 3.0.04506.648; .NET CLR 3.5.21022)

Content-Type:application/x-www-form-urlencoded

Content-Length:40

Connection: Keep-Alive

name=Professional%20Ajax&publisher=Wiley

第一部分：请求行，第一行明了是post请求，以及http1.1版本。

第二部分：请求头部，第二行至第六行。

第三部分：空行，第七行的空行。

第四部分：请求数据，第八行。

### HTTP请求消息Response

一般情况下，服务器接收并处理客户端发送过来的请求后会返回一个`HTTP`响应消息。`HTTP`响应消息也是由四个部分组成，分别是：状态行、消息报头、空行和响应正文。

![在这里插入图片描述](https://img-blog.csdnimg.cn/eec5d2cd2c9f47fe996458aa98561c3a.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBAbGVlZGNvZGVKb2huMDE=,size_12,color_FFFFFF,t_70,g_se,x_16)

例子
HTTP/1.1 200 OK

Date: Fri, 22 May 2009 06:07:21 GMT

Content-Type: text/html; charset=UTF-8

<html>

<head></head>

<body>

<!--body goes here-->

</body>

</html>

**第一部分：状态行，由HTTP协议版本号， 状态码， 状态消息 三部分组成。**

第一行为状态行，（HTTP/1.1）表明HTTP版本为1.1版本，状态码为200，状态消息为（ok）

**第二部分：消息报头，用来说明客户端要使用的一些附加信息**

第二行和第三行为消息报头，

`Date`:生成响应的日期和时间；`Content-Type`:指定了`MIME`类型的`HTML(text/html)`,编码类型是`UTF-8`

**第三部分：空行，消息报头后面的空行是必须的**

**第四部分：响应正文，服务器返回给客户端的文本信息。**

空行后面的html部分为响应正文。

### 请求返回状态码

`200 OK` 当您的操作将在响应正文中返回数据时，出现此结果。

`204 No content` 当您操作成功，但不在响应正文中返回数据时，出现此结果。

`304 Not Modified`（重定向）  当测试实体自上次检索以来是否被修改时，出现此结果。

`403 Forbidden`   客户端错误

`401 Unauthorized` 客户端错误

`413 Payload Too Large`（客户端错误） 当请求长度过长时，出现此结果。

`400 BadRequest`（客户端错误） 当参数无效时，出现此结果。

`404 Not Found`（客户端错误） 当资源不存在时，出现此结果。

`405 Method Not Allowed`（客户端错误）由于方法和资源组合不正确而出现此错误。 例如，您不能对一个实体集合使用 DELETE 或 PATCH。

`412 Precondition Failed`  客户端错误

`501 Not Implemented`（服务器错误） 当未实施某个请求的操作时，出现此结果。

`503 Service Unavailable`（服务器错误） 当 Web API 服务不可用时，出现此结果。

### GET与POST：

`get`方法提交的数据会直接填充在请求报文的`URL`上，如“ https://www.baidu.com/s?ie=utf-8&f=8&rsv_bp=1 ”   “？”问号划分域名和get提交的参数，A=B中的A是参数名，B是参数值，多个参数之间用&进行分割，如果参数值是中文，则会转换成诸如%ab%12加密16进制码。一般来说，浏览器处理的URL最大限度长度为1024B（不同浏览器不一样），所以GET方法提交参数长度有限制。

`post`方法提交的数据会附在正文上，一般请求正文的长度是没有限制的，但表单中所能处理的长度一般为100k（不同协议不同浏览器不一样）,而且需要考虑下层报文的传输效率，不推荐过长。

所以`GET`方法可以用来传输一些可以公开的参数信息，解析也比较方便，如百度的搜索的关键词，而POST方法可以用来提交一个用户的敏感信息（如果不使用HTTPS加密，报文正文仍旧是明文，容易被人截获读取）

### 主要特点:

1、无连接

无连接的含义是限制每次连接只处理一个请求。服务器处理完客户的请求，并收到客户的应答后，即断开连接。采用这种方式可以节省传输时间。

2、无状态

`HTTP`协议是无状态协议。无状态指的是协议对于事务处理没有记忆能力。缺少状态意味着如果后续处理需要前面的信息，则它必须重传，这样可能导致每次连接传送的数据量增大。另一方面，在服务器不需要先前信息时它的应答就较快。

3、简单快捷

客户向服务器请求服务时，只需传送请求方法和路径。请求方法常用的有`GET`、`HEAD`、`POST`。每种方法规定了客户与服务器联系的类型不同。由于HTTP协议简单，使得HTTP服务器的程序规模小，因而通信速度很快。

4、灵活

HTTP允许传输任意类型的数据对象。正在传输的类型由Content-Type加以标记。



