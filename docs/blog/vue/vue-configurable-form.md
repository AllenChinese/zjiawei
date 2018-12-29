---
title: 结合 UI 框架实现可配置 Vue 表单组件浅析
---
## 结合 UI 框架实现可配置 Vue 表单组件浅析
::: tip 博客
记录程序生涯的点滴，分享技术实践。
:::

## 目录
[[toc]]

## 一、常规的表单
如果我们用 UI 框架做管理系统时候，关于表单的代码我们不会陌生，大致是这样的，比如这是一个 iView 框架下的综合性表单：


```js
<template>
    <Form :model="formItem" :label-width="80">
        <FormItem label="Input">
            <Input v-model="formItem.input" placeholder="Enter something..."></Input>
        </FormItem>
        <FormItem label="Select">
            <Select v-model="formItem.select">
                <Option value="beijing">New York</Option>
                <Option value="shanghai">London</Option>
                <Option value="shenzhen">Sydney</Option>
            </Select>
        </FormItem>
        <FormItem label="Radio">
            <RadioGroup v-model="formItem.radio">
                <Radio label="male">Male</Radio>
                <Radio label="female">Female</Radio>
            </RadioGroup>
        </FormItem>
    </Form>
</template>
<script>
    export default {
        data () {
            return {
                formItem: {
                    input: '',
                    select: '',
                    radio: 'male'
                }
            }
        }
    }
</script>
```
## 二、配置化表单

而我想要的方式是这样的：
### 模板

```js
<template slot="modalContent">
    <AutoForm
        :fileds="projectFields"
        :model="projectFormData"
        :formName="projectFormData"
        class="my-form"
    />
</template>
<script>
// @ is an alias to /src
import { mapState } from 'vuex'
import { projectFields } from '@/utils/fieldsMap'
export default {
    data ()  {
        return {
            // 表单配置列表
            projectFields: projectFields
        }
    },

    computed: {
        ...mapState({
          // 项目列表页编辑表单
          projectFormData: state => state.project.projectFormData
        })
    },
}
</script>
```
表单项的数据来源我会利用 Vuex 的 state 里管理：
### 数据

```js
import { projectFormData } from '@/api/project'

const state = {
      // 项目列表页编辑
      projectFormData: {
        projectInput: '',
        projectSelect: '',
        projectRadio: ''
      }
}

// getters
const getters = { }

// action
const actions = {
    // 表单项数据获取
    // 表单项数据提交
}

// mutations
const mutations = { }

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
```

表单项的配置也是通过单文件`（fieldsMap.js）`管理，方便维护：
### 表单项配置

```js
// 表单配置项
// 注意：tag 和 type 需要根据使用的 UI 框架来匹配。
const projectFields = {
    projectInput: {
        label: '项目Input',
        tag: 'Input',
        type: 'text',
        placeholder: '请输入项目Input'
    },
    projectSelect: {
        label: '项目下拉Select',
        tag: 'Select',
        options: [
          {
            key: 'beijing',
            value: 'beijing'
          },
          {
            key: 'hangzhou',
            value: 'hangzhou'
          }
        ]
    },
    projectRadio: {
        label: '项目Radio',
        tag: 'RadioGroup',
        options: [
          {
            label: '是'
          },
          {
            label: '否'
          }
        ]
    },
}
```
OK，整个一个配置表单的文件结构，使用方式就是这样子，总结一下大致是三部曲：

* 引入 `<AutoForm />` 组件。
* `fieldsMap.js` 中配置表单项，包括 label、type、tag、options等。
* `Vuex state` 中添加数据来源。

剩下的关键是 `<AutoForm />` 组件是如何实现配置化，其实本质是`动态`生成表单项（根据配置文件）的过程，对于 `iView` 来说，就是动态的生成 `FormItem`，来拼成一个完整的表单。这时我们就需要用到 `vue` 提供的 `render Api`了。

