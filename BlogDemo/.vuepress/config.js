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
  themeConfig: {
    nav: [
      { text: '随性一点的主页', link: '/', icon: 'reco-home' },
      {
        text: "分类",
        icon: "reco-document",
        items: [
          {
            text: "随笔",
            link: "/docs/随笔/me"
          },
          {
            text: "计算机网络",
            link: "/docs/network/浏览器输入url过程"
          },
          {
            text: "操作系统",
            link: "/docs/Os/段式存储和页式存储"
          },
          {
            text: "中间件",
            link: "/docs/中间件/数据库/事务"
          },
          {
            text: "Java",
            link: "/docs/Java/JavaDesignModel/单例模式"
          },
          {
            text: "Java框架",
            link: "/docs/SpringCloud/微服务架构介绍"
          },
          {
            text: "Linux",
            link: "/docs/Linux/常见面试题"
          },
          
        ]
      },
      { text: '归档', link: "/timeline/",icon: "reco-date"},
      { text: '回顾', link: '/review.html', icon: 'reco-blog' },
      { text: '关于', link: '/about.html', icon: 'reco-account' },  
    ],

    type: 'blog',
    blogConfig: {
      // category: {
      //   location: 2, // 在导航栏菜单中所占的位置，默认2
      //   text: '分类' // 默认 “分类”
      // },
      tag: {
        location: 3, // 在导航栏菜单中所占的位置，默认3
        text: '标签' //  默认 “标签”
      },
    },
    
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
    sidebar: {
      '/docs/Linux/': [
          {
              title: '面试题',  //组名
              children: ['常见面试题'],   //该分组下要显示的文件的目录
          },
          {
              title: '指令',
              children: ['常见指令'],
          },
      ],
      '/docs/中间件/数据库/': [
        {
            title: 'SQL语句',  //组名
            children: ['常考sql','Drop-truncnte'],   //该分组下要显示的文件的目录
        },
        {
            title: '索引，日志和锁',
            children: ['分库分表','隔离级别','聚集索引和非聚集索引的区别',
          '事务','数据库的日志','数据库的索引','数据库的执行计划','索引',
          'InnoDB和MySIAM的区别', 'MVCC', 'Mysql存储引擎', 'Mysql和MongoDB的区别',
           'Mysql优化', 'Mysql中的连接', 'MySql中的锁', 'SQL注入攻击'],
        },
      ],
      '/docs/中间件/Docker/': [
        {
            title: '面试题',  //组名
            children: ['Docker常见面试题'],   //该分组下要显示的文件的目录
        },
        {
            title: '原理',
            children: ['Docker基本原理'],
        },
      ],
      '/docs/中间件/ElasticSearch/': [
        {
            title: '面试题',  //组名
            children: ['ES经典面试题'],   //该分组下要显示的文件的目录
        },
        {
            title: '原理',
            children: ['基础介绍及索引原理分析'],
        },
        {
          title: '更新数据的方式',
          children: ['关于elasticsearch中更新数据的几种方式'],
      },
      ],
      '/docs/中间件/kafka/': [
        {
            title: '面试题',  //组名
            children: ['Kafka常见面试题'],   //该分组下要显示的文件的目录
        },
        {
            title: '原理',
            children: ['消息队列的比较', 'Kafka', 'Kafka的三种消费模式',
            'Kafka选举机制', 'LinkedBlockingQueue'],
        },
      ],
      '/docs/中间件/Nginx/': [
        {
            title: '面试题',  //组名
            children: ['Nginx常见面试题'],   //该分组下要显示的文件的目录
        },
        {
            title: '原理',
            children: ['Nginx简介','Nginx反向代理','Nginx负载均衡'],
        },
      ],
      '/docs/中间件/redis/': [
        {
            title: 'Redis基础',  //组名
            children: ['Redis','Redis的线程模型','Epoll、poll、select区别'],   //该分组下要显示的文件的目录
        },
        {
            title: 'Redis高级',
            children: ['如何设计一个本地缓存','Redis的缓存击穿、缓存穿透和缓存雪崩',
            'Redis高级','Redis集群分片以及选举原理','Redis哨兵', 'Redis主从复制',
            'Redis主从复制和集群的区别', 'Redis做消息队列'],
        },
      ],
      '/docs/中间件/Zookeeper/': [
        {
            title: '面试题',  //组名
            children: ['Zookeeper常见面试题'],   //该分组下要显示的文件的目录
        },
        {
            title: '原理',
            children: ['zookeeper的定义与工作原理', 'zookeeper的工作原理', 
            'zookeeper应用场景'],
        },
      ],


      '/docs/Java/Java-Web/': [
        {
            title: '常识',  //组名
            children: ['JSON', 'Servlet', 'Tomcat'],   //该分组下要显示的文件的目录
        },
      ],
      '/docs/Java/JavaDesignModel/': [
        {
            title: '设计原则',  //组名
            children: ['设计模式的六大原则'],   //该分组下要显示的文件的目录
        },
        {
          title: '常见设计模式',  //组名
          children: ['单例模式', '代理模式', '简单工厂模式', '建造者模式',
          '适配器模式', '装饰模式', 'JavaIO流中涉及的设计模式'],   //该分组下要显示的文件的目录
        },
      ],

      '/docs/Java/JavaSE/': [
        {
            title: 'JAVA基础',  //组名
            children: ['BIO-NIO', 'IO'],   //该分组下要显示的文件的目录
        },
      ],

      '/docs/Java/JUC/': [
        {
            title: '锁',  //组名
            children: ['Reentrantlock', 'synchronized和lock的区别',],   //该分组下要显示的文件的目录
        },
        {
          title: '线程池',  //组名
          children: ['线程池'],   //该分组下要显示的文件的目录
        },
        {
          title: '其他',  //组名
          children: ['BIO、NIO、AIO的区别', 'volatile关键字'],   //该分组下要显示的文件的目录
        },
      ],

      '/docs/Java/JVM/': [
        {
            title: '锁',  //组名
            children: ['读写锁', '锁'],   //该分组下要显示的文件的目录
        },
        {
          title: 'JVM基础知识',  //组名
          children: ['垃圾回收机制', '内存泄漏及解决办法', '内存溢出',
          '四钟引用', '字符串常量池', 'class常量池', 'G1和CMS',
          'Java对象头', 'JIT', 'JVM调优', 'ThreadLocal'],   //该分组下要显示的文件的目录
        },
      ],

      '/docs/Java-框架/分布式/': [
        {
            title: '分布式',  //组名
            children: ['分布式缓存', '分布式理论和模型', '分布式事务',
            '分布式锁', '分布式session', '分布式Session的解决方案', 
            '高可用和高并发'],   //该分组下要显示的文件的目录
        },
      ],

      '/docs/Java-框架/springboot/': [
        {
            title: 'SpringBoot',  //组名
            children: ['Springboot', 'SpringBoot常用注解', 'SpringBoot面试题',
            'Springboot自动装配'],   //该分组下要显示的文件的目录
        },
      ],

      '/docs/Java-框架/SpringCloud/': [
        {
            title: 'SpringCloud基础',  //组名
            children: ['常见的设计模式和应用', '出现和发展', '如何具体实践微服务',
            '微服务的具体特征', '微服务的优缺点', '微服务架构介绍', '微服务开发的区别',
            'SOA和微服务的区别'],   //该分组下要显示的文件的目录
        },
      ],

      '/docs/Java-框架/SpringSecurity/': [
        {
            title: 'SpringSecurity网关',  //组名
            children: ['令牌还原与Session', '认证与授权', '整体布局切入点',
            'SecurityFilterChain的构建'],   //该分组下要显示的文件的目录
        },
      ],
      
      '/docs/Java-框架/ssm/': [
        {
            title: 'SSM框架',  //组名
            children: ['动态代理和静态代理', 'AOP', 'Controller', 'IOC',
            'Java中的反射', 'Spring对事务的管理', 'Spring中的两种代理',
            'Spring中的bean', 'SpringBoot', 'SpringMvc'],   //该分组下要显示的文件的目录
        },
      ],

      '/docs/Java-框架/ssm/': [
        {
            title: 'SSM框架',  //组名
            children: ['动态代理和静态代理', 'AOP', 'Controller', 'IOC',
            'Java中的反射', 'Spring对事务的管理', 'Spring中的两种代理',
            'Spring中的bean', 'SpringBoot', 'SpringMvc'],   //该分组下要显示的文件的目录
        },
      ],

      '/docs/network/': [
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
      '/docs/Os/': [
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
      perPage: 18
    }],
    ['sitemap', {
      hostname: 'https://conimi.com'
    }],
  ]
}