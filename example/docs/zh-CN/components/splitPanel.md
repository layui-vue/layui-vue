::: anchor
:::

::: title 基础使用
:::


::: demo

<template>
<div>
    <lay-split-panel style="height: 300px">
        <lay-split-panel-item>1</lay-split-panel-item>
        <lay-split-panel-item>2</lay-split-panel-item>
    </lay-split-panel>
</div>
</template>

<script>
import { ref } from 'vue';

export default {
  setup() {
    const loading = ref(true);
    const active = ref(-1);
    const nexts = () => {
      if (active.value++ >=3) active.value = 0
    };
    const previous = () => {
      if (active.value-- ===0) active.value = 0
    };
    return {
        loading,
        active
    }
  }
}
</script>

:::