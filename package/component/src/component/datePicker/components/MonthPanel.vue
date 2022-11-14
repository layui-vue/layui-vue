<template>
  <div class="layui-laydate">
    <div class="layui-laydate-main laydate-main-list-0 laydate-ym-show">
      <div class="layui-laydate-header">
        <div class="laydate-set-ym">
          <span @click="datePicker.showPanel.value = 'month'">{{
            typeof Month !== "string"
              ? MONTH_NAME[Month]
              : t("datePicker.selectMonth")
          }}</span>
        </div>
      </div>
    </div>
    <div class="layui-laydate-content" style="height: 220px">
      <ul class="layui-laydate-list laydate-month-list">
        <li
          v-for="item of MONTH_NAME"
          :key="item"
          :class="{
            'layui-this': MONTH_NAME.indexOf(item) === Month,
            'layui-laydate-current':
              Month === '' && parseInt(item) - 1 === dayjs().month(),
          }"
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
        >{{ t("datePicker.selectYear") }}</span
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
import { useI18n } from "../../../language";
import { computed, inject, ref, watch } from "vue";
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
const { t } = useI18n();

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

// 点击月份
const handleMonthClick = (item: any) => {
  Month.value = MONTH_NAME.value.indexOf(item);
  if (!datePicker.range) {
    if (datePicker.type === "yearmonth") {
      datePicker.currentDay.value = dayjs(datePicker.currentDay.value)
        .month(MONTH_NAME.value.indexOf(item))
        .valueOf();
    }
    if (datePicker.type === "date" || datePicker.type === "datetime") {
      emits("update:modelValue", MONTH_NAME.value.indexOf(item));
      datePicker.showPanel.value = datePicker.type;
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
  emits("update:modelValue", Month.value ? Month.value : -1);
  if (datePicker.range) {
    //关闭菜单
    emits("ok");
    return;
  } else {
    if (datePicker.type === "datetime" || datePicker.type === "date") {
      datePicker.showPanel.value = datePicker.type;
    } else {
      datePicker.ok();
    }
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
