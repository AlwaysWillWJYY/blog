---
title: 分布式系统lab1
date: 2022-10-04
publish: false
---



[Go语言进阶语法](http://c.biancheng.net/view/9.html)

[Go语言API]( https://studygolang.com/pkgdoc )

[实验储备知识](https://mit-public-courses-cn-translatio.gitbook.io/mit6-824/lecture-01-introduction)

[实验参考文档](https://pdos.csail.mit.edu/6.824/labs/lab-mr.html)

[仓库地址](https://gitee.com/xjyzj/6.824)

## 开始实验

* 实验中省略了分割文件的操作，实验中一个文件是一个Map任务；
* 实验中的Coordinator对应图中的Master，Worker对应Worker；
* 实验中不同的进程代表不同的角色，所有进程共享本地文件系统。当然，如果想在不同机器上执行不同的进程，可借助分布式文件系统进行文件的同步；
* 注意需要考虑进程Crash的情况，如果一个任务超过10秒还没完成，则认为该任务失败了，则此任务会被重新分配给别的Worker；
* 为了区分任务是否真正的完成，Map和Reduce的处理结果会被保存在文件tmp-xxx中，当Coordinator确认该任务属于该Worker时，才会重命名将其变为最终结果文件；





## 结果

![在这里插入图片描述](https://img-blog.csdnimg.cn/d8684947aaf1410ebd89fab579307a74.png)