::: title 基础使用
:::

::: demo

<template>
  <lay-avatar :src="src"></lay-avatar>
</template>

<script>
import { ref } from 'vue'

export default {
  setup() {

    const src = ref("https://portrait.gitee.com/uploads/avatars/user/30/92529_sentsin_1578917144.jpg")

    return {
        src
    }
  }
}
</script>

:::

::: title 圆角头像
:::

::: demo

<template>
  <lay-avatar :src="src" radius></lay-avatar>
</template>

<script>
import { ref } from 'vue'

export default {

    setup() {

        const src = "https://portrait.gitee.com/uploads/avatars/user/30/92529_sentsin_1578917144.jpg"
        
        return {
            src
        }
  }
}
</script>

:::

::: title 尺寸大小
:::

::: demo

<template>
  <lay-avatar :src="src" size="xs"></lay-avatar> 
  <lay-avatar :src="src" size="sm"></lay-avatar>
  <lay-avatar :src="src"></lay-avatar>
  <lay-avatar :src="src" size="lg"></lay-avatar>
</template>

<script>
import { ref } from 'vue'

export default {
    setup() {

        const src = "https://portrait.gitee.com/uploads/avatars/user/30/92529_sentsin_1578917144.jpg"

        return {
            src
        }
  }
}
</script>

:::

::: title 头像属性
:::

| 属性   | 描述 | 可选值         |
| ------ | ---- | -------------- |
| src    | 图源 | --             |
| size   | 尺寸 | `xs` `sm` `lg` |
| radius | 圆形 | `true` `false` |
