::: demo

<template>
  <lay-collapse :openKeys="openKeys">
    <lay-collapse-item title="标题" id="1"> 内容 </lay-collapse-item>
    <lay-collapse-item title="标题" id="2"> 内容 </lay-collapse-item>
    <lay-collapse-item title="标题" id="3"> 内容 </lay-collapse-item>
  </lay-collapse>
</template>

<script>
import { ref } from 'vue'

export default {
  setup() {

    const openKeys = ref(["1","2","3"])

    return {
      openKeys
    }
  }
}
</script>

:::

<lay-field title="Collapse attributes" style="margin-top:40px"/>

|       |        |                |
| ----- | ------ | -------------- |
| openKeys | 打开的目录 | `array` |