<template>
  <div class="layui-laydate">
    <div class="layui-laydate-main laydate-main-list-0 laydate-ym-show">
      <div class="layui-laydate-year-panel-header">
        <div class="laydate-set-ym">
          <lay-icon
            type="layui-icon-left"
            @click="currentDate -= DatePickerContext.yearPage"
          ></lay-icon>
          <span class="laydate-time-text">
            {{ yearRange.join(" - ") }}
          </span>
          <lay-icon
            type="layui-icon-right"
            @click="currentDate += DatePickerContext.yearPage"
          ></lay-icon>
        </div>
      </div>
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
          }"
          @click="handleYearClick(item)"
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
import { useI18n } from "../../../../language";
import { DATE_PICKER_CONTEXT } from "../../interface";
import { getYears } from "../../day";

defineOptions({
  name: "YearPanel",
});

const props = withDefaults(defineProps<BasePanelProps>(), {});
const emits = defineEmits(["pick"]);

const DatePickerContext = inject(DATE_PICKER_CONTEXT)!;

const currentYear = ref();
const currentDate = ref();

const yearList = computed<number[]>(() =>
  getYears(
    currentDate.value,
    DatePickerContext.yearPage,
    DatePickerContext.yearStep
  )
);
const yearRange = computed(() => [yearList.value.at(0), yearList.value.at(-1)]);

watch(
  () => props.modelValue,
  () => {
    currentDate.value = currentYear.value = props.modelValue.year();
  },
  {
    immediate: true,
  }
);

const { t } = useI18n();

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
  emits("pick", item);
};
</script>
