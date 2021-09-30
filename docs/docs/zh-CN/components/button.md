::: demo 传入 columns 数据，自动生成表格

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

::: demo 传入 columns 数据，自动生成表格

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


::: demo 传入 columns 数据，自动生成表格

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

::: demo 传入 columns 数据，自动生成表格

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

::: demo 传入 columns 数据，自动生成表格

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

::: demo 传入 columns 数据，自动生成表格

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

|  |  |  |
|--|--|--|
| type | 主题 | `primary` `normal` `warm` `danger` `disabled`|
| size | 尺寸 | `lg` `sm` `xs` |
| fluid | 最大化 | `true` `false` |
| radius | 圆角 | `true` `false` |