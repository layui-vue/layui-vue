<script setup lang="ts">
import type { UniquePickerProps } from "./interface";
import type {
  DatePickerModelValueSingleType,
  Shortcuts as ShortcutsType,
} from "../interface";
import { computed, ref, watch } from "vue";
import dayjs, { type Dayjs } from "dayjs";

import { isFunction } from "../../../utils";

import { useBaseDatePicker } from "../hook/useBaseDatePicker";

import LayButton from "../../button/index.vue";
import Date from "./common/Date.vue";
import Time from "./common/Time.vue";
import Year from "./common/Year.vue";
import Month from "./common/Month.vue";
import Footer from "./common/Footer.vue";
import Shortcuts from "./common/Shortcuts.vue";

const props = withDefaults(defineProps<UniquePickerProps>(), {});

const emits = defineEmits(["pick"]);

const currentData = ref<UniquePickerProps["modelValue"]>();
const showDate = ref<Dayjs>(dayjs());
const currentType = ref();

const { getDefaultValue } = useBaseDatePicker(props);

watch(
  () => props.modelValue,
  () => {
    currentData.value = props.modelValue;
    showDate.value = props.modelValue || getDefaultValue();
  },
  { immediate: true }
);

const dateType = computed(() => {
  return props.type!;
});

// 非一次性选择 || datetime|time 类型
const showConfirm = computed(() => {
  return !props.simple || ["datetime", "time"].includes(dateType.value);
});

watch(
  () => dateType.value,
  (val) => {
    if (val === "datetime") {
      currentType.value = "date";
      return;
    }
    if (val === "yearmonth") {
      currentType.value = "month";
      return;
    }
    currentType.value = val;
  },
  { immediate: true }
);

const handlePickDate = (value: Dayjs) => {
  currentData.value = value;
  handleConfirm();
};

const handlePickTime = (value: Dayjs) => {
  currentData.value = value;
  handleConfirm();
};

const handlePickYear = (year: number) => {
  const data = showDate.value.year(year);

  if (["datetime", "date"].includes(dateType.value)) {
    showDate.value = data;
    currentType.value = "date";
  } else if (dateType.value === "yearmonth") {
    showDate.value = data;
    currentType.value = "month";
  } else {
    currentData.value = data;
    handleConfirm();
  }
};

const handlePickMonth = (month: number) => {
  const data = showDate.value.month(month);

  if (["datetime", "date"].includes(dateType.value)) {
    showDate.value = data;
    currentType.value = "date";
  } else {
    currentData.value = data;
    showDate.value = data;
    handleConfirm();
  }
};

const handleMonthChangeYear = (year: number) => {
  showDate.value = showDate.value.year(year);
};

const handleDateChangeYearMonth = (data: Dayjs) => {
  showDate.value = data;
};

const handleToggleTimePanel = () => {
  currentType.value = currentType.value === "date" ? "time" : "date";
};

const preCondition = () => {
  // datetime类型点击确定还原当前panel为date
  if (dateType.value === "datetime") {
    currentType.value = "date";
  }
};

const handleConfirm = (isConfirm = false) => {
  if (!showConfirm.value || isConfirm) {
    preCondition();

    emits("pick", currentData.value); // formatValue()
  }
};

const handleNow = () => {
  if (dayjs().isBefore(dayjs(props.min, props.format))) {
    showDate.value = currentData.value = dayjs(props.min, props.format);
  } else if (dayjs().isAfter(dayjs(props.max, props.format))) {
    showDate.value = currentData.value = dayjs(props.max, props.format);
  } else {
    showDate.value = currentData.value = dayjs();
  }
};

const handleChangeShortcut = (shortcuts: ShortcutsType) => {
  const date = (
    isFunction(shortcuts.value) ? shortcuts.value() : shortcuts.value
  ) as DatePickerModelValueSingleType;

  currentData.value = dayjs(date, props.format);

  handleConfirm();
};

const footerValue = () => {
  return currentData.value
    ? dayjs(currentData.value).format(props.inputFormat)
    : "";
};
</script>

<template>
  <div class="layui-laydate">
    <Shortcuts @change-shortcut="handleChangeShortcut"></Shortcuts>
    <!-- 当datetime模式下 切换为time时，只通过css隐藏date模块，不销毁date模块。 -->
    <!-- 防止date内部inputDate watch 因重新渲染而再次执行。 -->
    <!-- 再次执行会导致在非simple模式下切换日期重新赋值datepicker.modelValue -->
    <Date
      v-if="currentType === 'date' || currentType === 'time'"
      v-show="currentType === 'date'"
      :modelValue="currentData"
      :showDate="showDate"
      :dateType="dateType"
      @pick="handlePickDate"
      @year-month-change="handleDateChangeYearMonth"
      @type-change="(type: 'year' | 'month') => (currentType = type)"
    ></Date>
    <Time
      v-if="currentType === 'time'"
      :modelValue="currentData"
      :showDate="showDate"
      :dateType="dateType"
      @pick="handlePickTime"
    ></Time>
    <Year
      v-if="currentType === 'year'"
      :modelValue="currentData"
      :showDate="showDate"
      :dateType="dateType"
      @pick="handlePickYear"
    ></Year>
    <Month
      v-if="currentType === 'month'"
      :modelValue="currentData"
      :showDate="showDate"
      :dateType="dateType"
      @pick="handlePickMonth"
      @year-change="handleMonthChangeYear"
      @type-change="currentType = 'year'"
    ></Month>
    <Footer
      :showConfirm="showConfirm"
      :disabledConfirm="!currentData"
      @confirm="handleConfirm(true)"
      @now="handleNow"
    >
      <LayButton
        v-if="dateType === 'datetime'"
        size="xs"
        :class="{ 'type-time': currentType === 'time' }"
        @click="handleToggleTimePanel"
        >{{ currentType === "date" ? "选择时间" : "选择日期" }}</LayButton
      >
      <template v-else>{{ footerValue() }}</template>
    </Footer>
  </div>
</template>
