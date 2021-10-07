::: demo

<template>
  <lay-icon-picker type="layui-icon-face-smile"></lay-icon-picker>
</template>

<script>
import { ref } from 'vue'

export default {
  setup() {

    const icon = ref("layui-icon-home")

    return {
    }
  }
}
</script>

:::

::: demo

<template>
  <lay-icon-picker v-model="icon" type="layui-icon-face-smile"></lay-icon-picker>
</template>

<script>
import { ref } from 'vue'

export default {
  setup() {

    const icon = ref("layui-icon-home")

    return {
    }
  }
}
</script>

:::

::: demo

<template>
  <lay-icon-picker v-model="icon" type="layui-icon-face-smile" page></lay-icon-picker>
</template>

<script>
import { ref } from 'vue'

export default {
  setup() {

    const icon = ref("layui-icon-home")

    return {
    }
  }
}
</script>

:::