<script setup lang="ts">
import dayjs, { type Dayjs } from "dayjs";
import { computed, nextTick, ref, inject } from "vue";
import {
  DATE_PICKER_CONTEXT,
  type DatePickerModelValueSingleType,
  type DatePickerProps,
} from "../../interface";

import LayDropdown from "../../../dropdown/index.vue";
import LayInput from "../../../input/index.vue";

import { dayjsToString, checkRangeValue } from "../../util";
import { isArray, isNumber, isUndefined } from "../../../../utils";

const props = withDefaults(defineProps<DatePickerProps>(), {});
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
  return ["layui-date-picker", { "layui-date-range-picker": props.range }];
});
const _Placeholder = computed(() => {
  return isArray(props.placeholder) ? props.placeholder : [props.placeholder];
});

const inputValue = computed(() => {
  let _inputValue: string | Array<string>;

  if (props.range) {
    const modelValue = isArray(props.modelValue) ? props.modelValue : [];
    _inputValue = modelValue.map((data) => {
      return dayjsToString(data, props.format!);
    });
  } else {
    let value = props.modelValue;

    if (
      ["year", "month"].includes(props.type!) &&
      isNumber(props.modelValue) &&
      `${props.modelValue}`.length <= 4
    ) {
      value += "";
    }

    _inputValue = dayjsToString(
      value as DatePickerModelValueSingleType,
      props.format!
    );
  }

  if (isArray(currentInputValue.value)) {
    return [
      currentInputValue.value[0] || (_inputValue && _inputValue[0]) || "",
      currentInputValue.value[1] || (_inputValue && _inputValue[1]) || "",
    ];
  } else if (currentInputValue.value !== null) {
    return currentInputValue.value;
  }

  return _inputValue;
});

const currentInputValue = ref<string | Array<string | null> | null>(null);

const handleInput = (value: string) => {
  currentInputValue.value = value;
};

const handleStartInput = (value: string) => {
  if (currentInputValue.value) {
    currentInputValue.value = [value, currentInputValue.value[1]];
  } else {
    currentInputValue.value = [value, null];
  }
};

const handleEndInput = (value: string) => {
  if (currentInputValue.value) {
    currentInputValue.value = [currentInputValue.value[0], value];
  } else {
    currentInputValue.value = [null, value];
  }
};

const handleChange = () => {
  if (currentInputValue.value) {
    const checkDate = dayjs(inputValue.value as string, props.format);

    if (checkDate.isValid()) {
      emits("update:modelValue", formatOutPutValue(checkDate)); //checkDate.format(props.format)
      currentInputValue.value = null;
    }
  } else {
    emits("update:modelValue", "");
    currentInputValue.value = null;
  }
};

const handleStartChange = () => {
  const date = dayjs(
    currentInputValue.value && currentInputValue.value[0],
    props.format
  );

  if (date.isValid()) {
    currentInputValue.value = [
      date.format(props.format),
      inputValue.value?.[1] || null,
    ];

    const modelValue = [
      date,
      dayjs(currentInputValue.value[1] || null, props.format),
    ];

    if (checkRangeValue(modelValue)) {
      emits("update:modelValue", formatOutPutValue(modelValue));
      currentInputValue.value = null;
    }
  }
};

const handleEndChange = () => {
  const date = dayjs(
    currentInputValue.value && currentInputValue.value[1],
    props.format
  );

  if (date.isValid()) {
    currentInputValue.value = [
      inputValue.value?.[0] || null,
      date.format(props.format),
    ];

    const modelValue = [
      dayjs(currentInputValue.value[0] || null, props.format),
      date,
    ];

    if (checkRangeValue(modelValue)) {
      emits("update:modelValue", formatOutPutValue(modelValue));
      currentInputValue.value = null;
    }
  }
};

const handleClear = () => {
  currentInputValue.value = null;
  emits("update:modelValue", props.range ? [] : "");
  emits("clear");
};

const handleBlur = (e: FocusEvent) => {
  isFocus.value = false;
  setTimeout(() => {
    if (!isFocus.value) {
      currentInputValue.value = null;
      emits("blur", e);
    }
  }, 0);
};

const isFocus = ref(false);

const handleFocus = (e: FocusEvent) => {
  isFocus.value = true;
  emits("focus", e);
};

const formatOutPutValue = (dates: Dayjs | Array<Dayjs>) => {
  if (isArray(dates)) {
    const [startDate, endDate] = dates;

    if (startDate && endDate) {
      return [startDate, endDate].map((date: Dayjs) => {
        return date.format(DatePickerContext.format);
      });
    } else return [];
  } else {
    // 兼容 timestamp属性
    if (["date", "datetime"].includes(props.type!) && props.timestamp) {
      const unix =
        props.type === "date"
          ? dates.startOf("day").valueOf()
          : dates.valueOf();

      return Math.floor(unix / 1000) * 1000;
    }

    return dates.format(DatePickerContext.format);
  }
};

function onPick(dates: Dayjs | Array<Dayjs>) {
  const value = formatOutPutValue(dates);

  emits("update:modelValue", value);
  emits("change", value);
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
        :modelValue="inputValue"
        v-if="!range"
        @input="handleInput"
        @change="handleChange"
        @blur="handleBlur"
        @focus="handleFocus"
        :allow-clear="!disabled && allowClear"
        :size="size"
        @clear="handleClear"
      >
      </lay-input>
      <div class="laydate-range-inputs" v-else>
        <lay-input
          :readonly="readonly"
          :name="name"
          :modelValue="inputValue && inputValue[0]"
          :placeholder="_Placeholder[0]"
          :disabled="disabled"
          @input="handleStartInput"
          @change="handleStartChange"
          @blur="handleBlur"
          @focus="handleFocus"
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
          :modelValue="inputValue && inputValue[1]"
          :disabled="disabled"
          @input="handleEndInput"
          @change="handleEndChange"
          @blur="handleBlur"
          @focus="handleFocus"
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
