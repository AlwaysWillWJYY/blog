---
title: MIT数据库Lab4实验报告
publish: false
---

在本实验中，你将会在SimpleDB中实现简单的基于锁的事务系统。你需要在你代码中合适的地方调用加锁和解锁的方法，以及跟踪每个事务所持有的锁并在需要时向事务授予锁的代码.

本文档的其余部分将描述添加事务支持所涉及的内容，并提供如何将该支持添加到数据库的基本概述.

## 1.开始

我们应该在lab3的基础上来进行本次实验，此外，文档还提供了源码中不存在的测试用例，项目提供的单元测试是为了指导我们的实现，并不是实现正确性的唯一评判标准.

## 2.事务、锁 & 并发控制

在开始之前，我们需要理解什么是事务以及两阶段锁(确保事务的隔离性和原子性)是如何工作的

剩余部分将会简短的介绍这些概念，并讨论他们是如何与SimpleDB关联起来的

### 2.1 事务

事务是一组以原子方式执行的数据库操作(例如插入、删除和读取)，也就是说，要么所有的动作都完成了，要么一个动作都没有完成，而数据库的外部观察者并不清楚这些动作不是作为单个不可分割动作的一部分完成的.

### 2.2 ACID特性

为了理解在SimpleDB中事务管理是如何工作的，接下来简要介绍它是如何满足ACID特性的：

- Atomicity：严格的两阶段锁以及缓冲区管理将确保原子性
- Consistency：通过原子性来保证事务的一致性，在SimpleDB中并未使用其他一致性方法
- Isolation：严格的两阶段提交保证隔离性
- Durability：强制缓冲区管理策略可确保持久性

#### 2.2.1 两阶段锁

通过上述ACID特性可以得知两阶段锁在其中扮演重要的角色，那么首先来了解下什么是两阶段锁。

两阶段锁协议的主要内容如下：

- 在对任何数据进行读、写操作之前，事务首先要获得对该数据的封锁。在对任何数据进行读操作之前要申请获得S锁，在进行写操作之前要申请获得X锁。加锁不成功事务进入等待状态，直到加锁成功才成功继续执行
- 在释放一个封锁之后，事务不在获得任何其他封锁；事务进入解锁阶段，在该阶段进行解锁操作不能再进行加锁操作

两段锁的含义是事务分为两个阶段：

- 第一阶段是获得封锁，称为扩展阶段
- 第二阶段称为释放阶段，也成为收缩阶段

有如下三种两阶段锁：

- Basic 2PL：在事务过程中，分为获得锁和释放锁两个阶段
- Strict 2PL：直到事务结束为止，都不释放获得的锁
- Static 2PL：在事务开始前，获得所需的全部锁

两段封锁法可以这样来实现：事务开始后就处于加锁阶段，一直到执行ROLLBACK和COMMIT之前都是加锁阶段。ROLLBACK和COMMIT使事务进入解锁阶段，即在ROLLBACK和COMMIT模块中DBMS释放所有封锁。



### 2.3 Recovery and Buffer Management

为了简化你的工作，建议实现一个非强制缓冲区管理策略

非强制缓冲区管理策略意味着：

- 如果页面被未提交的事务锁住，你不应该从缓冲池中丢弃脏页(更新脏页)
- 事务提交后，应该强制将脏页刷新至磁盘(这就是强制策略)

为了进一步简化实现，可以假设SimpleDB在处理“transactionComplete”命令时不会崩溃。注意本次实验不需要实现基于日志的崩溃恢复，也不需要撤销(undo)任何工作(不必丢弃脏页)并且也不需要重做(redo)任何工作(在提交时强制更新并且在提交事务期间不会崩溃)



### 2.4 Granting Locks(授予锁)

我们需要添加对SimpleDB的调用(例如在BufferPool中)，以允许调用方代表特定事务请求或释放特定对象上的(共享或独占)锁

我们建议在页面粒度上锁，为了简化测试，不要实现表级锁定(即使可能)，本文档的其余部分和我们的单元测试假设页面级锁定

我们需要创建数据结构来跟踪每个事务持有哪些锁，并检查是否应在请求时向事务授予锁

我们需要实现共享和独占锁，需要的工作如下：

