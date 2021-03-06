module.exports = {
  title: '周嘉炜',
  description: '记录开发中的点点滴滴，攒出一本散文诗',
  // 注入到当前页面的 HTML <head> 中的标签
  head: [
    ['link', { rel: 'icon', href: '/logo.ico' }] // 增加一个自定义的 favicon(网页标签的图标)
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
            [
              '/blog/html/HTML—three-characters-achieve-chinese-alignment',
              '字符实现中文的等宽对齐效果'
            ]
          ]
        },
        {
          title: 'CSS',
          children: [['/blog/css/comming', '待完善']]
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
            ['/blog/vue/vue-configurable-form', '结合 UI 框架实现可配置 Vue 表单组件浅析'],
            [
              '/blog/vue/vue-cli2.0-demo',
              'vue-cli 仿网易云音乐 Demo,环境搭建到开发 Vue 全家桶练手项目'
            ],
            ['/blog/vue/vue-nuxt-test', '基于 Vue.js 的服务端渲染 (ssr) 通用应用框架 Nuxt.js']
          ]
        },
        {
          title: 'React',
          children: [['/blog/react/comming', '待完善']]
        },
        {
          title: 'Node.js',
          children: [['/blog/nodejs/comming', '待完善']]
        },
        {
          title: '小程序',
          children: [['/blog/miniapp/comming', '待完善']]
        },
        {
          title: '动画',
          children: [['/blog/animation/a-lottie', 'airbnb Lottie 动画库实践']]
        },
        {
          title: '前端整理',
          children: [['/blog/web-package/base-skill', '前端基础技能']]
        },
        {
          title: '性能优化',
          children: [
            ['/blog/performance/p--vue-cli-f2e-performance', 'vue-cli 前端性能优化方案'],
            ['/blog/performance/p--RAIL', '浅谈性能标准与优化']
          ]
        },
        {
          title: '架构 & 解决方案',
          children: [['/blog/architecture/web-page-configuration', '前端页面「配置化」实践']]
        },
        {
          title: '管理',
          children: [['/blog/manager/m-a-project-life-circle', '一个项目的生命周期']]
        },
        {
          title: '我的项目',
          children: [['/blog/myProject/wx-mark', '微信小程序「Mark」文档']]
        },
        {
          title: '踩坑之旅',
          children: [['/blog/done/do-html2canvas', 'html2canvas 踩坑之旅']]
        }
      ],
      '/essay': [
        // ['/essay/one', '你好'],
      ]
    }
  }
}
