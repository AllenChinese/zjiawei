module.exports = {
  title: '周嘉炜',
  description: '记录开发中的点点滴滴，攒出一本散文诗',
  // 注入到当前页面的 HTML <head> 中的标签
  head: [
    ['link', { rel: 'icon', href: '/logo.ico' }], // 增加一个自定义的 favicon(网页标签的图标)
  ],
  base: '/', // 这是部署到github相关的配置 下面会讲
  markdown: {
    lineNumbers: true // 代码块显示行号
  },
  themeConfig: {
    sidebarDepth: 2, // e'b将同时提取markdown中h2 和 h3 标题，显示在侧边栏上。
    lastUpdated: '文档更新时间', // 文档更新时间：每个文件git最后提交的时间
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
            ['/blog/html/comming', '待完善']
          ]
        },
        {
          title: 'CSS',
          children: [
            ['/blog/css/comming', '待完善']
          ]
        },
        {
          title: 'JavaScript',
          children: [
            ['/blog/javascript/JS-arrayAndObject', 'JavaScript 数组 & 对象遍历方法'],
            ['/blog/javascript/JS-draggablejs', '可用的移动端拖拽库 draggable.js']
          ]
        },
        {
          title: 'Vue',
          children: [
            ['/blog/vue/comming', '待完善']
          ]
        },
        {
          title: 'React',
          children: [
            ['/blog/react/comming', '待完善']
          ]
        },
        {
          title: 'Node.js',
          children: [
            ['/blog/nodejs/comming', '待完善']
          ]
        },
        {
          title: '小程序',
          children: [
            ['/blog/miniapp/comming', '待完善']
          ]
        },
        {
          title: '前端整理',
          children: [
            ['/blog/web-package/base-skill', '前端基础技能']
          ]
        }
      ],
      '/essay': [
        // ['/essay/one', '你好'],
      ]
    }
  }
};
