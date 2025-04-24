<script setup lang="ts">
import type { Dayjs } from "dayjs";
import type {
  DatePickerModelValueSingleType,
  Shortcuts as ShortcutsType,
} from "../interface";
import type { UniquePickerProps } from "./interface";
import dayjs from "dayjs";
import { computed, ref, watch } from "vue";

import { useI18n } from "../../../language";
import { isFunction } from "../../../utils";

import LayButton from "../../button/index.vue";

import { useBaseDatePicker } from "../hook/useBaseDatePicker";
import Date from "./common/Date.vue";
import Footer from "./common/Footer.vue";
import Month from "./common/Month.vue";
import Shortcuts from "./common/Shortcuts.vue";
import Time from "./common/Time.vue";
import Year from "./common/Year.vue";

const props = withDefaults(defineProps<UniquePickerProps>(), {});

const emits = defineEmits(["pick"]);

const currentData = ref<UniquePickerProps["modelValue"]>();
const showDate = ref<Dayjs>(dayjs());
const currentType = ref();

const { getDefaultValue } = useBaseDatePicker(props);
const { t } = useI18n();

watch(
  () => props.modelValue,
  () => {
    currentData.value = props.modelValue;
    showDate.value = props.modelValue || getDefaultValue();
  },
  { immediate: true },
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
  { immediate: true },
);

function handlePickDate(value: Dayjs) {
  currentData.value = value;
  handleConfirm();
}

function handlePickTime(value: Dayjs) {
  currentData.value = value;
  handleConfirm();
}

function handlePickYear(year: number) {
  const data = showDate.value.year(year);

  if (["datetime", "date"].includes(dateType.value)) {
    showDate.value = data;
    currentType.value = "date";
  }
  else if (dateType.value === "yearmonth") {
    showDate.value = data;
    currentType.value = "month";
  }
  else {
    currentData.value = data;
    handleConfirm();
  }
}

function handlePickMonth(month: number) {
  const data = showDate.value.month(month);

  if (["datetime", "date"].includes(dateType.value)) {
    showDate.value = data;
    currentType.value = "date";
  }
  else {
    currentData.value = data;
    showDate.value = data;
    handleConfirm();
  }
}

function handleMonthChangeYear(year: number) {
  showDate.value = showDate.value.year(year);
}

function handleDateChangeYearMonth(data: Dayjs) {
  showDate.value = data;
}

function handleToggleTimePanel() {
  currentType.value = currentType.value === "date" ? "time" : "date";
}

function preCondition() {
  // datetime类型点击确定还原当前panel为date
  if (dateType.value === "datetime") {
    currentType.value = "date";
  }
}

function handleConfirm(isConfirm = false) {
  if (!showConfirm.value || isConfirm) {
    preCondition();

    emits("pick", currentData.value); // formatValue()
  }
}

function handleNow() {
  if (dayjs().isBefore(dayjs(props.min, props.format))) {
    showDate.value = currentData.value = dayjs(props.min, props.format);
  }
  else if (dayjs().isAfter(dayjs(props.max, props.format))) {
    showDate.value = currentData.value = dayjs(props.max, props.format);
  }
  else {
    showDate.value = currentData.value = dayjs();
  }
  if (props.simple)
    handleConfirm();
}

function handleChangeShortcut(shortcuts: ShortcutsType) {
  const date = (
    isFunction(shortcuts.value) ? shortcuts.value() : shortcuts.value
  ) as DatePickerModelValueSingleType;

  currentData.value = dayjs(date);

  if (props.simple)
    handleConfirm();
}

function footerValue() {
  return currentData.value
    ? dayjs(currentData.value).format(props.inputFormat)
    : "";
}
</script>

<!-- 当datetime模式下 切换为time时，只通过css隐藏date模块，不销毁date模块。 -->
<!-- 防止date内部inputDate watch 因重新渲染而再次执行。 -->
<!-- 再次执行会导致在非simple模式下切换日期重新赋值datepicker.modelValue -->

<template>
  <div class="layui-laydate">
    <Shortcuts @change-shortcut="handleChangeShortcut" />
    <Date
      v-if="currentType === 'date' || currentType === 'time'"
      v-show="currentType === 'date'"
      :model-value="currentData"
      :show-date="showDate"
      :date-type="dateType"
      @pick="handlePickDate"
      @year-month-change="handleDateChangeYearMonth"
      @type-change="(type: 'year' | 'month') => (currentType = type)"
    />
    <Time
      v-if="currentType === 'time'"
      :model-value="currentData"
      :show-date="showDate"
      :date-type="dateType"
      @pick="handlePickTime"
    />
    <Year
      v-if="currentType === 'year'"
      :model-value="currentData"
      :show-date="showDate"
      :date-type="dateType"
      @pick="handlePickYear"
    />
    <Month
      v-if="currentType === 'month'"
      :model-value="currentData"
      :show-date="showDate"
      :date-type="dateType"
      @pick="handlePickMonth"
      @year-change="handleMonthChangeYear"
      @type-change="currentType = 'year'"
    />
    <Footer
      :show-confirm="showConfirm"
      :disabled-confirm="!currentData"
      @confirm="handleConfirm(true)"
      @now="handleNow"
    >
      <slot name="footer">
        <LayButton
          v-if="dateType === 'datetime'"
          size="xs"
          :class="{ 'type-time': currentType === 'time' }"
          @click="handleToggleTimePanel"
        >
          {{
            currentType === "date"
              ? t("datePicker.selectTime")
              : t("datePicker.selectDate")
          }}
        </LayButton>
        <template v-else>
          {{ footerValue() }}
        </template>
      </slot>
    </Footer>
  </div>
</template>