- 在事务进行读操作之前，它必须获得共享锁
- 在事务进行写操作之前，它必须获得排他锁
- 多个事务可以获取同一对象的共享锁
- 只有一个事务能获取对象的排他锁
- 如果事务t是持有对象o共享锁的唯一事务，t能够将持有的对象o的共享锁升级为排他锁(锁升级)

如果事务请求的锁不能立即被授予，你的代码应该锁住，直到锁可用(锁被不同线程的其他事务释放)；在锁实现中要注意争用条件–想想对锁的并发调用会如何影响行为

**练习1**

在BufferPool中编写获取和释放锁的方法，假设使用页面级的锁，需要完成如下几点：

- 修改getPage()方法，在返回页面前阻塞并获取所需的锁
- 实现`unsafeReleasePage()`方法，该方法主要用于测试
- 实现`holdsLock()`方法，使练习2能确定页面是否已经被事务锁住

定义一个代表事务和锁状态的LockManager类将会非常有用，但是如何设计这样一个类取决于我们自己

实现下一个练习之后，才能通过LockingTest单元测试

```java
package simpledb.storage.lock;
import simpledb.transaction.TransactionId;


public class PageLock {
    /**
     * 共享锁
     */
    public static final int SHARE = 0;
    /**
     * 排它锁
     */
    public static final int EXCLUSIVE = 1;
    /**
     * 锁类型
     */
    private int type;
    /**
     * 事务ID
     */
    private TransactionId transactionId;

    public PageLock(int type, TransactionId transactionId){
        this.type = type;
        this.transactionId = transactionId;
    }

    @Override
    public String toString() {
        return "PageLock{" +
                "type=" + type +
                ", transactionId=" + transactionId +
                '}';
    }

    public int getType() {
        return type;
    }

    public void setType(int type) {
        this.type = type;
    }

    public TransactionId getTransactionId() {
        return transactionId;
    }

    public void setTransactionId(TransactionId transactionId) {
        this.transactionId = transactionId;
    }

}





package simpledb.storage.lock;

import simpledb.storage.PageId;
import simpledb.transaction.TransactionAbortedException;
import simpledb.transaction.TransactionId;

import java.util.Map;
import java.util.Set;
import java.util.concurrent.ConcurrentHashMap;

public class LockManager {
    private Map<PageId, Map<TransactionId, PageLock>> pageLockMap;

    public LockManager() {
        pageLockMap = new ConcurrentHashMap<>();
    }


    /**
     * 实现的功能申请锁，释放锁，查看指定页的指定事务是否持有锁
     * 思路：
     * 锁管理器中没有任何锁或者该页面没有被任何事务加锁，可以直接加读/写锁；
     * 如果t在页面有锁，分情况讨论
     * 1.加的读锁，直接加锁
     * 2.加的写锁，如果锁数量为1，进行锁升级，锁量大于1，会死锁，异常中断
     * t在页面无锁，分情况讨论
     * 3.加的读锁，锁数量为1，这个锁是读锁则可以加，是写锁就wait；锁数量大于1，说明很多读锁，直接加
     * 4.加的是写锁，不管多个读锁还是一个写锁，都wait
     */

    public synchronized boolean acquireLock(PageId pageId, TransactionId tid, int acquireType) throws TransactionAbortedException, InterruptedException {
        final String lockType = acquireType == 0 ? "read lock" : "write lock";
        final String threadName = Thread.currentThread().getName();

        Map<TransactionId, PageLock> lockMap = pageLockMap.get(pageId);
        if (lockMap == null || lockMap.size() == 0) {
            PageLock pageLock = new PageLock(acquireType, tid);
            lockMap = new ConcurrentHashMap<>();
            lockMap.put(tid, pageLock);
            pageLockMap.put(pageId, lockMap);
            System.out.println(threadName + ": the" + pageId + "have no lock, transaction " + tid + " require" + lockType + " success");
            return true;
        }
        PageLock lock = lockMap.get(tid);
        if (lock != null) {
            if (acquireType == PageLock.SHARE) {
                System.out.println(threadName + ": the" + pageId + "have read lock with the same tid, transaction " + tid + " require" + lockType + " success");
                return true;
            }
            if (acquireType == PageLock.EXCLUSIVE) {
                if (lockMap.size() > 1) {
                    System.out.println(threadName + ": the" + pageId + "have many read locks, transaction " + tid + " require" + lockType + " fail");
                    throw new TransactionAbortedException();
                }
                if (lockMap.size() == 1 && lock.getType() == PageLock.EXCLUSIVE) {
                    System.out.println(threadName + ": the" + pageId + "have write lock with the same tid, transaction " + tid + " require" + lockType + " success");
                    return true;
                }
                if (lockMap.size() == 1 && lock.getType() == PageLock.SHARE) {
                    lock.setType(PageLock.EXCLUSIVE);
                    lockMap.put(tid, lock);
                    pageLockMap.put(pageId, lockMap);
                    System.out.println(threadName + ": the" + pageId + "have read lock with the same tid, transaction " + tid + " require" + lockType + " success and upgrade");
                    return true;
                }
            }
        }
        if (lock == null) {
            if (acquireType == PageLock.SHARE) {
                if (lockMap.size() > 1) {
                    PageLock pageLock = new PageLock(acquireType, tid);
                    lockMap.put(tid, pageLock);
                    pageLockMap.put(pageId, lockMap);
                    System.out.println(threadName + ": the" + pageId + "have many read locks, transaction " + tid + " require" + lockType + " success");
                    return true;
                }

                PageLock lo = null;
                for (PageLock p : lockMap.values()) {
                    lo = p;
                }
                if (lockMap.size() == 1 && lo.getType() == PageLock.SHARE) {
                    PageLock pageLock = new PageLock(acquireType, tid);
                    lockMap.put(tid, pageLock);
                    pageLockMap.put(pageId, lockMap);
                    System.out.println(threadName + ": the" + pageId + "have one lock with different tid, transaction " + tid + " require" + lockType + " success");
                    return true;
                }
                if (lockMap.size() == 1 && lo.getType() == PageLock.EXCLUSIVE) {
                    wait(50);
                    return false;
                }
            }
            if (acquireType == PageLock.EXCLUSIVE) {
                wait(10);
                return false;
            }
        }
        return true;

    }

    /**
     * 释放指定页面的指定事务的锁
     */
    public synchronized void releaseLock(PageId pageId, TransactionId tid) {
        final String threadName = Thread.currentThread().getName();

        Map<TransactionId, PageLock> lockMap = pageLockMap.get(pageId);
        if (lockMap == null) {
            return;
        }
        if (tid == null) {
            return;
        }
        PageLock pageLock = lockMap.get(tid);
        if (pageLock == null) return;
        final String lockType = lockMap.get(tid).getType() == 0 ? "读锁" : "写锁";

        lockMap.remove(tid);
        System.out.println(threadName + " release " + lockType + " in " + pageId + ", the tid lock size is " + lockMap.size());
        if (lockMap.size() == 0) {
            pageLockMap.remove(pageId);
            System.out.println(threadName + "release last lock, the page " + pageId + " have no lock, the page locks size is " + pageLockMap.size());
        }
        this.notifyAll();
    }

    /**
     * 判断事务是否持有对应页的锁
     */
    public synchronized boolean isHoldLock(PageId pageId, TransactionId tid) {
        Map<TransactionId, PageLock> lockMap = pageLockMap.get(pageId);
        if (lockMap == null) {
            return false;
        }
        return lockMap.get(tid) != null;
    }

    /**
     * 释放事务对所有页面的锁
     */
    public synchronized void completeTransaction(TransactionId tid) {
        Set<PageId> set = pageLockMap.keySet();
        for (PageId p : set) {
            releaseLock(p, tid);
        }
    }


}
```