首先查看一下官方文档 `render` 截图：
### render
![](https://user-gold-cdn.xitu.io/2018/8/12/1652e930f8a84413?w=1372&h=582&f=png&s=114675)

三个参数的简单用法：

```js
<script>
    Vue.component('Line', {
        render: function(h) {
            h('div', {
                props: {} // 传递数据
            },'文本 or 子节点')
        }
    })
</script>
```
了解基础用法后，我们来看下 `<AutoForm />` 组件的实现：

在上代码之前，我们先看一下 `iView` 表单的结构，从外层到内层，`Form 容器固定`——`FormItem 数量动态`——`Input 类型动态`，组件最终是返回一个 `Form`；根据配置项的数量来决定 `FormItem` 的数量，动态创建；根据配置项的 `tag` 和 `type` 来决定表单的类型；当然有些例如 `Select` 的表单项会有 `options` 下拉选项，也需要单独生成。

根据上面的分析，那总结关于这个 `<AutoForm />` 组件，大致有 `FormRender`、`itemsRender`、`componentUse`、类型（`InputRender`、`RadioRender`、`SelectRender`）、`options` (`optionsRender`) 五个点。

### `AutoForm.vue`

```js
<script>
export default {
  name: 'Form',
  functional: true,
  render (h, context) {
    let fileds = context.props.fileds // 表单配置 from fieldsMap.js
    let model = context.props.model // 表单数据 from state
    let formName = context.props.formName // 表单名称唯一
    /**
     * 渲染 FormItem
     */
    function itemsRender () {
      let res = []
      // 遍历配置项动态生成 FormItem
      Object.keys(fileds).forEach((ele, i) => {
        res.push(
          h('FormItem',
            {
              props: {
                label: fileds[ele].label // FormItem label 属性
              }
            },
            componentUse(fileds[ele], ele) // 子节点表单类型，利用 componentUse 函数控制
          )
        )
      })

      return res
    }

    /**
     * 表单分发选择
     * @param { Object } _item - 当前 fields 配置项
     * @param { String } _model - 当前配置项名
     */
    function componentUse (_item, _model) {
      let typeMap = {
        'Input': InputRender,
        'RadioGroup': RadioRender,
        'Select': SelectRender
      }
      let component = typeMap[_item.tag](_item, _model)

      return [component]
    }

    // Input
    function InputRender (_item, _model) {
      return h('Input',
        {
          props: {
            'v-model': `${formName}.${_model}`,
            'placeholder': _item.placeholder,
            'type': _item.type
          },
          on: {
            // iView 组件提供的方法，实现数据双向绑定
            'on-blur': (e) => {
              model[_model] = e.target.value
            }
          }
        }
      )
    }

    // Radio
    function RadioRender (_item, _model) {
      return h('RadioGroup',
        {
          props: {
            'v-model': `${formName}.${_model}`
          },
          on: {
            'on-change': (e) => {
              model[_model] = e === '是' ? 1 : 0
            }
          }
        },
        _item.options ? optionsRender(_item.options, 'Radio') : []
      )
    }

    // Select
    function SelectRender (_item, _model) {
      return h('Select',
        {
          props: {
            'v-model': `${formName}.${_model}`
          },
          on: {
            'on-change': (e) => {
              model[_model] = e
            }
          }
        },
        _item.options ? optionsRender(_item.options, 'Option') : []
      )
    }

    // 有多选 options 配置 optionsRender
    // Radio
    // Select
    function optionsRender (_options, _tag) {
      let itemRes = []
      _options.forEach((_option, i) => {
        if (_tag === 'Radio') {
          itemRes.push(
            h(_tag,
              {
                props: {
                  'label': _option.label
                }
              }
            )
          )
        } else if (_tag === 'Option') {
          itemRes.push(
            h(_tag,
              {
                props: {
                  'key': _option.key,
                  'value': _option.value
                }
              }
            )
          )
        }
      })

      return itemRes
    }

    let items = itemsRender(h)
    return h(
      'Form',
      {
        class: context.data.staticStyle,
        style: context.data.staticStyle,
        props: context.props
      },
      items
    )
  }
}
</script>

```
好了，有了上面的铺路，你就可以在项目的任何页面使用配置表单了，这样你就不用重复去 `copy` 结构代码了，使得页面中的代码看着清爽；更重要的是分文件管理的方式，有利于维护。其实分页列表也可以参考这样的方式。

一个含分页列表和基础表单的文件可以是这样的：
```js
<template>
  <div class="hc-project-management">
    <CommonList
      :addSearch="addSearch"
      :columns="columns"
      :data="projectList"
      :pageBean="pageBean"
      :statePath="statePath"
    />
    <MyModal
      :isShow="modal.isShow"
      :title="modal.title"
    >
      <template slot="modalContent">
        <AutoForm
          :fileds="projectFields"
          :model="projectFormData"
          :formName="projectFormData"
          class="my-form"/>
      </template>
    </MyModal>
  </div>
</template>
```

### 如何根据 Select 框的选项动态新增表单项
有时候我们会有像标题描述的需求，当一个下拉菜单选中后，自动的添加或者改变表单项。

![](https://user-gold-cdn.xitu.io/2018/8/13/16531a48bdea44fb?w=1202&h=832&f=png&s=48951)

实现：
我这边会在 `watch` 中监听 `state` 中数据变化来添加配置项

```js
  watch: {
    // 通过这种语法来watch
    'projectFormData': {
      handler: function (val, oldVal) { // 不能使用箭头函数 this 指向会出问题
        if (val.projectSelect) {
          this.projectFields = Object.assign({}, this.projectFields, { projectTextarea: {
            label: '项目textarea',
            tag: 'Input',
            type: 'textarea',
            placeholder: '请输入textarea'
          }})
        }
        console.log(val)
      },
      // 深度观察
      deep: true
    }
  },
```
## 三、说两句

&nbsp;&nbsp;其实配置化还是常规写法，都是需要根据自身业务和开发成员等综合考虑的，比如在配置化时，那么就需要和组员约定好一个添加表单的流程和写法，这个是相对固定的，不像常规的那么自由；又比如，本身我们这个项目表单的数量只有2、3个，那是否有配置化的必要；再比如，成员间是否认可这样的写法，也是需要商量的。但是一旦形成文档规范，那么回头来看，配置化带来的可维护性、易错误定位等好处，就显得不用付出那么多成本。
