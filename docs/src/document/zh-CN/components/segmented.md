::: anchor
:::

::: title Segmented 分段器
:::

::: describe 分段器用于在多个选项中进行选择，是列表项的抽象表达。
:::

::: demo 基础使用

<template>
  <div style="gap: 8px; display: flex; flex-direction: column">
    <lay-segmented :items="items" v-model="s1"></lay-segmented>
    <lay-segmented :items="items" v-model="s2"></lay-segmented>
    <lay-segmented :items="items" v-model="s3"></lay-segmented>
    <lay-segmented :items="items" v-model="s4"></lay-segmented>
  </div>
</template>

<script setup lang="ts">
import { provide, ref, watch } from "vue";

const items = ref([
  {
    label: "1AAAA",
  },
  {
    label: "2BBBBB",
  },
  {
    label: "3CCCCCCCC",
  },
  {
    label: "4DD",
  },
]);

const s1 = ref("1AAAA");
const s2 = ref("2BBBBB");
const s3 = ref("3CCCCCCCC");
const s4 = ref("4DD");

watch(
  () => [s1.value, s2.value, s3.value, s4.value],
  (newVal, oldVal) => {
    console.log(newVal, oldVal);
  }
);
</script>

:::

::: title Property 属性
:::

::: table

| 属性 | 类型 | 默认值 | 说明 |
| ---- | ---- | ------ | ---- |
| v-model | string | - | 绑定值 |
| items | Array | - | 分段器选项 |

:::