---
title: MIT数据库Lab1实验报告
publish: false
---

::: tip
这是一个实验的开始
:::

<!-- more -->

[[toc]]


## 1、开始

### 1.1 实现提示

开始编写代码之前，强烈建议通读整篇文档，以对`SimpleDB`的设计有个整体的认识，对于我们编写代码非常有帮助

我们需要实现所有未被实现的类，可能还需要添加私有方法或者辅助类，在不影响项目整体的情况下我们可以修改部分`api`接口.



建议通过本文的练习来指导我们的实现，但是你可能会发现不同的顺序将会更有意义

下面是`SimpleDB`实现的一个大致框架：

- 实现管理`tuples`的类`Tuple`、`TupleDesc`，项目中已经提供了`Field、IntField、StringField以及Type`，我们只需要支持整数和(定长)字符串和固定长度的元组即可
- 实现`Catelog`
- 实现`BufferPool`的构造方法以及`getPage()`方法
- 实现`HeapPage、HeapFile以及PageId`类中的方法，这些文件中有很大一部分已经写好了
- 实现`SeqScan`方法
- 本次实验的目标是通过`ScanTest`系统测试

### 1.2 事务、锁、恢复

项目中提供的接口，可能会包含锁、事务和恢复的`references`，在本次实验我们不用关心这些特性，但是我们需要保持方法中的这些参数，因为在接下来的几次实验中我们会用到，这些不会影响单元测试 .



## 2、SimpleDB结构以及实现指导

`SimpleDB`包括：

* 代表域、元组以及tuple schema的类
* 将谓词和条件应用到元组的类
* 一个或多个访问存储在磁盘上的关系的方法(heap file)，并提供通过元组的形式迭代遍历这些关系的方法
* 一些列操作元组的类(例如select、join、insert、delete等)
* 一个缓冲池，用于在内存中缓存活动元组和页面，并处理并发控制和事务(在本实验中，这两个都不需要担心)
* 一个存储表信息以及表schema的Catalog类

`SimpleDB`不包含许多你认为数据库应该包含的概念，例如：

* 这里并不提供`SQL`语言，而是通过一系列的查询操作来组成查询计划，在后续的实验中将会提供简单的解析器
* 视图
* 除了整数和定长字符串以外的数据类型
* 查询优化(后续实验提供)

在本节的剩余部门，将会描述我们在实验中需要实现的每一个`SimpleDB`组件，我们需要使用练习指导我们的实现(例如通过单元测试)；本篇文档不是`SimpleDB`的完整规范，我们需要决定如何设计并实现系统的各个部分；在本次实验中并不需要实现任何操作(select、join、project等)，这些操作将会在未来的实验中实现



### 2.1 DataBase类

 `Database`类提供了访问数据库全局静态对象的方法；包括：访问`Catalog、BufferPool`以及日志文件(本次实验无需关心日志文件)的方法；Database已经实现好了，我们需要阅读该类的源码，因为我们需要访问这些对象 。

### 2.2 域和元组

` SimpleDB`中元组非常基础。它们由Field对象集合组成，Field对象集合用于存储元组的数据。Field是不同数据类型实现的接口(项目提供了`IntField&StringField`)。Tuple对象将会通过下一节的访问方法(heap file、B-tree)创建。Tuple也包括`TupleDesc`类，用于描述元组的列名及数据类型。 

**练习1**

实现下面类的方法：

- `src/java/simpledb/storage/TupleDesc.java`
- `src/java/simpledb/storage/Tuple.java`

实现上述两个类以通过`TupleTest和TupleDescTest`单元测试；其中关于`RecoreId`的方法可能会失败，因为我们还没有实现.

具体实现

` TupleDesc.java `

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

`Tuple.java`

