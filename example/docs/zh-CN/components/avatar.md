::: anchor
:::

::: title 基础使用
:::

::: demo 使用 `lay-avatar` 标签, 创建头像

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

        const src = "https://portrait.gitee.com/uploads/avatars/user/2813/8441097_shaynas_1610801433.png"
        
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
  &nbsp;&nbsp; 
  <lay-avatar :src="src" size="sm"></lay-avatar>
  &nbsp;&nbsp;
  <lay-avatar :src="src"></lay-avatar>
  &nbsp;&nbsp;
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

::: title 头像列表
:::

::: demo

<template>
  <lay-avatar-list>
    <lay-avatar :src="src" radius></lay-avatar>
    <lay-avatar :src="src" radius></lay-avatar>
    <lay-avatar :src="src" radius></lay-avatar>
    <lay-avatar :src="src" radius></lay-avatar>
    <lay-avatar :src="src" radius></lay-avatar>
  </lay-avatar-list>
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

::: title Avatar 属性
:::

::: table

| 属性   | 描述 | 可选值         |
| ------ | ---- | -------------- |
| src    | 图源 | --             |
| size   | 尺寸 | `xs` `sm` `lg` |
| radius | 圆形 | `true` `false` |

:::

::: comment
:::

::: previousNext avatar
:::
