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

::: title 动画
:::

::: demo 使用 `animated` 开启动画。**不可与 `indeterminate` 共用。**

<template>
  <div style="display: flex; flex-direction: column; gap: 8px;">
    <LayProgress animated :percent="50"></LayProgress>
    <LayProgress animated :percent="percent1"></LayProgress>
    <LayProgress :animated="percent1<100" :percent="percent1"></LayProgress>
  </div>
</template>

<script lang="ts">
import { ref } from "vue";
export default {
  setup() {
    const percent1 = ref(100);
    return {
      percent1
    }
  }
}
</script>

:::

::: title 无限进度条
:::

::: demo 使用 `indeterminate` 属性创建无限进度条。**不可与 `animated` 共用。** 通过 `theme` 或 `color` 改变颜色

<template>
  <div style="display: flex; flex-direction: column; gap: 8px;">
    <LayProgress indeterminate></LayProgress>
    <LayProgress indeterminate theme="green"></LayProgress>
    <LayProgress indeterminate theme="orange"></LayProgress>
    <LayProgress indeterminate theme="cyan"></LayProgress>
    <LayProgress indeterminate color="#de0123"></LayProgress>
  </div>
</template>

<script lang="ts">
import { ref } from "vue";
</script>

:::

::: title 进度分段
:::

::: demo 提供 `Array<PorgressLinearProps>` 类型到 `precent` 属性上，可以创建进度分段。

<template>
  <LaySpace direction="vertical" style="width: 100%">
    <LayProgress animated :percent="percent"></LayProgress>
  </LaySpace>
</template>

<script lang="ts">
import { ref } from "vue";

export default {
  setup() {
    const percent = ref([
      { percent: 50, theme: "green", showText: true, text: "123" },
      { percent: 20, theme: "info", showText: true, text: "4" },
      { percent: 10, theme: "orange", showText: true, text: "5" },
    ]);

    return {
      percent,
    };
  },
};
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

| 属性               | 描述               | 类型              | 可选值                                        | 默认值  | 版本     |
| ------------------ | ------------------ | ----------------- | --------------------------------------------- | ------- | -------- |
| percent            | 进度               | `number` `string` | --                                            |         |          |
| theme              | 主题               | `string`          | `orange` `green` `cyan` `blue` `black` `gray` |         |          |
| size               | 尺寸               | `string`          | `big`                                         |         |          |
| text               | 提示               | `string`          | --                                            |         |          |
| color              | 颜色               | `string`          | --                                            |         |          |
| show-text          | 展示描述           | `boolean`         | --                                            |         |          |
| circle             | 环形进度条         | `boolean`         |                                               | `false` |          |
| circle-size        | 环形进度条尺寸     | `number`          | 默认为 `150` 单位是 px                        | `150`   |          |
| circle-width       | 环形进度条线条宽度 | `number`          | 默认为 `6` 单位是 px                          | `6`     |          |
| animated           | 是否开启动画       | `boolean`         | --                                            | `false` | `2.19.0` |
| animation-duration | 动画时长（毫秒）   | `number`          | --                                            | `3000`  | `2.19.0` |
| indeterminate     | 是否为无限进度条   | `boolean`         | --                                            | `false` | `2.19.0` |

:::

::: title Types

```typescript
export type ProgressLineProps = {
  percent: number | string;
  theme?: string;
  color?: string;
  showText?: boolean;
  text?: string;
};
```

:::

::: previousNext progress
:::
