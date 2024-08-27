::: anchor
:::

::: title Segmented 分段器
:::

::: describe 分段器用于在多个选项中进行选择，是列表项的抽象表达。
:::

::: demo 基础使用

<template>
  <div style="gap: 8px; display: flex; flex-direction: column">
    <lay-segmented :options="items" v-model="s1"></lay-segmented>
    <lay-segmented :options="items" v-model="s2"></lay-segmented>
    <lay-segmented :options="items" v-model="s3"></lay-segmented>
    <lay-segmented :options="items" v-model="s4"></lay-segmented>
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

::: describe 可以使用 slot 进行自定义渲染
:::

::: demo

<template>
  <div>
    <lay-segmented name="segmented" :options="options3">
      <template #hello="{ label, icon }">
        <lay-icon :type="icon"></lay-icon>
        <span>{{ label }}</span>
      </template>
      <template #default="{ label }">
        <span>默认插槽渲染{{ label }}</span>
      </template>
    </lay-segmented>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const options3 = ref(["A", "B", {
  label: "C",
  slot: "hello",
  icon: "layui-icon-heart-fill"
}]);
</script>

:::

::: describe 可以使用 `size` 属性来设置分段器的大小
:::

::: demo

<template>
  <div style="gap: 8px; display: flex; flex-direction: column">
    <lay-segmented :options="items2" v-model="s1" size="lg"></lay-segmented>
    <lay-segmented :options="items2" v-model="s2" size="default"></lay-segmented>
    <lay-segmented :options="items2" v-model="s3" size="sm"></lay-segmented>
  </div>
</template>

<script setup lang="ts">
import { provide, ref, watch } from "vue";

const items2 = ref([
  {
    label: "1AAAA",
  },
  {
    label: "2BBBBB",
  },
  {
    label: "3CCCCCCCC",
  },
]);

const s1 = ref("1AAAA");
const s2 = ref("2BBBBB");
const s3 = ref("3CCCCCCCC");

watch(
  () => [s1.value, s2.value, s3.value],
  (newVal, oldVal) => {
    console.log(newVal, oldVal);
  }
);
</script>

:::

::: describe 可以使用 `disabled` 属性来禁用分段器
:::

::: demo

<template>
  <div style="gap: 8px; display: flex; flex-direction: column">
    <lay-segmented :options="items3" v-model="s1" disabled></lay-segmented>
    <lay-segmented :options="items3" v-model="s2"></lay-segmented>
  </div>
</template>

<script setup lang="ts">
import { provide, ref, watch } from "vue";

const items3 = ref([
  {
    label: "1AAAA",
  },
  {
    label: "2BBBBB",
  },
  {
    label: "3CCCCCCCC",
  },
]);

const s1 = ref("1AAAA");
const s2 = ref("2BBBBB");

watch(
  () => [s1.value, s2.value],
  (newVal, oldVal) => {
    console.log(newVal, oldVal);
  }
);
</script>

:::

::: title Property 属性
:::

::: table

| 属性       | 类型                                     | 默认值  | 可选值              | 说明         |
| ---------- | ---------------------------------------- | ------- | ------------------- | ------------ |
| _v-model_  | `string`                                 | -       | -                   | 绑定值       |
| _options_  | `Array<string \| LaySegementedItemType>` | -       | -                   | 分段器选项   |
| _name_     | `string`                                 | -       | -                   | 分段器表单名 |
| _size_     | `string`                                 | -       | `lg` `default` `sm` | 尺寸         |
| _disabled_ | `boolean`                                | `false` | -                   | 是否禁用     |

:::

::: title Types
:::

```ts
export type LaySegementedItemType = {
  label: string;
  slot?: string;
  [key: string]: any;
};

export interface LaySegmentedProps {
  options: LaySegementedItemType[] | string[];
  modelValue: string;
  size?: "lg" | "default" | "sm" | "xs";
  name?: string;
  disabled?: boolean;
}
```
