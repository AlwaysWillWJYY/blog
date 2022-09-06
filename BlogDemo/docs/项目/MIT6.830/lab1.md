---
title: MIT数据库Lab1实验报告
publish: false
---

##  SimpleDB结构以及实现指导

SimpleDB包括：

* 代表域、元组以及tuple schema的类
* 将谓词和条件应用到元组的类
* 一个或多个访问存储在磁盘上的关系的方法(heap file)，并提供通过元组的形式迭代遍历这些关系的方法
* 一些列操作元组的类(例如select、join、insert、delete等)
* 一个缓冲池，用于在内存中缓存活动元组和页面，并处理并发控制和事务(在本实验中，这两个都不需要担心)
* 一个存储表信息以及表schema的Catalog类

SimpleDB不包含许多你认为数据库应该包含的概念，例如：

* 这里并不提供SQL语言，而是通过一系列的查询操作来组成查询计划，在后续的实验中将会提供简单的解析器
* 视图
* 除了整数和定长字符串以外的数据类型
* 查询优化(后续实验提供)

在本节的剩余部门，将会描述我们在实验中需要实现的每一个SimpleDB组件，我们需要使用练习指导我们的实现(例如通过单元测试)；本篇文档不是SimpleDB的完整规范，我们需要决定如何设计并实现系统的各个部分；在本次实验中并不需要实现任何操作(select、join、project等)，这些操作将会在未来的实验中实现

