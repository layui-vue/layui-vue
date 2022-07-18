::: anchor
:::

::: title 基本介绍
:::

::: describe 用于代替原生的选择器，或者需要一个更优雅的多选器时。支持关键词查询
:::

::: title 基础使用
:::

::: demo 使用 `lay-select` 标签, 创建下拉选择框

<template>
  <lay-select v-model="value">
    <lay-select-option value="1" label="学习"></lay-select-option>
    <lay-select-option value="2" label="编码"></lay-select-option>
    <lay-select-option value="3" label="运动"></lay-select-option>
  </lay-select>
</template>

<script>
import { ref } from 'vue'

export default {
  setup() {
    const value = ref(null);
    return {
      value
    }
  }
}
</script>

:::

::: title 数据联动
:::

::: demo

<template>
  <lay-button @click="change1">切换-当前值 : {{value2}}</lay-button>
  <br/>
  <br/>
  <lay-select v-model="value2">
    <lay-select-option value="1" label="学习"></lay-select-option>
    <lay-select-option value="2" label="编码"></lay-select-option>
    <lay-select-option value="3" label="运动"></lay-select-option>
  </lay-select>
</template>

<script>
import { ref } from 'vue'

export default {
  setup() {
    const value2 = ref(null);
    var i = 1;
    function change1(){
      value2.value=i++%3+1
    }
    return {
      value2,
      change1
    }
  }
}
</script>

:::

::: title 选择禁用
:::

::: demo

<template>
  <lay-select v-model="selected">
    <lay-select-option value="1" label="学习"></lay-select-option>
    <lay-select-option value="2" label="编码" disabled></lay-select-option>
    <lay-select-option value="3" label="运动"></lay-select-option>
  </lay-select>
</template>

<script>
import { ref } from 'vue'

export default {
  setup() {

    const selected = ref('1')

    return {
      selected
    }
  }
}
</script>

:::

::: title 关键词变化事件，可作为远程搜索处理算法
:::

::: demo

<template>
  <lay-select @search="search" v-model="selected">
    <lay-select-option value="1" label="学习"></lay-select-option>
    <lay-select-option value="2" label="编码" disabled></lay-select-option>
    <lay-select-option value="3" label="运动"></lay-select-option>
  </lay-select>
</template>

<script>
import { ref } from 'vue'

export default {
  setup() {
    const selected = ref('1');
    function search(txt){
      console.log('关键词:',txt)
    }
    return {
      selected,search
    }
  }
}
</script>

:::

::: title 选择项自定义搜索内容，可以在keyword属性中传入拼音用于支持拼音搜索
:::

::: demo

<template>
  <lay-select v-model="selected">
    <lay-select-option value="1" label="学习" keyword="学习xuexi"></lay-select-option>
    <lay-select-option value="2" label="编码" disabled></lay-select-option>
    <lay-select-option value="3" label="运动"></lay-select-option>
  </lay-select>
</template>

<script>
import { ref } from 'vue'

export default {
  setup() {
    const selected = ref('1');
    return {
      selected
    }
  }
}
</script>

:::

::: title 传入items属性进行选项渲染
:::

::: demo

<template>
  <lay-select v-model="selected" :items="items">
  </lay-select>
</template>

<script>
import { ref } from 'vue'

export default {
  setup() {
    const selected = ref('1');
    const items=ref([
      {label:'选项1',value:1,keyword:'选项xuanxiang1'},
      {label:'选项2',value:2,keyword:'选项xuanxiang2'},
      {label:'选项3',value:3,keyword:'选项xuanxiang3',disabled:true},
    ])
    return {
      selected,items
    }
  }
}
</script>


:::

::: title 传入create属性和接收create事件用于开启创建子项功能
:::

::: demo

<template>
  <lay-select v-model="selected" :items="items" :create="true"  @create="createEvent">
  </lay-select>
  当前元素: {{items.map(o=>o.label).join()}}
</template>

<script>
import { ref } from 'vue'

