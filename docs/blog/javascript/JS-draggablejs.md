---
title: 可用的移动端拖拽库 draggable.js
---
## 可用的移动端拖拽库 draggable.js
::: tip 博客
记录程序生涯的点滴，分享技术实践。
:::

## 目录
[[toc]]

::: tip 关于
主要用到 h5 手势中的 touchstart、touchmove、touchend 事件，配合元素的位置关系实现拖拽功能。利用 extend 将 draggable 扩展到 jQuery 中，使用 dragEle.draggable() 形式进行调用。
:::
### 一、代码封装

```js
import $ from 'jquery'
/**
 * 移动端拖拽库
 * 功能：元素拖拽到目标位置，含自定义样式
 */

function defaultEvent (e) {
  e.preventDefault()
}

// 回复默认样式自定义
function resetEachTargetHtml (ele) {
  $(ele).html('')
}

function customizeCss (targetEle, ele, _cssOption) {
  if (_cssOption) {
    $(ele).css({
      'borderColor': _cssOption.borderColor,
      'borderWidth': _cssOption.borderWidth
    })
  } else {
    $(ele).css({
      'borderColor': 'transparent',
      'borderWidth': '1px'
    })
  }
}

/**
 * 是否进入目标区域条件判断
 * @param {*} touchableEle
 * @param {*} ele
 * @return Boolean
 */
function checkCondition (touchableEle, ele) {
  return touchableEle[0].offsetLeft + touchableEle[0].offsetWidth / 4 > ele.offsetLeft &&
    touchableEle[0].offsetLeft < ele.offsetLeft + ele.offsetWidth &&
    touchableEle[0].offsetTop > ele.offsetTop &&
    touchableEle[0].offsetTop < ele.offsetTop + ele.offsetHeight
}

/**
 * 移动结束后，恢复默认位置
 * @param {*} ele - 当前元素
 * @param {*} oT - origin offsetTop
 * @param {*} oL - origin offsetLeft
 */
function resetPosition (ele, oT, oL) {
  ele.css({
    'top': oT,
    'left': oL
  })
}
/**
 *
 * @param {Object} touchableEle - 拖拽对象
 * @param {Array} targetEle - 放置目标数组集
 * @param {String} status - touchmove or touchend
 */
function isInTargetContainer (touchableEle, targetEle, status, previewWay, cssOption) {
  let hasActive = false
  for (let i = 0; i < targetEle.length; i++) {
    let ele = targetEle[i]
    // 判断拖动元素是否到达目标位置
    if (checkCondition(touchableEle, ele) && !hasActive) {
      hasActive = true
      // 进入目标区域
      if (status === 'onMove') {
        // console.log('onMove 在目标区域内！')
        customizeCss(targetEle, ele, cssOption)
      } else if (status === 'onEnd') {
        // console.log('onEnd 在目标区域内！')
        customizeCss(targetEle, ele, '')
        // 拖拽成功，赋值预览图
        $(ele).html(
          `<img src="${$(touchableEle).attr(previewWay)}" data-sort="${$(touchableEle).data('sort')}"/>`
        )
        // 后续提供排序标志操作
      }
    } else {
      // 不在目标区域
      // console.log('不在目标区域内！')
      // 如果当前目标区域内没有放置东西（没有图片预览），才重置
      if (!$(ele).html()) {
        resetEachTargetHtml(ele)
      }
      customizeCss(targetEle, ele, '')
      hasActive = false
    }
  }
}
// 扩展到 jQuery 方法中
$.fn.extend({
  draggable: function draggable ({
    targetElement,
    previewWay,
    cssOption
  }) {
    for (let i = 0; i < $(this).length; i++) {
      const _this = $(this)[i]
      let touchableEle = $(_this) // 拖拽对象
      let targetEle = $(targetElement) // 放置目标对象
      let originOffsetLeft = null// 元素原始位置
      let originOffsetTop = null // 元素原始位置
      let maxWidth = document.clientWidth - touchableEle[0].offWidth // 最大宽度
      let maxHeight = document.body.clientHeight - touchableEle[0].offsetHeight // 最大高度
      let oL, oT

      // touchstart
      touchableEle.on('touchstart', function (e) {
        var ev = e.originalEvent || window.event.originalEvent
        var touch = ev.targetTouches[0]
        // 原始位置
        originOffsetLeft = touchableEle[0].offsetLeft
        originOffsetTop = touchableEle[0].offsetTop
        // 起始点
        oL = touch.clientX - touchableEle[0].offsetLeft
        oT = touch.clientY - touchableEle[0].offsetTop
      })

      // touchmove
      touchableEle.on('touchmove', function (e) {
        var ev = e.originalEvent || window.event.originalEvent
        var touch = ev.targetTouches[0]

        // 当前坐标
        var oLeft = touch.clientX - oL
        var oTop = touch.clientY - oT

        // 左右
        if (oLeft < 0) {
          oLeft = 0
        } else if (oLeft >= maxWidth) {
          oLeft = maxWidth
        }

        // 上下
        if (oTop < 0) {
          oTop = 0
        } else if (oTop >= maxHeight) {
          oTop = maxHeight
        }

        isInTargetContainer(touchableEle, targetEle, 'onMove', previewWay, cssOption)
        touchableEle.css('left', oLeft + 'px')
        touchableEle.css('top', oTop + 'px')
      })

      // touchend
      touchableEle.on('touchend', function () {
        document.removeEventListener('touchmove', defaultEvent)
        isInTargetContainer(touchableEle, targetEle, 'onEnd', previewWay, cssOption)
        resetPosition(touchableEle, originOffsetTop, originOffsetLeft)
      })
    }
  }
})


```

## 二、调用
``` js
dragImgList.draggable({
  targetElement: '.targetLi', // 性能可优化部分
  previewWay: 'data-src',
  cssOption: {
    borderColor: '#296ccf',
    borderWidth: '2px'
  }
})
```