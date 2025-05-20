<script setup lang="ts">
import type { Dayjs } from "dayjs";
import type { DatePickerValueNotArray, Shortcuts as ShortcutsType } from "../interface";
import type { RangePickerProps } from "./interface";
import { useI18n } from "@layui/component/language";
import dayjs from "dayjs";

import { ref, watch } from "vue";

import { useShortcutsRange } from "../hook/useShortcutsRange";
import DatePickerRender from "./common/DatePickerRender.vue";
import Footer from "./common/Footer.vue";
import Shortcuts from "./common/Shortcuts.vue";
import Time from "./common/Time.vue";

const props = withDefaults(defineProps<RangePickerProps>(), {});
const emits = defineEmits(["pick"]);

const { t } = useI18n();
const hookChangeShortcut = useShortcutsRange();

const startDate = ref<NonNullable<DatePickerValueNotArray>>(dayjs());
const endDate = ref<NonNullable<DatePickerValueNotArray>>(dayjs());

function minMaxTime(time: Dayjs) {
  if (time.isBefore(dayjs(props.min, props.format))) {
    return dayjs(props.min, props.format);
  }
  else if (time.isAfter(dayjs(props.max, props.format))) {
    return dayjs(props.max, props.format);
  }
  return time;
}

watch(
  () => props.modelValue,
  () => {
    const [start, end] = props.modelValue;

    startDate.value = start || minMaxTime(dayjs());
    endDate.value = end || minMaxTime(dayjs().add(1, "hour"));
  },
  { immediate: true },
);

function handleLeftTimePick(date: Dayjs) {
  if (date.isSameOrAfter(endDate.value)) {
    startDate.value = endDate.value;
    endDate.value = date;
  }
  else {
    startDate.value = date;
  }
}

function handleRightTimePick(date: Dayjs) {
  if (date.isSameOrBefore(startDate.value)) {
    endDate.value = startDate.value;
    startDate.value = date;
  }
  else {
    endDate.value = date;
  }
}

function handleChangeShortcut(shortcuts: ShortcutsType) {
  const shortcutsValues = hookChangeShortcut(shortcuts);

  startDate.value = shortcutsValues[0];
  endDate.value = shortcutsValues[1];

  if (props.simple)
    handleConfirm();
}

function handleConfirm() {
  emits("pick", [startDate.value, endDate.value]);
}
</script>

<template>
  <div class="layui-laydate layui-laydate-range">
    <div class="layui-laydate-range-main">
      <Shortcuts @change-shortcut="handleChangeShortcut" />

      <Time
        :model-value="startDate"
        :show-date="startDate"
        @pick="handleLeftTimePick"
      >
        <template #header>
          <span class="laydate-time-text">{{ t("datePicker.startTime") }}</span>
        </template>
      </Time>
      <Time
        :model-value="endDate"
        :show-date="endDate"
        @pick="handleRightTimePick"
      >
        <template #header>
          <span class="laydate-time-text">{{ t("datePicker.endTime") }}</span>
        </template>
      </Time>
    </div>
    <Footer :show-now="false" @confirm="handleConfirm">
      <DatePickerRender render="footer" :start="startDate" :end="endDate">
        {{ startDate?.format(props.inputFormat) }}
        {{ props.rangeSeparator }}
        {{ endDate?.format(props.inputFormat) }}
      </DatePickerRender>
    </Footer>
  </div>
</template>
