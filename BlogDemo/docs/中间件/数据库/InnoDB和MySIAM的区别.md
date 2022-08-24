---
title: InnoDB和MyISAM的区别
date: 2022-04-07

---

### MySQL中的存储引擎InnoDB和MyISAM的区别？

1）InnoDB支持事务，而MyISAM不支持事务，这是两者最大的区别；

2）InnoDB支持外键，而MyISAM不支持外键；

3）InnoDB支持行锁，但是MyISAM不支持行锁；

4）MyISAM更适合于查找和插入，而InnoDB适用于频繁的修改和安全性较高的数据库操作；

5）MySQL5.5之后，InnoDB是默认的存储引擎。
