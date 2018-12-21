module.exports = {
  title: '周嘉炜',
  description: '记录开发中的点点滴滴，攒出一本散文诗',
  // 注入到当前页面的 HTML <head> 中的标签
  head: [
    ['link', { rel: 'icon', href: '/logo.ico' }], // 增加一个自定义的 favicon(网页标签的图标)
  ],
  base: '/zjiawei/', // 这是部署到github相关的配置 下面会讲
  markdown: {
    lineNumbers: true // 代码块显示行号
  },
  themeConfig: {
    sidebarDepth: 2, // e'b将同时提取markdown中h2 和 h3 标题，显示在侧边栏上。
    lastUpdated: 'Last Updated', // 文档更新时间：每个文件git最后提交的时间
    serviceWorker: {
      updatePopup: true
    },
    repo: 'AllenChinese/zjiawei',
    nav: [
      {
        text: '首页',
        link: '/'
      },
      {
        text: '博客',
        link: '/blog/'
      },
      {
        text: '随笔',
        link: '/essay/'
      },
      {
        text: '关于',
        link: '/about/'
      }
    ],
    sidebar: {
      '/blog/': [
        {
          title: 'HTML',
          children: [
            ['/blog/html/one', '你好'],
            ['/blog/html/two', '我是']
          ]
        },
        {
          title: 'CSS',
          children: [

          ]
        },
        {
          title: 'JavaScript',
          children: [

          ]
        },
        {
          title: 'Vue',
          children: [

          ]
        },
        {
          title: 'React',
          children: [

          ]
        },
        {
          title: 'Node.js',
          children: [

          ]
        },
        {
          title: '小程序',
          children: [

          ]
        }
      ],
      '/essay': [
        ['/essay/one', '你好'],
        ['/essay/two', '我是']
      ]
    }
  }
};
