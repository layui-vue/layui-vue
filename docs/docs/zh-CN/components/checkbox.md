

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

<lay-field title="Checkbox attributes" style="margin-top:40px"/>

|          |      |                         |     |
| -------- | ---- | ----------------------- | --- |
| name       | 尺寸 | 超小屏幕 (手机<768px)   | 12  |
| skin       | 尺寸 | 超小屏幕 (手机<768px)   | 12  |
| label       | 尺寸 | 超小屏幕 (手机<768px)   | 12  |

<lay-field title="Checkbox events" style="margin-top:40px"/>

|          |      |                         |     |
| -------- | ---- | ----------------------- | --- |
| change   | 切换事件 | 超小屏幕 (手机<768px)   | 12  |