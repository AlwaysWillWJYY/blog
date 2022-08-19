## HTTP的请求头

### HTTP报文首部

`HTTP`协议的请求和响应报文中必定包含`HTTP`报文首部。首部内容分别为客户端和服务器处理请求和响应提供所需要的信息。

1、 HTTP请求报文

在请求中，`HTTP`报文由方法、`URL`、`HTTP`版本、`HTTP`首部字段等部分构成。

2、 HTTP响应报文

在响应中，`HTTP`报文由`HTTP`版本、状态码（数字和原因短语）、`HTTP`首部字段3部分构成

3、请求和响应报文实例

![在这里插入图片描述](https://img-blog.csdnimg.cn/7d9fb06cd5ea489caf7fcbe69d1d3591.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBAbGVlZGNvZGVKb2huMDE=,size_13,color_FFFFFF,t_70,g_se,x_16)

### HTTP首部字段

`HTTP`首部字段是构成`HTTP`报文的要素之一，它可以给浏览器、服务器提供报文主体大小，使用的语言，认证信息等。

1、`HTTP`首部字段结构

`HTTP`首部字段都是由字段名：字段值构成的

`Content-Type : text/html`

单个`HTTP`首部字段可以有多个值，用逗号（”,“）隔开，如下：

`keep-Alive:timeout=15,max=100`

2、`HTTP`首部字段类型

① 通用首部字段

请求报文和响应报文两方都会使用的首部

② 请求首部字段

从客户端向服务器端发送请求报文时使用的首部

③ 响应首部字段

从服务器端向客户端返回响应报文时使用的首部

④ 实体首部字段

针对请求报文和响应报文实体部分使用的首部

3、`HTTP`首部字段一览

**通用首部字段**

![在这里插入图片描述](https://img-blog.csdnimg.cn/386ea1950c9140ceb1893e5efbf8790c.png)

**请求首部字段**

![在这里插入图片描述](https://img-blog.csdnimg.cn/0b3804896b7f4702809fc6b18f926c6c.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBAbGVlZGNvZGVKb2huMDE=,size_7,color_FFFFFF,t_70,g_se,x_16)

**响应首部字段**

![在这里插入图片描述](https://img-blog.csdnimg.cn/99f61165a2654dd78f5c6e688422cd77.png)

**实体首部字段**

![在这里插入图片描述](https://img-blog.csdnimg.cn/6db8bd061dee434ea3e06ebed926e65a.png)

### `HTTP`通用首部字段

1、Cache-Control

通过指定首部字段`Cache-control`的指令就，就能操作缓存的工作机制。

1.1 缓存请求指定

![在这里插入图片描述](https://img-blog.csdnimg.cn/ad51adbac41b4bca8b711b613cce09c5.png)

1.2 缓存响应指令

![在这里插入图片描述](https://img-blog.csdnimg.cn/0ec453328c2c48f3b44651617f3050f4.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBAbGVlZGNvZGVKb2huMDE=,size_9,color_FFFFFF,t_70,g_se,x_16)

1.3 表示是否能缓存的指令

1）`public`指令

`Cache-Control：public`

当指定`public`时，则明确表示其他用户也可利用缓存

2）`private`指令

`Cache-Control：private`

当指定`private`指令时，响应只以特定的用户作为对象，这与`public`指令的行为相反。缓存服务器会对该用户提供资源缓存的服务，对于其他用户发送过来的请求，代理服务器不会返回缓存。

3) `no-cache`指令

`Cache-Control：no-cache`

`no-cache`指令的目的是为了防止从缓存中返回过期的资源，缓存会向源服务器进行有效期确认后处理资源。

客户端发送的请求中如果包含`no-cache`指令，则表示客户端不会接收缓存过的响应，缓存服务器必须把客户端请求转发给源服务器。从源服务器返回最新资源后，缓存服务器依然可以将最新资源进行缓存，然后再返回给客户端，除非服务器端也返回`no-cache`指令。

服务端返回的响应中如果包含`no-cache`指令，那么缓存服务器不能对资源进行缓存，源服务器以后也不会再对缓存服务器请求中提出的资源有效性进行确认

2、`Connection`

它有两个作用：

1）控制不再转发给代理的首部字段

`Connection：Upgarde`（不再转发的首部字段名）

2）管理持久连接

`HTTP/1.1`版本的默认连接都是持久连接（长连接），然后客户端会在持久连接上连续发送请求，当服务器想明确断开连接时，则指定`Connection`首部字段为`close`。

`HTTP/1.1`之前的版本默认的都是非持久连接（短连接），如果想在旧版本的`HTTP`协议上维持持续连接，则需要指定`Connection`的值为`Keep-Alive`。

`Keep-Alive:timeout=10,max=500`

`Connection:keep-Alive`

3、`Date`

4、`Pragma`


### 请求首部字段

1、`accept`

该首部字段可通知服务器，用户代理能处理的媒体类型以及媒体类型的相对优先级，可使用`type/subtype`这种形式，一次指定多种媒体类型。 如果想要给显示的媒体类型增加优先级，就使用`q`=来额外表示权重值，用" ; "进行分隔。权重值`q`的范围是`0~1`（可精确到小数点后三位），且1为最大值。不指定权重值时，默认`q=1.0`。当服务器提供多种内容时，将会首先返回媒体值最高的类型。

![在这里插入图片描述](https://img-blog.csdnimg.cn/52e909626bcf43e0bd9faa7534c5ee1b.png)

2、 `accept-Charset`

该首部字段可用来通知服务器用户代理支持的字符集及字符集的相对优先级顺序。同样，可一次性指定多个字符集，用`q`=来表示字符集的相对优先级.

3、 `Accept-Encoding`

该首部字段可用来通知服务器用户代理支持的内容编码及内容编码的优先级顺序。同样，可一次性指定多种内容编码，用`q`=来表示内容编码的相对优先级。

4、 `From`

`From:info@qq.com`

该首部字段用来告知服务器使用代理的用户的电子邮件地址。通常，使用目的就是为了显示搜索引擎等用户代理的负责人的电子邮件联系方式。使用代理时，应尽可能使用该字段，但有的代理可能会将电子邮件地址在`User-Agent`首部字段内。

5、 `host`

`Host：www.baidu.com`

该首部字段会告知服务器，请求的资源所处的互联网主机名和端口号。它是`HTTP/1.1`规范中唯一一个必须包含在请求内的首部字段。

### 响应首部字段

1、 `accept-ranges` `Accept-Ranges: bytes`

该首部字段是用于告知客户端服务器是否能处理范围请求，以指定获取服务器端某个部分的资源。它可以指定的字段值有两种，可处理范围请求时指定其为`bytes`，反之则指定为`none`。

2、`Age`

`Age：600`

该首部字段可以告知客户端，源服务器在多久前创建了响应，字段值的单位为秒。若创建该响应的服务器是缓存服务器，`Age`值是指缓存后的响应再次发起认证到认证完成的时间值。代理创建响应时必须加上首部字段`Age`。

3、`Location`

 使用首部字段` Location `可以将响应接收方引导至某个与请求 `URI` 位置不同的资源。基本上，该字段会配合 `3xx ：Redirection` 的响应，提供重定向的`URI`。几乎所有的浏览器在接收到包含首部字段 `Location `的响应后，都会强制性地尝试对已提示的重定向资源进行访问

### 实体首部字段

1、`Allow`

`Allow: GET, HEAD`

该首部字段用于通知客户端能够支持 `Request-URI `指定资源的所有` HTTP `方法。当服务器接收到不支持的 `HTTP` 方法时，会以状态码`405 Method Not Allowed` 作为响应返回。与此同时，还会把所有能支持的` HTTP`方法写入首部字段 `Allow` 后返回。

2、`Content-Length`

`Content-Length: 15000`

首部字段 `Content-Length` 表明了实体主体部分的大小（单位是字节）。对实体主体进行内容编码传输时，不能再使用 `Content-Length`首部字段
