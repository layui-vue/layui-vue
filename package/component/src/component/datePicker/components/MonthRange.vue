<template>
  <div class="layui-laydate layui-laydate-range">
    <div style="display: flex">
      <div class="layui-laydate-main laydate-main-list-0">
        <div class="layui-laydate-header">
          <i
            class="layui-icon laydate-icon laydate-prev-y"
            @click="changeYear(-1)"
            ></i
          >
          <div class="laydate-set-ym">
            <lay-dropdown ref="dropdownYearPanelRefLeft">
              <span class="laydate-range-time"
                >{{ startTime.year || "--" }} {{ t("datePicker.year") }}</span
              >
              <template #content>
                <YearPanel
                  class="time-panel"
                  v-model="startTime.year"
                  @ok="closeLeftYearPanel"
                ></YearPanel>
              </template>
            </lay-dropdown>
          </div>
        </div>
        <div class="layui-laydate-content" style="height: 220px">
          <ul class="layui-laydate-list laydate-month-list">
            <li
              v-for="item of MONTH_NAME"
              :key="item"
              :data-unix="getUnix(item, 'left')"
              :class="{
                'layui-this':
                  getUnix(item, 'left') === startTime.unix ||
                  getUnix(item, 'left') === endTime.unix,
                'laydate-range-hover': ifHasRangeHoverClass(
                  getUnix(item, 'left')
                ),
                'layui-laydate-current':
                  (startTime.unix === -1 || endTime.unix === -1) &&
                  getUnix(item, 'left') === dayjs().startOf('month').valueOf(),
              }"
              @click="handleMonthClick(getUnix(item, 'left'))"
              @mouseenter="monthItemMouseEnter($event, item)"
            >
              {{ item.slice(0, 3) }}
            </li>
          </ul>
        </div>
      </div>
      <div class="layui-laydate-main laydate-main-list-0">
        <div class="layui-laydate-header">
          <div class="laydate-set-ym">
            <lay-dropdown ref="dropdownYearPanelRefRight">
              <span class="laydate-range-time"
                >{{ startTime.year + 1 }} {{ t("datePicker.year") }}</span
              >
              <template #content>
                <YearPanel
                  class="time-panel"
                  v-model="endTime.year"
                  @ok="closeRightYearPanel"
                ></YearPanel>
              </template>
            </lay-dropdown>
          </div>
          <i
            class="layui-icon laydate-icon laydate-next-y"
            @click="changeYear(1)"
            ></i
          >
        </div>
        <div class="layui-laydate-content" style="height: 220px">
          <ul class="layui-laydate-list laydate-month-list">
            <li
              v-for="item of MONTH_NAME"
              :key="item"
              :data-unix="getUnix(item, 'right')"
              :class="{
                'layui-this':
                  getUnix(item, 'right') === startTime.unix ||
                  getUnix(item, 'right') === endTime.unix,
                'laydate-range-hover': ifHasRangeHoverClass(
                  getUnix(item, 'right')
                ),
                'layui-laydate-current':
                  (startTime.unix === -1 || endTime.unix === -1) &&
                  getUnix(item, 'right') === dayjs().startOf('month').valueOf(),
              }"
              @click="handleMonthClick(getUnix(item, 'right'))"
              @mouseenter="monthItemMouseEnter($event, item)"
            >
              {{ item.slice(0, 3) }}
            </li>
          </ul>
        </div>
      </div>
    </div>
    <PanelFoot @ok="footOnOk" @now="footOnNow" @clear="footOnClear">
      <span v-if="startTime.unix !== -1" class="layui-laydate-preview">
        {{ dayjs(startTime.unix).format("YYYY-MM") }}
        {{ datePicker.rangeSeparator }}
        <template v-if="endTime.unix !== -1">
          {{ dayjs(endTime.unix).format("YYYY-MM") }}
        </template>
        <template v-else> -- </template>
      </span>
    </PanelFoot>
  </div>
</template>
<script lang="ts">
export default {
  name: "MonthRange",
};
</script>
<script lang="ts" setup>
import { inject, reactive, ref, watch, computed } from "vue";
import { provideType } from "../interface";
import PanelFoot from "./PanelFoot.vue";
import YearPanel from "./YearPanel.vue";
import dayjs from "dayjs";
import LayDropdown from "../../dropdown/index.vue";
import { useI18n } from "../../../language";

export interface DateRangeProps {
  startTime: string;
  endTime: string;
}

const props = withDefaults(defineProps<DateRangeProps>(), {});

const emits = defineEmits([
  "update:modelValue",
  "update:startTime",
  "update:endTime",
]);

