<script setup lang="ts">
import type { TabProps } from "./interface";

import LayRender from "@layui/component/component/_components/render";
import { clsPrefix } from "@layui/component/utils";
import { provide, toRef } from "vue";

import TabHeader from "./components/TabHeader.vue";

import { LAY_TAB_CONTEXT } from "./constant";
import { useTab } from "./hooks/useTab";
import { useTabSlot } from "./hooks/useTabSlot";
import "./index.less";

defineOptions({
  name: "LayTab",
});

const props = withDefaults(defineProps<TabProps>(), {
  tabPosition: "top",
});

const { classTab } = useTab(props);
const { defaultSlot } = useTabSlot();

provide(LAY_TAB_CONTEXT, {
  modelValue: toRef(() => props.modelValue),
});
</script>

<template>
  <div :class="classTab">
    <TabHeader :default-slot="defaultSlot" v-bind="props" />

    <div :class="clsPrefix('tab-content')">
      <LayRender :render="() => defaultSlot" />
    </div>
  </div>
</template>
