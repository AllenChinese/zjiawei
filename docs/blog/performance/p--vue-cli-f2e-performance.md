---
title: VUE_CLI 前端打包优化
---
## VUE_CLI 前端打包优化
::: tip 博客
记录程序生涯的点滴，分享技术实践。
:::

## 目录
[[toc]]

环境：
`vue-cli 3.4.0`

## 打包优化目的
vue-cli 打包后默认会在 dist 目录下生成静态资源文件，这些文件的大小一般在几 KB 到几百 KB 不等，尤其是 vendor.js 和 app.js。我们会把这些资源部署到服务器中，用于请求。

![优化之前](../../.vuepress/public/performance/VUE_CLI_1.png)
## 优化方案

### 组件按需加载
### 路由懒加载