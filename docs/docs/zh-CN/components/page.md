::: demo

<template>
  <lay-page :limit="limit" :total="total" showPage></lay-page>
</template>

<script>
import { ref } from 'vue'

export default {
  setup() {

    const limit = ref(20)
    const total = ref(100)

    return {
      limit,
      total
    }
  }
}
</script>

:::

::: demo

<template>
  <lay-page :limit="limit" :total="total"></lay-page>
</template>

<script>
import { ref } from 'vue'

export default {
  setup() {

    const limit = ref(20)
    const total = ref(100)

    return {
      limit,
      total
    }
  }
}
</script>

:::

::: demo

<template>
  <lay-page :limit="limit" :total="total" showPage theme="red"></lay-page>
  <br>
  <lay-page :limit="limit" :total="total" showPage theme="blue"></lay-page>
  <br>
  <lay-page :limit="limit" :total="total" theme="orange"></lay-page>
</template>

<script>
import { ref } from 'vue'

export default {
  setup() {

    const limit = ref(20)
    const total = ref(100)

    return {
      limit,
      total
    }
  }
}
</script>

:::

::: demo

<template>
  <lay-page :limit="limit" :total="total" showCount showPage showLimit showRefresh showSkip></lay-page>
</template>

<script>
import { ref } from 'vue'

export default {
  setup() {

    const limit = ref(20)
    const total = ref(100)

    return {
      limit,
      total
    }
  }
}
</script>

:::

::: demo

<template>
  <lay-page :limit="limit" :total="total" @jump="jump" showPage></lay-page>
</template>

<script>
import { ref } from 'vue'

export default {
  setup() {

    const limit = ref(20)
    const total = ref(100)
    const jump = function({ current }) {
      console.log("当前页:" + current)
    }

    return {
      limit,
      total,
      jump
    }
  }
}
</script>

:::

::: field page attributes

:::

|             |              |         |
| ----------- | ------------ | ------- |
| limit       | 每页数量     | --      |
| total       | 总条数       | --      |
| showCount   | 显示总数     | `false` |
| showPage    | 显示每页     | `false` |
| showLimit   | 显示每页数量 | `false` |
| showRefresh | 显示刷新按钮 | `false` |
| showSkip    | 显示跳转     | `false` |

::: field page events

:::

|             |              |         |
| ----------- | ------------ | ------- |
| jump       | 切换回调     | { current: 当前页面 }    |
