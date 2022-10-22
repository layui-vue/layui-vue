<template>
  <div class="layui-laydate">
    <div class="layui-laydate-main laydate-main-list-0">
      <div class="layui-laydate-header">
        <i
          class="layui-icon laydate-icon laydate-prev-y"
          @click="changeYearOrMonth('year', -1)"
          ></i
        >
        <i
          class="layui-icon laydate-icon laydate-prev-m"
          @click="changeYearOrMonth('month', -1)"
          ></i
        >
        <div class="laydate-set-ym">
          <span @click="datePicker.showPanel.value = 'year'"
            >{{ datePicker.currentYear.value }} {{ t("datePicker.year") }}</span
          >
          <span @click="datePicker.showPanel.value = 'month'">
            {{ MONTH_NAME[datePicker.currentMonth.value] }}
          </span>
        </div>
        <i
          class="layui-icon laydate-icon laydate-next-m"
          @click="changeYearOrMonth('month', 1)"
          ></i
        >
        <i
          class="layui-icon laydate-icon laydate-next-y"
          @click="changeYearOrMonth('year', 1)"
          ></i
        >
      </div>
      <DateContent
        :date-list="dateList"
        v-model="Day"
        @simple="footOnOk"
        @update:model-value="ChildUpdateModelValue"
      ></DateContent>
      <PanelFoot @ok="footOnOk" @now="footOnNow" @clear="footOnClear">
        <span
          v-if="datePicker.type === 'datetime'"
          @click="datePicker.showPanel.value = 'time'"
          class="laydate-btns-time"
          >{{ t("datePicker.selectTime") }}</span
        >
      </PanelFoot>
    </div>
  </div>
</template>
<script lang="ts">
export default {
  name: "DatePanel",
};
</script>
<script lang="ts" setup>
import { computed, inject, ref, watch } from "vue";
import { provideType } from "../interface";
import { setDateList } from "../day";
import PanelFoot from "./PanelFoot.vue";
import DateContent from "./components/DateContent.vue";
import dayjs from "dayjs";
import { useI18n } from "../../../language";

export interface TimePanelProps {
  modelValue: number;
}

const { t } = useI18n();
const props = withDefaults(defineProps<TimePanelProps>(), {});
const emits = defineEmits(["update:modelValue", "ok"]);
const Day = ref(props.modelValue);
const datePicker: provideType = inject("datePicker") as provideType;
const dateList = ref<any>([]);

const MONTH_NAME = computed(() => [
  t("datePicker.january"),
  t("datePicker.february"),
  t("datePicker.march"),
  t("datePicker.april"),
  t("datePicker.may"),
  t("datePicker.june"),
  t("datePicker.july"),
  t("datePicker.august"),
  t("datePicker.september"),
  t("datePicker.october"),
  t("datePicker.november"),
  t("datePicker.december"),
]);

// 监听年月, 刷新日期
watch(
  [datePicker.currentYear, datePicker.currentMonth],
  () => {
    dateList.value = setDateList(
      datePicker.currentYear.value,
      datePicker.currentMonth.value
    );
  },
  { immediate: true }
);

watch(
  () => props.modelValue,
  () => {
    Day.value = props.modelValue;
  }
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

//关闭回调
const footOnOk = () => {
  emits("update:modelValue", Day.value);
  datePicker.ok();
};

//现在回调
const footOnNow = () => {
  datePicker.currentYear.value = dayjs().year();
  datePicker.currentMonth.value = dayjs().month();
  Day.value = new Date(new Date().toDateString()).getTime();
};

//清空回调
const footOnClear = () => {
  Day.value = -1;
};

const ChildUpdateModelValue = () => {
  emits("update:modelValue", Day.value);
};
</script>
