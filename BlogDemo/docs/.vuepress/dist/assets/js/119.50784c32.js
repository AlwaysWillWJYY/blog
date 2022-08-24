(window.webpackJsonp=window.webpackJsonp||[]).push([[119],{582:function(v,_,t){"use strict";t.r(_);var s=t(2),r=Object(s.a)({},(function(){var v=this,_=v._self._c;return _("ContentSlotsDistributor",{attrs:{"slot-key":v.$parent.slotKey}},[_("h3",{attrs:{id:"用户态vs内核态"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#用户态vs内核态"}},[v._v("#")]),v._v(" 用户态VS内核态")]),v._v(" "),_("p",[v._v("（1）用户态：算数运算、取指令、修改程序状态\n当一个进程在执行用户自己的代码时处于用户运行态（用户态），此时特权级最低，为3级，是普通用户进程运行的特权级，大部分用户直接面对的程序都是运行在用户态。Ring3状态是不能访问Ring0状态的地址空间，包括代码和数据；")]),v._v(" "),_("p",[v._v("（2）内核态：I/O中断、时钟中断、清理内存、中断、停机\n当一个进程因为系统调用陷入内核代码中执行时处于内核运行状态（内核态），此时特权级最高，位0级。执行内核代码会使用当前进程的内核栈，每个进程都有自己的内核栈；")]),v._v(" "),_("p",[v._v("（3）区别：")]),v._v(" "),_("ul",[_("li",[_("p",[v._v("处于用户态，"),_("strong",[v._v("进程能访问的内存空间和对象受到限制")]),v._v("，其所"),_("strong",[v._v("占有的处理机是可被抢占的")]),v._v("；")])]),v._v(" "),_("li",[_("p",[v._v("而处于核心态，则能"),_("strong",[v._v("访问所有的内存空间和对象")]),v._v("，且所占用的处理机是"),_("strong",[v._v("不允许被抢占的")]),v._v("。")])])]),v._v(" "),_("h3",{attrs:{id:"用户态和内核态的切换"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#用户态和内核态的切换"}},[v._v("#")]),v._v(" 用户态和内核态的切换")]),v._v(" "),_("p",[v._v("用户态切换到内核态的3种方式：")]),v._v(" "),_("p",[_("strong",[v._v("（1）系统调用")])]),v._v(" "),_("p",[v._v("这是用户态主动要求切换到核心态的一种方式。用户态进程通过系统调用申请使用操作系统提供的服务程序完成工作。例如fork()就是执行了一个创建新进程的系统调用。系统调用的机制核心是使用了操作系统为用户特别开放的一个中断来实现的，如"),_("code",[v._v("Linux")]),v._v("的"),_("code",[v._v("int80h")]),v._v("中断；")]),v._v(" "),_("p",[_("strong",[v._v("（2）异常")])]),v._v(" "),_("p",[v._v("当CPU在执行运行用户态下的程序时，发生了一些没有预知的异常，这时会触发由当前运行进程切换到处理此异常的内核相关的进程中，也就切换到了内核态。")]),v._v(" "),_("p",[_("strong",[v._v("（3）处理外围设备的中断")])]),v._v(" "),_("p",[v._v("当外围设备完成用户请求操作后，会向CPU发出相应的中断信号，这时CPU会暂停执行下一条即将要执行的指令而转到与中断信号对应的处理程序去执行，如果前面执行的指令是用户态下的指令，那么转换的过程自然是从用户态转为核心态。如硬盘读写操作完成，系统会切换到硬盘读写的中断处理程序中执行后面的操作。")]),v._v(" "),_("h2",{attrs:{id:"内核态切换到用户态的途经-设置程序状态字"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#内核态切换到用户态的途经-设置程序状态字"}},[v._v("#")]),v._v(" 内核态切换到用户态的途经----\x3e设置程序状态字")])])}),[],!1,null,null,null);_.default=r.exports}}]);