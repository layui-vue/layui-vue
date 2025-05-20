<script setup lang="ts">
import type {
  DatePickerProps as _DatePickerProps,
  DatePickerDefaultSlotParams,
  DatePickerFooterSlotParams,
} from "./interface";

import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat.js";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter.js";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore.js";
import objectSupport from "dayjs/plugin/objectSupport.js";
import { computed, provide, reactive, toRefs } from "vue";
import InputBlock from "./component/common/InputBlock.vue";

import { useDatePicker } from "./hook/useDatePicker";
import { useProps } from "./hook/useProps";
import { DATE_PICKER_CONTEXT } from "./interface";

import "./index.less";

defineOptions({
  name: "LayDatePicker",
});

const props = withDefaults(defineProps<DatePickerProps>(), {
  modelValue: null,
  size: "md",
  type: "date",
  disabled: false,
  readonly: false,
  allowClear: false,
  simple: false,
  range: false,
  rangeSeparator: "至",
  prefixIcon: "layui-icon-date",
  suffixIcon: "",
  timestamp: false,
  defaultValue: null,
  defaultTime: null,
  yearPage: 15,
  // yearStep: 1,
  static: false,
});

const datePickerSlots = defineSlots<{
  default?: (props: DatePickerDefaultSlotParams) => any;
  footer?: (props: DatePickerFooterSlotParams) => any;
}>();

dayjs.extend(customParseFormat);
dayjs.extend(isSameOrBefore);
dayjs.extend(isSameOrAfter);
dayjs.extend(objectSupport);

export type DatePickerProps = _DatePickerProps;

const { size } = useProps(props);
const { RenderComponent, renderComponentProps, datePickerContext }
  = useDatePicker(props);

const format = computed<string>(() => {
  return props.inputFormat ?? renderComponentProps.value.inputFormat!;
});

provide(DATE_PICKER_CONTEXT, reactive({
  ...toRefs(datePickerContext),
  datePickerSlots,
}));
</script>

<template>
  <InputBlock v-bind="{ ...props, ...$attrs }" :format="format" :size="size">
    <template #default="{ onPick }">
      <RenderComponent v-bind="renderComponentProps" @pick="onPick" />
    </template>
  </InputBlock>
</template>
