## Introduction

<p>  
  <a href="https://www.npmjs.com/package/@layui/layer-vue"><img src="https://img.shields.io/npm/v/@layui/layer-vue.svg?sanitize=true"></a>
  <a href="https://www.npmjs.com/package/@layui/layer-vue"><img src="https://img.shields.io/npm/l/@layui/layer-vue.svg?sanitize=true"></a>
  <a href="https://travis-ci.org/sentsin/layui"><img src="https://img.shields.io/travis/sentsin/layui/master.svg"></a>
  <a href="https://coveralls.io/r/sentsin/layui?branch=master"><img src="https://img.shields.io/coveralls/sentsin/layui/master.svg"></a>
</p>

**[🔶 Explore the docs »](http://layer.layui-vue.com)** **[Join us](https://jq.qq.com/?_wv=1027&k=ffiUQgnE)**

Layer vue is a web elastic layer component.

## Get Started

Use npm to install.

```bash
npm i @layui/layer-vue
```

Before using, you need to mount layui Vue to Vue and introduce index.css style file.

```
import App from './App';
import { createApp } from 'vue';
import layer from '@layui/layer-vue';
import '@layui/layer-vue/lib/index.css';

const app = createApp(App);

app.use(layer).mount('#app');
```

We support functional invocation:

```
<template>
  <button type="button" @click="openSuccess">提示消息</button>
</template>

<script setup>
import { ref } from "vue";
import { layer } from "@layui/layer-vue";

const openSuccess = function () {
  layer.msg("成功消息", {icon:1, time:1000});
};
</script>
```
Componentized calls are also supported:

```
<template>
  <button @click="changeVisible">显示/隐藏</button>
  <lay-layer v-model="visible">
    content
  </lay-layer>
</template>

<script setup>
import { ref } from "vue";

const visible = ref(false);

const changeVisible = () => {
  visible.value = !visible.value;
}
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