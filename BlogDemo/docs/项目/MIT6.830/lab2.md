---
title: MIT数据库Lab2实验报告
publish: false
---

 **课程源码(包含各Lab讲义)**：[MIT-DB-Class/simple-db-hw-2021 (github.com)](https://github.com/MIT-DB-Class/simple-db-hw-2021) 

> 课程内容非mit学生只能查看PDF以及PPT，如果熟悉数据库的基本概念可以不看这些文档，只实现lab即可；如果想深入了解数据库的基本概念，可以参考一下b站课程cs15-445，个人感觉这门课程讲的很不错，基本能符合6.830的各个实验阶段所需要的知识

## 1、开始

 lab2必须在lab1提交的代码基础上进行开发，否则无法完成相应的练习。此外，实验还提供了源码中不存在的额外测试文件。 

### 1.1实现提示

开始编写代码之前，强烈建议通读整篇文档，以对SimpleDB的设计有个整体的认识，对于我们编写代码非常有帮助

建议跟着文档的练习来实现对应的代码，每个练习都标明了要实现哪个类以及通过哪些单元测试，跟着练习走即可。

下面是本实验的大致流程：

- 实现Filter和Join操作并且通过相关的单元测试验证你的实现，阅读类的Javadoc将会帮助我们实现。项目中已经提供了Project和OrderBy操作的实现，阅读其代码能够帮助我们理解其他操作是如何实现的
- 实现IntegerAggregator和StringAggregator，你将会编写对元组的某一特定列分组进行聚合操作；其中integer支持求和、求最大最小值、求数量、求平均值，string只支持count聚合操作
- 实现Aggregate操作；同其他操作一样，聚合操作也实现类OpIterator接口。注意每次调用next()的Aggregate操作的输出是整个分组的聚合值，Aggregate构造函数将会设置聚合和分组操作对应的列
- 实现BufferPool类中的插入、删除和页面丢弃策略，暂时不需要关心事务
- 实现Insert和Delete操作；与所有的操作相似，Insert和Delete实现OpIterator接口，接收用于插入或者删除的元组并输出该操作影响的元组个数；这些操作将会调用BufferPool中合适的方法用于修改磁盘上的页

注意SimpleDB没有实现一致性和完整性检查，所以它可能会插入重复的记录，并且没有方法保证主键或外键的一致性

在本节实现的基础上，我们需要使用项目提供的SQL解析器去运行SQL语句查询

最后，你可能会发现本实验的操作扩展Operator类而不是实现OpIterator接口。因为next/hasNext的实现总是重复的、烦人的，Operator实现了通用的逻辑操作，并且仅需要实现readNext方法。可以随意使用这种风格，或者使用OpIterator。如果要实现OpIterator接口，请移除extends Operator，并替换为implements OpIterator.



## 2、实验指导

### 2.1 Filter and Join

本节将会实现比扫描整张表更有趣的操作：

- Filter：该操作仅返回满足(构造时指定的)Predicate操作的元组；因此，它会过滤那些不符合操作的元组
- Join：该操作将会通过(构造时指定的)JoinPredicate联合两个表的元组，Join操作仅需实现一个简单的嵌套循环连接

**练习1**

实现如下类中的方法：

- src/java/simpledb/execution/Predicate.java
- src/java/simpledb/execution/JoinPredicate.java
- src/java/simpledb/execution/Filter.java
- src/java/simpledb/execution/Join.java

```java
package simpledb.execution;

import simpledb.storage.Field;
import simpledb.storage.Tuple;

import java.io.Serializable;

/**
 * Predicate compares tuples to a specified Field value.
 */
public class Predicate implements Serializable {

    private static final long serialVersionUID = 1L;

    private final int field;
    private final Op op;
    private Field operand;

    /** Constants used for return codes in Field.compare */
    public enum Op implements Serializable {
        EQUALS, GREATER_THAN, LESS_THAN, LESS_THAN_OR_EQ, GREATER_THAN_OR_EQ, LIKE, NOT_EQUALS;

        /**
         * Interface to access operations by integer value for command-line
         * convenience.
         * 
         * @param i
         *            a valid integer Op index
         */
        public static Op getOp(int i) {
            return values()[i];
        }

        public String toString() {
            if (this == EQUALS)
                return "=";
            if (this == GREATER_THAN)
                return ">";
            if (this == LESS_THAN)
                return "<";
            if (this == LESS_THAN_OR_EQ)
                return "<=";
            if (this == GREATER_THAN_OR_EQ)
                return ">=";
            if (this == LIKE)
                return "LIKE";
            if (this == NOT_EQUALS)
                return "<>";
            throw new IllegalStateException("impossible to reach here");
        }

    }
    
    /**
     * Constructor.
     * 
     * @param field
     *            field number of passed in tuples to compare against.
     * @param op
     *            operation to use for comparison
     * @param operand
     *            field value to compare passed in tuples to
     */
    public Predicate(int field, Op op, Field operand) {
        // some code goes here
        this.field = field;
        this.op = op;
        this.operand = operand;
    }

    /**
     * @return the field number
     */
    public int getField()
    {
        // some code goes here
        return field;
    }

    /**
     * @return the operator
     */
    public Op getOp()
    {
        // some code goes here
        return op;
    }
    
    /**
     * @return the operand
     */
    public Field getOperand()
    {
        // some code goes here
        return operand;
    }
    
    /**
     * Compares the field number of t specified in the constructor to the
     * operand field specified in the constructor using the operator specific in
     * the constructor. The comparison can be made through Field's compare
     * method.
     * 
     * @param t
     *            The tuple to compare against
     * @return true if the comparison is true, false otherwise.
     */
    public boolean filter(Tuple t) {

        return t.getField(field).compare(op, operand);
    }

    /**
     * Returns something useful, like "f = field_id op = op_string operand =
     * operand_string"
     */
    public String toString() {
        // some code goes here
        return "f = " + field + " op = " + op.toString() + " operand = " + operand.toString();
    }
}


package simpledb.execution;

import simpledb.storage.Field;
import simpledb.storage.Tuple;

import java.io.Serializable;

/**
 * JoinPredicate compares fields of two tuples using a predicate. JoinPredicate
 * is most likely used by the Join operator.
 */
public class JoinPredicate implements Serializable {

    private static final long serialVersionUID = 1L;

    private final int field1;
    private final int field2;
    private final Predicate.Op op;
    /**
     * Constructor -- create a new predicate over two fields of two tuples.
     * 
     * @param field1
     *            The field index into the first tuple in the predicate
     * @param field2
     *            The field index into the second tuple in the predicate
     * @param op
     *            The operation to apply (as defined in Predicate.Op); either
     *            Predicate.Op.GREATER_THAN, Predicate.Op.LESS_THAN,
     *            Predicate.Op.EQUAL, Predicate.Op.GREATER_THAN_OR_EQ, or
     *            Predicate.Op.LESS_THAN_OR_EQ
     * @see Predicate
     */
    public JoinPredicate(int field1, Predicate.Op op, int field2) {
        // some code goes here
        this.field1 = field1;
        this.field2 = field2;
        this.op = op;
    }

    /**
     * Apply the predicate to the two specified tuples. The comparison can be
     * made through Field's compare method.
     * 
     * @return true if the tuples satisfy the predicate.
     */
    public boolean filter(Tuple t1, Tuple t2) {
        // some code goes here
        return t1.getField(field1).compare(op,t2.getField(field2));
    }
    
    public int getField1()
    {
        // some code goes here
        return field1;
    }
    
    public int getField2()
    {
        // some code goes here
        return field2;
    }
    
    public Predicate.Op getOperator()
    {
        // some code goes here
        return op;
    }
}


package simpledb.execution;

import simpledb.transaction.TransactionAbortedException;
import simpledb.common.DbException;
import simpledb.storage.Tuple;
import simpledb.storage.TupleDesc;

import java.util.*;

/**
 * Filter is an operator that implements a relational select.
 */
public class Filter extends Operator {

    private static final long serialVersionUID = 1L;
    private final Predicate p;
    private OpIterator child;

    /**
     * Constructor accepts a predicate to apply and a child operator to read
     * tuples to filter from.
     * 
     * @param p
     *            The predicate to filter tuples with
     * @param child
     *            The child operator
     */
    public Filter(Predicate p, OpIterator child) {
        // some code goes here
        this.p = p;
        this.child = child;
    }

    public Predicate getPredicate() {
        // some code goes here
        return p;
    }

    public TupleDesc getTupleDesc() {
        // some code goes here
        return child.getTupleDesc();
    }

    public void open() throws DbException, NoSuchElementException,
            TransactionAbortedException {
        // some code goes here
        child.open();
        super.open();
    }

    public void close() {
        // some code goes here
        super.close();
        child.close();
    }

    public void rewind() throws DbException, TransactionAbortedException {
        // some code goes here
        child.rewind();
    }

    /**
     * AbstractDbIterator.readNext implementation. Iterates over tuples from the
     * child operator, applying the predicate to them and returning those that
     * pass the predicate (i.e. for which the Predicate.filter() returns true.)
     * 
     * @return The next tuple that passes the filter, or null if there are no
     *         more tuples
     * @see Predicate#filter
     */
    protected Tuple fetchNext() throws NoSuchElementException,
            TransactionAbortedException, DbException {
        // some code goes here
        while(child.hasNext()){
            Tuple tuple = child.next();
            if(p.filter(tuple)){
                return tuple;
            }
        }
        return null;
    }

    @Override
    public OpIterator[] getChildren() {
        // some code goes here
        return new OpIterator[]{this.child};
    }

    @Override
    public void setChildren(OpIterator[] children) {
        // some code goes here
        this.child = children[0];
    }

}


package simpledb.execution;

import simpledb.transaction.TransactionAbortedException;
import simpledb.common.DbException;
import simpledb.storage.Tuple;
import simpledb.storage.TupleDesc;

import java.util.*;

/**
 * The Join operator implements the relational join operation.
 */
public class Join extends Operator {

    private static final long serialVersionUID = 1L;

    private final JoinPredicate joinPredicate;
    private OpIterator child1;
    private OpIterator child2;
    //临时元组，保存上次迭代用的child1的Tuple
    private Tuple t;
    /**
     * Constructor. Accepts two children to join and the predicate to join them
     * on
     * 
     * @param p
     *            The predicate to use to join the children
     * @param child1
     *            Iterator for the left(outer) relation to join
     * @param child2
     *            Iterator for the right(inner) relation to join
     */
    public Join(JoinPredicate p, OpIterator child1, OpIterator child2) {
        // some code goes here
        this.joinPredicate = p;
        this.child1 = child1;
        this.child2 = child2;
    }

    public JoinPredicate getJoinPredicate() {
        // some code goes here
        return joinPredicate;
    }

    /**
     * @return
     *       the field name of join field1. Should be quantified by
     *       alias or table name.
     * */
    public String getJoinField1Name() {
        // some code goes here
        return child1.getTupleDesc().getFieldName(joinPredicate.getField1());
    }

    /**
     * @return
     *       the field name of join field2. Should be quantified by
     *       alias or table name.
     * */
    public String getJoinField2Name() {
        // some code goes here
        return child2.getTupleDesc().getFieldName(joinPredicate.getField2());
    }

    /**
     * @see TupleDesc#merge(TupleDesc, TupleDesc) for possible
     *      implementation logic.
     */
    public TupleDesc getTupleDesc() {
        // some code goes here
        return TupleDesc.merge(child1.getTupleDesc(), child2.getTupleDesc());
    }

    public void open() throws DbException, NoSuchElementException,
            TransactionAbortedException {
        // some code goes here
        child1.open();
        child2.open();
        super.open();
    }

    public void close() {
        // some code goes here
        super.close();
        child2.close();
        child1.close();
    }

    public void rewind() throws DbException, TransactionAbortedException {
        // some code goes here
        child1.rewind();
        child2.rewind();
        t = null;
    }

    /**
     * Returns the next tuple generated by the join, or null if there are no
     * more tuples. Logically, this is the next tuple in r1 cross r2 that
     * satisfies the join predicate. There are many possible implementations;
     * the simplest is a nested loops join.
     * <p>
     * Note that the tuples returned from this particular implementation of Join
     * are simply the concatenation of joining tuples from the left and right
     * relation. Therefore, if an equality predicate is used there will be two
     * copies of the join attribute in the results. (Removing such duplicate
     * columns can be done with an additional projection operator if needed.)
     * <p>
     * For example, if one tuple is {1,2,3} and the other tuple is {1,5,6},
     * joined on equality of the first column, then this returns {1,2,3,1,5,6}.
     * 
     * @return The next matching tuple.
     * @see JoinPredicate#filter
     */
    protected Tuple fetchNext() throws TransactionAbortedException, DbException {
        // some code goes here
        //t可能是笛卡尔积
        while(child1.hasNext() || t != null){
            if(child1.hasNext() && t == null){
                t = child1.next();
            }
            while(child2.hasNext()){
                Tuple t2 = child2.next();
                if(joinPredicate.filter(t, t2)){
                    TupleDesc td1 = t.getTupleDesc();
                    TupleDesc td2 = t2.getTupleDesc();
                    //合并
                    TupleDesc tupleDesc = TupleDesc.merge(td1, td2);
                    //创建新的行
                    Tuple newTuple = new Tuple(tupleDesc);
                    //合并
                    newTuple.setRecordId(t.getRecordId());
                    int i = 0;
                    for(; i < td1.numFields(); i++){
                        newTuple.setField(i, t.getField(i));
                    }
                    for(int j = 0; j < td2.numFields(); j++){
                        newTuple.setField(i + j, t2.getField(j));
                    }
                    //遍历t2后重置，准备遍历下一个t
                    if(!child2.hasNext()){
                        child2.rewind();
                        t = null;
                    }
                    return newTuple;
                }
            }
            child2.rewind();
            t = null;
        }
        return null;
    }

    @Override
    public OpIterator[] getChildren() {
        // some code goes here
        return new OpIterator[]{child1, child2};
    }

    @Override
    public void setChildren(OpIterator[] children) {
        // some code goes here
        child1 = children[0];
        child2 = children[1];
    }

}
```



完成本节练习之后，需要通过PredicateTest, JoinPredicateTest, FilterTest, JoinTest单元测试；并通过FilterTest和JoinTest系统测试 

### 2.2 Aggregates

本节我们应该实现如下五种聚合操作：count、sum、avg、min、max，并且支持分组聚合操作。仅支持对一个域进行聚合，对一个域进行分组即可

为了实现聚合操作，我们使用Aggregator接口将新的元组合并到现有的聚合操作结果中，实际进行哪种聚合操作会在构造Aggregate时指明。所以，客户端代码需要为子操作的每个元组调用`Aggregator.mergeTupleIntoGroup()`方法，当所有的元组都被合并完成以后，客户端将会获得聚合操作的结果。如果指定分组的话，那么返回结果格式为:`(groupValue, aggregateValue)`；没有指定分组的话，返回格式为：`(aggregateValue)`

本节实验中，我们不需要担心分组的数量超过可用内存的限制。

**练习2**

实现如下类中的方法：

- src/java/simpledb/execution/IntegerAggregator.java
- src/java/simpledb/execution/StringAggregator.java
- src/java/simpledb/execution/Aggregate.java

```java
package simpledb.execution;

import simpledb.common.Type;
import simpledb.storage.*;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Knows how to compute some aggregate over a set of IntFields.
 */
public class IntegerAggregator implements Aggregator {

    private static final long serialVersionUID = 1L;
    // 分组字段的序号（是一个字段，用于辨别是否是该类型）举例：group by 字段
    private int gbfield;
    private Type gbfieldtype;
    // 聚合字段的序号（是用于取新插入的值） 举例： sum(字段),min(字段)
    private int afield;
    private Op what;

    private AggHandler aggHandler;
    private abstract class AggHandler{
        //存储对应的聚合结果
        Map<Field, Integer> aggResult;
        //gbfield用于分组的字段,aggField现在聚合结果
        abstract void handle(Field gbField, IntField aggField);
        public AggHandler(){
            aggResult = new HashMap<>();
        }
        public Map<Field, Integer> getAggResult(){
            return aggResult;
        }
    }
    private class MinHandler extends AggHandler{

        @Override
        void handle(Field gbField, IntField aggField) {
            int value = aggField.getValue();
            if(aggResult.containsKey(gbField)){
                aggResult.put(gbField, Math.min(aggResult.get(gbField), value));
            }else{
                aggResult.put(gbField,value);
            }
        }
    }
    private class MaxHandler extends AggHandler{

        @Override
        void handle(Field gbField, IntField aggField) {
            int value = aggField.getValue();
            if(aggResult.containsKey(gbField)){
                aggResult.put(gbField, Math.max(aggResult.get(gbField), value));
            }else{
                aggResult.put(gbField,value);
            }
        }
    }

    private class AvgHandler extends AggHandler{
        Map<Field, Integer> sum = new HashMap<>();
        Map<Field, Integer> count = new HashMap<>();
        @Override
        void handle(Field gbField, IntField aggField) {
            int value = aggField.getValue();
            //求和加计数
            if(sum.containsKey(gbField) && count.containsKey(gbField)){
                sum.put(gbField, sum.get(gbField) + value);
                count.put(gbField, count.get(gbField) + 1);
            }else{
                sum.put(gbField, value);
                count.put(gbField, 1);
            }
            aggResult.put(gbField, sum.get(gbField) / count.get(gbField));
        }
    }
    private class SumHandler extends AggHandler{

        @Override
        void handle(Field gbField, IntField aggField) {
            int value = aggField.getValue();
            if(aggResult.containsKey(gbField)){
                aggResult.put(gbField, aggResult.get(gbField) + value);
            }else{
                aggResult.put(gbField, value);
            }
        }
    }
    private class CountHandler extends AggHandler{

        @Override
        void handle(Field gbField, IntField aggField) {
            if(aggResult.containsKey(gbField)){
                aggResult.put(gbField, aggResult.get(gbField) + 1);
            }else{
                aggResult.put(gbField, 1);
            }
        }
    }
    /**
     * Aggregate constructor
     * 
     * @param gbfield
     *            the 0-based index of the group-by field in the tuple, or
     *            NO_GROUPING if there is no grouping
     * @param gbfieldtype
     *            the type of the group by field (e.g., Type.INT_TYPE), or null
     *            if there is no grouping
     * @param afield
     *            the 0-based index of the aggregate field in the tuple
     * @param what
     *            the aggregation operator
     */

    public IntegerAggregator(int gbfield, Type gbfieldtype, int afield, Op what) {
        // some code goes here
        this.gbfield = gbfield;//分组字段序号
        this.gbfieldtype = gbfieldtype;
        this.afield = afield;//聚合字段的序号
        this.what = what;//操作符
        switch (what){
            case MIN:
                aggHandler = new MinHandler();
                break;
            case MAX:
                aggHandler = new MaxHandler();
                break;
            case AVG:
                aggHandler = new AvgHandler();
                break;
            case SUM:
                aggHandler = new SumHandler();
                break;
            case COUNT:
                aggHandler = new CountHandler();
                break;
            default:
                throw new IllegalArgumentException("聚合器不支持当前运算符");
        }
    }

    /**
     * Merge a new tuple into the aggregate, grouping as indicated in the
     * constructor
     * 
     * @param tup
     *            the Tuple containing an aggregate field and a group-by field
     */
    public void mergeTupleIntoGroup(Tuple tup) {
        // some code goes here
        //获取处理值得字段
        IntField afield = (IntField)tup.getField(this.afield);
        //分组字段
        Field gbfield = this.gbfield == NO_GROUPING ? null : tup.getField(this.gbfield);
        aggHandler.handle(gbfield, afield);
    }

    /**
     * Create a OpIterator over group aggregate results.
     * 
     * @return a OpIterator whose tuples are the pair (groupVal, aggregateVal)
     *         if using group, or a single (aggregateVal) if no grouping. The
     *         aggregateVal is determined by the type of aggregate specified in
     *         the constructor.
     */
    public OpIterator iterator() {
        // some code goes here
        //获取聚合集
        Map<Field, Integer> result = aggHandler.getAggResult();
        //构造tuple
        Type[] types;
        String[] names;
        TupleDesc tupleDesc;
        //存储结果
        List<Tuple> tuples = new ArrayList<>();
        if(gbfield == NO_GROUPING){
            types = new Type[]{Type.INT_TYPE};
            names = new String[]{"aggregateVal"};
            tupleDesc = new TupleDesc(types, names);
            //获取结果字段
            IntField resultField = new IntField(result.get(null));
            //组合成行
            Tuple tuple = new Tuple(tupleDesc);
            tuple.setField(0, resultField);
            tuples.add(tuple);
        }else{
            types = new Type[]{gbfieldtype, Type.INT_TYPE};
            names = new String[]{"groupType", "aggregateVal"};
            tupleDesc = new TupleDesc(types, names);
            for(Field t : result.keySet()){
                Tuple tuple = new Tuple(tupleDesc);
                if(gbfieldtype == Type.INT_TYPE){
                    IntField intField = (IntField)t;
                    tuple.setField(0, intField);
                }else if(gbfieldtype == Type.STRING_TYPE){
                    StringField stringField = (StringField) t;
                    tuple.setField(0, stringField);
                }
                IntField resultField = new IntField(result.get(t));
                tuple.setField(1,resultField);
                tuples.add(tuple);
            }
        }
        return new TupleIterator(tupleDesc, tuples);
    }
}


package simpledb.execution;

import simpledb.common.Type;
import simpledb.storage.*;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Knows how to compute some aggregate over a set of StringFields.
 */
public class StringAggregator implements Aggregator {

    private static final long serialVersionUID = 1L;
    // 分组字段的序号（是一个字段，用于辨别是否是该类型）举例：group by 字段
    private int gbfield;
    private Type gbfieldtype;
    // 聚合字段的序号（是用于取新插入的值） 举例： sum(字段),min(字段)
    private int afield;
    private Op what;
    Map<Field, Integer> map;

    /**
     * Aggregate constructor
     * @param gbfield the 0-based index of the group-by field in the tuple, or NO_GROUPING if there is no grouping
     * @param gbfieldtype the type of the group by field (e.g., Type.INT_TYPE), or null if there is no grouping
     * @param afield the 0-based index of the aggregate field in the tuple
     * @param what aggregation operator to use -- only supports COUNT
     * @throws IllegalArgumentException if what != COUNT
     */

    public StringAggregator(int gbfield, Type gbfieldtype, int afield, Op what) {
        // some code goes here
        if(!what.equals(Op.COUNT)){
            throw new IllegalArgumentException("String类型只支持计数");
        }
        this.gbfield = gbfield;
        this.gbfieldtype = gbfieldtype;
        this.afield = afield;
        this.what = what;
        map = new HashMap<>();
    }

    /**
     * Merge a new tuple into the aggregate, grouping as indicated in the constructor
     * @param tup the Tuple containing an aggregate field and a group-by field
     */
    public void mergeTupleIntoGroup(Tuple tup) {
        // some code goes here
        Field field = gbfield == NO_GROUPING ? null : tup.getField(gbfield);
        if(map.containsKey(field)){
            map.put(field, map.get(field) + 1);
        }else{
            map.put(field, 1);
        }
    }

    /**
     * Create a OpIterator over group aggregate results.
     *
     * @return a OpIterator whose tuples are the pair (groupVal,
     *   aggregateVal) if using group, or a single (aggregateVal) if no
     *   grouping. The aggregateVal is determined by the type of
     *   aggregate specified in the constructor.
     */
    public OpIterator iterator() {
        // some code goes here
        //构造tuple
        Type[] types;
        String[] names;
        TupleDesc tupleDesc;
        //存储结果
        List<Tuple> tuples = new ArrayList<>();
        if(gbfield == NO_GROUPING){
            types = new Type[]{Type.INT_TYPE};
            names = new String[]{"aggregateVal"};
            tupleDesc = new TupleDesc(types, names);
            //组合成行
            Tuple tuple = new Tuple(tupleDesc);
            tuple.setField(0, new IntField(map.get(null)));
            tuples.add(tuple);
        }else{
            types = new Type[]{gbfieldtype, Type.INT_TYPE};
            names = new String[]{"groupType", "aggregateVal"};
            tupleDesc = new TupleDesc(types, names);
            for(Field t : map.keySet()){
                Tuple tuple = new Tuple(tupleDesc);
                if(gbfieldtype == Type.INT_TYPE){
                    IntField intField = (IntField)t;
                    tuple.setField(0, intField);
                }else if(gbfieldtype == Type.STRING_TYPE){
                    StringField stringField = (StringField) t;
                    tuple.setField(0, stringField);
                }
                IntField resultField = new IntField(map.get(t));
                tuple.setField(1,resultField);
                tuples.add(tuple);
            }
        }
        return new TupleIterator(tupleDesc, tuples);
    }

}


package simpledb.execution;

import simpledb.common.DbException;
import simpledb.common.Type;
import simpledb.storage.Tuple;
import simpledb.storage.TupleDesc;
import simpledb.transaction.TransactionAbortedException;

import java.util.ArrayList;
import java.util.List;
import java.util.NoSuchElementException;


/**
 * The Aggregation operator that computes an aggregate (e.g., sum, avg, max,
 * min). Note that we only support aggregates over a single column, grouped by a
 * single column.
 */
public class Aggregate extends Operator {

    private static final long serialVersionUID = 1L;
    //需要聚合的tuples
    private OpIterator child;
    private final int afield;
    private final int gfield;
    private Aggregator.Op aop;

    //进行聚合运算操作的类
    private Aggregator aggregator;
    //聚合结果迭代器
    private OpIterator opIterator;
    //聚合结果属性行
    private TupleDesc tupleDesc;
    /**
     * Constructor.
     * <p>
     * Implementation hint: depending on the type of afield, you will want to
     * construct an {@link IntegerAggregator} or {@link StringAggregator} to help
     * you with your implementation of readNext().
     *
     * @param child  The OpIterator that is feeding us tuples.
     * @param afield The column over which we are computing an aggregate.
     * @param gfield The column over which we are grouping the result, or -1 if
     *               there is no grouping
     * @param aop    The aggregation operator to use
     */
    public Aggregate(OpIterator child, int afield, int gfield, Aggregator.Op aop) {
        // some code goes here
        this.child = child;
        this.afield = afield;
        this.gfield = gfield;
        this.aop = aop;
        //判断是否分组
        Type gfieldtype = gfield == -1 ? null : child.getTupleDesc().getFieldType(gfield);
        //创建聚合器
        if(child.getTupleDesc().getFieldType(afield) == Type.STRING_TYPE){
            this.aggregator = new StringAggregator(gfield, gfieldtype, afield, aop);
        }else{
            this.aggregator = new IntegerAggregator(gfield, gfieldtype, afield, aop);
        }

        //组建tupleDesc
        List<Type> typeList = new ArrayList<>();
        List<String> nameList = new ArrayList<>();
        if(gfieldtype != null){
            typeList.add(gfieldtype);
            nameList.add(child.getTupleDesc().getFieldName(gfield));
        }
        typeList.add(child.getTupleDesc().getFieldType(afield));
        nameList.add(child.getTupleDesc().getFieldName(afield));
        if(aop.equals(Aggregator.Op.SUM_COUNT)){
            typeList.add(Type.INT_TYPE);
            nameList.add("COUNT");
        }
        this.tupleDesc = new TupleDesc(typeList.toArray(new Type[typeList.size()]), nameList.toArray(new String[nameList.size()]));
    }


    /**
     * @return If this aggregate is accompanied by a groupby, return the groupby
     * field index in the <b>INPUT</b> tuples. If not, return
     * {@link Aggregator#NO_GROUPING}
     */
    public int groupField() {
        // some code goes here
        return gfield;
    }

    /**
     * @return If this aggregate is accompanied by a group by, return the name
     * of the groupby field in the <b>OUTPUT</b> tuples. If not, return
     * null;
     */
    public String groupFieldName() {
        // some code goes here
        return child.getTupleDesc().getFieldName(gfield);
    }

    /**
     * @return the aggregate field
     */
    public int aggregateField() {
        // some code goes here
        return afield;
    }

    /**
     * @return return the name of the aggregate field in the <b>OUTPUT</b>
     * tuples
     */
    public String aggregateFieldName() {
        // some code goes here
        if(gfield == -1){
            return tupleDesc.getFieldName(0);
        }
        return tupleDesc.getFieldName(1);
    }

    /**
     * @return return the aggregate operator
     */
    public Aggregator.Op aggregateOp() {
        // some code goes here
        return aop;
    }

    public static String nameOfAggregatorOp(Aggregator.Op aop) {
        return aop.toString();
    }

    public void open() throws NoSuchElementException, DbException,
            TransactionAbortedException {
        // some code goes here
        child.open();
        //聚合所有tuple
        while(child.hasNext()){
            aggregator.mergeTupleIntoGroup(child.next());
        }
        //获取聚合后的结果
        opIterator = aggregator.iterator();
        //查询
        opIterator.open();
        //使得父类状态保持一致
        super.open();
    }

    /**
     * Returns the next tuple. If there is a group by field, then the first
     * field is the field by which we are grouping, and the second field is the
     * result of computing the aggregate. If there is no group by field, then
     * the result tuple should contain one field representing the result of the
     * aggregate. Should return null if there are no more tuples.
     */
    protected Tuple fetchNext() throws TransactionAbortedException, DbException {
        // some code goes here
        if(opIterator.hasNext()){
            return opIterator.next();
        }
        return null;
    }

    public void rewind() throws DbException, TransactionAbortedException {
        // some code goes here
        child.rewind();
        opIterator.rewind();
    }

    /**
     * Returns the TupleDesc of this Aggregate. If there is no group by field,
     * this will have one field - the aggregate column. If there is a group by
     * field, the first field will be the group by field, and the second will be
     * the aggregate value column.
     * <p>
     * The name of an aggregate column should be informative. For example:
     * "aggName(aop) (child_td.getFieldName(afield))" where aop and afield are
     * given in the constructor, and child_td is the TupleDesc of the child
     * iterator.
     */
    public TupleDesc getTupleDesc() {
        // some code goes here
        return tupleDesc;
    }

    public void close() {
        // some code goes here
        super.close();
        child.close();
        opIterator.close();
    }

    @Override
    public OpIterator[] getChildren() {
        // some code goes here
        return new OpIterator[]{child};
    }

    @Override
    public void setChildren(OpIterator[] children) {
        // some code goes here
        this.child = children[0];
        Type gfieldtype = child.getTupleDesc().getFieldType(gfield);
        //组建tupleDesc
        List<Type> typeList = new ArrayList<>();
        List<String> nameList = new ArrayList<>();
        if(gfieldtype != null){
            typeList.add(gfieldtype);
            nameList.add(child.getTupleDesc().getFieldName(gfield));
        }
        typeList.add(child.getTupleDesc().getFieldType(afield));
        nameList.add(child.getTupleDesc().getFieldName(afield));
        if(aop.equals(Aggregator.Op.SUM_COUNT)){
            typeList.add(Type.INT_TYPE);
            nameList.add("COUNT");
        }
        this.tupleDesc = new TupleDesc(typeList.toArray(new Type[typeList.size()]), nameList.toArray(new String[nameList.size()]));
    }

}
```

 完成本练习之后，需要通过IntegerAggregatorTest, StringAggregatorTest, and AggregateTest单元测试，以及AggregateTest系统测试 .

### 2.3 HeapFile Mutability

本节我们将实现修改数据库表文件的方法，我们从单独的页面和文件开始，主要实现两种操作：增加元组和移除元组

移除元组：为了移除一个元组，我们需要实现`deleteTuple`方法，元组包含`RecordIDs`可以帮助我们找到它们存储在哪一页，所以定位到元组对应的page并且正确修改page的headers信息就很简单了

增加元组：`HeapFile`中的`insertTuple`方法主要用于向数据库文件添加一个元组。为了向HeapFile中添加一个新的元组，我们需要找到带有空槽的页，如果不存在这样的页，我们需要创造一个新页并且将其添加到磁盘的文件上。我们需要确保元组的RecordID被正确更新

**练习3**

实现如下类中的方法：

- src/java/simpledb/storage/HeapPage.java
- src/java/simpledb/storage/HeapFile.java (Note that you do not necessarily need to implement writePage at this point).

为了实现HeapPage，在insertTuple和deleteTuple方法中你需要修改表示header的bitmap；这里将会使用到我们在实验一中实现的getNumEmptySlots()和isSlotUsed方法，markSlotUsed方法是抽象方法，并且用于填充或者清除page header的的状态信息

注意，insertTuple和deleteTuple方法需要通过BufferPool.getPage方法访问页，否则下一个实验中关于事务的实现将无法正常工作.



```java
package simpledb.storage;

import simpledb.common.Database;
import simpledb.common.DbException;
import simpledb.common.Catalog;
import simpledb.transaction.TransactionId;

import java.util.*;
import java.io.*;

/**
 * Each instance of HeapPage stores data for one page of HeapFiles and 
 * implements the Page interface that is used by BufferPool.
 *
 * @see HeapFile
 * @see BufferPool
 *
 */
public class HeapPage implements Page {

    final HeapPageId pid;
    final TupleDesc td;
    final byte[] header;
    final Tuple[] tuples;
    final int numSlots;

    //事务id
    private TransactionId tid;
    //是否是脏页
    private boolean dirty;
    byte[] oldData;
    private final Byte oldDataLock= (byte) 0;

    /**
     * Create a HeapPage from a set of bytes of data read from disk.
     * The format of a HeapPage is a set of header bytes indicating
     * the slots of the page that are in use, some number of tuple slots.
     *  Specifically, the number of tuples is equal to: <p>
     *          floor((BufferPool.getPageSize()*8) / (tuple size * 8 + 1))
     * <p> where tuple size is the size of tuples in this
     * database table, which can be determined via {@link Catalog#getTupleDesc}.
     * The number of 8-bit header words is equal to:
     * <p>
     *      ceiling(no. tuple slots / 8)
     * <p>
     * @see Database#getCatalog
     * @see Catalog#getTupleDesc
     * @see BufferPool#getPageSize()
     */
    public HeapPage(HeapPageId id, byte[] data) throws IOException {
        this.pid = id;
        this.td = Database.getCatalog().getTupleDesc(id.getTableId());
        this.numSlots = getNumTuples();
        DataInputStream dis = new DataInputStream(new ByteArrayInputStream(data));

        // allocate and read the header slots of this page
        header = new byte[getHeaderSize()];
        for (int i=0; i<header.length; i++)
            header[i] = dis.readByte();
        
        tuples = new Tuple[numSlots];
        try{
            // allocate and read the actual records of this page
            for (int i=0; i<tuples.length; i++)
                tuples[i] = readNextTuple(dis,i);
        }catch(NoSuchElementException e){
            e.printStackTrace();
        }
        dis.close();

        setBeforeImage();
    }

    /** Retrieve the number of tuples on this page.
        @return the number of tuples on this page
    */
    private int getNumTuples() {        
        // some code goes here
        //除了数据需要的大小，还需要一个bit位标记是否已被使用
        return (int)Math.floor((BufferPool.getPageSize()*8) / (td.getSize() * 8 + 1));

    }

    /**
     * Computes the number of bytes in the header of a page in a HeapFile with each tuple occupying tupleSize bytes
     * @return the number of bytes in the header of a page in a HeapFile with each tuple occupying tupleSize bytes
     */
    private int getHeaderSize() {        
        //一个元组一个槽
        // some code goes here
        return (int)Math.ceil(getNumTuples() * 1.0 / 8);
                 
    }
    
    /** Return a view of this page before it was modified
        -- used by recovery */
    public HeapPage getBeforeImage(){
        try {
            byte[] oldDataRef = null;
            synchronized(oldDataLock)
            {
                oldDataRef = oldData;
            }
            return new HeapPage(pid,oldDataRef);
        } catch (IOException e) {
            e.printStackTrace();
            //should never happen -- we parsed it OK before!
            System.exit(1);
        }
        return null;
    }
    
    public void setBeforeImage() {
        synchronized(oldDataLock)
        {
        oldData = getPageData().clone();
        }
    }

    /**
     * @return the PageId associated with this page.
     */
    public HeapPageId getId() {
    // some code goes here
        return pid;
    }

    /**
     * Suck up tuples from the source file.
     */
    private Tuple readNextTuple(DataInputStream dis, int slotId) throws NoSuchElementException {
        // if associated bit is not set, read forward to the next tuple, and
        // return null.
        if (!isSlotUsed(slotId)) {
            for (int i=0; i<td.getSize(); i++) {
                try {
                    dis.readByte();
                } catch (IOException e) {
                    throw new NoSuchElementException("error reading empty tuple");
                }
            }
            return null;
        }

        // read fields in the tuple
        Tuple t = new Tuple(td);
        RecordId rid = new RecordId(pid, slotId);
        t.setRecordId(rid);
        try {
            for (int j=0; j<td.numFields(); j++) {
                Field f = td.getFieldType(j).parse(dis);
                t.setField(j, f);
            }
        } catch (java.text.ParseException e) {
            e.printStackTrace();
            throw new NoSuchElementException("parsing error!");
        }

        return t;
    }

    /**
     * Generates a byte array representing the contents of this page.
     * Used to serialize this page to disk.
     * <p>
     * The invariant here is that it should be possible to pass the byte
     * array generated by getPageData to the HeapPage constructor and
     * have it produce an identical HeapPage object.
     *
     * @see #HeapPage
     * @return A byte array correspond to the bytes of this page.
     */
    public byte[] getPageData() {
        int len = BufferPool.getPageSize();
        ByteArrayOutputStream baos = new ByteArrayOutputStream(len);
        DataOutputStream dos = new DataOutputStream(baos);

        // create the header of the page
        for (byte b : header) {
            try {
                dos.writeByte(b);
            } catch (IOException e) {
                // this really shouldn't happen
                e.printStackTrace();
            }
        }

        // create the tuples
        for (int i=0; i<tuples.length; i++) {

            // empty slot
            if (!isSlotUsed(i)) {
                for (int j=0; j<td.getSize(); j++) {
                    try {
                        dos.writeByte(0);
                    } catch (IOException e) {
                        e.printStackTrace();
                    }

                }
                continue;
            }

            // non-empty slot
            for (int j=0; j<td.numFields(); j++) {
                Field f = tuples[i].getField(j);
                try {
                    f.serialize(dos);
                
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
        }

        // padding
        int zerolen = BufferPool.getPageSize() - (header.length + td.getSize() * tuples.length); //- numSlots * td.getSize();
        byte[] zeroes = new byte[zerolen];
        try {
            dos.write(zeroes, 0, zerolen);
        } catch (IOException e) {
            e.printStackTrace();
        }

        try {
            dos.flush();
        } catch (IOException e) {
            e.printStackTrace();
        }

        return baos.toByteArray();
    }

    /**
     * Static method to generate a byte array corresponding to an empty
     * HeapPage.
     * Used to add new, empty pages to the file. Passing the results of
     * this method to the HeapPage constructor will create a HeapPage with
     * no valid tuples in it.
     *
     * @return The returned ByteArray.
     */
    public static byte[] createEmptyPageData() {
        int len = BufferPool.getPageSize();
        return new byte[len]; //all 0
    }

    /**
     * Delete the specified tuple from the page; the corresponding header bit should be updated to reflect
     *   that it is no longer stored on any page.
     * @throws DbException if this tuple is not on this page, or tuple slot is
     *         already empty.
     * @param t The tuple to delete
     */
    public void deleteTuple(Tuple t) throws DbException {
        // some code goes here
        // not necessary for lab1
        //查看属性是否匹配
        int tupleId = t.getRecordId().getTupleNumber();
        if(tuples[tupleId] == null || !t.getTupleDesc().equals(td) || !t.getRecordId().getPageId().equals(pid)){
            throw new DbException("this tuple is not on this page");
        }
        if(!isSlotUsed(tupleId)){
            throw new DbException("tuple slot is already empty");
        }
        //标记未使用
        markSlotUsed(tupleId, false);
        //删除插槽内容
        tuples[tupleId] = null;
    }

    /**
     * Adds the specified tuple to the page;  the tuple should be updated to reflect
     *  that it is now stored on this page.
     * @throws DbException if the page is full (no empty slots) or tupledesc
     *         is mismatch.
     * @param t The tuple to add.
     */
    public void insertTuple(Tuple t) throws DbException {
        // some code goes here
        // not necessary for lab1
        //查看Page是否已满
        if(getNumEmptySlots() == 0){
            throw new DbException("当前页已满");
        }
        //查看属性是否匹配
        if(!t.getTupleDesc().equals(td)){
            throw new DbException("类型不匹配");
        }
        //查询tuple
        for(int i = 0; i < numSlots; i++){
            if(!isSlotUsed(i)){
                //标记使用
                markSlotUsed(i, true);
                //设置路径
                t.setRecordId(new RecordId(pid, i));
                tuples[i] = t;
                return;
            }
        }
    }

    /**
     * Marks this page as dirty/not dirty and record that transaction
     * that did the dirtying
     */
    public void markDirty(boolean dirty, TransactionId tid) {
        // some code goes here
	// not necessary for lab1
        this.dirty = dirty;
        this.tid = tid;
    }

    /**
     * Returns the tid of the transaction that last dirtied this page, or null if the page is not dirty
     */
    public TransactionId isDirty() {
        // some code goes here
	// Not necessary for lab1
        if(dirty){
            return tid;
        }
        return null;      
    }

    /**
     * Returns the number of empty slots on this page.
     */
    public int getNumEmptySlots() {
        // some code goes here
        int cnt = 0;
        for(int i = 0; i < numSlots; i++){
            if(!isSlotUsed(i)){
                ++cnt;
            }
        }
        return cnt;
    }

    /**
     * Returns true if associated slot on this page is filled.
     */
    public boolean isSlotUsed(int i) {
        // some code goes here
        //user header
        // 槽位
        int a = i / 8;
        // 偏移
        int b = i % 8;
        // 获得对应的槽位
        int quot = header[a];
        // 获得对应的槽位
        int reminder = (quot >> b & 1);
        // 偏移 move 位，看是否等于 1
        return reminder == 1;
    }

    /**
     * Abstraction to fill or clear a slot on this page.
     */
    private void markSlotUsed(int i, boolean value) {
        // some code goes here
        // not necessary for lab1
        //槽位
        int slot = i / 8;
        //偏移量
        int move = i % 8;
        //该位变成1
        byte mask = (byte) (1 << move);
        if(value){
            //0更新为1
            header[slot] |= mask;
        }else{
            // 标记为未被使用，更新 1 为 0
            // 除了该位其他位都是 1 的掩码，也就是该位会与 0 运算, 从而置零
            header[slot] &= ~mask;
        }
    }

    /**
     * @return an iterator over all tuples on this page (calling remove on this iterator throws an UnsupportedOperationException)
     * (note that this iterator shouldn't return tuples in empty slots!)
     */
    public Iterator<Tuple> iterator() {
        // some code goes here
        List<Tuple> ans = new ArrayList<>();
        for(int i = 0; i < numSlots; i++){
            if(isSlotUsed(i)){
                ans.add(tuples[i]);
            }
        }
        return ans.iterator();
    }

}


package simpledb.storage;

import simpledb.common.Database;
import simpledb.common.DbException;
import simpledb.common.Debug;
import simpledb.common.Permissions;
import simpledb.transaction.Transaction;
import simpledb.transaction.TransactionAbortedException;
import simpledb.transaction.TransactionId;

import java.io.*;
import java.util.*;

/**
 * HeapFile is an implementation of a DbFile that stores a collection of tuples
 * in no particular order. Tuples are stored on pages, each of which is a fixed
 * size, and the file is simply a collection of those pages. HeapFile works
 * closely with HeapPage. The format of HeapPages is described in the HeapPage
 * constructor.
 * 
 * @see HeapPage#HeapPage
 * @author Sam Madden
 */
public class HeapFile implements DbFile {

    private final File file;
    private final TupleDesc td;
    /**
     * Constructs a heap file backed by the specified file.
     * 
     * @param f
     *            the file that stores the on-disk backing store for this heap
     *            file.
     */
    public HeapFile(File f, TupleDesc td) {
        // some code goes here
        this.file = f;
        this.td = td;
    }

    /**
     * Returns the File backing this HeapFile on disk.
     * 
     * @return the File backing this HeapFile on disk.
     */
    public File getFile() {
        // some code goes here
        return file;
    }

    /**
     * Returns an ID uniquely identifying this HeapFile. Implementation note:
     * you will need to generate this tableid somewhere to ensure that each
     * HeapFile has a "unique id," and that you always return the same value for
     * a particular HeapFile. We suggest hashing the absolute file name of the
     * file underlying the heapfile, i.e. f.getAbsoluteFile().hashCode().
     * 
     * @return an ID uniquely identifying this HeapFile.
     */
    public int getId() {
        // some code goes here
        // 文件的绝对路径，取hash。独一无二的id
        return file.getAbsolutePath().hashCode();
    }

    /**
     * Returns the TupleDesc of the table stored in this DbFile.
     * 
     * @return TupleDesc of this DbFile.
     */
    public TupleDesc getTupleDesc() {
        // some code goes here
        return td;
    }

    // see DbFile.java for javadocs
    public Page readPage(PageId pid) {
        // some code goes here
        int tableId = pid.getTableId();
        int pgNo = pid.getPageNumber();

        //随机访问
        RandomAccessFile f = null;
        try {
            //读取当前文件
            f = new RandomAccessFile(file, "r");

            //当前页号*每页字节大小 是否超出文件范围
            if((pgNo + 1) * BufferPool.getPageSize() > f.length()){
                f.close();
                throw new IllegalArgumentException(String.format("表 %d 页 %d 不存在", tableId, pgNo));
            }
            //用于存储
            byte[] bytes = new byte[BufferPool.getPageSize()];
            //指针偏移
            f.seek(pgNo * BufferPool.getPageSize());

            //读取(返回读取的数量)
            int read = f.read(bytes, 0, BufferPool.getPageSize());
            //如果取出少，说明不存在
            if(read != BufferPool.getPageSize()){
                throw new IllegalArgumentException(String.format("表 %d 页 %d 不存在", tableId, pgNo));
            }
            return new HeapPage(new HeapPageId(pid.getTableId(), pid.getPageNumber()), bytes);
        }catch (Exception e){
            e.printStackTrace();
        }finally {
            try{
                // 关闭流
                f.close();
            }catch (IOException e){
                e.printStackTrace();
            }
        }
        throw new IllegalArgumentException(String.format("表 %d 页 %d 不存在", tableId, pgNo));
    }

    // see DbFile.java for javadocs
    public void writePage(Page page) throws IOException {
        // some code goes here
        // not necessary for lab1
        //获取页面序号
        int pageId = page.getId().getPageNumber();
        //不能超过最大页面数
        if(pageId > numPages()){
            throw new IllegalArgumentException();
        }
        //创建写入工具
        RandomAccessFile f = new RandomAccessFile(file, "rw");
        //跳过前面页面
        f.seek(pageId * BufferPool.getPageSize());
        //写入数据
        f.write(page.getPageData());
        f.close();
    }

    /**
     * Returns the number of pages in this HeapFile.
     */
    public int numPages() {
        // some code goes here
        return (int)(Math.floor(file.length() * 1.0 / BufferPool.getPageSize()));
    }

    // see DbFile.java for javadocs
    public List<Page> insertTuple(TransactionId tid, Tuple t)
            throws DbException, IOException, TransactionAbortedException {
        // some code goes here
        // not necessary for lab1
        ArrayList<Page> list = new ArrayList<>();
        //查询现有的页
        for(int pageNo = 0; pageNo < numPages(); pageNo++){
            //查询页
            HeapPageId heapPageId = new HeapPageId(getId(), pageNo);
            HeapPage heapPage = (HeapPage) Database.getBufferPool().getPage(tid, heapPageId, Permissions.READ_WRITE);
            //看当前页是否有空闲空间
            if(heapPage.getNumEmptySlots() == 0){
                Database.getBufferPool().unsafeReleasePage(tid, heapPage.getId());
                continue;
            }
            heapPage.insertTuple(t);
            list.add(heapPage);
            return list;

        }
        //如果所有页都写满,就要新建新的页面来加入(记得开启 append = true 也就是增量增加)
        BufferedOutputStream bufferedOutputStream = new BufferedOutputStream(new FileOutputStream(file, true));
        //新建一个空页
        byte[] emptyPage = HeapPage.createEmptyPageData();
        bufferedOutputStream.write(emptyPage);
        //close前会flush刷到文件中
        bufferedOutputStream.close();
        //创建新的页面
        HeapPageId pageId = new HeapPageId(getId(), numPages() - 1);
        HeapPage page = (HeapPage) Database.getBufferPool().getPage(tid, pageId, Permissions.READ_WRITE);
        page.insertTuple(t);
        list.add(page);
        //表明这是脏页
        return list;

    }

    // see DbFile.java for javadocs
    public ArrayList<Page> deleteTuple(TransactionId tid, Tuple t) throws DbException,
            TransactionAbortedException {
        // some code goes here
        // not necessary for lab1
        ArrayList<Page> list = new ArrayList<>();
        PageId pageId = t.getRecordId().getPageId();
        //找到相应页
        HeapPage page = (HeapPage) Database.getBufferPool().getPage(tid, pageId, Permissions.READ_WRITE);
        page.deleteTuple(t);
        list.add(page);
        return list;
    }

    // see DbFile.java for javadocs
    public DbFileIterator iterator(TransactionId tid) {
        // some code goes here
        return new HeapFileItrator(this, tid);
    }
    public static final class HeapFileItrator implements DbFileIterator{
        private final HeapFile heapFile;
        private final TransactionId tid;
        //元组迭代器
        private Iterator<Tuple> iterator;
        private int whichPage;
        public HeapFileItrator(HeapFile heapFile, TransactionId tid){
            this.heapFile = heapFile;
            this.tid = tid;
        }

        @Override
        public void open() throws DbException, TransactionAbortedException {
            //获取第一页的全部元组
            whichPage = 0;
            iterator = getPageTuple(whichPage);
        }
        //获取当前页的所有行
        private Iterator<Tuple> getPageTuple(int pageNumber) throws TransactionAbortedException, DbException {
            //在文件范围内
            if(pageNumber >= 0 && pageNumber < heapFile.numPages()){
                //对应一个表id,一个heapFile
                HeapPageId pid = new HeapPageId(heapFile.getId(), pageNumber);
                //从缓存中查询相应的页面
                HeapPage page = (HeapPage)Database.getBufferPool().getPage(tid, pid, Permissions.READ_ONLY);
                return page.iterator();
            }
            throw new DbException(String.format("heapFile %d not contain page %d", pageNumber, heapFile.getId()));
        }

        @Override
        public boolean hasNext() throws DbException, TransactionAbortedException {
            //如果迭代器为空
            if(iterator == null){
                return false;
            }
            //如果遍历结束
            if(!iterator.hasNext()){
                //还有下一页
                while(whichPage < (heapFile.numPages() - 1)){
                    whichPage++;
                    //获取下一页
                    iterator = getPageTuple(whichPage);
                    if(iterator.hasNext()){
                        return iterator.hasNext();
                    }
                }
                //所有元组获取完毕
                return false;
            }
            return true;
        }

        @Override
        public Tuple next() throws DbException, TransactionAbortedException, NoSuchElementException {
            if(iterator == null || !iterator.hasNext()){
                //没有元组
                throw new NoSuchElementException();
            }
            //返回下一个元组
            return iterator.next();
        }

        @Override
        public void rewind() throws DbException, TransactionAbortedException {
            //清除上一个
            close();
            //重新开始
            open();
        }

        @Override
        public void close() {
            iterator = null;
        }
    }

}
```

 完成练习后，我们的代码需要通过HeapPageWriteTest、HeapFileWriteTest和BufferPoolWriteTest单元测试 .



实现BufferPool类中的如下方法：

- insertTuple()
- deleteTuple()

这些方法需要调用需要被修改的表的HeapFile中的合适的方法来实现

```java
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
```



 完成练习后，我们的代码需要通过HeapPageWriteTest、HeapFileWriteTest和BufferPoolWriteTest单元测试 



### 2.4 Insertion & deletion

现在我们已经实现了向HeapFile添加和删除元组的机制，接下来就需要实现Insert和Delete操作

为了实现insert和delete查询，我们需要使用Insert和Delete来修改磁盘上的页，这些操作会返回被影响的元组数量

- Insert：该操作从他的子操作中读取元组加入到构造函数指定的tableid对应的表中，需要调用BufferPool.insertTuple()方法实现
- Delete：该操作从构造函数的tableid找到对应的table，并删除子操作中的元组，需要调用BufferPool.deleteTuple方法实现

**练习4**

实现如下类中的方法：

- src/java/simpledb/execution/Insert.java
- src/java/simpledb/execution/Delete.java

```java
package simpledb.execution;

import simpledb.common.Database;
import simpledb.common.DbException;
import simpledb.common.Type;
import simpledb.storage.BufferPool;
import simpledb.storage.IntField;
import simpledb.storage.Tuple;
import simpledb.storage.TupleDesc;
import simpledb.transaction.TransactionAbortedException;
import simpledb.transaction.TransactionId;

import java.io.IOException;

/**
 * Inserts tuples read from the child operator into the tableId specified in the
 * constructor
 */
public class Insert extends Operator {
    private TransactionId transactionId;
    //插入的元组，迭代器
    private OpIterator child;
    //要插入的表位置
    private final int tableId;
    //标志位，避免fetchNext无限向下取
    private boolean inserted;
    private final TupleDesc tupleDesc;
    private static final long serialVersionUID = 1L;

    /**
     * Constructor.
     *
     * @param t
     *            The transaction running the insert.
     * @param child
     *            The child operator from which to read tuples to be inserted.
     * @param tableId
     *            The table in which to insert tuples.
     * @throws DbException
     *             if TupleDesc of child differs from table into which we are to
     *             insert.
     */
    public Insert(TransactionId t, OpIterator child, int tableId)
            throws DbException {
        // some code goes here
        this.transactionId = t;
        this.child = child;
        this.tableId = tableId;
        this.tupleDesc = new TupleDesc(new Type[]{Type.INT_TYPE}, new String[]{"the number of inserted tuple"});
        this.inserted = false;
    }

    public TupleDesc getTupleDesc() {
        // some code goes here
        return tupleDesc;
    }

    public void open() throws DbException, TransactionAbortedException {
        // some code goes here
        child.open();
        super.open();
    }

    public void close() {
        // some code goes here
        super.close();
        child.close();
    }

    public void rewind() throws DbException, TransactionAbortedException {
        // some code goes here
        child.rewind();
        inserted = false;
    }

    /**
     * Inserts tuples read from child into the tableId specified by the
     * constructor. It returns a one field tuple containing the number of
     * inserted records. Inserts should be passed through BufferPool. An
     * instances of BufferPool is available via Database.getBufferPool(). Note
     * that insert DOES NOT need check to see if a particular tuple is a
     * duplicate before inserting it.
     *
     * @return A 1-field tuple containing the number of inserted records, or
     *         null if called more than once.
     * @see Database#getBufferPool
     * @see BufferPool#insertTuple
     */
    protected Tuple fetchNext() throws TransactionAbortedException, DbException {
        // some code goes here
        //还未插入
        if(!inserted){
            //计算插入了多少hang
            inserted = true;
            int cnt = 0;
            while (child.hasNext()){
                Tuple t = child.next();
                try {
                    Database.getBufferPool().insertTuple(transactionId, tableId, t);
                    cnt++;
                }catch (IOException e){
                    e.printStackTrace();
                }
            }
            //返回插入的次数 所组成元组
            Tuple tuple = new Tuple(tupleDesc);
            tuple.setField(0, new IntField(cnt));
            return tuple;
        }
        return null;
    }

    @Override
    public OpIterator[] getChildren() {
        // some code goes here
        return new OpIterator[]{child};
    }

    @Override
    public void setChildren(OpIterator[] children) {
        // some code goes here
        this.child = children[0];
    }
}


package simpledb.execution;

import simpledb.common.Database;
import simpledb.common.DbException;
import simpledb.common.Type;
import simpledb.storage.BufferPool;
import simpledb.storage.IntField;
import simpledb.storage.Tuple;
import simpledb.storage.TupleDesc;
import simpledb.transaction.TransactionAbortedException;
import simpledb.transaction.TransactionId;

import java.io.IOException;

/**
 * The delete operator. Delete reads tuples from its child operator and removes
 * them from the table they belong to.
 */
public class Delete extends Operator {

    private static final long serialVersionUID = 1L;

    private TransactionId tid;
    //要删除的元组迭代器
    private OpIterator opIterator;
    //是否已经删除
    private boolean isDeleted;
    //返回删除行的数量
    private final TupleDesc tupleDesc;
    /**
     * Constructor specifying the transaction that this delete belongs to as
     * well as the child to read from.
     * 
     * @param t
     *            The transaction this delete runs in
     * @param child
     *            The child operator from which to read tuples for deletion
     */
    public Delete(TransactionId t, OpIterator child) {
        // some code goes here
        this.tid = t;
        this.opIterator = child;
        isDeleted = false;
        tupleDesc = new TupleDesc(new Type[]{Type.INT_TYPE}, new String[]{"the number of delete tuple"});
    }

    public TupleDesc getTupleDesc() {
        // some code goes here
        return tupleDesc;
    }

    public void open() throws DbException, TransactionAbortedException {
        // some code goes here
        opIterator.open();
        super.open();
    }

    public void close() {
        // some code goes here
        super.close();
        opIterator.close();
    }

    public void rewind() throws DbException, TransactionAbortedException {
        // some code goes here
        opIterator.rewind();
        isDeleted = false;
    }

    /**
     * Deletes tuples as they are read from the child operator. Deletes are
     * processed via the buffer pool (which can be accessed via the
     * Database.getBufferPool() method.
     * 
     * @return A 1-field tuple containing the number of deleted records.
     * @see Database#getBufferPool
     * @see BufferPool#deleteTuple
     */
    protected Tuple fetchNext() throws TransactionAbortedException, DbException {
        // some code goes here
        if(!isDeleted){
            isDeleted = true;
            int cnt = 0;
            while(opIterator.hasNext()){
                Tuple tuple = opIterator.next();
                try {
                    Database.getBufferPool().deleteTuple(tid, tuple);
                    cnt++;
                }catch (IOException e){
                    e.printStackTrace();
                }
            }
            Tuple res = new Tuple(tupleDesc);
            res.setField(0,new IntField(cnt));
            return res;
        }
        return null;
    }

    @Override
    public OpIterator[] getChildren() {
        // some code goes here
        return new OpIterator[]{opIterator};
    }

    @Override
    public void setChildren(OpIterator[] children) {
        // some code goes here
        this.opIterator = children[0];
    }

}
```

 完成实验后需要通过InsertTest单元测试，并且通过InsertTest和DeleteTest系统测试 .

### 2.5 Page eviction

在实验一中，我们没有正确的根据BufferPool构造函数中定义的numPages对BufferPool中缓存的最大页面数量进行限制，本节我们将实现拒绝策略

当缓冲池中存在超过numPages数量的页时，我们需要在加载下一个页时选择淘汰缓冲池中现存的一个页；具体的拒绝策略我们自己选择即可

BufferPool中包含一个`flushAllPages`方法，该方法不会被实际用到，只是用来进行实际的测试，我们在实际代码中不会调用此方法

flushAllPages方法需要调用flushPage方法，并且flushPage方法需要在page离开BufferPool时将脏页写入磁盘，并且将其置为非脏

从缓冲池中移除页面的唯一方法是evictPage，当任何脏页被丢弃时，我们需要调用flushPage方法来将其刷新到磁盘

如果学过操作系统，那么应该了解过缓存页面丢弃策略，主要有先进先出(FIFO)、最近最少使用(LRU)和最不常用(LFU)这几种方法，我们可以选择不同的策略实现。我这里给定了一个抽象的接口，定义好方法，最后实现了LRU页面丢弃策略，详情请看代码

**练习5**

实现BufferPool的页面丢弃策略：

- src/java/simpledb/storage/BufferPool.java

我们需要实现discardPage方法去移除缓冲池中没有被刷新到磁盘上的页



```java
package simpledb.storage.evict;

import simpledb.storage.PageId;

/**
 * @description:    丢弃策略的抽象接口
 */

public interface EvictStrategy {

    /**
     * 修改对应的数据结构以满足丢弃策略
     * @param pageId
     */
    void modifyData(PageId pageId);

    /**
     * 获取要丢弃的Page的PageId信息,用于丢弃
     * @return  PageId
     */
    PageId getEvictPageId();

}


package simpledb.storage.evict;

import simpledb.storage.PageId;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

public class LRUEvict implements EvictStrategy{
    private DLinkedNode head, tail;
    private Map<PageId, DLinkedNode> map;

    public LRUEvict(int numPages) {
        head = new DLinkedNode();
        tail = new DLinkedNode();
        head.next = tail;
        tail.prev = head;
        map = new ConcurrentHashMap<>(numPages);
    }

    @Override
    public void modifyData(PageId pageId) {
        if (map.containsKey(pageId)) {
            DLinkedNode node = map.get(pageId);
            moveToHead(node);
        } else {
            DLinkedNode node = new DLinkedNode(pageId);
            map.put(pageId, node);
            addToHead(node);
        }
    }

    @Override
    public PageId getEvictPageId() {
        return removeTail().getValue();
    }

    private void addToHead(DLinkedNode node) {
        node.prev = head;
        node.next = head.next;
        head.next.prev = node;
        head.next = node;
    }

    private void removeNode(DLinkedNode node) {
        node.prev.next = node.next;
        node.next.prev = node.prev;
        map.remove(node.value);
    }

    private void moveToHead(DLinkedNode node) {
        removeNode(node);
        addToHead(node);
    }

    private DLinkedNode removeTail() {
        DLinkedNode res = tail.prev;
        removeNode(res);
        return res;
    }
}


package simpledb.storage.evict;

import simpledb.storage.PageId;

public class DLinkedNode {
    PageId value;
    DLinkedNode prev;
    DLinkedNode next;
    public DLinkedNode() {}

    public DLinkedNode(PageId value) {
        this.value = value;
    }

    public PageId getValue() {
        return value;
    }
}
```

 页面丢弃策略： 

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

完成练习之后，代码需要通过EvictionTest单元测试.



## 3、总结

 lab2整体不难，好好阅读代码注释比较容易实现 .