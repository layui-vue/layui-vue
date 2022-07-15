<template>
  <div class="layui-laydate">
    <div class="layui-laydate-main laydate-main-list-0">
      <div class="layui-laydate-header">
        <i class="layui-icon laydate-icon laydate-prev-y" @click="changeYearOrMonth('year', -1)"></i>
        <i class="layui-icon laydate-icon laydate-prev-m" @click="changeYearOrMonth('month', -1)"></i>
        <div class="laydate-set-ym">
          <span @click="datePicker.showPanel.value = 'year'">{{ datePicker.currentYear.value }} 年</span>
          <span @click="datePicker.showPanel.value = 'month'">{{ datePicker.currentMonth.value + 1 }} 月</span>
        </div>
        <i class="layui-icon laydate-icon laydate-next-m" @click="changeYearOrMonth('month', 1)"></i>
        <i class="layui-icon laydate-icon laydate-next-y" @click="changeYearOrMonth('year', 1)"></i>
      </div>
      <DateContent :date-list="datePicker.dateList" v-model="datePicker.currentDay.value"></DateContent>
      <PanelFoot></PanelFoot>
    </div>
  </div>
</template>
<script lang="ts">
export default {
  name: "DatePanel",
};
</script>
<script lang="ts" setup>
import { computed, inject, ref, watch } from 'vue';
import { provideType } from '../interface';
import { setDateList } from '../day';
import PanelFoot from './PanelFoot.vue'
import DateContent from './components/DateContent.vue'

const datePicker: provideType = inject('datePicker') as provideType;

// 监听年月, 刷新日期
watch(
  [datePicker.currentYear, datePicker.currentMonth],
  () => {
    datePicker.dateList.value = setDateList(datePicker.currentYear.value, datePicker.currentMonth.value);
  },
  { immediate: true }
);

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


</script>