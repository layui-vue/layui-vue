::: demo

<template>
  <lay-page limit=20 total=100 showPage></lay-page>
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
  <lay-page limit=20 total=100 ></lay-page>
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
  <lay-page limit=20 total=100 showPage theme="red"></lay-page>
  <br>
  <lay-page limit=20 total=100 showPage theme="blue"></lay-page>
  <br>
  <lay-page limit=20 total=100 showPage theme="orange"></lay-page>
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
  <lay-page limit=20 total=100 showCount showPage showLimit showRefresh showSkip></lay-page>
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