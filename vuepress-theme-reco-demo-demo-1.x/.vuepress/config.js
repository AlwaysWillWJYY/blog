// module.exports = {
//   title: "vuepress-theme-reco",
//   description: 'A simple and beautiful vuepress blog theme .',
//   dest: 'public',
//   head: [
//     ['link', { rel: 'icon', href: '/favicon.ico' }],
//     ['meta', { name: 'viewport', content: 'width=device-width,initial-scale=1,user-scalable=no' }]
//   ],
//   theme: 'reco',
//   themeConfig: {
//     nav: [
//       { text: 'Home', link: '/', icon: 'reco-home' },
//       { text: 'TimeLine', link: '/timeline/', icon: 'reco-date' },
//       { text: 'Docs', 
//         icon: 'reco-message',
//         items: [
//           { text: 'vuepress-reco', link: '/docs/theme-reco/' }
//         ]
//       },
//       { text: 'Contact', 
//         icon: 'reco-message',
//         items: [
//           { text: 'GitHub', link: 'https://github.com/recoluan', icon: 'reco-github' }
//         ]
//       }
//     ],
//     sidebar: {
//       '/docs/theme-reco/': [
//         '',
//         'theme',
//         'plugin',
//         'api'
//       ]
//     },  
//     type: 'blog',
//     // 博客设置
//     blogConfig: {
//       category: {
//         location: 2, // 在导航栏菜单中所占的位置，默认2
//         text: 'Category' // 默认 “分类”
//       },
//       tag: {
//         location: 3, // 在导航栏菜单中所占的位置，默认3
//         text: 'Tag' // 默认 “标签”
//       }
//     },
//     friendLink: [
//       {
//         title: '午后南杂',
//         desc: 'Enjoy when you can, and endure when you must.',
//         email: '1156743527@qq.com',
//         link: 'https://www.recoluan.com'
//       },
//       {
//         title: 'vuepress-theme-reco',
//         desc: 'A simple and beautiful vuepress Blog & Doc theme.',
//         avatar: "https://vuepress-theme-reco.recoluan.com/icon_vuepress_reco.png",
//         link: 'https://vuepress-theme-reco.recoluan.com'
//       },
//     ],
//     logo: '/logo.png',
//     // 搜索设置
//     search: true,
//     searchMaxSuggestions: 10,
//     // 自动形成侧边导航
//     // sidebar: 'auto',
//     // 最后更新时间
//     lastUpdated: 'Last Updated',
//     // 作者
//     author: 'reco_luan',
//     // 作者头像
//     authorAvatar: '/avatar.png',
//     // 备案号
//     record: 'xxxx',
//     // 项目开始时间
//     startYear: '2017'
//     /**
//      * 密钥 (if your blog is private)
//      */

//     // keyPage: {
//     //   keys: ['your password'],
//     //   color: '#42b983',
//     //   lineColor: '#42b983'
//     // },

//     /**
//      * valine 设置 (if you need valine comment )
//      */

//     // valineConfig: {
//     //   appId: '...',// your appId
//     //   appKey: '...', // your appKey
//     // }
//   },
//   markdown: {
//     lineNumbers: true
//   }
// }  
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
    logo: '/avatar.png',
    authorAvatar: '/avatar.png',
    search: true,
    searchMaxSuggestions: 5,
    subSidebar: 'auto',
    sidebarDepth: 4,
    lastUpdated: 'Last Updated',
    author: 'AuraroJ',
    // 备案号
    // record: 'xxxxxx',
    // recordLink: '',
    startYear: '2022',
    /**
     * 密钥 (if your blog is private)
     */
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