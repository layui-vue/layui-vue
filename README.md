## Introduction

<p>  
  <a href="https://www.npmjs.com/package/@layui/layui-vue"><img src="https://img.shields.io/npm/v/@layui/layui-vue.svg?sanitize=true" alt="Version"></a>
  <a href="https://www.npmjs.com/package/@layui/layui-vue"><img src="https://img.shields.io/npm/l/@layui/layui-vue.svg?sanitize=true" alt="License"></a>
  <a href="https://travis-ci.org/sentsin/layui"><img alt="Build Status" src="https://img.shields.io/travis/sentsin/layui/master.svg"></a>
  <a href="https://coveralls.io/r/sentsin/layui?branch=master"><img alt="Test Coverage" src="https://img.shields.io/coveralls/sentsin/layui/master.svg"></a>
</p>  

**[🔶 Explore the docs »](http://www.layui-vue.com)** **[Join us](https://jq.qq.com/?_wv=1027&k=ffiUQgnE)**

An enterprise-class UI components based on Layui and Vue.

**Run with code Sandbox.**

[![Edit layui-vue](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/11mvy)

## Features

A few of the things you can do with layui vue:

* Writing components using setup script
* Up to 60 high quality components
* Provide Axure design resources
* Support theme customization
* Support internationalization

## Get Started

Use npm to install.

```bash
npm i @layui/layui-vue
```
Before using, you need to mount layui Vue to Vue and introduce index.css style file

```
import App from './App.vue'
import { createApp } from 'vue'
import layui from '@layui/layui-vue'
import '@layui/layui-vue/lib/index.css'

createApp(App).use(layui).mount('#app')
```

We have several examples on the [website](http://layui-vue.pearadmin.com). Here is the first one to get you started:

```
<template>
  <lay-button-container>
    <lay-button>Hello Word</lay-button>
  </lay-button-container>
</template>
```

## Feedback

Feel free to send us feedback on [file an issue](https://github.com/layui-vue/layui-vue/issues/new). Feature requests are always welcome. If you wish to contribute, please take a quick look at the [guidelines](./CONTRIBUTING.md)!

If there's anything you'd like to chat about, please feel free to join our [Gitter chat](https://gitter.im/layui-vue/community)!

## Build Process

- `build` Packaged component library

Please take a look at the [contributing guidelines](./CONTRIBUTING.md) for a detailed process on how to build your application as well as troubleshooting information.

## Contributors

This project follows the [all-contributors](https://github.com/layui-vue/layui-vue/graphs/contributors) specification and is brought to you by these [awesome contributors](https://github.com/layui-vue/layui-vue/graphs/contributors).

<a href="https://github.com/layui-vue/layui-vue/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=layui-vue/layui-vue" />
</a>

## Licence

Layui vue is licensed under the [MIT license](https://opensource.org/licenses/MIT).