```java
package simpledb.storage;

import java.io.File;
import java.io.Serializable;
import java.util.Arrays;
import java.util.Iterator;

/**
 * Tuple maintains information about the contents of a tuple. Tuples have a
 * specified schema specified by a TupleDesc object and contain Field objects
 * with the data for each field.
 */
public class Tuple implements Serializable {

    private TupleDesc tupleDesc;
    private RecordId recordId;
    private final Field[] fields;
    private static final long serialVersionUID = 1L;

    /**
     * Create a new tuple with the specified schema (type).
     *
     * @param td
     *            the schema of this tuple. It must be a valid TupleDesc
     *            instance with at least one field.
     */
    public Tuple(TupleDesc td) {
        // some code goes here
        tupleDesc = td;
        fields = new Field[td.numFields()];
    }

    /**
     * @return The TupleDesc representing the schema of this tuple.
     */
    public TupleDesc getTupleDesc() {
        // some code goes here

        return tupleDesc;
    }

    /**
     * @return The RecordId representing the location of this tuple on disk. May
     *         be null.
     */
    public RecordId getRecordId() {
        // some code goes here
        return recordId;
    }

    /**
     * Set the RecordId information for this tuple.
     *
     * @param rid
     *            the new RecordId for this tuple.
     */
    public void setRecordId(RecordId rid) {
        // some code goes here
        recordId = rid;
    }

    /**
     * Change the value of the ith field of this tuple.
     *
     * @param i
     *            index of the field to change. It must be a valid index.
     * @param f
     *            new value for the field.
     */
    public void setField(int i, Field f) {
        // some code goes here
        fields[i] = f;
    }

    /**
     * @return the value of the ith field, or null if it has not been set.
     *
     * @param i
     *            field index to return. Must be a valid index.
     */
    public Field getField(int i) {
        // some code goes here
        return fields[i];
    }

    /**
     * Returns the contents of this Tuple as a string. Note that to pass the
     * system tests, the format needs to be as follows:
     *
     * column1\tcolumn2\tcolumn3\t...\tcolumnN
     *
     * where \t is any whitespace (except a newline)
     */
    public String toString() {
        // some code goes here
        StringBuilder sb = new StringBuilder();
        for(int i = 0; i < fields.length - 1; i++){
            sb.append(fields[i].toString() + " ");
        }
        sb.append(fields[fields.length - 1].toString() + "\n");
        return sb.toString();
    }

    /**
     * @return
     *        An iterator which iterates over all the fields of this tuple
     * */
    public Iterator<Field> fields()
    {
        // some code goes here
        return (Iterator<Field>)Arrays.asList(fields).iterator();
    }

    /**
     * reset the TupleDesc of this tuple (only affecting the TupleDesc)
     * */
    public void resetTupleDesc(TupleDesc td)
    {
        tupleDesc = td;
        // some code goes here
    }
}
```

### 2.3 Catalog

catalog由数据库中现存的表的列表和表对应的schema数据组成，我们将实现向catalog中添加table以及获取table信息的功能。与table关联的是一个`TupleDesc`对象，通过该对象可以确定表字段个数和类型

`SimpleDB`含有一个Catalog的单例，我们可以通过`Database.getCatalog()`方法获取到该单例对象，可以通过`Database.getBufferPool()`获取到单例`BufferPool`对象



**练习2**

实现下面类的方法：

- `src/java/simpledb/common/Catalog.java`

我们实现的代码应该通过`CatalogTest`单元测试

`Catalog.java `

