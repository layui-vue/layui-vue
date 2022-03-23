::: anchor
:::

::: title 基础使用
:::

::: describe 常用于行数据的交互筛选，在浩瀚的业务需求中，值得一用。
:::

::: title 基础使用
:::

::: demo 使用 `lay-transfer` 标签, 创建穿梭框

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

::: title 指定标题
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

::: title 使用插槽
:::

::: demo

<template>
  <lay-transfer :dataSource="dataSource3">
    <template v-slot:item="{ data }">
      {{data.id}}
    </template>
  </lay-transfer>
</template>

<script>
import { ref } from 'vue'

export default {
  setup() {

    const dataSource3 = [{id:'1', title:'易大师'},{id:'2', title:'战争之王'}]

    return {
      dataSource3
    }
  }
}
</script>

:::


::: title 开启搜索
:::

::: demo

<template>
  <lay-transfer :dataSource="dataSource5" showSearch="true"></lay-transfer>
</template>

<script>
import { ref } from 'vue'

export default {
  setup() {

    const dataSource5 = [
      {id:'1', title:'无影剑'},
      {id:'2', title:'逸龙剑'},
      {id:'3', title:'精灵之语'},
      {id:'4', title:'十字斩刀-斗'},
      {id:'5', title:'落炎魔杖'},
      {id:'6', title:'石中剑'},
      {id:'7', title:'屠戮之刃'}
    ]
    
    return {
      dataSource5
    }
  }
}
</script>

::: 

::: title 海量数据
:::

::: demo

<template>
  <lay-transfer :dataSource="dataSource4"></lay-transfer>
</template>

<script>
import { ref } from 'vue'

export default {
  setup() {

    const dataSource4 = [
      {id:'1', title:'无影剑'},
      {id:'2', title:'逸龙剑'},
      {id:'3', title:'精灵之语'},
      {id:'4', title:'十字斩刀-斗'},
      {id:'5', title:'落炎魔杖'},
      {id:'6', title:'石中剑'},
      {id:'7', title:'屠戮之刃'}
    ]
    
    return {
      dataSource4
    }
  }
}
</script>

:::

::: title Transfer 属性
:::

::: table

| Name       | Description | Accepted Values |
| ---------- | ----------- | --------------- |
| dataSource | 数据来源    | --              |
| title      | 标题        | --              |
| id         | 主键        | --              |
| showSearch | 开启搜索        | --              |

:::

::: title Transfer 插槽
:::

::: table

| Name | Description | Accepted Values |
| ---- | ----------- | --------------- |
| item | 列表项      | { data }        |

:::

::: comment
:::

::: previousNext transfer
:::