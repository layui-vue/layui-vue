::: title 定制主题
:::

::: describe Layui 设计规范上支持一定程度的样式定制，以满足业务和品牌上多样化的视觉需求，包括但不限于主色、圆角、边框和部分组件的视觉定制。
:::

::: describe 以下是一些最常用的通用变量，所有样式变量可以在 这里 找到。
:::

```css
@global-primary-color: #009688; // 主题色
@global-checked-color: #5FB878; // 选中色
@global-border-radius: 2px; // 圆角度数
```
::: describe 如果以上变量不能满足你的定制需求，可以给我们提 issue。
:::

::: title 定制方式
:::

::: describe 建立一个单独的 less 变量文件，引入这个文件覆盖 index.less 里的变量。
:::

```css
@import '@layui/layui-vue/lib/index.less'; // 引入官方提供的 less 样式入口文件
@import 'your-theme-file.less'; // 用于覆盖上面定义的变量
```

::: describe 注意，这种方式已经载入了所有组件的样式，不需要也无法和按需加载插件 babel-plugin-import 的 style 属性一起使用。
:::