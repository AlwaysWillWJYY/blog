/* 侧边栏配置 */
function getLinuxRoute() {
    return [
        {
            title: '面试题',  //组名
            children: ['常见面试题'],   //该分组下要显示的文件的目录
        },
        {
            title: '指令',
            children: ['常见指令'],
        },
    ]
}

// 中间件 侧边栏
function getZjjRoute(){
    return [
        //Group1
        {
            title: '概述',
            children: [
                {
                    title: '综述',   // 必要的
                    children: ['']
                }
            ]
        },
        //Group4
        {
          title: '数据库',
          children: [
              {
                  title: 'SQL语句',  //组名
                  children: ['数据库/常考sql','数据库/Drop-truncnte'],   //该分组下要显示的文件的目录
              },
              {
                  title: '索引，日志和锁',
                  children: ['数据库/分库分表','数据库/隔离级别','数据库/聚集索引和非聚集索引的区别',
                '数据库/事务','数据库/数据库的日志','数据库/数据库的索引','数据库/数据库的执行计划','数据库/索引',
                '数据库/InnoDB和MySIAM的区别', '数据库/MVCC', '数据库/Mysql存储引擎', '数据库/Mysql和MongoDB的区别',
                '数据库/Mysql优化', '数据库/Mysql中的连接', '数据库/MySql中的锁', '数据库/SQL注入攻击'],
              },
          ],
        },
        //Group2
        {
            title: 'Docker',
            children: [
              {
                  title: '面试题',  //组名
                  children: ['Docker/Docker常见面试题'],   //该分组下要显示的文件的目录
              },
              {
                  title: '原理',
                  children: ['Docker/Docker基本原理'],
              },
            ],
        },
        //Group3
        {
          title: 'ElasticSearch',
          children: [
              {
                  title: '面试题',  //组名
                  children: ['ElasticSearch/ES经典面试题'],   //该分组下要显示的文件的目录
              },
              {
                  title: '原理',
                  children: ['ElasticSearch/基础介绍及索引原理分析'],
              },
              {
                title: '更新数据的方式',
                children: ['ElasticSearch/关于elasticsearch中更新数据的几种方式'],
            },
          ],
        },
        //Group5
        {
          title: 'kafka',
          children: [
              {
                  title: '面试题',  //组名
                  children: ['kafka/Kafka常见面试题'],   //该分组下要显示的文件的目录
              },
              {
                  title: '原理',
                  children: ['kafka/消息队列的比较', 'kafka/Kafka', 'kafka/Kafka的三种消费模式',
                  'kafka/Kafka选举机制', 'kafka/LinkedBlockingQueue'],
              },
          ],
        },

         //Group6
         {
          title: 'Nginx',
          children: [
              {
                  title: '面试题',  //组名
                  children: ['Nginx/Nginx常见面试题'],   //该分组下要显示的文件的目录
              },
              {
                  title: '原理',
                  children: ['Nginx/Nginx简介','Nginx/Nginx反向代理','Nginx/Nginx负载均衡'],
              },
          ],
        },

        //Group7
        {
          title: 'Redis',
          children: [
            {
              title: 'Redis基础',  //组名
              children: ['redis/Redis','redis/Redis的线程模型','redis/Epoll、poll、select区别'],   //该分组下要显示的文件的目录
            },
            {
                title: 'Redis高级',
                children: ['redis/如何设计一个本地缓存','redis/Redis的缓存击穿、缓存穿透和缓存雪崩',
                'redis/Redis高级','redis/Redis集群分片以及选举原理','redis/Redis哨兵', 'redis/Redis主从复制',
                'redis/Redis主从复制和集群的区别', 'redis/Redis做消息队列'],
            },
          ],
        },

         //Group8
         {
          title: 'Zookeeper',
          children: [
            {
                title: '面试题',  //组名
                children: ['Zookeeper/Zookeeper常见面试题'],   //该分组下要显示的文件的目录
            },
            {
                title: '原理',
                children: ['Zookeeper/zookeeper的定义与工作原理', 'Zookeeper/zookeeper的工作原理', 
                'Zookeeper/zookeeper应用场景'],
            },
          ],
        },
    ]
}

