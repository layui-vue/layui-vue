<!--
 * @Author: baobaobao
 * @Date: 2023-05-13 19:26:27
 * @LastEditTime: 2023-05-15 13:23:54
 * @LastEditors: baobaobao
-->
<template>
  <table class="layui-calendar-table" cellspacing="0" cellpadding="0">
    <thead>
      <th v-for="day in weekDays" :key="day">{{ day }}</th>
    </thead>
    <tbody>
      <tr v-for="(row, index) in rows" :key="index">
        <td
          :class="['layui-calendar' + '-' + cell.type]"
          v-for="(cell, key) in row"
          :key="key"
        >
          <div
            @click="handleClick(cell.text)"
            :class="[
              fullscreen ? 'layui-calendar-day' : 'layui-calendar-isfullscreen',
              {
                'layui-calendar-is-selcted': getIsSelected === cell.text,
                'layui-calendar-is-disabled':
                  disabledDate && disabledDate(cell.text),
              },
            ]"
          >
            <slot name="cell" :data="getData(cell)">
              <span> {{ cell.text }}</span>
            </slot>
          </div>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script lang="ts" setup>
import dayjs, { Dayjs } from "dayjs";
import "./date-table.vue";
import { weekDays, getMonthDay, getPrevMonthDay, nextMonthDay } from "./utils";
import { computed, ref, watch, useSlots } from "vue";
export interface CalendarDateTableProps {
  date: Date | string | number;
  fullscreen: boolean;
  disabledDate?: Function;
}

defineOptions({
  name: "LayCalendarDateTable",
});

const props = withDefaults(defineProps<CalendarDateTableProps>(), {
  date: Date.now(),
  fullscreen: true,
  // disabledDate: (date: string | number | Date) => date
});

const emit = defineEmits(["click", "update:modelValue"]);
const slot = useSlots();
const rows = computed(() => {
  const currentMonthDays = getMonthDay(props.date).map((day) => ({
    text: day,
    type: "current",
  }));
  const prevMonthDays = getPrevMonthDay(props.date).map((day) => ({
    text: day,
    type: "prev",
  }));
  const days = [...prevMonthDays, ...currentMonthDays];
  const remaining = 7 - (days.length % 7 || 7);
  const nextMonthDays = nextMonthDay(props.date, remaining).map((day) => ({
    text: day,
    type: "next",
  }));
  return toMergeArr([...days, ...nextMonthDays]);
});

const toMergeArr = (
  date: {
    text: string;
    type: string;
  }[]
) => {
  return Array(date.length / 7)
    .fill(date.length / 7)
    .map((_, index) => {
      const start = index * 7;
      return date.slice(start, start + 7);
    });
};
const getIsSelected = ref(dayjs(props.date).format("YYYY-MM-DD"));
const date = computed(() => props.date);
const handleClick = (text: string) => {
  if (props.disabledDate && props.disabledDate(text)) {
    return;
  }
  getIsSelected.value = text;
  emit("click", getIsSelected.value);
};

watch(
  () => date,
  (val) => {
    getIsSelected.value = dayjs(val.value).format("YYYY-MM-DD");
    emit("update:modelValue", getIsSelected.value);
  },
  {
    deep: true,
  }
);
const getData = (data: any) => {
  return {
    ...data,
    isSelected: getIsSelected.value === data.text,
  };
};
</script>
<style scoped lang="less">
@import "./index.less";
</style>