const { t } = useI18n();

const datePicker: provideType = inject("datePicker") as provideType;

const startTime = reactive({
  year: props.startTime ? dayjs(props.startTime).year() : dayjs().year(),
  unix: props.startTime
    ? dayjs(props.startTime).hour(0).minute(0).second(0).valueOf()
    : -1,
});
const endTime = reactive({
  year: props.endTime ? dayjs(props.endTime).year() : dayjs().year() + 1,
  unix: props.startTime
    ? dayjs(props.endTime).hour(0).minute(0).second(0).valueOf()
    : -1,
});

let hoverMonth = ref(-1);

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

// 切换年月
const changeYear = (num: number) => {
  startTime.year += num;
};

// 点击月份
const handleMonthClick = (item: number) => {
  if (startTime.unix === -1 && endTime.unix === -1) {
    startTime.unix = item;
  } else if (startTime.unix !== -1 && endTime.unix !== -1) {
    hoverMonth.value = -1;
    startTime.unix = item;
    endTime.unix = -1;
  } else if (startTime.unix !== -1 && endTime.unix === -1) {
    endTime.unix = item;
    if (item < startTime.unix) {
      //swap
      const first = startTime.unix;
      const last = item;
      startTime.unix = last;
      endTime.unix = first;
    }
  }
};

// 监听年月, 刷新日期
watch(
  () => [props.startTime, props.endTime],
  () => {
    startTime.year = props.startTime
      ? dayjs(props.startTime).year()
      : dayjs().year();
    startTime.unix = props.startTime
      ? dayjs(props.startTime).hour(0).minute(0).second(0).valueOf()
      : -1;
    endTime.year = props.endTime ? dayjs(props.endTime).year() : dayjs().year();
    endTime.unix = props.startTime
      ? dayjs(props.endTime).hour(0).minute(0).second(0).valueOf()
      : -1;
  }
);

//关闭选择时间的面板
const dropdownYearPanelRefLeft = ref();
const dropdownYearPanelRefRight = ref();
const closeLeftYearPanel = () => {
  if (dropdownYearPanelRefLeft.value) dropdownYearPanelRefLeft.value.hide();
};
const closeRightYearPanel = () => {
  if (dropdownYearPanelRefRight.value) dropdownYearPanelRefRight.value.hide();
  startTime.year = endTime.year;
};

//关闭回调
const footOnOk = () => {
  let format = "YYYY-MM";
  let startTimeVal =
    startTime.unix !== -1 && endTime.unix !== -1
      ? dayjs(startTime.unix).format(format)
      : "";
  let endTimeVal =
    endTime.unix !== -1 && endTime.unix !== -1
      ? dayjs(endTime.unix).format(format)
      : "";
  emits("update:startTime", startTimeVal);
  emits("update:endTime", endTimeVal);
  datePicker.ok();
};

//现在回调
const footOnNow = () => {
  startTime.year = dayjs().year();
  startTime.unix = dayjs(
    startTime.year + "-" + (dayjs().month() + 1)
  ).valueOf();
  endTime.unix = -1;
  hoverMonth.value = -1;
};

//清空回调
const footOnClear = () => {
  startTime.unix = -1;
  endTime.unix = -1;
  hoverMonth.value = -1;
};

const monthItemMouseEnter = (event: MouseEvent, item: any) => {
  if (!datePicker.range) {
    return;
  }
  if (startTime.unix === -1) {
    return;
  }
  if (hoverMonth.value !== -1 && endTime.unix !== -1) {
    hoverMonth.value = -1;
    return;
  }
  hoverMonth.value = parseInt(
    (event.target as HTMLElement).dataset.unix as string
  );
};
const ifHasRangeHoverClass = computed(() => {
  return function (item: any) {
    if (!datePicker.range) {
      return false;
    }
    if (startTime.unix === -1) {
      return false;
    }
    if (hoverMonth.value === -1 && endTime.unix === -1) {
      return false;
    }
    let hover = endTime.unix !== -1 ? endTime.unix : hoverMonth.value;
    let max = startTime.unix > hover ? startTime.unix : hover;
    let min = startTime.unix < hover ? startTime.unix : hover;
    if (item >= min && item <= max) {
      return true;
    }
    return false;
  };
});

const getUnix = computed(() => {
  return function (item: any, position: "left" | "right") {
    let month = MONTH_NAME.value.indexOf(item);
    let year = position === "left" ? startTime.year : startTime.year + 1;
    return dayjs(year + "-" + (month + 1)).valueOf();
  };
});
</script>
