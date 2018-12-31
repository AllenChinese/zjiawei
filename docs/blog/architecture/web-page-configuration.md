---
title: 前端页面「配置化」实践
---
## 前端页面「配置化」实践
::: tip 博客
记录程序生涯的点滴，分享技术实践。
:::

## 目录
[[toc]]
    运营：这次专区页面和原先一个项目很相似的，客户希望一周可以发上线

    开发：那个项目不是我开发的，我得重新建项目开发、发布

    运营：客户需要快速推广他们的新产品，你们能做到沿用当时项目的布局样式风格，换下里面的内容，快速上线吗

    开发：这样啊...容我想想


> 关键词：类似、快速、内容替换


## 前言
标题「配置化」设定的是一种页面信息与约定格式数据的映射关系，而数据的来源，则通过人为的编辑生成，少涉及甚至不涉及二次代码编写。
![](https://user-gold-cdn.xitu.io/2018/12/23/167db26b1459bc24?w=485&h=300&f=png&s=8173)

由于人力和功能规划，一期并未引入可视化搭建和多框架扩展。
## 什么是页面「配置化」

### Page = Dom Tree + Data

前端认为一个页面的组成包含 HTML 结构和数据（元素属性、文本），复杂的动态页面会包含一些逻辑（JavaScript）。把页面按块细分，则可以将一个页面分割成几个独立的区块，每一个区块都可以包含上述的几个要素，如图。

![](https://user-gold-cdn.xitu.io/2018/12/24/167dc046216fd10a?w=650&h=321&f=png&s=14924)

这样看，页面就变成了有若干个组件按一定顺序组成。而每一个组件则只需关注自身的 HTML、CSS、JS。当组件足够丰富时，我们就可以配置成 n 多种风格的页面。当所有区块都编码完成后，页面的输出，我们就只要关心用到哪些组件，谁在页面上方，谁又在底部，这个 banner 区块需要用 A 图还是 B 图。这个过程的转化，带来了两个提高：
- 1、不关心组件的代码。即无需编程能力。
- 2、一个组件可以用在所有页面，即无需重复造轮子、搬砖。

### 配置化能解决什么

1、快速搭建页面、站点的能力——提高效率

2、减少重复轮子的开发——避轻就重

3、赋予非技术人员（运营、产品）开发的能力——工作转移

4、集成发布部署

5、覆盖多种业务场景



## 业界解决方案分析
### [阿里飞冰](https://alibaba.github.io/ice)

  让`前端`开发简单而又好

  海量`可复用`物料，配套桌面工具极速构建前端应用，`效率提升 100%`

  飞冰的 **买点** 是辅助开发者快速搭建`中后台`前端应用，效率提升 100%。

   - 零环境搭建，零配置
   - 丰富的物料选择
   - 开发语言的多样性
   - 源码本地化供二次开发，更加的灵活
   - 搭配了项目创建到发布的一站式服务外
   - 工具本身简单易用

  我认为飞冰是非常好`中后台`开发解决方案，让前端开发人员只需关注逻辑层的实现。
![](https://user-gold-cdn.xitu.io/2018/12/23/167db71e16952163?w=2546&h=1454&f=png&s=411578)

![](https://user-gold-cdn.xitu.io/2018/12/23/167db5073fe8d8e7?w=2474&h=1300&f=png&s=508496)


### [百度 H5](https://h5.bce.baidu.com/edit/h5/51c714cb-4518-eb74-01c8-e3bc12f0b9db)

百度 H5 是百度公司推出的`移动端 H5 页面`快速制作工具平台。

只要您的百度账号登录百度 H5 平台，就可以自由地开启您的 H5 之旅啦！

百度 H5 的 **买点** 是无需你有开发经验，人人都能定制 H5 页面。

  - 可视化地构建并发布专属 H5 页面
  - 具备强大的编辑功能：

    - 支持各种常用编辑快捷键，复制／粘贴／撤销／重做／上下左右移动／保存 流畅进行，无需鼠标点点点；
    - 提供智能参考线和多种对齐控制，方便控制组件居中和对齐；
    - 元件次序、编组、时间线、组合动画，让您的 H5 与众不同。
  - 支持文本、媒体（含音频，图片，视频）、形状、表单、图表、插件六大类组件
  - 运营实战的数百套创意模板

![](https://user-gold-cdn.xitu.io/2018/12/23/167db738ef39fc1e?w=1323&h=790&f=png&s=450488)

## 前端「配置化」的难点
这里从两个纬度出发去说说：**业务场景** 和 **技术**
### 1、业务场景
 页面「配置化」系统其实是一套快速业务开发的工具，那相比于 Vue、React 两者可取其一的情况，为什么飞冰、百度 H5 却不行。或者说当我需要开发中后台系统的时候，我会选择飞冰，当我想要发布一个活动宣传时，我会选择百度 H5。为什么多种不同的业务场景，不能使用同一套「配置化」系统？

  - 不同业务存在壁垒，横向扩展飞冰去支持百度 H5 的场景，会导致整个工具非常臃肿、繁琐；但纵向依靠技术去平衡两种场景，技术难度可能会是 2 的次方。

  `观点：配置化应该专注于一个业务场景，或者垂直领域的几个类似业务，例如医疗行业、电商类小程序、中后台应用等`

### 2、技术
支撑前端「配置化」系统所需要的技术也相对复杂，除了从编辑配置到输出页面的逻辑走通外，可能还需要集成一些发布部署、源码本地化等功能。更需要维护大量的模板、物料、区块来满足使用者的个性需求。系统本身的交互开发，也是高于一般系统的。所以制作一个完整好用的「配置化」系统，需要大量的人力和时间，飞冰也是在阿里迭代了两年才有现在的效果。所以，配置化的工具，不像前端的一些工具类库一样各种轮子，甚至人手一套。

`观点：当现有技术、资源紧缺的时候，先专注于编辑配置到输出页面的逻辑走通，通过不断迭代的方式，优化工具。达到配置化对于业务线产品输出的效率`

## 商业组「配置化」实践

### 1、系统介绍
![](https://user-gold-cdn.xitu.io/2018/12/23/167dbc3aae572d41?w=1830&h=729&f=png&s=79663)

 - 配置中心后台

   提供商业项目管理及页面的配置编辑，主要给后端提供页面信息、区块信息、资源信息等数据存库，数据供 Node 层页面渲染。

        Vue + iView

- 资源开发、发布层

  包含区块中心所有区块的 css、js、图片等资源（common），并且可供开发者开发、发布每个项目的个性资源（self）。区分通用和私有是为了,在区块中心不能覆盖所有场景时，具备`专区个性化定制需求`的能力。


       商业组多页面模板
        .
        ├── src
        │   ├── assets                          // 通用、私有项目资源目录
        │   │   ├── mobile                      // common 移动端资源
        │   │   ├── pc                          // common web 端资源
        │   │   └── pedemo                      // self 私有项目资源，以项目名命名文件名
        │   ├── components                      // common 项目组件
        │   │   ├── survey
        │   ├── componentsCss                   // common base css
        │   │   ├── animation
        │   │   ├── common
        │   │   └── mixins
        │   ├── config
        │   │   └── apis.js
        │   ├── css
        │   │   ├── common.less                 // common css
        │   │   ├── projectCss                  // self 私有项目样式，以项目名命名文件名
        │   │   ├── survey.less                 // common survey component css
        │   ├── entries                         // 通用、私有项目都需要建一个入口地址，发布资源需要
        │   │   ├── common
        │   │   ├── index
        │   │   └── pedemo                      // self 私有项目的 js 写在对应文件的 index.js 中
        │   ├── js                              // common components js
        │   │   ├── common.js
        │   │   ├── survey.js
        │   ├── layout
        │   │   ├── default.html
        │   │   └── default.js
        │   └── utils                           // utils
        │       ├── api.js
        │       ├── getToken.js
        │       ├── globalFunctionConfig.js
        └── static

- Node 页面渲染中间层

  提供页面数据的请求，获取 page_data 和 block_data 的数据，并通过定义的 block_style 属性，匹配对应的区块，按照一定顺序渲染页面。Node 层也提供了专区页的路由配置，以及一些 404, 500 的页面模板。

       egg.js + Nunjucks

- 商业基础组件库

  结合以往项目设计，总结开发的一套适用于商业项目的组件库，现有 30 余中组件（区块）。作为配置中心的区块样式、功能样本。

      商业组多页面模板

### 2、系统分析

- 2.1 Node (egg) 端如何用一个接口，输出页面

![](https://user-gold-cdn.xitu.io/2018/12/26/167eb0238164d2d3?w=1716&h=882&f=png&s=182255)

### `API：getPageInfo`

    关键字：router、cc、Controller、server、view

  - **router**
  ``` js
    module.exports = app => {

      const { router, controller: { config } } = app
      // 配置中心项目
      // 首页
      router.get('/:project/cc/', config.custom)
      // 基础页
      router.get('/:project/cc/:page', config.custom)
      // 详情页
      router.get('/:project/cc/:page/:id', config.detail)

    }
  ```
  只要满足配置中心的页面路由，包含 `cc` 都会进入到 Controller 的 custom 方法中，`cc` 是代码页面走配置中心的标志。

 - **Controller**

![](https://user-gold-cdn.xitu.io/2018/12/26/167eb1244a60615f?w=1266&h=1566&f=png&s=351961)

Controller 主要负责的是向后端发送请求（getPageInfo），传递的参数保证定位到唯一的页面：project、page、query，接口返回约定格式的页面信息。如果当前路由映射的页面，没有在配置中心配置，则接口返回空，这时会渲染 404.nj，否则接口会返回 `page_data` & `block_data`，利用 renderPage 方法进行页面组装。

![](https://user-gold-cdn.xitu.io/2018/12/26/167eb12b5a1bacb2?w=1448&h=1566&f=png&s=343737)

渲染页面结构的renderPage 方法，按顺序有以下几个步骤：

    1、layout：<html><head></head><body class="page-{{page_name}}" data-project="{{project}}"></body</html>
    2、head：渲染页面 head
    3、blocks：页面中配置的区块按顺序渲染结构
    4、body：将所有区块拼成的 HTML，放进 body 中
    5、add alljs：将页面的 js 拼接到 body 最后
    6、ctx.body = $html 渲染出页面

 - **server**


![](https://user-gold-cdn.xitu.io/2018/12/26/167eb15ce6835cb8?w=1380&h=1530&f=png&s=314193)

发送的请求，需要携带浏览器 cookie 时, 则需要配置如图中 headers。

- **view**

区块左图右文1 `style: cmslist_horizontal_1`
![](https://user-gold-cdn.xitu.io/2018/12/26/167eb3385713b11b?w=1970&h=1422&f=png&s=387023)


### demo 示例
制作一个 pedemo 示例

### 开发中的可说的点
 - vue-cli 3.x env 文件与环境设置
![](https://user-gold-cdn.xitu.io/2018/12/31/16802d71ba6877d7?w=354&h=360&f=png&s=19012)

新的脚手架找不到 `webpack` 相关的配置文件了，原因是 `vue-vli 3` 给我们提供了一种开箱即用的模式，你无需配置 `webpack` 就可以运行项目，并且它提供了一个 `vue.config.js` 文件来满足开发者对其封装的 `webpack` 默认配置的修改。

我们的项目一般静态资源和 `API` 地址会有测试线和线上区分，如何通过 `env` 文件配合我们的发布系统来进行自动切换。

  1、在根目录中创建以下形似的文件进行不同环境下的变量配置
```js
    .env.[mode]  #只在指定模式[mode]下被载入
```
  2、比如我们的发布系统中测试打包的命令：`dxybuild:test`，那我们可以创建 `.env.dxybuild:test` 文件，表明当我们进行测试线打包时，该文件中的环境变量配置会被载入。
```js
    VUE_APP_ENV=dynamic
```
  3、在 **vue.config.js** 中通过 `process.env.[name]` 访问这些变量
```js
    // vue.config.js
    const dxyAssetsUrl = '//assets.dxycdn.com/gitrepo/business-admin'
    module.exports = {
        // 部署应用包时的资源基本 URL
         baseUrl: process.env.VUE_APP_ENV === 'dynamic' ? `${dxyAssetsUrl}_dynamic/dist`
            : (process.env.VUE_APP_ENV === 'production') ? `${dxyAssetsUrl}/dist` : ''
    }
```
  4、当然也得修改 `package.json` 中的 `serve` 脚本的命令
```js
    "dxybuild:test": "vue-cli-service build --mode dxybuild:test"
```
### 2.0 规划
 - 现有区块优化，根据这一年的商业项目，和设计师总结更多符合业务的功能组件，丰富区块中心
 - 可视化配置页面功能，所见即所得的配置体验，更好的赋能运营
 - 多框架模板扩展，`Vue` `React`