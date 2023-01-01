(window.webpackJsonp=window.webpackJsonp||[]).push([[264],{723:function(e,r,t){"use strict";t.r(r);var n=t(1),o=Object(n.a)({},(function(){var e=this,r=e._self._c;return r("ContentSlotsDistributor",{attrs:{"slot-key":e.$parent.slotKey}},[r("h3",{attrs:{id:"codebert-codebert-a-pre-trained-model-for-programming-and-natural-languages"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#codebert-codebert-a-pre-trained-model-for-programming-and-natural-languages"}},[e._v("#")]),e._v(" CodeBert( CodeBERT: A Pre-Trained Model for Programming and Natural Languages )")]),e._v(" "),r("p",[e._v("大型预训练模型对几乎所有NLP任务都带来了显著改进，成功的方法是在大规模数据集上自监督的训练深度神经网络。比如GPT是根据上文的单词来预测下一个词，而Bert是根据上下文的单词来预测中间被mask掉的单词，以此更好的学习通用语言表征。")]),e._v(" "),r("p",[e._v("多模态预训练模型的关键是学习不同模态输入之间的隐形对齐，比如学习语言和图像的对齐。本文将自然语言和程序语言视为不同的模态，不仅学习包含NL-PL对的双模态数据，还学习大量的单模态数据，比如没有文档注释的代码，或者没有配对代码的文档注释。")]),e._v(" "),r("p",[e._v("CodeBert模型基于transformer架构，利用双模态NL-PL对数据和单模态PL数据来训练MLM和RTD两个与训练任务，数据集包含6种编程语言，其中编程语言类型不使用显示标记来标注。")]),e._v(" "),r("p",[e._v("模型结构使用CodeBert基于多层双向transformer网络，一共12层，每层12个Attention head，与RoBERTa的模型基本一致。预训练数据是成对的NL-PL双模态数据和仅有PL的单模态数据，具有6种不同的编程语言，预训练阶段，输入部分将自然语言文本和代码文本之间使用[sep]间隔，构成{[cls], nl, [sep], pl, [eos]}的形式，输出部分包括每个token的embedding值和用于分类的[cls]值。本模型包括两个预训练任务，一个是MLM传统的Bert掩码语言模型，随机选择单词进行mask，然后来预测被mask的单词，这个任务使用双模态数据NL-PL对来进行预训练。另一个预训练任务就是RTD任务了，使用PL和NL单模态数据来预训练，首先使用一个生成器预测句中被mask掉的token，接下来使用预测的token替代句中的[MASK]标记，然后使用一个判别器区分句中的每个token是原始的还是替换后的,本文在自然语言代码搜索、代码文本生成这两个下游任务上进行fine-tuning，对于自然语言代码搜索任务，使用[cls]的表示来衡量自然语言查询与代码之间的语义相关性，对于代码文本生成任务，使用encoder-decoder框架，CodeBert模型用来初始化encoder部分.")]),e._v(" "),r("h3",{attrs:{id:"graphcodebert-graphcodebert-pre-training-code-representations-with-data-flow"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#graphcodebert-graphcodebert-pre-training-code-representations-with-data-flow"}},[e._v("#")]),e._v(" GraphCodeBert( GRAPHCODEBERT: PRE-TRAINING CODE REPRESENTATIONS WITH DATA FLOW  )")]),e._v(" "),r("p",[e._v("本文提出了GraphCodeBert模型，基于数据流的方式做源代码的信息表征。数据流不同于AST，不会带来深层次不必要的复杂信息，数据流蕴含的是代码变量间“值从哪里来”的语义特征，使用该特征可以更有效的生成代码表征。")]),e._v(" "),r("p",[e._v("对于一份源代码片段，首先使用标准的编译工具将其解析成AST，可以支持本文涉及的6种编程语言（Ruby, Javascript, Go, Python, Java, Php）。接下来，从生成的AST中提取出变量的序列，变量序列中的每一个元素都会成为数据流图中的一个结点。最后，基于变量序列和AST中提取出的变量之间的依赖关系，构建数据流图。")]),e._v(" "),r("p",[e._v("输入包含3部分：源代码C，注释W（该源代码片段的含义），和变量序列V，bert输入端为以上3个序列的连接X={[CLS] , W , [SEP] , C , [SEP] , V}。和Bert的embedding方式类似，GraphCodeBert在对单词进行编码时采用了token embedding和position embedding结合的方式，position embedding也体现了变量在变量序列之中的位置信息，这个位置信息也对应着数据流中的不同结点。GraphCodeBert模型使用了12个transformer encoder层来组成核心网络结构，采用12个attention head的多头注意力机制，包含Feed Forward层和Layer Normalization层等等，与我们熟知的transformer不同的是，本文中增加了一个Graph-Guided Masked Attention层，这个层与传统的Attention层的区别是在softmax计算权重之前需要增加一个参数M，功能是用来过滤无效的元素（在softmax之前加上负无穷）")]),e._v(" "),r("h3",{attrs:{id:"unixcoder-unixcoder-unified-cross-modal-pre-training-for-code-representation"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#unixcoder-unixcoder-unified-cross-modal-pre-training-for-code-representation"}},[e._v("#")]),e._v(" UnixCoder( UniXcoder: Unified Cross-Modal Pre-training for Code Representation )")]),e._v(" "),r("h3",{attrs:{id:"codebert-gnn-linved"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#codebert-gnn-linved"}},[e._v("#")]),e._v(" CodeBert + GNN(linved)")]),e._v(" "),r("p",[e._v("LineVD单独嵌入了函数级和语句级代码。CodeBERT是一种双模模型，这意味着除了函数代码本身之外，它还接受了函数的自然语言描述方面的培训。作为输入，它使用一个特殊的分隔符标记来区分自然语言描述和函数代码。虽然无法访问函数的自然语言描述，但可以在每个输入之前添加一个额外的分隔符标记，使描述为空。对于CodeBERT的输出，使用了适合于代码摘要任务的分类标记的嵌入。这使我们能够更好地利用CodeBERT模型强大的预处理源代码摘要功能。")]),e._v(" "),r("p",[e._v("我们重点关注的是数据和控制依赖信息，为此我们引入了图形注意网络（GAT）模型，图形神经网络根据图形连接更新节点状态，以保留重要信息，使用图注意网络构建从图中学习拓扑依赖信息的模型，GAT层将首先采用从CodeBERT嵌入的输出语句以及每个节点之间的边，提取功能的图形结构，包括节点和边缘信息，并提供给GAT。\nLineVD将通过在相邻语句之间以增量方式嵌入数据和控制相关语句（即程序相关图）来传播信息。因此，在LineVD体系结构中实现了两个图形注意网络。总的来说，GAT在等式中的聚合函数中使用了对邻居特征的关注。")]),e._v(" "),r("p",[e._v("中间代码整体思路：")]),e._v(" "),r("p",[e._v("首先利用漏洞代码特征集合在源代码中找到一些漏洞候选元素（标识符、操作符、常量、关键字等），然后利用该候选元素进行函数切片来生成与该元素语义相关的代码片段，叫做token of interest；有了token of interest后，将该源代码片段转化为中间代码片段，之后向量化输入到神经网络中去做漏洞的分类与检测，此时的输出不再是二分类，而是漏洞代码行。")]),e._v(" "),r("p",[e._v("首先需要生成sSyVC,需要关注两点，第一点关注跨文件语义相关的语句，有些文件中的函数可以与其他文件之中定义的变量相关联，因此漏洞候选需要考虑这类语句；第二点关注跨函数语义相关的语句，生成链接好的LLVM IR中间代码文件，随后根据上一步提取的sSyVC进行函数切片，生成iSeVC(包含与sSyVC数据依赖和控制依赖的语句)。")]),e._v(" "),r("p",[e._v("检测与定位漏洞:")]),e._v(" "),r("p",[e._v("之前是二分类任务，标签就是0和1，而这次输出是漏洞的范围，所以规定，如果有漏洞则标签为[x1,x2,...,xn]为漏洞代码的行号列表，如果没有漏洞则标签为[0]")]),e._v(" "),r("p",[e._v("符号化后的iSeVC将以token序列的形式输入神经网络，首先使用word2vec进行embedding，随后对向量长度做统一化，输入到双向RNN的改进版——BRNN-vdl网络中(实现了注意力机制和检测粒度细化)，其中的Attention机制：生成一个对角矩阵L(也就是前文提到的新加的输入漏洞位置矩阵，这里相当于把标签以另一种形式加进来了，利于训练)，如果iSeVC没有漏洞，那L就是一个单位矩阵；如果iSeVC有漏洞，那L对角线在与漏洞相关的行为1，其余行为0，相当于只考虑了与漏洞相关的行。将L矩阵与BRNN的输出相乘即可。")]),e._v(" "),r("p",[e._v("检测与定位：首先从目标程序提取出iSeVC，完成embedding，输入BRNN网络得到Activation层的输出结果，接着不进行attention了，针对每一行计算k-max以及它们的均值，如果这个均值大于某一个阈值，就认为这一行是漏洞代码行，将所有的漏洞代码行提取出来以后，对应到源代码上即可")])])}),[],!1,null,null,null);r.default=o.exports}}]);