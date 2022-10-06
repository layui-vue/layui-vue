::: anchor
:::

::: title 基本介绍
:::

::: describe 可应用于许多业务场景，如完成进度、页面加载，是一种较为直观的表达元素。
:::

::: title 基础使用
:::

::: demo 通过 `lay-progress` 标签创建进度条, 使用 `percent` 属性设置进度。

<template>
  <lay-progress percent="70"></lay-progress>
  <br>
  <lay-progress percent="60"></lay-progress>
</template>

<script>
import { ref } from 'vue';

export default {
  setup() {

    return {
    }
  }
}
</script>

:::

::: title 尺寸大小
:::

::: demo 使用 `size` 属性设置进度条尺寸。

<template>
  <lay-progress percent="40" size="big"></lay-progress>
  <br>
  <lay-progress percent="60" size="big" theme="green"></lay-progress>
  <br>
  <lay-progress percent="80" size="big" theme="cyan"></lay-progress>
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

::: title 指定主题
:::

::: demo 使用 `theme` 属性, 设置进度条主题颜色。

<template>
  <lay-progress percent="60" theme="red"></lay-progress>
  <br>
  <lay-progress percent="60" theme="orange"></lay-progress>
  <br>
  <lay-progress percent="60" theme="green"></lay-progress>
  <br>
  <lay-progress percent="60" theme="blue"></lay-progress>
  <br>
  <lay-progress percent="60" theme="cyan"></lay-progress>
</template>

<script>
import { ref } from 'vue';

export default {
  setup() {

    return {
    }
  }
}
</script>

:::

::: title 显示文字
:::

::: demo 使用 `show-text` 属性开启内容展示, `text` 属性设置展示得内容。

<template>
  <lay-progress percent="80" :show-text="showText"></lay-progress>
  <br/>
  <br/>
  <lay-progress percent="80" :show-text="showText" text="销售量"></lay-progress>
</template>

<script>
import { ref } from 'vue'

export default {
  setup() {

    const showText = ref(true)

    return {
      showText
    }
  }
}
</script>

:::

::: title 环形进度
:::

::: demo 使用 `circle` 属性创建环形进度条。

<template>
  <lay-progress percent="10" circle :show-text="showText" style="margin-right:10px"></lay-progress>
  <lay-progress percent="20" circle :show-text="showText" text="销售量" theme="red" style="margin-right:10px"></lay-progress>
  <lay-progress percent="30" circle :show-text="showText" theme="blue" text="不同尺寸" :circleSize="200" :circleWidth="20" style="margin-right:10px"></lay-progress>
  <lay-progress percent="70" circle :show-text="showText" text="宽度控制" theme="orange" :circleSize="200" :circleWidth="40"></lay-progress>
</template>

<script>
import { ref } from 'vue'

export default {
  setup() {

    const showText = ref(true)

    return {
      showText
    }
  }
}
</script>
:::

::: title Progress 属性
:::

::: table

| 属性     | 描述     | 可选值                                        |
| -------- | -------- | --------------------------------------------- |
| percent  | 进度     | --                                            |
| theme    | 主题     | `orange` `green` `cyan` `blue` `black` `gray` |
| size     | 尺寸     | `big`                                         |
| text     | 提示     | --                                            |
| color    | 颜色     | --                                            |
| showText | 展示描述  | --                                            |
| circle    | 环形进度条| 默认为 `false`                                 |
| circleSize| 环形进度条尺寸| 默认为 `150` 单位是px                        |
| circleWidth| 环形进度条线条宽度| 默认为 `6` 单位是px                       |
:::

::: contributor progress
::: 

::: previousNext progress
:::