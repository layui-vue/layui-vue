<script setup lang="ts">
import type { TabItemProps } from "./interface";

import { clsPrefix } from "@layui/component/utils";
import { inject } from "vue";

import { LAY_TAB_CONTEXT } from "../tab/constant";

export type { TabItemProps };

defineOptions({
  name: "LayTabItem",
});

defineProps<TabItemProps>();

const { modelValue } = inject(LAY_TAB_CONTEXT)!;
</script>

<template>
  <div class="layui-tab-item" :class="{ [clsPrefix('show')]: modelValue === id }">
    <slot />
  </div>
</template>
