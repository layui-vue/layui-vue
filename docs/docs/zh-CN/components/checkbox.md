

::: demo

<template>
  <lay-form>
    <lay-checkbox name="like" skin="primary" label="1">普通</lay-checkbox>
 </lay-form>
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



::: demo

<template>
  <lay-form>
    <lay-checkbox name="like" label="1">普通</lay-checkbox>
 </lay-form>
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

::: demo

<template>
  <lay-form>
    <lay-checkbox name="like" skin="primary" v-model:checked="checked1" label="1">写作</lay-checkbox>
    <lay-checkbox name="like" skin="primary" v-model:checked="checked2" label="2">画画</lay-checkbox>
    <lay-checkbox name="like" skin="primary" v-model:checked="checked3" label="3">运动</lay-checkbox>
  </lay-form>
</template>

<script>
import { ref } from 'vue'

export default {
  setup() {

    const checked1 = ref(true);
    const checked2 = ref(true);
    const checked3 = ref(true);

    return {
        checked1, checked2, checked3
    }
  }
}
</script>

:::

::: demo

<template>
  <lay-form>
    <lay-checkbox name="like" skin="primary" label="1" :disabled="disabled">禁用</lay-checkbox>
 </lay-form>
</template>

<script>
import { ref } from 'vue'

export default {
  setup() {

    const disabled = ref(true)

    return {
      disabled
    }
  }
}
</script>

:::

::: demo

<template>
  <lay-form>
    <lay-checkbox name="like" skin="primary" label="1" @change="change">回调</lay-checkbox>
 </lay-form>
</template>

<script>
import { ref } from 'vue'

export default {
  setup() {

    const change = function(isChecked) {
        console.log("是否选中:" + isChecked)
    }

    return {
        change
    }
  }
}
</script>

:::


| Name   | Description | Accepted Values  |
| -------- | ---- | ----------------------- | 
| name       | 原始属性 name | --  | 
| skin       | 主题 | --  |
| label      | 选中值 | --   | 
| checked ( v-model )    | 是否选中 | `true` `false`   | 
| change   | 切换事件 | isChecked : 当前状态  | 