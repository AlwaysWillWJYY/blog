(window.webpackJsonp=window.webpackJsonp||[]).push([[136],{542:function(t,s,p){"use strict";p.r(s);var n=p(2),e=Object(n.a)({},(function(){var t=this,s=t._self._c;return s("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[s("p",[t._v("Redis不仅可作为缓存服务器，还可用作消息队列。它的列表类型天生支持杨作消息队列。如下图所示：")]),t._v(" "),s("p",[s("img",{attrs:{src:"https://img-blog.csdnimg.cn/a0d0fa618b4a4c20891c996a13c086b8.png",alt:"在这里插入图片描述"}})]),t._v(" "),s("p",[t._v("由于Redis的列表是使用双向链表实现的，保存了头尾节点，所以在列表的头尾两边插取元素都是非常快的。")]),t._v(" "),s("p",[t._v("所以可以直接使用Redis的List实现消息队列，只需要简单的两个指令lpush(从左端添加)和rpop(从右端读取)或者是rpush(从右端添加)和lpop(从左端读取)")]),t._v(" "),s("p",[t._v("存放消息端（消息生产者）；\n消息处理端（消息消费者）。")])])}),[],!1,null,null,null);s.default=e.exports}}]);