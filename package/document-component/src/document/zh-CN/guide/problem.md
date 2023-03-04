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

::: title 全局 Component 作为 layer.open 内容时, 出现 cannot be resolved 警告
:::

::: describe 忽略了 CreateApp().use(layer) 过程, 使其创建了新的 appContext 实例, 导致与全局 Component 所在的 context 并不相同，因而无法获取到相关信息。
:::