// Java相关 侧边栏
function getJavaRoute() {
    return [
         //Group1
         {
            title: '概述',
            children: [
                {
                    title: '综述',   // 必要的
                    children: ['']
                }
            ]
        },
        //Group4
        {
          title: 'JAVA基础',
          children: [
            {
              title: 'JAVASE',  //组名
              children: ['JavaSE/BIO-NIO', 'JavaSE/IO'],   //该分组下要显示的文件的目录
            },
          ],
        },
        //Group2
        {
            title: 'Java-Web',
            children: [
                  'Java-Web/JSON', 
                  'Java-Web/Servlet', 
                  'Java-Web/Tomcat'
            ],
        },
        //Group3
        {
          title: '设计模式',
          children: [
              {
                  title: '设计原则',  //组名
                  children: ['JavaDesignModel/设计模式的六大原则'],   //该分组下要显示的文件的目录
              },
              {
                title: '常见设计模式',  //组名
                children: ['JavaDesignModel/单例模式', 'JavaDesignModel/代理模式', 'JavaDesignModel/简单工厂模式', 
                'JavaDesignModel/建造者模式','JavaDesignModel/适配器模式', 'JavaDesignModel/装饰模式', 'JavaDesignModel/JavaIO流中涉及的设计模式'],   //该分组下要显示的文件的目录
              },
          ],
        },
        //Group5
        {
          title: 'JUC',
          children: [
            {
                title: '锁',  //组名
                children: ['JUC/Reentrantlock', 'JUC/synchronized和lock的区别',],   //该分组下要显示的文件的目录
            },
            {
              title: '线程池',  //组名
              children: ['JUC/线程池'],   //该分组下要显示的文件的目录
            },
            {
              title: '其他',  //组名
              children: ['JUC/BIO、NIO、AIO的区别', 'JUC/volatile关键字'],   //该分组下要显示的文件的目录
            },
          ],
        },

         //Group6
         {
          title: 'JVM',
          children: [
              {
                  title: '锁',  //组名
                  children: ['JVM/读写锁', 'JVM/锁'],   //该分组下要显示的文件的目录
              },
              {
                title: 'JVM基础知识',  //组名
                children: ['JVM/垃圾回收机制', 'JVM/内存泄漏及解决办法', 'JVM/内存溢出',
                'JVM/四钟引用', 'JVM/字符串常量池', 'JVM/class常量池', 'JVM/G1和CMS',
                'JVM/Java对象头', 'JVM/JIT', 'JVM/JVM调优', 'JVM/ThreadLocal'],   //该分组下要显示的文件的目录
              },
          ],
        },
    ]
}
//面经侧边栏
function getViewRoute(){
    return [
        //Group1
        {
           title: '概述',
           children: [
               {
                   title: '综述',   // 必要的
                   children: ['']
               }
           ]
       },
       //Group4
       {
         title: '后端Java',
         children: [
           {
             title: '后端面经',  //组名
             children: ['后端面经/快手实习面经'],   //该分组下要显示的文件的目录
           },
         ],
       },
       
   ]
}
//Java 框架侧边栏
function getJavaFrameRoute() {
    return [
         //Group1
         {
            title: '概述',
            children: [
                {
                    title: '综述',   // 必要的
                    children: ['']
                }
            ]
        },
        //Group4
        {
          title: '分布式',
          children: [
            {
              title: '分布式',  //组名
              children: ['分布式/分布式缓存', '分布式/分布式理论和模型', '分布式/分布式事务',
              '分布式/分布式锁', '分布式/分布式session', '分布式/分布式Session的解决方案', 
              '分布式/高可用和高并发'],   //该分组下要显示的文件的目录
            },
          ],
        },
        //Group2
        {
            title: 'SpringBoot',
            children: [
              {
                  title: 'SpringBoot',  //组名
                  children: ['springboot/Springboot', 'springboot/SpringBoot常用注解', 'springboot/SpringBoot面试题',
                  'springboot/Springboot自动装配'],   //该分组下要显示的文件的目录
              },
            ],
        },
        //Group3
        {
          title: 'SpringCloud',
          children: [
            {
              title: 'SpringCloud基础',  //组名
              children: ['SpringCloud/常见的设计模式和应用', 'SpringCloud/出现和发展', 'SpringCloud/如何具体实践微服务',
              'SpringCloud/微服务的具体特征', 'SpringCloud/微服务的优缺点', 'SpringCloud/微服务架构介绍', 'SpringCloud/微服务开发的区别',
              'SpringCloud/SOA和微服务的区别'],   //该分组下要显示的文件的目录
            },
          ],
        },
        //Group5
        {
          title: 'SpringSecurity',
          children: [
            {
              title: 'SpringSecurity网关',  //组名
              children: ['SpringSecurity/令牌还原与Session', 'SpringSecurity/认证与授权', 'SpringSecurity/整体布局切入点',
              'SpringSecurity/SecurityFilterChain的构建'],   //该分组下要显示的文件的目录
           },
          ],
        },

         //Group6
         {
          title: 'SSM',
          children: [
            {
              title: 'SSM框架',  //组名
              children: ['ssm/动态代理和静态代理', 'ssm/AOP', 'ssm/Controller', 'ssm/IOC',
              'ssm/Java中的反射', 'ssm/Spring对事务的管理', 'ssm/Spring中的两种代理',
              'ssm/Spring中的bean', 'ssm/SpringBoot', 'ssm/SpringMvc'],   //该分组下要显示的文件的目录
             },
          ],
        },
    ]
}

