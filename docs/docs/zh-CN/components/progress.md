::: title 基础使用
:::

::: demo

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

::: demo

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

::: demo

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

::: demo

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

::: title Progress 属性
:::

|          |          |                                               |
| -------- | -------- | --------------------------------------------- |
| percent  | 进度     | --                                            |
| theme    | 主题     | `orange` `green` `cyan` `blue` `black` `gray` |
| size     | 尺寸     | `big`                                         |
| text     | 提示     | --                                            |
| color    | 颜色     | --                                            |
| showText | 展示描述 | --                                            |
