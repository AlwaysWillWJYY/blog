---
title: MIT数据库Lab6实验报告
publish: false
---

## 0、介绍

在本实验中，我们将要实现基于日志的中止回滚和崩溃恢复。源码中提供了定义日志格式的代码，并在事务期间的适当时间将记录附加到日志文件中。我们将使用日志文件的内容完成回滚和恢复。

源码中提供的日志代码产生了用于物理上整页undo和redo的记录。当页是首次读入时，代码记住了整页的原始内容做为前置镜像。当事务更新页时，相应的日志记录包含已存储的前置镜像以及修改后的页面做为后置镜像。我们将使用前置镜像在中止期间进行回滚，在recovery期间undo丢失的事务，后置镜像用于在recovery期间redo成功的事务。

我们可以不做整个页面的物理撤销(那么ARIES必须做逻辑撤销)，因为我们正在做页面级别的锁定，并且因为我们没有索引，在撤销时索引的结果可能与最初编写日志时的结构不同。页面级锁定简化事情的原因是，如果一个事务修改了一个页面，那么它一定有一个排他锁，这意味着没有其他事务同时修改它，因此我们可以通过覆盖整个页面来撤销对它的修改。

BufferPool已经实现了通过删除脏页来中止事务，并且通过强制在提交时将脏页刷新至磁盘来假装实现原子提交。日志允许更加灵活的缓冲区管理(STEAL & NO-FORCE)，测试代码会在特定的时机调用`BufferPool.flushAllPages()`方法来验证这种灵活性

## 1、开始

我们必须在lab5代码的基础上实现lab6，我们需要修改现存的部分代码并且添加一些新文件：

我们的代码需要做出如下改变：

1、向`BufferPool.flushPage()`方法中调用`writePage(p)`方法之前的位置插入如下代码，其中p是被写入页的引用：

