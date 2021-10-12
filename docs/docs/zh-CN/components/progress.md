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

::: demo

<template>
  <lay-progress percent="80" size="big"></lay-progress>
  <br>
  <lay-progress percent="60" size="big" theme="orange"></lay-progress>
  <br>
  <lay-progress percent="60" size="big" theme="blue"></lay-progress>
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

::: demo

<template>
  <lay-progress percent="80" showText></lay-progress>
  <br/>
  <br/>
  <lay-progress percent="80" showText text="销售量"></lay-progress>
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

<lay-field title="Progress attributes" style="margin-top:40px"/>

|          |          |                                               |
| -------- | -------- | --------------------------------------------- |
| percent  | 进度     | --                                            |
| theme    | 主题     | `orange` `green` `cyan` `blue` `black` `gray` |
| size     | 尺寸     | `big`                                         |
| text     | 提示     | --                                            |
| color    | 颜色     | --                                            |
| showText | 展示描述 | --                                            |
