---
title: 微信小程序「Mark」文档
---
## 微信小程序「Mark」文档
::: tip 博客
记录程序生涯的点滴，分享技术实践。
:::

## 目录
[[toc]]

## 导航模块

 ### 我的空间
<br />
<br />
<img src="../../.vuepress/public/wxmark/WechatIMG1.png" width="50%" height="50%">

 #### 接口情况
  - 活动收藏列表[根据用户 id，获取活动列表]
  - 活动心愿池（类似做灵感记录）[根据用户 id，获取灵感列表]—— 待定
  - 等级排行[获取排名列表，头像、昵称]
  - 发起活动[表单形式，活动主题、活动描述、活动时间、活动地点等]
  - “全部活动”跳转到全部活动页

 ### 我的活动
<br />
<br />
 <img src="../../.vuepress/public/wxmark/WechatIMG2.png" width="50%" height="50%">

 #### 接口情况
  - 我的参加的社会活动 & 我参加的朋友圈活动 & 我发起的活动列表
  - 活动详情页[全站点通用详情页接口，根据活动唯一标识]
  - 分享好友 & 朋友圈功能

 ### 活动搜索
<br />
<br />
  <img src="../../.vuepress/public/wxmark/WechatIMG3.png" width="50%" height="50%">
<br />
<br />
<hr />
<br />
<br />
  <img src="../../.vuepress/public/wxmark/WechatIMG4.png" width="50%" height="50%">
<br />
<br />
<hr />
<br />
<br />
  <img src="../../.vuepress/public/wxmark/WechatIMG5.png" width="50%" height="50%">

   #### 接口情况
   - 活动搜索功能[在搜索页面，此处只做跳转]
   - 全国，活动城市分类区分[在城市页面，此处只做跳转]
   - 人气榜[活动按人气高低列表，例如列出最热的50个活动，分页]
   - 活动日历[用户收藏的活动，考虑做成弹出一个当月📅，标识当月的参与活动]
   - 「为你推荐」活动列表 - 换一批按随机 or 分页形式
   - 「当前最热」同「人气榜」，只显示 4 个，换一批分页形式
   - 「活动分类」，根据先爬取的活动进行分类，固定不用接口，点点击进入某一个分类列表页
   - 「全部活动」按分页

### 城市页
<br />
<br />
<img src="../../.vuepress/public/wxmark/WechatIMG6.png" width="50%" height="50%" />

#### 接口情况

- 点击具体城市，进入活动列表页（只有该城市的活动），需要一个城市 id，约定即可，暂时城市如图

### 活动搜索
<img src="../../.vuepress/public/wxmark/WechatIMG7.png" width="50%" height="50%" />

#### 接口情况
- 搜索接口，关键搜索，可根据活动题目、活动描述搜索
- 历史搜索，支持单独删除 & 全删除
- 热门搜索，需要一个搜索热度记录，提供换一批功能（随机 or 分页），没有删除
