<script setup lang="ts">
import dayjs, { type Dayjs } from "dayjs";
import { ref, watch } from "vue";
import type { RangePickerProps } from "./interface";
import type { Shortcuts as ShortcutsType } from "../interface";

import { useI18n } from "../../../language";

import Time from "./common/Time.vue";
import Footer from "./common/Footer.vue";
import Shortcuts from "./common/Shortcuts.vue";

import { useShortcutsRange } from "../hook/useShortcutsRange";

const props = withDefaults(defineProps<RangePickerProps>(), {});
const emits = defineEmits(["pick"]);

const { t } = useI18n();
const hookChangeShortcut = useShortcutsRange();

const startDate = ref();
const endDate = ref();

const minMaxTime = (time: Dayjs) => {
  if (time.isBefore(dayjs(props.min, props.format))) {
    return dayjs(props.min, props.format);
  } else if (time.isAfter(dayjs(props.max, props.format))) {
    return dayjs(props.max, props.format);
  }
  return time;
};

watch(
  () => props.modelValue,
  () => {
    const [start, end] = props.modelValue;

    startDate.value = start || minMaxTime(dayjs());
    endDate.value = end || minMaxTime(dayjs().add(1, "hour"));
  },
  { immediate: true }
);

const handleLeftTimePick = (date: Dayjs) => {
  if (date.isSameOrAfter(endDate.value)) {
    startDate.value = endDate.value;
    endDate.value = date;
  } else {
    startDate.value = date;
  }
};

const handleRightTimePick = (date: Dayjs) => {
  if (date.isSameOrBefore(startDate.value)) {
    endDate.value = startDate.value;
    startDate.value = date;
  } else {
    endDate.value = date;
  }
};

const handleChangeShortcut = (shortcuts: ShortcutsType) => {
  const shortcutsValues = hookChangeShortcut(shortcuts);

  startDate.value = shortcutsValues[0];
  endDate.value = shortcutsValues[1];
};

const handleConfirm = () => {
  emits("pick", [startDate.value, endDate.value]);
};
</script>

<template>
  <div class="layui-laydate layui-laydate-range">
    <div class="layui-laydate-range-main">
      <Shortcuts @change-shortcut="handleChangeShortcut"></Shortcuts>

      <Time
        :modelValue="startDate"
        :showDate="startDate"
        @pick="handleLeftTimePick"
      >
        <template #header>
          <span class="laydate-time-text">{{ t("datePicker.startTime") }}</span>
        </template>
      </Time>
      <Time
        :modelValue="endDate"
        :showDate="endDate"
        @pick="handleRightTimePick"
      >
        <template #header>
          <span class="laydate-time-text">{{ t("datePicker.endTime") }}</span>
        </template>
      </Time>
    </div>
    <Footer
      :showNow="false"
      :showConfirm="!props.simple"
      @confirm="handleConfirm"
    >
      <slot name="footer">
        {{ startDate?.format(props.inputFormat) }}
        {{ props.rangeSeparator }}
        {{ endDate?.format(props.inputFormat) }}
      </slot>
    </Footer>
  </div>
</template>
