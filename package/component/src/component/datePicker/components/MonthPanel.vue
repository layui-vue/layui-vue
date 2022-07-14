<template>
  <div class="layui-laydate">
    <div class="layui-laydate-main laydate-main-list-0 laydate-ym-show">
      <div class="layui-laydate-header">
        <i class="layui-icon laydate-icon laydate-prev-y" @click="changeYearOrMonth('year', -1)"></i>
        <div class="laydate-set-ym">
          <span @click="datePicker.showPanel.value = 'month'">{{ datePicker.currentMonth.value + 1 }} 月</span>
        </div>
        <i class="layui-icon laydate-icon laydate-next-y" @click="changeYearOrMonth('year', 1)"></i>
      </div>

    </div>
    <div class="layui-laydate-content" style="height: 220px">
      <ul class="layui-laydate-list laydate-month-list">
        <li v-for="item of MONTH_NAME" :key="item"
          :class="{ 'layui-this': MONTH_NAME.indexOf(item) === datePicker.currentMonth.value }"
          @click="handleMonthClick(item)">
          {{ item.slice(0, 3) }}
        </li>
      </ul>
    </div>
    <PanelFoot></PanelFoot>
  </div>
</template>
<script lang="ts">
export default {
  name: "TimePanel",
};
</script>
<script lang="ts" setup>
import dayjs from 'dayjs';
import { inject } from 'vue';
import { provideType } from '../interface';
import PanelFoot from './PanelFoot.vue'
const datePicker: provideType = inject('datePicker') as provideType;


const MONTH_NAME = [
  "1月",
  "2月",
  "3月",
  "4月",
  "5月",
  "6月",
  "7月",
  "8月",
  "9月",
  "10月",
  "11月",
  "12月",
];

// 切换年月
const changeYearOrMonth = (type: "year" | "month", num: number) => {
  if (type === "year") {
    datePicker.currentYear.value += num;
  } else {
    let month = datePicker.currentMonth.value + num;
    if (month > 11) {
      month = 0;
      datePicker.currentYear.value++;
    } else if (month < 0) {
      month = 11;
      datePicker.currentYear.value--;
    }
    datePicker.currentMonth.value = month;
  }
};

// 点击月份
const handleMonthClick = (item: any) => {
  datePicker.currentMonth.value = MONTH_NAME.indexOf(item);
  if (datePicker.type === "month") {
    datePicker.currentDay.value = dayjs(datePicker.currentDay.value)
      .month(MONTH_NAME.indexOf(item))
      .valueOf();
  } else if (datePicker.type === "yearmonth") {
    datePicker.currentDay.value = dayjs(datePicker.currentDay.value)
      .month(MONTH_NAME.indexOf(item))
      .valueOf();
  } else {
    datePicker.showPanel.value = "date";
  }
};
</script>