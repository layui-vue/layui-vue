::: anchor
:::

::: title 基本介绍
:::

::: describe 时光飞逝。
:::

::: title 基础使用
:::

::: demo 使用 `lay-calendar` 标签, 创建日历

<template>
<div class="card-container">
  <lay-calendar  @click="handleClick">
  </lay-calendar>
</div>
</template>

<script>
import { ref } from 'vue'
import { layer } from "@layui/layer-vue"
export default {
  setup() {
    const date = new Date('2022-12-01')
    const handleClick = (val) => {
      layer.msg(val)
    }
    return {
      handleClick,
      date
    }
  }
}
</script>
:

::: title 卡片
:::

::: demo 通过`fullscreen`属性进行自定义配置

<template>
  <lay-calendar 
  :style="{ width: '300px', border: '1px solid #d9d9d9', borderRadius: '4px' }"
   :fullscreen="false" @click="handleClick" v-model="date">
    <template #cell="{ data }">
      <span style="">{{ data.text.split('-').slice(2).join('-') }}</span>
    </template>
  </lay-calendar>
</template>

<script>
import { ref } from 'vue'
import { layer } from "@layui/layer-vue"

export default {
  setup() {
    const date = new Date('2022-12-01')
    const handleClick = (val) => {
      layer.msg(val)
    }
    return {
      handleClick,
      date
    }
  }
}
</script>

<style>
</style>

:::

::: title 不可选择的日期
:::

::: demo 通过`disabledDate`进行不可选择的日期

<template>
  <lay-calendar 
  :disabledDate="handleDis"
    @click="handleClick">
    <template #cell="{ data }">
      <span style="">{{ data.text.split('-').slice(2).join('-') }}</span>
    </template>
  </lay-calendar>
</template>

<script>
import { ref } from 'vue'
import { layer } from "@layui/layer-vue"

export default {
  setup() {
    const handleClick = (val) => {
      layer.msg(val)
    }
    const handleDis = (date) => {
      return date === dayjs().subtract(2, 'days').format('YYYY-MM-DD')
      // return true
    }
    return {
      handleClick,
      handleDis
    }
  }
}
</script>

<style>
</style>

:::

::: title 自定义头部
:::

::: demo 通过 header 插槽自定义 header.

<template>
<div class="card-container">
  <lay-calendar  @click="handleClick">
    <template #header="{ date }">
    <span>当前日期</span>
    <span>{{ date }}</span>
    <lay-button-group>
            <lay-button size="sm" >
              <lay-icon type="layui-icon-left"></lay-icon>
            </lay-button>
            <lay-button size="sm" type="default" 
              >今天</lay-button
            >
            <lay-button size="sm">
              <lay-icon type="layui-icon-right"></lay-icon>
            </lay-button>
          </lay-button-group>
    </template>
  </lay-calendar>
</div>
</template>

<script>
import { ref } from 'vue'
import { layer } from "@layui/layer-vue"
import dayjs from 'dayjs'
export default {
  setup() {
    const date = new Date('2022-12-01')
    const handleClick = (val) => {
      layer.msg(val)
    }
    return {
      handleClick,
      date
    }
  }
}
</script>

:::

::: title 卡片插槽
:::

::: demo 通过插槽`cell`自定义日期单元格

<template>
  <lay-calendar   @click="handleClick" v-model="date">
    <template #cell="{ data }">
        <div style="display: flex; justify-content: space-between; padding-bottom: 10px;">
         <span style="">{{ data.text.split('-').slice(2).join('-') }}</span>
  <lay-icon :type="data.isSelected ? 'layui-icon-ok' : ''"></lay-icon>
  </div>
   <span>{{data.text}}</span>
      </template>
  </lay-calendar>
</template>

<script>
import { ref } from 'vue'
import { layer } from "@layui/layer-vue"

export default {
  setup() {
    const date = new Date('2022-12-01').getTime()
    const handleClick = (val) => {
      layer.msg(val)
    }
    return {
      handleClick,
      date
    }
  }
}
</script>

:::
::: title Calendar 属性
:::

::: table

| 名称   | 描述 | 类型     | 默认值   | 可选值                   |
| ------ | ---- | -------- | -------- | ------------------------ |
| v-model  | 默认日期 | `date` `string` `number` | --       | --                       |
| disabledDate | 不可选择的日期 | `function` | (currentDate: Date) => boolean | -- |

:::

::: title Calendar 插槽
:::

::: table

| 名称    | 描述     |
| ------- | -------- |
| header  | 头部插槽 |
| dataCell    | 内容插槽 |

:::

::: previousNext Calendar
:::
