

::: demo

<template>
  <lay-form>
    <lay-checkbox name="like" skin="primary"  v-model:checked="checked1" label="1" >普通</lay-checkbox>
 </lay-form>
</template>

<script>
import { ref } from 'vue'

export default {
  setup() {

    const checked1 = ref(false)

    return {
      checked1
    }
  }
}
</script>

:::



::: demo

<template>
  <lay-form>
    <lay-checkbox name="like" label="1" v-model:checked="checked2" >普通</lay-checkbox>
 </lay-form>
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

::: demo

<template>
  <lay-form>
    <lay-checkbox name="like" skin="primary" v-model:checked="checked3" label="1">写作</lay-checkbox>
    <lay-checkbox name="like" skin="primary" v-model:checked="checked4" label="2">画画</lay-checkbox>
    <lay-checkbox name="like" skin="primary" v-model:checked="checked5" label="3">运动</lay-checkbox>
  </lay-form>
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

::: demo

<template>
  <lay-form>
    <lay-checkbox name="like" skin="primary" label="1" :disabled="disabled" v-model:checked="checked6">禁用</lay-checkbox>
 </lay-form>
</template>

<script>
import { ref } from 'vue'

export default {
  setup() {

    const disabled = ref(true)

    const checked6 = ref(true);

    return {
      disabled,checked6
    }
  }
}
</script>

:::

::: demo

<template>
  <lay-form>
    <lay-checkbox name="like" skin="primary" label="1" @change="change" v-model:checked="checked7">回调</lay-checkbox>
 </lay-form>
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


| Name   | Description | Accepted Values  |
| -------- | ---- | ----------------------- | 
| name       | 原始属性 name | --  | 
| skin       | 主题 | --  |
| label      | 选中值 | --   | 
| checked ( v-model )    | 是否选中 | `true` `false`   | 
| change   | 切换事件 | isChecked : 当前状态  | 