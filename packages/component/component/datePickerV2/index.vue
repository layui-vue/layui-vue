<script setup lang="ts">
import "./index.less";
import dayjs from "dayjs";
import type {
  DatePickerProps as _DatePickerProps,
  DatePickerType,
  DatePickerEmits,
} from "./interface";

import { useDateCommon } from "./hook/useDateCommon";
import { useDatePicker } from "./hook/useDatePicker";

import InputBlock from "./component/common/InputBlock.vue";
import { computed, useAttrs } from "vue";

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
  yearPage: 15,
  yearStep: 1,
});

// const emits = defineEmits<DatePickerEmits>();
const attrs = useAttrs();
// const { commonBlockProps } = useDateCommon(props, attrs);

const { RenderComponent, renderComponentProps } = useDatePicker(
  props
  // emits
);

const format = computed<string>(() => {
  return props.inputFormat ?? renderComponentProps.value.inputFormat!;
});

defineOptions({
  name: "LayDatePickerV2",
});
</script>

<template>
  <InputBlock v-bind="{ ...props, ...$attrs }" :format="format">
    <template #default="{ initDate, onPick }">
      <RenderComponent
        v-bind="renderComponentProps"
        :modelValue="initDate"
        @pick="onPick"
      />
    </template>
  </InputBlock>
</template>
