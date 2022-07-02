<img width="100px" src="./package/document-component/src/assets/logo.jpg" />

<br>
<br>

<p>  
  <a href="https://www.oscs1024.com/project/oscs/layui/layui-vue?ref=badge_small" alt="OSCS Status"><img src="https://www.oscs1024.com/platform/badge/layui/layui-vue.svg?size=small"/></a>
  <a href="https://www.npmjs.com/package/@layui/layui-vue"><img src="https://img.shields.io/npm/v/@layui/layui-vue.svg?sanitize=true" alt="Version"></a>
  <a href="https://www.npmjs.com/package/@layui/layui-vue"><img src="https://img.shields.io/npm/l/@layui/layui-vue.svg?sanitize=true" alt="License"></a>
  <a href="https://coveralls.io/r/sentsin/layui?branch=master"><img alt="Test Coverage" src="https://img.shields.io/coveralls/sentsin/layui/master.svg"></a>
</p> 

**[🔶 www.layui-vue.com »](http://www.layui-vue.com)**

layui - vue（谐音：类 UI) 是 一 套 Vue 3.0 的 桌 面 端 组 件 库. 

QQ 群 ：[➀ 336720831](https://jq.qq.com/?_wv=1027&k=oQA1SC80)

**Run with code Sandbox.**

[![Edit layui-vue](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/11mvy)

## 功能

你可以用layui vue做的一些事情：

* 使用 setup script 编写组件
* 多达 60 个高品质组件
* 提供 Axure 设计资源
* 支持 夜间模式
* 支持 多主题
* 支持 国际化

## 开始使用

使用 npm 安装

```bash
npm i @layui/layui-vue
```
在使用前需要将 layui-vue 挂载到 vue 并引入 index.css 样式

```
import App from './App.vue'
import { createApp } from 'vue'
import layui from '@layui/layui-vue'
import '@layui/layui-vue/lib/index.css'

createApp(App).use(layui).mount('#app')
```

我们在[网站](http://layui-vue.pearadmin.com)上有几个例子。这是第一个让您入门的方法：

```
<template>
  <lay-button-container>
    <lay-button>Hello Word</lay-button>
  </lay-button-container>
</template>
```

## 反馈

欢迎在[提交问题](https://github.com/layui-vue/layui-vue/issues/new)上向我们反馈。欢迎功能请求。如果您想贡献，请查看[快速指南](./CONTRIBUTING.md)！

如果您有什么想聊的，请随时加入我们的[Gitter chat](https://gitter.im/layui-vue/community)！

## 构建过程

- `build` 打包组件库

请看一下[贡献指南](./CONTRIBUTING.md)，以获得关于如何构建应用程序的详细过程以及排除故障的信息。

## 贡献者

这个项目遵循[所有贡献者](https://github.com/layui-vue/layui-vue/graphs/contributors)规范，感谢这些[出色的贡献者](https://github.com/layui-vue/layui-vue/graphs/contributors)。

<a href="https://github.com/layui-vue/layui-vue/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=layui-vue/layui-vue" />
</a>

## 开源许可

Layui Vue 采用 [MIT](https://opensource.org/licenses/MIT) 开源许可证。