```java
package simpledb.common;

import javafx.scene.control.Tab;
import simpledb.common.Type;
import simpledb.storage.DbFile;
import simpledb.storage.HeapFile;
import simpledb.storage.TupleDesc;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileReader;
import java.io.IOException;
import java.util.*;
import java.util.concurrent.ConcurrentHashMap;

/**
 * The Catalog keeps track of all available tables in the database and their
 * associated schemas.
 * For now, this is a stub catalog that must be populated with tables by a
 * user program before it can be used -- eventually, this should be converted
 * to a catalog that reads a catalog table from disk.
 * 
 * @Threadsafe
 */
public class Catalog {
    //线程安全
    private final ConcurrentHashMap<Integer, Table> hashMap;
    public static class Table{
        public final DbFile dbFile;

        public final String tableName;

        public final String pk;

        public Table(DbFile dbFile, String tableName, String pk){
            this.dbFile = dbFile;
            this.tableName = tableName;
            this.pk = pk;
        }
        public String toString(){
            return tableName + "(" + dbFile.getId() + ")";
        }
    }

    /**
     * Constructor.
     * Creates a new, empty catalog.
     */
    public Catalog() {
        // some code goes here
        hashMap = new ConcurrentHashMap<>();
    }

    /**
     * Add a new table to the catalog.
     * This table's contents are stored in the specified DbFile.
     * @param file the contents of the table to add;  file.getId() is the identfier of
     *    this file/tupledesc param for the calls getTupleDesc and getFile
     * @param name the name of the table -- may be an empty string.  May not be null.  If a name
     * conflict exists, use the last table to be added as the table for a given name.
     * @param pkeyField the name of the primary key field
     */
    public void addTable(DbFile file, String name, String pkeyField) {

        // some code goes here
        Table t = new Table(file, name, pkeyField);
        hashMap.put(file.getId(), t);
    }

    public void addTable(DbFile file, String name) {
        addTable(file, name, "");
    }

    /**
     * Add a new table to the catalog.
     * This table has tuples formatted using the specified TupleDesc and its
     * contents are stored in the specified DbFile.
     * @param file the contents of the table to add;  file.getId() is the identfier of
     *    this file/tupledesc param for the calls getTupleDesc and getFile
     */
    public void addTable(DbFile file) {
        addTable(file, (UUID.randomUUID()).toString());
    }

    /**
     * Return the id of the table with a specified name,
     * @throws NoSuchElementException if the table doesn't exist
     */
    public int getTableId(String name) throws NoSuchElementException {
        // some code goes here
        for(Map.Entry<Integer, Table> m : hashMap.entrySet()){
            if(m.getValue().tableName.equals(name)){
                return m.getValue().dbFile.getId();
            }
        }
        throw new NoSuchElementException("not found id for table " + name);
    }

    /**
     * Returns the tuple descriptor (schema) of the specified table
     * @param tableid The id of the table, as specified by the DbFile.getId()
     *     function passed to addTable
     * @throws NoSuchElementException if the table doesn't exist
     */
    public TupleDesc getTupleDesc(int tableid) throws NoSuchElementException {
        // some code goes here
        Table t = hashMap.getOrDefault(tableid, null);
        if(t != null){
            return t.dbFile.getTupleDesc();
        }else{
            throw new NoSuchElementException("not found tuple desc for table " + tableid);
        }
    }

    /**
     * Returns the DbFile that can be used to read the contents of the
     * specified table.
     * @param tableid The id of the table, as specified by the DbFile.getId()
     *     function passed to addTable
     */
    public DbFile getDatabaseFile(int tableid) throws NoSuchElementException {
        Table t = hashMap.getOrDefault(tableid, null);
        if(t != null){
            return t.dbFile;
        }else{
            throw new NoSuchElementException("not found db file for table " + tableid);
        }
    }

    public String getPrimaryKey(int tableid) {
        Table t = hashMap.getOrDefault(tableid, null);
        if(t != null){
            return t.pk;
        }else{
            throw new NoSuchElementException("not found table pk for table " + tableid);
        }
    }

    public Iterator<Integer> tableIdIterator() {
        // some code goes here
        return hashMap.keySet().iterator();
    }

    public String getTableName(int id) {
        // some code goes here
        Table t = hashMap.getOrDefault(id, null);
        if(t != null){
            return t.tableName;
        }else{
            throw new NoSuchElementException("not found name for table " + id);

        }
    }
    
    /** Delete all tables from the catalog */
    public void clear() {
        // some code goes here
        hashMap.clear();
    }
    
    /**
     * Reads the schema from a file and creates the appropriate tables in the database.
     * @param catalogFile
     */
    public void loadSchema(String catalogFile) {
        String line = "";
        String baseFolder=new File(new File(catalogFile).getAbsolutePath()).getParent();
        try {
            BufferedReader br = new BufferedReader(new FileReader(catalogFile));
            
            while ((line = br.readLine()) != null) {
                //assume line is of the format name (field type, field type, ...)
                String name = line.substring(0, line.indexOf("(")).trim();
                //System.out.println("TABLE NAME: " + name);
                String fields = line.substring(line.indexOf("(") + 1, line.indexOf(")")).trim();
                String[] els = fields.split(",");
                ArrayList<String> names = new ArrayList<>();
                ArrayList<Type> types = new ArrayList<>();
                String primaryKey = "";
                for (String e : els) {
                    String[] els2 = e.trim().split(" ");
                    names.add(els2[0].trim());
                    if (els2[1].trim().equalsIgnoreCase("int"))
                        types.add(Type.INT_TYPE);
                    else if (els2[1].trim().equalsIgnoreCase("string"))
                        types.add(Type.STRING_TYPE);
                    else {
                        System.out.println("Unknown type " + els2[1]);
                        System.exit(0);
                    }
                    if (els2.length == 3) {
                        if (els2[2].trim().equals("pk"))
                            primaryKey = els2[0].trim();
                        else {
                            System.out.println("Unknown annotation " + els2[2]);
                            System.exit(0);
                        }
                    }
                }
                Type[] typeAr = types.toArray(new Type[0]);
                String[] namesAr = names.toArray(new String[0]);
                TupleDesc t = new TupleDesc(typeAr, namesAr);
                HeapFile tabHf = new HeapFile(new File(baseFolder+"/"+name + ".dat"), t);
                addTable(tabHf,name,primaryKey);
                System.out.println("Added table : " + name + " with schema " + t);
            }
        } catch (IOException e) {
            e.printStackTrace();
            System.exit(0);
        } catch (IndexOutOfBoundsException e) {
            System.out.println ("Invalid catalog entry : " + line);
            System.exit(0);
        }
    }
}

```

