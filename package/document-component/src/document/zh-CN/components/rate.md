::: anchor
:::

::: title 基本介绍
:::

::: describe 在电商和 O2O 平台尤为常见，常用于对商家进行服务满意度评价。
:::

::: title 基础使用
:::

::: demo 使用 `lay-rate` 标签, 创建评分组件

<template>
  <lay-rate v-model="all1"></lay-rate>
</template>

<script>
import { ref, onMounted } from 'vue';

export default {
  setup() {

     const all1 = ref(0)

    onMounted(() => {
      all1.value = 4
    })

    return {
      all1
    }
  }
}
</script>

:::

::: title 显示文字
:::

::: demo

<template>
  <lay-rate v-model="all" :text="true"></lay-rate>
</template>

<script>
import { ref } from 'vue'

export default {
  setup() {

    const all = ref(4)

    return {
      all
    }
  }
}
</script>

:::

::: title 半星效果
:::

::: demo

<template>
    <lay-rate v-model="half1" :half="true" :is-block="true"></lay-rate>
    <lay-rate v-model="half2" :half="true" :text="true" :is-block="true"></lay-rate>
</template>

<script>
import { ref } from 'vue';

export default {
  setup() {

     const half1 = ref(0.5)
     const half2 = ref(0)


    return {
      half1,
      half2
    }
  }
}
</script>

:::

::: title 清除功能
:::

::: demo

<template>
    <lay-rate v-model="clearHalf" :half="true" :is-block="true" allow-clear></lay-rate>
</template>

<script>
import { ref } from 'vue';

export default {
  setup() {
    const clearHalf = ref(0.5)
    return {
      clearHalf
    }
  }
}
</script>

:::

::: title 自定义内容
:::

::: demo

<template>
  <lay-rate v-model="val" :text="true" :is-block="true">
    <template v-slot:default="{value}">{{customText(value)}}</template>
  </lay-rate>
  <lay-rate v-model="val2" :text="true" :is-block="true">
    <template v-slot:default="{value}">{{value}}</template>
  </lay-rate>
</template>

<script>
import { ref } from 'vue';

export default {
  setup() {

    const val = ref(1)
    const val2 = ref(1)
    const arrs = {
        '1': '极差',
        '2': '差',
        '3': '中等',
        '4': '好',
        '5': '极好'
    };
    const customText = function(val){
      return arrs[val];
    }
    return {
      val,
      val2
    }
  }
}
</script>

:::

::: title 指定长度
:::

::: demo

<template>
  <lay-rate v-model="all2" :length="length"></lay-rate>
</template>

<script>
import { ref } from 'vue';

export default {
  setup() {

    const all2 = ref(4);
    const length = ref(10)

    return {
      all2,
      length
    }
  }
}
</script>

:::

::: title 触发事件
:::

::: demo

<template>
  <lay-rate v-model="val" @select="selectRate"></lay-rate>
  <div>F12 打开调试工具 -> console 控制面板进行查看</div>
</template>

<script>
import { ref } from 'vue';

export default {
  setup() {

    const val = ref(0);
    const selectRate = function(value){
      console.log('selectRate - value:', value)
    }

    return {
      val
    }
  }
}
</script>

:::

::: title 只读模式
:::

::: demo

<template>
  <lay-rate v-model="all3" readonly="true"></lay-rate>
</template>

<script>
import { ref } from 'vue';

export default {
  setup() {

    const all3 = ref(4)

    return {
      all3
    }
  }
}
</script>

:::

::: title 定义主题
:::

::: demo

<template>
  <lay-rate v-model="all4" theme="#FF8000"></lay-rate><br>
  <lay-rate v-model="all4" theme="#009688"></lay-rate><br>
  <lay-rate v-model="all4" theme="#1E9FFF"></lay-rate><br>
  <lay-rate v-model="all4" theme="#2F4056"></lay-rate><br>
  <lay-rate v-model="all4" theme="#FE0000"></lay-rate><br>
</template>

<script>
import { ref } from 'vue';

export default {
  setup() {

    const all4 = ref(4)

    return {
      all4
    }
  }
}
</script>

:::

::: title 自定义图标
:::

::: demo

<template>
  <lay-rate v-model="icons" :icons="['layui-icon-heart', 'layui-icon-heart-fill']" theme="#FE0000"></lay-rate><br>
  <lay-rate v-model="halfIcons" :icons="['layui-icon-circle', 'layui-icon-radio', 'layui-icon-circle-dot']" half text></lay-rate><br>
</template>

<script>
import { ref } from 'vue';

export default {
  setup() {

    const icons = ref(4)
    const halfIcons = ref(0.5)


    return {
      icons,
      halfIcons
    }
  }
}
</script>

:::

::: title Rate 属性
:::

::: table

| 属性     | 描述      | 类型 | 默认值 |
| -------- | -------- | ------ | ------ |
| v-model  | 评分值   | `number` | 0     |
| length   | 评分长度 | `number` | 5     |
| readonly | 只读模式 | `boolean` | false     |
| theme    | 主题颜色 | `string` | #ffb800     |
| half     | 设定组件是否可以选择半星 | `boolean` | false     |
| text     | 是否显示评分对应的内容 | `boolean` | false     |
| is-block | 评分是否显示为快元素 | `boolean` | false     |
| allow-clear | 评分是否需要清除功能 | `boolean` | false     |
| clear-icon | 评分清除功能使用的图标`class` | `string` | `layui-icon-close-fill`     |
| icons    | 评分使用图标`class`；`["空心", "实心"]`/`["空心", "半心", "实心"]` | `string[]` | 星型     |

:::

::: title Rate 插槽
:::

::: table

| 属性     | 描述      | 参数 |
| -------- | -------- | ------ |
| --  | 默认插槽，自定义内容时可以使用为    | { value } |

:::

::: title Rate 事件
:::

::: table

| 属性     | 描述      | 回调参数 |
| -------- | -------- | ------ |
| select  | 选中之后触发事件   | (value: number) |
| clear  | 清除之后触发事件   | (value: number) |

:::

::: contributor rate
:::  

::: previousNext rate
:::