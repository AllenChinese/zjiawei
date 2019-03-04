---
title: HTML—字符实现中文的等宽对齐效果
---
## HTML—字符实现中文的等宽对齐效果
::: tip 博客
记录程序生涯的点滴，分享技术实践。
:::

## 目录
[[toc]]

::: tip 背景
利用空格字符实现等宽下的中文两端对齐效果。
:::

## 效果图
![效果图](../../.vuepress/public/html/html_1.png)

## 空格字符

### `&nbsp;`

`&nbsp;`相信是大家最熟悉，也是用的次数最多的一个了吧。代表一个空格，确切的说是表示<b>按下 space 键产生的空格。</b>我们知道在 HTML 中，空格是不会累加的，按下再多的空格，只算 1 个，而我们的 `&nbsp;` 就可以用来实现多个空格。

### `&emsp;`

`&emsp;`我们的主角来了，尺寸单位为：<b>占据的宽度是 1 个中文宽度</b>，其他的效果和 `&nbsp;` 一致。

### `&ensp;`

`&ensp;`的尺寸则是他老大哥 `&emsp;` 的一半，<b>占据的宽度是 1/2 个中文宽度</b>。

## 代码
```css
.field {
  width: 90px;
}
.field--title {
  width: 100%;
}
```
```js
<div class="field">
  <p class="field--title">提&ensp;交&ensp;人：</p>
</div>
<div class="field">
  <p class="field--title">资料概要：</p>
</div>
<div class="field">
  <p class="field--title">心&emsp;&emsp;得：</p>
</div>
```

## 结语

有了上面的三种字符及实体，中文文字的对齐就能容易的实现啦！

## 链接
[相关可用字符介绍](https://www.zhangxinxu.com/wordpress/2011/05/web%E9%A1%B5%E9%9D%A2%E7%9B%B8%E5%85%B3%E7%9A%84%E4%B8%80%E4%BA%9B%E5%B8%B8%E8%A7%81%E5%8F%AF%E7%94%A8%E5%AD%97%E7%AC%A6%E4%BB%8B%E7%BB%8D/)