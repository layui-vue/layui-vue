::: demo

<template>
  <lay-avatar :src="avatar"></lay-avatar>
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
  <lay-avatar :src="avatar" radius></lay-avatar>
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
  <lay-avatar :src="avatar" size="xs"></lay-avatar> 
  <lay-avatar :src="avatar" size="sm"></lay-avatar>
  <lay-avatar :src="avatar"></lay-avatar>
  <lay-avatar :src="avatar" size="lg"></lay-avatar>
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

|  |  |  |
|--|--|--|
| src | 图源 | -- |
| size | 尺寸 | `xs` `sm` `lg`|
| radius | 圆形 | `true` `false`|