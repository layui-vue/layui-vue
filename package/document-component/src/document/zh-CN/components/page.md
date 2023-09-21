::: anchor
:::

::: title 基本介绍
:::

::: describe 提供极致的分页逻辑，既可轻松胜任异步分页，也可作为页面刷新式分页。
:::

::: title 基础使用
:::

::: demo 使用 `lay-page` 标签, 创建分页

<template>
  <lay-page  v-model="currentPage" :limit="limit" :total="total"></lay-page>
</template>

<script>
import { ref } from 'vue'

export default {
  setup() {

    const limit = ref(10)
    const total = ref(10)
    const currentPage = ref(4);

    return {
      limit,
      total,
      currentPage
    }
  }
}
</script>


:::


::: title 禁用
:::

::: demo 使用 `disabled` 属性 , 开启禁用

<template>
  <lay-page v-model="currentPage" :layout="layout" disabled :limit="limit" :total="total"></lay-page>
</template>

<script>
import { ref } from 'vue'

export default {
  setup() {

    const limit = ref(10)
    const total = ref(100)
    const currentPage = ref(1);
    const layout = ref(['count', 'prev', 'page', 'next', 'limits',  'refrsh', 'skip'])

    return {
      limit,
      total,
      layout,
      currentPage
    }
  }
}
</script>


:::


::: title 只有一页时隐藏
:::

::: demo 使用 `hide-on-single-page` 属性 , 开启只有一页时隐藏

<template>
  <lay-space direction="vertical" fill wrap size="lg">
    <lay-switch v-model="active1"></lay-switch>
    <lay-page :hide-on-single-page="active1" v-model="currentPage"  :limit="limit" :total="total"></lay-page>
  </lay-space>
</template>

<script>
import { ref } from 'vue'

export default {
  setup() {

    const limit = ref(10)
    const total = ref(10)
    const currentPage = ref(1);
    const  active1 = ref(false)
    return {
      limit,
      total,
      layout,
      currentPage,
      active1
    }
  }
}
</script>


:::


::: title 简洁模式
:::

::: demo

<template>
  <lay-page simple   v-model="current1" :total="total1"></lay-page>
</template>

<script>
import { ref } from 'vue'

export default {
  setup() {

    const limit1 = ref(10);
    const total1 = ref(100);
    const current1 = ref(1);

    return {
      limit1,
      total1,
      current1
    }
  }
}
</script>

:::

::: title 设置主题
:::

::: demo

<template>
  <lay-page :limit="limit2" :total="total2" theme="blue"></lay-page>
</template>

<script>
import { ref } from 'vue'

export default {
  setup() {

    const limit2 = ref(10)
    const total2 = ref(100)

    return {
      limit2,
      total2,
    }
  }
}
</script>

:::

::: title 分页容量
:::

::: demo

<template>
  <lay-page :limit="limit3" :total="total3"  :limits="limits3"></lay-page>
</template>

<script>
import { ref } from 'vue'

export default {
  setup() {

    const limit3 = ref(5)
    const total3 = ref(125)
    const limits3 = ref([5, 10, 50, 100, 200])

    return {
      limit3,
      total3,
      limits3
    }
  }
}
</script>

:::


::: title 回调事件
:::

::: demo

<template>
  <lay-page :limit="limit4" :total="total4" @change="change4" ></lay-page>
</template>

<script>
import { ref } from 'vue'
import { layer } from "@layui/layui-vue";

export default {
  setup() {

    const limit4 = ref(20)
    const total4 = ref(100)
    const change4 = ({ current, limit }) => {
      layer.msg("current:" + current + " limit:" + limit);
    }

    return {
      limit4,
      total4,
      change4
    }
  }
}
</script>

:::

::: title 完整分页
:::

::: demo

<template>
  <lay-button-container>
    <lay-button type="primary" size="sm" @click="changeCurrent5">update model {{ current5 }}</lay-button>
    <lay-button type="primary" size="sm" @click="changeLimit5">update limit {{ limit5 }}</lay-button>
  </lay-button-container>
  <br/>
  <lay-page v-model="current5"  :layout="layout" v-model:limit="limit5" :pages="pages5" :total="total5"  @change="change5"></lay-page>
</template>

<script>
import { ref } from 'vue'

export default {
  setup() {

    const limit5 = ref(10)
    const total5 = ref(99)
    const pages5 = ref(7);
    const current5 = ref(1);
    const layout = ref(['count', 'prev', 'page', 'next', 'limits',  'refrsh', 'skip'])
    const changeCurrent5 = () => {
      current5.value = 2;
    }
    const changeLimit5 = () => {
      limit5.value = 20;
    }
    const change5 = ({ current, limit }) => {
      layer.msg("current:" + current + " limit:" + limit);
    }
    return {
      limit5,
      total5,
      pages5,
      current5,
      layout,
      changeCurrent5,
      changeLimit5,
      change5
    }
  }
}
</script>

:::

::: title Page 属性
:::

::: table

| 属性        | 描述         | 默认值  |
| ----------- | ------------ | ------- |
| v-model     | 当前页       | --      |
| limit       | 每页数量     | 10      |
| total       | 总条数       | --      |
| layout      | 不同部分的展示 | `["prev", "page", "next", "limits"]` |
| pages       | 显示切页按钮数量     | `5` |
| limits       | 切换每页数量的选择项     | `[10,20,30,40,50]` |
| theme       | 主题色        |`green`|

:::

::: title Page 事件
:::

::: table

| 事件 | 描述     | 参数                  | 版本                  |
| ---- | -------- | --------------------- |---------------------  |
| jump | 切换回调 | { current: 当前页面 } | `移除`                  |
| limit | 每页数量变化 | 变化后的值 | `移除`                  |
| change          | 分页事件 | { current: 当前页码, limit: 每页数量 } | `1.4.3` |

:::

::: title Page 插槽
:::

::: table

| 插槽 | 描述   | 默认值 |
| ---- | ------ | ------ |
| prev | 上一页 | 上一页 |
| next | 下一页 | 下一页 |

:::

::: previousNext page
:::