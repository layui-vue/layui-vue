<template>
  <div class="layui-laydate">
    <div class="layui-laydate-main laydate-main-list-0 laydate-ym-show">
      <div class="layui-laydate-year-panel-header">
        <div class="laydate-set-ym">
          <lay-icon
            type="layui-icon-left"
            @click="_currentDate -= yearPage ?? 15"
          ></lay-icon>
          <span class="laydate-time-text">
            {{ yearRange.join(" - ") }}
          </span>
          <lay-icon
            type="layui-icon-right"
            @click="_currentDate += yearPage ?? 15"
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
            'layui-this': _currentYear === item,
            'layui-laydate-current': item === dayjs().year(),
            'layui-disabled': cellDisabled(item),
          }"
          @click="handleYearClick(item)"
        >
          {{ item }}
        </li>
      </ul>
    </div>
    <!--<PanelFoot @ok="footOnOk" @now="footOnNow">
       <span
        v-if="datePicker.type === 'yearmonth'"
        @click="datePicker.showPanel.value = 'month'"
        class="laydate-btns-time"
        >{{ t("datePicker.selectMonth") }}</span
      >
      <template v-else-if="parseInt(Year.toString()) > 0">{{ Year }}</template> 
      {{ _currentYear }}
    </PanelFoot>-->
  </div>
</template>

<script lang="ts" setup>
import { type BaseDateTypeProps } from "../interface";
import type {
  provideType,
  DatePickerProps,
  DatePickerModelValueSingleType,
} from "../../interface";

import dayjs, { Dayjs } from "dayjs";
import { useI18n } from "../../../../language";
import { computed, inject, ref, watch } from "vue";
import { getYears } from "../../day";
import PanelFoot from "./PanelFoot.vue";
import LayIcon from "../../../icon";

export interface TimePanelProps {
  modelValue: number | string;
}

defineOptions({
  name: "YearPanel",
});

const props = withDefaults(defineProps<BaseDateTypeProps>(), {
  // modelValue: "",
  // type: "date",
  // disabled: false,
  // readonly: false,
  // allowClear: false,
  // simple: false,
  // range: false,
  // rangeSeparator: "至",
  // prefixIcon: "layui-icon-date",
  // suffixIcon: "",
  // timestamp: false,
  // format: "",
  // yearPage: 15,
  // yearStep: 1,
});

const emits = defineEmits(["pick"]);

const _currentYear = ref();
const _currentDate = ref();

const yearList = computed<number[]>(() =>
  getYears(_currentDate.value, props.yearPage, props.yearStep)
);
const yearRange = computed(() => [yearList.value.at(0), yearList.value.at(-1)]);

watch(
  () => props.modelValue,
  () => {
    _currentDate.value = _currentYear.value = (
      props.modelValue as Dayjs
    ).year();
  },
  {
    immediate: true,
  }
);

const { t } = useI18n();

// 判断单元格是否可以点击(禁用)
const cellDisabled = computed(() => {
  return (item: number) => {
    if (props.min && item < dayjs(props.min).year()) {
      return true;
    }
    if (props.max && item > dayjs(props.max).year()) {
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

  _currentYear.value = item;
  emits("pick", item);
};
</script>
