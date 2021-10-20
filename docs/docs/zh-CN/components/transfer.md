::: field 基础使用
:::

::: demo

<template>
  <lay-transfer :dataSource="dataSource1"></lay-transfer>
</template>

<script>
import { ref } from 'vue'

export default {
  setup() {

    const dataSource1 = [{id:'1', title:'易大师'},{id:'2', title:'战争之王'}]

    return {
      dataSource1
    }
  }
}
</script>

:::

::: field 指定标题
:::

::: demo

<template>
  <lay-transfer :dataSource="dataSource2" :title="title"></lay-transfer>
</template>

<script>
import { ref } from 'vue'

export default {
  setup() {

    const dataSource2 = [{id:'1', title:'易大师'},{id:'2', title:'战争之王'}]
    const title = ['我喜欢的','我不喜欢的']


    return {
      dataSource2,
      title
    }
  }
}
</script>

:::

::: field 使用插槽
:::

::: demo

<template>
  <lay-transfer :dataSource="dataSource1">
    <template v-slot:item="{ data }">
      {{data.id}}
    </template>
  </lay-transfer>
</template>

<script>
import { ref } from 'vue'

export default {
  setup() {

    const dataSource1 = [{id:'1', title:'易大师'},{id:'2', title:'战争之王'}]

    return {
      dataSource1
    }
  }
}
</script>

:::

::: field transfer 属性
:::

| Name   | Description | Accepted Values  |
| -------- | ---- | ----------------------- | 
| dataSource       | 数据来源 | --  | 
| title       | 标题 | --  | 
| id       | 主键 | --  | 

::: field transfer 插槽
:::

| Name   | Description | Accepted Values  |
| -------- | ---- | ----------------------- | 
| item       | 列表项 | { data }  | 