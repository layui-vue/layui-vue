::: demo

<template>
  默认分割线
  <lay-line></lay-line><br/>
  赤色分割线
  <lay-line theme="red"></lay-line><br/>
  橙色分割线
  <lay-line theme="orange"></lay-line><br/>
  墨绿分割线
  <lay-line theme="green"></lay-line><br/>
  青色分割线
  <lay-line theme="cyan"></lay-line><br/>
  蓝色分割线
  <lay-line theme="blue"></lay-line><br/>
  黑色分割线
  <lay-line theme="black"></lay-line><br/>
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

::: title 分割属性

:::

| Name  | Description | Accepted Values                               |
| ----- | ----------- | --------------------------------------------- |
| theme | 主题        | `orange` `green` `cyan` `blue` `black` `gray` |
