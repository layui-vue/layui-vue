##### 基础

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

##### 尺寸

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

#### 插槽

| name          | 说明                                        |           |
| :------------ | :-------------------------------------------|----------|
| type          | 按钮类型                                     | `primary` `normal` `warm` `danger` |
| size          | 按钮尺寸                                     | `lg` `sm` `xs`|