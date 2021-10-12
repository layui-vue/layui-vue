::: demo

<template>
    <lay-breadcrumb>
        <lay-breadcrumb-item title="哈哈"></lay-breadcrumb-item>
        <lay-breadcrumb-item title="哈哈"></lay-breadcrumb-item>
        <lay-breadcrumb-item title="哈哈"></lay-breadcrumb-item>
    </lay-breadcrumb>
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
    <lay-breadcrumb separator=">">
        <lay-breadcrumb-item title="哈哈"></lay-breadcrumb-item>
        <lay-breadcrumb-item title="哈哈"></lay-breadcrumb-item>
        <lay-breadcrumb-item title="哈哈"></lay-breadcrumb-item>
    </lay-breadcrumb>
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

<lay-field title="Breadcrumb attributes" style="margin-top:40px"/>

|           |        |     |
| --------- | ------ | --- |
| separator | 分割符 | `/` |
