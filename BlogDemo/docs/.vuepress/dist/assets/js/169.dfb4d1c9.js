(window.webpackJsonp=window.webpackJsonp||[]).push([[169],{628:function(s,t,a){"use strict";a.r(t);var e=a(1),n=Object(e.a)({},(function(){var s=this,t=s._self._c;return t("ContentSlotsDistributor",{attrs:{"slot-key":s.$parent.slotKey}},[t("h3",{attrs:{id:"介绍"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#介绍"}},[s._v("#")]),s._v(" 介绍")]),s._v(" "),t("p",[s._v("Elasticsearch 是一个分布式可扩展的实时搜索和分析引擎,一个建立在全文搜索引擎 Apache Lucene(TM) 基础上的搜索引擎.当然 Elasticsearch 并不仅仅是 Lucene 那么简单，它不仅包括了全文搜索功能，还可以进行以下工作:")]),s._v(" "),t("p",[s._v("• 分布式实时文件存储，并将每一个字段都编入索引，使其可以被搜索。")]),s._v(" "),t("p",[s._v("• 实时分析的分布式搜索引擎。")]),s._v(" "),t("p",[s._v("• 可以扩展到上百台服务器，处理PB级别的结构化或非结构化数据。")]),s._v(" "),t("h3",{attrs:{id:"基本概念"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#基本概念"}},[s._v("#")]),s._v(" 基本概念")]),s._v(" "),t("p",[s._v("先说Elasticsearch的文件存储，Elasticsearch是面向文档型数据库，一条数据在这里就是一个文档，用JSON作为文档序列化的格式，比如下面这条用户数据：")]),s._v(" "),t("div",{staticClass:"language-java line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-java"}},[t("code",[t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n    "),t("span",{pre:!0,attrs:{class:"token string"}},[s._v('"name"')]),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v("     "),t("span",{pre:!0,attrs:{class:"token string"}},[s._v('"John"')]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v("\n        "),t("span",{pre:!0,attrs:{class:"token string"}},[s._v('"sex"')]),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v("      "),t("span",{pre:!0,attrs:{class:"token string"}},[s._v('"Male"')]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v("\n        "),t("span",{pre:!0,attrs:{class:"token string"}},[s._v('"age"')]),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v("      "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("25")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v("\n        "),t("span",{pre:!0,attrs:{class:"token string"}},[s._v('"birthDate"')]),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token string"}},[s._v('"1990/05/01"')]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v("\n        "),t("span",{pre:!0,attrs:{class:"token string"}},[s._v('"about"')]),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v("    "),t("span",{pre:!0,attrs:{class:"token string"}},[s._v('"I love to go rock climbing"')]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v("\n        "),t("span",{pre:!0,attrs:{class:"token string"}},[s._v('"interests"')]),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("[")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token string"}},[s._v('"sports"')]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token string"}},[s._v('"music"')]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("]")]),s._v("\n"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n")])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br"),t("span",{staticClass:"line-number"},[s._v("2")]),t("br"),t("span",{staticClass:"line-number"},[s._v("3")]),t("br"),t("span",{staticClass:"line-number"},[s._v("4")]),t("br"),t("span",{staticClass:"line-number"},[s._v("5")]),t("br"),t("span",{staticClass:"line-number"},[s._v("6")]),t("br"),t("span",{staticClass:"line-number"},[s._v("7")]),t("br"),t("span",{staticClass:"line-number"},[s._v("8")]),t("br")])]),t("p",[s._v("用Mysql这样的数据库存储就会容易想到建立一张User表，有balabala的字段等，在Elasticsearch里这就是一个文档，当然这个文档会属于一个User的类型，各种各样的类型存在于一个索引当中。这里有一份简易的将Elasticsearch和关系型数据术语对照表:")]),s._v(" "),t("p",[s._v("关系数据库     ⇒ 数据库 ⇒ 表    ⇒ 行    ⇒ 列(Columns)")]),s._v(" "),t("p",[s._v("Elasticsearch  ⇒ 索引(Index)   ⇒ 类型(type)  ⇒ 文档(Docments)  ⇒ 字段(Fields)")]),s._v(" "),t("p",[s._v("一个 Elasticsearch 集群可以包含多个索引(数据库)，也就是说其中包含了很多类型(表)。这些类型中包含了很多的文档(行)，然后每个文档中又包含了很多的字段(列)。Elasticsearch的交互，可以使用Java API，也可以直接使用HTTP的Restful API方式，比如我们打算插入一条记录，可以简单发送一个HTTP的请求：")]),s._v(" "),t("div",{staticClass:"language-java line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-java"}},[t("code",[t("span",{pre:!0,attrs:{class:"token constant"}},[s._v("PUT")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("/")]),s._v("megacorp"),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("/")]),s._v("employee"),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("/")]),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("1")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n    "),t("span",{pre:!0,attrs:{class:"token string"}},[s._v('"name"')]),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v("     "),t("span",{pre:!0,attrs:{class:"token string"}},[s._v('"John"')]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v("\n        "),t("span",{pre:!0,attrs:{class:"token string"}},[s._v('"sex"')]),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v("      "),t("span",{pre:!0,attrs:{class:"token string"}},[s._v('"Male"')]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v("\n        "),t("span",{pre:!0,attrs:{class:"token string"}},[s._v('"age"')]),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v("      "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("25")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v("\n        "),t("span",{pre:!0,attrs:{class:"token string"}},[s._v('"about"')]),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v("    "),t("span",{pre:!0,attrs:{class:"token string"}},[s._v('"I love to go rock climbing"')]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v("\n        "),t("span",{pre:!0,attrs:{class:"token string"}},[s._v('"interests"')]),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("[")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token string"}},[s._v('"sports"')]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token string"}},[s._v('"music"')]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("]")]),s._v("\n"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n\n")])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br"),t("span",{staticClass:"line-number"},[s._v("2")]),t("br"),t("span",{staticClass:"line-number"},[s._v("3")]),t("br"),t("span",{staticClass:"line-number"},[s._v("4")]),t("br"),t("span",{staticClass:"line-number"},[s._v("5")]),t("br"),t("span",{staticClass:"line-number"},[s._v("6")]),t("br"),t("span",{staticClass:"line-number"},[s._v("7")]),t("br"),t("span",{staticClass:"line-number"},[s._v("8")]),t("br")])]),t("p",[s._v("更新，查询也是类似这样的操作，具体操作手册可以参见Elasticsearch权威指南")]),s._v(" "),t("h3",{attrs:{id:"索引"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#索引"}},[s._v("#")]),s._v(" 索引")]),s._v(" "),t("p",[s._v("Elasticsearch最关键的就是提供强大的索引能力了，其实InfoQ的这篇时间序列数据库的秘密(2)——索引写的非常好，我这里也是围绕这篇结合自己的理解进一步梳理下，也希望可以帮助大家更好的理解这篇文章。")]),s._v(" "),t("p",[s._v("Elasticsearch索引的精髓：")]),s._v(" "),t("p",[s._v("一切设计都是为了提高搜索的性能")]),s._v(" "),t("p",[s._v("另一层意思：为了提高搜索的性能，难免会牺牲某些其他方面，比如插入/更新，否则其他数据库不用混了。前面看到往Elasticsearch里插入一条记录，其实就是直接PUT一个json的对象，这个对象有多个fields，比如上面例子中的name, sex, age, about, interests，那么在插入这些数据到Elasticsearch的同时，Elasticsearch还默默1的为这些字段建立索引--倒排索引，因为Elasticsearch最核心功能是搜索。")]),s._v(" "),t("p",[t("code",[s._v("Elasticsearch是如何做到快速索引的")])]),s._v(" "),t("p",[s._v("InfoQ那篇文章里说Elasticsearch使用的倒排索引比关系型数据库的B-Tree索引快，为什么呢？")]),s._v(" "),t("p",[t("strong",[s._v("什么是B-Tree索引?")])]),s._v(" "),t("p",[s._v("上大学读书时老师教过我们，二叉树查找效率是logN，同时插入新的节点不必移动全部节点，所以用树型结构存储索引，能同时兼顾插入和查询的性能。因此在这个基础上，再结合磁盘的读取特性(顺序读/随机读)，传统关系型数据库采用了B-Tree/B+Tree这样的数据结构：")]),s._v(" "),t("p",[t("img",{attrs:{src:"https://img-blog.csdnimg.cn/c4292d2b25344492a8f61628e66911e5.png",alt:"在这里插入图片描述"}})]),s._v(" "),t("p",[s._v("为了提高查询的效率，减少磁盘寻道次数，将多个值作为一个数组通过连续区间存放，一次寻道读取多个数据，同时也降低树的高度。")]),s._v(" "),t("p",[t("strong",[s._v("什么是倒排索引?")])]),s._v(" "),t("p",[t("img",{attrs:{src:"https://img-blog.csdnimg.cn/9bd469a0cac14a85b09c702138524f10.png",alt:"在这里插入图片描述"}})]),s._v(" "),t("p",[s._v("继续上面的例子，假设有这么几条数据(为了简单，去掉about, interests这两个field):")]),s._v(" "),t("p",[t("img",{attrs:{src:"https://img-blog.csdnimg.cn/623fc5fae88848c0820983dbb840e3a6.png",alt:"在这里插入图片描述"}})]),s._v(" "),t("p",[t("code",[s._v("Posting List")])]),s._v(" "),t("p",[s._v("Elasticsearch分别为每个field都建立了一个倒排索引，Kate, John, 24, Female这些叫"),t("code",[s._v("term")]),s._v("，而[1,2]就是Posting List。Posting list就是一个int的数组，存储了所有符合某个term的文档id。")]),s._v(" "),t("p",[s._v("看到这里，不要认为就结束了，精彩的部分才刚开始...")]),s._v(" "),t("p",[s._v("通过posting list这种索引方式似乎可以很快进行查找，比如要找age=24的同学，爱回答问题的小明马上就举手回答：我知道，id是1，2的同学。但是，如果这里有上千万的记录呢？如果是想通过name来查找呢？")]),s._v(" "),t("p",[t("code",[s._v("Term Dictionary")])]),s._v(" "),t("p",[s._v("Elasticsearch为了能快速找到某个term，将所有的term排个序，二分法查找term，logN的查找效率，就像通过字典查找一样，这就是"),t("code",[s._v("Term Dictionary")]),s._v("。现在再看起来，似乎和传统数据库通过B-Tree的方式类似啊，为什么说比B-Tree的查询快呢？")]),s._v(" "),t("p",[t("code",[s._v("Term Index")])]),s._v(" "),t("p",[s._v("B-Tree通过减少磁盘寻道次数来提高查询性能，Elasticsearch也是采用同样的思路，直接通过内存查找term，不读磁盘，但是如果term太多，term dictionary也会很大，放内存不现实，于是有了Term Index，就像字典里的索引页一样，A开头的有哪些term，分别在哪页，可以理解term index是一颗树：")]),s._v(" "),t("p",[t("img",{attrs:{src:"https://img-blog.csdnimg.cn/c7d778c65d744ba19a1259a85acf6277.png",alt:"在这里插入图片描述"}})]),s._v(" "),t("p",[s._v("这棵树不会包含所有的term，它包含的是term的一些前缀。通过term index可以快速地定位到term dictionary的某个offset，然后从这个位置再往后顺序查找。")]),s._v(" "),t("p",[t("img",{attrs:{src:"https://img-blog.csdnimg.cn/42c7152a34b34d8e9f9eafc9d48ea68d.png",alt:"在这里插入图片描述"}})]),s._v(" "),t("p",[s._v("所以term index不需要存下所有的term，而仅仅是他们的一些前缀与Term Dictionary的block之间的映射关系，再结合FST(Finite State Transducers)的压缩技术，可以使term index缓存到内存中。从term index查到对应的term dictionary的block位置之后，再去磁盘上找term，大大减少了磁盘随机读的次数。")]),s._v(" "),t("p",[s._v("FSTs are finite-state machines that map a term (byte sequence) to an arbitrary output.")]),s._v(" "),t("p",[s._v('假设我们现在要将mop, moth, pop, star, stop and top(term index里的term前缀)映射到序号：0，1，2，3，4，5(term dictionary的block位置)。最简单的做法就是定义个Map<string, integer="">，大家找到自己的位置对应入座就好了，但从内存占用少的角度想想，有没有更优的办法呢？答案就是：FST')]),s._v(" "),t("p",[t("img",{attrs:{src:"https://img-blog.csdnimg.cn/d72d7579d59d4b92b57e1251b0699330.png",alt:"在这里插入图片描述"}})]),s._v(" "),t("p",[s._v("⭕️表示一种状态")]),s._v(" "),t("p",[s._v("--\x3e表示状态的变化过程，上面的字母/数字表示状态变化和权重")]),s._v(" "),t("p",[s._v("将单词分成单个字母通过⭕️和--\x3e表示出来，0权重不显示。如果⭕️后面出现分支，就标记权重，最后整条路径上的权重加起来就是这个单词对应的序号\n。\nFSTs are finite-state machines that map a term (byte sequence) to an arbitrary output.")]),s._v(" "),t("p",[s._v("FST以字节的方式存储所有的term，这种压缩方式可以有效的缩减存储空间，使得term index足以放进内存，但这种方式也会导致查找时需要更多的CPU资源。")]),s._v(" "),t("p",[t("code",[s._v("压缩技巧")])]),s._v(" "),t("p",[s._v("Elasticsearch里除了上面说到用FST压缩term index外，对posting list也有压缩技巧。")]),s._v(" "),t("p",[s._v('"posting list不是已经只存储文档id了吗？还需要压缩？"')]),s._v(" "),t("p",[s._v("如果Elasticsearch需要对同学的性别进行索引(这时传统关系型数据库已经哭晕在厕所……)，会怎样？如果有上千万个同学，而世界上只有男/女这样两个性别，每个posting list都会有至少百万个文档id。 Elasticsearch是如何有效的对这些文档id压缩的呢？")]),s._v(" "),t("p",[s._v("Frame Of Reference")]),s._v(" "),t("p",[s._v("增量编码压缩，将大数变小数，按字节存储")]),s._v(" "),t("p",[s._v("首先，Elasticsearch要求posting list是有序的(为了提高搜索的性能，再任性的要求也得满足)，这样做的一个好处是方便压缩，看下面这个图例：")]),s._v(" "),t("p",[t("img",{attrs:{src:"https://img-blog.csdnimg.cn/a31424bf635d4968a02d2a19a86ff918.png",alt:"在这里插入图片描述"}})]),s._v(" "),t("p",[s._v("原理就是通过增量，将原来的大数变成小数仅存储增量值，再精打细算按bit排好队，最后通过字节存储，而不是大大咧咧的尽管是2也是用int(4个字节)来存储。")]),s._v(" "),t("p",[t("code",[s._v("Roaring bitmaps")])]),s._v(" "),t("p",[s._v("说到Roaring bitmaps，就必须先从bitmap说起。Bitmap是一种数据结构，假设有某个posting list：")]),s._v(" "),t("p",[s._v("[1,3,4,7,10]")]),s._v(" "),t("p",[s._v("对应的bitmap就是：")]),s._v(" "),t("p",[s._v("[1,0,1,1,0,0,1,0,0,1]")]),s._v(" "),t("p",[s._v("非常直观，用0/1表示某个值是否存在，比如10这个值就对应第10位，对应的bit值是1，这样用一个字节就可以代表8个文档id，旧版本(5.0之前)的Lucene就是用这样的方式来压缩的，但这样的压缩方式仍然不够高效，如果有1亿个文档，那么需要12.5MB的存储空间，这仅仅是对应一个索引字段(我们往往会有很多个索引字段)。于是有人想出了Roaring bitmaps这样更高效的数据结构。")]),s._v(" "),t("p",[s._v("Bitmap的缺点是存储空间随着文档个数线性增长，Roaring bitmaps需要打破这个魔咒就一定要用到某些指数特性：")]),s._v(" "),t("p",[s._v("将posting list按照65535为界限分块，比如第一块所包含的文档id范围在0~65535之间，第二块的id范围是65536~131071，以此类推。再用<商，余数>的组合表示每一组id，这样每组里的id范围都在0~65535内了，剩下的就好办了，既然每组id不会变得无限大，那么我们就可以通过最有效的方式对这里的id存储。")]),s._v(" "),t("p",[t("img",{attrs:{src:"https://img-blog.csdnimg.cn/e67d3428d87c4c198843cbfb0840f962.png",alt:"在这里插入图片描述"}})]),s._v(" "),t("p",[s._v("程序员的世界里除了1024外，65535也是一个经典值，因为它=2^16-1，正好是用2个字节能表示的最大数，一个short的存储单位，注意到上图里的最后一行“If a block has more than 4096 values, encode as a bit set, and otherwise as a simple array using 2 bytes per value”，如果是大块，用节省点用bitset存，小块就豪爽点，2个字节我也不计较了，用一个short[]存着方便。")]),s._v(" "),t("p",[s._v("那为什么用4096来区分大块还是小块呢？")]),s._v(" "),t("p",[s._v("个人理解：都说程序员的世界是二进制的，4096*2bytes ＝ 8192bytes < 1KB, 磁盘一次寻道可以顺序把一个小块的内容都读出来，再大一位就超过1KB了，需要两次读。")]),s._v(" "),t("p",[t("code",[s._v("联合索引")])]),s._v(" "),t("p",[s._v("上面说了半天都是单field索引，如果多个field索引的联合查询，倒排索引如何满足快速查询的要求呢？")]),s._v(" "),t("ul",[t("li",[t("p",[s._v("利用跳表(Skip list)的数据结构快速做“与”运算，或者")])]),s._v(" "),t("li",[t("p",[s._v("利用上面提到的bitset按位“与”")])])]),s._v(" "),t("p",[s._v("先看看跳表的数据结构：")]),s._v(" "),t("p",[t("img",{attrs:{src:"https://img-blog.csdnimg.cn/468d47b3225e495899f15562a32767ea.png",alt:"在这里插入图片描述"}})]),s._v(" "),t("p",[s._v("将一个有序链表level0，挑出其中几个元素到level1及level2，每个level越往上，选出来的指针元素越少，查找时依次从高level往低查找，比如55，先找到level2的31，再找到level1的47，最后找到55，一共3次查找，查找效率和2叉树的效率相当，但也是用了一定的空间冗余来换取的。")]),s._v(" "),t("p",[s._v("假设有下面三个posting list需要联合索引：")]),s._v(" "),t("p",[t("img",{attrs:{src:"https://img-blog.csdnimg.cn/8ca9583dab304a40a79c861df2c15dcc.png",alt:"在这里插入图片描述"}})]),s._v(" "),t("p",[s._v("如果使用跳表，对最短的posting list中的每个id，逐个在另外两个posting list中查找看是否存在，最后得到交集的结果。")]),s._v(" "),t("p",[s._v("如果使用bitset，就很直观了，直接按位与，得到的结果就是最后的交集。")]),s._v(" "),t("h3",{attrs:{id:"总结和思考"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#总结和思考"}},[s._v("#")]),s._v(" 总结和思考")]),s._v(" "),t("p",[s._v("Elasticsearch的索引思路:")]),s._v(" "),t("p",[s._v("将磁盘里的东西尽量搬进内存，减少磁盘随机读取次数(同时也利用磁盘顺序读特性)，结合各种奇技淫巧的压缩算法，用及其苛刻的态度使用内存。")]),s._v(" "),t("p",[s._v("所以，对于使用Elasticsearch进行索引时需要注意:")]),s._v(" "),t("ul",[t("li",[t("p",[s._v("不需要索引的字段，一定要明确定义出来，因为默认是自动建索引的")])]),s._v(" "),t("li",[t("p",[s._v("同样的道理，对于String类型的字段，不需要analysis的也需要明确定义出来，因为默认也是会analysis的")])]),s._v(" "),t("li",[t("p",[s._v("选择有规律的ID很重要，随机性太大的ID(比如java的UUID)不利于查询")])])]),s._v(" "),t("p",[s._v("关于最后一点，个人认为有多个因素:")]),s._v(" "),t("p",[s._v("其中一个(也许不是最重要的)因素: 上面看到的压缩算法，都是对Posting list里的大量ID进行压缩的，那如果ID是顺序的，或者是有公共前缀等具有一定规律性的ID，压缩比会比较高；")]),s._v(" "),t("p",[s._v("另外一个因素: 可能是最影响查询性能的，应该是最后通过Posting list里的ID到磁盘中查找Document信息的那步，因为Elasticsearch是分Segment存储的，根据ID这个大范围的Term定位到Segment的效率直接影响了最后查询的性能，如果ID是有规律的，可以快速跳过不包含该ID的Segment，从而减少不必要的磁盘读次数")])])}),[],!1,null,null,null);t.default=n.exports}}]);