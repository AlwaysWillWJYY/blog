(window.webpackJsonp=window.webpackJsonp||[]).push([[84],{544:function(s,t,_){"use strict";_.r(t);var a=_(1),o=Object(a.a)({},(function(){var s=this,t=s._self._c;return t("ContentSlotsDistributor",{attrs:{"slot-key":s.$parent.slotKey}},[t("h3",{attrs:{id:"常量池在class文件的什么位置"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#常量池在class文件的什么位置"}},[s._v("#")]),s._v(" 常量池在class文件的什么位置？")]),s._v(" "),t("p",[t("img",{attrs:{src:"https://img-blog.csdnimg.cn/1b25e0efabac4053a73823e9af55e818.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBAbGVlZGNvZGVKb2huMDE=,size_17,color_FFFFFF,t_70,g_se,x_16",alt:"在这里插入图片描述"}})]),s._v(" "),t("p",[s._v("在.class文件的魔数、父版本号和主版本号之后紧跟着就是常量池计数器与class常量池了")]),s._v(" "),t("h3",{attrs:{id:"常量池的里面是怎么组织的"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#常量池的里面是怎么组织的"}},[s._v("#")]),s._v(" 常量池的里面是怎么组织的？")]),s._v(" "),t("p",[s._v("常量池的组织很简单，前端的两个字节占有的位置叫做"),t("code",[s._v("常量池计数器(constant_pool_count)")]),s._v("，它记录着常量池的组成元素  "),t("code",[s._v("常量池项(cp_info)")]),s._v("的个数。紧接着会排列着"),t("code",[s._v("constant_pool_count-1个常量池项(cp_info)")]),s._v("。如下图所示：")]),s._v(" "),t("p",[t("img",{attrs:{src:"https://img-blog.csdnimg.cn/75c9edb60d7a4aa9ae2a50f884345527.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBAbGVlZGNvZGVKb2huMDE=,size_20,color_FFFFFF,t_70,g_se,x_16",alt:"在这里插入图片描述"}})]),s._v(" "),t("h3",{attrs:{id:"常量池项-cp-info-的结构是什么"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#常量池项-cp-info-的结构是什么"}},[s._v("#")]),s._v(" 常量池项 (cp_info) 的结构是什么？")]),s._v(" "),t("p",[s._v("每个"),t("code",[s._v("常量池项(cp_info)")]),s._v(" 都会对应记录着class文件中的某种类型的字面量。让我们先来了解一下"),t("code",[s._v("常量池项(cp_info)")]),s._v("的结构吧：")]),s._v(" "),t("p",[t("img",{attrs:{src:"https://img-blog.csdnimg.cn/5c4638189f1d41dd88a4e611774a14eb.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBAbGVlZGNvZGVKb2huMDE=,size_19,color_FFFFFF,t_70,g_se,x_16",alt:"在这里插入图片描述"}})]),s._v(" "),t("p",[s._v("JVM虚拟机规定了不同的tag值和不同类型的字面量对应关系如下：")]),s._v(" "),t("p",[t("img",{attrs:{src:"https://img-blog.csdnimg.cn/96f22d41d62c42879149db143d038e73.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBAbGVlZGNvZGVKb2huMDE=,size_15,color_FFFFFF,t_70,g_se,x_16",alt:"在这里插入图片描述"}})]),s._v(" "),t("p",[s._v("所以根据cp_info中的tag 不同的值，可以将cp_info 更细化为以下结构体：")]),s._v(" "),t("p",[t("img",{attrs:{src:"https://img-blog.csdnimg.cn/bd6c74dcd0ef4a0db37433c97ff517b5.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBAbGVlZGNvZGVKb2huMDE=,size_19,color_FFFFFF,t_70,g_se,x_16",alt:"在这里插入图片描述"}})]),s._v(" "),t("p",[t("img",{attrs:{src:"https://img-blog.csdnimg.cn/d4b52e3fe0f04dd79cd9b4434f31412c.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBAbGVlZGNvZGVKb2huMDE=,size_20,color_FFFFFF,t_70,g_se,x_16",alt:"在这里插入图片描述"}})]),s._v(" "),t("h3",{attrs:{id:"常量池能够表示那些信息"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#常量池能够表示那些信息"}},[s._v("#")]),s._v(" 常量池能够表示那些信息？")]),s._v(" "),t("p",[t("img",{attrs:{src:"https://img-blog.csdnimg.cn/c170923004dc4b0294390ae8c045458a.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBAbGVlZGNvZGVKb2huMDE=,size_14,color_FFFFFF,t_70,g_se,x_16",alt:"在这里插入图片描述"}})]),s._v(" "),t("h3",{attrs:{id:"int和float数据类型的常量在常量池中是怎样表示和存储的-constant-integer-info-constant-float-info"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#int和float数据类型的常量在常量池中是怎样表示和存储的-constant-integer-info-constant-float-info"}},[s._v("#")]),s._v(" int和float数据类型的常量在常量池中是怎样表示和存储的？(CONSTANT_Integer_info, CONSTANT_Float_info)")]),s._v(" "),t("p",[s._v("** Java语言规范规定了 int类型和Float 类型的数据类型占用 4 个字节的空间。那么存在于class字节码文件中的该类型的常量是如何存储的呢？相应地，在常量池中，将 int和Float类型的常量分别使用CONSTANT_Integer_info和 Constant_float_info表示，他们的结构如下所示：**")]),s._v(" "),t("p",[t("img",{attrs:{src:"https://img-blog.csdnimg.cn/0bb62717ae8f42859545b26b39dd2e43.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBAbGVlZGNvZGVKb2huMDE=,size_19,color_FFFFFF,t_70,g_se,x_16",alt:"在这里插入图片描述"}})]),s._v(" "),t("p",[s._v("举例：建下面的类 IntAndFloatTest.java，在这个类中，我们声明了五个变量，但是取值就两种int类型的10 和Float类型的11f。")]),s._v(" "),t("p",[t("img",{attrs:{src:"https://img-blog.csdnimg.cn/9af27e314b634367adc45ccdf990ba62.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBAbGVlZGNvZGVKb2huMDE=,size_8,color_FFFFFF,t_70,g_se,x_16",alt:"在这里插入图片描述"}})]),s._v(" "),t("p",[s._v("然后用编译器编译成IntAndFloatTest.class字节码文件，我们通过javap -v IntAndFloatTest 指令来看一下其常量池中的信息，可以看到虽然我们在代码中写了两次10 和三次11f，但是常量池中，就只有一个常量10 和一个常量11f,如下图所示:")]),s._v(" "),t("p",[t("img",{attrs:{src:"https://img-blog.csdnimg.cn/8dde71c61a9b495bb1e32953115f6855.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBAbGVlZGNvZGVKb2huMDE=,size_13,color_FFFFFF,t_70,g_se,x_16",alt:"在这里插入图片描述"}})]),s._v(" "),t("p",[s._v("从结果上可以看到常量池第"),t("code",[s._v("#8")]),s._v("个常量池项(cp_info) 就是"),t("code",[s._v("CONSTANT_Integer_info")]),s._v(",值为10；第#23个常量池项(cp_info) 就是CONSTANT_Float_info,值为"),t("code",[s._v("11f")]),s._v("。(常量池中其他的东西先别纠结啦，我们会面会一一讲解的哦)。")]),s._v(" "),t("p",[s._v("代码中所有用到 int 类型 10 的地方，会使用指向常量池的指针值"),t("code",[s._v("#8")]),s._v(" 定位到第"),t("code",[s._v("#8")]),s._v(" 个"),t("code",[s._v("常量池项(cp_info)")]),s._v("，即值为 "),t("code",[s._v("10")]),s._v("的结构体"),t("code",[s._v("CONSTANT_Integer_info")]),s._v("，而用到float类型的11f时，也会指向常量池的指针值#23来定位到第#23个常量池项(cp_info) 即值为11f的结构体CONSTANT_Float_info。如下图所示：")]),s._v(" "),t("p",[t("img",{attrs:{src:"https://img-blog.csdnimg.cn/017c43c4e77247dea87c3423cc720530.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBAbGVlZGNvZGVKb2huMDE=,size_17,color_FFFFFF,t_70,g_se,x_16",alt:"在这里插入图片描述"}})]),s._v(" "),t("h3",{attrs:{id:"long和-double数据类型的常量在常量池中是怎样表示和存储的-constant-long-info、constant-double-info"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#long和-double数据类型的常量在常量池中是怎样表示和存储的-constant-long-info、constant-double-info"}},[s._v("#")]),s._v(" long和 double数据类型的常量在常量池中是怎样表示和存储的？(CONSTANT_Long_info、CONSTANT_Double_info )")]),s._v(" "),t("p",[t("strong",[s._v("Java语言规范规定了 long 类型和 double类型的数据类型占用8 个字节的空间。那么存在于class 字节码文件中的该类型的常量是如何存储的呢？相应地，在常量池中，将long和double类型的常量分别使用CONSTANT_Long_info和Constant_Double_info表示，他们的结构如下所示：")])]),s._v(" "),t("p",[t("img",{attrs:{src:"https://img-blog.csdnimg.cn/999625f3173d42e1837056d3c53f1afa.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBAbGVlZGNvZGVKb2huMDE=,size_20,color_FFFFFF,t_70,g_se,x_16",alt:"在这里插入图片描述"}})]),s._v(" "),t("p",[s._v("举例：建下面的类 LongAndDoubleTest.java，在这个类中，我们声明了六个变量，但是取值就两种Long 类型的-6076574518398440533L 和Double 类型的10.1234567890D。")]),s._v(" "),t("p",[t("img",{attrs:{src:"https://img-blog.csdnimg.cn/befe633b29604016b6752daad0f83f43.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBAbGVlZGNvZGVKb2huMDE=,size_10,color_FFFFFF,t_70,g_se,x_16",alt:"在这里插入图片描述"}})]),s._v(" "),t("p",[s._v("然后用编译器编译成 LongAndDoubleTest.class 字节码文件，我们通过javap -v LongAndDoubleTest指令来看一下其常量池中的信息，可以看到虽然我们在代码中写了三次-6076574518398440533L 和三次10.1234567890D，但是常量池中，就只有一个常量-6076574518398440533L 和一个常量10.1234567890D,如下图所示:")]),s._v(" "),t("p",[t("img",{attrs:{src:"https://img-blog.csdnimg.cn/814b5b6b343f493096e3751ddc53ae8c.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBAbGVlZGNvZGVKb2huMDE=,size_16,color_FFFFFF,t_70,g_se,x_16",alt:"在这里插入图片描述"}})]),s._v(" "),t("p",[s._v("从结果上可以看到常量池第 #18 个常量池项(cp_info) 就是CONSTANT_Long_info,值为-6076574518398440533L ；第 #26个常量池项(cp_info) 就是CONSTANT_Double_info,值为10.1234567890D。(常量池中其他的东西先别纠结啦，我们会面会一一讲解的哦)。")]),s._v(" "),t("p",[s._v("代码中所有用到 long 类型-6076574518398440533L 的地方，会使用指向常量池的指针值#18 定位到第 #18 个常量池项(cp_info)，即值为-6076574518398440533L 的结构体CONSTANT_Long_info，而用到double类型的10.1234567890D时，也会指向常量池的指针值#26来定位到第 #26 个常量池项(cp_info) 即值为10.1234567890D的结构体CONSTANT_Double_info。如下图所示：")]),s._v(" "),t("p",[t("img",{attrs:{src:"https://img-blog.csdnimg.cn/723b86bfdc784c3497054f88562a2d97.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBAbGVlZGNvZGVKb2huMDE=,size_20,color_FFFFFF,t_70,g_se,x_16",alt:"在这里插入图片描述"}})]),s._v(" "),t("h3",{attrs:{id:"string类型的字符串常量在常量池中是怎样表示和存储的-constant-string-info、constant-utf8-info"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#string类型的字符串常量在常量池中是怎样表示和存储的-constant-string-info、constant-utf8-info"}},[s._v("#")]),s._v(" String类型的字符串常量在常量池中是怎样表示和存储的？（CONSTANT_String_info、CONSTANT_Utf8_info）")]),s._v(" "),t("p",[s._v('对于字符串而言，JVM会将字符串类型的字面量以UTF-8 编码格式存储到在class字节码文件中。这么说可能有点摸不着北，我们先从直观的Java源码中中出现的用双引号"" 括起来的字符串来看，在编译器编译的时候，都会将这些字符串转换成'),t("code",[s._v("CONSTANT_String_info")]),s._v("结构体，然后放置于常量池中。其结构如下所示：")]),s._v(" "),t("p",[t("img",{attrs:{src:"https://img-blog.csdnimg.cn/2d96ed636e034ee9aae656ee77a38388.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBAbGVlZGNvZGVKb2huMDE=,size_19,color_FFFFFF,t_70,g_se,x_16",alt:"在这里插入图片描述"}})]),s._v(" "),t("p",[s._v("如上图所示的结构体，CONSTANT_String_info结构体中的string_index的值指向了CONSTANT_Utf8_info结构体，而字符串的utf-8编码数据就在这个结构体之中。如下图所示：")]),s._v(" "),t("p",[t("img",{attrs:{src:"https://img-blog.csdnimg.cn/8492bea11ddf4eef9996db6afe01df3a.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBAbGVlZGNvZGVKb2huMDE=,size_18,color_FFFFFF,t_70,g_se,x_16",alt:"在这里插入图片描述"}})]),s._v(" "),t("p",[s._v('请看一例，定义一个简单的StringTest.java类，然后在这个类里加一个"JVM原理" 字符串，然后，我们来看看它在class文件中是怎样组织的。')]),s._v(" "),t("p",[t("img",{attrs:{src:"https://img-blog.csdnimg.cn/1bfda7b5dea0474384360c80006b92c9.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBAbGVlZGNvZGVKb2huMDE=,size_10,color_FFFFFF,t_70,g_se,x_16",alt:"在这里插入图片描述"}})]),s._v(" "),t("p",[s._v("将Java源码编译成StringTest.class文件后，在此文件的目录下执行 javap -v StringTest 命令，会看到如下的常量池信息的轮廓：")]),s._v(" "),t("p",[t("img",{attrs:{src:"https://img-blog.csdnimg.cn/c646b0a9e4a64001a5f399283a1d1801.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBAbGVlZGNvZGVKb2huMDE=,size_16,color_FFFFFF,t_70,g_se,x_16",alt:"在这里插入图片描述"}})]),s._v(" "),t("p",[s._v('在上面的图中，我们可以看到CONSTANT_String_info结构体位于常量池的第#15个索引位置。而存放"Java虚拟机原理" 字符串的 UTF-8编码格式的字节数组被放到CONSTANT_Utf8_info结构体中，该结构体位于常量池的第#16个索引位置。上面的图只是看了个轮廓，让我们再深入地看一下它们的组织吧。请看下图：')]),s._v(" "),t("p",[t("img",{attrs:{src:"https://img-blog.csdnimg.cn/f13b2bdeda6741d8b6cea27783f3d70d.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBAbGVlZGNvZGVKb2huMDE=,size_20,color_FFFFFF,t_70,g_se,x_16",alt:"在这里插入图片描述"}})]),s._v(" "),t("p",[s._v("由上图可见："),t("code",[s._v("“JVM原理”")]),s._v("的"),t("code",[s._v("UTF-8")]),s._v("编码的数组是："),t("code",[s._v("4A564D E5 8E 9FE7 90 86")]),s._v("，并且存入了"),t("code",[s._v("CONSTANT_Utf8_info")]),s._v("结构体中。")]),s._v(" "),t("h3",{attrs:{id:"类文件中定义的类名和类中使用到的类在常量池中是怎样被组织和存储的-constant-class-info"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#类文件中定义的类名和类中使用到的类在常量池中是怎样被组织和存储的-constant-class-info"}},[s._v("#")]),s._v(" 类文件中定义的类名和类中使用到的类在常量池中是怎样被组织和存储的？(CONSTANT_Class_info)")]),s._v(" "),t("p",[s._v("JVM会将某个Java 类中所有使用到了的类的完全限定名 以二进制形式的完全限定名 封装成CONSTANT_Class_info结构体中，然后将其放置到常量池里。CONSTANT_Class_info 的tag值为 7 。其结构如下：")]),s._v(" "),t("p",[t("img",{attrs:{src:"https://img-blog.csdnimg.cn/04406d480303483989409aed698cfe78.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBAbGVlZGNvZGVKb2huMDE=,size_17,color_FFFFFF,t_70,g_se,x_16",alt:"在这里插入图片描述"}})]),s._v(" "),t("p",[t("code",[s._v('Tips：类的完全限定名和二进制形式的完全限定名 在某个Java源码中，我们会使用很多个类，比如我们定义了一个 ClassTest的类，并把它放到com.louis.jvm 包下，则 ClassTest类的完全限定名为com.louis.jvm.ClassTest，将JVM编译器将类编译成class文件后，此完全限定名在class文件中，是以二进制形式的完全限定名存储的，即它会把完全限定符的"."换成"/" ，即在class文件中存储的 ClassTest类的完全限定名称是"com/louis/jvm/ClassTest"。因为这种形式的完全限定名是放在了class二进制形式的字节码文件中，所以就称之为 二进制形式的完全限定名。')])]),s._v(" "),t("p",[s._v("举例，我们定义一个很简单的ClassTest类，来看一下常量池是怎么对类的完全限定名进行存储的。")]),s._v(" "),t("p",[t("img",{attrs:{src:"https://img-blog.csdnimg.cn/ad99ec584f7343fa89f201b931ed2144.png",alt:"在这里插入图片描述"}})]),s._v(" "),t("p",[t("img",{attrs:{src:"https://img-blog.csdnimg.cn/935e07e5c2bf40e8a491b9a48d9bc3ab.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBAbGVlZGNvZGVKb2huMDE=,size_19,color_FFFFFF,t_70,g_se,x_16",alt:"在这里插入图片描述"}})]),s._v(" "),t("p",[s._v("如上图所示，在ClassTest.class文件的常量池中，共有 3 个CONSTANT_Class_info结构体，分别表示ClassTest 中用到的Class信息。 我们就看其中一个表示com/jvm.ClassTest的CONSTANT_Class_info 结构体。它在常量池中的位置是#1，它的name_index值为#2，它指向了常量池的第2 个常量池项，如下所示:")]),s._v(" "),t("p",[t("img",{attrs:{src:"https://img-blog.csdnimg.cn/fff200b73d1f40f89c8a2921f73b47ad.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBAbGVlZGNvZGVKb2huMDE=,size_20,color_FFFFFF,t_70,g_se,x_16",alt:"在这里插入图片描述"}})]),s._v(" "),t("p",[s._v("`  对于某个类而言，其class文件中至少要有两个CONSTANT_Class_info常量池项，用来表示自己的类信息和其父类信息。(除了java.lang.Object类除外，其他的任何类都会默认继承自java.lang.Object）如果类声明实现了某些接口，那么接口的信息也会生成对应的CONSTANT_Class_info常量池项。")]),s._v(" "),t("p",[s._v("总结：")]),s._v(" "),t("p",[s._v("1.对于某个类或接口而言，其自身、父类和继承或实现的接口的信息会被直接组装成CONSTANT_Class_info常量池项放置到常量池中；")]),s._v(" "),t("ol",{attrs:{start:"2"}},[t("li",[t("p",[s._v("类中或接口中使用到了其他的类，只有在类中实际使用到了该类时，该类的信息才会在常量池中有对应的CONSTANT_Class_info常量池项；")])]),s._v(" "),t("li",[t("p",[s._v("类中或接口中仅仅定义某种类型的变量，JDK只会将变量的类型描述信息以UTF-8字符串组成CONSTANT_Utf8_info常量池项放置到常量池中，上面在类中的private Date date;JDK编译器只会将表示date的数据类型的“Ljava/util/Date”字符串放置到常量池中。`")])])])])}),[],!1,null,null,null);t.default=o.exports}}]);