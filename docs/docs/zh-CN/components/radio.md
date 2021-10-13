::: demo

<template>
  <lay-form>
    <lay-radio v-model="selected1" name="action" label="1">写作</lay-radio>
    <lay-radio v-model="selected1" name="action" label="2">画画</lay-radio>
    <lay-radio v-model="selected1" name="action" label="3">运动</lay-radio>
  </lay-form>
</template>

<script>
import { ref } from 'vue'

export default {
  setup() {

    const selected1 = ref("1");

    return {
        selected
    }
  }
}
</script>

:::

::: demo

<template>
  <lay-form>
    <lay-radio v-model="selected2" name="action" label="1">写作</lay-radio>
    <lay-radio v-model="selected2" name="action" label="2">画画</lay-radio>
    <lay-radio v-model="selected2" name="action" label="3">运动</lay-radio>
    <lay-radio v-model="selected2" name="action" label="4" :disabled="disabled">禁用</lay-radio>
  </lay-form>
</template>

<script>
import { ref } from 'vue'

export default {
  setup() {

    const disabled = ref(true);
    const selected2 = ref("1");

    return {
        disabled,
        selected2
    }
  }
}
</script>

:::

::: demo

<template>
  <lay-form>
    <lay-radio v-model="selected3" name="action" label="1" @change="change">写作</lay-radio>
    <lay-radio v-model="selected3" name="action" label="2" @change="change">画画</lay-radio>
    <lay-radio v-model="selected3" name="action" label="3" @change="change">运动</lay-radio>
  </lay-form>
</template>

<script>
import { ref } from 'vue'

export default {
  setup() {

    const selected3 = ref("1");
    const change = function( current ) {
        console.log("当前值:" + current)
    }
    return {
        selected3,
        change
    }
  }
}
</script>

:::