### 2.4 BufferPool

 buffer pool代码是最近从磁盘读取的页在内存的缓存，所有从磁盘文件读取或写入页的操作都通过buffer pool实现。它由固定数量的页组成，我们可以通过`BufferPool`的构造函数参数`numPages`指定页的数量。在后续的实验中，我们需要实现驱逐策略。在本次实验中，我们只需要实现构造函数和`BufferPool.getPage()`方法。`BufferPool`应该存储`numPages`,使用`numPages`的目的是为了当不同的页的数量超过`numPages`时，我们需要通过拒绝策略丢弃部分页 

**练习3**

实现BufferPool类中的getPage()方法：

- `src/java/simpledb/storage/BufferPool.java`

项目中并没有提供`BufferPool`的单元测试，但是我们实现的功能将会被`HeapFile`测试，我们需要通过`DbFile.readPage`方法访问`DbFile`的页

当在`BufferPool`中超过`numPages`数量的页时，我们应当在下一个页加载时丢弃一个页，丢弃策略由我们自己实现



```java
public class BufferPool {
    /** Bytes per page, including header. */
    private static final int DEFAULT_PAGE_SIZE = 4096;

    private static int pageSize = DEFAULT_PAGE_SIZE;
    
    public static final int DEFAULT_PAGES = 50;

    private Integer numPages;
    private Map<PageId, Page> pageCache;

    public BufferPool(int numPages) {
        // some code goes here
        this.numPages = numPages;
        pageCache = new ConcurrentHashMap<>();
    }
    
    public Page getPage(TransactionId tid, PageId pid, Permissions perm)
        throws TransactionAbortedException, DbException {
        // some code goes here
        if (!pageCache.containsKey(pid)) {
            DbFile dbFile = Database.getCatalog().getDatabaseFile(pid.getTableId());
            Page page = dbFile.readPage(pid);
            pageCache.put(pid, page);
        }
        return pageCache.get(pid);
    }
}
```

### 2.5 HeapFile访问方法

访问方法提供一种向(以指定方式排列在磁盘上的文件)读取或写入数据的方式。通用访问方法包括heap files和B-tree，本次实验我们将会实现heap file访问方法

`HeapFile`对象被排列在一系列页中，每个页包含固定数量(`BufferPool.DEFAULT_PAGE_SIZE`)的字节用于存储元组，以及header(以bitmap的形式描述tuple的可用性)。在`SimpleDB`中，每个表都对应一个`HeapFile`对象。`HeapFile`中的每个页以一系列的槽表示，每个槽表示一个元组，除了这些槽之外，每个页还包含一个header；header由一个bitmap组成，每个bit代表对应的槽，如果bit为1代表槽中元组可用，bit为0代表槽中元组不可用(被删除了、或者未初始化)。`HeapFile`中的页是实现了Page接口`HeapPage`类。页存储在buffer pool中但是通过`HeapFile`类进行读取或者写入

`SimpleDB`存储在磁盘上的heap file与存储在内存上的数据格式一样，每个文件由在磁盘上连续排列的页数据组成。每个页由代表header的字节以及实际的页内容的字节组成。每个元组所占大小为tuple_size * 8 bits+1 header bit；因此，每个页包含的tuple数量可通过如下公式计算：

```
tuples_per_page = floor((page_size * 8) / (tuple_size * 8 + 1))
```

tuple_size为每个tuple在页中所占字节数，因为每个tuple除了自身内容占用的字节数外，还有`1bit`的头部数据来表示tuple的可用性，所以每页包含的元组个数需要通过上式计算

当我们指导元组数/页时，我们可以计算头部所需字节数：

