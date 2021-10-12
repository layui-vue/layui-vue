::: demo

<template>
<div class="card-container">
  <lay-card title="标题">
      内容
  </lay-card>
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

<style>
.card-container {
  background: whitesmoke;
  padding: 20px;
}
</style>
:::

::: demo

<template>
<div class="card-container">
  <lay-card>
      <template v-slot:header>
      标题
      </template>
      <template v-slot:body>
      内容
      </template>
  </lay-card>
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

<style>
.card-container {
  background: whitesmoke;
  padding: 20px;
}
</style>
:::

::: demo

<template>
<div class="card-container">
  <lay-card>
      内容
  </lay-card>
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

<style>
.card-container {
  background: whitesmoke;
  padding: 20px;
}
</style>
:::


<lay-field title="Card attributes" style="margin-top:40px"/>

|        |      |        |
| ------ | ---- | ------ |
| title | 标题 | -- |

<lay-field title="Card slots" style="margin-top:40px"/>

|        |      |        |
| ------ | ---- | ------ |
| header | 头部插槽 | -- |
| body   | 内容插槽 | -- |