```java
package simpledb.storage;

import simpledb.common.*;
import simpledb.storage.evict.EvictStrategy;
import simpledb.storage.evict.LRUEvict;
import simpledb.storage.lock.LockManager;
import simpledb.transaction.TransactionAbortedException;
import simpledb.transaction.TransactionId;

import java.io.*;

import java.util.List;
import java.util.Map;
import java.util.Random;
import java.util.concurrent.ConcurrentHashMap;

/**
 * BufferPool manages the reading and writing of pages into memory from
 * disk. Access methods call into it to retrieve pages, and it fetches
 * pages from the appropriate location.
 * <p>
 * The BufferPool is also responsible for locking;  when a transaction fetches
 * a page, BufferPool checks that the transaction has the appropriate
 * locks to read/write the page.
 *
 * @Threadsafe, all fields are final
 */
public class BufferPool {
    /** Bytes per page, including header. */
    private static final int DEFAULT_PAGE_SIZE = 4096;

    private static int pageSize = DEFAULT_PAGE_SIZE;

    /** Default number of pages passed to the constructor. This is used by
     other classes. BufferPool should use the numPages argument to the
     constructor instead. */
    public static final int DEFAULT_PAGES = 50;

    private Integer numPages;
    private Map<PageId, Page> pageCache;
    private EvictStrategy evict;

    private LockManager lockManager;


    /**
     * Creates a BufferPool that caches up to numPages pages.
     *
     * @param numPages maximum number of pages in this buffer pool.
     */
    public BufferPool(int numPages) {
        // some code goes here
        this.numPages = numPages;
        this.pageCache = new ConcurrentHashMap<>();
        this.evict = new LRUEvict(numPages);
        this.lockManager = new LockManager();
    }

    public static int getPageSize() {
        return pageSize;
    }

    // THIS FUNCTION SHOULD ONLY BE USED FOR TESTING!!
    public static void setPageSize(int pageSize) {
        BufferPool.pageSize = pageSize;
    }

    // THIS FUNCTION SHOULD ONLY BE USED FOR TESTING!!
    public static void resetPageSize() {
        BufferPool.pageSize = DEFAULT_PAGE_SIZE;
    }

    /**
     * Retrieve the specified page with the associated permissions.
     * Will acquire a lock and may block if that lock is held by another
     * transaction.
     * <p>
     * The retrieved page should be looked up in the buffer pool.  If it
     * is present, it should be returned.  If it is not present, it should
     * be added to the buffer pool and returned.  If there is insufficient
     * space in the buffer pool, a page should be evicted and the new page
     * should be added in its place.
     *
     * @param tid the ID of the transaction requesting the page
     * @param pid the ID of the requested page
     * @param perm the requested permissions on the page
     */
    public synchronized Page getPage(TransactionId tid, PageId pid, Permissions perm)
            throws TransactionAbortedException, DbException {
        // some code goes here
        int acquireType = 0;
        if(perm == Permissions.READ_WRITE){
            acquireType = 1;
        }
        long start = System.currentTimeMillis();
        long timeout = new Random().nextInt(2000) + 1000;
        while(true){
            try {
                if(lockManager.acquireLock(pid, tid, acquireType)){
                    break;
                }
            } catch (InterruptedException e) {
                throw new RuntimeException(e);
            }
            long now = System.currentTimeMillis();
            if(now - start > timeout){
                throw new TransactionAbortedException();
            }
        }
        if (!pageCache.containsKey(pid)) {
            DbFile dbFile = Database.getCatalog().getDatabaseFile(pid.getTableId());
            Page page = dbFile.readPage(pid);
            evict.modifyData(pid);
            if (pageCache.size() == numPages) {
                evictPage();
            }
            pageCache.put(pid, page);
        }
        return pageCache.get(pid);
    }

    /**
     * Releases the lock on a page.
     * Calling this is very risky, and may result in wrong behavior. Think hard
     * about who needs to call this and why, and why they can run the risk of
     * calling it.
     *
     * @param tid the ID of the transaction requesting the unlock
     * @param pid the ID of the page to unlock
     */
    public  void unsafeReleasePage(TransactionId tid, PageId pid) {
        // some code goes here
        // not necessary for lab1|lab2
        lockManager.releaseLock(pid, tid);
    }

    /**
     * Release all locks associated with a given transaction.
     *
     * @param tid the ID of the transaction requesting the unlock
     */
    public void transactionComplete(TransactionId tid) {
        // some code goes here
        // not necessary for lab1|lab2
        lockManager.completeTransaction(tid);
        transactionComplete(tid, true);
    }


    /** Return true if the specified transaction has a lock on the specified page */
    public boolean holdsLock(TransactionId tid, PageId p) {
        // some code goes here
        // not necessary for lab1|lab2
        return lockManager.isHoldLock(p, tid);
    }

    /**
     * Commit or abort a given transaction; release all locks associated to
     * the transaction.
     *
     * @param tid the ID of the transaction requesting the unlock
     * @param commit a flag indicating whether we should commit or abort
     */
    public void transactionComplete(TransactionId tid, boolean commit) {
        // some code goes here
        // not necessary for lab1|lab2
        if(commit){
            try {
                flushPages(tid);
            } catch (IOException e) {
                e.printStackTrace();
            }
        }else{
            //从磁盘重新加载页
            recoverPages(tid);
        }
        lockManager.completeTransaction(tid);
    }

    private synchronized void recoverPages(TransactionId tid) {
        for(Map.Entry<PageId, Page> m : pageCache.entrySet()){
            PageId pageId = m.getKey();
            Page page = m.getValue();
            if(page.isDirty() == tid){
                int tableId = pageId.getTableId();
                DbFile dbFile = Database.getCatalog().getDatabaseFile(tableId);
                Page cleanPage = dbFile.readPage(pageId);
                pageCache.put(pageId, cleanPage);
            }
        }
    }

    /**
     * Add a tuple to the specified table on behalf of transaction tid.  Will
     * acquire a write lock on the page the tuple is added to and any other
     * pages that are updated (Lock acquisition is not needed for lab2).
     * May block if the lock(s) cannot be acquired.
     *
     * Marks any pages that were dirtied by the operation as dirty by calling
     * their markDirty bit, and adds versions of any pages that have
     * been dirtied to the cache (replacing any existing versions of those pages) so
     * that future requests see up-to-date pages.
     *
     * @param tid the transaction adding the tuple
     * @param tableId the table to add the tuple to
     * @param t the tuple to add
     */
    public void insertTuple(TransactionId tid, int tableId, Tuple t)
            throws DbException, IOException, TransactionAbortedException {
        // some code goes here
        // not necessary for lab1
        DbFile dbFile = Database.getCatalog().getDatabaseFile(tableId);
        updateBufferPool(dbFile.insertTuple(tid, t), tid);
    }

    /**
     * Remove the specified tuple from the buffer pool.
     * Will acquire a write lock on the page the tuple is removed from and any
     * other pages that are updated. May block if the lock(s) cannot be acquired.
     *
     * Marks any pages that were dirtied by the operation as dirty by calling
     * their markDirty bit, and adds versions of any pages that have
     * been dirtied to the cache (replacing any existing versions of those pages) so
     * that future requests see up-to-date pages.
     *
     * @param tid the transaction deleting the tuple.
     * @param t the tuple to delete
     */
    public  void deleteTuple(TransactionId tid, Tuple t)
            throws DbException, IOException, TransactionAbortedException {
        // some code goes here
        // not necessary for lab1
        DbFile dbFile = Database.getCatalog().getDatabaseFile(t.getRecordId().getPageId().getTableId());
        updateBufferPool(dbFile.deleteTuple(tid, t), tid);
    }

    private void updateBufferPool(List<Page> pages, TransactionId tid) throws DbException {
        for (Page page : pages) {
            page.markDirty(true, tid);
            if (pageCache.size() == numPages) {
                evictPage();
            }
            pageCache.put(page.getId(), page);
        }
    }
    /**
     * Flush all dirty pages to disk.
     * NB: Be careful using this routine -- it writes dirty data to disk so will
     *     break simpledb if running in NO STEAL mode.
     */
    public synchronized void flushAllPages() throws IOException {
        // some code goes here
        // not necessary for lab1
        for (Map.Entry<PageId, Page> entry : pageCache.entrySet()) {
            Page page = entry.getValue();
            if (page.isDirty() != null) {
                flushPage(page.getId());
            }
        }
    }

    /** Remove the specific page id from the buffer pool.
     Needed by the recovery manager to ensure that the
     buffer pool doesn't keep a rolled back page in its
     cache.

     Also used by B+ tree files to ensure that deleted pages
     are removed from the cache so they can be reused safely
     */
    public synchronized void discardPage(PageId pid) {
        // some code goes here
        // not necessary for lab1
        pageCache.remove(pid);
    }

    /**
     * Flushes a certain page to disk
     * @param pid an ID indicating the page to flush
     */
    private synchronized  void flushPage(PageId pid) throws IOException {
        // some code goes here
        // not necessary for lab1
        Page flush = pageCache.get(pid);

        // 通过tableId找到对应的DbFile,并将page写入到对应的DbFile中
        int tableId = pid.getTableId();
        DbFile dbFile = Database.getCatalog().getDatabaseFile(tableId);

        TransactionId dirtier = flush.isDirty();
        if (dirtier != null) {
            Database.getLogFile().logWrite(dirtier, flush.getBeforeImage(), flush);
            //调用force()方法是为了确保在页刷新到磁盘之前日志记录先记录到磁盘中
            Database.getLogFile().force();
        }
        // 将page刷新到磁盘
        dbFile.writePage(flush);
        flush.markDirty(false, null);
    }

    /** Write all pages of the specified transaction to disk.
     */
    public synchronized  void flushPages(TransactionId tid) throws IOException {
        // some code goes here
        // not necessary for lab1|lab2
        for (Map.Entry<PageId, Page> entry : pageCache.entrySet()) {
            Page page = entry.getValue();
            page.setBeforeImage();
            if (page.isDirty() == tid) {
                flushPage(page.getId());
            }
        }
    }

    /**
     * Discards a page from the buffer pool.
     * Flushes the page to disk to ensure dirty pages are updated on disk.
     */
    private synchronized  void evictPage() throws DbException {
        // some code goes here
        // not necessary for lab1
        PageId evictPageId = null;
        Page page = null;
        boolean isAllDirty = true;
        for (int i = 0; i < pageCache.size(); i++) {
            evictPageId = evict.getEvictPageId();
            page = pageCache.get(evictPageId);
            if (page.isDirty() != null) {
                evict.modifyData(evictPageId);
            } else {
                isAllDirty = false;
                discardPage(evictPageId);
                break;
            }
        }
        if (isAllDirty) {
            throw new DbException("failed to evict page: all pages are either dirty");
        }
    }

}
```

