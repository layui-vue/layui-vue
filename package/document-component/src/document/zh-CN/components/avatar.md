::: anchor
:::

::: title 基本介绍
:::

::: describe 用来代表用户或事物，支持图片、图标或字符展示。
:::

::: title 基础使用
:::

::: demo 使用 `lay-avatar` 标签, 创建头像

<template>
  <lay-space>
    <lay-avatar :src="src"></lay-avatar>
    <lay-avatar> Bai </lay-avatar>
    <lay-avatar></lay-avatar>
    <lay-avatar icon="layui-icon-face-smile"></lay-avatar>
  </lay-space>
</template>

<script>
import { ref } from 'vue'

export default {
  setup() {

    const src = ref("https://portrait.gitee.com/uploads/avatars/user/1611/4835367_Jmysy_1578975358.png")

    return {
        src
    }
  }
}
</script>

:::

::: title 圆角头像
:::

::: demo 通过 `radius` 属性, 开启头像圆角。

<template>
  <lay-avatar :src="src" radius></lay-avatar>
</template>

<script>
import { ref } from 'vue'
export default {
    setup() {

        const src = "https://portrait.gitee.com/uploads/avatars/user/1611/4835367_Jmysy_1578975358.png"
        
        return {
            src
        }
  }
}
</script>

:::

::: title 尺寸大小
:::

::: demo 通过 `size` 属性, 设置头像大小。

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

        const src = "https://portrait.gitee.com/uploads/avatars/user/1611/4835367_Jmysy_1578975358.png"

        return {
          src
        }
  }
}
</script>

:::

::: title 头像列表
:::

::: demo 通过 `lay-avatar-list` 标签, 创建头像列表。

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

        const src = "https://portrait.gitee.com/uploads/avatars/user/1611/4835367_Jmysy_1578975358.png"

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
| alt    | 描述图像的替换文本 | -- |

:::

::: contributor avatar
:::

::: previousNext avatar
:::
