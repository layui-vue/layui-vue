<script setup lang="ts">
import type { TabEmits, TabProps } from "./interface";

import LayRender from "@layui/component/component/_components/render";
import { clsPrefix } from "@layui/component/utils";
import { provide, toRef } from "vue";
import TabHeader from "./components/TabHeader.vue";
import { LAY_TAB_CONTEXT } from "./constant";
import { useTab } from "./hooks/useTab";

import { useTabSlot } from "./hooks/useTabSlot";
import "./index.less";

export type { TabProps };

defineOptions({
  name: "LayTab",
});

const props = withDefaults(defineProps<TabProps>(), {
  type: "default",
  tabPosition: "top",
});

const emits = defineEmits<TabEmits>();

const { classTab } = useTab(props);
const { defaultSlot } = useTabSlot();

provide(LAY_TAB_CONTEXT, {
  emits,

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
