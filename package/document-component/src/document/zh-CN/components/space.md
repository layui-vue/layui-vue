::: anchor
:::

::: title 基本介绍
:::

::: describe 控制组件之间的间距。
:::

::: title 基础使用
:::

::: demo 默认横向排列，控制相邻组件的水平间距

<template>
  <lay-space>
    <lay-button v-for="idx of 5" type="normal">按钮 {{idx}}</lay-button>
  </lay-space>
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


::: title 垂直方向
:::

::: demo 通过 `direction="vertical"` 设置垂直方向

<template>
  <lay-space direction="vertical" fill wrap>
    <lay-button v-for="idx of 5" type="normal" :fluid="true">按钮 {{idx}}</lay-button>
  </lay-space>
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


::: title 间距大小
:::

::: demo 通过 `size` 控制组件大小 `xs, sm, md , lg`, 分别对应 `4px, 8px, 16px, 24px` 的间距,默认`md`。`size` 也支持通过数组设置间距 `[row-gap, column-gap]`

<template>
    <lay-radio 
      v-for="sizeKey of sizeKeys" 
      v-model="sizeSelected" 
      name="action" 
      :value="sizeKey"
       @change="changeSize">
      {{sizeKey}}
    </lay-radio>
    <br><br>
  <lay-space :size="spaceSize">
    <lay-button v-for="idx of 5" type="normal">按钮 {{idx}}</lay-button>
  </lay-space>
</template>

<script>
import { ref } from 'vue'

export default {
  setup() {
    const sizeKeys = ["xs","sm","md","lg"];
    const spaceSize = ref();

    const sizeSelected = ref("sm");
    const changeSize = function( key ) {
      spaceSize.value = key;
    }

    return {
        sizeSelected,
        changeSize,
        spaceSize,
    }
  }
}
</script>

:::


::: title 自定义间距大小
:::

::: demo

<template>
  <lay-slider v-model="customSize"></lay-slider>
  <br><br>
  <lay-space :size="customSize">
    <lay-button v-for="idx of 5" type="normal">按钮 {{idx}}</lay-button>
  </lay-space>
</template>

<script>
import { ref } from 'vue'

export default {
  setup() {
    const customSize = ref(8);

    return {
        customSize,
    }
  }
}
</script>

:::


::: title 对齐方式
:::

::: demo

<template>
    <lay-radio 
      v-for="alignKey of alignKeys" 
      v-model="alignSelected" 
      name="action" 
      :value="alignKey"
       @change="changeAlign">
      {{alignKey}}
    </lay-radio>
    <br><br>
  <lay-space :align="spaceAlign" style="backgroundColor: whitesmoke;padding: 10px;">
    <span>Space:</span>
    <lay-button>默认按钮</lay-button>
    <lay-card title="标题">
      内容
    </lay-card>
  </lay-space>
</template>

<script>
import { ref } from 'vue'

export default {
  setup() {
    const alignKeys = ["start", "center","end","baseline"];
    const spaceAlign = ref();

    const alignSelected = ref("center");
    const changeAlign = function( key ) {
      spaceAlign.value = key;
    }

    return {
      alignSelected,
      changeAlign,
      spaceAlign,
    }
  }
}
</script>

:::


::: title 自动换行
:::

::: demo

<template>
  <lay-space wrap :size="[16,24]">
    <lay-button v-for="_ of 20">默认按钮{{_}}</lay-button>
  </lay-space>
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


::: title Space 属性
:::

::: table

| 属性        | 描述     | 类型    | 默认值    | 可选值                             |
| ----------- | -------- | ------ | ------ | ------ |
| align | 对齐方式 | string| `center`| `start` `end` `center` `baseline`|
| direction | 间距方向 | string | `horizontal` | `horizontal` `vertical`|
| fill | 子元素是否填充父容器 | boolean| `false`| -|
| size | 间距大小 | string | md | `lg` `md` `sm` `xs` `number` `string` `[spaceSize,spaceSize]`|
| wrap | 是否自动折行 | boolean| `false`| -|

:::

>`type spaceSize =  "lg" | "md" | "sm" | "xs" | number | string`

> `[row-gap, column-gap], eg: ['xs','md']  ['10px', '15px']  [10, 15]`

:::title Space 插槽
:::

:::table
| 插槽 | 描述 | 参数 |
|------ |----------|-----------|
| default | 默认插槽 | - |
:::


::: contributor space
::: 

::: previousNext space
:::