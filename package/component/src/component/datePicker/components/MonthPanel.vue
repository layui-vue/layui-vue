<template>
  <div class="layui-laydate">
    <div class="layui-laydate-main laydate-main-list-0 laydate-ym-show">
      <div class="layui-laydate-header">
        <div class="laydate-set-ym">
          <span @click="datePicker.showPanel.value = 'month'">{{
            typeof Month !== "string" ? Month + 1 + " 月" : "请选择月份"
          }}</span>
        </div>
      </div>
    </div>
    <div class="layui-laydate-content" style="height: 220px">
      <ul class="layui-laydate-list laydate-month-list">
        <li
          v-for="item of MONTH_NAME"
          :key="item"
          :class="{ 'layui-this': MONTH_NAME.indexOf(item) === Month }"
          @click="handleMonthClick(item)"
        >
          {{ item.slice(0, 3) }}
        </li>
      </ul>
    </div>
    <PanelFoot @ok="footOnOk" @now="footOnNow" @clear="footOnClear">
      <span
        v-if="datePicker.type === 'yearmonth'"
        @click="datePicker.showPanel.value = 'year'"
        class="laydate-btns-time"
        >选择年份</span
      >
    </PanelFoot>
  </div>
</template>
<script lang="ts">
export default {
  name: "TimePanel",
};
</script>
<script lang="ts" setup>
import dayjs from "dayjs";
import { inject, ref, watch } from "vue";
import { provideType } from "../interface";
import PanelFoot from "./PanelFoot.vue";

export interface TimePanelProps {
  modelValue: number | string;
  max?: number;
}
const props = withDefaults(defineProps<TimePanelProps>(), {
  max: dayjs().year() + 100,
});
const emits = defineEmits(["update:modelValue", "ok"]);
const datePicker: provideType = inject("datePicker") as provideType;
const Month = ref(props.modelValue);

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

// 点击月份
const handleMonthClick = (item: any) => {
  Month.value = MONTH_NAME.indexOf(item);
  if (!datePicker.range) {
    if (datePicker.type === "yearmonth") {
      datePicker.currentDay.value = dayjs(datePicker.currentDay.value)
        .month(MONTH_NAME.indexOf(item))
        .valueOf();
    }
    if (datePicker.type === "date" || datePicker.type === "datetime") {
      emits("update:modelValue", MONTH_NAME.indexOf(item));
    }
  }
  if (datePicker.simple) {
    footOnOk();
  }
};

watch(
  () => props.modelValue,
  () => {
    Month.value = props.modelValue;
  }
);

//关闭回调
const footOnOk = () => {
  emits("update:modelValue", Month.value);
  if (datePicker.range) {
    //关闭菜单
    emits("ok");
    return;
  } else {
    datePicker.ok();
  }
};

//现在回调
const footOnNow = () => {
  Month.value = dayjs().month();
};

//清空回调
const footOnClear = () => {
  Month.value = "";
};
</script>