function getNetworkRoute(){
    return [
        {
            title: '常见面试题',  //组名
            children: ['常见面试题'],   //该分组下要显示的文件的目录
        },
        {
          title: '计算机网络概述',  //组名
          children: ['计算机网络概述'],   //该分组下要显示的文件的目录
        },
        {
          title: '数据链路层',  //组名
          children: ['数据链路层'],   //该分组下要显示的文件的目录
        },
        {
          title: '网络层',  //组名
          children: ['网络层'],   //该分组下要显示的文件的目录
        },
        {
          title: '传输层',  //组名
          children: ['传输层'],   //该分组下要显示的文件的目录
        },
        {
          title: '细节常识',  //组名
          children: ['浏览器输入url过程', '三次握手四次挥手', '转发和重定向的区别',
          'COOKIE and SESSION', 'DNS解析过程', 'GET and POST', 'HTTP and Servlet',
          'HTTP', 'HTTP版本', 'HTTP的请求头', 'HTTP和HTTPS', 'HTTPS和HTTP'],   //该分组下要显示的文件的目录
        },
    ]
}

function getOsRoute(){
    return [
        {
            title: '面试题',  //组名
            children: ['面试题'],   //该分组下要显示的文件的目录
        },
        {
          title: '进程与线程',  //组名
          children: ['进程的状态', '进程和线程的区别', '进程间通信', '进程间通信方式',
          '操作系统中的进程调度策略', '线程的状态', '线程间通信','信号量和PV', '用户态和核心态'],   //该分组下要显示的文件的目录
        },
        {
          title: '内存管理',  //组名
          children: ['常见的页面置换算法', '段式存储和页式存储', '内存的分配方式', '虚拟内存'],   //该分组下要显示的文件的目录
        },
    ]
}
// 项目侧边栏
function getXiangRoute() {
    return [

        {
            title: 'MIT项目',
            children: [
                {
                    title: 'MIT数据库',   // 必要的
                    children: ['MIT6.830/lab1','MIT6.830/lab2','MIT6.830/lab3','MIT6.830/lab4','MIT6.830/lab5','MIT6.830/lab6']
                },
                {
                    title: 'MIT操作系统',   // 必要的
                    children: ['MIT6.s081/lab1 Xv6 and Unix utilities','MIT6.s081/lab2 system calls','MIT6.s081/lab3 Page tables',
                'MIT6.s081/lab4 Trap','MIT6.s081/lab5 Lazy allocation','MIT6.s081/lab6 Copy-on-write fork','MIT6.s081/lab7 Multithreading',
            'MIT6.s081/lab8 locks','MIT6.s081/lab9 file system','MIT6.s081/lab10 mmap']
                },
                {
                    title: 'MIT分布式系统',   // 必要的
                    children: ['MIT6.824/lab1']
                }
            ]
        },
        {
            title: '游戏项目',
            children: [
                {
                    title: 'AI对抗平台',   // 必要的
                    children: ['AI对抗平台/综述']
                },
            ]
        },
        {
            title: '仿北邮人论坛',
            children: [
                {
                    title: '仿北邮人论坛',   // 必要的
                    children: ['仿北邮人论坛/综述']
                }
            ]
        },
    ]
}

