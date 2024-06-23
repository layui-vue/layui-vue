::: title Visual Studio Code 插件
:::

::: describe layui-vue-helper 是 layui-vue 的开发增强工具，提供代码片段，自动完成，悬浮提示功能
:::

::: title 安装
:::

::: describe 在 Visual Studio Code 内置或网页版扩展市场搜索 layui-vue-helper，点击安装即可，插件会在 Vue 和 HTML 文件中自动激活
:::

::: title 自动完成
:::

> 按 `Ctrl+Space` (Windows, Linux) 或 `Cmd+Space` (macOS) 查看自动补全列表，目前只支持属性和事件补全

> 支持 Vue 和 HTML 文件

> ![自动完成.gif](https://s2.loli.net/2022/06/20/LioZGshVlFQYyew.gif)

::: title 文档悬停提示
:::

> 移动光标到 layui-vue 的 tag 或 prop，显示悬浮文档。

> ![悬浮提示.gif](https://s2.loli.net/2022/06/20/iKT3gn7bSxVFByX.gif)

::: title 代码片段
:::

> 输入片段触发词，按 `Tab` 切换预设输入点

> ![代码片段.gif](https://s2.loli.net/2022/06/20/zVxXdkaeEUjK4L5.gif)

> **其它代码片段的触发词和 layui-vue 组件名一致**

::: table

| Trigger Key | Describe                |
|-------------|-------------------------|
| layer-open  | layer-vue 弹层 open()方法|
| layer-load  | layer-vue 弹层 load()方法|
| layer-confirm| layer-vue 弹层 confirm()方法|
| layer-msg   | layer-vue 弹层 msg()方法|
| layer-drawer| layer-vue 弹层 drawer()方法|
| lay-cdn     | layui-vue CDN           |
| lay-cdn-es  | layui-vue ES Module CDN |
| lay-cdn-css | layui-vue css CDN       |
| v-cdn       | Vue 3 CDN               |
| v-cdn-es    | Vue 3 ES Module CDN     |
| !v          | Vue setup 传统模板       |
| !vs         | Vue setup 语法糖模板     |
| !lay-html   | layui-vue-html 模板     |
| !lay-html-es| layui-vue-html ES Module 模板  |

:::

::: title 图标选取
:::

> 按 `Ctrl + Shift + P`，打开命令面板，输入 `layui icon`, 选择 `Open layui icon document`，打开图标文档

> 选择需要的图标，点击复制

> ![图标](https://s2.loli.net/2022/09/06/hsVgJcaWqAoZG1k.png)
<style>
.markdown-body blockquote img{
  width: 650px;
  height: 400px;
}
.markdown-body table{
  margin-left: 35px;
  width: 650px;
}
</style>