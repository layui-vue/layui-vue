<script setup lang="ts">
import type { Dayjs } from "dayjs";
import type { DatePickerModelValueSingleType, DatePickerProps } from "../../interface";
import dayjs from "dayjs";
import { computed, inject, ref } from "vue";

import { isArray, isNumber } from "../../../../utils";
import LayDropdown from "../../../dropdown/index.vue";

import LayInput from "../../../input/index.vue";
import { DATE_PICKER_CONTEXT } from "../../interface";
import { checkRangeValue, dayjsToString } from "../../util";

const props = defineProps<DatePickerProps>();
const emits = defineEmits([
  "update:modelValue",
  "change",
  "focus",
  "blur",
  "clear",
]);

const DatePickerContext = inject(DATE_PICKER_CONTEXT)!;

const dropdownRef = ref<InstanceType<typeof LayDropdown>>();

const classes = computed(() => {
  return [
    "layui-date-picker",
    {
      "layui-date-range-picker": props.range,
      "layui-date-picker-static": props.static,
    },
  ];
});
const _Placeholder = computed(() => {
  return isArray(props.placeholder)
    ? props.placeholder
    : [props.placeholder, props.placeholder];
});

const currentInputValue = ref<string | Array<string | null> | null>(null);

const inputValue = computed(() => {
  let _inputValue: string | Array<string>;

  if (props.range) {
    const modelValue = isArray(props.modelValue) ? props.modelValue : [];
    _inputValue = modelValue.map((data) => {
      return dayjsToString(data, props.format!);
    });
  }
  else {
    let value = props.modelValue;

    if (
      ["year", "month"].includes(props.type!)
      && isNumber(props.modelValue)
      && `${props.modelValue}`.length <= 4
    ) {
      value += "";
    }

    _inputValue = dayjsToString(
      value as DatePickerModelValueSingleType,
      props.format!,
    );
  }

  if (isArray(currentInputValue.value)) {
    return [
      currentInputValue.value[0] || (_inputValue && _inputValue[0]) || "",
      currentInputValue.value[1] || (_inputValue && _inputValue[1]) || "",
    ];
  }
  else if (currentInputValue.value !== null) {
    return currentInputValue.value;
  }

  return _inputValue;
});

function handleInput(value: string) {
  currentInputValue.value = value;
}

function handleStartInput(value: string) {
  if (currentInputValue.value) {
    currentInputValue.value = [value, currentInputValue.value[1]];
  }
  else {
    currentInputValue.value = [value, null];
  }
}

function handleEndInput(value: string) {
  if (currentInputValue.value) {
    currentInputValue.value = [currentInputValue.value[0], value];
  }
  else {
    currentInputValue.value = [null, value];
  }
}

function checkIsDisabled(date: Dayjs) {
  if (props.disabledDate) {
    return props.disabledDate(date.toDate());
  }

  if (props.min && date.isBefore(DatePickerContext.min)) {
    return true;
  }

  if (props.max && date.isAfter(DatePickerContext.max)) {
    return true;
  }
  return false;
}

function handleChange() {
  if (currentInputValue.value) {
    const checkDate = dayjs(inputValue.value as string, props.format);

    if (checkDate.isValid() && !checkIsDisabled(checkDate)) {
      emits("update:modelValue", formatOutPutValue(checkDate)); // checkDate.format(props.format)
      currentInputValue.value = null;
    }
  }
  else {
    emits("update:modelValue", "");
    currentInputValue.value = null;
  }
}

function handleStartChange() {
  const date = dayjs(
    currentInputValue.value && currentInputValue.value[0],
    props.format,
  );

  if (
    date.isValid()
    && (inputValue.value?.[1] ? date.isBefore(inputValue.value?.[1]) : true)
  ) {
    currentInputValue.value = [
      date.format(props.format),
      inputValue.value?.[1] || null,
    ];

    const modelValue = [
      date,
      dayjs(currentInputValue.value[1] || null, props.format),
    ];

    if (
      checkRangeValue(modelValue)
      && modelValue.every(date => !checkIsDisabled(date))
    ) {
      emits("update:modelValue", formatOutPutValue(modelValue));
      currentInputValue.value = null;
    }
  }
}