// 算法侧边栏
function getAlgorithmRoute() {
    return [
        {
            title: '提高课算法题解',
            children: [
                {
                    title: '搜索',   // 必要的
                    children: ['提高课/搜索/城堡问题','提高课/搜索/池塘计数','提高课/搜索/单词接龙','提高课/搜索/红与黑dfs','提高课/搜索/马走日',
                    '提高课/搜索/迷宫','提高课/搜索/山峰和山谷','提高课/搜索/迷宫问题','提高课/搜索/小猫爬山','提高课/搜索/武士风度的牛','提高课/搜索/矩阵距离','提高课/搜索/数独',
                    '提高课/搜索/木棒','提高课/搜索/热浪','提高课/搜索/信使','提高课/搜索/划分为k个相等的子集','提高课/搜索/相似度为k的子串',
                '提高课/搜索/通信线路','提高课/搜索/电路维修','提高课/搜索/观光','提高课/搜索/新的开始','提高课/搜索/最短网络']
                },
                {
                    title: '递归与递推',   // 必要的
                    children: ['提高课/递归与递推/费解的开关']
                },
                {
                    title: '动态规划',   // 必要的
                    children: [
                        {
                            title: '数字三角形',   // 必要的
                            children: ['提高课/动态规划/数字三角形/摘花生','提高课/动态规划/数字三角形/摘樱桃','提高课/动态规划/数字三角形/最低通行费']
                        },
                        {
                            title: '区间dp',   // 必要的
                            children: ['提高课/动态规划/区间dp/环形石子合并']
                        },
                        {
                            title: '线性dp',   // 必要的
                            children: ['提高课/动态规划/线性dp/最长上升公共子序列']
                        },
                        {
                            title: '状压dp',   // 必要的
                            children: ['提高课/动态规划/状压dp/小国王','提高课/动态规划/状压dp/玉米田']
                        },
                    ]
                }
            ]
        },
        {
            title: '笔面试算法题解',
            children: [
                {
                    title: '面试指南',   // 必要的
                    children: ['笔试题/打气球的最大分数','笔试题/子数组异或和为0的最大划分','笔试题/字符串的交错组成','笔试题/龙与地下城游戏问题',
                '笔试题/数字字符串转换为字母组合的总数','笔试题/表达式得到期望结果的组成组数','笔试题/跳跃游戏','笔试题/派对的最大快乐值','笔试题/统计和生成所有不同的二叉树',
            '笔试题/通过先序和中序数组构成后续数组','笔试题/最小包含子串的长度']
                },
                {
                    title: '公司笔试',   // 必要的
                    children: ['笔试题/回忆']
                }
            ]
        },
        {
            title: '周赛算法题解',
            children: [
                {
                    title: '双周赛',   // 必要的
                    children: ['周赛/86场双周赛','周赛/87场双周赛','周赛/88场双周赛','周赛/89场双周赛']
                },
                {
                    title: '周赛',   // 必要的
                    children: ['周赛/309场周赛','周赛/310场周赛','周赛/311场周赛','周赛/312场周赛','周赛/313场周赛','周赛/战队赛','周赛/314场周赛','周赛/315场周赛']
                },
                {
                    title: 'AcWing周赛',   // 必要的
                    children: ['周赛/AcWing68场周赛','周赛/AcWing70场周赛','周赛/AcWing72场周赛']
                }
            ]
        },
    ]
}


// 论文侧边栏
function getPaperRoute() {
    return [
        {
            title: '概述',
            children: [
                {
                    title: '综述',   // 必要的
                    children: ['']
                }
            ]
        },
        {
            title: '漏洞检测',
            children: [
                {
                    title: '漏洞检测',   // 必要的
                    children: ['漏洞检测/笔记','漏洞检测/一种用于编程和自然语言的预训练模型']
                },
            ]
        },
    ]
}

module.exports = {
    getLinuxRoute,
    getZjjRoute,
    getJavaRoute,
    getJavaFrameRoute,
    getNetworkRoute,
    getOsRoute,
    getXiangRoute,
    getAlgorithmRoute,
    getPaperRoute,
    getViewRoute

    // getToolRoute
}
