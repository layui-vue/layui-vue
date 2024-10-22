<script setup lang="ts">
import "./index.less";
import dayjs from "dayjs";
import { computed, provide } from "vue";
import customParseFormat from "dayjs/plugin/customParseFormat";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
import objectSupport from "dayjs/plugin/objectSupport";
import {
  DATE_PICKER_CONTEXT,
  type DatePickerProps as _DatePickerProps,
  type DatePickerType,
} from "./interface";

import { useProps } from "./hook/useProps";
import { useDatePicker } from "./hook/useDatePicker";

import InputBlock from "./component/common/InputBlock.vue";

dayjs.extend(customParseFormat);
dayjs.extend(isSameOrBefore);
dayjs.extend(isSameOrAfter);
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
  // static: false,
});

const { size } = useProps(props);
const { RenderComponent, renderComponentProps, datePickerContext } =
  useDatePicker(props);

const format = computed<string>(() => {
  return props.inputFormat ?? renderComponentProps.value.inputFormat!;
});

provide(DATE_PICKER_CONTEXT, datePickerContext);

defineOptions({
  name: "LayDatePicker",
});
</script>

<template>
  <InputBlock v-bind="{ ...props, ...$attrs }" :format="format" :size="size">
    <template #default="{ onPick }">
      <RenderComponent v-bind="renderComponentProps" @pick="onPick">
        <template #footer>
          <slot name="footer" v-bind="{ props }"></slot>
        </template>
      </RenderComponent>
    </template>
  </InputBlock>
</template>
