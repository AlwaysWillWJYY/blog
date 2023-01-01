(window.webpackJsonp=window.webpackJsonp||[]).push([[261],{719:function(e,t,_){"use strict";_.r(t);var v=_(1),a=Object(v.a)({},(function(){var e=this,t=e._self._c;return t("ContentSlotsDistributor",{attrs:{"slot-key":e.$parent.slotKey}},[t("h2",{attrs:{id:"vulnerability-detection-with-fine-grained-interpretations"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#vulnerability-detection-with-fine-grained-interpretations"}},[e._v("#")]),e._v(" Vulnerability Detection with Fine-Grained Interpretations")]),e._v(" "),t("h3",{attrs:{id:"abstract"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#abstract"}},[e._v("#")]),e._v(" ABSTRACT")]),e._v(" "),t("p",[e._v("尽管基于机器学习（ML）和深度学习（DL）的漏洞检测器（VD）取得了成功，但它们仅限于提供关于给定代码是否易受攻击的决定，而不提供与检测到的漏洞相关的代码部分的详细信息。我们介绍了IVDetect，这是一种可解释的漏洞检测器，其理念是使用人工智能（AI）检测漏洞，同时使用智能助手（IA）根据漏洞陈述提供VD解释。")]),e._v(" "),t("p",[e._v("对于漏洞检测，我们通过数据和控制依赖关系分别考虑易受攻击的语句及其周围上下文。这使得我们的模型能够更好地区分易受攻击的语句，而不是像现有方法那样混合使用易受攻击代码和上下文代码。除了粗粒度的漏洞检测结果，我们利用可解释的AI为用户提供细粒度的解释，包括程序依赖图（PDG）中的子图以及与检测到的漏洞相关的关键语句。我们对脆弱性数据库的经验评估表明，IVDetect在前10名nDCG和MAP排名得分上优于现有基于DL的方法43%–84%和105%–255%。IVDetect在排名前5的案例中，有67%的案例通过其解释正确指出了与漏洞相关的易受攻击陈述。IVDetect的准确度比基线解释模型提高了12.3%-400%和9%-400%")]),e._v(" "),t("h3",{attrs:{id:"introduction"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#introduction"}},[e._v("#")]),e._v(" INTRODUCTION")]),e._v(" "),t("p",[e._v("软件漏洞对我们社会的软件基础设施造成了严重损害。为了解决这个问题，已经提出了几种自动漏洞检测（VD）方法。它们可以大致分为两类：基于程序分析（PA）的[1，2，7–9，33]和基于机器学习（ML）的[23，29，31]。基于PA的虚拟磁盘技术通常侧重于解决特定类型的漏洞，如缓冲溢出[3]、SQL注入[6]、跨站点脚本[5]、身份验证绕过[4]等。除了这些类型之外，更常见的软件漏洞，例如库/框架的API使用中出现的软件漏洞也以各种形式出现。")]),e._v(" "),t("p",[e._v("为了检测它们，已经利用机器学习（ML）和深度学习（DL）从先前的易受攻击代码中隐式学习漏洞模式[15，20，37]。")]),e._v(" "),t("p",[e._v("尽管有几个优点，但基于ML/DL的VD方法仍然限于仅提供关于整个给定方法是否脆弱的粗粒度检测结果。与基于PA的方法相比，它们无法用检测到的漏洞可能涉及的特定语句详细描述代码行的细粒度细节。可以使用故障定位（FL）技术[16]来定位易受攻击的语句，但它们需要大型、有效的测试套件。由于现有基于ML/DL的VD工具提供了粗略的反馈，开发人员不知道在何处查找和修复代码中的漏洞。这阻碍了他们调查潜在的漏洞。")]),e._v(" "),t("p",[e._v("为了提高基于ML/DL的虚拟磁盘的级别，我们提出了IVDetect，这是一种可解释虚拟磁盘，其理念是使用人工智能检测粗粒度漏洞，同时通过可解释的ML利用Intelligence Assistant提供与漏洞相关的脆弱陈述的细粒度解释。")]),e._v(" "),t("p",[e._v("对于粗粒度漏洞检测，我们的新颖之处在于易受攻击代码的上下文感知表示学习。在训练期间，现有的基于ML/DL的VD方法[20，37]将方法中的整个易受攻击的代码作为输入，而不将易受攻击语句与周围的上下文代码区分开来。这种与易受攻击代码和训练过程中的上下文的区分使IVDetect能够更好地学习区分易受攻击的代码和良性代码。我们通过程序依赖图（PDG）表示源代码，并通过图卷积网络（GCN）[17]将漏洞检测问题视为基于图的分类，具有特征关注（FA），即FA-GCN。易受攻击的语句以及周围的代码在代码表示学习期间被编码")]),e._v(" "),t("p",[e._v("对于细粒度解释，由于IVDetect认为给定方法易受攻击，我们的创新之处在于利用可解释的ML[36]来提供易受攻击语句的解释，作为检测到的漏洞所涉及的PDG的一部分。")]),e._v(" "),t("p",[e._v("选择PDG子图作为解释的理由是，漏洞通常涉及语句之间的数据和控制依赖性[27]。")]),e._v(" "),t("p",[e._v("为了导出易受攻击的语句作为解释，我们利用了可解释的ML模型GNNExplainer[36]，该模型“解释”了模型做出决策的原因。具体而言，在漏洞检测之后，为了产生解释，IVDetect将FA-GCN模型及其决策（是否脆弱）和输入PDG作为输入퐺푀 给定方法的푀. 目标是找到解释子图，其定义为PDG中的最小子图G푀 在使用整个퐺푀 为此，我们利用GNNExplainer[36]，其中G的搜索被公式化为边缘掩码集的学习퐸푀. 这个想法是，如果边缘属于퐸푀 （即，如果从퐺푀 ), 并且模型的决策受到影响，那么边缘是至关重要的，并且必须包括在检测结果的解释中。因此，PDG中的最小子图G包含节点和边，即关键语句和程序依赖性，当决策易受攻击时，这些节点和边与检测到的漏洞最具决定性/相关性。")]),e._v(" "),t("p",[e._v("使用IVDetect的结果，从业者可以1）检查潜在脆弱方法的排名列表，2）使用解释进一步调查代码中导致模型预测该漏洞的语句。")]),e._v(" "),t("p",[e._v("我们进行了几项实验，以评估IVDetect在方法层面的漏洞检测和脆弱性陈述方面的解释。我们使用了三个大型C/C++漏洞数据集："),t("strong",[e._v("Fan[13]、Reveal[11]和FFMPeg+Qemu[37]")]),e._v("。对于方法级别VD，我们的结果表明，IVDetect在两个排名得分nDCG和MAP的前10名中分别以43%–84%和105%–255%的成绩优于现有的基于ML/DL的方法[11，19，20，28，37]。对于语句级别的解释，IVDetect在排名前5的列表中正确指出了67%的案例中与漏洞相关的易受攻击语句。它比基线ATT[36]和GRAD[36]解释模型的准确度分别提高了12.3%-400%和9%-400%。")]),e._v(" "),t("p",[t("strong",[e._v("本文的贡献")]),e._v("包括：A.具有细粒度解释的可解释VD A.具有细粒度分析的漏洞检测：IVDetect是利用可解释ML增强VD的第一种方法，该方法具有与检测到的漏洞相关的PDG子图、语句和依赖项的细粒度细节。")]),e._v(" "),t("p",[e._v("b、 易受攻击代码的上下文感知表示学习：我们对易受攻击的代码的表示学习的新颖之处在于考虑了围绕易受攻击语句的上下文代码，并进行了修复，以更好地训练VD模型。")]),e._v(" "),t("p",[e._v("B、 经验评估。我们的结果表明，IVDetect在检测和解释方面都具有很高的准确性（参见[10]中的数据/结果）。")]),e._v(" "),t("p",[e._v("图1显示了Linux4.6中的方法ec_device_ioctl_xcmd，它为CromeOS设备构造I/O控制命令。这被列为国家漏洞数据库中常见漏洞和暴露（CVE-2016-6156）中的易受攻击代码。")]),e._v(" "),t("p",[e._v("相应修复的提交日志指出在第6行和第13行，驱动程序通过copy_from_user（）通过指针arg获取用户空间数据。第一个获取的值（存储在u_cmd中）（第6行）用于获取in_size和out_size元素，并在第10行分配缓冲区（s_cmd），以便稍后在第13行将整个消息复制到驱动程序，这意味着整个消息的复制大小（s_cmd）基于第一次获取的旧值（u_cmd.outsize）。")]),e._v(" "),t("p",[e._v("此外，在第二次提取时复制的整个消息还包含in_size和out_size元素，它们是新值。第二次获取的新值可能会在竞争条件下被另一个用户线程更改，这将导致在使用不一致的值时出现双重获取错误。")]),e._v(" "),t("p",[e._v("因此，为了修复这个bug，开发人员在第17-21行添加了代码，以确保u_cmd。超大和ucmd。由于两个提取调用之间的竞争条件，insize没有改变。此外，当命令在第23行传输到ChromeOS设备时，内存访问也可能超出阵列边界，导致方法调用cros_ec_cmd_xfer（…）内的缓冲区溢出。")]),e._v(" "),t("p",[e._v("另一个问题是第27行的copy_to_user。方法调用cros_ec_cmd_xfer（…）可以将s_cmd->insize设置为较低的值。因此，必须使用较小的新值来避免向用户复制过多数据：u_cmd。第27行的insize更改为s_cmd->insize。")]),e._v(" "),t("p",[e._v("这种易受攻击的代码可能会造成诸如拒绝服务、缓冲区溢出、程序崩溃等损害。深度学习（DL）的进步使几种方法[20，37]能够从历史中隐式地了解易受攻击代码的模式，并检测更一般的漏洞。然而，与基于程序分析的方法相比，它们在提供关于易受攻击语句的细粒度级别的任何细节以及模型决定该漏洞的原因方面仍然有限。例如，基于PA的方法，例如竞争检测技术，可以潜在地检测第6行和第13行的两个获取语句的参与")]),e._v(" "),t("p",[e._v("因为基于DL的模型易受攻击。但如果没有任何细粒度的细节，开发人员将不知道下一步要调查什么地方和什么。这将使DL模型的输出在VD中不那么具有建设性。此外，定位错误语句的故障定位技术[16]并不能解决问题，因为它需要一个大型有效的测试套件。")]),e._v(" "),t("p",[e._v("关于检测，现有的基于DL的方法[20，37]没有在训练期间充分利用关于易受攻击代码的所有可用信息。例如，在培训期间，我们知道第23行和第27行是易受攻击的/有错误的，并且通过数据/控制依赖关系的其他相关语句为易受攻击行提供上下文信息。然而，现有方法[20，37]没有考虑易受攻击的语句，也没有使用上下文代码来帮助模型区分易受攻击和非易受攻击语句。整个方法将被馈送到DL模型。")]),e._v(" "),t("h3",{attrs:{id:"方法概述和关键思想"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#方法概述和关键思想"}},[e._v("#")]),e._v(" 方法概述和关键思想")]),e._v(" "),t("p",[e._v("我们引入了IVDetect，这是一种基于DL的、可解释的漏洞检测方法，它通过提供易受攻击语句的细粒度解释，超越了对漏洞的判断。具体而言，由于IVDetect认为该方法易受攻击，因此它将提供与检测到的漏洞相关的重要语句列表，作为程序依赖图（PDG）的一部分。例如，它提供了PDG的部分子图，包括图2中第13–15、22–23和25–27行的语句，用于第23行和第27行的易受攻击代码。我们使用PDG子图，其中包括细粒度VD的重要语句，因为它们将向开发人员提供与漏洞相关的程序依赖性的提示，以供进一步调查。")]),e._v(" "),t("p",[e._v("此外，如果我们的模型将代码确定为非易受攻击的，它还可以生成PDG的关键子图，其中包含被认为是安全的关键语句")]),e._v(" "),t("p",[e._v("IVDetect有两个主要模块（图3）：基于图的漏洞检测模型和基于图的解释模型。")]),e._v(" "),t("p",[e._v("输入是项目中所有方法的源代码。输出 是具有检测结果/分数和解释（PDG子图）的方法的排序列表。让我们解释一下我们的主要想法。")]),e._v(" "),t("p",[e._v("2.2.1 基于图的漏洞检测模型（第3节）。如第2.1节所示，漏洞通常表现为多个语句被利用，因此，很自然地将易受攻击的代码捕获为PDG中的子图以及数据流和控制流。")]),e._v(" "),t("p",[e._v("这也有助于开发人员进一步调查这些流中检测到的漏洞。为此，我们通过图形卷积网络（GCN）[17]对漏洞检测建模如下。方法的PDG푀 表示为图形퐺푁 = (푉 , 퐸) 在哪儿푉 是表示语句的一组节点，以及퐸 是表示数据/控制相关性的一组边。功能描述푥푉 对于每个节点푣, 表示节点的属性，例如变量名等푁 × 퐷 特征矩阵푋푀 (푁 : 节点数量和퐷 是输入特征的数量）。让푓 成为语句和方法的标签函数푓 : 푉 → {1, ..., 퐶} 将节点映射到푉 和一个完整的方法퐶 类。在IVDetect中，퐶=脆弱（V）和非脆弱（N V）为2。")]),e._v(" "),t("p",[e._v("对于训练集中（非）易受攻击代码的训练，GCN执行与CNN类似的操作，在那里它通过在PDG子结构上滑动的小过滤器/窗口来学习特征。与CNN的图像数据不同，GCN中节点的邻居是无序的，大小可变。预测方法푀 易受攻击，其PDG퐺푀 具有关联的功能集푋푀 = {푥 푗 |푣 푗 ∈ 퐺푀 } 建造。GCN学习条件分布푃 (푌 |퐺푀, 푋푀), 哪里푌 是表示标签{1。。。，퐶}. 该分布表示图形的概率퐺푀 属于类{1。。。，퐶}, 即。，푀 是否易受攻击（第3节）。")]),e._v(" "),t("p",[e._v("2.2.2弱势陈述与周围环境之间的区别。在培训期间，针对每个易受伤害的陈述푠 在训练数据集中的方法中，我们区分푠 以及周围的上下文语句푠. 上下文由具有数据和/或控件依赖关系的语句组成푠. 这有望帮助我们的模型更好地识别特定环境中出现的易受攻击代码，并更好地区分易受攻击的代码和良性代码。例如，现有方法将图2中方法的整个PDG输入到模型中。IVDetect在第27行识别并学习易受攻击语句的向量表示，同时将具有第27行数据/控制相关性的语句作为上下文：数据相关性上下文（第31、22、13、10和6行）和控制相关性上下文（29、25、23和13行）。")]),e._v(" "),t("p",[e._v("2.2.3 漏洞检测的基于图形的解释模型（第4节）。预测后，IVDetect执行细粒度解释。它同时使用PDG퐺푀 该方法的푀 并且GCN模型作为输入以获得解释。为此，我们利用了可解释的ML技术GNNExplainer[36]。其 目标是获取GCN和特定的输入图퐺푀, 并在퐺푀 这会影响模型的决策。GNNExplainer的想法是，如果删除或更改节点/特征确实影响预测结果，则该节点/特征被认为是必要的，因此必须包含在关键集合中（让我们称之为解释集合）。GNNExplainer搜索子图G푀 中퐺푀 将使用整个图表之间的预测得分差异最小化퐺푀 并使用最小图G푀 （第4节）。因为没有子图G푀 在输入PDG中퐺푀, GCN模型无法决定퐺푀 易受攻击，G푀 被认为是由与检测到的漏洞相关的关键语句和数据/控制依赖性组成的关键PDG子图（如果结果为V）。如果结果是非脆弱性，G푀 可以被认为是PDG中用于模型确定输入方法的安全语句푀 作为良性代码。")]),e._v(" "),t("h4",{attrs:{id:"基于图形的漏洞检测模型"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#基于图形的漏洞检测模型"}},[e._v("#")]),e._v(" 基于图形的漏洞检测模型")]),e._v(" "),t("p",[e._v("本节描述了基于图的漏洞检测模型。我们首先解释了如何为易受攻击的代码构建上下文感知表示学习，然后解释了如何使用FA-GCN将这些学习到的向量用于漏洞检测")]),e._v(" "),t("h4",{attrs:{id:"情境感知表征学习"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#情境感知表征学习"}},[e._v("#")]),e._v(" 情境感知表征学习")]),e._v(" "),t("p",[e._v("让我们介绍一下如何构建代码特征的向量表示。对于语句，我们提取以下类型的特征：3.1.1语句的子标记序列。在词汇层面，我们根据子标记的顺序捕获语句的内容。我们选择子令牌粒度，因为子令牌比源代码中的整个词法令牌更容易重复[24]。我们标记每个语句，只保留变量、方法和类名。使用CamelCase或匈牙利惯例将名称分解为子标记。我们用一个字符移除子标记，以避免噪声的影响。例如，在图4中푆27个被收集并分解为序列：copy、to、user、arg等。然后，我们使用GloVe[26]来构建令牌的向量，以及  门递归单元（GRU）[12]，用于构建子令牌序列的特征向量푆27.已知GloVe能够很好地捕捉令牌之间的语义相似性。选择GRU将向量序列汇总为一个特征向量，用于下一步")]),e._v(" "),t("p",[e._v("3.1.2 语句的代码结构。我们通过AST子树捕获代码结构。在图4中푆27被提取并馈送到树LSTM[32]以将结构捕获到向量中퐹2")]),e._v(" "),t("p",[e._v("3.1.3变量和类型。对于每个节点（即一个语句），我们收集变量的名称及其所在位置的静态类型，并将其分解为子标记。例如，我们收集变量s_cmd及其静态类型cross_ec_command。我们使用与特征1中的子令牌序列相同的向量构建技术，包括GloVe和GRU，以应用于根据变量名称（例如s_cmd）和变量类型（例如cross_ec_command）构建的子令牌的序列。")]),e._v(" "),t("p",[e._v("3.1.4周围环境。在培训期间，为了陈述푠, 我们还对周围的语句进行编码푠, 我们称之为上下文。我们有两个背景。数据和控制依赖上下文包含与当前语句具有此类依赖关系的语句。例如푆27包括第31、22、13、10和6行的语句푆包括第29、25、23和13行的27。")]),e._v(" "),t("p",[e._v("上下文中语句的向量是通过前面描述的GloVe和GRU计算的。因为依赖项的数量可能不同，所以GRU模型输入的长度可能不同。因此，我们使用掩码层应用零填充，允许模型跳过子令牌序列末尾的零。这些零将不包括在培训中。")]),e._v(" "),t("p",[e._v("3.1.5基于注意力的双向GRU。获得所有特征向量后퐹1, 퐹2，…，我们使用双向GRU和注意力层来学习权重向量푊푖 对于每个功能퐹푖, 基于来自该模型的隐藏状态。然后，我们通过将特征的原始向量乘以权重来计算每个特征的加权向量，也就是说，我们有퐹 ′푖 = 푊푖.퐹푖.")]),e._v(" "),t("p",[e._v("最后，我们需要考虑PDG中从属声明对当前声明的影响。其基本原理是，如果PDG中的相邻语句中有一个是脆弱的，那么它们必须对当前语句产生影响。例如，的相邻语句푆PDG中的27包括第6、22、25和29行的语句。因此，我们将它们合并并汇总为最终的特征向量퐹푆27用于声明푆27如下：퐹푆27 = ∑︁ 푖 푊푖퐶표푛푐푎푡 (ℎ(퐹 ′푖 , 푗)) (1) 푊푖 是组合的可训练重量；퐶표푛푐푎푡 是将所有值链接到一个向量中的连接层；ℎ 是将矢量汇总为值的隐藏层；푖 = S6、S22、S25、S27、S29；푗 是特征索引。퐹27与GCN模型一起用于检测")]),e._v(" "),t("h4",{attrs:{id:"vulnerability-detection-with-fa-gcn"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#vulnerability-detection-with-fa-gcn"}},[e._v("#")]),e._v(" Vulnerability Detection with FA-GCN")]),e._v(" "),t("p",[e._v("图5展示了我们如何使用特征注意力GCN模型（FAGCN）[30]进行检测。其基本原理是，FA-GCN可以很好地处理具有稀疏特征（并非所有语句都具有相同的属性）的图，以及PDG中潜在的噪声特征。首先，我们解析方法푀 进入PDG。与CNN在图像上使用过滤器类似，FA-GCN沿着PDG的所有节点（语句）滑动一个小窗口。例如，在图5中，节点标记为A的窗口푆27由自身和相邻语句/节点组成푆6.푆22, 푆25，和푆29.另一个窗口（标有B）用于节点푆23，包括其自身和相邻节点：푆22和푆25.对于每个窗口，FA-GCN在中心生成语句的特征表示矩阵。例如，对于以푆27，它生成特征向量퐹푆27用于푆27，使用图4中说明的过程。")]),e._v(" "),t("p",[e._v("从所有语句的表示向量中，FA-GCN使用连接层将所有这些向量链接到特征矩阵F中푚 用于方法푀. F中的一行푚 对应于PDG中的窗口。")]),e._v(" "),t("p",[e._v("接下来，FA-GCN通过首先计算对称归一化拉普拉斯矩阵来执行卷积运算퐴 [17] ，然后计算卷积以生成表示矩阵푀푚 对于该方法푚. 之后，我们使用CNN模型中的传统步骤：使用空间金字塔池层（将方法表示矩阵标准化为统一大小，并减少其总大小），并将其输出连接到完全连接的层以将矩阵转换为向量푉푚 代表푚. 具有푉푚,")]),e._v(" "),t("p",[e._v("我们通过使用两个隐藏层（控制向量的长度和输出）和softmax函数来执行分类，以产生预测分数푚. 我们使用这些分数作为漏洞分数来对项目中的方法进行排名。决定푚 因为V或N V是通过预测分数上的可训练阈值来完成的[18，20]")]),e._v(" "),t("h4",{attrs:{id:"graph-based-interpretation-model"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#graph-based-interpretation-model"}},[e._v("#")]),e._v(" GRAPH-BASED INTERPRETATION MODEL")]),e._v(" "),t("p",[e._v("让我们解释一下如何使用GNNExplainer[36]来构建基于图形的解释。输入包括经过训练的FA-GCN模型、PDG(퐺푀 ) 该方法的푀, 以及检测结果V或N V和预测分数。图6说明了我们对V（脆弱）情况的处理过程（N V的情况类似）。")]),e._v(" "),t("p",[e._v("要导出解释，关键目标是找到子图G푀 在PDG中퐺푀 该方法的푀 将使用整个图表之间的预测得分差异最小化퐺푀 并使用最小图G푀. 为此，我们使用GNNExplainer和掩蔽技术[36]，该技术处理对最小图G的搜索푀 作为边缘掩码集的学习问题퐸푀 边缘。其理念是学习퐸푀 帮助IVDetect导出解释子图G푀 通过掩蔽边缘퐸푀 从…起퐺푀 （“掩蔽”用˙表示）：G푀 = 퐺푀 ¨ 퐸푀 （2） 图6说明了GNNExplainer的原理。当应用边缘掩码集时，GNNEXplainer检查FA-GCN模型是否产生相同的结果（在这种情况下，结果为V）。如果是，则边缘掩码中的边缘不重要，不包含在G中푀 . 否则，边缘很重要，包含在G中푀. 由于可能的子图和边缘掩码集的数量是不可检测的，GNNExplainer使用了一种边缘掩码的学习方法퐸푀.")]),e._v(" "),t("p",[e._v("让我们正式解释一下GNNEXlainer[36]的工作原理。它通过最大化相互信息（MI）来表述问题在最小图G之间푀 和输入PDG퐺푀 : 最大G푀 푀퐼 (푌, G푀) = 퐻 (푌 ) − 퐻 (푌 |퐺 = G푀) (3) 푌 是FA-GCN模型的结果决定。因此，熵项퐻 (푌 ) 对于训练的FA-GCN模型来说是恒定的。最大化푀퐼 所有G的值푀 相当于最小化条件熵퐻 (푌 |퐺 = G푀), 其通过条件熵的定义可以表示为− E푌 | G푀 [푙표푔푃퐹퐴−퐺퐶푁 (푌 |퐺 = G푀] （4） 这个条件熵公式的意义是衡量结果的不确定性程度푌 当我们知道퐺 = G푀. GNNEXlainer还限制了G的大小푀 通过퐾푀, i、 e.取퐾푀 与预测结果提供最高互信息的边缘푌 . 公式4的直接优化是不可控制的，因此，GNNExplainer将G푀 作为随机图变量G。方程4中的目标变为：minG EG푀 ∼G퐻 (푌 |퐺 = G푀) （5） 最小G퐻 (푌 |퐺 = 例如[G푀]) （6） 从方程5中，我们得到带有Jensen不等式的方程6。方程6中的条件熵可以通过替换EG[G来优化푀] 通过掩蔽优化퐸푀 在输入图上퐺푀. 现在，我们可以把问题归结为学习面具퐸푀.")]),e._v(" "),t("p",[e._v("有关培训的详细信息，请参见[36]。生成的子图G푀 直接用作解释。我们同样可以对非脆弱性结果的情况做出解释。")]),e._v(" "),t("h3",{attrs:{id:"experimental-methodology"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#experimental-methodology"}},[e._v("#")]),e._v(" Experimental Methodology")])])}),[],!1,null,null,null);t.default=a.exports}}]);