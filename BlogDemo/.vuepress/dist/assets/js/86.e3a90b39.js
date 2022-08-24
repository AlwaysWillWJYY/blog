(window.webpackJsonp=window.webpackJsonp||[]).push([[86],{492:function(_,v,p){"use strict";p.r(v);var t=p(2),s=Object(t.a)({},(function(){var _=this,v=_._self._c;return v("ContentSlotsDistributor",{attrs:{"slot-key":_.$parent.slotKey}},[v("p",[_._v("基本的存储分配方式：")]),_._v(" "),v("p",[v("img",{attrs:{src:"https://img-blog.csdnimg.cn/1309f62a07054f08a93e06540ecdaeb0.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBAbGVlZGNvZGVKb2huMDE=,size_15,color_FFFFFF,t_70,g_se,x_16",alt:"在这里插入图片描述"}})]),_._v(" "),v("p",[_._v("1、离散分配方式的出现")]),_._v(" "),v("p",[_._v("由于连续分配方式会造成很多的内存碎片，虽可通过“紧凑”功能将碎片合并，但会付出很大开销。")]),_._v(" "),v("p",[_._v("于是出现了离散分配方式，将一个进程直接放散地装入到许多不相邻的内存分区中。")]),_._v(" "),v("p",[_._v("2、基本分页存储")]),_._v(" "),v("p",[v("strong",[_._v("2.1步骤")])]),_._v(" "),v("p",[_._v("逻辑空间等分为页；并从0开始编号；")]),_._v(" "),v("p",[_._v("内存空间等分为块，与页面大小相同；从0开始编号；")]),_._v(" "),v("p",[_._v("分配内存时，以块为单位将进程中的若干页分别装入到多个可以不相邻的物理块中；")]),_._v(" "),v("p",[v("strong",[_._v("2.2地址结构")])]),_._v(" "),v("p",[_._v("分两部分：页号、位移量（页内地址）")]),_._v(" "),v("p",[v("img",{attrs:{src:"https://img-blog.csdnimg.cn/85c8bf669bf949e4b71a310ba6245c8c.png",alt:"在这里插入图片描述"}})]),_._v(" "),v("p",[_._v("页内地址的位数可以决定页的大小（如上图每页为4K）")]),_._v(" "),v("p",[_._v("逻辑地址=页号&位移量（&号是连接符号，是将页号作为逻辑地址的最高位）")]),_._v(" "),v("p",[v("strong",[_._v("2.3地址映射（逻辑地址---\x3e物理地址）")])]),_._v(" "),v("p",[v("img",{attrs:{src:"https://img-blog.csdnimg.cn/bd4a80f76c8a4f9eaf77a151620ccbb0.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBAbGVlZGNvZGVKb2huMDE=,size_13,color_FFFFFF,t_70,g_se,x_16",alt:"在这里插入图片描述"}})]),_._v(" "),v("p",[_._v("因为块的大小=页的大小，所以块内位移量=页内位移量，所以只需求出块号即可：")]),_._v(" "),v("p",[v("img",{attrs:{src:"https://img-blog.csdnimg.cn/9830919204bb4698adbd1c33e689fdd8.png",alt:"在这里插入图片描述"}})]),_._v(" "),v("p",[_._v("如何求块号呢？")]),_._v(" "),v("p",[_._v("页表：")]),_._v(" "),v("p",[v("img",{attrs:{src:"https://img-blog.csdnimg.cn/12c87845f18749249d908c3a62a98dc5.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBAbGVlZGNvZGVKb2huMDE=,size_16,color_FFFFFF,t_70,g_se,x_16",alt:"在这里插入图片描述"}})]),_._v(" "),v("p",[_._v("给定一个逻辑地址和页面大小，如何计算物理地址？")]),_._v(" "),v("p",[_._v("1）根据页面大小可以计算出页内地址的位数；")]),_._v(" "),v("p",[_._v("2）页内地址位数结合逻辑地址计算出页内地址（即，块内地址）和页号；")]),_._v(" "),v("p",[_._v("3）页号结合页表，即可得出块号；")]),_._v(" "),v("p",[_._v("4）块号&块内地址即可得到物理地址。")]),_._v(" "),v("p",[_._v("2.4 地址变化原理及步骤")]),_._v(" "),v("p",[v("img",{attrs:{src:"https://img-blog.csdnimg.cn/9cebe8ba814544f3bd0ab5270cb97e0b.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBAbGVlZGNvZGVKb2huMDE=,size_15,color_FFFFFF,t_70,g_se,x_16",alt:"在这里插入图片描述"}})]),_._v(" "),v("p",[_._v("给出逻辑地址的页号和页内地址，开始进行地址变化：")]),_._v(" "),v("p",[_._v("1）在被调进程的PCB中取出页表始址和页表大小，装入页表寄存器；")]),_._v(" "),v("p",[_._v("2）页号与页表寄存器的页表长度比较，若页号大于等于页表长度，发生地址越界中断，停止调用，否则继续；")]),_._v(" "),v("p",[_._v("3）由页号结合页表始址求出块号")]),_._v(" "),v("p",[_._v("4）块号&页内地址，既得物理地址")]),_._v(" "),v("p",[_._v("3、基本分段存储")]),_._v(" "),v("p",[_._v("3.1步骤")]),_._v(" "),v("p",[_._v("逻辑空间分为若干段，每个段定义了一组有完整逻辑的信息（如主程序main()），如：")]),_._v(" "),v("p",[v("img",{attrs:{src:"https://img-blog.csdnimg.cn/d8fca139835c4e069a4ebe51d3855a78.png",alt:"在这里插入图片描述"}})]),_._v(" "),v("p",[_._v("内存空间为每一个段分配一个连续的分区。")]),_._v(" "),v("p",[_._v("段的长度由相应的逻辑信息组的长度决定，因而各段长度不等，引入分段存储管理方式的目的主要是为了满足用户（程序员）在编程和使用上多方面的要求。")]),_._v(" "),v("p",[_._v("要注重理解，完整的逻辑意义信息，就是说将程序分页时，页的大小是固定的，只根据页面的大小死生生的将程序切开；而分段是比较灵活，只有一段程序有了完整的意义才将这一段程序切开。（例如将一个人每隔50厘米切割一段，即为分页；而将一个人分割为头部、身体、腿部（有完整逻辑意义）三段，即为分段）")]),_._v(" "),v("p",[_._v("3.2地址结构")]),_._v(" "),v("p",[_._v("分两部分：段号、位移量（段内地址）")]),_._v(" "),v("p",[v("img",{attrs:{src:"https://img-blog.csdnimg.cn/98ec67d54e02406888cd48d9f002437c.png",alt:"在这里插入图片描述"}})]),_._v(" "),v("p",[_._v("段内地址的位数可以决定段的大小")]),_._v(" "),v("p",[_._v("逻辑地址=段号&段内地址")]),_._v(" "),v("p",[_._v("3.3地址映射（逻辑地址----\x3e物理地址）")]),_._v(" "),v("p",[_._v("如下图所示：（物理地址 = 基址 + 段内地址）")]),_._v(" "),v("p",[v("img",{attrs:{src:"https://img-blog.csdnimg.cn/418f39ae8a754d2c987abf9ee7d16af6.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBAbGVlZGNvZGVKb2huMDE=,size_16,color_FFFFFF,t_70,g_se,x_16",alt:"在这里插入图片描述"}})]),_._v(" "),v("p",[_._v("由上图可知，若想求物理地址，只需求出基址即可：")]),_._v(" "),v("p",[_._v("段表：")]),_._v(" "),v("p",[v("img",{attrs:{src:"https://img-blog.csdnimg.cn/129188292e234279b7347a94556796a9.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBAbGVlZGNvZGVKb2huMDE=,size_16,color_FFFFFF,t_70,g_se,x_16",alt:"在这里插入图片描述"}})]),_._v(" "),v("p",[_._v("求基址的过程与页式存储中求块号的过程原理相同，这里需要注意的是，物理地址是基址+段内地址，而不是基址&段内地址。")]),_._v(" "),v("p",[_._v("3.4地址变换原理及步骤")]),_._v(" "),v("p",[v("img",{attrs:{src:"https://img-blog.csdnimg.cn/10130440de4c464fad34263a8ca1b2b8.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBAbGVlZGNvZGVKb2huMDE=,size_15,color_FFFFFF,t_70,g_se,x_16",alt:"在这里插入图片描述"}})]),_._v(" "),v("p",[_._v("1）在被调用进程的PCB中取出段表始址和段表长度，装入控制寄存器；")]),_._v(" "),v("p",[_._v("2）段号与控制寄存器段表长度比较，若页号大于等于段表长度，发生地址越界中断，停止调用，否则继续；")]),_._v(" "),v("p",[_._v("3）由段号结合段表始址求出基址；")]),_._v(" "),v("p",[_._v("4）基址+段内地址，即得物理地址")]),_._v(" "),v("p",[_._v("4、基本段页式存储")]),_._v(" "),v("p",[_._v("4.1步骤")]),_._v(" "),v("p",[_._v("用户将程序先分段，每个段内部再分页（内部原理同基本的分页、分段）")]),_._v(" "),v("p",[v("img",{attrs:{src:"https://img-blog.csdnimg.cn/8447c40c49694491bf0f09a81533cc85.png",alt:"在这里插入图片描述"}})]),_._v(" "),v("p",[_._v("4.2地址结构")]),_._v(" "),v("p",[_._v("分三部分：段号、段内页号、页内地址")]),_._v(" "),v("p",[v("img",{attrs:{src:"https://img-blog.csdnimg.cn/524d61493e0b47528aaf00044ec9fdca.png",alt:"在这里插入图片描述"}})]),_._v(" "),v("p",[_._v("4.3地址映射（逻辑地址-----\x3e物理地址）")]),_._v(" "),v("p",[_._v("逻辑地址---\x3e段号、段内页号、页内地址")]),_._v(" "),v("p",[_._v("段表寄存器---\x3e段表始址")]),_._v(" "),v("p",[_._v("段号+段表始址---\x3e页表始址")]),_._v(" "),v("p",[_._v("页表始址+段内页号---\x3e存储块号")]),_._v(" "),v("p",[_._v("块号+页内地址----\x3e物理地址")]),_._v(" "),v("p",[_._v("4.4地址变化原理及步骤")]),_._v(" "),v("p",[v("img",{attrs:{src:"https://img-blog.csdnimg.cn/66b69ba252574247b858cff620fd3775.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBAbGVlZGNvZGVKb2huMDE=,size_16,color_FFFFFF,t_70,g_se,x_16",alt:"在这里插入图片描述"}})]),_._v(" "),v("p",[_._v("1）在被调进程PCB中取出段表始址和段表长度，装入段表寄存器；")]),_._v(" "),v("ol",{attrs:{start:"2"}},[v("li",[v("p",[_._v("段号与控制寄存器的页表长度比较，若段号大于等于段表长度，发生地址越界中断，停止调用，否则继续")])]),_._v(" "),v("li",[v("p",[_._v("由段号结合段表始址求出页表始址和页表大小")])]),_._v(" "),v("li",[v("p",[_._v("页号与段表的页表大小比较，若页号大于等于页表大小，发生地址越界中断，停止调用，否则继续")])]),_._v(" "),v("li",[v("p",[_._v("由页表始址结合段内页号求出存储块号")])]),_._v(" "),v("li",[v("p",[_._v("存储块号&页内地址，即得物理地址")])])]),_._v(" "),v("p",[_._v("总结：")]),_._v(" "),v("p",[_._v("在页式、段式存储管理中，为获得一条指令或数据，须两次访问内存；而段页式则需要三次访问内存。")])])}),[],!1,null,null,null);v.default=s.exports}}]);