```
headerBytes = ceiling(tuplesPerPage * 1.0 / 8)
```

ceiling操作直接进位，求大于某数的最小整数

每个字节的低位bit代表文件中出现在前的槽的状态，因此，最低为代表第一个槽是否使用，第二低位代表第二个槽是否使用，依此类推。



**练习4**

实现下面类的方法：

- `src/java/simpledb/storage/HeapPageId.java`
- `src/java/simpledb/storage/RecordId.java`
- `src/java/simpledb/storage/HeapPage.java`

 `HeapPageId.java `

```java
package simpledb.storage;

/** Unique identifier for HeapPage objects. */
public class HeapPageId implements PageId {
    private final int tableId;

    private final int pgNo;

    /**
     * Constructor. Create a page id structure for a specific page of a
     * specific table.
     *
     * @param tableId The table that is being referenced
     * @param pgNo The page number in that table.
     */
    public HeapPageId(int tableId, int pgNo) {
        // some code goes here
        this.tableId = tableId;
        this.pgNo = pgNo;
    }

    /** @return the table associated with this PageId */
    public int getTableId() {
        // some code goes here
        return tableId;
    }

    /**
     * @return the page number in the table getTableId() associated with
     *   this PageId
     */
    public int getPageNumber() {
        // some code goes here
        return pgNo;
    }

    /**
     * @return a hash code for this page, represented by a combination of
     *   the table number and the page number (needed if a PageId is used as a
     *   key in a hash table in the BufferPool, for example.)
     * @see BufferPool
     */
    public int hashCode() {
        // some code goes here
        String hash = "" + tableId + pgNo;
        return hash.hashCode();
    }

    /**
     * Compares one PageId to another.
     *
     * @param o The object to compare against (must be a PageId)
     * @return true if the objects are equal (e.g., page numbers and table
     *   ids are the same)
     */
    public boolean equals(Object o) {
        // some code goes here
        if(o instanceof PageId){
            PageId pageId = (PageId) o;
            if(pageId.getTableId() == tableId && pageId.getPageNumber() == pgNo){
                return true;
            }
        }
        return false;
    }

    /**
     *  Return a representation of this object as an array of
     *  integers, for writing to disk.  Size of returned array must contain
     *  number of integers that corresponds to number of args to one of the
     *  constructors.
     */
    public int[] serialize() {
        int[] data = new int[2];

        data[0] = getTableId();
        data[1] = getPageNumber();

        return data;
    }

}
```

 `RecordId.java `

```java
package simpledb.storage;

import java.io.Serializable;

/**
 * A RecordId is a reference to a specific tuple on a specific page of a
 * specific table.
 */
public class RecordId implements Serializable {

    private static final long serialVersionUID = 1L;

    private final PageId pageId;

    private final int tupleno;
    /**
     * Creates a new RecordId referring to the specified PageId and tuple
     * number.
     * 
     * @param pid
     *            the pageid of the page on which the tuple resides
     * @param tupleno
     *            the tuple number within the page.
     */
    public RecordId(PageId pid, int tupleno) {
        this.pageId = pid;
        this.tupleno = tupleno;
        // some code goes here
    }

    /**
     * @return the tuple number this RecordId references.
     */
    public int getTupleNumber() {
        // some code goes here
        return tupleno;
    }

    /**
     * @return the page id this RecordId references.
     */
    public PageId getPageId() {
        // some code goes here
        return pageId;
    }

    /**
     * Two RecordId objects are considered equal if they represent the same
     * tuple.
     * 
     * @return True if this and o represent the same tuple
     */
    @Override
    public boolean equals(Object o) {
        // some code goes here
        if(o instanceof RecordId){
            RecordId tar = (RecordId) o;
            if(tar.getPageId().equals(pageId) && tar.getTupleNumber() == tupleno){
                return true;
            }
        }
        return false;
    }

    /**
     * You should implement the hashCode() so that two equal RecordId instances
     * (with respect to equals()) have the same hashCode().
     * 
     * @return An int that is the same for equal RecordId objects.
     */
    @Override
    public int hashCode() {
        // some code goes here
        String hash = "" +pageId.getTableId()+pageId.getPageNumber()+tupleno;
        return hash.hashCode();

    }

}
```

 `HeapPage.java `

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
```

 此时，我们的代码应该通过`HeapPageIdTest, RecordIdTest, and HeapPageReadTest`单元测试 

**练习5**

实现下面类中的方法：

- `src/java/simpledb/storage/HeapFile.java`

为了从磁盘读取页，我们首先需要计算正确的偏移量。提示：**使用RandomAccessFile访问文件即可**

我们还需要实现`HeapFile.iterator()`方法，通过该方法遍历`HeapFile`中每个页中存储的元组。迭代器需要通过`BufferPool.getPage()`方法访问`HeapFile`的页。该方法会将页加载到buffer pool中并且最终被用于实现基于锁的并发访问和恢复，不要在open方法中将整个表加载到内存中，这可能会引发`oom`

` HeapFile.java `

```java
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

 此时，我们的代码应该通过`HeapFileReadTest`单元测试 

