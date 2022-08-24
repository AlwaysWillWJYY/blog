---
title: ES更新数据
date: 2022-04-12

---


做为一个成熟的框架，Elasticsearch里面提供了丰富的操做数据的api，本篇咱们就来学习一下在es中更新数据的几种方式

### （一）更新文档json

`（1）部分更新：api`

java api：多线程

```java
HashMap<String,Object> data=new HashMap<>();
data.put("name","woshigcs");
data.put("age",25);
UpdateRequestBuilder urb= client.prepareUpdate("active2018-03-21", "active", "18");
urb.setDoc(data);
urb.execute().actionGet();
System.out.println("update ok......");
```
注意部分更新功能，前提是索引和该条数据已经存在，不然会抛出对应的异常，只要任何一个不知足，都会更新失败。并发

curl：app

```java
curl -XPOST 'localhost:9200/test/type1/1/_update' -d '{
    "doc" : {
        "name" : "new_name"
    }
}
```

`（2）使用detect_noop框架`:

java api：curl

```java
HashMap<String,Object> data=new HashMap<>();
data.put("name","woshigcs");
data.put("age",25);
UpdateRequestBuilder urb= client.prepareUpdate("active2018-03-21", "active", "18");
urb.setDoc(data);
urb.setDetectNoop(false);//默认是true
urb.execute().actionGet();
System.out.println("update ok......");
```
curl方式：oop

```java
curl -XPOST 'localhost:9200/test/type1/1/_update' -d '{
    "doc" : {
        "name" : "new_name"
    },
        "detect_noop": false
}
```

注意detect_noop的意思：post

默认状况下detect_noop=true

默认状况下只有原来的source和新的source存在不一样的字段状况下才会重建索引，若是如出一辙是不会触发重建索引的，若是将detect_noop=false无论内容有没有变化都会重建索引，这一点能够经过version的值的变化来发现

更新的文档，必须提早存在，除非你用upset+script来更新，不然会报document missing异常

### （二）script + upset更新方式：

`java api`

```java

HashMap<String,Object> params=new HashMap<>();
HashMap<String,Object> data=new HashMap<>();
data.put("name","12345");
params.put("source",data);
StringBuffer sb_json = new StringBuffer("ctx._source=source");
Script script = new Script(sb_json.toString(), ScriptService.ScriptType.INLINE, "groovy", params);
UpdateRequestBuilder urb= client.prepareUpdate("active2018-03-11", "active", "16");
urb.setScript(script);
urb.setUpsert(data);
urb.execute().actionGet();
System.out.println("更新完事。。。。。。 ");

```

`curl`

```java
curl -XPOST 'localhost:9200/test/type1/1/_update' -d '{
    "script" : {
        "inline": "ctx._source.counter += count",
            "params" : {
                "count" : 4
            }
     },
     "upsert" : {
         "counter" : 1
     }
}'

```

### （三）：scripted_upsert用法：

官网个的例子没有跑通，下面这个是按照stackoverflow上面的例子改写的，能够经过在postman里面已经跑通：首先是在post请求的url
java api
```java
HashMap<String,Object> params=new HashMap<>();
HashMap<String,Object> data=new HashMap<>();
data.put("name","12345");
HashMap<String,Object> newdata=new HashMap<>();
newdata.put("name","789");
params.put("data",data);
params.put("newdata",newdata);
StringBuffer sb_json = new StringBuffer("if (ctx.op == \"create\") ctx._source=data; else ctx._source=newdata");
Script script = new Script(sb_json.toString(), ScriptService.ScriptType.INLINE, "groovy", params);
UpdateRequestBuilder urb= client.prepareUpdate("active2018-03-11", "active", "16");
urb.setScript(script);
urb.setScriptedUpsert(true);
urb.setUpsert("{}");//必须有这个值，不然会报document missing exception
urb.execute().actionGet();
System.out.println("更新完事。。。。。。 ");
```

curl方式

而后是下面的body里面选择raw然类型是JSON（application/json）:

```java
{
    "scripted_upsert":true,
        "script" : {
            "script":"if (ctx.op == \"create\") ctx._source=data; else ctx._source=newdata ",
            "params" : {
                "data":{
                    "ct":11,
                    "aid":"a22",
                    "tid":"t11"
                },
                "newdata":{
                    "ct":1000,
                    "aid":"a2qq2",
                    "tid":"qq"
                }
            }

        },
        "upsert" : {}
}
```

执行上面的脚本，首先会检查索引是否存在，若是不存在就会新建一个索引，而后会判断id等于11这条数据存在不存在，若是不存在就把data里面的数据做为第一次的插入数据，若是已经存在就会把原来的数据删除掉而后把newdata的数据插入进去，能够理解就是更新。这里须要注意，若是用的是动态mapping，须要注意数据的类型，动态mapping下两条数据里面的同一个字段能够拥有不一样的类型，这样既灵活又带来了风险，因此对于严谨类型的数据推荐使用静态mapping，严格限定字段的类型。

### （四）doc_as_upsert方式：

这个方式其实就是前面两个的简洁版，意思就是没有就插入有就覆盖，注意这是覆盖并非把原来的删除在插入，并且若是动态mapping还能够改变字段的类型，但不建议这么用。

java api：

```java
HashMap<String,Object> data=new HashMap<>();
data.put("name","234");
data.put("age",123);
data.put("address","北京海淀区");
UpdateRequestBuilder urb= client.prepareUpdate("active2018-03-11", "active", "16");
urb.setDoc(data);
urb.setDocAsUpsert(true);
urb.execute().actionGet();//
System.out.println("操做成功......");

```

curl方式：

http://192.168.201.5:9200/active2018-03-11/active/12/_update
```java
{
    "doc" : {
        "name" : "6755",
            "age":12,
            "address":"北京朝阳"

    },
        "doc_as_upsert" : true
}
```

总结：

上面更新操做es几种方法，整体来讲使用script更新的方式最强大，能够作一些复杂业务场景的操做，如数值的累增或者操做集合对象元素的追加或者删除，其余的几种方式适合简单的更新操做。

无论使用那种更新方式，咱们都须要考虑并发问题，经过前面一系列的文章的介绍，咱们知道es里面的更新，删除，都是伪操做，尤为是更新，在es内部的实际处理流程是：

（1）查询旧的document数据
（2）修改为最新的数据
（3）而后重建整条document

在这里的三个阶段，若是同时又另一个进程也在修改该条数据，就会发生冲突，es里面是根据version字段来判断是否冲突的，在上面的步骤中的第一步查询旧的数据会获得version字段，在第三步时候写的时候会把这个version字段在传回，这个时候若是发现version不一致就会发生冲突然后抛出异常，因此你们在使用的时候能够优先经过设计避免多线程操做，若是实在无法避免则可使用es里面的提供的version字段来经过乐观锁控制并发问题，若是操做是简单的累加或累减还能够用更简单的方法冲突重试来解决并发问题，一句话就是具体场景具体分析

