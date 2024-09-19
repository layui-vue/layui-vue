<script setup lang="ts">
import dayjs, { type Dayjs } from "dayjs";
import { type CommonBlockProps, COMMON_BLOCK_CONTEXT } from "../interface";
import type {
  DatePickerModelValueSingleType,
  DatePickerProps,
} from "../../interface";
import LayDropdown from "../../../dropdown/index.vue";

import { computed, ref, provide, watchEffect } from "vue";
import { isArray } from "../../../../utils";

const props = withDefaults(defineProps<DatePickerProps>(), {});
const emits = defineEmits(["update:modelValue"]);

const dropdownRef = ref<InstanceType<typeof LayDropdown>>();

const initDate = computed<Dayjs | Array<Dayjs>>(() => {
  if (isArray(props.modelValue)) {
    return props.modelValue.map((date: DatePickerModelValueSingleType) => {
      return dayjs(date || new Date());
    });
  } else {
    return dayjs(props.modelValue || new Date());
  }
});

const startPlaceholder = "";
const endPlaceholder = "";

const onChange = () => {};
const handleClear = () => {};

const classes = computed(() => {
  return ["layui-date-picker", { "layui-date-range-picker": props.range }];
});

// function setNowDate() {
//   initDate.value.forEach((date) => {
//     date = dayjs();
//   });
// }
const dateValue = computed(() => {
  let val = props.modelValue;
  if (!props.modelValue && !props.modelValue) val = [dayjs(), dayjs()];

  return props.range
    ? (val as Array<DatePickerModelValueSingleType>).map((data) => {
        return dayjs(data).format(props.format);
      })
    : props.modelValue
    ? dayjs(val as DatePickerModelValueSingleType).format(props.format)
    : "";
});

function onPick(item) {
  console.log(item, "inputBlock");

  emits("update:modelValue", item);
  dropdownRef.value?.hide();
}

provide(COMMON_BLOCK_CONTEXT, {
  // initDate,
  // setNowDate,
});
</script>

<template>
  <div :class="classes" :size="size">
    <lay-dropdown
      ref="dropdownRef"
      :disabled="disabled"
      :autoFitMinWidth="false"
      :contentClass="contentClass"
      :contentStyle="contentStyle"
    >
      <lay-input
        :name="name"
        :readonly="readonly"
        :placeholder="startPlaceholder"
        :prefix-icon="prefixIcon"
        :suffix-icon="suffixIcon"
        :disabled="disabled"
        :modelValue="dateValue"
        v-if="!range"
        @change="onChange"
        @blur="$emit('blur')"
        @focus="$emit('focus')"
        :allow-clear="!disabled && allowClear"
        :size="size"
        @clear="handleClear"
      >
      </lay-input>
      <div class="laydate-range-inputs" v-else>
        <lay-input
          :readonly="readonly"
          :name="name"
          :modelValue="dateValue[0]"
          :placeholder="startPlaceholder"
          :disabled="disabled"
          @change="onChange"
          @blur="$emit('blur')"
          @focus="$emit('focus')"
          class="start-input"
          :size="size"
        >
        </lay-input>
        <span class="range-separator">{{ rangeSeparator }}</span>
        <lay-input
          :readonly="readonly"
          :name="name"
          :allow-clear="!disabled && allowClear"
          :placeholder="endPlaceholder"
          :modelValue="dateValue[1]"
          :disabled="disabled"
          @change="onChange"
          @blur="$emit('blur')"
          @focus="$emit('focus')"
          class="end-input"
          :size="size"
          @clear="handleClear"
        >
        </lay-input>
      </div>
      <template #content>
        <slot :initDate="initDate" :onPick="onPick"></slot>
      </template>
    </lay-dropdown>
  </div>
</template>