### 2.6 Operators

Operators负责查询计划的实际执行，它们实现了关系代数的操作。在SimpleDB中，operators是基于迭代器的，每个操作都实现了DBIterator接口

Operators通过将低层次的操作传递给高层次操作的构造函数来连接整个执行计划；最低层次操作的访问方法负责从磁盘读取数据

在执行计划的顶端，程序通过调用根操作的`getNext`方法与`SimpleDB`进行交互；该操作将会调用子节点的`getNext`方法，依此类推，直接叶子结点的操作被调用。它们从磁盘读取元组数据

本次实验，我们将会实现一个简单的操作

**练习6**

实现下面类中的方法：

- `src/java/simpledb/execution/SeqScan.java`

该操作通过构造函数的`tableid`扫描指定表的页获取元组数据，需要通过`DbFile.iterator()`方法访问元组

` SeqScan.java `

```java
package simpledb.execution;

import simpledb.common.Database;
import simpledb.transaction.TransactionAbortedException;
import simpledb.transaction.TransactionId;
import simpledb.common.Type;
import simpledb.common.DbException;
import simpledb.storage.DbFileIterator;
import simpledb.storage.Tuple;
import simpledb.storage.TupleDesc;

import java.util.*;

/**
 * SeqScan is an implementation of a sequential scan access method that reads
 * each tuple of a table in no particular order (e.g., as they are laid out on
 * disk).
 */
public class SeqScan implements OpIterator {
    private final TransactionId tid;//事务id
    private int tableid;//表id
    private String tableAlias;//表别名
    private DbFileIterator dbFileIterator;//迭代器用于检索
    private static final long serialVersionUID = 1L;

    /**
     * Creates a sequential scan over the specified table as a part of the
     * specified transaction.
     *
     * @param tid
     *            The transaction this scan is running as a part of.
     * @param tableid
     *            the table to scan.
     * @param tableAlias
     *            the alias of this table (needed by the parser); the returned
     *            tupleDesc should have fields with name tableAlias.fieldName
     *            (note: this class is not responsible for handling a case where
     *            tableAlias or fieldName are null. It shouldn't crash if they
     *            are, but the resulting name can be null.fieldName,
     *            tableAlias.null, or null.null).
     */
    public SeqScan(TransactionId tid, int tableid, String tableAlias) {
        // some code goes here
        this.tid = tid;
        this.tableid = tableid;
        this.tableAlias = tableAlias;
    }

    /**
     * @return
     *       return the table name of the table the operator scans. This should
     *       be the actual name of the table in the catalog of the database
     * */
    public String getTableName() {

        return Database.getCatalog().getTableName(tableid);
    }

    /**
     * @return Return the alias of the table this operator scans.
     * */
    public String getAlias()
    {
        // some code goes here
        return tableAlias;
    }

    /**
     * Reset the tableid, and tableAlias of this operator.
     * @param tableid
     *            the table to scan.
     * @param tableAlias
     *            the alias of this table (needed by the parser); the returned
     *            tupleDesc should have fields with name tableAlias.fieldName
     *            (note: this class is not responsible for handling a case where
     *            tableAlias or fieldName are null. It shouldn't crash if they
     *            are, but the resulting name can be null.fieldName,
     *            tableAlias.null, or null.null).
     */
    public void reset(int tableid, String tableAlias) {
        // some code goes here
        this.tableid = tableid;
        this.tableAlias = tableAlias;
    }

    public SeqScan(TransactionId tid, int tableId) {
        this(tid, tableId, Database.getCatalog().getTableName(tableId));
    }

    public void open() throws DbException, TransactionAbortedException {
        // some code goes here
        //查询目录->根据id查询相应的dbFile->获取迭代器
        //lab1-5实现的HeapFileIterator
        dbFileIterator = Database.getCatalog().getDatabaseFile(tableid).iterator(tid);
        dbFileIterator.open();
    }

    /**
     * Returns the TupleDesc with field names from the underlying HeapFile,
     * prefixed with the tableAlias string from the constructor. This prefix
     * becomes useful when joining tables containing a field(s) with the same
     * name.  The alias and name should be separated with a "." character
     * (e.g., "alias.fieldName").
     *
     * @return the TupleDesc with field names from the underlying HeapFile,
     *         prefixed with the tableAlias string from the constructor.
     */
    public TupleDesc getTupleDesc() {
        // some code goes here
        TupleDesc tupleDesc = Database.getCatalog().getTupleDesc(tableid);
        String prefix = tableAlias != null ? tableAlias : "null";
        //遍历，添加前缀
        int len = tupleDesc.numFields();
        Type[] types = new Type[len];
        String[] filedsName = new String[len];
        for(int i = 0; i < len; i++){
            types[i] = tupleDesc.getFieldType(i);
            filedsName[i] = prefix + "." + tupleDesc.getFieldName(i);
        }
        return new TupleDesc(types, filedsName);
    }

    public boolean hasNext() throws TransactionAbortedException, DbException {
        // some code goes here
        if(dbFileIterator == null){
            return false;
        }
        return dbFileIterator.hasNext();
    }

    public Tuple next() throws NoSuchElementException,
            TransactionAbortedException, DbException {
        // some code goes here
        if(dbFileIterator == null){
            throw new NoSuchElementException("no next tuple");
        }
        Tuple t = dbFileIterator.next();
        if(t == null){
            throw new NoSuchElementException("no next tuple");
        }
        return t;
    }

    public void close() {
        // some code goes here
        dbFileIterator.close();
    }

    public void rewind() throws DbException, NoSuchElementException,
            TransactionAbortedException {
        // some code goes here
        dbFileIterator.rewind();
    }
}
```

 此时，我们的代码应该通过`ScanTest`系统测试 

