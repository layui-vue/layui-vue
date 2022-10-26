::: anchor
:::

::: title 基本介绍
:::

::: describe 在一组可选项中进行多项选择时。
:::

::: title 基础使用
:::

::: demo 使用 `lay-checkbox` 标签, 创建一个复选框

<template>
    <lay-checkbox name="like" skin="primary"  v-model="checked1" value="1" label="复选框案例"></lay-checkbox>
    <lay-checkbox name="like" skin="primary"  v-model="checkedSlot" value="1">
      自定义slot
    </lay-checkbox>
</template>

<script>
import { ref } from 'vue'

export default {
  setup() {

    const checked1 = ref(false)
    const checkedSlot = ref(false)
    return {
      checked1
    }
  }
}
</script>

:::

::: title 默认样式
:::

::: demo

<template>
    <lay-checkbox name="like" value="1" v-model="checked2">普通</lay-checkbox>
</template>

<script>
import { ref } from 'vue'

export default {
  setup() {

    const checked2 = ref(false)

    return {
      checked2
    }
  }
}
</script>

:::

::: title 复选框组
:::

::: demo 方便通过数组生成 checkbox 复选框。

<template>
    <lay-checkbox-group v-model="checkeds" @change="groupChange">
      <lay-checkbox name="like" skin="primary" value="1">写作</lay-checkbox>
      <lay-checkbox name="like" skin="primary" value="2">画画</lay-checkbox>
      <lay-checkbox name="like" skin="primary" value="3">运动</lay-checkbox>
    </lay-checkbox-group>
</template>

<script>
import { ref } from 'vue'

export default {
  setup() {

    const checkeds = ref(['1','2']);
    const groupChange = function(val) {
      console.log("回调:" + JSON.stringify(val))
    }
    
    return {
        checkeds,
        groupChange
    }
  }
}
</script>

:::

::: title 完整案例
:::

::: demo

<template>
    <lay-checkbox name="like" skin="primary" v-model="checked3" value="1">写作</lay-checkbox>
    <lay-checkbox name="like" skin="primary" v-model="checked4" value="2">画画</lay-checkbox>
    <lay-checkbox name="like" skin="primary" v-model="checked5" value="3">运动</lay-checkbox>
</template>

<script>
import { ref } from 'vue'

export default {
  setup() {

    const checked3 = ref(true);
    const checked4 = ref(true);
    const checked5 = ref(true);

    return {
        checked3, checked4, checked5
    }
  }
}
</script>

:::

::: title 禁用状态
:::

::: demo

<template>
    <lay-checkbox name="like" skin="primary" value="1" :disabled="disabled" v-model="checked6">禁用</lay-checkbox>
    <br/><br/>
    <lay-checkbox-group v-model="checkeds" :disabled="disabled">
      <lay-checkbox name="like" skin="primary" value="1">写作</lay-checkbox>
      <lay-checkbox name="like" skin="primary" value="2">画画</lay-checkbox>
      <lay-checkbox name="like" skin="primary" value="3">运动</lay-checkbox>
    </lay-checkbox-group>
</template>

<script>
import { ref } from 'vue'

export default {
  setup() {
    const disabled = ref(true)
    const checked6 = ref(false);
    return {
      disabled,checked6
    }
  }
}
</script>

:::

::: title 事件回调
:::

::: demo

<template>
    <lay-checkbox name="like" skin="primary" value="1" @change="change" v-model="checked7">回调</lay-checkbox>
</template>

<script>
import { ref } from 'vue'

export default {
  setup() {

    const checked7 = ref(true);

    const change = function(isChecked) {
        console.log("是否选中:" + isChecked)
    }

    return {
        change,
        checked7
    }
  }
}
</script>

:::

::: title 半选状态
:::

::: demo 在实现全选效果时，你可能会用到 isIndeterminate 属性。

<template>
    <lay-checkbox name="like" skin="primary" value="1" :isIndeterminate="true" v-model="checked8">半选</lay-checkbox>
</template>

<script>
import { ref } from 'vue'

export default {
  setup() {

    const checked8 = ref(true);

    return {
        checked8
    }
  }
}
</script>

:::

::: title Checkbox 属性
:::

::: table

| 属性                | 描述          | 可选值               |
| ------------------- | ------------- | -------------------- |
| name                | 原始属性 name | --                   |
| skin                | 主题          | --                   |
| label               | 显示内容      | --                  |
| value               | 选中值        | --                   |
| v-model             | 是否选中      | `true` `false`       |
| isIndeterminate     | 半选状态      | `true` `false`       |
| disabled            | 是否禁用      | `true` `false`       |
| size                | 尺寸          | `lg` `md` `sm` `xs`         |


:::

::: title Checkbox 事件
:::

::: table

| 事件   | 描述     | 可选值               |
| ------ | -------- | -------------------- |
| change | 切换事件 | isChecked : 当前状态 |

:::

::: title CheckboxGroup 属性
:::

::: table

| 属性                | 描述          | 可选值               |
| ------------------- | ------------ | ------------------ |
| disabled            | 是否整体禁用      | `true` `false`      |

:::

::: contributor checkbox
:::

::: previousNext checkbox
:::