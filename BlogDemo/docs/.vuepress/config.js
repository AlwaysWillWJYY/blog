module.exports = {
  base: '/',
  locales: {
    '/': {
      lang: 'zh-CN'
    }
  },
  title: 'Auraro\'s Blog',
  description: '面向对象面向君，不负代码不负卿。',
  // dest: 'public',
  head: [
    ['link', { rel: 'icon', href: '/logo.png' }],
    ['meta', { name: 'viewport', content: 'width=device-width,initial-scale=1,user-scalable=no' }],
    ['meta', { name: 'keywords', content: 'AuraroJ,博客,conimi,nico'}],
    ['script', {}, `
      var _hmt = _hmt || [];
      (function() {
        var hm = document.createElement("script");
        hm.src = "https://hm.baidu.com/hm.js?xxxxxxxxxxxxxxxx"; 
        var s = document.getElementsByTagName("script")[0]; 
        s.parentNode.insertBefore(hm, s);
      })();`],
      // 引入jquery
  ["script", {
    "language": "javascript",
    "type": "text/javascript",
    "src": "https://cdn.bootcdn.net/ajax/libs/jquery/3.5.1/jquery.min.js"
  }],
  // 引入鼠标点击脚本
  ["script", {
    "language": "javascript",
    "type": "text/javascript",
    "src": "/js/MouseClickEffect.js"
  }],
  ],
  markdown: {
    lineNumbers: true,
  },
  dest: "docs/.vuepress/dist",
  themeConfig: {
    docsDir: 'docs',
    nav: [
      { text: '随性一点的主页', link: '/', icon: 'reco-home' },
      {
        text: "分类",
        icon: "reco-document",
        items: [
          {
            text: "随笔",
            link: "/随笔/me"
          },
          {
            text: "算法",
            link: "/LeetCode/"
          },
          {
            text: "计算机网络",
            link: "/network/浏览器输入url过程"
          },
          {
            text: "操作系统",
            link: "/Os/段式存储和页式存储"
          },
          {
            text: "中间件",
            link: "/中间件/"
          },
          {
            text: "Java",
            link: "/Java/"
          },
          {
            text: "Java框架",
            link: "/Java-框架/"
          },
          {
            text: "Linux",
            link: "/Linux/常见面试题"
          },
          
        ]
      },
      { text: '归档', link: "/timeline/",icon: "reco-date"},
      { text: '回顾', link: '/review', icon: 'reco-blog' },
      { text: '关于', link: "/aboutme",icon: "reco-account", },  
    ],

    type: 'blog',
    blogConfig: {
      // category: {
      //   location: 2, // 在导航栏菜单中所占的位置，默认2
      //   text: '分类' // 默认 “分类”
      // },
      tag: {
        location: 3, // 在导航栏菜单中所占的位置，默认3
        text: '随笔标签' //  默认 “标签”
      },
    },
    codeTheme: 'solarizedlight',
    // 当用户通过滚动查看页面的不同部分时，嵌套的标题链接和 URL 中的 Hash 值会实时更新（默认值：true）（性能优化）
    activeHeaderLinks: false,

    smoothScroll: true,
    valineConfig: {
      appId: '1HbrYKc61YA2cpKyOIfSjxfr-gzGzoHsz',
      appKey: 'MB0cbJwSejdYlix1AjjLLFRv',
    },
    logo: '/logo.png',
    authorAvatar: '/logo.png',
    search: true,
    searchMaxSuggestions: 5,
    subSidebar: 'auto',
    sidebar:'auto',
    collapsable: true,
    sidebar: {
      '/Linux/': [
          {
              title: '面试题',  //组名
              children: ['常见面试题'],   //该分组下要显示的文件的目录
          },
          {
              title: '指令',
              children: ['常见指令'],
          },
      ],
      '/中间件/': [
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
      ],
      '/Java/': [
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
      ],

      '/Java-框架/': [
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
      ],
      '/network/': [
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
      ],
      '/Os/': [
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
      ],
    },
  
    
    // 密钥
    // keyPage: {
    //   keys: ['271fb7d9e6f1e9507f6fd0f77439fd4a'], // 1.3.0 版本后需要设置为密文
    //   color: '#42b983', // 登录页动画球的颜色
    //   lineColor: '#42b983' // 登录页动画线的颜色
    // },
    sidebarDepth: 4,
    lastUpdated: 'Last Updated',
    author: 'AuraroJ',
    // 备案号
    // record: '',
    // recordLink: '',
    startYear: '2022',
    friendLink: [
      {
        title: '午后南杂',
        desc: 'Enjoy when you can, and endure when you must.',
        email: '1156743527@qq.com',
        link: 'https://www.recoluan.com'
      }
      
    ],
  },
    /**
     * support for
     * '' | 'default'
     * 'coy'
     * 'dark'
     * 'funky'
     * 'okaidia'
     * 'solarizedlight'
     * 'tomorrow'
     * 'twilight'
     */
  plugins: [
    ["sakura", {
      num: 20,  // 默认数量
      show: true, //  是否显示
      zIndex: -1,   // 层级
      img: {
        replace: false,  // false 默认图 true 换图 需要填写httpUrl地址
        httpUrl: '...'     // 绝对路径
      }     
  }],
    [
      //鼠标点击特效 先安装在配置， npm install vuepress-plugin-cursor-effects --save
      "cursor-effects",
      {
        size: 3,                    // size of the particle, default: 2
        shape: ['circle'],  // shape of the particle, default: 'star'
        zIndex: 999999999           // z-index property of the canvas, default: 999999999
      }
    ],
  // // 评论插件
  //   ['vuepress-plugin-comment',
  //   {
  //     choosen: 'valine', 
  //     // options选项中的所有参数，会传给Valine的配置
  //     options: {
  //       el: '#valine-vuepress-comment',
  //       appId: 'xxxxxxxxxxxxxxxxxx',
  //       appKey: 'xxxxxxxxxxxxxx'
  //     }
  //   }],
  // 代码复制弹窗插件
    ["vuepress-plugin-nuggets-style-copy", {
      copyText: "copy",
      tip: {
          content: "复制成功!"
      }
    }],
    ['@vuepress/last-updated', 
      {
        transformer: (timestamp, lang) => {
          return (new Date(timestamp)).toUTCString() 
          //或者用下面这段
          // const moment = require('moment')
          // moment.locale(lang)
          // return moment(timestamp).toLocaleString()
        }
      }],
    ['@vuepress-reco/vuepress-plugin-pagation', {
      perPage: 10
    }],
     // 音乐插件
     ['meting', {
      //metingApi: "https://meting.sigure.xyz/api/music",
      meting: {
          // 网易
          server: "netease",
          // 读取歌单
          type: "playlist",
          // 歌单id（只用修改这个）
          mid: "7256568321",
      },
      // 不配置该项的话不会出现全局播放器
      aplayer: {
          // 吸底模式
          fixed: true,
          mini: true,
          // 自动播放
          autoplay: false,
          // 歌曲栏折叠
          listFolded: true,
          // 颜色
          theme: '#f9bcdd',
          // 播放顺序为随机
          order: 'random',
          // 初始音量
          volume: 0.1,
          // 关闭歌词显示
          lrcType: 0
      },
      mobile: {
          // 手机端去掉cover图
          cover: false,
      }
  }],
    // 在代码区，添加一个拷贝按钮，用来拷贝代码
    ['vuepress-plugin-code-copy', true],
    ['sitemap', {
      hostname: 'https://conimi.com'
    }],
  ]
}