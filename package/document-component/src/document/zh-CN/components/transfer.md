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
  <lay-transfer v-model="value1" :dataSource="dataSource1">
    <template #leftTitle> 标题1 </template>
    <template #rightTitle> 标题2 </template>
  </lay-transfer>
</template>

<script>
import { ref } from 'vue'

export default {
  setup() {

    const value1 = ref(['1']);
    const dataSource1 = ref([{id:'1', title:'易大师', disabled: true},{id:'2', title:'战争之王'}])

    return {
      value1,
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
  <lay-transfer v-model="value2" :dataSource="dataSource2" :title="title"></lay-transfer>
</template>

<script>
import { ref } from 'vue'

export default {
  setup() {

    const value2 = ref([]);
    const dataSource2 = [{id:'1', title:'易大师'},{id:'2', title:'战争之王'}]
    const title = ['我喜欢的','我不喜欢的']

    return {
      value2,
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
  <lay-transfer v-model="value3" :dataSource="dataSource3">
    <template v-slot:item="{ data }">
      {{data.id}}
    </template>
  </lay-transfer>
</template>

<script>
import { ref } from 'vue'

export default {
  setup() {

    const value3 = ref([]);
    const dataSource3 = [{id:'1', title:'易大师'},{id:'2', title:'战争之王'}]

    return {
      value3,
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
  <lay-transfer v-model="value6" :dataSource="dataSource6" :showSearch="true" :searchMethod="searchMethod">
    <template v-slot:item="{ data }">
      {{data.label}}
    </template>
  </lay-transfer>
</template>

<script>
import { ref } from 'vue'

export default {
  setup() {

    const value6 = ref([]);

    const dataSource6 = [
      {id:'1', label:'无影剑'},
      {id:'2', label:'逸龙剑'},
      {id:'3', label:'精灵之语'},
      {id:'4', label:'十字斩刀-斗'},
      {id:'5', label:'落炎魔杖'},
      {id:'6', label:'石中剑'},
      {id:'7', label:'屠戮之刃'}
    ]

    const searchMethod = (text, item) => {
      console.log("text:" + text)
      return item.label.indexOf(text) != -1;
    }
    
    return {
      value6,
      dataSource6,
      searchMethod
    }
  }
}
</script>

::: 

::: title 海量数据
:::

::: demo

<template>
  <lay-transfer v-model="value4" :dataSource="dataSource4"></lay-transfer>
</template>

<script>
import { ref } from 'vue'

export default {
  setup() {

    const value4 = ref([]);

    const dataSource4 = [
      {id:'1', title:'无影剑'},
      {id:'2', title:'逸龙剑'},
      {id:'3', title:'精灵之语'},
      {id:'4', title:'十字斩刀-斗'},
      {id:'5', title:'落炎魔杖'},
      {id:'6', title:'石中剑'},
      {id:'7', title:'屠戮之刃'},
      {id:'8', title:'无影剑'},
      {id:'9', title:'逸龙剑'},
      {id:'10', title:'精灵之语'},
      {id:'11', title:'十字斩刀-斗'},
      {id:'12', title:'落炎魔杖'},
      {id:'13', title:'石中剑'},
      {id:'14', title:'屠戮之刃'},
      {id:'15', title:'落炎魔杖'},
      {id:'16', title:'石中剑'},
      {id:'17', title:'屠戮之刃'},
      {id:'18', title:'无影剑'},
      {id:'19', title:'逸龙剑'},
      {id:'20', title:'精灵之语'},
      {id:'21', title:'十字斩刀-斗'},
      {id:'22', title:'落炎魔杖'},
      {id:'23', title:'石中剑'},
      {id:'24', title:'屠戮之刃'}
    ]
    
    return {
      value4,
      dataSource4
    }
  }
}
</script>

:::

::: title 底部插槽
:::

::: demo

<template>
  <lay-transfer v-model="value5" :dataSource="dataSource5">
    <template v-slot:leftFooter>左侧底部</template>
    <template v-slot:rightFooter>右侧底部</template>
  </lay-transfer>
</template>

<script>
import { ref } from 'vue'

export default {
  setup() {

    const value5 = ref([])

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
      value5,
      dataSource5
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
| modalValue (v-model) | 目标值    | --              |
| dataSource | 数据来源    | --              |
| title      | 标题        | --              |
| id         | 主键        | --              |
| showSearch | 开启搜索        | --              |
| width      | 左右盒子宽度        | `200px`              |
| height     | 左右盒子高度        |  `360px`              |
| searchMethod  | 自定义搜索逻辑 (searchValue, data)    | `Function` | -- | -- |

:::

::: title Transfer 插槽
:::

::: table

| Name | Description | Accepted Values |
| ---- | ----------- | --------------- |
| item | 列表项      | { data }        |
| leftFooter | 左侧盒子底部内容      | --      |
| rightFooter | 右侧盒子底部内容      | --        |
| leftTitle | 左侧盒子顶部内容      | --      |
| rightTitle | 右侧盒子顶部内容      | --        |

:::

::: title Transfer 事件
:::

::: table

| Name | Description | Accepted Values |
| ---- | ----------- | --------------- |
| change | 数据穿梭回调      | targetKeys        |

:::

::: contributor transfer
:::

::: previousNext transfer
:::