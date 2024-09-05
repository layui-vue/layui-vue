<script setup lang="ts">
import type {
  DatePickerProps as _DatePickerProps,
  DatePickerType,
  DatePickerEmits,
} from "./interface";

import { useDateCommon } from "./hook/useDateCommon";
import { useDatePicker } from "./hook/useDatePicker";

import CommonBlock from "./component/common/commonBlock.vue";

export type DatePickerProps = _DatePickerProps;

const props = withDefaults(defineProps<DatePickerProps>(), {
  modelValue: "",
  type: "year",
  disabled: false,
  readonly: false,
  allowClear: false,
  simple: false,
  range: false,
  rangeSeparator: "至",
  prefixIcon: "layui-icon-date",
  suffixIcon: "",
  timestamp: false,
  format: "",
  yearPage: 15,
  yearStep: 1,
});

const emits = defineEmits<DatePickerEmits>();

const { commonBlockProps } = useDateCommon(props);
const { _modelValue, RenderComponent, renderComponentProps } = useDatePicker(
  props,
  emits
);

defineOptions({
  name: "LayDatePickerV2",
});
</script>

<template>
  <CommonBlock v-bind="commonBlockProps">
    <RenderComponent v-bind="renderComponentProps" v-model="_modelValue" />
  </CommonBlock>
</template>