function handleEndChange() {
  const date = dayjs(
    currentInputValue.value && currentInputValue.value[1],
    props.format,
  );

  if (
    date.isValid()
    && (inputValue.value?.[0] ? date.isAfter(inputValue.value?.[0]) : true)
  ) {
    currentInputValue.value = [
      inputValue.value?.[0] || null,
      date.format(props.format),
    ];

    const modelValue = [
      dayjs(currentInputValue.value[0] || null, props.format),
      date,
    ];

    if (
      checkRangeValue(modelValue)
      && modelValue.every(date => !checkIsDisabled(date))
    ) {
      emits("update:modelValue", formatOutPutValue(modelValue));
      currentInputValue.value = null;
    }
  }
}

function handleClear() {
  currentInputValue.value = null;
  emits("update:modelValue", props.range ? [] : "");
  emits("clear");
}

const isFocus = ref(false);

function handleBlur(e: FocusEvent) {
  isFocus.value = false;
  setTimeout(() => {
    if (!isFocus.value) {
      currentInputValue.value = null;
      emits("blur", e);
    }
  }, 0);
}

function handleFocus(e: FocusEvent) {
  isFocus.value = true;
  emits("focus", e);
}

function formatOutPutValue(dates: Dayjs | Array<Dayjs>) {
  if (isArray(dates)) {
    const [startDate, endDate] = dates;

    if (startDate && endDate) {
      return [startDate, endDate].map((date: Dayjs) => {
        return date.format(DatePickerContext.format);
      });
    }
    else {
      return [];
    }
  }
  else {
    // 兼容 timestamp属性
    if (["date", "datetime"].includes(props.type!) && props.timestamp) {
      const unix
        = props.type === "date"
          ? dates.startOf("day").valueOf()
          : dates.valueOf();

      return Math.floor(unix / 1000) * 1000;
    }

    return dates.format(DatePickerContext.format);
  }
}

function onPick(dates: Dayjs | Array<Dayjs>) {
  const value = formatOutPutValue(dates);

  emits("update:modelValue", value);
  emits("change", value);
  dropdownRef.value?.hide();
}
</script>

<template>
  <div :class="classes" :size="size">
    <LayDropdown
      v-if="!static"
      ref="dropdownRef"
      :disabled="disabled"
      :auto-fit-min-width="false"
      :click-to-close="false"
      :content-class="contentClass"
      :content-style="contentStyle"
      :teleport-props="teleportProps"
    >
      <LayInput
        v-if="!range"
        :name="name"
        :readonly="readonly"
        :placeholder="_Placeholder[0]"
        :prefix-icon="prefixIcon"
        :suffix-icon="suffixIcon"
        :disabled="disabled"
        :model-value="inputValue"
        :allow-clear="!disabled && allowClear"
        :size="size"
        @input="handleInput"
        @change="handleChange"
        @blur="handleBlur"
        @focus="handleFocus"
        @clear="handleClear"
      />
      <div v-else class="laydate-range-inputs">
        <LayInput
          :readonly="readonly"
          :name="name"
          :model-value="inputValue && inputValue[0]"
          :placeholder="_Placeholder[0]"
          :disabled="disabled"
          class="start-input"
          :size="size"
          @input="handleStartInput"
          @change="handleStartChange"
          @blur="handleBlur"
          @focus="handleFocus"
        />
        <span class="range-separator">{{ rangeSeparator }}</span>
        <LayInput
          :readonly="readonly"
          :name="name"
          :allow-clear="!disabled && allowClear"
          :placeholder="_Placeholder[1]"
          :model-value="inputValue && inputValue[1]"
          :disabled="disabled"
          class="end-input"
          :size="size"
          @input="handleEndInput"
          @change="handleEndChange"
          @blur="handleBlur"
          @focus="handleFocus"
          @clear="handleClear"
        />
      </div>
      <template #content>
        <slot :on-pick="onPick" />
      </template>
    </LayDropdown>

    <slot v-else :on-pick="onPick" />
  </div>
</template>
