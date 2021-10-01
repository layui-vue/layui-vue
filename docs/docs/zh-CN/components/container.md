::: demo

<template>
  <lay-container>
    <div class="container-demo"></div>
  </lay-container>
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

<style>
    .container-demo {
        width:100%;
        height: 300px;
        background: #79C48C;
        border-radius: 4px;
    }
</style>

:::

::: demo

<template>
  <lay-container fluid>
      <div class="container-demo"></div>
  </lay-container>
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

<style>
    .container-demo {
        width:100%;
        height: 300px;
        background: #79C48C;
    }
</style>

:::

|  |  |  |
|--|--|--|
| fluid | 流模式 | `true` `false` |