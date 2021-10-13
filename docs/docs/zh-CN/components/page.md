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

::: demo

<template>
  <lay-page limit=20 total=100 @jump="jump" showPage></lay-page>
</template>

<script>
import { ref } from 'vue'

export default {
  setup() {

    const jump = function({ current }) {
       console.log("当前页:" + current)
    }

    return {
      jump
    }
  }
}
</script>

:::

::: field Page attributes

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

::: field Page events

:::

|             |              |         |
| ----------- | ------------ | ------- |
| jump       | 切换回调     | { current: 当前页面 }    |
