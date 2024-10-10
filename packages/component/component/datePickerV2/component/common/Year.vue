<template>
  <div class="layui-laydate-main">
    <div class="layui-laydate-header">
      <slot name="header" :yearList="yearRange">
        <lay-icon
          type="layui-icon-prev"
          @click="currentDate -= DatePickerContext.yearPage"
        ></lay-icon>
        <div class="laydate-set-ym">
          <span class="laydate-time-text">
            {{ yearRange.join(" - ") }}
          </span>
        </div>
        <lay-icon
          type="layui-icon-next"
          @click="currentDate += DatePickerContext.yearPage"
        ></lay-icon>
      </slot>
    </div>

    <div
      class="layui-laydate-content"
      style="height: 220px; overflow-y: auto"
      ref="ScrollRef"
    >
      <ul class="layui-laydate-list laydate-year-list">
        <li
          v-for="item of yearList"
          :key="item"
          :class="{
            'layui-this': currentYear === item,
            'layui-laydate-current': item === dayjs().year(),
            'layui-disabled': cellDisabled(item),
            ...classes?.(dayjs().year(item)),
          }"
          @click="handleYearClick(item)"
          @mouseenter="handleYearMouseenter(item)"
        >
          {{ item }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { BasePanelProps } from "../interface";

import dayjs from "dayjs";
import { computed, ref, watch, inject } from "vue";

import LayIcon from "../../../icon";
import { DATE_PICKER_CONTEXT } from "../../interface";
import { getYears } from "../../util";

defineOptions({
  name: "YearPanel",
});

const props = defineProps<BasePanelProps>();
const emits = defineEmits(["pick", "hover-cell"]);

const DatePickerContext = inject(DATE_PICKER_CONTEXT)!;

const currentYear = ref<number | null>();
const currentDate = ref<number>(dayjs().year());

const yearList = computed<number[]>(() =>
  getYears(
    currentDate.value,
    DatePickerContext.yearPage
    // DatePickerContext.yearStep
  )
);
const yearRange = computed(() => [yearList.value.at(0), yearList.value.at(-1)]);

watch(
  [() => props.modelValue, () => props.showDate],
  ([modelValue, showDate]) => {
    currentYear.value = modelValue ? modelValue.year() : null;

    currentDate.value = (modelValue || showDate)?.year();
  },
  {
    immediate: true,
  }
);

// 判断单元格是否可以点击(禁用)
const cellDisabled = computed(() => {
  return (item: number) => {
    if (DatePickerContext.min && item < dayjs(DatePickerContext.min).year()) {
      return true;
    }
    if (DatePickerContext.max && item > dayjs(DatePickerContext.max).year()) {
      return true;
    }
    return false;
  };
});

// 点击年份
const handleYearClick = (item: number) => {
  if (cellDisabled.value(item)) {
    return true;
  }

  currentYear.value = item;
  emits("pick", DatePickerContext.range ? dayjs().year(item) : item);
};

const handleYearMouseenter = (item: number) => {
  if (cellDisabled.value(item) || !DatePickerContext.range) {
    return;
  }

  emits("hover-cell", dayjs().year(item));
};
</script>
