---
title: MIT数据库Lab5实验报告
publish: false
---

## 0 介绍

在本实验中，我们将会实现B+树索引用于高效查询和范围扫描。源码中已经提供了基本的树结构，我们需要实现检索、页分裂、在页面之间重新分配元组以及合并页

B+树的内部节点拥有多条记录，每个节点的内容包括节点当前值、以及左右子树的指针；相邻键之间共享一个孩子指针，所以拥有m个键的内部节点通常拥有m+1个孩子指针。叶子节点可以包括数据记录或者指向其他数据库文件的指针。为了简单起见，我们实现的B+树的叶子节点只包括数据记录。相邻的叶子页通过左右同级指针链接在一起，因此范围扫描只需要通过根节点和内部节点进行一次初始搜索即可找到第一个叶子页，后续叶子页通过右(或者左)指针找到。

## 1、开始

我们应该在lab4的基础上开始本次实验代码的编写，此外，报告中还为本次实验提供了额外的源码和测试文件 。

## 2、搜索

查看index目录下的BTreeFile.java文件，这是实现B+树的核心文件，你将会在该文件为本次实验编写所有代码。不像HeapFile，BTreeFile包含四种不同的页。正如你期望的那样，树的结点有两种不同类型的页面：叶子节点和非叶子节点。非叶子节点在BTreeInternalPage.java中实现，叶子节点在BTreeLeafPage.java中实现。为了方便起见，BTreePage.java中已经创建了包含叶子节点和非叶子结点共同特性的抽象类。此外，header pages在BTreeHeaderPage.java中实现并且追踪文件中的哪个页面是被使用的。最后，在每个BTreeFile开始都有一个指向树的根页和第一个header page的页；该单独的页在BTreeRootPtrPage.java中被实现。熟悉这些类的接口，尤其是BTreePage、BTreeInternalPage和BTreeLeafPage。在实现B+树的过程中需要使用它们

我们的第一个任务就是实现BTreeFile.java中的findLeafPage()函数，该函数通过给定的键查找合适的叶子页，主要用于搜索和插入。例如，假设我们提供了包含两个叶子页的B+树(如图1所示)，根节点是一个包含一个键和两个孩子结点指针的内部结点。给定键值1，该函数应该返回第一个叶子结点；同样地，给定键值8，该函数应该返回第二个结点。不太明显的情况是，我们给定键值6，可能存在重复的键，因此两个页结点上可能都包含键6对应的元组。在这种情况下，函数应该返回第一个叶子节点。