export default {
  setup() {
    const selected = ref('1');
    const items=ref([
      {label:'选项1',value:'1',keyword:'选项xuanxiang1'},
      {label:'选项2',value:2,keyword:'选项xuanxiang2'},
      {label:'选项3',value:3,keyword:'选项xuanxiang3',disabled:true},
    ]);
    function createEvent(v){
      items.value.push({
        label:v,
        value:items.value.length
      })
    }
    return {
      selected,items,createEvent
    }
  }
}
</script>


:::

::: title 海量数据 
:::

::: demo

<template>
  <lay-select v-model="selected2">
    <lay-select-option v-for="index of 200" :value="index" :label="index"></lay-select-option>
  </lay-select>
</template>

<script>
import { ref } from 'vue'

export default {
  setup() {

    const selected2 = ref('1')

    return {
      selected2
    }
  }
}
</script>

:::

::: title 多选使用
:::

::: demo

<template>
  <lay-button @click="mvalue=[1,5,7]">点击切换(当前值:{{mvalue.join()}})</lay-button>
  <br/>
  <br/>
  <lay-select v-model="mvalue" @change="change" multiple>
    <lay-select-option value="1" label="学习"></lay-select-option>
    <lay-select-option value="2" label="编码" disabled></lay-select-option>
    <lay-select-option value="3" label="运动"></lay-select-option>
    <lay-select-option value="4" label="唱歌"></lay-select-option>
    <lay-select-option value="5" label="跳舞"></lay-select-option>
    <lay-select-option value="6" label="打篮球"></lay-select-option>
    <lay-select-option value="7" label="rap"></lay-select-option>
  </lay-select>
</template>

<script>
import { ref,watch } from 'vue'

export default {
  setup() {
    const mvalue = ref(['1','2']);
    const change = function(val){
      console.log(val, mvalue.value)
    }
    return {
      mvalue,
      change
    }
  }
}
</script>

:::

::: title Select 属性
:::

::: table

| 属性          |         描述          |             类型          |     可选值      |   默认值 |
| ------------ | --------------------- | ------------------------- | -------------- | -------- |
| v-model      | 选中值                | `string`/`number`/`Array`  |        -       |    -    |
| name         | 原生 name 属性        | `string`                   |        -       |    -    |
| placeholder  | 默认空提示语          | `string`                   |        -       | `请选择` |
| disabled     | 是否禁用              | `boolean`                  | `true` `false` | `false` |
| showEmpty    | 是否增加空提示选项     | `boolean`                  | `true` `false` | `true` |
| multiple     | 是否为多选            | `boolean`                  | `true` `false` | `false` |
| create       | 是否允许创建            | `boolean`                  | `true` `false` | `false` |
| size         | 尺寸            | `string`                  | `lg` `md` `sm` `xs`| `md` |


:::

::: title Select 事件
:::

::: table

| 属性    | 描述       |     接收值      |
| ------ | ---------- | --------------- |
| change | 切换事件    | value           |
| search | 关键词变化事件    | 用户输入的关键词 string           |
| create | 允许创建情况下的创建回调事件    | 用户输入的关键词 string           |

:::

::: title Select Option 属性
:::

::: table


::: table

| 属性          |         描述          |             类型          |     可选值      |   默认值 |
| ------------ | --------------------- | ------------------------- | -------------- | -------- |
| label        | 标签值(`必填`)         | `string`                  |        -       |    -    |
| value        | 值                    | `string` / `number`       |        -       |    -    |
| keyword        | 用于匹配关键词的数据，传入文本+拼音可以支持拼音搜索   | `string`        |        -       |    -    |
| disabled     | 是否禁用              | `boolean`                  | `true` `false` | `false` |

:::

::: title Select Option 插槽
:::

::: table

| 属性    |         描述       |     接收值      |
| ------- | ----------------- | --------------- |
| default | 默认(`label`)      |        -       |

:::

::: contributor select
:::

::: previousNext select
:::