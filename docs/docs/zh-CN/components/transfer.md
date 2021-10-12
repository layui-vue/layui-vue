::: demo

<template>
  <lay-transfer :dataSource="dataSource"></lay-transfer>
</template>

<script>
import { ref } from 'vue'

export default {
  setup() {

    const dataSource = [{id:'1', title:'易大师'},{id:'2', title:'战争之王'}]

    return {
      dataSource
    }
  }
}
</script>

:::