![在这里插入图片描述](https://img-blog.csdnimg.cn/fd0c29299fd7440e9f7bed5f84dfa1c2.png)

 													带有重复键的B+树 

我们实现的findLeafPage()函数应该递归的搜索内部节点，直到它到达给定键值对应的叶子页。为了在每阶段找到合适的叶子页，我们应该迭代遍历内部节点的记录斌给比较记录与给定的键值的大小，以确定下一步往哪个方向走。`BTreeInternalPage.iterator（）`使用在`BTreeEntry.java`中定义的接口提供对内部页面中条目的访问。该迭代器允许我们遍历内部节点的键值，并且访问每个键的左右孩子页指针。当传入的BTreePageId的pgcateg()方法返回值与BTreePageId.LEAF相等时，表明这是一个叶子页。在这种情况下，我们仅需要从缓冲池中获取该页并返回它即可，不需要确保它实际上包含提供的键值f

当提供的键值是null时，findLeafPage()方法必须处理这种情况。如果给定的值是空的，那么在递归的过程中就遍历最左侧的孩子节点，最终返回最左侧的叶子页。查找最左侧的叶子也对于扫描记录文件非常有用。当查找到正确的叶子页时，我们应该返回它。正如上面提到的那样，我们可以通过pgcateg()方法检查叶子也的类型。我们可以假设只有叶子页和内部节点才会被传递给该函数

与其直接调用BufferPool.getPage()方法来获取每个内部页面和叶子页，建议调用代码中的包装函数BTreeFile.getPage()。它像BufferPool.getPage()那样工作，但是提供额外的参数去追踪脏页。在接下来的两个练习中，该函数非常重要，在这两个练习中，我们需要实际更新数据，因此需要追踪脏页。

findLeafPage()实现访问的每个内部（非叶）页面都应使用只读权限获取，但返回的叶页面除外，返回的叶页面应使用作为函数参数提供的权限获取。这些权限级别对于本实验室来说并不重要，但对于代码在未来的实验室中正常运行来说，它们将非常重要。

**练习1:  BTreeFile.findLeafPage()**

实现BTreeFile.findLeafPage()方法

通过单元测试BTreeFileReadTest.java和系统测试BTreeScanTest.java意味着完成本次练习

要找到叶子节点可分为如下几种情况：

f为null时：

1. 每次查询内部节点的最左侧孩子指针指向的节点，直到找到叶子页

f不为null时：

1. 遍历entry，找到第一个大于要查找的字段f的key，然后递归地调用findLeafPage
2. 最后如果均不满足条件，那么就直接访问最后一个entry的右孩子指针，递归调用findLeafPage

```java
private BTreeLeafPage findLeafPage(TransactionId tid, Map<PageId, Page> dirtypages, BTreePageId pid, Permissions perm,
                                       Field f)
					throws DbException, TransactionAbortedException {
		// some code goes here
		//如果为空,找内部节点最左侧孩子遍历
		if(null == f){
			if(pid.pgcateg() == BTreePageId.LEAF){
				return (BTreeLeafPage) getPage(tid, dirtypages, pid, perm);
			}
			BTreeInternalPage page = (BTreeInternalPage)getPage(tid, dirtypages, pid, perm);
			BTreePageId bid = page.getChildId(0);
			return findLeafPage(tid, dirtypages, bid, perm, f);
		}
		//不为空
		//1.获取数据页类型
		int type = pid.pgcateg();
		//2.如果是叶子节点
		if(type == BTreePageId.LEAF){
			return (BTreeLeafPage) getPage(tid, dirtypages, pid, perm);
		}
		//3.读取内节点时要用只读方式
		BTreeInternalPage internalPage = (BTreeInternalPage)getPage(tid, dirtypages, pid, Permissions.READ_ONLY);
		//4.获取该页的entry
		Iterator<BTreeEntry> iterator = internalPage.iterator();
		//这里需要把entry声明在循环外，如果找到最后一个entry还没找到，返回最后一个entry的右孩子
		BTreeEntry entry = null;
		while (iterator.hasNext()){
			entry = iterator.next();
			Field key = entry.getKey();
			if(key.compare(Op.GREATER_THAN_OR_EQ, f)){
				return findLeafPage(tid, dirtypages, entry.getLeftChild(), perm, f);
			}
		}
        return findLeafPage(tid, dirtypages, entry.getRightChild(), perm, f);
	}
```

## 3、插入

为了保证B+树中存储元组的顺序性并且保持B+树的完整性，我们必须将元组插入到包含键范围的叶子页中。正如我们上面提到的，findLeafPage()方法被用于寻找我们应该插入元组的正确的叶子页。但是，每个页都有槽数的限制，即使对应的叶子页已满我们也需要能向其中插入元组。

尝试向已满的叶子页插入元组会导致页分裂，以便元组平均地分布到两个新页中。叶子页的每次分裂，都需要将第二页中的第一个元组对应的新条目添加到父节点。有时，内部节点也可能已满，无法接受新条目。在这种情况下，父节点应该分裂并且向它的父节点添加一个新纪录。这可能导致递归地分裂并且最终创建一个新的根节点

在本次练习中，我们需要实现BTreeFile.java中的splitLeafPage()和splitInternalPage()方法。如果被分裂的页是根节点，我们需要创建一个新的内部节点作为新的根节点，并且更新BTreeRootPtrPage。否则，我们需要通过READ_WRITE权限读取父页面，如果有必要就递归地进行分裂，并且添加新记录。你会发现getParentWithEmptySlots()函数对于处理这些不同的情况非常有用。在`splitLeafPage()`方法中我们应该将键`复制`到父页，而在`splitInternalPage()`方法中，应该将键`推`到父页(如图2所示)。记住根据需要更新新页的父指针(为了简单起见，图2没有展示父指针)。

当一个内部节点被分裂时，我们需要更新被移动的孩子页的父指针。你会发现updateParentPointers()对于这非常有用。此外，记住更新被分裂的叶子页的兄弟指针。最后，返回应该插入新元组或记录的页面，如提供的键字段所示。(提示：不必担心提供的键实际上可能位于要拆分的元组/条目的正中心。应该在拆分期间忽略该键，只使用它来确定返回两个页面中的哪一个)

![在这里插入图片描述](https://img-blog.csdnimg.cn/f720ba79657841a3893a7b6963e2e4b0.png)

 															分裂叶子页 

无论何时创建新页面，无论是因为拆分页面还是创建新的根页面，都可以调用`getEmptyPage()`来或取新页面。这个函数是一个抽象函数，它允许我们重用由于合并而被删除的页面。

我们期望使用`BtreeAppPage.iterator()`和`BTreeInternalPage.iterator()`与叶和内部页面交互，以迭代每个页面中的元组/条目。为了方便起见，源码中提供了这两种类型页面的反向迭代器：`BTreeLeafPage.reverseIterator()` 和
`BTreeInternalPage.reverseIterator()`。对于将页中元组/条目的子集移动到其右侧兄弟节点的任务来说，这些反向迭代器非常有用。

如上所述，内部页面迭代器使用BTreeEntry.java中定义的接口，该接口有一个键和两个孩子指针。它也包含一个recordId，用于标识基础页面上键和孩子指针的位置。我们认为一次处理一个条目是与内部页面交互的自然方式，但重要的是要记住，底层页面实际上并不存储条目列表，而是存储*m*键和*m*+1子指针的有序列表。由于`BTreeEntry`只是一个接口，而不是实际存储在页面上的对象，因此更新`BTreeEntry`的字段不会修改底层页面。为了修改页面上的数据，需要调用BTreeInternalPage.updateEntry()方法。另外，删除一个记录实际上仅仅删除了键和孩子指针，因此源码提供了`BTreeInternalPage.deleteKeyAndLeftChild()`和`BTreeInternalPage.deleteKeyAndRightChild()`函数来实现这一点。记录的recordId用于查找被删除的键和孩子指针。插入记录也仅仅插入键和孩子指针(除非它是第一条记录)，所以`BTreeInternalPage.insertEntry()`检查所提供的记录中的一个孩子指针是否与页面上现有的孩子指针重叠，并且在该位置插入条目将使键保持排序顺序

在splitLeafPage()和splitINternalPage()方法中，需要使用任何新创建的页面以及由于新指针或新数据而修改的页面来更新`dirtypages`集合。这是BTreeFile.getPage()派上用场的地方，每次获取页面时，BTreeFile.getPage()都会检查页面是否已经存储在本地缓存中，如果本地缓存中找不到请求的页面，则会从缓冲池中获取该页面。`BTreeFile.getPage()`如果使用读写权限获取页面，也会将页面添加到`dirtypages`缓存中，因为它们可能很快就会被弄脏。这种方法的一个优点是，如果在一个元组插入或删除过程中多次访问相同的页面，则可以防止更新丢失。

请注意，与`HeapFile.insertTuple()`不同的是，`BTreeFile.insertTuple()`可能会返回大量脏页，特别是在拆分任何内部页的情况下。您可能还记得以前的实验，返回脏页集是为了防止缓冲池在刷新脏页之前逐出脏页

**Warning**:B+树是一种复杂的数据结构，在修改B+树之前了解每个合法的B+树的必要属性很有帮助：

1. 如果一个父节点指向孩子节点，那么孩子节点必须指向同一个父节点
2. 如果叶子节点指向右侧兄弟节点，那么右侧兄弟节点也需要指向左边这个兄弟节点
3. 第一个叶子和最后一个叶子节点必须分别指向null
4. 记录ID必须与它们实际属于的页匹配
5. 具有非叶子节点的节点中`key`必须大于左子节点中的任何key，小于右子节点中的任何key
6. 具有叶子节点的节点中`key`必须大于等于左孩子的所有key，小于等于右孩子的所有key
7. 节点孩子或为非叶子节点、或为叶子节点
8. 每个节点最多只有m个子节点，非叶子节点具有至少⌈m/2⌉子节点

在BTreeChecker.java中已经实现了检查上述属性的机制，该方法也用于在 `systemtest/BTreeFileDeleteTest.java`中测试我们的B+树实现，可以随意添加对该函数的调用，以帮助调试



> 1. checker方法应始终在树初始化之后、开始和完成对键插入或删除的完整调用之前和之后通过，但不一定在内部方法中通过。
> 2. 树可能格式正确(因此通过checkRep())，但仍然可能不正确。例如，空树始终会通过checkRep()方法，但可能并不总是正确的(如果刚刚插入元组,则树不应该为空)

**练习2  Spliting Page**

实现BTreeFile.splitLeafPage()和BTreeFile.splitInternalPage()方法

完成本次试验后，我们应该能够通过BTreeFileInsertTest.java单元测试、systemtest/BTreeFileInsertTest.java系统测试。系统测试可能要花费几秒钟才能完成，这些文件会测试我们代码中插入元组和分裂也的正确性，并且处理重复的元组。

完成本练习后，您应该能够通过’BTreeDeadlockTest.java’和’BTreeInsertTest.java’中的单元测试。一些测试用例可能需要几秒钟才能完成`BTreeDeadlockTest`将测试您是否正确实现了锁定并能够处理死锁`BTreeInsertTest`将测试代码是否正确插入元组和拆分页面，并处理重复元组和下一个键锁定。

```java
public BTreeLeafPage splitLeafPage(TransactionId tid, Map<PageId, Page> dirtypages, BTreeLeafPage page, Field field)
			throws DbException, IOException, TransactionAbortedException {
		// some code goes here
        //
        // Split the leaf page by adding a new page on the right of the existing
		// page and moving half of the tuples to the new page.  Copy the middle key up
		// into the parent page, and recursively split the parent as needed to accommodate
		// the new entry.  getParentWithEmtpySlots() will be useful here.  Don't forget to update
		// the sibling pointers of all the affected leaf pages.  Return the page into which a 
		// tuple with the given key field should be inserted.
		//获取叶子结点的元组数量
		int numTuples = page.getNumTuples();
		//获取一个空的叶子页
		BTreeLeafPage rightPage = (BTreeLeafPage) getEmptyPage(tid, dirtypages, BTreePageId.LEAF);
		//分裂，将原叶子页中一半元素拷贝到空叶子页中
		Iterator<Tuple> iterator = page.iterator();
		int num = numTuples / 2;
		//先遍历一半元素
		while (num > 0){
			iterator.next();
			num--;
		}
		//遍历剩余的元组，插入到新的叶子页中，并记录要插入的父节点key
		Field key = null;
		while(iterator.hasNext()){
			Tuple tuple = iterator.next();
			//新页面的第一个元组的key复制到父节点的key
			if(key == null){
				key = tuple.getField(page.keyField);
			}
			//原始页删除元组
			page.deleteTuple(tuple);
			rightPage.insertTuple(tuple);
		}
		//更新兄弟指针
		BTreePageId rightSiblingId = page.getRightSiblingId();
		if(rightSiblingId != null){
			BTreeLeafPage rightSibling = (BTreeLeafPage) getPage(tid, dirtypages, rightSiblingId, Permissions.READ_WRITE);
			rightSibling.setLeftSiblingId(rightPage.getId());
			rightPage.setRightSiblingId(rightSiblingId);
			dirtypages.put(rightSiblingId, rightSibling);//pageId和page
		}
		rightPage.setLeftSiblingId(page.getId());
		page.setRightSiblingId(rightPage.getId());

		//将脏页记录到dirtypage
		dirtypages.put(page.getId(),page);
		dirtypages.put(rightPage.getId(), rightPage);

		//向父节点插入新的entry
		BTreeEntry entry = new BTreeEntry(key, page.getId(), rightPage.getId());
		//返回父页，保证有至少一个空槽
		BTreeInternalPage parent = getParentWithEmptySlots(tid, dirtypages, page.getParentId(), key);
		parent.insertEntry(entry);
		dirtypages.put(parent.getId(), parent);

		//由于父页面的变更，更新原始页和新页的父指针
		updateParentPointer(tid, dirtypages, parent.getId(), page.getId());
		updateParentPointer(tid, dirtypages, parent.getId(), rightPage.getId());

		//判断待插入的key属于哪个叶子页
		if(field.compare(Op.LESS_THAN_OR_EQ, key)){
			return page;
		}else{
			return rightPage;
		}
	}
	




public BTreeInternalPage splitInternalPage(TransactionId tid, Map<PageId, Page> dirtypages,
			BTreeInternalPage page, Field field) 
					throws DbException, IOException, TransactionAbortedException {
		// some code goes here
        //
        // Split the internal page by adding a new page on the right of the existing
		// page and moving half of the entries to the new page.  Push the middle key up
		// into the parent page, and recursively split the parent as needed to accommodate
		// the new entry.  getParentWithEmtpySlots() will be useful here.  Don't forget to update
		// the parent pointers of all the children moving to the new page.  updateParentPointers()
		// will be useful here.  Return the page into which an entry with the given key field
		// should be inserted.
		//记录page中entry的数量
		int numEntries = page.getNumEntries();

		//创建新的BtreeInternalPage
		BTreeInternalPage bTreeInternalPage = (BTreeInternalPage)getEmptyPage(tid, dirtypages, BTreePageId.INTERNAL);

		Iterator<BTreeEntry> iterator = page.reverseIterator();
		//将原始页中的一半元素移动到新的内部页中
		int num = numEntries / 2;
		while(num > 0){
			BTreeEntry entry = iterator.next();
			page.deleteKeyAndRightChild(entry);
			bTreeInternalPage.insertEntry(entry);
			num--;
		}
		//推到父节点的entry
		BTreeEntry pushEntry = iterator.next();
		page.deleteKeyAndRightChild(pushEntry);

		//记录脏页
		dirtypages.put(page.getId(), page);
		dirtypages.put(bTreeInternalPage.getId(), bTreeInternalPage);
		//更新孩子指针
		pushEntry.setLeftChild(page.getId());
		pushEntry.setRightChild(bTreeInternalPage.getId());

		// 由于页间元素的移动，更新这些页中元素的孩子指针
		updateParentPointers(tid,dirtypages,page);
		updateParentPointers(tid,dirtypages, bTreeInternalPage);

		//父节点,getParentWithEmptySlots会递归地调用splitInternalPage方法
		BTreeInternalPage parent = getParentWithEmptySlots(tid,dirtypages,page.getParentId(),pushEntry.getKey());
		parent.insertEntry(pushEntry);
		dirtypages.put(parent.getId(), parent);
		updateParentPointers(tid, dirtypages, parent);

		if(field.compare(Op.LESS_THAN, pushEntry.getKey())){
			return page;
		}else{
			return bTreeInternalPage;
		}
	}
```

## 4、删除

为了保持树的平衡并且不浪费不必要的空间，B+树的删除操作可能会导致页重新分配元组，最终导致页合并。 

![在这里插入图片描述](https://img-blog.csdnimg.cn/e4337c9743a642b3ab7e5d11014f5262.png)

![在这里插入图片描述](https://img-blog.csdnimg.cn/7f3d11a0669a40ce8473549e8b837cde.png)

 															页再分配

![在这里插入图片描述](https://img-blog.csdnimg.cn/abf2536efe8f4b368f6bdd3a0059ec4a.png) 

![在这里插入图片描述](https://img-blog.csdnimg.cn/f31ffbff83d84fad851adb8687770a89.png)

 																页合并

如果试图从小于半满的叶子页中删除元组的话，则会导致该页面从其兄弟节点中窃取元组或与其兄弟节点中的一个合并。如果页面的兄弟节点有多余的元组，则元组应该均匀分布在两个页面之间，并且父级条目应该进行更新(如图3)。但是，如果兄弟节点也是半满(如图4)，那么应该合并两个页，并且删除父节点的记录。反过来，从父节点中删除记录也可能导致父节点半满，在这种情况下，父节点应该从它的兄弟节点中窃取记录或者与他的兄弟节点合并。这可能会导致递归地合并，如果根节点的最后一个记录被删除的话，那么最终会删除根节点。

在接下来的练习中我们需要实现`BTreeFile.java`中`stealFromLeafPage()`,`stealFromLeftInternalPage()`, `stealFromRightInternalPage()`,`mergeLeafPages()` 和`mergeInternalPages()` 方法。在前三个函数中，如果兄弟节点有多余的元组/记录，那么我们需要实现均匀地再分布元组/记录。记住更新父节点中相应的key(仔细看图3).在`stealFromLeftInternalPage()`/`stealFromRightInternalPage()`方法中，我们需要更新已经被移动的孩子的父节点。我们可以重用`updateParentPointers()`方法

在`mergeLeafPages()`和`mergeInternalPages()`方法中，我们需要编写合并页的代码，有效地执行`splitLeafPage()`和`splitInternalPage()`相反操作。`deleteParentEntry`方法在处理不同的递归情况时非常有用。确保在删除页时调用`setEmptyPage()`方法以使它们可以被重用。与前面的练习相似，这推荐使用BTreeFile.getPage()方法获取页面并使脏页列表保持最新

**练习3 页再分配**

实现`BTreeFile.stealFromLeafPage()`,`BTreeFile.stealFromLeftInternalPage()`,`BTreeFile.stealFromRightInternalPage()`.方法

完成练习后，需要通过单元测试`BTreeFileDeleteTest.java` (`testStealFromLeftLeafPage` and
`testStealFromRightLeafPage`),为了完整地测试系统，测试中可能会创建一个很大的B+树，故系统测试可能需要几秒钟完成



```java
public void stealFromLeafPage(BTreeLeafPage page, BTreeLeafPage sibling,
			BTreeInternalPage parent, BTreeEntry entry, boolean isRightSibling) throws DbException {
		// some code goes here
        //
        // Move some of the tuples from the sibling to the page so
		// that the tuples are evenly distributed. Be sure to update
		// the corresponding parent entry.
		//1.首先计算需要移动多少元组,然后再进行移动
		int pageNumTuples = page.getNumTuples();
		int siblingNumTuples = sibling.getNumTuples();
		//如果不满足可窃取条件，直接返回
		if(pageNumTuples > siblingNumTuples){
			return;
		}
		Iterator<Tuple> siblingIterator;
		if(isRightSibling){
			siblingIterator = sibling.iterator();
		}else{
			siblingIterator = sibling.reverseIterator();
		}
		int moveCount = siblingNumTuples - (pageNumTuples + siblingNumTuples) / 2;
		while(moveCount > 0){
			Tuple tuple = siblingIterator.next();
			sibling.deleteTuple(tuple);
			page.insertTuple(tuple);
			moveCount--;
		}
		//更新entry
		Field key = null;
		if(isRightSibling){
			key = siblingIterator.next().getField(sibling.keyField);
			entry.setKey(key);
		}else{
			key = page.iterator().next().getField(page.keyField);
			entry.setKey(key);
		}
		parent.updateEntry(entry);
	}


public void stealFromLeftInternalPage(TransactionId tid, Map<PageId, Page> dirtypages,
			BTreeInternalPage page, BTreeInternalPage leftSibling, BTreeInternalPage parent,
			BTreeEntry parentEntry) throws DbException, TransactionAbortedException {
		// some code goes here
        // Move some of the entries from the left sibling to the page so
		// that the entries are evenly distributed. Be sure to update
		// the corresponding parent entry. Be sure to update the parent
		// pointers of all children in the entries that were moved.
		//计算需要移动的元素个数
		int pageNumEntries = page.getNumEntries();
		int siblingNumEntries = leftSibling.getNumEntries();
		int moveCount = siblingNumEntries - (pageNumEntries + siblingNumEntries) / 2;

		Iterator<BTreeEntry> siblingIterator = leftSibling.reverseIterator();
		// 先处理parentEntry和leftSibling的倒数第一个节点，注意左右孩子指针的更新
		BTreeEntry right = page.iterator().next();
		BTreeEntry left = siblingIterator.next();
		BTreeEntry entry = new BTreeEntry(parentEntry.getKey(), left.getRightChild(), right.getLeftChild());
		page.insertEntry(entry);
		moveCount--;

		//移动元素
		while(moveCount > 0 && siblingIterator.hasNext()){
			leftSibling.deleteKeyAndRightChild(left);
			page.insertEntry(left);
			left = siblingIterator.next();
			moveCount--;
		}
		//更新parent的entry
		leftSibling.deleteKeyAndRightChild(left);
		parentEntry.setKey(left.getKey());
		parent.updateEntry(parentEntry);

		updateParentPointers(tid, dirtypages, page);
	}


public void stealFromRightInternalPage(TransactionId tid, Map<PageId, Page> dirtypages,
			BTreeInternalPage page, BTreeInternalPage rightSibling, BTreeInternalPage parent,
			BTreeEntry parentEntry) throws DbException, TransactionAbortedException {
		// some code goes here
        // Move some of the entries from the right sibling to the page so
		// that the entries are evenly distributed. Be sure to update
		// the corresponding parent entry. Be sure to update the parent
		// pointers of all children in the entries that were moved.

		//计算需要移动的元素个数
		int pageNumEntries = page.getNumEntries();
		int siblingNumEntries = rightSibling.getNumEntries();
		int moveCount = siblingNumEntries - (pageNumEntries + siblingNumEntries) / 2;

		Iterator<BTreeEntry> siblingIterator = rightSibling.iterator();
		// 首先处理parentEntry和右侧兄弟节点的第一个entry
		BTreeEntry right = siblingIterator.next();
		BTreeEntry left = page.reverseIterator().next();
		BTreeEntry entry = new BTreeEntry(parentEntry.getKey(), left.getRightChild(), right.getLeftChild());
		page.insertEntry(entry);
		moveCount--;

		//移动元素
		while(moveCount > 0 && siblingIterator.hasNext()){
			rightSibling.deleteKeyAndRightChild(right);
			page.insertEntry(right);
			right = siblingIterator.next();
			moveCount--;
		}
		//更新parent的entry
		rightSibling.deleteKeyAndRightChild(right);
		parentEntry.setKey(right.getKey());
		parent.updateEntry(parentEntry);

		updateParentPointers(tid, dirtypages, page);
	}
```

**练习4 合并页**

实现`BTreeFile.mergeLeafPages()` 和`BTreeFile.mergeInternalPages()`方法

此时我们可以通过单元测试BTreeFileDeleteTest.java和系统测试systemtest/BTreeFileDeleteTest.java

```java
public void mergeLeafPages(TransactionId tid, Map<PageId, Page> dirtypages,
			BTreeLeafPage leftPage, BTreeLeafPage rightPage, BTreeInternalPage parent, BTreeEntry parentEntry) 
					throws DbException, IOException, TransactionAbortedException {

		// some code goes here
        //
		// Move all the tuples from the right page to the left page, update
		// the sibling pointers, and make the right page available for reuse.
		// Delete the entry in the parent corresponding to the two pages that are merging -
		// deleteParentEntry() will be useful here
		//移动tuple
		Iterator<Tuple> iterator = rightPage.iterator();
		while(iterator.hasNext()){
			Tuple tuple = iterator.next();
			rightPage.deleteTuple(tuple);
			leftPage.insertTuple(tuple);
		}
		//修改左右指针
		BTreePageId rightSiblingId = rightPage.getRightSiblingId();
		if(rightSiblingId != null){
			//兄弟节点
			BTreeLeafPage page = (BTreeLeafPage) getPage(tid, dirtypages, rightSiblingId, Permissions.READ_WRITE);
			page.setLeftSiblingId(leftPage.getId());
			leftPage.setRightSiblingId(rightSiblingId);
		}else{
			leftPage.setRightSiblingId(null);
		}
		//将rightPage置空以便重用，并删除parentEntry
		setEmptyPage(tid, dirtypages,rightPage.getId().getPageNumber());
		deleteParentEntry(tid, dirtypages, leftPage, parent, parentEntry);
	}


public void mergeInternalPages(TransactionId tid, Map<PageId, Page> dirtypages,
			BTreeInternalPage leftPage, BTreeInternalPage rightPage, BTreeInternalPage parent, BTreeEntry parentEntry) 
					throws DbException, IOException, TransactionAbortedException {
		
		// some code goes here
        //
        // Move all the entries from the right page to the left page, update
		// the parent pointers of the children in the entries that were moved, 
		// and make the right page available for reuse
		// Delete the entry in the parent corresponding to the two pages that are merging -
		// deleteParentEntry() will be useful here
		//先复制parentEntry的key值并设置指针，插入左页面
		BTreeEntry lastEntry = leftPage.reverseIterator().next();
		BTreeEntry firstEntry = rightPage.iterator().next();
		BTreeEntry bTreeEntry = new BTreeEntry(parentEntry.getKey(), lastEntry.getRightChild(), firstEntry.getLeftChild());
		leftPage.insertEntry(bTreeEntry);
		//移动元素
		Iterator<BTreeEntry> it = rightPage.iterator();
		while(it.hasNext()){
			BTreeEntry entry = it.next();
			rightPage.deleteKeyAndRightChild(entry);
			leftPage.insertEntry(entry);
		}
		//将rightPage置空以便重用
		setEmptyPage(tid, dirtypages,rightPage.getId().getPageNumber());
		updateParentPointers(tid, dirtypages, leftPage);
		deleteParentEntry(tid, dirtypages, leftPage, parent, parentEntry);

	}
```

## 5、事务

通过next-key lock，B+树可以防止在两次连续范围扫描之间出现幻读的问题。由于SimpleDB使用页面级、严格的两阶段锁定，因此如果B+树实现正确的话，那就可以有效地防止幻读发生。因此，我们的B+树实现代码应该通过`BTreeNextKeyLockingTest`测试.

此外，如果我们在B+树代码中正确地实现锁，那么我们的代码也应该通过单元测试`test/simpledb/BTreeDeadlockTest.java`

如果所有练习都正确地实现，那么我们应该能够通过BTreeTest系统测试。通过该测试可能需要几分钟的时间。

![在这里插入图片描述](https://img-blog.csdnimg.cn/81f0aa3a8b4742bba15d9ec8b0424fb5.png)

![在这里插入图片描述](https://img-blog.csdnimg.cn/abd7f9f6c9a84021b89646efab8fdc55.png)



## 6、总结

详细了解B+树的结构.