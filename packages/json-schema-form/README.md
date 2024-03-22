## Introduction

<p>  
  <a href="https://www.npmjs.com/package/@layui/json-schema-form"><img src="https://img.shields.io/npm/v/@layui/json-schema-form.svg?sanitize=true"></a>
  <a href="https://www.npmjs.com/package/@layui/json-schema-form"><img src="https://img.shields.io/npm/l/@layui/json-schema-form.svg?sanitize=true"></a>
</p>

**[🔶 Explore the docs »](http://www.layui-vue.com/zh-CN/components/jsonSchemaForm)** **[Join us](https://jq.qq.com/?_wv=1027&k=ffiUQgnE)**

Json-schema-form is a high-level component encapsulated on the basis of @layui/layui-vue form.

## Get Started

Use npm to install.

```bash
npm install @layui/json-schema-form --save
```

Before using, you need to mount layui Vue to Vue and introduce index.css style file.

```
import App from './App';
import { createApp } from 'vue';
import LayJsonSchemaForm from "@layui/json-schema-form";
import "@layui/json-schema-form/lib/index.css";

const app = createApp(App);

app.use(LayJsonSchemaForm).mount('#app');
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
