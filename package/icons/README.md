## Introduction

<p>  
  <a href="https://www.npmjs.com/package/@layui/icons-vue"><img src="https://img.shields.io/npm/v/@layui/icons-vue.svg?sanitize=true" alt="Version"></a>
  <a href="https://www.npmjs.com/package/@layui/icon-vue"><img src="https://img.shields.io/npm/l/@layui/icons-vue.svg?sanitize=true" alt="License"></a>
  <a href="https://travis-ci.org/sentsin/layui"><img alt="Build Status" src="https://img.shields.io/travis/sentsin/layui/master.svg"></a>
  <a href="https://coveralls.io/r/sentsin/layui?branch=master"><img alt="Test Coverage" src="https://img.shields.io/coveralls/sentsin/layui/master.svg"></a>
</p>  

**[🔶 Explore the docs »](http://www.layui-vue.com)** **[Join us](https://jq.qq.com/?_wv=1027&k=ffiUQgnE)**

The abstract trees of the layui iconfont icons.

## Get Started

Use npm to install.

```bash
npm i @layui/icons-vue
```
Font icon files need to be introduced before use

```
import "@layui/icons-vue/lib/index.css"
```

Componentization, using the class of iconfont as the component name.

```
<template>
    <AlignCenterIcon></AlignCenterIcon>
    <DiamondIcon></DiamondIcon>
</template>

<script lang="ts" setup>
import { AlignCenterIcon, DiamondIcon } from '@layui/icons-vue';
</script>
```

Traditionally, components are rendered by passing class through type.

```
<template>
  <!-- 动态图标 -->
  <LayIcon type="layui-icon-not-found"></LayIcon>
  <LayIcon type="layui-icon-diamond"></LayIcon>
</template>

<script lang="ts" setup>
import { LayIcon } from '@layui/icons-vue';
</script>
```

## Open Source Licence

layui vue is licensed under the [MIT license](https://opensource.org/licenses/MIT).

```
The MIT License (MIT)

Copyright 2021 就眠儀式

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
the Software, and to permit persons to whom the Software is furnished to do so,
subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
```