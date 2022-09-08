---
title: MIT数据库Lab3实验报告
publish: false
---

##  1、开始

 我们应该在lab2的基础上进行开发，完成lab3的练习 

### 1.1 实现提示

建议跟着文档的练习来实现对应的代码，通读整篇文档的实验后也可能发现更加合适的代码实现顺序

下面是本实验的大纲：

- 实现TableStats类中的方法，通过直方图(IntHistogram类)或者设计其他统计方法，使TableStats能够估计filter和scan的可选择性
- 实现JoinOptimizer类中的方法，允许通过它估计join操作的开销以及可选择性
- 实现JoinOptimizer的orderJoins方法；该方法为一系列连接生成最佳的顺序，前提是在前两个步骤中计算的统计信息

## 2、优化大纲

回忆基于成本的优化策略：

- 使用表的统计数据估计不同查询计划的花费；通常，计划的成本与中间连接和选择的基数(生成的元组的数量)以及筛选器和连接谓词的选择性有关
- 通过这些统计数据以最优的方式排序连接和选择操作，并从多个备选方案中为连接算法选择最佳实现

在本次实验，我们将会通过代码实现这些功能

优化器将会被simpledb/Parser.java类中的方法调用。可以去lab2中查看它的使用方法

当Parser被调用时，它会计算所有表的统计信息(通过我们实现的统计方法)。当查询被提交，解析器将会将查询转换为逻辑计划并且调用我们提供的查询优化器以生成最优的执行计划。

### 2.1 优化器全貌

在开始实验之前，我们需要理解SimpleDB优化器的整体结构，解析器和优化器的SimpleDB模块的总体控制流如下图所示： 

