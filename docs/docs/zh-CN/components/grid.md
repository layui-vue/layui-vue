::: demo

<template>
  <lay-row space="10">
     <lay-col md="6"><div class="grid-demo">1</div></lay-col>
     <lay-col md="6"><div class="grid-demo grid-demo-bg1">2</div></lay-col>
     <lay-col md="3"><div class="grid-demo">3</div></lay-col>
     <lay-col md="3"><div class="grid-demo grid-demo-bg1">4</div></lay-col>
     <lay-col md="3"><div class="grid-demo">5</div></lay-col>
     <lay-col md="3"><div class="grid-demo grid-demo-bg1">6</div></lay-col>
  </lay-row>
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
  <lay-row space="10">
     <lay-col md="6"><div class="grid-demo">1</div></lay-col>
     <lay-col md="3" mdOffset="3"><div class="grid-demo grid-demo-bg1">2</div></lay-col>
  </lay-row>
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
  <lay-row space="10">
     <lay-col md="6" sm="6" xs="12"><div class="grid-demo">1</div></lay-col>
     <lay-col md="6" sm="6" xs="12"><div class="grid-demo grid-demo-bg1">2</div></lay-col>
  </lay-row>
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