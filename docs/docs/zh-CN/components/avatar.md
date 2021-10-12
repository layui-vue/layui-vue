::: demo

<template>
  <lay-avatar :href="href"></lay-avatar>
</template>

<script>
import { ref } from 'vue'

export default {
  setup() {

    const href = ref("https://portrait.gitee.com/uploads/avatars/user/2813/8441097_shaynas_1610801433.png")

    return {
        href
    }
  }
}
</script>

:::

::: demo

<template>
  <lay-avatar :href="avatar" radius></lay-avatar>
</template>

<script>
import { ref } from 'vue'

export default {

    setup() {

        const avatar = "https://portrait.gitee.com/uploads/avatars/user/2813/8441097_shaynas_1610801433.png"
        
        return {
            avatar
        }
  }
}
</script>

:::

::: demo

<template>
  <lay-avatar :href="avatar" size="xs"></lay-avatar> 
  <lay-avatar :href="avatar" size="sm"></lay-avatar>
  <lay-avatar :href="avatar"></lay-avatar>
  <lay-avatar :href="avatar" size="lg"></lay-avatar>
</template>

<script>
import { ref } from 'vue'

export default {
    setup() {

        const avatar = "https://portrait.gitee.com/uploads/avatars/user/2813/8441097_shaynas_1610801433.png"

        return {
            avatar
        }
  }
}
</script>

:::

<lay-field title="Avatar attributes" style="margin-top:40px"/>

|        |      |                |
| ------ | ---- | -------------- |
| src    | 图源 | --             |
| size   | 尺寸 | `xs` `sm` `lg` |
| radius | 圆形 | `true` `false` |