```java
package simpledb.storage;

import simpledb.common.Type;

import java.io.Serializable;
import java.util.*;

/**
 * TupleDesc describes the schema of a tuple.
 */
public class TupleDesc implements Serializable {

    private final TDItem[] tdItems;

    /**
     * A help class to facilitate organizing the information of each field
     * */
    public static class TDItem implements Serializable {

        private static final long serialVersionUID = 1L;

        /**
         * The type of the field
         * */
        public final Type fieldType;
        
        /**
         * The name of the field
         * */
        public final String fieldName;

        public TDItem(Type t, String n) {
            this.fieldName = n;
            this.fieldType = t;
        }

        public String toString() {
            return fieldName + "(" + fieldType + ")";
        }
    }

    /**
     * @return
     *        An iterator which iterates over all the field TDItems
     *        that are included in this TupleDesc
     * */
    public Iterator<TDItem> iterator() {
        // some code goes here
        return (Iterator<TDItem>)Arrays.asList(tdItems).iterator();
    }

    private static final long serialVersionUID = 1L;

    /**
     * Create a new TupleDesc with typeAr.length fields with fields of the
     * specified types, with associated named fields.
     * 
     * @param typeAr
     *            array specifying the number of and types of fields in this
     *            TupleDesc. It must contain at least one entry.
     * @param fieldAr
     *            array specifying the names of the fields. Note that names may
     *            be null.
     */
    public TupleDesc(Type[] typeAr, String[] fieldAr) {
        // some code goes here
        tdItems = new TDItem[typeAr.length];
        for(int i = 0; i < typeAr.length; i++){
            tdItems[i] = new TDItem(typeAr[i], fieldAr[i]);
        }
    }

    /**
     * Constructor. Create a new tuple desc with typeAr.length fields with
     * fields of the specified types, with anonymous (unnamed) fields.
     * 
     * @param typeAr
     *            array specifying the number of and types of fields in this
     *            TupleDesc. It must contain at least one entry.
     */
    public TupleDesc(Type[] typeAr) {
        // some code goes here
        tdItems = new TDItem[typeAr.length];
        //没有域则不用传
        for(int i = 0; i < typeAr.length; i++){
            tdItems[i] = new TDItem(typeAr[i],"");
        }
    }

    /**
     * @return the number of fields in this TupleDesc
     */
    public int numFields() {
        // some code goes here
        return tdItems.length;
    }

    /**
     * Gets the (possibly null) field name of the ith field of this TupleDesc.
     * 
     * @param i
     *            index of the field name to return. It must be a valid index.
     * @return the name of the ith field
     * @throws NoSuchElementException
     *             if i is not a valid field reference.
     */
    public String getFieldName(int i) throws NoSuchElementException {
        // some code goes here
        if(i < 0 || i >= tdItems.length){
            throw new NoSuchElementException("pos " + i + " is not a valid index");
        }
        return tdItems[i].fieldName;
    }

    /**
     * Gets the type of the ith field of this TupleDesc.
     * 
     * @param i
     *            The index of the field to get the type of. It must be a valid
     *            index.
     * @return the type of the ith field
     * @throws NoSuchElementException
     *             if i is not a valid field reference.
     */
    public Type getFieldType(int i) throws NoSuchElementException {
        // some code goes here
        if(i < 0 || i >= tdItems.length){
            throw new NoSuchElementException("pos " + i + " is not a valid index");
        }
        return tdItems[i].fieldType;
    }

    /**
     * Find the index of the field with a given name.
     * 
     * @param name
     *            name of the field.
     * @return the index of the field that is first to have the given name.
     * @throws NoSuchElementException
     *             if no field with a matching name is found.
     */
    public int fieldNameToIndex(String name) throws NoSuchElementException {
        // some code goes here
        for(int i = 0; i < tdItems.length; i++){
            if(tdItems[i].fieldName.equals(name)){
                return i;
            }
        }
        throw new NoSuchElementException("not find fieldName " + name);
    }

    /**
     * @return The size (in bytes) of tuples corresponding to this TupleDesc.
     *         Note that tuples from a given TupleDesc are of a fixed size.
     */
    public int getSize() {
        // some code goes here
        int size = 0;
        for(int i = 0; i < tdItems.length; i++){
            size += tdItems[i].fieldType.getLen();
        }
        return size;
    }

    /**
     * Merge two TupleDescs into one, with td1.numFields + td2.numFields fields,
     * with the first td1.numFields coming from td1 and the remaining from td2.
     * 
     * @param td1
     *            The TupleDesc with the first fields of the new TupleDesc
     * @param td2
     *            The TupleDesc with the last fields of the TupleDesc
     * @return the new TupleDesc
     */
    public static TupleDesc merge(TupleDesc td1, TupleDesc td2) {
        // some code goes here
        Type[] typeAr = new Type[td1.numFields() + td2.numFields()];
        String[] fieldAr = new String[td1.numFields() + td2.numFields()];
        for(int i = 0; i < td1.numFields(); i++){
            typeAr[i] = td1.tdItems[i].fieldType;
            fieldAr[i] = td1.tdItems[i].fieldName;
        }
        for(int i = 0; i < td2.numFields(); i++){
            typeAr[i + td1.numFields()] = td2.tdItems[i].fieldType;
            fieldAr[i + td1.numFields()] = td2.tdItems[i].fieldName;
        }
        return new TupleDesc(typeAr, fieldAr);
    }

    /**
     * Compares the specified object with this TupleDesc for equality. Two
     * TupleDescs are considered equal if they have the same number of items
     * and if the i-th type in this TupleDesc is equal to the i-th type in o
     * for every i.
     * 
     * @param o
     *            the Object to be compared for equality with this TupleDesc.
     * @return true if the object is equal to this TupleDesc.
     */

    public boolean equals(Object o) {
        // some code goes here
        if(this.getClass().isInstance(o)){
            TupleDesc tar = (TupleDesc) o;
            if(numFields() == tar.numFields()){
                for(int i = 0; i < numFields(); i++){
                    if(!tdItems[i].fieldType.equals(tar.tdItems[i].fieldType)){
                        return false;
                    }
                }
                return true;
            }
        }
        return false;
    }

    public int hashCode() {
        // If you want to use TupleDesc as keys for HashMap, implement this so
        // that equal objects have equals hashCode() results
        throw new UnsupportedOperationException("unimplemented");
    }

    /**
     * Returns a String describing this descriptor. It should be of the form
     * "fieldType[0](fieldName[0]), ..., fieldType[M](fieldName[M])", although
     * the exact format does not matter.
     * 
     * @return String describing this descriptor.
     */
    public String toString() {
        // some code goes here
        StringBuilder sb = new StringBuilder();
        for(int i = 0; i < tdItems.length - 1; i++){
            sb.append(tdItems[i].fieldType + "(" + tdItems[i].fieldName + "), ");
        }
        sb.append(tdItems[tdItems.length - 1].fieldType + "(" + tdItems[tdItems.length - 1].fieldName + ")");
        return sb.toString();
    }
}

```
