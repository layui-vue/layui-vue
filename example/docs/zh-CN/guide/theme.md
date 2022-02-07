::: title 定制主题
:::

::: describe Layui 支持一定程度的主题定制，以满足业务和品牌上多样化的视觉需求，包括但不限于主色、圆角、边框和部分组件的视觉定制。
:::

|    |    |
| -- | -- |
| <img style="margin:50px;width:60%;" src="../../../src/assets/theme1.svg" />   | <img style="margin:50px;width:60%;" src="../../../src/assets/theme2.svg" /> |

::: describe 以下是一些最常用的通用变量，所有样式变量可以在 这里 找到。
:::

```css
@global-primary-color: #009688; // 主题色
@global-checked-color: #5FB878; // 选中色 
@global-border-radius: 2px; // 圆角度数
```
::: describe 除全局的主题配置外, 我们还对组件提供定制化的主题配置 
:::

```css
@button-primary-color: #009688; // 按钮主题色
@button-border-radius: 2px; // 按钮圆角度数
...
```

::: describe 组件的主题配置会覆盖全局的配置, 组件的定制化配置会在对应的组件文档中看到。
:::

::: title 定制方式
:::

::: describe 建立一个单独的 less 变量文件，引入这个文件覆盖 index.less 里的变量。
:::

```css
@import '@layui/layui-vue/lib/index.less'; // 引入官方提供的 less 样式入口文件
@import 'your-theme-file.less'; // 用于覆盖上面定义的变量
```

::: describe 注意: 样式必须加载 less 格式，一个常见的问题就是引入了多份样式，less 的样式被 css 的样式覆盖了。
:::