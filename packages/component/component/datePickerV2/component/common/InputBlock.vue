<script setup lang="ts">
import dayjs from "dayjs";
import { computed, ref } from "vue";
import type {
  DatePickerModelValueSingleType,
  DatePickerProps,
} from "../../interface";
import LayDropdown from "../../../dropdown/index.vue";
import LayInput from "../../../input/index.vue";
import { normalizeDayjsValue } from "../../util";
import { isArray, isNumber } from "../../../../utils";

const props = withDefaults(defineProps<DatePickerProps>(), {});
const emits = defineEmits(["update:modelValue"]);

const dropdownRef = ref<InstanceType<typeof LayDropdown>>();

const _Placeholder = computed(() => {
  return isArray(props.placeholder) ? props.placeholder : [props.placeholder];
});

const onChange = () => {};
const handleClear = () => {};

const classes = computed(() => {
  return ["layui-date-picker", { "layui-date-range-picker": props.range }];
});

const dateValue = computed(() => {
  if (props.range) {
    const modelValue = isArray(props.modelValue) ? props.modelValue : [];
    return modelValue.map((data) => {
      return normalizeDayjsValue(data, props.format!).format(props.format);
    });
  } else {
    if (!props.modelValue) return "";

    let value = props.modelValue;

    if (
      ["year", "month"].includes(props.type!) &&
      isNumber(props.modelValue) &&
      `${props.modelValue}`.length <= 4
    ) {
      value += "";
    }

    return normalizeDayjsValue(
      value as DatePickerModelValueSingleType,
      props.format!
    ).format(props.format);
  }
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
      :click-to-close="false"
      :contentClass="contentClass"
      :contentStyle="contentStyle"
    >
      <lay-input
        :name="name"
        :readonly="readonly"
        :placeholder="_Placeholder[0]"
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
          :placeholder="_Placeholder[0]"
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
          :placeholder="_Placeholder[1]"
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
