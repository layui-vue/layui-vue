<!--
 * @Author: baobaobao
 * @Date: 2023-05-12 21:52:52
 * @LastEditTime: 2023-05-15 13:25:13
 * @LastEditors: baobaobao
-->
<template>
  <div class="layui-calendar">
    <div class="layui-calendar-header">
      <slot name="header" v-if="$slots.header" :date="getYearMonth"></slot>
      <template v-else>
        <div class="layui-calendar-title">{{ getYearMonth }}</div>
        <div class="layui-calendar-group">
          <lay-button-group>
            <lay-button size="sm" @click="prevMonth">
              <lay-icon type="layui-icon-left"></lay-icon>
            </lay-button>
            <lay-button size="sm" @click="findDay">今天</lay-button>
            <lay-button size="sm" @click="nextMonth">
              <lay-icon type="layui-icon-right"></lay-icon>
            </lay-button>

            <!-- <lay-button size="sm" type="default">这个月</lay-button> -->
          </lay-button-group>
        </div>
      </template>
    </div>
    <div class="layui-calendar-body">
      <lay-calendar-date-table
        :disabledDate="disabledDate"
        :fullscreen="fullscreen"
        :date="date"
        @click="handleClick"
      >
        <template v-if="$slots.cell" #cell="data">
          <slot v-if="$slots['cell']" name="cell" v-bind="data" />
        </template>
      </lay-calendar-date-table>
    </div>
  </div>
</template>

<script lang="ts" setup>
import dayjs, { Dayjs } from "dayjs";
import "./index.less";
import LayCalendarDateTable from "./date-table.vue";

import { computed, ref } from "vue";
export interface CalendarProps {
  modelValue?: Date | string | number;
  fullscreen?: boolean;
  disabledDate?: Function;
}

defineOptions({
  name: "LayCalendar",
});

const props = withDefaults(defineProps<CalendarProps>(), {
  modelValue: Date.now(),
  fullscreen: true,
  // disabledDate: (date: string | number | Date) => date
});
const emit = defineEmits(["click", "update:modelValue"]);

const date = ref(props.modelValue);
const getYearMonth = computed(() => {
  return dayjs(date.value).format("YYYY-MM");
});
const findDay = () => {
  date.value = dayjs().format("YYYY-MM-DD");
};
const prevMonthDayjs = computed(() =>
  dayjs(date.value).subtract(1, "month").date(1)
);
const nextMonthDayjs = computed(() =>
  dayjs(date.value).add(1, "month").date(1)
);
const prevMonth = () => {
  date.value = prevMonthDayjs.value.format("YYYY-MM-DD");
};
const nextMonth = () => {
  date.value = nextMonthDayjs.value.format("YYYY-MM-DD");
};
const handleClick = (val: string) => {
  emit("click", val);
  emit("update:modelValue", val);
};
</script>
<style lang="less"></style>