![在这里插入图片描述](https://img-blog.csdnimg.cn/1c4e21f057f04c489fe2826fd25d0da9.png)

上述代码可以使日志系统向日志中写入更新记录；调用`force()`方法是为了确保在页刷新到磁盘之前日志记录先记录到磁盘中

2、`BufferPool.transactionComplete()`方法为已提交事务污染的每个页调用`flushPage()`方法；对每个脏页，在刷新完成之后添加`p.setBeforeImage()`调用：

当一个更新提交后，页的前置镜像也需要更新，以便稍后中止的事务回滚到次提交的页面版本

(注意：我们不能仅在`flushPage()`方法中调用`setBeforeImage()`方法，因为即使事务没有被提交`flushPage()`方法也可能被调用。测试代码就会做这样的事，如果我们通过调用`flushPages()`来实现`transactionComplete()`方法，那么我们可能需要向`flushPages()`传递额外的参数去告诉这个方法该刷新是用于提交还是未提交的事务。但是，强烈建议在本案例中重写`transactionComplete()`方法直接调用`flushPage()`)

当做完上述代码的修改之后，我们可以进行`LogTest`系统测试，此时我们会发现可以通过其中三个子测试，剩余的测试会失败

如果通过的测试少于这三个子测试的话，说明我们对已有代码的修改并不兼容，我们需要解决这些问题 



## 2、回滚

阅读`LogFile.java`文件中对于日志文件格式描述的注释；我们可以在`LogFile.java`文件中看到一系列函数，例如`logCommit()`，它用于生成各种类型的日志记录并添加到日志中

我们的第一个任务是实现`LogFile.java`的`rollback()`函数。当事务中止时，并且事务释放掉它的锁之前会调用该函数。它的任务就是撤销事务对数据库可能的更改

`rollback()`方法需要读取日志文件，查找所有的与中止事务有关的更新记录，从每条记录中提取前置镜像，并且将前置镜像写入表文件。使用`raf.seek()`在日志文件中进行范围移动，并且使用`raf.readInt()`等方法进行检验。使用`readPageData()`方法读取前置和后置镜像。我们可以使用`tidToFirstLogRecord`映射(从事务id映射到堆文件中的偏移量)确定对于一个特定的事务从哪开始读取日志文件。在将前置镜像写回表文件之前，我们需要丢弃缓冲池中缓存的对应的页

在开发期间，`Logfile.print()`方法对于展示现在的日志内容非常有用

**练习1 LogFile.rollback()**

实现LogFile.rollback()方法

代码编写完成后我们需要通过LogTest系统测试的TestAbort和TestAbortCommitInterleaved子测试

实现代码如下所示：

```java
   public void rollback(TransactionId tid)
        throws NoSuchElementException, IOException {
        synchronized (Database.getBufferPool()) {
            synchronized(this) {
                preAppend();
                // some code goes here
                //获取事务tid对应的日志记录偏移量
                Long offset = tidToFirstLogRecord.get(tid.getId());
                //读取日志记录
                raf.seek(offset);
                Set<PageId> pageIdSet = new HashSet<>();
                while(true){
                    //前置判断,判断raf是否已经遍历到末尾
                    if(raf.getFilePointer() == raf.length()){
                        break;
                    }
                    int type = raf.readInt();
                    long transactionId = raf.readLong();
                    if(transactionId != tid.getId()){
                        continue;
                    }
                    //前置判断,判断日志记录类型是否为包含前置镜像和后置镜像的UPDATE类型
                    if(type == UPDATE_RECORD) {
                        // 读取事务对应页的前置镜像,并根据前置镜像进行回滚
                        Page before = readPageData(raf);
                        Page after = readPageData(raf);
                        //前置镜像id
                        PageId pid = before.getId();
                        // 确保记录的事务id和当前回滚的事务的id相等
                        // 并且该页面此前没有进行过回滚,如果进行过回滚则无需重复回滚
                        if (transactionId == tid.getId() && !pageIdSet.contains(pid)) {
                            pageIdSet.add(pid);
                            //丢弃bufferpool中事务对应的pid
                            Database.getBufferPool().discardPage(pid);
                            //将前置镜像写回表文件
                            Database.getCatalog().getDatabaseFile(pid.getTableId()).writePage(before);
                        }
                    }else if(type == CHECKPOINT_RECORD){
                        int count = raf.readInt();
                        while(count -- > 0){
                            raf.readLong();
                            raf.readLong();
                        }
                    }
                    raf.readLong();
                }
                // 将raf的文件指针指向正确的偏移位置
                raf.seek(raf.length());
            }
        }
    }
```



## 3、恢复

如果数据库崩溃并且重启，在任何新事务开始前会调用`LogFile.recover()`方法。我们的实现必须满足如下条件:

1. 如果有最后一个检查点的话需要读取最后一个检查点
2. 从检查点开始向前扫描日志文件(如果没有检查点则从日志文件开始扫描)以建立失败事务集合。重做已提交事务的更新操作。我们可以放心在检查点开始redo，因为`LogFile.logCheckpoint()`方法将所有的脏页都刷新到磁盘了
3. 撤销失败事务的更新

**练习2 LogFile.recover()**

实现LogFile.recover()方法

完成本次练习后，需要通过LogTest的所有子测试

```java
public void recover() throws IOException {
        synchronized (Database.getBufferPool()) {
            synchronized (this) {
                recoveryUndecided = false;
                // some code goes here
                raf.seek(0);
                //已提交事务的集合
                Set<Long> commitId = new HashSet<>();
                //事务id->前置镜像
                Map<Long, List<Page>> beforePages = new HashMap<>();
                //事务id->后置镜像
                Map<Long, List<Page>> afterPages = new HashMap<>();

                long checkpoint = raf.readLong();
                while(true){
                    //前置判断,判断raf是否已经遍历到末尾
                    if(raf.getFilePointer() == raf.length()){
                        break;
                    }
                    int type = raf.readInt();
                    long transactionId = raf.readLong();
                    if(type == UPDATE_RECORD){
                        Page before = readPageData(raf);
                        Page after = readPageData(raf);
                        List<Page> be = beforePages.getOrDefault(transactionId, new ArrayList<>());
                        be.add(before);
                        beforePages.put(transactionId, be);
                        List<Page> af = afterPages.getOrDefault(transactionId, new ArrayList<>());
                        af.add(after);
                        afterPages.put(transactionId, af);
                    }else if(type == COMMIT_RECORD){
                        commitId.add(transactionId);
                    }else if(type == CHECKPOINT_RECORD){
                        int cnt = raf.readInt();
                        while(cnt -- > 0){
                            raf.readLong();
                            raf.readLong();
                        }
                    }
                    raf.readLong();
                }
                //处理未提交的事务
                for(Long tid : beforePages.keySet()){
                    if(!commitId.contains(tid)){
                        List<Page> pages = beforePages.get(tid);
                        for(Page p : pages){
                            Database.getCatalog().getDatabaseFile(p.getId().getTableId()).writePage(p);
                        }
                    }
                }
                //处理已提交的事务
                for(Long tid : commitId){
                    if(afterPages.containsKey(tid)){
                        List<Page> pages = afterPages.get(tid);
                        for(Page p : pages){
                            Database.getCatalog().getDatabaseFile(p.getId().getTableId()).writePage(p);
                        }
                    }
                }
            }
         }
    }
```

LogTest结果测试:

![在这里插入图片描述](https://img-blog.csdnimg.cn/d036227b71f841e9963cbf8f3e040780.png)

## 总结

lab6完工，日志这部分相对简单一些，照着文档写即可.