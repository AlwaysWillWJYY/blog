### 1、简介

在集合框架里，想必大家都用过ArrayList和LinkedList，也经常在面试中问到他们之间的区别。`ArrayList和ArrayBlockingQueue一样，内部基于数组来存放元素，而LinkedBlockingQueue则和LinkedList一样，内部基于链表来存放元素。`

LinkedBlockingQueue实现了BlockingQueue接口，这里放一张类的继承关系图。

![在这里插入图片描述](https://img-blog.csdnimg.cn/79cca513c84c4e369e2bd8c1e48d96d3.png)

LinkedBlockingQueue不同于ArrayBlockingQueue，它如果不指定容量，`默认为Integer.MAX_VALUE，也就是无界队列`。所以为了避免队列过大造成机器负载或者内存爆满的情况出现，我们在使用的时候建议手动传一个队列的大小。

### 2、源码分析

#### 2.1 属性

![在这里插入图片描述](https://img-blog.csdnimg.cn/2a335b83f77c4c61ab4105bd2a7849b4.png)

![在这里插入图片描述](https://img-blog.csdnimg.cn/336b3f80879d4bd4bca997671d0bb5b8.png)

从上面的属性我们知道，每个添加到LinkedBlockingQueue队列中的数据都将被封装成Node节点，添加到链表队列中，其中head和last节点分别被指向队列的头节点和尾结点。与ArrayBlockingQueue不同的是，LinkedBlockingQueue内部分别是用来takeLock和putLock对并发进行控制，也就是说，添加和删除操作并不是互斥操作，可以同时进行，这样大大提高吞吐量。

这里如果不指定队列的容量大小，也就是使用默认的Integer.MAX_VALUE，如果存在添加速度大于删除速度时候，有可能会内存溢出，这点在使用前希望慎重考虑。

另外，LinkedBlockingQueue对每一个lock锁都提供了一个Condition用来挂起和唤醒其他线程。

#### 2.2 构造函数

![在这里插入图片描述](https://img-blog.csdnimg.cn/799e8cd025534a248fce1f68f44ace7c.png)

默认的构造函数和最后一个构造函数创建的队列大小都为Integer.MAX_VALUE，只有第二个构造函数用户可以指定队列的大小。第二个构造函数最后初始化了last和head节点，让它们都指向了一个元素为null的节点。

![在这里插入图片描述](https://img-blog.csdnimg.cn/61da61a882614f39b5b72a5c5b3f01df.png)

最后一个构造函数使用了putLock来进行加锁，但是这里并不是为了多线程的竞争而加锁，只是为了放入的元素能立即对其他线程可见。

#### 2.3 方法

`2.3.1 入队方法`

LinkedBlockingQueue提供了多种入队操作的实现来满足不同情况下的需求，入队操作有如下几种：
```java
·void put(E e)；
·boolean offer(E e)；
·boolean offer(E e, long timeout, TimeUnit unit)。
```

`put(E e)`

![在这里插入图片描述](https://img-blog.csdnimg.cn/b57a59a977c044eaaea4b62203cc90ff.png)

小结put方法来看，它总共做了以下情况的考虑：

·队列已满，阻塞等待。

·队列未满，创建一个node节点放入队列中，如果放完以后队列还有剩余空间，继续唤醒下一个添加线程进行添加。如果放之前队列中没有元素，放完以后要唤醒消费线程进行消费。

`enqueue(Node node)方法：`

![在这里插入图片描述](https://img-blog.csdnimg.cn/9c7d4a87d5fb4cc4b2f54ba6dd9615c1.png)

![在这里插入图片描述](https://img-blog.csdnimg.cn/91b202c0fd454ec19c1fe2edefb36a03.png)

接下来看看signalNotEmpty，顺带看看signalNotFull方法：

![在这里插入图片描述](https://img-blog.csdnimg.cn/2507a2c95eca4871a282cd55992cf108.png)

为什么要这么写？因为signal的时候要获取到该signal对应的Condition对象的锁才行。

`offer(E e)`

![在这里插入图片描述](https://img-blog.csdnimg.cn/a55e1afc43bd459495d2b4a1481beea5.png)

可以看到offer仅仅对put方法改动了一点点，当队列中没有可用元素的时候，不同于put方法的阻塞等待，offer方法直接返回false。

`offer(E e,long timeout,TimeUnit unit)`

![在这里插入图片描述](https://img-blog.csdnimg.cn/0874be19ecd948cfb09d477262aab75f.png)

该方法只是对offer方法进行了阻塞超时处理，使用了Condition的awaitNanos来进行超时等待，这里为什么要用while循环？因为awaitNanos方法是可中断的，为了防止在等待过程中线程被中断，这里使用while循环进行等待过程中中断的处理，继续等待剩下需等待的时间。

`2.3.2 出队方法`

·E take();

·E poll();

·E poll(long timeout,TimeUnit unit)

`take()`

![在这里插入图片描述](https://img-blog.csdnimg.cn/dcc07c832b424872b3121f686452a6be.png)

take方法看起来是put方法的逆向操作，它总共做了以下情况的考虑：

·队列为空，阻塞等待；

·队列不为空，从队首获取并移除一个元素，如果消费后还有元素在队列中，继续唤醒下一个线程进行元素移除。如果放之前队列是满元素的情况，移除之后要唤醒线程进行添加元素。

`dequeue方法：`

![在这里插入图片描述](https://img-blog.csdnimg.cn/ae924ab39a7d451bb6a710ac19c4692b.png)

![在这里插入图片描述](https://img-blog.csdnimg.cn/a835032269cb4c5b89b4c294b6df2fa1.png)

`poll()`

![在这里插入图片描述](https://img-blog.csdnimg.cn/d2a4fc4fd8374017b7b8fdf52d05fecc.png)

poll方法去除了take方法中元素为空后阻塞等待这一步骤，这里也就不详细说了。同理，poll(long timeout, TimeUnit unit)也和offer(E e, long timeout, TimeUnit unit)一样，利用了Condition的awaitNanos方法来进行阻塞等待直至超时。这里就不列出来说了。

`2.3.3 获取元素方法`

![在这里插入图片描述](https://img-blog.csdnimg.cn/29c97230e1c54f1eb126d30af6b7aa91.png)

加锁后，获取到head节点的next节点，如果为空返回null，如果不为空，返回next节点的item值。

`2.3.4 删除元素`

![在这里插入图片描述](https://img-blog.csdnimg.cn/5c55af929f8f43f4beffc6756940b7d3.png)

因为remove方法使用两个锁全部上锁，所以其他操作都要等待它的完成，而该方法需要从head节点遍历到尾结点，所以时间复杂度为O(n)

unlink方法

![在这里插入图片描述](https://img-blog.csdnimg.cn/4eddb24006394f928244c8ade6c39081.png)

### 总结

LinkedBlockingQueue是一个阻塞队列，内部由两个Reentrantlock来实现出入队列的线程安全，由各自的Condition对象的await和siganl来实现等待和唤醒功能。它和ArrayBlockingQueue的不同点在于：

·队列大小有所不同，ArrayBlockingQueue是有界的初始化必须指定大小，而LinkedBlockingQueue可以是有界的也可以是无界的(Integer.MAX_VALUE)，对于后者而言，当添加速度大于移除速度时，在无界的情况下，可能会造成内存溢出等问题。

·数据存储容器不同，ArrayBlockingQueue采用的是数组作为数据存储容器，而LinkedBlockingQueue采用的则是以Node节点作为连接对象的链表。

·由于ArrayBlockingQueue采用的是数组的存储容器，因此在插入或删除元素时不会产生或销毁任何额外的对象实例，而LinkedBlockingQueue则会生成一个额外的Node对象。这可能在长时间内需要高效并发地处理大批量数据的时，对于GC可能存在较大影响。

·`两者的实现队列添加或移除的锁不一样，ArrayBlockingQueue`实现的队列中的锁是没有分离的，`即添加操作和移除操作采用的同一个ReenterLock锁`，而`LinkedBlockingQueue实现的队列中的锁是分离的`，其添加采用的是`putLock`移除采用的则是`takeLock`，这样能大大提高队列的吞吐量，也意味着在高并发的情况下生产者和消费者可以并行地操作队列中的数据，以此来提高整个队列的并发性能。






