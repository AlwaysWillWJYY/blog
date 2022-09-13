const nav = require('./nav');

const sidebar = require('./sidebar');

module.exports = {
  base: '/',
  locales: {
    '/': {
      lang: 'zh-CN'
    }
  },
  title: 'Auraro\'s Blog',
  description: '面向对象面向君，不负代码不负卿。',
  head: [
    ['link', { rel: 'icon', href: '/logo.png' }],
    ['meta', { name: 'viewport', content: 'width=device-width,initial-scale=1,user-scalable=no' }],
    ['meta', { name: 'keywords', content: 'AuraroJ,博客,conimi,nico'}],
    ["meta", {name: "apple-mobile-web-app-capable", content: "yes"}],
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
  theme: "reco",
  markdown: {
    lineNumbers: true,
    externalLinks: {
      target: '_blank', rel: 'noopener noreferrer'
    }
  },
  dest: "docs/.vuepress/dist",
  themeConfig: {
    author: 'AuraroJ',
    docsDir: 'docs',
    editLinks: true,
    subSidebar: 'auto',
    nav: nav.getNav(),
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
    valineConfig: {
      appId: '1HbrYKc61YA2cpKyOIfSjxfr-gzGzoHsz',
      appKey: 'MB0cbJwSejdYlix1AjjLLFRv',
    },
    logo: '/logo.png',
    authorAvatar: '/logo.png',
    search: true,
    searchMaxSuggestions: 5,
    collapsable: true,
    sidebarDepth: 2,
    sidebar: {
      '/Linux/': sidebar.getLinuxRoute(),
      '/中间件/': sidebar.getZjjRoute(),
      '/Java/': sidebar.getJavaRoute(),
      '/Java-框架/': sidebar.getJavaFrameRoute(),
      '/network/': sidebar.getNetworkRoute(),
      '/Os/': sidebar.getOsRoute(),
      '/项目/': sidebar.getXiangRoute(),
      '/LeetCode/': sidebar.getAlgorithmRoute(),
      '/论文/': sidebar.getPaperRoute()
    },
  
    
    // 密钥
    // keyPage: {
    //   keys: ['271fb7d9e6f1e9507f6fd0f77439fd4a'], // 1.3.0 版本后需要设置为密文
    //   color: '#42b983', // 登录页动画球的颜色
    //   lineColor: '#42b983' // 登录页动画线的颜色
    // },
    
    readingShow: true,
    lastUpdated: 'Last Updated',
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
    ['@vuepress/nprogress'],
    ["sakura", {
      num: 20,  // 默认数量
      show: true, //  是否显示
      zIndex: -1,   // 层级
      img: {
        replace: false,  // false 默认图 true 换图 需要填写httpUrl地址
        httpUrl: '...'   // 绝对路径
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
  
    ['@vuepress/last-updated'],
    ['@vuepress-reco/vuepress-plugin-pagation', {
      perPage: 10
    }],
    
    // 在代码区，添加一个拷贝按钮，用来拷贝代码
    //npm install vuepress-plugin-code-copy
    ["vuepress-plugin-code-copy", true],
    ['reading-progress'],
    // 音乐插件
    // [
    //   'meting',
    //   {
    //      meting: {
    //         server: 'netease', // 音乐源
    //         type: 'playlist', // 资源类型
    //         mid: '7511047240', // 资源 id
    //      },
    //      aplayer: {
    //         lrcType: 3,
    //      },
    //   },
    // ],
    // https://music.163.com/playlist?id=7511047240&userid=372488170
  ]
}