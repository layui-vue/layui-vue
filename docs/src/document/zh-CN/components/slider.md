::: anchor
:::

::: title 基本介绍
:::

::: describe 作为一个拖拽式的交互性组件，滑块往往能给产品带来更好的操作体验。
:::

::: title 横向
:::

::: demo 使用 `lay-slider` 标签, 创建滑块

<template>
  <lay-space direction="vertical" fill wrap size="md">
    <lay-slider v-model="value1"></lay-slider>
    <lay-input-number v-model="value1"></lay-input-number>
    <lay-line>反转</lay-line>
     <lay-switch v-model="reverse"></lay-switch>
    <lay-slider :reverse="reverse"  v-model="value110"></lay-slider>
  </lay-space>
</template>

<script>
import { ref } from 'vue'

export default {
  setup() {
    const value1 = ref(50)
    const value110 = ref([0,100])
    const reverse = ref(true)
    return {
      value1,
      value110,
      reverse
    }
  }
}
</script>

:::

::: title 纵向
:::
::: demo

<template>
  <lay-space  :size="50">
    <lay-slider v-model="value2" vertical ></lay-slider>
    <lay-slider v-model="value298" vertical reverse></lay-slider>
    <lay-slider v-model="value276" vertical disabled></lay-slider>
     <lay-slider v-model="value90" vertical range></lay-slider>
     <lay-slider v-model="value91" vertical range :marks="mark91"></lay-slider>
  </lay-space>
</template>

<script>
import { ref } from 'vue'

export default {
  setup() {

    const value2 = ref(50)
    const value298 = ref(0)
    const  value276 = ref(0)
    const value90 = ref([0,  100])
    const value91 = ref([0,  100])
    const mark91 = ref({
              0: '0°C',
              8: '8°C',
              37: '37°C',
              50: {
                style: {
                  color: '#1989FA'
                },
                label: '50°C'
              },
              100:'100°C'
            })
    return {
        value2,
        value90,
        value91,
        value276,
        mark91,
        value298
    }
  }
}
</script>

:::

::: title 禁用
:::
::: demo

<template>
  <lay-slider v-model="value12"  disabled></lay-slider>
</template>

<script>
import { ref } from 'vue'

export default {
  setup() {

    const value12 = ref(50)

    return {
        value12
    }
  }
}
</script>

:::

::: title toolTip 相关 
:::
::: demo

<template>
<lay-space direction="vertical" fill wrap :size="50">
  <lay-line>主题</lay-line>
  <lay-slider :tooltip-props="tooltipProps1" v-model="value2"></lay-slider>
  <lay-line>始终显示tooltip</lay-line>
   <lay-slider v-model="value10" alwayShowTooltip></lay-slider>
  <lay-line>是否显示tooltip</lay-line>
  <lay-slider :tooltip-props="tooltipProps3" v-model="value11"></lay-slider>
  <lay-line>tooltip方向</lay-line>
  <lay-slider :tooltip-props="tooltipProps4"  v-model="value13"></lay-slider>
</lay-space>
</template>

<script>
import { ref, reactive } from 'vue'

export default {
  setup() {

    const value2 = ref(50)
     const value10 = ref(50)
    const value11 = ref(50)
    const value13 = ref(50)
    const tooltipProps1 = reactive({
      isDark: true
    })
    const tooltipProps3 = reactive({
      disabled: true,
      trigger: 'click'
    })
    const tooltipProps4 = reactive({
      placement: 'bottom'
    })
    return {
        value2,
        value10,
        value11,
        value13,
        tooltipProps1,
        tooltipProps2,
        tooltipProps3,
        tooltipProps4
    }
  }
}
</script>

:::


::: title 格式化弹出提示
:::
::: demo

<template>
  <lay-slider  v-model="value2" :format-tooltip="formatTooltip">
  </lay-slider>
</template>

<script>
import { ref } from 'vue'

export default {
  setup() {
    const value2 = ref(50)
    const formatTooltip = (val) => {
      return val / 100
    }
    return {
      value2,
      formatTooltip
    }
  }
}
</script>

:::

::: title 横向区间
:::

::: demo

<template>
  <lay-slider v-model="value3" range></lay-slider>
</template>

<script>
import { ref } from 'vue'
export default {
  setup() {
    const value3 = ref([30,50])
    return {
      value3
    }
  }
}
</script>

:::

::: title 显示断点
:::

::: demo

<template>
  <lay-slider v-model="value15"  show-dots :step="10"></lay-slider>
</template>

<script>
import { ref } from 'vue'
export default {
  setup() {
    const value15 = ref([0, 50])
    return {
      value15
    }
  }
}
</script>

:::

::: title mark
:::

::: demo

<template>
  <lay-space direction="vertical" fill wrap :size="50">
    <lay-slider v-model="value16" :marks="marks">
      <template #mark="{ label, point }">
        <div v-if="isVNode(label)">
        <component :is="label"></component>
        </div>
        <div v-else>{{label}}</div>
      </template>
    </lay-slider>
    <lay-line>is-follow-mark用法</lay-line>
    <lay-slider :is-follow-mark="false" v-model="value22" :marks="marks">
      <template #mark="{ label, point }">
        <div v-if="isVNode(label)">
        <component :is="label"></component>
        </div>
        <div v-else>{{label}}</div>
      </template>
    </lay-slider>
  </lay-space>
