(window.webpackJsonp=window.webpackJsonp||[]).push([[125],{588:function(_,v,t){"use strict";t.r(v);var e=t(2),s=Object(e.a)({},(function(){var _=this,v=_._self._c;return v("ContentSlotsDistributor",{attrs:{"slot-key":_.$parent.slotKey}},[v("h2",{attrs:{id:"_1、管道与命名管道"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#_1、管道与命名管道"}},[_._v("#")]),_._v(" 1、管道与命名管道")]),_._v(" "),v("h3",{attrs:{id:"_1-1管道相关的关键概念"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#_1-1管道相关的关键概念"}},[_._v("#")]),_._v(" 1.1管道相关的关键概念")]),_._v(" "),v("p",[_._v("管道是"),v("code",[_._v("Linux")]),_._v("支持的最初"),v("code",[_._v("Unix IPC")]),_._v("（Inter-Process Communication：进程间通信）形式之一，具有以下特点：")]),_._v(" "),v("ol",[v("li",[v("p",[_._v("管道只能采用"),v("strong",[_._v("半双工通信")]),_._v("，某一段时间内只能实现单向的传输。如果要实现双向传输，则需要设置两个管道；")])]),_._v(" "),v("li",[v("p",[_._v("各进程之间要"),v("strong",[_._v("互斥")]),_._v("的访问管道")])]),_._v(" "),v("li",[v("p",[_._v("数据以字符流形式写入管道，当管道写满时，写进程的write()系统调用将被阻塞，等待读进程将数据取走。当读进程将数据全部取走后，管道变空，此时读进程read()系统调用将被阻塞；")])]),_._v(" "),v("li",[v("p",[v("strong",[_._v("如果没写满，就不允许读，如果没读完，就不允许写")]),_._v("；")])]),_._v(" "),v("li",[v("p",[_._v("数据一旦被读出，就从管道中抛弃，这就意味着读进程最多只能有一个，否则可能会读错数据的情况。")])])]),_._v(" "),v("p",[v("img",{attrs:{src:"https://img-blog.csdnimg.cn/982399de872a4050a3c3655846ace276.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBAbGVlZGNvZGVKb2huMDE=,size_19,color_FFFFFF,t_70,g_se,x_16",alt:"在这里插入图片描述"}})]),_._v(" "),v("h3",{attrs:{id:"_1-2有关管道相关的概念"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#_1-2有关管道相关的概念"}},[_._v("#")]),_._v(" 1.2有关管道相关的概念")]),_._v(" "),v("p",[_._v("管道应用的一个重大限制是他没有名字。因此，只能用于具有亲缘关系的线程间通信，在命名管道（named pipe 或 FIFO）提出后，该限制得到了克服。"),v("code",[_._v("FIFO")]),_._v("与管道不同之处在于，它提供一个路径名与之关联，以"),v("code",[_._v("FIFO")]),_._v("的文件形式存在于文件系统中。这样，即使与"),v("code",[_._v("FIFO")]),_._v("的创建进程不存在亲缘关系，只要可以访问该路径，就能够彼此通过FIFO相互通信（能够访问该路径的进程以及FIFO的创建进程之间），因此，通过FIFO不相关的进程也能交换数据。值得注意的是，FIFO严格遵守先进先出，对管道及FIFO的读总是从开始处返回数据，对它们的写则是将数据添加到末尾。")]),_._v(" "),v("p",[_._v("FIFO是一种特殊的文件类型，它在文件系统中有对应的路径，当一个进程以读（r）的方式打开该文件，而另一个进程以写(write)的方式打开该文件，那么内核就在这两个进程之间建立管道。之所以叫FIFO，是因为管道本身就是一个先进先出的队列数据结构，最早放入的数据最先读出来，从而保证信息交流的顺序。"),v("strong",[_._v("FIFO的好处在于我们可以通过文件的路径来识别管道，实现没有亲缘的进程间通信")]),_._v("；")]),_._v(" "),v("h2",{attrs:{id:"_2-消息队列"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#_2-消息队列"}},[_._v("#")]),_._v(" 2.消息队列")]),_._v(" "),v("p",[_._v("消息队列实际上是操作系统在内核为我们创建的一个队列，通过这个队列的标识符key,每一个进程都可以打开这个队列，每个进程都可以通过这个队列向这个队列中插入一个结点或者获取一个结点来完成不同进程间的通信。")]),_._v(" "),v("p",[_._v("如何传输数据：")]),_._v(" "),v("p",[_._v("用户组织一个带有类型的数据块，添加到队列中，其他的进程从队列中获取数据块，即消息队列发送的是一个带有类型的数据块；消息队列是一个全双工通信，可读可写（可以发送数据，也可以接受数据）")]),_._v(" "),v("p",[_._v("消息队列生命周期随内核，如果没有释放消息队列或者没有关闭操作系统，消息队列会一直存在。")]),_._v(" "),v("p",[_._v("1）消息队列是面向记录的，其中的消息具有特定的格式以及特定的优先级；")]),_._v(" "),v("p",[_._v("2）消息队列独立与发送和接收进程，进程终止时，消息队列及其内容并不会被删除；")]),_._v(" "),v("p",[_._v("3）消息队列可以实现消息的随机查询，消息不一定要以先进先出的次序读取，也可以按消息类型读取；")]),_._v(" "),v("h2",{attrs:{id:"_3-信号量"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#_3-信号量"}},[_._v("#")]),_._v(" 3. 信号量")]),_._v(" "),v("p",[_._v("信号量(Semaphore）与已经介绍过的IPC结构不同，它是一个计数器。信号量用于实现进程间的同步与互斥，而不是用于存储进程间的通信数据。")]),_._v(" "),v("p",[_._v("特点：")]),_._v(" "),v("p",[_._v("1）信号量用于进程间同步，若要在进程间传递数据需要结合共享内存；")]),_._v(" "),v("p",[_._v("2）信号量基于操作系统的PV操作，程序对信号量的操作都是原子操作；")]),_._v(" "),v("p",[_._v("3）每次对信号量的PV操作不仅限于对信号量值加1或减1，而且可以加减任意正整数；")]),_._v(" "),v("h2",{attrs:{id:"_4、共享内存"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#_4、共享内存"}},[_._v("#")]),_._v(" 4、共享内存")]),_._v(" "),v("p",[_._v("共享内存（Shared Memory），指两个或多个进程共享一个给定的存储区。")]),_._v(" "),v("p",[_._v("特点：")]),_._v(" "),v("p",[_._v("1）共享内存是最快的一种"),v("code",[_._v("IPC")]),_._v("，因为进程是直接对内存进行存取；")]),_._v(" "),v("p",[_._v("2）因为多个进程可以同时操作，所以需要进行同步；")]),_._v(" "),v("p",[_._v("3）信号量+共享内存通常结合在一起使用，信号量用来同步对共享内存的访问；")]),_._v(" "),v("p",[v("img",{attrs:{src:"https://img-blog.csdnimg.cn/d892f5affc3740c1bbba5e9beb7e3a85.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBAbGVlZGNvZGVKb2huMDE=,size_12,color_FFFFFF,t_70,g_se,x_16",alt:"在这里插入图片描述"}})]),_._v(" "),v("h2",{attrs:{id:"_5、套接字-socket"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#_5、套接字-socket"}},[_._v("#")]),_._v(" 5、套接字（Socket）")]),_._v(" "),v("p",[_._v("套接口也是一种进程间通信机制，与其他通信机制不同的是，它可以用于不同设备及其间的进程通信。")]),_._v(" "),v("p",[_._v("套接字介绍：")]),_._v(" "),v("p",[_._v("应用层通过传输层进行数据通信时，TCP和UDP会遇到同时为多个应用程序进程提供并发服务的问题。多个TCP连接或多个应用程序进程可能需要通过同一个TCP协议端口传输数据。为了区别不同的应用程序进程和连接，许多计算机操作系统为应用程序与TCP／IP协议交互提供了称为套接字 (Socket)的接口，区分不同应用程序进程间的网络通信和连接。")]),_._v(" "),v("p",[_._v("生成套接字，主要有3个参数：通信的目的IP地址、使用的传输层协议(TCP或UDP)和使用的端口号。Socket原意是“插座”。通过将这3个参数结合起来，与一个“插座”Socket绑定，应用层就可以和传输层通过套接字接口，区分来自不同应用程序进程或网络连接的通信，实现数据传输的并发服务。")]),_._v(" "),v("p",[_._v("要通过互联网进行通信，至少需要一对套接字，一个运行于客户机端，称之为ClientSocket，另一个运行于服务器端，称之为serverSocket.")]),_._v(" "),v("p",[_._v("根据连接启动的方式以及本地套接字要连接的目标，套接字之间的连接过程可以分为三个步骤：服务器监听，客户端请求，连接确认。")]),_._v(" "),v("p",[_._v("服务器监听：是服务器端套接字并不定位具体的客户端套接字，而是处于等待连接的状态，实时监控网络状态。")]),_._v(" "),v("p",[_._v("客户端请求：是指由客户端的套接字提出连接请求，要连接的目标是服务器端的套接字。为此，客户端的套接字必须首先描述它要连接的服务器的套接字，指出服务器端套接字的地址和端口号，然后就向服务器端套接字提出连接请求。")]),_._v(" "),v("p",[_._v("连接确认：是指当服务器端套接字监听到或者说接收到客户端套接字的连接请求，它就响应客户端套接字的请求，建立一个新的线程，把服务器端套接字的描述发给客户端，一旦客户端确认了此描述，连接就建立好了。而服务器端套接字继续处于监听状态，继续接收其他客户端套接字的连接请求。")]),_._v(" "),v("p",[v("code",[_._v("socket")]),_._v("通信流程：")]),_._v(" "),v("p",[v("img",{attrs:{src:"https://img-blog.csdnimg.cn/7e4b718a179a41c69c4df2803278abfe.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBAbGVlZGNvZGVKb2huMDE=,size_20,color_FFFFFF,t_70,g_se,x_16",alt:"在这里插入图片描述"}})]),_._v(" "),v("p",[_._v("1、服务器根据地址类型（ipv4,ipv6）、socket类型、协议创建socket")]),_._v(" "),v("p",[_._v("2、服务器为socket绑定ip地址和端口号")]),_._v(" "),v("p",[_._v("3、服务器socket监听端口号请求，随时准备接收客户端发来的连接，这时候服务器的socket并没有被打开")]),_._v(" "),v("p",[_._v("4、客户端创建socket")]),_._v(" "),v("p",[_._v("5、客户端打开socket，根据服务器ip地址和端口号试图连接服务器socket")]),_._v(" "),v("p",[_._v("6、服务器socket接收到客户端socket请求，被动打开，开始接收客户端请求，直到客户端返回连接信息。这时候socket进入阻塞状态，所谓阻塞即accept()方法一直到客户端返回连接信息后才返回，开始接收下一个客户端请求")]),_._v(" "),v("p",[_._v("7、客户端连接成功，向服务器发送连接状态信息")]),_._v(" "),v("p",[_._v("8、服务器accept方法返回，连接成功")]),_._v(" "),v("p",[_._v("9、客户端向socket写入信息")]),_._v(" "),v("p",[_._v("10、服务器读取信息")]),_._v(" "),v("p",[_._v("11、客户端关闭")]),_._v(" "),v("p",[_._v("12、服务器端关闭")]),_._v(" "),v("p",[_._v("总结：")]),_._v(" "),v("ol",[v("li",[v("p",[_._v("管道：速度慢，容量有限，只用于有亲缘的进程之间通信；")])]),_._v(" "),v("li",[v("p",[_._v("FIFO（命名管道）：任何进程间都能通信，但速度慢；")])]),_._v(" "),v("li",[v("p",[_._v("消息队列：容量受到系统限制，且要注意第一次读的时候，要考虑上一次没有读完数据的问题；")])]),_._v(" "),v("li",[v("p",[_._v("信号量：不能传递复杂消息，只能用来同步；")])]),_._v(" "),v("li",[v("p",[_._v("共享内存区：能够很容易控制容量，速度快，但要保持同步，比如一个进程在写的时候，另一个进程要注意读写问题，相当于线程中的线程安全问题，当然，共享内存区可以作线程间通讯，不过没有这个必要，线程间本来就已经共享了同一进程内的一块内存；")])])]),_._v(" "),v("p",[_._v("6."),v("code",[_._v("Socket")]),_._v("：不同设备进程的通信。")]),_._v(" "),v("p",[_._v("那全局变量进程也都能看到，是不是也能实现通信呢？")]),_._v(" "),v("p",[_._v("这就得说到我们的虚拟地址向物理地址映射了，全局变量在映射的时候，物理地址并不同，那么怎么保证两个进程看到的是同一块空间，那就无法通信了。")])])}),[],!1,null,null,null);v.default=s.exports}}]);