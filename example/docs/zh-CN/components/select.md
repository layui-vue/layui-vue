::: anchor
:::

::: title 基本介绍
:::

::: describe 用于代替原生的选择器，或者需要一个更优雅的多选器时。支持关键词查询
:::

::: title 基础使用
:::

::: demo

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

::: title 海量数据 
:::

::: demo

<template>
  <lay-select v-model="selected2">
    <lay-select-option value="1" label="学习"></lay-select-option>
    <lay-select-option value="3" label="运动"></lay-select-option>
    <lay-select-option value="1" label="学习"></lay-select-option>
    <lay-select-option value="3" label="运动"></lay-select-option>
    <lay-select-option value="1" label="学习"></lay-select-option>
    <lay-select-option value="3" label="运动"></lay-select-option>
    <lay-select-option value="1" label="学习"></lay-select-option>
    <lay-select-option value="3" label="运动"></lay-select-option>
    <lay-select-option value="1" label="学习"></lay-select-option>
    <lay-select-option value="3" label="运动"></lay-select-option>
    <lay-select-option value="1" label="学习"></lay-select-option>
    <lay-select-option value="3" label="运动"></lay-select-option>
    <lay-select-option value="1" label="学习"></lay-select-option>
    <lay-select-option value="3" label="运动"></lay-select-option>
    <lay-select-option value="1" label="学习"></lay-select-option>
    <lay-select-option value="3" label="运动"></lay-select-option>
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
  <lay-select v-model="mvalue" @change="change" multiple>
    <lay-select-option value="1" label="学习"></lay-select-option>
    <lay-select-option value="2" label="编码" disabled></lay-select-option>
    <lay-select-option value="3" label="运动"></lay-select-option>
    <lay-select-option value="4" label="唱歌"></lay-select-option>
    <lay-select-option value="5" label="跳舞"></lay-select-option>
    <lay-select-option value="6" label="打篮球"></lay-select-option>
    <lay-select-option value="7" label="rap"></lay-select-option>
  </lay-select>
  <lay-button @click="mvalue=[1,5,7]">点击切换(当前值:{{mvalue.join()}})</lay-button>
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


:::

::: title Select 事件
:::

::: table

| 属性    | 描述       |     接收值      |
| ------ | ---------- | --------------- |
| change | 切换事件    | value           |

:::

::: title Select Option 属性
:::

::: table


::: table

| 属性          |         描述          |             类型          |     可选值      |   默认值 |
| ------------ | --------------------- | ------------------------- | -------------- | -------- |
| label        | 标签值(`必填`)         | `string`                  |        -       |    -    |
| value        | 值                    | `string` / `number`       |        -       |    -    |
| disabled     | 是否禁用              | `boolean`                  | `true` `false` | `false` |

:::

::: title Select Option 插槽
:::

::: table

| 属性    |         描述       |     接收值      |
| ------- | ----------------- | --------------- |
| default | 默认(`label`)      |        -       |

:::

 

::: previousNext select
:::