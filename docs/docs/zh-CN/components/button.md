::: title 基础使用
:::

::: demo 使用 lay-button 标签, 创建一个按钮

<template>
  <lay-button type="primary">原始按钮</lay-button>
  <lay-button type="default">默认按钮</lay-button>
  <lay-button type="normal">百搭按钮</lay-button>
  <lay-button type="warm">暖色按钮</lay-button>
  <lay-button type="danger">警告按钮</lay-button>
  <lay-button type="disabled">禁用按钮</lay-button>
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

::: title 简约按钮
:::

::: demo 使用 border 属性设置 主要按钮 边框主题

<template>
  <lay-button type="primary">原始按钮</lay-button>
  <lay-button type="primary" border="green">默认按钮</lay-button>
  <lay-button type="primary" border="blue">百搭按钮</lay-button>
  <lay-button type="primary" border="orange">暖色按钮</lay-button>
  <lay-button type="primary" border="red">警告按钮</lay-button>
  <lay-button type="primary" border="black">禁用按钮</lay-button>
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

::: title 按钮尺寸
:::

::: demo 传入 size 属性, 创建指定尺寸的按钮, 可选值 `lg` `sm` `xs`

<template>
  <lay-button type="primary" size="lg">原始按钮</lay-button>
  <lay-button type="default" size="lg">默认按钮</lay-button>
  <lay-button type="normal" size="lg">百搭按钮</lay-button>
  <lay-button type="warm" size="lg">暖色按钮</lay-button>
  <lay-button type="danger" size="lg">警告按钮</lay-button>
  <lay-button type="disabled" size="lg">禁用按钮</lay-button>
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

::: title 流式按钮
:::

::: demo 传入 fluid 属性, 创建最大化按钮

<template>
  <lay-button type="primary" fluid>最大化按钮</lay-button>
  <br/>
  <br/>
  <lay-button type="default" fluid>最大化按钮</lay-button>
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

::: title 圆角按钮
:::

::: demo 传入 radius 属性，创建圆角按钮

<template>
  <lay-button type="primary" radius>原始按钮</lay-button>
  <lay-button type="default" radius>默认按钮</lay-button>
  <lay-button type="normal" radius>百搭按钮</lay-button>
  <lay-button type="warm" radius>暖色按钮</lay-button>
  <lay-button type="danger" radius>警告按钮</lay-button>
  <lay-button type="disabled" radius>禁用按钮</lay-button>
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

::: title 按钮分组
:::

::: demo 使用 lay-button-group 标签, 创建一个按钮组

<template>
  <div>
    <lay-button-group>
      <lay-button type="default">默认按钮</lay-button>
      <lay-button type="default">默认按钮</lay-button>
      <lay-button type="default">默认按钮</lay-button>
    </lay-button-group>
    <lay-button-group>
      <lay-button type="primary">默认按钮</lay-button>
      <lay-button type="primary">默认按钮</lay-button>
      <lay-button type="primary">默认按钮</lay-button>
    </lay-button-group>
  </div>
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

::: title 图标按钮
:::

::: demo 结合 lay-icon 组件, 创建图标按钮

<template>
  <lay-button-container>
      <lay-button type="primary"><lay-icon type="layui-icon-left"></lay-icon></lay-button>
      <lay-button type="primary"><lay-icon type="layui-icon-right"></lay-icon></lay-button>
  </lay-button-container>
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

::: title 按钮容器
:::

::: demo 使用 lay-button-container 标签, 创建一个按钮容器

<template>
  <lay-button-container>
      <lay-button type="default">新增</lay-button>
      <lay-button type="default">删除</lay-button>
      <lay-button type="default">修改</lay-button>
  </lay-button-container>
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

::: title 加载按钮
:::

::: demo 传入 loading 属性, 控制按钮的加载状态

<template>
  <lay-button-container>
      <lay-button type="default" :loading="loading">加载</lay-button>
      <lay-switch v-model="loading"></lay-switch>
  </lay-button-container>
</template>

<script>
import { ref } from 'vue'

export default {
  setup() {

    const loading = ref(true)

    return {
      loading
    }
  }
}
</script>

:::

::: title 按钮属性
:::

| Name   | Description | Accepted Values                               |
| ------ | ----------- | --------------------------------------------- |
| type   | 主题        | `primary` `normal` `warm` `danger` `disabled` |
| size   | 尺寸        | `lg` `sm` `xs`                                |
| fluid  | 最大化      | `true` `false`                                |
| radius | 圆角        | `true` `false`                                |
| border | 边框        | `green` `blue` `orange` `red` `black`         |
