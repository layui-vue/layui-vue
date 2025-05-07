<script lang="ts" setup>
import type { Dayjs } from "dayjs";

import type { BasePanelProps } from "../interface";
import LayIcon from "@layui/component/component/icon";
import dayjs from "dayjs";

import { computed, inject, ref, watch } from "vue";
import { DATE_PICKER_CONTEXT } from "../../interface";
import { getYears } from "../../util";
import DatePickerRender from "./DatePickerRender.vue";

defineOptions({
  name: "YearPanel",
});

const props = defineProps<BasePanelProps>();
const emits = defineEmits(["pick", "hover-cell"]);

const DatePickerContext = inject(DATE_PICKER_CONTEXT)!;

const currentYear = ref<number | null>();
const currentDate = ref<Dayjs>(dayjs());

const yearList = computed<number[]>(() =>
  getYears(
    currentDate.value.year(),
    DatePickerContext.yearPage,
    // DatePickerContext.yearStep
  ),
);
const yearRange = computed(() => [yearList.value.at(0), yearList.value.at(-1)]);

watch(
  [() => props.modelValue, () => props.showDate],
  ([modelValue, showDate]) => {
    currentYear.value = modelValue ? modelValue.year() : null;

    currentDate.value = modelValue || showDate;
  },
  {
    immediate: true,
  },
);

// 判断单元格是否可以点击(禁用)
function cellDisabled(item: number) {
  if (DatePickerContext.disabledDate) {
    return DatePickerContext.disabledDate(
      currentDate.value.year(item).toDate(),
    );
  }

  if (DatePickerContext.min && item < dayjs(DatePickerContext.min).year()) {
    return true;
  }
  if (DatePickerContext.max && item > dayjs(DatePickerContext.max).year()) {
    return true;
  }
  return false;
}

// 点击年份
function handleYearClick(item: number) {
  if (cellDisabled(item)) {
    return true;
  }

  currentYear.value = item;
  emits("pick", DatePickerContext.range ? dayjs().year(item) : item);
}

function handleYearMouseenter(item: number) {
  if (cellDisabled(item) || !DatePickerContext.range) {
    return;
  }

  emits("hover-cell", dayjs().year(item));
}

function handleChangeShowYear(value: number) {
  currentDate.value = currentDate.value.year(currentDate.value.year() + value);
}
</script>

<template>
  <div class="layui-laydate-main layui-laydate-main-year">
    <div class="layui-laydate-header">
      <slot name="header" :year-list="yearRange">
        <LayIcon
          type="layui-icon-prev"
          @click="handleChangeShowYear(-DatePickerContext.yearPage)"
        />
        <div class="laydate-set-ym">
          <span class="laydate-time-text">
            {{ yearRange.join(" - ") }}
          </span>
        </div>
        <LayIcon
          type="layui-icon-next"
          @click="handleChangeShowYear(DatePickerContext.yearPage)"
        />
      </slot>
    </div>

    <div
      class="layui-laydate-content"
      style="height: 220px; overflow-y: auto"
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
          <DatePickerRender type="year" :unix="dayjs(`${item}`).valueOf()" :dayjs="dayjs(`${item}`)">
            {{ item }}
          </DatePickerRender>
        </li>
      </ul>
    </div>
  </div>
</template>
