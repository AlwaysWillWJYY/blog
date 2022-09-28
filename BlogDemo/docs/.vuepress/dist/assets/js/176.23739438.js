(window.webpackJsonp=window.webpackJsonp||[]).push([[176],{636:function(_,v,p){"use strict";p.r(v);var t=p(1),e=Object(t.a)({},(function(){var _=this,v=_._self._c;return v("ContentSlotsDistributor",{attrs:{"slot-key":_.$parent.slotKey}},[v("p",[_._v("1、定义")]),_._v(" "),v("p",[v("code",[_._v("HTTP")]),_._v("：超文本传输协议，是一种基于请求与响应，无状态的，应用层协议，常基于"),v("code",[_._v("TCP/IP")]),_._v("协议传输数据，互联网上应用最为广泛的一种网络协议，所有的"),v("code",[_._v("WWW")]),_._v("文件都必须遵守这个标准。设计"),v("code",[_._v("HTTP")]),_._v("的初衷是为了提供一种发布和接收"),v("code",[_._v("HTML")]),_._v("页面的方法。")]),_._v(" "),v("p",[v("code",[_._v("HTTPS")]),_._v("："),v("code",[_._v("HTTPS")]),_._v(" = "),v("code",[_._v("HTTP")]),_._v(" + "),v("code",[_._v("SSL")]),_._v("，是一种通过计算机网络进行安全通信的传输协议，经由HTTP进行通信，利用SSL/TLS建立全信道，加密数据包。HTTPS使用的主要目的是提供对网站服务器的身份认证，同时保护交换数据的隐私与完整性。")]),_._v(" "),v("p",[_._v("2、特点")]),_._v(" "),v("p",[v("code",[_._v("HTTP")]),_._v("：")]),_._v(" "),v("ol",[v("li",[v("p",[_._v("无状态：协议对客户端没有状态存储，对事务处理没有“记忆”能力，比如访问一个网站需要反复进行登录操作；")])]),_._v(" "),v("li",[v("p",[_._v("无连接：HTTP/1.1之前，由于无状态的特点，每次请求需要通过三次握手，四次挥手，和服务器重新建立连接。比如某个客户机在短时间多次请求同一个资源，服务器并不能区别是否已经响应过用户的请求，所以每次需要重新响应请求；需要消耗不必要的时间和流量；")])])]),_._v(" "),v("p",[_._v("针对无状态的一些解决策略：")]),_._v(" "),v("p",[_._v("场景：逛电商商场用户需要使用的时间比较长，需要对用户一段时间的HTTP通信状态进行保存，比如执行一次登录操作，在30分钟内所有的请求都不需要再次登录。")]),_._v(" "),v("p",[_._v("a. 通过Cookie/Session技术")]),_._v(" "),v("p",[_._v("b. Http/1.1持久连接（HTTP keep-alive）方法，只要任意一段没有明确提出断开连接，则保持TCP连接状态，在请求首部字段中的"),v("code",[_._v("Connection:keep-alive")]),_._v("即为表明使用了持久连接；")]),_._v(" "),v("ol",{attrs:{start:"3"}},[v("li",[v("p",[_._v("基于响应和请求：基本的特性，由客户端发起请求，服务端响应简单快速、灵活")])]),_._v(" "),v("li",[v("p",[_._v("通信使用明文、请求和响应不会对通信方进行确认、无法保护数据的完整性")])])]),_._v(" "),v("p",[v("code",[_._v("HTTPS")]),_._v("：")]),_._v(" "),v("p",[_._v("基于HTTP协议，通过SSL或TLS提供加密数据处理、验证对方身份以及数据完整性保护。")]),_._v(" "),v("ol",[v("li",[v("p",[_._v("内容加密：采用混合加密技术（对称加密+非对称加密+CA认证），中间者无法直接查看明文内容；")])]),_._v(" "),v("li",[v("p",[_._v("验证身份：通过证书认证客户端访问的是自己需要访问的服务器；")])]),_._v(" "),v("li",[v("p",[_._v("保证数据完整性：防止传输的内容被中间人冒充或者篡改")])])]),_._v(" "),v("p",[_._v("3、区别：")]),_._v(" "),v("p",[_._v("https协议需要到CA申请证书，一般免费证书很少，都要缴费；")]),_._v(" "),v("p",[_._v("http是超文本传输协议，信息是明文传输；https则是具有安全性的ssl加密传输协议；")]),_._v(" "),v("p",[_._v("http和https使用的是完全不同的连接方式，用的端口也不一样，前者是80，后者是443")]),_._v(" "),v("p",[_._v("http的连接很简单，是无状态的；https协议是由SSL+HTTP协议构成的可进行加密传输、身份认证的网络协议，比HTTP协议安全（无状态的意思是其数据包的发送、传输和接收都是相互独立的。无连接的意思是指通信双方都不长久的维持对方的任何信息）")]),_._v(" "),v("p",[v("strong",[_._v("HTTPS的SSL/TLS协议")])]),_._v(" "),v("p",[_._v("1、作用：")]),_._v(" "),v("p",[_._v("机密性：SSL协议使用密钥加密通信数据")]),_._v(" "),v("p",[_._v("可靠性：服务器和客户都会被认证，客户的认证是可选的")]),_._v(" "),v("p",[_._v("完整性：SSL协议会对传送的数据进行完整性检查")]),_._v(" "),v("p",[_._v("这样的做法固然保证了安全性，但每次连接时都需要使用密钥加密，导致请求会需要额外的开销，同时服务器第一次返回的公钥的可靠性需要第三方来保证，通常是购买SSL证书。这也会额外造成经济开销。")]),_._v(" "),v("p",[_._v("2、https的SSL过程")]),_._v(" "),v("p",[v("img",{attrs:{src:"https://img-blog.csdnimg.cn/d20a055ff5f84e7082e1d6d06f3d3489.png",alt:"在这里插入图片描述"}})]),_._v(" "),v("ol",[v("li",[v("p",[_._v("客户端发送请求https连接；")])]),_._v(" "),v("li",[v("p",[_._v("服务器返回加密公钥，通常是SSL证书；")])]),_._v(" "),v("li",[v("p",[_._v("客户端从这个SSL证书解析出公钥，并随机生成一个KEY，通过公钥加密这个key发送给服务器（这一步是安全的因为只有服务器才有私钥能读出这个key）")])]),_._v(" "),v("li",[v("p",[_._v("服务器通过私钥解密出key")])]),_._v(" "),v("li",[v("p",[_._v("客户端使用这个key来加密需要传输的数据")])]),_._v(" "),v("li",[v("p",[_._v("服务器使用key来解析数据")])])]),_._v(" "),v("p",[_._v("简单来说SSL加密的方式是一个使用密钥来加密另一个密钥（key），再使用被加密的密钥来加密数据")]),_._v(" "),v("p",[_._v("3、SSL协议用到的技术")]),_._v(" "),v("p",[v("img",{attrs:{src:"https://img-blog.csdnimg.cn/b8503ea169824e2bbac3006603a29529.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBAbGVlZGNvZGVKb2huMDE=,size_7,color_FFFFFF,t_70,g_se,x_16",alt:"在这里插入图片描述"}})]),_._v(" "),v("p",[_._v("对称加密+非对称加密+CA认证+散列函数hash")]),_._v(" "),v("p",[_._v("HTTPS = HTTP + SSL/TLS")]),_._v(" "),v("h3",{attrs:{id:"http协议"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#http协议"}},[_._v("#")]),_._v(" HTTP协议")]),_._v(" "),v("p",[_._v("1、常见的状态码：")]),_._v(" "),v("ul",[v("li",[v("p",[_._v("1xx：指示信息--表示请求已被接收，继续处理")])]),_._v(" "),v("li",[v("p",[_._v("2xx：成功--表示请求已被成功接收、理解、接受")])]),_._v(" "),v("li",[v("p",[_._v("3xx：重定向--要完成请求必须进行更进一步的操作")])]),_._v(" "),v("li",[v("p",[_._v("4xx：客户端错误--请求语法错误或请求无法实现")])]),_._v(" "),v("li",[v("p",[_._v("5xx：服务器端错误--服务器未能实现合法的请求")])])]),_._v(" "),v("p",[_._v("200：（成功）服务器已成功处理了请求。通常，这表示服务器提供了请求的网页。")]),_._v(" "),v("p",[_._v("201：（已创建）请求成功并且服务器创建了新的资源")]),_._v(" "),v("p",[_._v("202：（已接受）服务器已接受请求，但尚未处理。")]),_._v(" "),v("p",[_._v("204：请求被受理但没有资源可以返回")]),_._v(" "),v("p",[_._v("206：客户端只是请求资源的一部分，服务器只对请求的部分资源执行GET方法，相应报文中通过Content-Range指定范围的资源。")]),_._v(" "),v("p",[_._v("301：永久性重定向，将旧的网址替换为重定向之后的网址")]),_._v(" "),v("p",[_._v("302：临时重定向，搜索引擎会抓取新的内容而保留旧的网址")]),_._v(" "),v("p",[_._v("303：与302状态码有相似功能，只是它希望客户端在请求一个URI的时候，能通过GET方法重定向到另一个URI上")]),_._v(" "),v("p",[_._v("304：发送附带条件的请求时，自上次访问以来或者根据请求的条件并没有改变，则返回该状态码，直接拿本地缓存，与重定向无关")]),_._v(" "),v("p",[_._v("307：临时重定向，与302类似，只是强制要求使用POST方法")]),_._v(" "),v("p",[_._v("400：请求报文语法有误，服务器无法识别")]),_._v(" "),v("p",[_._v("401：请求需要认证，比如需要登录的界面")]),_._v(" "),v("p",[_._v("403：请求的对应资源禁止被访问")]),_._v(" "),v("p",[_._v("404：服务器无法找到对应资源")]),_._v(" "),v("p",[_._v("408：请求超时")]),_._v(" "),v("p",[_._v("500：服务器内部错误")]),_._v(" "),v("p",[_._v("503：服务器正忙")]),_._v(" "),v("p",[_._v("2、常用的HTTP方法有哪些？")]),_._v(" "),v("p",[v("code",[_._v("GET")]),_._v("：用于请求访问已经被URI（同一资源标识符）识别的资源，可以通过URL传参给服务器")]),_._v(" "),v("p",[_._v("POST：用于传输信息给服务器，主功能与GET方法类似，但一般推荐使用POST方式")]),_._v(" "),v("p",[_._v("PUT：传输文件，报文主体中包含文件内容，保存到对应URI位置")]),_._v(" "),v("p",[_._v("HEAD：获得报文首部，与GET方法类似，只是不返回报文主体，一般用于验证URI是否有效")]),_._v(" "),v("p",[_._v("DELETE：删除文件，与PUT方法相反，删除对应URI位置的文件")]),_._v(" "),v("p",[_._v("OPTIONS：查询相应URI支持的HTTP方法")]),_._v(" "),v("p",[_._v("3、HTTP请求报文与响应报文格式")]),_._v(" "),v("p",[v("img",{attrs:{src:"https://img-blog.csdnimg.cn/1c2cfc7479924411aea8ef01ac6fa7ae.png",alt:"在这里插入图片描述"}})]),_._v(" "),v("p",[v("strong",[_._v("请求报文包含四部分")]),_._v("：")]),_._v(" "),v("p",[_._v("a、请求行＜request-line＞：包含请求方法、URI、HTTP版本信息，用空格分隔。例如，GET /index.html HTTP/1.1")]),_._v(" "),v("p",[_._v("b、请求头部字段＜headers＞：请求头部由关键字/值对组成，每行一对，关键字和值用英文冒号“:”分隔，常见的：")]),_._v(" "),v("p",[_._v("User-Agent：产生请求的浏览器类型。")]),_._v(" "),v("p",[_._v("Accept：客户端可识别的内容类型列表。")]),_._v(" "),v("p",[_._v("Host：请求的主机名，允许多个域名同处一个IP地址，即虚拟主机。")]),_._v(" "),v("p",[_._v("c、空行＜blank line＞：最后一个请求头之后是一个空行，发送回车符和换行符，通知服务器以下不再有请求头。")]),_._v(" "),v("p",[_._v("d、请求内容实体＜request-body＞：请求数据不在GET方法中使用，而是在POST方法中使用。POST方法适用于需要客户填写表单的场合。与请求数据相关的最常使用的请求头是Content-Type和Content-Length。")]),_._v(" "),v("p",[v("strong",[_._v("响应报文包含三部分：")])]),_._v(" "),v("p",[_._v("a、状态行＜status-line＞：包含HTTP版本、状态码、状态码的原因短语")]),_._v(" "),v("p",[_._v("b、响应头部字段＜headers＞：")]),_._v(" "),v("p",[_._v("c、空行＜blank line＞：")]),_._v(" "),v("p",[_._v("d、响应内容实体＜response-body＞")]),_._v(" "),v("p",[v("strong",[_._v("当你输入一个网址回车之后，实际发生了什么？")])]),_._v(" "),v("p",[_._v("互联网内各网络设备之间的通信都遵循"),v("code",[_._v("TCP/IP")]),_._v("协议，利用"),v("code",[_._v("TCP/IP")]),_._v("协议族进行网络通信时，会通过分层顺序通知对方进行通信。分层由高到低：")]),_._v(" "),v("p",[_._v("应用层")]),_._v(" "),v("p",[_._v("传输层")]),_._v(" "),v("p",[_._v("网络层")]),_._v(" "),v("p",[_._v("数据链路层")]),_._v(" "),v("p",[_._v("物理层")]),_._v(" "),v("p",[_._v("发送端从应用层往下走，接收端从数据链路层往上走")]),_._v(" "),v("p",[v("img",{attrs:{src:"https://img-blog.csdnimg.cn/6d054c87401343ce9d9f98127c56581f.png",alt:"在这里插入图片描述"}})]),_._v(" "),v("p",[_._v("答案：")]),_._v(" "),v("ol",[v("li",[_._v("服务器启动监听服务")])]),_._v(" "),v("p",[_._v("一台服务器，通电后启动了操作系统，服务器启动http服务进程，这个HTTP服务进程开始定位到服务器的www文件夹（网站根目录），一般位于/var/www\n然后，向操作系统申请一个tcp连接，然后绑定在端口80，调用了accept函数，开始了默默的监听，监听着可能来自于地球上的任何一个地方的请求，随时准备做出响应。")]),_._v(" "),v("ol",{attrs:{start:"2"}},[v("li",[v("code",[_._v("DNS")]),_._v("解析出"),v("code",[_._v("IP")]),_._v("地址")])]),_._v(" "),v("p",[v("strong",[_._v("浏览器缓存")]),_._v(" 首先是查找浏览器缓存，浏览器会缓存"),v("code",[_._v("DNS")]),_._v("记录一段时间，不同浏览器保存的时间不等")]),_._v(" "),v("p",[v("strong",[_._v("系统缓存")]),_._v(" 如果在浏览器缓存中没有找到需要的记录，浏览器会做一个系统调用来查找这个网址对应的"),v("code",[_._v("DNS")]),_._v("信息")]),_._v(" "),v("p",[v("strong",[_._v("路由器缓存")]),_._v(" 如果在系统缓存里没有找到对应的IP，请求会发向路由器，他一般会有自己的"),v("code",[_._v("DNS")]),_._v("缓存")]),_._v(" "),v("p",[v("strong",[_._v("ISP DNS服务器")]),_._v(" 如果在路由器缓存里还没有对应的"),v("code",[_._v("IP")]),_._v("，请求会被发送到"),v("code",[_._v("ISP")])]),_._v(" "),v("p",[v("strong",[_._v("根域名服务器")]),_._v(" 如果还没有，请求将发向根域名服务器进行搜索。找不到就说明此域名不存在。")]),_._v(" "),v("ol",{attrs:{start:"3"}},[v("li",[_._v("客户端应用层根据解析得到的"),v("code",[_._v("IP")]),_._v("地址向"),v("code",[_._v("web")]),_._v("服务器发送"),v("code",[_._v("http")]),_._v("请求")])]),_._v(" "),v("p",[_._v("HTTP请求包括：请求报头和请求主体两个部分，其中请求报头（request header）包含了至关重要的信息，包括请求的方法（GET / POST和不常用的PUT / DELETE以及更不常用的HEAD / OPTION / TRACE，一般的浏览器只能发起 GET 或者 POST 请求）、目标url、遵循的协议（HTTP / HTTPS / FTP…）、返回的信息是否需要缓存，以及客户端是否发送"),v("code",[_._v("Cookie")]),_._v("等信息。需要注意的是，因为HTTP请求是纯文本格式的，所以在TCP的数据段中可以直接分析"),v("code",[_._v("HTTP")]),_._v("文本的。")]),_._v(" "),v("ol",{attrs:{start:"4"}},[v("li",[_._v("客户端传输层通过"),v("code",[_._v("TCP")]),_._v("协议传输报文")])]),_._v(" "),v("p",[_._v("当应用层的 "),v("code",[_._v("HTTP")]),_._v(" 请求准备好后，浏览器会在传输层发起一条到达服务器的 TCP 连接，位于传输层的TCP协议把HTTP请求分成报文段，TCP头部添加源和目的端口，为传输报文提供可靠的字节流服务。")]),_._v(" "),v("p",[_._v("服务器端的默认端口号是80，本机浏览器生成一个1024到65535之间的端口号，如5000，与服务器进行交换，服务器把相应的请求返回给客户端的5000端口。")]),_._v(" "),v("p",[_._v("它为了方便传输，将大块的数据分割成以报文段为单位的数据包进行管理。以太网数据包的数据部分，最大长度为1500字节，所以如果IP包太大的话还要拆包，比如IP包5000字节，要分为4包，每一包都包含一个"),v("code",[_._v("IP")]),_._v("头部。并为它们编号，方便服务器接收时能准确地还原报文信息。")]),_._v(" "),v("p",[v("code",[_._v("TCP")]),_._v("协议通过“三次握手”等方法保证传输的安全可靠。")]),_._v(" "),v("ol",{attrs:{start:"5"}},[v("li",[_._v("客户端网络层通过IP协议查询MAC地址")])]),_._v(" "),v("p",[_._v("IP协议的作用是把TCP分割好的各种数据包封装到IP包里面传送给接收方。而要保证确实能传到接收方还需要接收方的MAC地址，也就是物理地址。"),v("code",[_._v("IP")]),_._v("地址和"),v("code",[_._v("MAC")]),_._v("地址是一一对应的关系，一个网络设备的IP地址可以更换，但是MAC地址一般是固定不变的。ARP协议可以将IP地址解析成对应的MAC地址。当通信的双方不在同一个局域网时，需要多次中转才能到达最终的目标，在中转的过程中需要通过下一个中转站的MAC地址来搜索下一个中转目标。")]),_._v(" "),v("ol",{attrs:{start:"6"}},[v("li",[_._v("客户端链路层")])]),_._v(" "),v("p",[_._v("在找到对方的"),v("code",[_._v("MAC")]),_._v("地址后，已被封装好的"),v("code",[_._v("IP")]),_._v("包再被封装到数据链路层的数据帧结构中，将数据发送到数据链路层传输，再通过物理层的比特流送出去。这时，客户端发送请求的阶段结束。")]),_._v(" "),v("ol",{attrs:{start:"7"}},[v("li",[_._v("服务器接收数据")])]),_._v(" "),v("p",[_._v("接收端的服务器在链路层接收到数据包，再层层向上直到应用层。这过程中包括在传输层通过TCP协议将分段的数据包重新组成原来的HTTP请求报文。")]),_._v(" "),v("p",[_._v("网站可能会有负载均衡设备来平均分配所有用户的请求。 负载均衡，即对工作任务进行平衡，分摊到多个操作单元上执行，如图片服务器，应用服务器。可分为链路负载均衡，集群负载均衡，操作系统负载均衡 集群负载均衡又分为硬件负载均衡和软件负载均衡。")]),_._v(" "),v("ol",{attrs:{start:"8"}},[v("li",[_._v("服务器响应请求并返回相应文件")])]),_._v(" "),v("p",[_._v("服务接收到客户端发送的HTTP请求后，服务器上的的 http 监听进程会得到这个请求，然后一般情况下会启动一个新的子进程去处理这个请求，同时父进程继续监听。http 服务器首先会查看重写规则，如果请求的文件是真实存在的，则返回状态码304，浏览器可以直接使用之前缓存的资源。如果是一个动态的请求，那么会根据 url 重写模块的规则，把这个请求重写到一个 rest 风格的 url 上，然后根据动态语言的脚本，来决定调用什么类型的动态文件脚本解释器来处理这个请求。由http服务器把这些正文加上一个响应头，封装成一个标准的 http 响应包，再通过tcp ip协议，送回到客户机浏览器。")]),_._v(" "),v("ol",{attrs:{start:"9"}},[v("li",[_._v("浏览器开始处理数据信息并渲染页面")])]),_._v(" "),v("p",[_._v("响应到达浏览器之后，浏览器根据返回的响应报文里的状态码，来做出判断。")]),_._v(" "),v("p",[_._v("200开头的表示请求成功，直接进入渲染流程；")]),_._v(" "),v("p",[_._v("300 开头的就要去相应头里面找location域，根据这个location的指引，进行跳转。比如：301表示永久重定向，即请求的资源已经永久转移到新的位置。在返回301状态码的同时，响应报文也会附带重定向的url，客户端接收到后将http请求的url做相应的改变再重新发送；")]),_._v(" "),v("p",[_._v("例如“http://facebook.com/”，服务器会给浏览器响应一个301永久重定向响应，这样浏览器就会访问“http://www.facebook.com/” 而非“http://facebook.com/”。然后浏览器会跟踪重定向地址: 浏览器会发送另一个获取请求到”http://www.facebook.com/”。")]),_._v(" "),v("p",[_._v("400 开头或者 500 开头的状态码，浏览器也会给出一个错误页面。比如：404 not found 就表示客户端请求的资源找不到。")]),_._v(" "),v("p",[_._v("在浏览器没有完整接受全部"),v("code",[_._v("HTML")]),_._v("文档时，它就已经开始显示这个页面了，如果是个静态的页面，拿到此就基本结束了。如果是是动态的，那么在浏览器显示"),v("code",[_._v("HTML")]),_._v("时，会获取嵌入在HTML中的对象，浏览器会发送获取请求来重新获得这些文件。这些请求都要经历一个和"),v("code",[_._v("HTML")]),_._v("读取类似的过程。对于静态的页面内容，浏览器通常会进行缓存，而对于动态的内容，浏览器通常不会进行缓存。")]),_._v(" "),v("ol",{attrs:{start:"10"}},[v("li",[_._v("页面显示完成后，浏览器发送异步请求")])]),_._v(" "),v("p",[_._v("页面显示完成后客户端仍与服务器端保持着联系来及时更新一些页面信息。")])])}),[],!1,null,null,null);v.default=e.exports}}]);