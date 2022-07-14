<template>
  <div class="layui-laydate-footer">
    <span v-if="datePicker.type === 'datetime' && datePicker.showPanel.value === 'datetime'" @click="chooseTime"
      class="laydate-btns-time">选择时间</span>

    <span v-else-if="datePicker.type === 'datetime' && datePicker.showPanel.value === 'time'"
      @click="datePicker.showPanel.value = 'datetime'" class="laydate-btns-time">选择日期</span>

    <span v-else-if="datePicker.type === 'yearmonth' && datePicker.showPanel.value === 'year'"
      @click="datePicker.showPanel.value = 'month'" class="laydate-btns-time">选择月份</span>
    <span v-else-if="datePicker.type === 'yearmonth' && datePicker.showPanel.value === 'month'"
      @click="datePicker.showPanel.value = 'year'" class="laydate-btns-time">选择年份</span>

    <span v-else-if="!datePicker.range" class="layui-laydate-preview" title="当前选中的结果">
      <template v-if="datePicker.type === 'month'">{{ datePicker.currentMonth.value + 1 }}</template>
      <template v-else-if="datePicker.type === 'year'">{{ datePicker.currentYear.value }}</template>
      <template v-else-if="datePicker.type === 'time'">{{
          datePicker.hms.value.hh + ':' + datePicker.hms.value.mm + ':' + (datePicker.hms.value.ss === 0 ? '0' : '') + datePicker.hms.value.ss
      }}</template>
    </span>

    <div class="laydate-footer-btns">
      <span lay-type="clear" class="laydate-btns-clear" @click="datePicker.clear()">清空</span>
      <span lay-type="now" class="laydate-btns-now" @click="datePicker.now()">现在</span>
      <span lay-type="confirm" class="laydate-btns-confirm" @click="datePicker.ok()">确定</span>
    </div>
  </div>
</template>
<script lang="ts">
export default {
  name: "PanelFoot",
};
</script>
<script lang="ts" setup>
import { inject } from 'vue';
import { provideType } from '../interface';


const datePicker: provideType = inject('datePicker') as provideType;
const emits = defineEmits(['showYearPanel', 'update:showPanel', 'scrollToCurrentTime', 'ok']);

//选择时间
const chooseTime = () => {
  datePicker.showPanel.value = 'time'
  //scrollToCurrentTime()
}
</script>