### 2.7 简单查询

我们可以通过一个简单的文件来测试我们的`SeqScan`方法

我们需要自定义一个数据库文件`some_data_file.txt`，文件格式如下

```
1,1,1
2,2,2 
3,4,4
```

 或者通过如下图命令运行jar文件： 

![在这里插入图片描述](https://img-blog.csdnimg.cn/22c3e9310c764f3cb76bfd894ef04e9c.png)

 运行完成后会自动生成`some_data_file.dat`文件，接下来通过如下方法进行测试： 

```java
package simpledb;

import simpledb.common.Database;
import simpledb.common.Type;
import simpledb.execution.SeqScan;
import simpledb.storage.*;
import simpledb.transaction.TransactionId;

import java.io.File;
import java.io.IOException;

public class test {
    public static void main(String[] args) throws IOException {
        //lab1 终极实验
        Type[] types = new Type[]{Type.INT_TYPE, Type.INT_TYPE, Type.INT_TYPE};
        String[] names = new String[]{"field0", "field1", "field2"};

        TupleDesc tupleDesc = new TupleDesc(types, names);
        //问题：怎么将文件转化为二进制文件进行读取,配置运行方式
        //创建表
        HeapFile table1 = new HeapFile(new File("some_data_file.dat"), tupleDesc);
        Database.getCatalog().addTable(table1, "test");

        //进行扫描
        TransactionId tid = new TransactionId();
        SeqScan seqScan = new SeqScan(tid, table1.getId());

        try{
            seqScan.open();
            while(seqScan.hasNext()){
                Tuple t = seqScan.next();
                System.out.println(t);
            }
            seqScan.close();
            Database.getBufferPool().transactionComplete(tid);
        }catch (Exception e){
            System.out.println(e.getMessage());
        }

    }
}
```

最终结果如下:

![在这里插入图片描述](https://img-blog.csdnimg.cn/06257d3147ac45e384cf7c4db1ef2e75.png)

## 3、总结

总体来说，实验一算是比较简单的，根据已有的代码以及构造函数，构造相关变量即可完成实验一的大部分练习；需要我们使用IDEA进行调试，发现错误，解决错误，这也是一种收获；刚开始是云里雾里，到后来理解了整体架构之后还是简单了不少，一定要多看文档，多看相关的书补充知识，这样理解才会更深刻，才能够带我给我们更好的思路.

