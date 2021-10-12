::: demo

<template>
  <lay-avatar :src="src"></lay-avatar>
</template>

<script>
import { ref } from 'vue'

export default {
  setup() {

    const src = ref("https://portrait.gitee.com/uploads/avatars/user/2813/8441097_shaynas_1610801433.png")

    return {
        src
    }
  }
}
</script>

:::

::: demo

<template>
  <lay-avatar :src="src" radius></lay-avatar>
</template>

<script>
import { ref } from 'vue'

export default {

    setup() {

        const src = "https://portrait.gitee.com/uploads/avatars/user/2813/8441097_shaynas_1610801433.png"
        
        return {
            src
        }
  }
}
</script>

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

        const src = "https://portrait.gitee.com/uploads/avatars/user/2813/8441097_shaynas_1610801433.png"

        return {
            src
        }
  }
}
</script>

:::

::: field Avatar attributes

:::

|        |      |                |
| ------ | ---- | -------------- |
| src    | 图源 | --             |
| size   | 尺寸 | `xs` `sm` `lg` |
| radius | 圆形 | `true` `false` |
