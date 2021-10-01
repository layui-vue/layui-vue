::: demo

<template>
  默认分割线
  <lay-line></lay-line>
  赤色分割线
  <lay-line theme="red"></lay-line>
  橙色分割线
  <lay-line theme="orange"></lay-line>
  墨绿分割线
  <lay-line theme="green"></lay-line>
  青色分割线
  <lay-line theme="cyan"></lay-line>
  蓝色分割线
  <lay-line theme="blue"></lay-line>
  黑色分割线
  <lay-line theme="black"></lay-line>
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
| theme| 主题 | `orange` `green` `cyan` `blue` `black` `gray`|