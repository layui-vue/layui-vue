::: title 常见问题
:::

::: describe 我们整理了一些 layui-vue 社区常见的问题和官方答复，在提问之前建议找找有没有类似的问题。
:::

::: title 在 Html 模板中 `dataSource` `modelValue` 驼峰格式属性失效
:::

::: describe 若你想在 DOM 中直接书写 Vue 模板，Vue 则必须从 DOM 中获取模板字符串。因为浏览器的原生 HTML 解析行为，因此有一些需要注意的事项。
:::

::: describe 查阅：<a style="color:#009688;" href="https://staging-cn.vuejs.org/guide/essentials/component-basics.html#dom-template-parsing-caveats">https://staging-cn.vuejs.org/guide/essentials/component-basics.html#dom-template-parsing-caveats</a >
:::

::: title layui 与 layui-vue 的区别 （摘自 Gitee 介绍）
:::

::: describe Layui 是一套开源的 Web UI 组件库，采用自身轻量级模块化规范，遵循原生态的 HTML/CSS/JavaScript 开发模式，极易上手，拿来即用。
:::

::: describe Layui Vue 是一套 Vue 3.0 桌面端组件库，沿用 layui 设计规范，开箱即用。
:::

::: title 全局 Component 作为 layer.open 内容，出现 cannot be resolved 警告
:::

::: describe 因为忽略了 CreateApp().use(layer) 过程, 使其创建了新的 appContext 实例, 导致与全局 Component 所在的 context 并不相同，因而无法获取到组件信息。
:::

::: title 使用 vue-i18n 后，page, date-picker 等组件 i18n 失效
:::

::: describe 在 layui-vue 中内置了 vue-i18n 用于组件的国际化处理，如果用户二次安装，会导致内部的实例被覆盖，从而出现部分组件的文字无法正常显示。
:::

::: describe 如果你希望使用 vue-i18n 并且不影响组件的正常使用，只需要通过 import { useI18n } from "@layui/layui-vue" 使用即可。 <a style="color:#009688;" href="http://www.layui-vue.com/zh-CN/guide/locale">详见</a >。
:::

::: describe 寄语：本篇将主要讲解使用过程中普遍遇到的“问题”，并非是 BUG，通常是需要我们自己去注意的一些点。（持续补充）
:::