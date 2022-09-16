
/* 导航栏配置 */
function getNav() {
    return [
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
            text: "面经",
            link: "/面经/"
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
      { text: '项目', icon: "reco-document",
            items: [
                {
                    text: '底层项目', items: [
                        {text: 'MIT6.830 JAVA', link: '/项目/'}
                    ]
                },
                {
                    text: '游戏项目', items: [
                        {text: 'AI对抗平台 JAVA', link: '/项目/'},
                    ]
                },
                {
                    text: '合作项目', items: [
                        {text: '仿北邮人论坛 JAVA', link: '/项目/'},
                    ]
                }
            ]        
      },
      { text: '算法', icon: "reco-document",
            items: [
                {
                    text: "算法",
                    link: "/LeetCode/"
                },
            ]        
      },
      { text: '人工智能', icon: "reco-document",
            items: [
                {
                    text: '漏洞检测', link:"/论文/"
                },
            ]        
      },
      { text: '归档', link: "/timeline/",icon: "reco-date"},
      { text: '回顾', link: '/review', icon: 'reco-blog' },
      { text: '关于', link: "/aboutme",icon: "reco-account", },  
    ];
}

module.exports = {
    getNav
}
