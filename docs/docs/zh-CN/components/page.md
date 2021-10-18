::: demo

<template>
  <lay-page :limit="limit" :total="total" :show-page="showPage"></lay-page>
</template>

<script>
import { ref } from 'vue'

export default {
  setup() {

    const limit = ref(20)
    const total = ref(100)
    const showPage = ref(true)

    return {
      limit,
      total,
      showPage
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
  <lay-page :limit="limit" :total="total">
    <template v-slot:prev>上</template>
    <template v-slot:next>下</template>
  </lay-page>
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
  <lay-page :limit="limit" :total="total" :show-page="showPage" theme="red"></lay-page>
  <br>
  <lay-page :limit="limit" :total="total" :show-page="showPage" theme="blue"></lay-page>
  <br>
  <lay-page :limit="limit" :total="total" :show-page="showPage" theme="orange"></lay-page>
</template>

<script>
import { ref } from 'vue'

export default {
  setup() {

    const limit = ref(20)
    const total = ref(100)
    const showPage = ref(true)

    return {
      limit,
      total,
      showPage
    }
  }
}
</script>

:::

::: demo

<template>
  <lay-page :limit="limit" :total="total" :show-count="showCount" :show-page="showPage" :show-limit="showLimit" :show-refresh="showRefresh" showSkip="showSkip"></lay-page>
</template>

<script>
import { ref } from 'vue'

export default {
  setup() {

    const limit = ref(20)
    const total = ref(100)
    const showCount = ref(true)
    const showPage = ref(true)
    const showLimit = ref(true)
    const showRefresh = ref(true)
    const showSkip = ref(true)

    return {
      limit,
      total,
      showCount,
      showPage,
      showLimit,
      showRefresh,
      showSkip
    }
  }
}
</script>

:::

::: demo

<template>
  <lay-page :limit="limit" :total="total" @jump="jump" :show-page="showSkip"></lay-page>
</template>

<script>
import { ref } from 'vue'

export default {
  setup() {

    const limit = ref(20)
    const total = ref(100)
    const showPage = ref(true)
    const jump = function({ current }) {
      console.log("当前页:" + current)
    }

    return {
      limit,
      total,
      jump,
      showPage
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


::: field page slots

:::

|             |              |         |
| ----------- | ------------ | ------- |
| prev       | 上一页     | 上一页    |
| next       | 下一页     | 下一页    |
