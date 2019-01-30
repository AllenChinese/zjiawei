---
title: airbnb Lottie 动画库实践
---
## airbnb Lottie 动画库实践
::: tip 博客
记录程序生涯的点滴，分享技术实践。
:::

## 目录
[[toc]]

::: tip 主题
  airbnb Lottie 是一个用于 Web 和 IOS 的动画库，用于解析使用 Bodymovin 导出为 json 的 Adobe After Effects 动画，并在移动设备上呈现它们（适用于 Web H5）！
  从现在开始，设计师可以在无需工程师的手工编程下，创建和输出炫酷的动画了。
:::

### 一、let us see some beautiful Lottie


![Example1](https://raw.githubusercontent.com/airbnb/lottie-web/master/gifs/Example1.gif)


![Example2](https://raw.githubusercontent.com/airbnb/lottie-web/master/gifs/Example2.gif)


这么炫酷的动画改如何使用到我的网站呢，让我们看看该怎么做吧！

### 二、如何使用

申明：文章只实践动画库的使用，动画的制作不涉及，提供参考文章 <br/>
[Lottie Android 动画制作与使用 - 掘金](https://juejin.im/post/5a30a2d9f265da430e4f250d)<br/>
[Lottie动画教程](https://www.jianshu.com/p/83f6a228b195) <br/>
[Lottie 简介](https://www.jianshu.com/p/94f7a0102be5)

`附一张 Lottie 实现多端共用的流程图（网盗）`

![](https://upload-images.jianshu.io/upload_images/1893416-e5906879d99a99e7.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/600/format/webp)

 - #### 1、安装

 ```js
  # with npm
  npm install lottie-web

  # with bower
  bower install bodymovin
 ```

 - #### 2、使用

 ```js
  HTML：

  <div id="bm"> </div>
 ```

 ```js
 Javascript：

  var animation = bodymovin.loadAnimation({
    container: document.getElementById('bm'),
    renderer: 'svg',
    loop: true,
    autoplay: true,
    path: 'data.json'
  })
  ```

  data.json 则是动画，只是转化成了 json 数据

  ### 三、其他

  参考链接

  [英文文档](http://airbnb.io/lottie/web/getting-started.html)<br/>
  [在线 Demo 编辑](https://codepen.io/airnan/project/editor/ZeNONO)<br/>
  [动画案例资源网站](https://lottiefiles.com/)