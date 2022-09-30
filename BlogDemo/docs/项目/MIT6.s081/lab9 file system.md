---
title: 操作系统file system
date: 2022-09-30
publish: false
---

## Large files

### 要点

* 实现二级间接块索引(doubly-indirect block)的 inode 结构: ip->addrs[] 的前 11 个元素是直接块(direct block), 第 12 个元素是一个一级间接块索引(singly-indirect block), 第 13 个元素是一个二级间接块索引(doubly-indirect block).
* 修改 bmap() 函数以适配 double-indirect block

### 步骤

* 修改 `kernel/fs.h` 中的直接块号的宏定义 `NDIRECT` 为 11.根据实验要求, inode 中原本 12 个直接块号被修改为 了 11 个.

* 修改 inode 相关结构体的块号数组. 具体包括 kernel/fs.h 中的磁盘 inode 结构体 struct dinode的 addrs 字段; 和 kernel/file.h 中的内存 inode 结构体 struct inode 的 addrs 字段. 将二者数组大小设置为 NDIRECT+2, 因为实际 inode 的块号总数没有改变, 但 NDIRECT 减少了 1.

* 在 `kernel/fs.h` 中添加宏定义 `NDOUBLYINDIRECT`, 表示二级间接块号的总数, 类比 `NINDIRECT`. 由于是二级, 因此能够表示的块号应该为一级间接块号 `NINDIRECT` 的平方.

  ```cpp
  #define NDOUBLYINDIRECT (NINDIRECT * NINDIRECT)     // 添加
  ```

* 修改 kernel/fs.c 中的 bmap() 函数.该函数用于返回 inode 的相对块号对应的磁盘中的块号.
  由于 inode 结构中前 NDIRECT 个块号与修改前是一致的, 因此只需要添加对第 NDIRECT 即 13 个块的二级间接索引的处理代码. 处理的方法与处理第 NDIRECT 个块号即一级间接块号的方法是类似的, 只是需要索引两次.

  ```cpp
  static uint
  bmap(struct inode *ip, uint bn)
  {
    uint addr, *a;
    struct buf *bp;
  
    if(bn < NDIRECT){
      if((addr = ip->addrs[bn]) == 0)
        ip->addrs[bn] = addr = balloc(ip->dev);
      return addr;
    }
    bn -= NDIRECT;
  
    if(bn < NINDIRECT){
      // Load indirect block, allocating if necessary.
      if((addr = ip->addrs[NDIRECT]) == 0)
        ip->addrs[NDIRECT] = addr = balloc(ip->dev);
      bp = bread(ip->dev, addr);
      a = (uint*)bp->data;
      if((addr = a[bn]) == 0){
        a[bn] = addr = balloc(ip->dev);
        log_write(bp);
      }
      brelse(bp);
      return addr;
    }
  
    // doubly-indirect block 
    bn -= NINDIRECT;
    if(bn < NDOUBLYINDIRECT) {
      // get the address of doubly-indirect block
      if((addr = ip->addrs[NDIRECT + 1]) == 0) {
        ip->addrs[NDIRECT + 1] = addr = balloc(ip->dev);
      }
      bp = bread(ip->dev, addr);
      a = (uint*)bp->data;
      // get the address of singly-indirect block
      if((addr = a[bn / NINDIRECT]) == 0) {
        a[bn / NINDIRECT] = addr = balloc(ip->dev);
        log_write(bp);
      }
      brelse(bp);
      bp = bread(ip->dev, addr);
      a = (uint*)bp->data;
      bn %= NINDIRECT;
      // get the address of direct block
      if((addr = a[bn]) == 0) {
        a[bn] = addr = balloc(ip->dev);
        log_write(bp);
      }
      brelse(bp);
      return addr;
    }
  
    panic("bmap: out of range");
  }
  ```

* 修改 `kernel/fs.c` 中的 `itrunc()` 函数.该函数用于释放 inode 的数据块.
  由于添加了二级间接块的结构, 因此也需要添加对该部分的块的释放的代码. 释放的方式同一级间接块号的结构, 只需要两重循环去分别遍历二级间接块以及其中的一级间接块.

```cpp
void
itrunc(struct inode *ip)
{
  int i, j, k;  // lab9-1
  struct buf *bp, *bp2;     // lab9-1
  uint *a, *a2; // lab9-1

  for(i = 0; i < NDIRECT; i++){
    if(ip->addrs[i]){
      bfree(ip->dev, ip->addrs[i]);
      ip->addrs[i] = 0;
    }
  }

  if(ip->addrs[NDIRECT]){
    bp = bread(ip->dev, ip->addrs[NDIRECT]);
    a = (uint*)bp->data;
    for(j = 0; j < NINDIRECT; j++){
      if(a[j])
        bfree(ip->dev, a[j]);
    }
    brelse(bp);
    bfree(ip->dev, ip->addrs[NDIRECT]);
    ip->addrs[NDIRECT] = 0;
  }
  // free the doubly-indirect block - lab9-1
  if(ip->addrs[NDIRECT + 1]) {
    bp = bread(ip->dev, ip->addrs[NDIRECT + 1]);
    a = (uint*)bp->data;
    for(j = 0; j < NINDIRECT; ++j) {
      if(a[j]) {
        bp2 = bread(ip->dev, a[j]);
        a2 = (uint*)bp2->data;
        for(k = 0; k < NINDIRECT; ++k) {
          if(a2[k]) {
            bfree(ip->dev, a2[k]);
          }
        }
        brelse(bp2);
        bfree(ip->dev, a[j]);
        a[j] = 0;
      }
    }
    brelse(bp);
    bfree(ip->dev, ip->addrs[NDIRECT + 1]);
    ip->addrs[NDIRECT + 1] = 0;
  }

  ip->size = 0;
  iupdate(ip);
}
```

* 修改 `kernel/fs.h` 中的文件最大大小的宏定义 `MAXFILE`. 由于添加了二级间接块的结构, xv6 支持的文件大小的上限自然增大, 此处要修改为正确的值.

```cpp
#define MAXFILE (NDIRECT + NINDIRECT + NDOUBLYINDIRECT)
```

### 结果

![在这里插入图片描述](https://img-blog.csdnimg.cn/78f10430b772460381e05df46fd18b71.png)

![在这里插入图片描述](https://img-blog.csdnimg.cn/3e4f1da4e3c64e2d851b9ff70da0edcd.png)

​			![在这里插入图片描述](https://img-blog.csdnimg.cn/1572277930eb4c53907d6a1466ed575d.png)

## Symbolic links

