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
      })();`]
  ],
  markdown: {
    lineNumbers: true,
  },
  themeConfig: {
    nav: [
      { text: '主页', link: '/', icon: 'reco-home' },
      { text: '归档', link: '/archives.html', icon: 'reco-date' },
      { text: '回顾', link: '/review.html', icon: 'reco-blog' },
      { text: '关于', link: '/about.html', icon: 'reco-account' },
    ],

    type: 'blog',
    blogConfig: {
      category: {
        location: 2, // 在导航栏菜单中所占的位置，默认2
        text: '分类' // 默认 “分类”
      },
      tag: {
        location: 3, // 在导航栏菜单中所占的位置，默认3
        text: '标签' // 默认 “标签”
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
    sidebar:'auto',
    // sidebar: [{
    //   //组名
    //   title:'数据库',
    //   //是否可折叠
    //   collapstable:false,
    //   //组成员
    //   children:[
    //     //组菜单栏
    //     '/',
    //   ],
    // }],
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
    // record: 'xxxxxx',
    // recordLink: '',
    startYear: '2022',
    friendLink: [
      {
        title: '午后南杂',
        desc: 'Enjoy when you can, and endure when you must.',
        email: '1156743527@qq.com',
        link: 'https://www.recoluan.com'
      }
      // {
      //   title: '',
      //   desc: '',
      //   logo: '',
      //   link: ''
      // }
    ],
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
  },
  plugins: [
    // 更新刷新插件
    ['@vuepress/pwa', {
      serviceWorker: true,
      updatePopup: {
          message: "发现新内容可用",
          buttonText: "刷新"
      }
    }],
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