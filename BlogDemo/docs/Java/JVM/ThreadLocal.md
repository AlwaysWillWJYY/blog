---
title: ThreadLocal
date: 2022-03-15

---

用来实现相同线程数据共享不同的线程数据隔离，广泛应用于框架之间的用户资源隔离、事务隔离等。

### 1、导致内存泄露

内存泄露产生的原因：`长生命周期对象持有短生命周期的对象导致短生命周期对象无法被释放`

ThreadLocalMap对此作了预防：

Entry的Key使用了弱引用，在垃圾回收时，变成null，但是value是强引用，ThreadLocalMap提供了set、get、remove方法在一些时机下会对这些Entry项进行清理，但是这是不及时的，也不是每次都会执行的，所以一些情况下还是会发生内存泄露，所以在使用完毕后即时调用remove方法才是解决内存泄露的王道。

### 2、HashMap和ThreadLocalMap的异同点

1）HashMap使用Key本身的hashCode再进行运算得出，而ThreadLocalMap使用ThreadLocal对象作为key，因此有可能引入内存泄露问题，为此该key使用WeakReference变量修饰。

2）两者都使用Hash算法：除留余数法

ThreadLocalMap生成hash的方法：

```java
Private static final int HASH_INCREMENT = 0x61c88647;
Private static int nextHashCode(){
    Return nextHashCode.getAndAdd(HASH_INCREMENT);
}
```

ThreadLocalMap使用static静态变量nextHashCode，其类型为AtomicInteger，每次使用后都会加上固定值

HASH_INCREMENT（斐波那契数列相关，目的是使hash值分布更均匀），最后将结果更新赋值给nextHashCode。而HashMap使用key的hashCode进行再运算得出。

3）哈希冲突的解决方法：

* HashMap使用链地址法；

* ThreadLocalMap：使用开放地址法-线性探测法

### 3、ThreadLoacl的使用场景

变量在线程间无需可见共享，为线程独有；

变量创建和使用在不同的方法里且不想过度重复书写形参；

### 如何保证线程安全

#### 1、同步互斥

在Java中，最基本的互斥手段是synchronized关键字，synchronized关键字编译后，会在同步块的前后分别形成monitorrnter和monitorexit这两个字节码指令，这两个字节码指令都需要一个reference类型的参数来指明要锁定和解锁的对象。

此外。ReentrantLock也是通过互斥来实现同步。在基本运用上，ReentrantLock与synchronized很相似，他们具备一样的线程重入特性（可重入锁）。

    互斥同步最主要的问题就是进行线程阻塞和唤醒所带来的性能问题，因此这种同步也成为阻塞同步。从处理问题的方式上说，互斥同步属于一种悲观的并发策略，总是认为只要不去做正确地同步措施（例如加锁），那就肯定会出现问题，无论共享数据是否真的会出现竞争，它都要进行加锁。

#### 2、非阻塞同步

非阻塞的实现CAS：CAS指令需要3个操作数，分别是内存地址（在JAVA中理解为变量的内存地址，用V表示），旧的预期值（用A表示），新值（B）。CAS指令执行时，当且仅当V处的值符合旧预期值A时，处理器用B更新A值，否则它就不执行更新，但是无论是否更新了V处的值，都会返回V的旧值，上述的处理过程是一个原子操作。
CAS缺点 ：ABA问题：因为CAS需要在操作值的时候检查下值有没有发生变化，如果没有发生变化则更新，但是一个值原来是A，变成B，又变成A，那么使用CAS进行检查时会发现它的值没有发生变化，但是实际上却变化了。

ABA问题的解决思路就是使用版本号。在变量前面追加版本号，每次变量更新的时候把版本号加一，那么A-B-A就变成了1A-2B-3C。`JDK的atomic包里提供了一个类AtomicStampedReference来解决ABA问题。这个类的compareAndSet方法作用是首先检查当前引用是否等于预期引用，并且当前标志是否等于预期标志，如果全部相等，则以原子方式将该引用和该标志的值设置为给定的更新值`.

CAS还有可能引发的问题：

1.ABA问题；

2.不停的自旋等待，造成处理器资源浪费；

3.CAS只能保证对一个变量操作的原子性，而不能保证对代码块操作的原子性

#### 3、无需同步方案

1）可重入代码

    可重入代码（ReentrantCode）也称为纯代码（PureCode），可以在代码执行的任何时刻中断它，转入去执行另一段代码，而在控制权返回后，原来的程序不会出现任何错误。`所有的可重入代码都是线程安全的，但是并非所有线程安全的代码，都是可重入代码。`

    可重入代码的特点是不依赖存储在堆上的数据和公用的系统资源、用到的状态量都是由参数中传入、不调用 非可重入的方法等。（类比：synchronized拥有锁重入的功能，也就是在使用synchronized时，当一个线程得到一个对象锁后，再次请求此对象锁时时可以再次得到该对象的锁）

