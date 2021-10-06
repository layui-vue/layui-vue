
<p align="center">
  <a href="http://www.layui.com">
    <img src="https://sentsin.gitee.io/res/images/layui/layui.png" alt="layui" width="360">
  </a>
</p>
<p align="center">
  A component library for Vue 3 base on layui
</p>

<p align="center">  
  <a href="https://www.npmjs.com/package/layui"><img src="https://img.shields.io/npm/v/layui.svg?sanitize=true" alt="Version"></a>
  <a href="https://www.npmjs.com/package/layui"><img src="https://img.shields.io/npm/l/layui.svg?sanitize=true" alt="License"></a>
  <a href="https://travis-ci.org/sentsin/layui"><img alt="Build Status" src="https://img.shields.io/travis/sentsin/layui/master.svg"></a>
  <a href="https://coveralls.io/r/sentsin/layui?branch=master"><img alt="Test Coverage" src="https://img.shields.io/coveralls/sentsin/layui/master.svg"></a>
  <!--<a href="https://saucelabs.com/beta/builds/7e6196205e4f492496203388fc003b65"><img src="https://saucelabs.com/buildstatus/layui" alt="Build Status"></a>-->
</p>

<!--
<p align="center">
  <a href="https://saucelabs.com/beta/builds/7e6196205e4f492496203388fc003b65"><img src="https://saucelabs.com/browser-matrix/layui.svg" alt="Browser Matrix"></a>
</p>
-->

---

Vue 3.0 的 桌 面 端 组 件 库 , Layui 的 另 一 种 呈 现 方 式


## 快速上手

获得 layui-vue 你只需要使用 npm 引入下述文件：

```
npm install @layui/layui-vue
```

在 main.ts 中：

```js
import { createApp } from 'vue'
import Layui from '@layui/layui-vue'
import '@layui/layui-vue/lib/layui.css'
import App from './App.vue'

createApp(App)
.use(Layui)
.mount('#app')

```

这是一个基本的入门页面：

```html
<template>
   <lay-layout>
      <lay-header>
         <lay-logo>Layui Admin</lay-logo>
      </lay-header>
      <lay-side></lay-side>
      <lay-body>
         <router-view></router-view>
      </lay-body>
      <lay-footer>pearadmin.com</lay-footer>
   </lay-layout>
</template>

```

## [阅读文档](http://layui-vue.pearadmin.com/)
从现在开始，尽情地拥抱 layui 吧！但愿她能成为你长远的开发伴侣，化作你方寸屏幕前的亿万字节！

## 使用趋势

[![Giteye chart](https://chart.giteye.net/gitee/Jmysy/layui-vue/54GMVA5A.png)](https://giteye.net/chart/54GMVA5A)

## 贡献者
> 大概是因为 layui 让开发者变得更懒，所以贡献者才这么少？   
> 好的，姑且就这样认为吧。
 
[![Giteye chart](https://chart.giteye.net/gitee/Jmysy/layui-vue/NPJNE48U.png)](https://giteye.net/chart/NPJNE48U)

## 相关
[官网](http://www.layui.com/)、[更新日志](http://www.layui.com/doc/base/changelog.html)