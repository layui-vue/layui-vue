<script setup lang="ts">
import type { DatePickerRenderProps } from "../../interface";
import LayRender from "@layui/component/component/_components/render";

import { inject } from "vue";
import { DATE_PICKER_CONTEXT } from "../../interface";

defineOptions({
  name: "DatePickerRender",
  inheritAttrs: false,
});

const props = withDefaults(defineProps<DatePickerRenderProps>(), {
  render: "default",
});

const DatePickerContext = inject(DATE_PICKER_CONTEXT)!;
</script>

<template>
  <LayRender v-if="DatePickerContext.datePickerSlots?.[props.render]" :slots="DatePickerContext.datePickerSlots" v-bind="props" />
  <slot v-else />
</template>