</template>

<script>
import { ref, h, isVNode } from 'vue'
import { FaceSmileIcon } from '@layui/icons-vue';
export default {
  setup() {
    const value16 = ref(0)
    const value22 = ref(0)
    const marks = ref({
          0: '0°C',
          8: '8°C',
          37: '37°C',
          50: {
            style: {
              color: '#1989FA'
            },
            label: '50°C'
          },
          100: h(FaceSmileIcon)
        })
    return {
      value16,
      marks,
      value22
    }
  }
}
</script>

:::



::: title 自定义按钮
:::

::: demo

<template>
  <lay-slider v-model="value17" >
    <template #thumb>
       <lay-icon type="layui-icon-heart-fill" color="#009688"></lay-icon>
    </template>
  </lay-slider>
</template>

<script>
import { ref, h, isVNode } from 'vue'
import { FaceSmileIcon } from '@layui/icons-vue';
export default {
  setup() {
    const value17 = ref(0)
    return {
      value17
    }
  }
}
</script>

:::

::: title 自定义 tooltip content
:::

::: demo

<template>
  <lay-slider v-model="value18" >
    <template #custom="{value}">
      <p>{{value}}</p>
       <lay-icon type="layui-icon-heart-fill" color="#009688"></lay-icon>
    </template>
  </lay-slider>
</template>

<script>
import { ref, h, isVNode } from 'vue'
import { FaceSmileIcon } from '@layui/icons-vue';
export default {
  setup() {
    const value18 = ref(0)
    return {
      value18
    }
  }
}
</script>

:::


::: title rangeValue兼容写法
:::

::: demo

<template>
{{value19}}
  <lay-slider v-model:rangeValue="value19" range>
  </lay-slider>
</template>

<script>
export default {
  setup() {
    const value19 = ref([10, 50])
    return {
      value19
    }
  }
}
</script>

:::



::: title change用法
:::

::: demo

<template>
{{newVal}}
  <lay-slider range   @change="change">
  </lay-slider>
</template>

<script>
import { layer } from "@layui/layui-vue";

export default {
  setup() {
    const newVal = ref([0, 0])
    const change = (val) => {
      newVal.value = val
    }
    return {
      change,
      newVal
    }
  }
}
</script>

:::

::: title Slider 属性
:::

::: table

| 属性           | 描述                                  | 类型              | 可选值 | 默认值                                         | 版本   |
| -------------- | ------------------------------------- | ----------------- | ------ | ---------------------------------------------- | ------ |
| v-model        | 选中值                                | `Number` `Array`  | -      | -                                              |        |
| vertical       | 是否垂直                              | `Boolean`         | -      | `false`                                        |        |
| range          | 是否区间                              | `Boolean`         | -      | `false`                                        |        |
| ~~rangeValue~~ | 区间值                                | `Array`           | -      | -                                              | `当前可用不推荐,下个版本移除该属性` |
| step           | 步长                                  | `Number`          | -      | `1`                                            |        |
| min            | 最小值                                | `Number`          | -      | `1 `                                           |        |
| max            | 最大值                                | `Number`          | -      | `100`                                          |        |
| disabled       | 是否禁用                              | `Boolean`         | -      | `false`                                        |        |
| showDots       | 是否显示断点                          | `Boolean`         | -      | `false`   
| is-follow-mark       | 默认只能拖拽到刻度上, 配合mark使用。     | `Boolean`         | -      | `true`
| reverse       |  反向     | `Boolean`         | -      | `false`                                        |        |
| tooltip-props   | tooltip 相关配置属性 | `Object` | -      | `{isCanHide:true,disabled:false,placement:'top',isDark:false}`  |  `2.17.7`~~isCanHide~~|
| mark           | 刻度                                  | `object`          | -      | `{ label: string、 VNode ,  style: object   }` |
| alwayShowTooltip  `2.17.7`       |   是否一直显示tooltip               | `boolean`          | -      | `false` |  |
| format-tooltip | 格式化提示信息                        | `function(value)` | -      | `undefined`                                    |        |

:::

::: title Slider 插槽
:::

::: table

| 属性   | 描述                 | 默认值                           |      |
| ------ | -------------------- | -------------------------------- | --- |
| mark   | 刻度插槽             | `{label:strinng, point: number}` |     |
| thumb  | 按钮插槽             | -                                |     |
| custom | tooltip content 插槽 | `{ value: number }`              |     |

:::



::: title Slider 事件
:::

::: table

| 属性   | 描述                 | 默认值                           |      |
| ------ | -------------------- | -------------------------------- | --- |
| change   | 当`v-model`不存在时, 通过`change`事件接收数据    | `(val: number number[]) => {}` |     |

:::

::: previousNext slider
:::