### 2.5 Lock Lifetime

我们需要实现严格的两阶段锁。这意味着事务需要在访问对象前需要获取该对象的合适类型的锁，并且直到事务提交后才能释放对应的锁

幸运的是，SimpleDB设计使得在读取或修改BufferPool.getPage()中的页面之前，可以获取这些页面上的锁。因此，我们建议在getPage()中获取锁，而不是在每个操作符中添加对锁定例程的调用。依赖你的实现，你在其他任何地方可能都不需要获取锁。

读取某页前，需要获取页面的共享锁；写入某页前，需要获取页面的互斥锁。我们可以发现在getPage()方法中，已经通过Permissions对象来确定对页的操作类型；Permission对象也表明了当我们访问对象前需要获取哪种类型的锁

HeapFile.insertTuple()、HeapFile.deleteTuple()、HeapFile.iterator()方法需要通过BufferPool.getPage()方法访问页，检查这些调用getPage方法的地方是否使用了正确的Permission对象来指明访问类型。此外，还需要仔细检查BufferPool.insertTuple()和BufferPool.deleteTuple()的实现是否在它们访问的任何页面上调用mardDirty()

当获得锁之后，还要考虑何时释放他们。很明显，我们应该在事务提交或中止后释放与它相关联的所有锁，以确保严格的2PL。但是，在其他情况下，在事务结束之前释放锁可能会很有用。例如，我们可以在扫描页面以查找空槽后释放页面上的共享锁.

