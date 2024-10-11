<script setup lang="ts">
import "./index.less";
import dayjs from "dayjs";
import { computed, provide } from "vue";
import customParseFormat from "dayjs/plugin/customParseFormat";
import IsSameOrBefore from "dayjs/plugin/IsSameOrBefore";
import IsSameOrAfter from "dayjs/plugin/IsSameOrAfter";
import objectSupport from "dayjs/plugin/objectSupport";
import {
  DATE_PICKER_CONTEXT,
  type DatePickerProps as _DatePickerProps,
  type DatePickerType,
} from "./interface";

import { useDatePicker } from "./hook/useDatePicker";

import InputBlock from "./component/common/InputBlock.vue";

dayjs.extend(customParseFormat);
dayjs.extend(IsSameOrBefore);
dayjs.extend(IsSameOrAfter);
dayjs.extend(objectSupport);

export type DatePickerProps = _DatePickerProps;

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
});

const { RenderComponent, renderComponentProps } = useDatePicker(props);

const format = computed<string>(() => {
  return props.inputFormat ?? renderComponentProps.value.inputFormat!;
});

provide(DATE_PICKER_CONTEXT, renderComponentProps.value);

defineOptions({
  name: "LayDatePickerV2",
});
</script>

<template>
  <InputBlock v-bind="{ ...props, ...$attrs }" :format="format">
    <template #default="{ onPick }">
      <RenderComponent v-bind="renderComponentProps" @pick="onPick" />
    </template>
  </InputBlock>
</template>
