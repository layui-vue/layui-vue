<script setup lang="ts">
import dayjs from "dayjs";
import type {
  DatePickerModelValueSingleType,
  DatePickerProps,
} from "../../interface";
import LayDropdown from "../../../dropdown/index.vue";
import LayInput from "../../../input/index.vue";

import { computed, ref } from "vue";

const props = withDefaults(defineProps<DatePickerProps>(), {});
const emits = defineEmits(["update:modelValue"]);

const dropdownRef = ref<InstanceType<typeof LayDropdown>>();

const startPlaceholder = "";
const endPlaceholder = "";

const onChange = () => {};
const handleClear = () => {};

const classes = computed(() => {
  return ["layui-date-picker", { "layui-date-range-picker": props.range }];
});

const dateValue = computed(() => {
  return props.range
    ? (props.modelValue as Array<DatePickerModelValueSingleType>).map(
        (data) => {
          return dayjs(data).format(props.format);
        }
      )
    : props.modelValue
    ? dayjs(props.modelValue as DatePickerModelValueSingleType).format(
        props.format
      )
    : "";
});

function onPick(item: string | Date) {
  emits("update:modelValue", item);
  dropdownRef.value?.hide();
}
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
        <slot :onPick="onPick"></slot>
      </template>
    </lay-dropdown>
  </div>
</template>