2）线程本地存储

如果一段代码中所需的数据必须与其他代码共享，那就看看这些共享数据的代码是否能保证在同一个线程中执行？如果能保证，我们就可以把共享数据的可见范围限制在同一个线程之内。这样无需同步也能保证线程之间不出现数据的争用问题。

符合这种特点的应用并不少见，`大部分使用消费队列的架构模式（如“生产者-消费者”模式）都会将产品的消费过程尽量在一个线程中消费完`。其中最重要的一个应用实例就是经典的Web交互模型中的“一个请求对应一个服务器线程（Thread-per-Request）”的处理方式，这种处理方式的广泛应用使得很多Web服务器应用都可以使用线程本地存储来解决线程安全问题。


线程C需要AB执行完成后才执行

法①：CountDownLatch

```java
public class TestABC {
    public static void main(String[] args) throws InterruptedException {
        CountDownLatch countDownLatch=new CountDownLatch(2);
        Thread threadA = new Thread(new Runnable() {
                @Override
                public void run() {
                try {
                Thread.sleep(new java.util.Random().nextInt(1000));
                } catch (InterruptedException e) {
                e.printStackTrace();
                }
                System.out.println(Thread.currentThread().getName());
                countDownLatch.countDown();
                }
                }, "Thread-A");
        Thread threadB = new Thread(new Runnable() {
                @Override
                public void run() {
                try {
                Thread.sleep(new java.util.Random().nextInt(1000));
                } catch (InterruptedException e) {
                e.printStackTrace();
                }
                System.out.println(Thread.currentThread().getName());
                countDownLatch.countDown();
                }
                }, "Thread-B");
        Thread threadC = new Thread(new Runnable() {
                @Override
                public void run() {    
                // 在C中等待A/B運算結束
                try {
                countDownLatch.await();
                } catch (InterruptedException e) {
                e.printStackTrace();
                throw new RuntimeException("CountDownLatch等待失败。。。",e);
                } 
                System.out.println(Thread.currentThread().getName());
                }
                }, "Thread-C");
        threadA.start();
        threadB.start();
        threadC.start();
    }
}
```
法②：CyclicBarrier

```java
public class TestABC {
    public static void main(String[] args) throws InterruptedException {
        CyclicBarrier cyclicBarrier=new CyclicBarrier(3);
        Thread threadA = new Thread(new Runnable() {
                @Override
                public void run() {
                try {
                Thread.sleep(new java.util.Random().nextInt(1000));
                } catch (InterruptedException e) {
                e.printStackTrace();
                }
                System.out.println(Thread.currentThread().getName());
                // 冲破栅栏代表A线程结束
                try {
                cyclicBarrier.await();
                } catch (InterruptedException | BrokenBarrierException e) {
                e.printStackTrace();
                throw new RuntimeException("cylicBarrier.await()拋出異常：",e);
                }
                }
                }, "Thread-A");
        Thread threadB = new Thread(new Runnable() {
                @Override
                public void run() {
                try {
                Thread.sleep(new java.util.Random().nextInt(1000));
                } catch (InterruptedException e) {
                e.printStackTrace();
                }
                System.out.println(Thread.currentThread().getName());
                // 冲破栅栏代表B线程结束
                try {
                cyclicBarrier.await();
                } catch (InterruptedException | BrokenBarrierException e) {
                e.printStackTrace();
                throw new RuntimeException("cylicBarrier.await()拋出異常：",e);
                }
                }
                }, "Thread-B");
        Thread threadC = new Thread(new Runnable() {
                @Override
                public void run() {
                // 等待前两个(A/B)线程结束，只有前两个(A/B)线程结束了才能满足3个线程都冲破栅栏，
                try {
                // 等待栅栏被冲破，冲破栅栏的条件是：A/B/C三个线程都到达await()。
                // 只有栅栏冲破，才能向下执行，否则先到达的线程等待。
                cyclicBarrier.await();
                } catch (InterruptedException | BrokenBarrierException e) {
                e.printStackTrace();
                throw new RuntimeException("cylicBarrier.await()拋出異常：",e);
                }
                // 满足了三个线程都冲破栅栏才向下执行
                System.out.println(Thread.currentThread().getName());
                }
                }, "Thread-C");
        threadA.start();
        threadB.start();
        threadC.start();
    }
}

```

ThreadLocal意为线程变量，会在每个线程中保存一个副本，当操作该对象的时候即是操作每个线程中的副本对象

ThreadLocal的出现，给多线程并发的安全问题提供了一个新的解决思路

因为考虑到不同浏览器访问服务器时会出现并发访问的问题，我们将浏览器访问服务器后得到的user对象封装成一个ThreadLocal对象为线程私有的，这样在获取user对象的属性或是修改时不会出现多线程并发的问题。
