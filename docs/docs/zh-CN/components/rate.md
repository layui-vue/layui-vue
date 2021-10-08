::: demo

<template>
  <lay-rate></lay-rate>
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
  <lay-rate v-model="all"></lay-rate> {{all}}
</template>

<script>
import { ref } from 'vue'

export default {
  setup() {

    const all = ref(4)

    return {
      all
    }
  }
}
</script>

:::

::: demo

<template>
  <lay-rate v-model="all2" length="10"></lay-rate> {{all2}}
</template>

<script>
import { ref } from 'vue'

export default {
  setup() {

    const all2 = ref(4)

    return {
      all2
    }
  }
}
</script>

:::