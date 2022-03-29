::: anchor
:::

::: title 基本介绍
:::

::: describe 面板通常是指一个独立的容器
:::

::: title 基础使用
:::

::: demo 使用 `lay-panel` 标签, 创建面板组件

<template>
  <lay-panel><div style="padding: 30px;">面板</div></lay-panel>
</template>

<script>
import { ref } from 'vue'

export default {
  setup() {

    return {
    }
  }
}
</script>

:::

::: title 主题配置
:::

<p style="margin-left: 30px">less</p>

```
@panel-border-color: #eee;
@panel-border-radius: 2px;
@panel-fore-color: #333;
@panel-back-color: #fff;
```

<p style="margin-left: 30px">css</p>

```
--panel-border-color: #eee;
--panel-border-radius: 2px;
--panel-fore-color: #333;
--panel-back-color: #fff;
```

::: title Panel 插槽
:::

::: table

| 插槽    | 描述     | 可选值 |
| ------- | -------- | ------ |
| default | 默认插槽 | --     |

:::

 

::: previousNext panel
:::