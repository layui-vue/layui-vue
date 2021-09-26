<img src="/docs/src/assets/logo.svg" width="400px" style="margin:50px" />

a component library for Vue 3 base on element-plus

<p>
  <a href="#">
    <img src="https://img.shields.io/badge/Vue-3.0.0+-green.svg" alt="Vue Version">
  </a>
  <a href="#">
    <img src="https://img.shields.io/badge/Vue Router-4.0.0+-green.svg" alt="Vue Router Version">
  </a>
  <a href="#">
    <img src="https://img.shields.io/badge/Element Plus-1.0.0+-green.svg" alt="Element Plus Version">
  </a>
</p>

[开 发 文 档](https://jmysy.github.io/layui-vue) | [更 新 日 志](https://gitee.com/Jmysy/layui-vue/releases) | [常 见 问 题](https://gitee.com/Jmysy/layui-vue/issues)

##### 📖 概述

Element Enhance 是基于 Element Plus 而开发的模板组件，提供了更高级别的抽象支持，开箱即用，更加专注于页面。

### Status: Beta

This project is still under heavy development. Feel free to join us and make your first pull request.

[![Edit layui-vue](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/layui-vue-template-vh9bg?fontsize=14&hidenavigation=1&theme=dark)

##### 📢 理念

Element Plus 定义了基础的设计规范，对应也提供了大量的基础组件。但是对于中后台类应用，我们希望提供更高程度的抽象，提供更上层的设计规范，并且对应提供相应的组件使得开发者可以快速搭建出高质量的页面。

列表页应该可以用 EleLayout + EleTable 完成，编辑页应该使用 EleLayout + EleForm 完成，详情页可以用 EleLayout + EleDescriptions 完成。 一个页面在开发工程中只需要关注几个重型组件，降低心智负担，专注于更核心的业务逻辑。

##### ✒️ 特性

该组件库的开发理念就是面向未来，如果查看源码你就会发现像是 vue 3 的 [script setup](https://github.com/vuejs/rfcs/pull/227.) 实验性功能、像是 CSSNext 的 [CSS Variables](https://developer.mozilla.org/en-US/docs/Web/CSS/--*)。在保证大部分浏览器的兼容性的情况下，会更多的使用新特性、新功能来开发

##### 💡 计划

- [x] PageContainer: 为了减少繁杂的面包屑配置和标题。
- [ ] StatisticCard: 指标卡结合统计数值用于展示某主题的核心指标。
- [ ] Search: 有些是时候表单要与别的组件组合使用，需要一些特殊形态的表单。

##### ☁️ 入门

让 Element Plus 更简单, 更通用, 更流行

<img src="/docs/src/assets/banner.png"/>

安装

```
npm install element-plus --save

npm install layui-vue --save
```

引入

```js
import { createApp } from 'vue'
import App from './App.vue'
import ElementEnhance from 'layui-vue'
import 'layui-vue/lib/style.css'
import ElementPlus from 'element-plus'
import 'element-plus/lib/theme-chalk/index.css'

const app = createApp(App)

app.use(ElementEnhance)
app.use(ElementPlus)
app.mount('#app')
```

使用

```vue
<template>
  <ele-layout multi-tab="true" breadcrumb="true">
    <template #logo></template>
  </ele-layout>
</template>
```

效果

![输入图片说明](https://images.gitee.com/uploads/images/2021/0530/172502_95f955fc_4835367.png '屏幕截图.png')

##### 🔥 案例

[Element Enhance Admin](https://gitee.com/Jmysy/layui-vue-admin) : 基于 Element Enhance 的 前端 Cli template

##### 📈 趋势

[![Giteye chart](https://chart.giteye.net/gitee/Jmysy/layui-vue/9X8CXNEY.png)](https://giteye.net/chart/9X8CXNEY)

##### 🍚 贡献

组件库还处于早期开发阶段，功能还需要完善。如果你希望参与贡献，欢迎 [Pull Request](https://github.com/Jmysy/layui-vue/pulls)。如果只是简单的文档相关的错误修正，你可以直接 PR，但如果是当前组件的 BUG 或者新功能、新组件等，最好优先提 [issues](https://github.com/Jmysy/layui-vue/issues)

[![Giteye chart](https://chart.giteye.net/gitee/Jmysy/layui-vue/57W94KFG.png)](https://giteye.net/chart/57W94KFG)