![在这里插入图片描述](https://img-blog.csdnimg.cn/50fbd945d3164877acc6222ee7eb562e.png)



该图表示了解析器使用的类、方法和对象。类和方法的将会在接下来的文章进行详细的解释，基本的操作如下：

- Parser.java初始化时构造了表统计数据的集合(存储在statsMap容器中)，它接下来就等待输入查询，并调用查询的parseQuery方法
- parseQuery首先构造代表已经解析的查询LogicalPlan类，并且调用LogicalPlan实例的physicalPlan方法，该方法会返回可以用于实际查询的DBIterator对象

在接下来的练习中，我们实现的方法将会协助physicalPlan创造出最优的查询计划.

### 2.2 统计数据估计法

 精确估计查询计划的成本非常困难，在本次实验，我们仅关注连接和基于表访问的成本，我们不关心访问方法的选择性(因为我们只有table scans一个访问方法)或额外操作的成本(例如聚合操作) 

#### 2.2.1 计划成本

 假设连接计划的形式如下：`p = t1 join t2 join ... tn`，给出类似于p的查询计划，它的成本可以这样计算： 

```
scancost(t1) + scancost(t2) + joincost(t1 join t2) +
scancost(t3) + joincost((t1 join t2) join t3) +
... 
```

scancost(t1)是扫描表t1的I/O开销，joincost(t1, t2)是连接t1和t2的CPU开销，为了使I/O和CPU成本具有可比性，通常使用一个恒定的比例因子，例如： 

```
cost(predicate application) = 1
cost(pageScan) = SCALING_FACTOR x cost(predicate application)
```

在本次实验中，我们可以忽略缓存的影响(假设每次访问表都需要扫描文件)，因此，scancost(t1)的结果就简单描述为页面的数量`t1 x SCALING_FACTOR` 

#### 2.2.2 连接成本

 当使用嵌套循环连接时，连接表t1和t2的成本可以简单的表示为： 

```
joincost(t1 join t2) = scancost(t1) + ntups(t1) x scancost(t2) //IOcost
                       + ntups(t1) x ntups(t2)  //CPUcost
```

 ntups(t1)是表t1的元组数量 

#### 2.2.3 可选择性

可以通过扫描表计算ntups，评估带有一个或多个选择谓词的表的设置可能比较棘手–这就是筛选器选择性估计问题。下面是你可能使用的估计可选择性的方法之一，通过计算表中包含的值的直方图实现：

- 计算表中每个属性的最大值和最小值(通过一次扫描实现)

- 对表中的每个属性构造一个柱状图。一种简单的方法如下：使用固定数量的桶，其中每个桶表示直方图属性域的固定范围内的记录数量

  例如，如果字段f的范围是1到100，并且有10个bucket，那么bucket 1可能就包含1到10之间的记录数，bucket 2包含第11到20之间的记录数，以此类推

- 再次扫描表，选择所有元组的所有字段，并且使用它们填充每个直方图中的桶计数

- 为了评估等价表达式的选择性，f = const，计算包含const值的bucket的值

  假设bucket的宽度(值的范围)为w，高度(元组的数量)为h，并且表中元组的数量为ntups

  假设值在整个桶中均匀分布，那么表达式的可选择性大约为：(h/w) / ntups

  其中h/w代表值为const的容器中元组的预期数目

- 为了评估范围表达式f > const的可选择性

  计算const所在bucket的值b，得到宽度w_b和高度h_b

  然后b就包含了整个元组的一个分数 b_f = h_b / ntups

  假设元组在b中均匀分布，分数b_part即 > const, 为

  (b_right-const)/w_b；其中b_right是bucket的右端点

  因此，bucket b 为谓词提供了 b_f x b_part的可选择性

  此外，bucket b+1 … NumB-1提供了所有的可选择性(可以用上面类似于b_f的公式计算)

  求和所有桶的选择性贡献将得到表达式的总体选择性

  下图展示了这一过程：

![在这里插入图片描述](https://img-blog.csdnimg.cn/760205fb146448e3920eb1573b3a6b9e.png)

- 涉及小于的表达式的可选择性可以执行类似于大于的情况，直接求和const左侧的桶的可选择性(类比图)

在接下来的两个练习中，我们将编写代码来执行连接和过滤器的选择性估计.



**练习1: IntHistogram**

为了估计可选择性，你需要实现一些方法去记录了表的统计信息，源码中已经提供了框架类：`IntHistogram`，我们的目是通过上面描述的基于bucket的思想计算统计直方图，但是只要可以进行合理的可选择性估计使用其他方法也可

源码中提供了基于`IntHistogram`的 `StringHistogram`类以计算String谓词的可选择性，如果我们有更好的评估器，我们可以修改StringHistogram的实现，否则无需变动该类

通过单元测试IntHistogramTest代码即代表完成该练习.

```java
package simpledb.optimizer;

import simpledb.common.Permissions;
import simpledb.execution.Predicate;

/** A class to represent a fixed-width histogram over a single integer-based field.
 */
public class IntHistogram {

    /**
     * 存储柱状图
     */
    private int[] histogram;
    /**
     * 柱状图bucket数量
     */
    private final int buckets;
    private final int min;
    private final int max;
    //bucket宽度
    private final double width;
    //元组总数
    private int ntups;
    /**
     * Create a new IntHistogram.
     * 
     * This IntHistogram should maintain a histogram of integer values that it receives.
     * It should split the histogram into "buckets" buckets.
     * 
     * The values that are being histogrammed will be provided one-at-a-time through the "addValue()" function.
     * 
     * Your implementation should use space and have execution time that are both
     * constant with respect to the number of values being histogrammed.  For example, you shouldn't 
     * simply store every value that you see in a sorted list.
     * 
     * @param buckets The number of buckets to split the input value into.
     * @param min The minimum integer value that will ever be passed to this class for histogramming
     * @param max The maximum integer value that will ever be passed to this class for histogramming
     */
    public IntHistogram(int buckets, int min, int max) {
    	// some code goes here
        this.buckets = buckets;
        this.max = max;
        this.min = min;
        //通过buckets、min&max计算每个桶的weight
        this.width = (double) (max - min) / buckets;
        this.histogram = new int[buckets];
        this.ntups = 0;
    }

    /**
     * Add a value to the set of values that you are keeping a histogram of.
     * @param v Value to add to the histogram
     */
    public void addValue(int v) {
    	// some code goes here
        int index = getIndex(v);
        histogram[index]++;
        ntups++;
    }
    public int getIndex(int v){
        if(v > max || v < min){
            throw new IllegalArgumentException("value out of range");
        }else{
            return v == max ? (buckets - 1) : ((int)((v - min) / width));
        }
    }

    /**
     * Estimate the selectivity of a particular predicate and operand on this table.
     * 
     * For example, if "op" is "GREATER_THAN" and "v" is 5, 
     * return your estimate of the fraction of elements that are greater than 5.
     * 
     * @param op Operator
     * @param v Value
     * @return Predicted selectivity of this particular operator and value
     */
    public double estimateSelectivity(Predicate.Op op, int v) {
        //可选择性
    	// some code goes here
        double selectivity = 0.0;
        if(op.equals(Predicate.Op.LESS_THAN)){
            //<
            if(v <= min){
                return 0.0;
            }
            if(v > max){
                return 1.0;
            }
            int index = getIndex(v);
            // b_part = (b_right - const) / w_b
            // b_f = h_b / ntups
            // selectivity = b_f * b_part
            for(int i = 0; i < index; i++){
                selectivity += (histogram[i] + 0.0) / ntups;
            }
            //均匀分布,可以看成先除以width得到一份,v-b_left份
            double b_part = (v - index * width - min) / width;
            double b_f = histogram[index] / ntups;
            selectivity += b_f * b_part;
            return selectivity;
        }
        if(op.equals(Predicate.Op.EQUALS)){
            if(v < min || v > max){
                return 0.0;
            }
            // 这里width+1是为了确保selectivity的范围在(0,1)之间
            // (h / w) / ntups
            return 1.0 * histogram[getIndex(v)] / ((int)(width + 1)) / ntups;
        }
        if(op.equals(Predicate.Op.GREATER_THAN)){
            //>
            return 1 - estimateSelectivity(Predicate.Op.LESS_THAN_OR_EQ, v);
        }
        if(op.equals(Predicate.Op.LESS_THAN_OR_EQ)){
            return estimateSelectivity(Predicate.Op.LESS_THAN, v + 1);
        }
        if(op.equals(Predicate.Op.GREATER_THAN_OR_EQ)){
            return estimateSelectivity(Predicate.Op.GREATER_THAN, v - 1);
        }
        if(op.equals(Predicate.Op.NOT_EQUALS)){
            return 1 - estimateSelectivity(Predicate.Op.EQUALS, v);
        }
        return 0.0;
    }
    
    /**
     * @return
     *     the average selectivity of this histogram.
     *     
     *     This is not an indispensable method to implement the basic
     *     join optimization. It may be needed if you want to
     *     implement a more efficient optimization
     * */
    public double avgSelectivity()
    {
        // some code goes here
        double avg = 0.0;
        for(int i = 0; i < buckets; i++){
            avg += (histogram[i] + 0.0) / ntups;
        }
        return avg;
    }
    
    /**
     * @return A string describing this histogram, for debugging purposes
     */
    public String toString() {
        // some code goes here
        StringBuilder sb = new StringBuilder();
        for(int i = 0; i < histogram.length; i++){
            double l = i * width;
            double r = (i + 1) * width;
            sb.append(String.format("[%f, %f]:%d\n", l, r, histogram[i]));
        }
        return sb.toString();
    }
}

```

 理解了上面讲述的基于直方图的可选择性估计方法，很容易实现该类 

**练习2：TableStats**

TableStats类中包含计算表中页和元组数量以及估计表中每个属性的可选择性的方法。查询解析器已经为每张表创建了一个TableStats实例，并且将其传递给了你的查询优化器

我们应该实现TableStats中的如下方法：

- 实现TableStats构造方法：编写扫描表的代码创建我们需要的统计数据；这里要多次扫描表，一次统计表中某属性的最大最小值，一次构造Histogram
- 实现`estimateSelectivity(int field, Predicate.Op op,Field constant)`:通过我们自己实现的统计数据(IntHistogram or StringHistogram),估计表中对应谓词的可选择性
- 实现estimateScanCost()方法：该方法估计顺序扫描文件的成本，读取页的成本为`costPerPageIO`，我们可以假设没有寻找耗时并且bufferpool中不存在页。此方法可能使用在构造函数中计算的开销或大小
- 实现estimateTableCardinality(double selectivityFactor)方法：如果应用了带有选择性selectivityFactor的谓词，该方法将返回关系中元组的数量

通过TableStatsTest代表完成该练习。

```java
package simpledb.optimizer;

import simpledb.common.Database;
import simpledb.common.DbException;
import simpledb.common.Type;
import simpledb.execution.Predicate;
import simpledb.execution.SeqScan;
import simpledb.storage.*;
import simpledb.transaction.TransactionAbortedException;
import simpledb.transaction.TransactionId;

import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.ConcurrentMap;

/**
 * TableStats represents statistics (e.g., histograms) about base tables in a
 * query.
 *
 * This class is not needed in implementing lab1 and lab2.
 */
public class TableStats {

    private static final ConcurrentMap<String, TableStats> statsMap = new ConcurrentHashMap<>();

    static final int IOCOSTPERPAGE = 1000;

    public static TableStats getTableStats(String tablename) {
        return statsMap.get(tablename);
    }

    public static void setTableStats(String tablename, TableStats stats) {
        statsMap.put(tablename, stats);
    }

    public static void setStatsMap(Map<String,TableStats> s)
    {
        try {
            java.lang.reflect.Field statsMapF = TableStats.class.getDeclaredField("statsMap");
            statsMapF.setAccessible(true);
            statsMapF.set(null, s);
        } catch (NoSuchFieldException | IllegalAccessException | IllegalArgumentException | SecurityException e) {
            e.printStackTrace();
        }

    }

    public static Map<String, TableStats> getStatsMap() {
        return statsMap;
    }

    public static void computeStatistics(){
        Iterator<Integer> tableIt = Database.getCatalog().tableIdIterator();

        System.out.println("Computing table stats.");
        while (tableIt.hasNext()) {
            int tableid = tableIt.next();
            TableStats s = new TableStats(tableid, IOCOSTPERPAGE);
            setTableStats(Database.getCatalog().getTableName(tableid), s);
        }
        System.out.println("Done.");
    }

    /**
     * Number of bins for the histogram. Feel free to increase this value over
     * 100, though our tests assume that you have at least 100 bins in your
     * histograms.
     */
    static final int NUM_HIST_BINS = 100;

    private final int tableid;
    private final int ioCostPerPage;

    /**
     * 记录表中每个属性的Histogram
     */
    private Map<Integer, IntHistogram> intHistogramMap;
    private Map<Integer, StringHistogram> stringHistogramMap;

    /**
     * 表对应的page数量
     */
    private int numPage;

    /**
     * 表的详细信息
     */
    private TupleDesc tupleDesc;
    /**
     * 表中的元组数
     */
    private int totalTuples;


    /**
     * Create a new TableStats object, that keeps track of statistics on each
     * column of a table
     *
     * @param tableid
     *            The table over which to compute statistics
     * @param ioCostPerPage
     *            The cost per page of IO. This doesn't differentiate between
     *            sequential-scan IO and disk seeks.
     */
    public TableStats(int tableid, int ioCostPerPage){
        // For this function, you'll have to get the
        // DbFile for the table in question,
        // then scan through its tuples and calculate
        // the values that you need.
        // You should try to do this reasonably efficiently, but you don't
        // necessarily have to (for example) do everything
        // in a single scan of the table.
        // some code goes here
        this.tableid = tableid;
        this.ioCostPerPage = ioCostPerPage;
        this.totalTuples = 0;
        DbFile dbFile = Database.getCatalog().getDatabaseFile(tableid);
        this.numPage = ((HeapFile)dbFile).numPages();
        this.tupleDesc = dbFile.getTupleDesc();
        this.intHistogramMap = new ConcurrentHashMap<>();
        this.stringHistogramMap = new ConcurrentHashMap<>();

        try{
            initHistogram(tableid);
        }catch (Exception e){
            e.printStackTrace();
        }


    }
    private void initHistogram(int tableid) throws TransactionAbortedException, DbException {
        // 第一次遍历，找到最大最小值
        int size = tupleDesc.numFields();
        TransactionId tid = new TransactionId();
        SeqScan seqScan = new SeqScan(tid, tableid);
        seqScan.open();
        Map<Integer, Integer> minMap = new HashMap<>();
        Map<Integer, Integer> maxMap = new HashMap<>();
        while (seqScan.hasNext()) {
            Tuple tuple = seqScan.next();
            totalTuples++;
            for (int i = 0; i < size; i++) {
                if (tupleDesc.getFieldType(i).equals(Type.INT_TYPE)) {
                    IntField field = (IntField) tuple.getField(i);
                    Integer minVal = minMap.getOrDefault(i, Integer.MAX_VALUE);
                    minMap.put(i, Math.min(minVal, field.getValue()));
                    Integer maxVal = maxMap.getOrDefault(i, Integer.MIN_VALUE);
                    maxMap.put(i, Math.max(maxVal, field.getValue()));
                } else {
                    StringHistogram histogram = stringHistogramMap.getOrDefault(i, new StringHistogram(NUM_HIST_BINS));
                    StringField field = (StringField) tuple.getField(i);
                    histogram.addValue(field.getValue());
                    stringHistogramMap.put(i, histogram);
                }
            }
        }

        // 先实例化每列的Histogram
        // 每列的histogram
        for (int i = 0; i < size; i++) {
            if (minMap.get(i) != null) {
                Integer min = minMap.get(i);
                Integer max = maxMap.get(i);
                intHistogramMap.put(i, new IntHistogram(NUM_HIST_BINS, min, max));
            }
        }
        // 第二次遍历,记录每列的Histogram
        seqScan.rewind();
        while (seqScan.hasNext()) {
            Tuple tuple = seqScan.next();
            for (int i = 0; i < size; i++) {
                if (tupleDesc.getFieldType(i).equals(Type.INT_TYPE)) {
                    IntField field = (IntField) tuple.getField(i);
                    IntHistogram intHistogram = intHistogramMap.get(i);
                    if (intHistogram == null) {
                        throw new IllegalArgumentException("参数错误");
                    }
                    intHistogram.addValue(field.getValue());
                    intHistogramMap.put(i, intHistogram);
                }
            }
        }
        seqScan.close();
    }


    /**
     * Estimates the cost of sequentially scanning the file, given that the cost
     * to read a page is costPerPageIO. You can assume that there are no seeks
     * and that no pages are in the buffer pool.
     *
     * Also, assume that your hard drive can only read entire pages at once, so
     * if the last page of the table only has one tuple on it, it's just as
     * expensive to read as a full page. (Most real hard drives can't
     * efficiently address regions smaller than a page at a time.)
     *
     * @return The estimated cost of scanning the table.
     */
    public double estimateScanCost() {
        // some code goes here
        return numPage * 2 * ioCostPerPage;
    }

    /**
     * This method returns the number of tuples in the relation, given that a
     * predicate with selectivity selectivityFactor is applied.
     *
     * @param selectivityFactor
     *            The selectivity of any predicates over the table
     * @return The estimated cardinality of the scan with the specified
     *         selectivityFactor
     */
    public int estimateTableCardinality(double selectivityFactor) {
        // some code goes here
        return ((int)(totalTuples * selectivityFactor));
    }

    /**
     * The average selectivity of the field under op.
     * @param field
     *        the index of the field
     * @param op
     *        the operator in the predicate
     * The semantic of the method is that, given the table, and then given a
     * tuple, of which we do not know the value of the field, return the
     * expected selectivity. You may estimate this value from the histograms.
     * */
    public double avgSelectivity(int field, Predicate.Op op) {
        // some code goes here
        if(tupleDesc.getFieldType(field).equals(Type.INT_TYPE)){
            return intHistogramMap.get(field).avgSelectivity();
        }else {
            return stringHistogramMap.get(field).avgSelectivity();
        }
    }

    /**
     * Estimate the selectivity of predicate <tt>field op constant</tt> on the
     * table.
     *
     * @param field
     *            The field over which the predicate ranges
     * @param op
     *            The logical operation in the predicate
     * @param constant
     *            The value against which the field is compared
     * @return The estimated selectivity (fraction of tuples that satisfy) the
     *         predicate
     */
    public double estimateSelectivity(int field, Predicate.Op op, Field constant) {
        // some code goes here
        if(tupleDesc.getFieldType(field).equals(Type.INT_TYPE)){
            return intHistogramMap.get(field).estimateSelectivity(op, ((IntField)constant).getValue());
        }else{
            return stringHistogramMap.get(field).estimateSelectivity(op, ((StringField)constant).getValue());
        }
    }

    /**
     * return the total number of tuples in this table
     * */
    public int totalTuples() {
        // some code goes here
        return totalTuples;
    }

}
```

 读懂代码中的注释对写代码更有帮助 

#### 2.2.4、 Join Cardinality

Cardinality 是数据库和数据建模领域的一个重要的基础概念，数据库领域的 Cardinality 表示**去重后唯一值（Unique Values）的数量**，比如 Columns Cardinality 指列包含的不重复值的个数，数据建模中的 Cardinality 表示关系的类型。

上面讨论的连接计划成本的计算方式为`joincost((t1 join t2) join t3)`，为了评估这个表达式，我们需要先估计t1 join t2的元组数ntups。这个连接基数估计问题比过滤器选择性估计问题更难。在本次实验，我们不需要为此做任何特别的事

在实现简单的解决方案时，我们需要记住如下几点：

- 在这个版本的实验中，以下三段是不同的
- 对于等值连接，当一个属性是主键时，连接操作产生的元组数量小于非主键属性的基数
- 对于没有主键的等值连接，很难说清楚输出的元组数量–它可以是两个表的基数乘积的大小(如果两个表都有所有元组的值相同)–或者为0；可以构造一个简单的启发式(比如，两个表中较大的那个表的大小)
- 对于范围扫描，说出准确的元组大小也很难；输出的元组大小应该与输入的元组大小成正比。可以假设距离扫描产生的叉乘是固定的一部分(例如30%)。通常，范围连接的代价应该大于两个大小相同的表的非主键等值连接的代价。

**练习3: Join Cost Estimation**

JoinOptimizer.java类包含对连接排序和计算连接成本的所有方法，在这次练习中，你将会编写估计连接的可选择性和成本的方法：

- 实现estimateJoinCost(LogicalJoinNode j, int card1, int card2, double cost1, double cost2)：该方法估计连接j的成本，其中card1代表左侧输入的基数，card2代表右侧输入的基数(相当于元组数)，扫描左侧输入的成本为cost1，访问右侧输入的成本为cost2；我们可以使用上面提到的公式来估计连接操作的成本
- 实现estimateJoinCardinality(LogicalJoinNode j, int card1, int card2, boolean t1pkey, boolean t2pkey)：该方法估计连接j输出的元组数；card1代表连接左侧输入元组的数量，card2代表连接右侧输入元组的数量，t1pkey和t2pkey代表左侧和右侧的列是否唯一(主键)

通过JoinOptimizerTest.java中的estimateJoinCostTest和estimateJoinCardinality测试代表通过本练习.

```java
package simpledb.optimizer;

import simpledb.common.Database;
import simpledb.ParsingException;
import simpledb.execution.*;
import simpledb.storage.TupleDesc;
import sun.rmi.runtime.Log;

import java.util.*;

import javax.swing.*;
import javax.swing.tree.*;

/**
 * The JoinOptimizer class is responsible for ordering a series of joins
 * optimally, and for selecting the best instantiation of a join for a given
 * logical plan.
 */
public class JoinOptimizer {
    final LogicalPlan p;
    final List<LogicalJoinNode> joins;

    /**
     * Constructor
     *
     * @param p
     *            the logical plan being optimized
     * @param joins
     *            the list of joins being performed
     */
    public JoinOptimizer(LogicalPlan p, List<LogicalJoinNode> joins) {
        this.p = p;
        this.joins = joins;
    }

    /**
     * Return best iterator for computing a given logical join, given the
     * specified statistics, and the provided left and right subplans. Note that
     * there is insufficient information to determine which plan should be the
     * inner/outer here -- because OpIterator's don't provide any cardinality
     * estimates, and stats only has information about the base tables. For this
     * reason, the plan1
     *
     * @param lj
     *            The join being considered
     * @param plan1
     *            The left join node's child
     * @param plan2
     *            The right join node's child
     */
    public static OpIterator instantiateJoin(LogicalJoinNode lj,
                                             OpIterator plan1, OpIterator plan2) throws ParsingException {

        int t1id = 0, t2id = 0;
        OpIterator j;

        try {
            t1id = plan1.getTupleDesc().fieldNameToIndex(lj.f1QuantifiedName);
        } catch (NoSuchElementException e) {
            throw new ParsingException("Unknown field " + lj.f1QuantifiedName);
        }

        if (lj instanceof LogicalSubplanJoinNode) {
            t2id = 0;
        } else {
            try {
                t2id = plan2.getTupleDesc().fieldNameToIndex(
                        lj.f2QuantifiedName);
            } catch (NoSuchElementException e) {
                throw new ParsingException("Unknown field "
                        + lj.f2QuantifiedName);
            }
        }

        JoinPredicate p = new JoinPredicate(t1id, lj.p, t2id);

        if (lj.p == Predicate.Op.EQUALS) {

            try {
                // dynamically load HashEquiJoin -- if it doesn't exist, just
                // fall back on regular join
                Class<?> c = Class.forName("simpledb.execution.HashEquiJoin");
                java.lang.reflect.Constructor<?> ct = c.getConstructors()[0];
                j = (OpIterator) ct
                        .newInstance(new Object[] { p, plan1, plan2 });
            } catch (Exception e) {
                j = new Join(p, plan1, plan2);
            }
        } else {
            j = new Join(p, plan1, plan2);
        }

        return j;

    }

    /**
     * Estimate the cost of a join.
     *
     * The cost of the join should be calculated based on the join algorithm (or
     * algorithms) that you implemented for Lab 2. It should be a function of
     * the amount of data that must be read over the course of the query, as
     * well as the number of CPU opertions performed by your join. Assume that
     * the cost of a single predicate application is roughly 1.
     *
     *
     * @param j
     *            A LogicalJoinNode representing the join operation being
     *            performed.
     * @param card1
     *            Estimated cardinality of the left-hand side of the query
     * @param card2
     *            Estimated cardinality of the right-hand side of the query
     * @param cost1
     *            Estimated cost of one full scan of the table on the left-hand
     *            side of the query
     * @param cost2
     *            Estimated cost of one full scan of the table on the right-hand
     *            side of the query
     * @return An estimate of the cost of this query, in terms of cost1 and
     *         cost2
     */
    public double estimateJoinCost(LogicalJoinNode j, int card1, int card2,
            double cost1, double cost2) {
        if (j instanceof LogicalSubplanJoinNode) {
            // A LogicalSubplanJoinNode represents a subquery.
            // You do not need to implement proper support for these for Lab 3.
            return card1 + cost1 + cost2;
        } else {
            // Insert your code here.
            // HINT: You may need to use the variable "j" if you implemented
            // a join algorithm that's more complicated than a basic
            // nested-loops join.
            /**
             * 其中card1代表左侧输入的基数，card2代表右侧输入的基数(相当于元组数)
             * 扫描左侧输入的成本为cost1，访问右侧输入的成本为cost2；
             * IO总数加CPU总数,card为CPU总数
             */
            return cost1 + card1 * card2 + card1 * cost2;
        }
    }

    /**
     * Estimate the cardinality of a join. The cardinality of a join is the
     * number of tuples produced by the join.
     *
     * @param j
     *            A LogicalJoinNode representing the join operation being
     *            performed.
     * @param card1
     *            Cardinality of the left-hand table in the join
     * @param card2
     *            Cardinality of the right-hand table in the join
     * @param t1pkey
     *            Is the left-hand table a primary-key table?
     * @param t2pkey
     *            Is the right-hand table a primary-key table?
     * @param stats
     *            The table stats, referenced by table names, not alias
     * @return The cardinality of the join
     */
    public int estimateJoinCardinality(LogicalJoinNode j, int card1, int card2,
            boolean t1pkey, boolean t2pkey, Map<String, TableStats> stats) {
        if (j instanceof LogicalSubplanJoinNode) {
            // A LogicalSubplanJoinNode represents a subquery.
            // You do not need to implement proper support for these for Lab 3.
            return card1;
        } else {
            return estimateTableJoinCardinality(j.p, j.t1Alias, j.t2Alias,
                    j.f1PureName, j.f2PureName, card1, card2, t1pkey, t2pkey,
                    stats, p.getTableAliasToIdMapping());
        }
    }

    /**
     * Estimate the join cardinality of two tables.
     * */
    public static int estimateTableJoinCardinality(Predicate.Op joinOp,
                                                   String table1Alias, String table2Alias, String field1PureName,
                                                   String field2PureName, int card1, int card2, boolean t1pkey,
                                                   boolean t2pkey, Map<String, TableStats> stats,
                                                   Map<String, Integer> tableAliasToId) {
        int card = 1;
        // some code goes here
        switch (joinOp) {
            case EQUALS:
                if (t1pkey && !t2pkey) {
                    card = card2;
                } else if (!t1pkey && t2pkey) {
                    card = card1;
                } else if (t1pkey && t2pkey) {
                    card = Math.min(card1, card2);
                } else {
                    card = Math.max(card1, card2);
                }
                break;
            case NOT_EQUALS:
                //使用记录总数-等值记录数的方法去算
                if (t1pkey && !t2pkey) {
                    card = card1 * card2 - card2;
                } else if (!t1pkey && t2pkey) {
                    card = card1 * card2 - card1;
                } else if (t1pkey && t2pkey) {
                    card = card1 * card2 - Math.min(card1, card2);
                } else {
                    card = card1 * card2 - Math.max(card1, card2);
                }
                break;
            default:
                //其它记录按范围查询来算
                card = (int) (0.3 * card1 * card2);
        }
        return card <= 0 ? 1 : card;
    }

    /**
     * Helper method to enumerate all of the subsets of a given size of a
     * specified vector.
     *
     * @param v
     *            The vector whose subsets are desired
     * @param size
     *            The size of the subsets of interest
     * @return a set of all subsets of the specified size
     */
    public <T> Set<Set<T>> enumerateSubsets(List<T> v, int size) {
        Set<Set<T>> els = new HashSet<>();
//        els.add(new HashSet<>());
        // Iterator<Set> it;
        // long start = System.currentTimeMillis();
        dfs(v, size, 0, els, new ArrayDeque<>());
        return els;
//        for (int i = 0; i < size; i++) {
//            Set<Set<T>> newels = new HashSet<>();
//            for (Set<T> s : els) {
//                for (T t : v) {
//                    Set<T> news = new HashSet<>(s);
//                    if (news.add(t))
//                        newels.add(news);
//                }
//            }
//            els = newels;
//        }
//
//        return els;

    }
    public <T> void dfs(List<T> list, int size, int begin, Set<Set<T>> res, Deque<T> path){
        if(path.size() == size){
            res.add(new HashSet<>(path));
        }
        for(int i = begin; i < list.size(); i++){
            path.addLast(list.get(i));
            dfs(list, size, i + 1,res, path);
            path.removeLast();
        }
    }

    /**
     * Compute a logical, reasonably efficient join on the specified tables. See
     * PS4 for hints on how this should be implemented.
     *
     * @param stats
     *            Statistics for each table involved in the join, referenced by
     *            base table names, not alias
     * @param filterSelectivities
     *            Selectivities of the filter predicates on each table in the
     *            join, referenced by table alias (if no alias, the base table
     *            name)
     * @param explain
     *            Indicates whether your code should explain its query plan or
     *            simply execute it
     * @return A List<LogicalJoinNode> that stores joins in the left-deep
     *         order in which they should be executed.
     * @throws ParsingException
     *             when stats or filter selectivities is missing a table in the
     *             join, or or when another internal error occurs
     */
    public List<LogicalJoinNode> orderJoins(
            Map<String, TableStats> stats,
            Map<String, Double> filterSelectivities, boolean explain)
            throws ParsingException {

        // some code goes here
        //Replace the following
        PlanCache planCache = new PlanCache();
        CostCard bestCostCard = new CostCard();
        int size = joins.size();
        for(int i = 1; i <= size; i++){
            //找出size的所有子集
            Set<Set<LogicalJoinNode>> subsets = enumerateSubsets(joins, i);
            for(Set<LogicalJoinNode> subset: subsets){
                double bestCost = Double.MAX_VALUE;
                for(LogicalJoinNode joinNode : subset){
                    //找出最优的方案：依据planCache和计算subset - joinNode的最优值,动态规划类似的做法
                    CostCard costCard = computeCostAndCardOfSubplan(stats, filterSelectivities,
                            joinNode, subset, bestCost, planCache);
                    if(costCard == null){
                        continue;
                    }
                    bestCost = costCard.cost;
                    bestCostCard = costCard;
                }
                if(bestCost != Double.MAX_VALUE){
                    planCache.addPlan(subset, bestCostCard.cost, bestCostCard.card, bestCostCard.plan);
                }
            }
        }
        if(explain){
            printJoins(bestCostCard.plan, planCache, stats, filterSelectivities);
        }
        return bestCostCard.plan;
        //7s到5s
    }

    // ===================== Private Methods =================================

    /**
     * This is a helper method that computes the cost and cardinality of joining
     * joinToRemove to joinSet (joinSet should contain joinToRemove), given that
     * all of the subsets of size joinSet.size() - 1 have already been computed
     * and stored in PlanCache pc.
     *
     * @param stats
     *            table stats for all of the tables, referenced by table names
     *            rather than alias (see {@link #orderJoins})
     * @param filterSelectivities
     *            the selectivities of the filters over each of the tables
     *            (where tables are indentified by their alias or name if no
     *            alias is given)
     * @param joinToRemove
     *            the join to remove from joinSet
     * @param joinSet
     *            the set of joins being considered
     * @param bestCostSoFar
     *            the best way to join joinSet so far (minimum of previous
     *            invocations of computeCostAndCardOfSubplan for this joinSet,
     *            from returned CostCard)
     * @param pc
     *            the PlanCache for this join; should have subplans for all
     *            plans of size joinSet.size()-1
     * @return A {@link CostCard} objects desribing the cost, cardinality,
     *         optimal subplan
     * @throws ParsingException
     *             when stats, filterSelectivities, or pc object is missing
     *             tables involved in join
     */
    @SuppressWarnings("unchecked")
    private CostCard computeCostAndCardOfSubplan(
            Map<String, TableStats> stats,
            Map<String, Double> filterSelectivities,
            LogicalJoinNode joinToRemove, Set<LogicalJoinNode> joinSet,
            double bestCostSoFar, PlanCache pc) throws ParsingException {

        LogicalJoinNode j = joinToRemove;

        List<LogicalJoinNode> prevBest;

        if (this.p.getTableId(j.t1Alias) == null)
            throw new ParsingException("Unknown table " + j.t1Alias);
        if (this.p.getTableId(j.t2Alias) == null)
            throw new ParsingException("Unknown table " + j.t2Alias);

        String table1Name = Database.getCatalog().getTableName(
                this.p.getTableId(j.t1Alias));
        String table2Name = Database.getCatalog().getTableName(
                this.p.getTableId(j.t2Alias));
        String table1Alias = j.t1Alias;
        String table2Alias = j.t2Alias;

        Set<LogicalJoinNode> news = new HashSet<>(joinSet);
        news.remove(j);

        double t1cost, t2cost;
        int t1card, t2card;
        boolean leftPkey, rightPkey;

        if (news.isEmpty()) { // base case -- both are base relations
            prevBest = new ArrayList<>();
            t1cost = stats.get(table1Name).estimateScanCost();
            t1card = stats.get(table1Name).estimateTableCardinality(
                    filterSelectivities.get(j.t1Alias));
            leftPkey = isPkey(j.t1Alias, j.f1PureName);

            t2cost = table2Alias == null ? 0 : stats.get(table2Name)
                    .estimateScanCost();
            t2card = table2Alias == null ? 0 : stats.get(table2Name)
                    .estimateTableCardinality(
                            filterSelectivities.get(j.t2Alias));
            rightPkey = table2Alias != null && isPkey(table2Alias,
                    j.f2PureName);
        } else {
            // news is not empty -- figure best way to join j to news
            prevBest = pc.getOrder(news);

            // possible that we have not cached an answer, if subset
            // includes a cross product
            if (prevBest == null) {
                return null;
            }

            double prevBestCost = pc.getCost(news);
            int bestCard = pc.getCard(news);

            // estimate cost of right subtree
            if (doesJoin(prevBest, table1Alias)) { // j.t1 is in prevBest
                t1cost = prevBestCost; // left side just has cost of whatever
                                       // left
                // subtree is
                t1card = bestCard;
                leftPkey = hasPkey(prevBest);

                t2cost = j.t2Alias == null ? 0 : stats.get(table2Name)
                        .estimateScanCost();
                t2card = j.t2Alias == null ? 0 : stats.get(table2Name)
                        .estimateTableCardinality(
                                filterSelectivities.get(j.t2Alias));
                rightPkey = j.t2Alias != null && isPkey(j.t2Alias,
                        j.f2PureName);
            } else if (doesJoin(prevBest, j.t2Alias)) { // j.t2 is in prevbest
                                                        // (both
                // shouldn't be)
                t2cost = prevBestCost; // left side just has cost of whatever
                                       // left
                // subtree is
                t2card = bestCard;
                rightPkey = hasPkey(prevBest);
                t1cost = stats.get(table1Name).estimateScanCost();
                t1card = stats.get(table1Name).estimateTableCardinality(
                        filterSelectivities.get(j.t1Alias));
                leftPkey = isPkey(j.t1Alias, j.f1PureName);

            } else {
                // don't consider this plan if one of j.t1 or j.t2
                // isn't a table joined in prevBest (cross product)
                return null;
            }
        }

        // case where prevbest is left
        double cost1 = estimateJoinCost(j, t1card, t2card, t1cost, t2cost);

        LogicalJoinNode j2 = j.swapInnerOuter();
        double cost2 = estimateJoinCost(j2, t2card, t1card, t2cost, t1cost);
        if (cost2 < cost1) {
            boolean tmp;
            j = j2;
            cost1 = cost2;
            tmp = rightPkey;
            rightPkey = leftPkey;
            leftPkey = tmp;
        }
        if (cost1 >= bestCostSoFar)
            return null;

        CostCard cc = new CostCard();

        cc.card = estimateJoinCardinality(j, t1card, t2card, leftPkey,
                rightPkey, stats);
        cc.cost = cost1;
        cc.plan = new ArrayList<>(prevBest);
        cc.plan.add(j); // prevbest is left -- add new join to end
        return cc;
    }

    /**
     * Return true if the specified table is in the list of joins, false
     * otherwise
     */
    private boolean doesJoin(List<LogicalJoinNode> joinlist, String table) {
        for (LogicalJoinNode j : joinlist) {
            if (j.t1Alias.equals(table)
                    || (j.t2Alias != null && j.t2Alias.equals(table)))
                return true;
        }
        return false;
    }

    /**
     * Return true if field is a primary key of the specified table, false
     * otherwise
     *
     * @param tableAlias
     *            The alias of the table in the query
     * @param field
     *            The pure name of the field
     */
    private boolean isPkey(String tableAlias, String field) {
        int tid1 = p.getTableId(tableAlias);
        String pkey1 = Database.getCatalog().getPrimaryKey(tid1);

        return pkey1.equals(field);
    }

    /**
     * Return true if a primary key field is joined by one of the joins in
     * joinlist
     */
    private boolean hasPkey(List<LogicalJoinNode> joinlist) {
        for (LogicalJoinNode j : joinlist) {
            if (isPkey(j.t1Alias, j.f1PureName)
                    || (j.t2Alias != null && isPkey(j.t2Alias, j.f2PureName)))
                return true;
        }
        return false;

    }

    /**
     * Helper function to display a Swing window with a tree representation of
     * the specified list of joins. See {@link #orderJoins}, which may want to
     * call this when the analyze flag is true.
     *
     * @param js
     *            the join plan to visualize
     * @param pc
     *            the PlanCache accumulated whild building the optimal plan
     * @param stats
     *            table statistics for base tables
     * @param selectivities
     *            the selectivities of the filters over each of the tables
     *            (where tables are indentified by their alias or name if no
     *            alias is given)
     */
    private void printJoins(List<LogicalJoinNode> js, PlanCache pc,
            Map<String, TableStats> stats,
            Map<String, Double> selectivities) {

        JFrame f = new JFrame("Join Plan for " + p.getQuery());

        // Set the default close operation for the window,
        // or else the program won't exit when clicking close button
        f.setDefaultCloseOperation(WindowConstants.DISPOSE_ON_CLOSE);

        f.setVisible(true);

        f.setSize(300, 500);

        Map<String, DefaultMutableTreeNode> m = new HashMap<>();

        // int numTabs = 0;

        // int k;
        DefaultMutableTreeNode root = null, treetop = null;
        HashSet<LogicalJoinNode> pathSoFar = new HashSet<>();
        boolean neither;

        System.out.println(js);
        for (LogicalJoinNode j : js) {
            pathSoFar.add(j);
            System.out.println("PATH SO FAR = " + pathSoFar);

            String table1Name = Database.getCatalog().getTableName(
                    this.p.getTableId(j.t1Alias));
            String table2Name = Database.getCatalog().getTableName(
                    this.p.getTableId(j.t2Alias));

            // Double c = pc.getCost(pathSoFar);
            neither = true;

            root = new DefaultMutableTreeNode("Join " + j + " (Cost ="
                    + pc.getCost(pathSoFar) + ", card = "
                    + pc.getCard(pathSoFar) + ")");
            DefaultMutableTreeNode n = m.get(j.t1Alias);
            if (n == null) { // never seen this table before
                n = new DefaultMutableTreeNode(j.t1Alias
                        + " (Cost = "
                        + stats.get(table1Name).estimateScanCost()
                        + ", card = "
                        + stats.get(table1Name).estimateTableCardinality(
                                selectivities.get(j.t1Alias)) + ")");
                root.add(n);
            } else {
                // make left child root n
                root.add(n);
                neither = false;
            }
            m.put(j.t1Alias, root);

            n = m.get(j.t2Alias);
            if (n == null) { // never seen this table before

                n = new DefaultMutableTreeNode(
                        j.t2Alias == null ? "Subplan"
                                : (j.t2Alias
                                        + " (Cost = "
                                        + stats.get(table2Name)
                                                .estimateScanCost()
                                        + ", card = "
                                        + stats.get(table2Name)
                                                .estimateTableCardinality(
                                                        selectivities
                                                                .get(j.t2Alias)) + ")"));
                root.add(n);
            } else {
                // make right child root n
                root.add(n);
                neither = false;
            }
            m.put(j.t2Alias, root);

            // unless this table doesn't join with other tables,
            // all tables are accessed from root
            if (!neither) {
                for (String key : m.keySet()) {
                    m.put(key, root);
                }
            }

            treetop = root;
        }

        JTree tree = new JTree(treetop);
        JScrollPane treeView = new JScrollPane(tree);

        tree.setShowsRootHandles(true);

        // Set the icon for leaf nodes.
        ImageIcon leafIcon = new ImageIcon("join.jpg");
        DefaultTreeCellRenderer renderer = new DefaultTreeCellRenderer();
        renderer.setOpenIcon(leafIcon);
        renderer.setClosedIcon(leafIcon);

        tree.setCellRenderer(renderer);

        f.setSize(300, 500);

        f.add(treeView);
        for (int i = 0; i < tree.getRowCount(); i++) {
            tree.expandRow(i);
        }

        if (js.size() == 0) {
            f.add(new JLabel("No joins in plan."));
        }

        f.pack();

    }

}
```

 如果读懂了本节列举的三点注意事项，就能实现estimateTableJoinCardinality方法 .

### 2.3、连接排序

目前我们已经实现了成本估计的方法，接下来将要多查询计划进行优化。对于这些方法，连接表现为连接节点的列表，而不是类中描述的连接关系的列表

将课件中的算法翻译成伪代码如下：

```java
1. j = set of join nodes
2. for (i in 1...|j|):
3.     for s in {all length i subsets of j}
4.       bestPlan = {}
5.       for s' in {all length d-1 subsets of s}
6.            subplan = optjoin(s')
7.            plan = best way to join (s-s') to subplan
8.            if (cost(plan) < cost(bestPlan))
9.               bestPlan = plan
10.      optjoin(s) = bestPlan
11. return optjoin(j)
```



源码中已经提供了一些类和方法来帮助我们实现上述算法

首先，JoinOptimizer.java中方法：enumeraterSubsets(List v, int size)为我们返回列表v的大小为size的子集。但是该方法的效率较低，不适用于大型集合，我们可以修改为更加便捷的方式，例如使用递归+回溯的方式求子集，具体可以参考leetcode

其次，源码中还提供了如下方法：

```java
private CostCard computeCostAndCardOfSubplan(
            Map<String, TableStats> stats,
            Map<String, Double> filterSelectivities,
            LogicalJoinNode joinToRemove, Set<LogicalJoinNode> joinSet,
            double bestCostSoFar, PlanCache pc) throws ParsingException
```

给出连接的子集`joinSet`，以及需要从集合中移除的连接`joinToRemove`，该方法计算将`joinToRemove`加入到`joinSet-{joinToRemove}`的最佳排序方式。它返回CostCard对象，该对象包含成本、基数和最佳的连接顺序(以列表形式返回)。

如果无法找到最优的计划(例如，没有最左连接是可能的）,`computeCostAndCardOfSubplan`方法可能返回null，或者所有计划的成本均大于`bestCostSoFar`参数。该方法通过参数planCache(先前以排序连接的缓存)来快速查找将将`joinToRemove`加入到`joinSet-{joinToRemove}`的最快方法。其他参数(stats & filterSelectivities)是我们在练习4中实现的orderJoins方法传递过来的.

此外，源码中还提供printJoins方法：

```java
private void printJoins(List<LogicalJoinNode> js, PlanCache pc,
            Map<String, TableStats> stats,
            Map<String, Double> selectivities)
```

该方法主要用于以图的形式展示连接计划

最后，源码中还提供了PlanCache类，该类能缓存连接子集的最佳排序方式(它的实例被用于方法：computeCostAndCardOfSubplan).

**练习4: Join Ordering**

 在JoinOptimizer.java中，实现下述方法： 

```java
List<LogicalJoinNode> orderJoins(Map<String, TableStats> stats, 
                   Map<String, Double> filterSelectivities,  
                   boolean explain)
```

该方法应该对连接类成员进行操作，并且返回指定连接执行顺序的新列表。列表中的第一号元素代表执行计划的最左侧、最底层的操作。返回列表中的相邻连接应该至少共享一个字段，以确保计划是左深的。`stats`对象帮助我们找到查询计划中出现的表的`TableStats`，`filterSelectivities`允许我们找到表上任何谓词的可选择性；它保证`From`列表中的每张表都有一个条目。最后，explain参数表示我们是否应该输出连接顺序(也就是是否调用printJoins方法)

我们实现该方法时需要使用上面提到的协助我们实现的方法。粗略地讲，我们的实现应该遵循上面的伪代码，遍历子集大小、子集和子集的子计划，调用computeCostAndCardOfSubplan方法并构建一个PlanCache对象，该对象存储执行每个子集连接的最小成本方法

通过单元测试JoinOptimizerTest和系统测试QueryTest证明我们通过练习4,代码见上述。



## 3、总结

一定要从整体架构上来看，详细仔细看文档.第一次做实验前一头雾水，当多读文档补充相关知识后就会变得容易.