**练习2**

确保在整个SimpleDB中获取并释放锁，我们应该验证某些操作是否正常工作： 

* 通过SeqScan从页面读取元素期间(如果你在BufferPool.getPage()实现了锁，只要HeapFile.iterator()调用BufferPool.getPage()，这就可以正常工作) 

![在这里插入图片描述](https://img-blog.csdnimg.cn/5b2f440e2fee4f2d902f306bda2be18b.png)

* 通过BufferPool和HeapFile方法插入和删除元组(如果你在BufferPool.getPage()实现了锁，只要HeapFile.insertTuple()和HeapFile.deleteTuple()调用BufferPool.getPage()，这就能正常工作)

![在这里插入图片描述](https://img-blog.csdnimg.cn/ac567be2242c4b0b90fe973f9c0d33b2.png)

 在以下情况下还要认真考虑锁的获取和释放： 

- 向HeapFile中添加新页，何时将该页刷新到磁盘？是否存在与其他事务(在其他线程上)的争用条件，这些事务可能需要在HeapFile级别特别注意，而不考虑页面级别的锁定？
- 寻找可以插入元组的空槽；许多实现扫描页面以寻找空槽，并且需要READ_ONLY锁来协助完成这件事。但是，如果一个事务t在页p上找不到空槽，事务t应该立即释放页p的锁。虽然这显然与两阶段锁定的规则相矛盾，但这是可以的，因为事务t没有使用页面中的任何数据，因为更新p的并发事务t不可能影响t的答案或者结果

![在这里插入图片描述](https://img-blog.csdnimg.cn/e85af90d875a4684bbcca6c0debfa7f4.png)

 此时，我们的代码应该通过LockingTest中的单元测试 

### 2.6 Implementing NO STEAL

事务的修改仅在提交后写入磁盘，这意味着我们可以通过丢弃脏页并再次从磁盘读取的方式来中止事务。因此，我们不能丢弃脏页。这个策略被称为NO STEAL

我们需要修改BufferPool中的evictPage方法；尤其是，它不能丢弃脏页。如果我们之前实现的驱逐策略倾向于使用脏页进行驱逐，则必须找到一种方法来逐出另一页。如果缓冲池中的所有页均为脏页，那应该抛出DbException异常。如果驱逐策略驱逐一个干净的页面，请注意任何锁事务可能已经保留在逐出的页面上，并在实现中适当地处理它们.

**练习3**

在BufferPool的evictPage方法中实现页面丢弃的必要逻辑而不是丢弃脏页 

![在这里插入图片描述](https://img-blog.csdnimg.cn/9f0c2362382a4474bfb04a01cbb0822c.png)

### 2.7 事务

在SimpleDB中，TransactionId对象在每个查询的开始被创建，该对象被传递到查询关联的每个操作中。当查询完成时，会调用BufferPool中的transactionComplete方法

通过参数commit指定事务提交还是中止。在它执行期间，一个操作可能抛出TransactionAbortedException异常，这代表发生了内部错误或者发生了死锁。源码中提供的测试用例创造了何时的TransactionId对象，并以合适的方式将它们传递给我们的操作，当查询结束时会调用transactionComplete方法，源码中已经实现了TransactionId.

**练习4**

实现BufferPool中的transactionComplete()方法。注意这里有两个版本的transactionComplete方法，其中一个方法接收commit参数，另一个方法不接收该参数。不存在commit参数版本的方法应该总是提交的，所以可以直接调用transactionComplete(tid, true)

当我们提交事务时，我们应该将事务关联的所有脏页刷新到磁盘；当我们中止事务时，应通过将页面恢复到其磁盘上状态来还原事务所做的任何更改

当事务提交或者终止时，应该释放BufferPool中保留的关于事务的任何状态，包括释放事务持有的任何锁.

```java
public void transactionComplete(TransactionId tid) {
        // some code goes here
        // not necessary for lab1|lab2
        lockManager.completeTransaction(tid);
        transactionComplete(tid, true);
    }


    /** Return true if the specified transaction has a lock on the specified page */
    public boolean holdsLock(TransactionId tid, PageId p) {
        // some code goes here
        // not necessary for lab1|lab2
        return lockManager.isHoldLock(p, tid);
    }

    /**
     * Commit or abort a given transaction; release all locks associated to
     * the transaction.
     *
     * @param tid the ID of the transaction requesting the unlock
     * @param commit a flag indicating whether we should commit or abort
     */
    public void transactionComplete(TransactionId tid, boolean commit) {
        // some code goes here
        // not necessary for lab1|lab2
        if(commit){
            try {
                flushPages(tid);
            } catch (IOException e) {
                e.printStackTrace();
            }
        }else{
            //从磁盘重新加载页
            recoverPages(tid);
        }
        lockManager.completeTransaction(tid);
    }

    private synchronized void recoverPages(TransactionId tid) {
        for(Map.Entry<PageId, Page> m : pageCache.entrySet()){
            PageId pageId = m.getKey();
            Page page = m.getValue();
            if(page.isDirty() == tid){
                int tableId = pageId.getTableId();
                DbFile dbFile = Database.getCatalog().getDatabaseFile(tableId);
                Page cleanPage = dbFile.readPage(pageId);
                pageCache.put(pageId, cleanPage);
            }
        }
    }
 private synchronized  void flushPage(PageId pid) throws IOException {
        // some code goes here
        // not necessary for lab1
        Page flush = pageCache.get(pid);

        // 通过tableId找到对应的DbFile,并将page写入到对应的DbFile中
        int tableId = pid.getTableId();
        DbFile dbFile = Database.getCatalog().getDatabaseFile(tableId);

        TransactionId dirtier = flush.isDirty();
        if (dirtier != null) {
            Database.getLogFile().logWrite(dirtier, flush.getBeforeImage(), flush);
            //调用force()方法是为了确保在页刷新到磁盘之前日志记录先记录到磁盘中
            Database.getLogFile().force();
        }
        // 将page刷新到磁盘
        dbFile.writePage(flush);
        flush.markDirty(false, null);
    }

    /** Write all pages of the specified transaction to disk.
     */
    public synchronized  void flushPages(TransactionId tid) throws IOException {
        // some code goes here
        // not necessary for lab1|lab2
        for (Map.Entry<PageId, Page> entry : pageCache.entrySet()) {
            Page page = entry.getValue();
            page.setBeforeImage();
            if (page.isDirty() == tid) {
                flushPage(page.getId());
            }
        }
    }
```

 此时，我们的代码应该通过TransactionTest单元测试和AbortEvictionTest系统测试。TransactionTest系统测试很有说明性，但是在完成下一个练习之前，它可能会失败 

![在这里插入图片描述](https://img-blog.csdnimg.cn/f583cbb2213f4c219bea3411929fa6ba.png)

### 2.8 死锁和中止

在SimpleDB中，事务很可能发生死锁(如果你不理解原因，推荐阅读关于死锁的文章)，所以我们需要检测死锁并抛出TransactionAbortedException异常

有很多死锁检测的方法，例如，实现一个简单的超时策略，如果事务在给定时间段后还没有完成，它将中止事务。对于真实的场景，我们可以在依赖关系图数据结构中实现循环检测。在这个方案中，我们将定期或每当尝试授予新锁时检查依赖关系图中的周期，如果存在周期，则中止某些操作。如果检测到死锁的存在，我们必须解决死锁。假设当事务t等待锁时检测到死锁的存在，中止t正在等待的所有事务；这可能导致大量工作被撤销，但可以保证t会取得进展。或者，我们可以中止t，以使其他事务有机会取得进展。这意味最终用户必须重试事务t。

另一种方法是使用事务的全局排序来避免构建等待图；出于性能原因，这有时是首选方案，但在此方案下，可能已成功的事务会被错误中止。例如WAIT-DIE和WOUND-WAIT方案.

**练习5**

在BufferPool.java中实现死锁的检测和预防，对于死锁处理系统，有许多设计方案，但不必做一些非常复杂的事。我们希望能为每个事务实现一个比简单超时策略更好的死锁检测算法。一个很好的起点是在每个锁请求之前在等待图中实现循环检测。

我们可以选择自己的实现方案，并列举它与备选方案相比的优缺点

我们必须确保当死锁发生时我们的代码可以通过抛出TransactionAbortedException异常以正确地中止事务。执行事务的代码将捕获此异常，它应在事务结束后调用transactionComplete进行清理。我们不需要自动重启由于死锁而失败的事务-可以假设更高级别的代码会处理这个问题。

源码中已经提供了一些测试：DeadlockTest.java；它们实际上优点复杂，所以运行它们可能需要几秒钟以上(取决于具体的实现策略)。如果它们被长时间挂起，那么我们的代码可能并没有解决死锁问题。这些测试构造了代码应该能够逃脱的简单死锁情况。

注意，DeadlockTest.java顶部有两个计时参数，这些参数确定测试检查是否已获取锁的频率，以及重启中止事务之前的等待时间。如果使用基于超时的检测方法，则可以通过调整这些参数来观察不同的性能特征。测试将向控制台输出已解决死锁对应的TransactionAbortedException

代码应该通过TransactionTest系统测试(该测试可能也会运行很长一段时间)

此时，SimpleDB成为了一个可恢复的数据库，也就是说，如果数据库系统崩溃(在transactionComplete以外的点)，或者如果用户显式中止事务，则在系统重启(或事务中止)后，任何正在运行的事务的效果都将不可见，可通过运行一些事务并显式中止数据库服务器来验证这一点

这里通过超时策略实现了死锁的检测：

![在这里插入图片描述](https://img-blog.csdnimg.cn/1ce62316842a4748bfdd90ff16e8d27a.png)

## 总结

lab4难度感觉有些大，参考的很多资料，接下来希望可以用依赖图检测死锁.