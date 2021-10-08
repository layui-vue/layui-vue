::: demo

<template>
  <lay-tab v-model="current1">
    <lay-tab-item title="选项一" id="1"><div style="padding:20px">选项一</div></lay-tab-item>
    <lay-tab-item title="选项二" id="2"><div style="padding:20px">选项二</div></lay-tab-item>
  </lay-tab>
</template>

<script>
import { ref } from 'vue'

export default {
  setup() {

    const current1 = ref("1")

    return {
      current1
    }
  }
}
</script>

:::

::: demo

<template>
  <lay-tab type="brief" v-model="current2">
    <lay-tab-item title="选项一" id="1"><div style="padding:20px">选项一</div></lay-tab-item>
    <lay-tab-item title="选项二" id="2"><div style="padding:20px">选项二</div></lay-tab-item>
  </lay-tab>
</template>

<script>
import { ref } from 'vue'

export default {
  setup() {

    const current2 = ref("1")

    return {
      current2
    }
  }
}
</script>

:::

::: demo

<template>
  <lay-tab type="card" v-model="current3">
    <lay-tab-item title="选项一" id="1"><div style="padding:20px">选项一</div></lay-tab-item>
    <lay-tab-item title="选项二" id="2"><div style="padding:20px">选项二</div></lay-tab-item>
  </lay-tab>
</template>

<script>
import { ref } from 'vue'

export default {
  setup() {

    const current3 = ref("1")

    return {
      current3
    }
  }
}
</script>

:::