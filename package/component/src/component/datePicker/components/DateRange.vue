<template>
  <div
    class="layui-laydate layui-laydate-range"
    :class="'layui-laydate-range-' + datePicker.showPanel.value"
  >
    <div style="display: flex">
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
            <lay-dropdown ref="dropdownYearPanelRefLeft">
              <span class="laydate-range-time"
                >{{ startTime.year || "--" }} {{ t("datePicker.year") }}</span
              >
              <template #content>
                <YearPanel
                  class="time-panel"
                  v-model="startTime.year"
                  @ok="closeTimePanel"
                ></YearPanel>
              </template>
            </lay-dropdown>
            <lay-dropdown ref="dropdownMonthPanelRefLeft">
              <span class="laydate-range-time">
                {{ MONTH_NAME[startTime.month] }}</span
              >
              <template #content>
                <MonthPanel
                  class="time-panel"
                  v-model="startTime.month"
                  @ok="closeTimePanel"
                ></MonthPanel>
              </template>
            </lay-dropdown>
            <lay-dropdown
              ref="dropdownTimePanelRefLeft"
              v-if="datePicker.type === 'datetime'"
            >
              <span class="laydate-range-time">
                {{
                  dayjs()
                    .hour(startTime.hms.hh)
                    .minute(startTime.hms.mm)
                    .second(startTime.hms.ss)
                    .format("HH:mm:ss")
                }}
              </span>
              <template #content>
                <TimePanel
                  v-model="startTime.hms"
                  class="time-panel"
                  @ok="closeTimePanel"
                ></TimePanel>
              </template>
            </lay-dropdown>
          </div>
        </div>
        <DateContent
          :date-list="prevDateList"
          v-model:hoverDate="hoverDate"
          v-model:startDate="startTime.day"
          v-model:endDate="endTime.day"
        ></DateContent>
      </div>
      <div class="layui-laydate-main laydate-main-list-0">
        <div class="layui-laydate-header">
          <div class="laydate-set-ym">
            <lay-dropdown ref="dropdownYearPanelRefRight">
              <span class="laydate-range-time"
                >{{
                  startTime.month + 1 > 11 ? startTime.year + 1 : startTime.year
                }}
                {{ t("datePicker.year") }}</span
              >
              <template #content>
                <YearPanel
                  class="time-panel"
                  v-model="endTime.year"
                  @ok="closeRightYearPanel"
                ></YearPanel>
              </template>
            </lay-dropdown>
            <lay-dropdown ref="dropdownMonthPanelRefRight">
              <span class="laydate-range-time">
                {{
                  MONTH_NAME[
                    startTime.month + 1 > 11
                      ? startTime.month + 1 - 12
                      : startTime.month + 1
                  ]
                }}
              </span>
              <template #content>
                <MonthPanel
                  class="time-panel"
                  v-model="endTime.month"
                  @ok="closeRightMonthPanel"
                ></MonthPanel>
              </template>
            </lay-dropdown>
            <lay-dropdown
              ref="dropdownTimePanelRefRight"
              v-if="datePicker.type === 'datetime'"
            >
              <span class="laydate-range-time">
                {{
                  dayjs()
                    .hour(endTime.hms.hh)
                    .minute(endTime.hms.mm)
                    .second(endTime.hms.ss)
                    .format("HH:mm:ss")
                }}
              </span>
              <template #content>
                <TimePanel
                  v-model="endTime.hms"
                  class="time-panel"
                  @ok="closeTimePanel"
                ></TimePanel>
              </template>
            </lay-dropdown>
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
          :date-list="nextDateList"
          v-model:hoverDate="hoverDate"
          v-model:startDate="startTime.day"
          v-model:endDate="endTime.day"
        ></DateContent>
      </div>
    </div>
    <PanelFoot @ok="footOnOk" @now="footOnNow" @clear="footOnClear">
      <span v-if="startTime.day !== -1" class="layui-laydate-preview">
        {{ dayjs(startTime.day).format("YYYY-MM-DD") }}
        <template v-if="datePicker.type === 'datetime'">
          {{
            dayjs()
              .hour(startTime.hms.hh)
              .minute(startTime.hms.mm)
              .second(startTime.hms.ss)
              .format("HH:mm:ss")
          }}
        </template>
        {{ datePicker.rangeSeparator }}
        <template v-if="endTime.day !== -1">
          {{ dayjs(endTime.day).format("YYYY-MM-DD") }}
          <template v-if="datePicker.type === 'datetime'">
            {{
              dayjs()
                .hour(endTime.hms.hh)
                .minute(endTime.hms.mm)
                .second(endTime.hms.ss)
                .format("HH:mm:ss")
            }}
          </template>
        </template>
        <template v-else> -- </template>
      </span>
    </PanelFoot>
  </div>
</template>
<script lang="ts">
export default {
  name: "DateRange",
};
</script>
<script lang="ts" setup>
import { computed, inject, reactive, ref, watch } from "vue";
import { provideType } from "../interface";
import { setDateList } from "../day";
import PanelFoot from "./PanelFoot.vue";
import DateContent from "./components/DateContent.vue";
import TimePanel from "./TimePanel.vue";
import YearPanel from "./YearPanel.vue";
import MonthPanel from "./MonthPanel.vue";
import LayDropdown from "../../dropdown/index.vue";
import dayjs from "dayjs";
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

const datePicker: provideType = inject("datePicker") as provideType;

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

const prevDateList = ref<any>([]);
const nextDateList = ref<any>([]);
const startTime = reactive({
  year: props.startTime ? dayjs(props.startTime).year() : dayjs().year(),
  month: props.startTime ? dayjs(props.startTime).month() : dayjs().month(),
  day: props.startTime ? dayjs(props.startTime).startOf("day").valueOf() : -1,
  hms: {
    hh: props.startTime ? dayjs(props.startTime).hour() : 0,
    mm: props.startTime ? dayjs(props.startTime).minute() : 0,
    ss: props.startTime ? dayjs(props.startTime).second() : 0,
  },
});
const endTime = reactive({
  year: props.endTime ? dayjs(props.endTime).year() : dayjs().year(),
  month: props.endTime ? dayjs(props.endTime).month() : dayjs().month(),
  day: props.endTime ? dayjs(props.endTime).startOf("day").valueOf() : -1,
  hms: {
    hh: props.endTime ? dayjs(props.endTime).hour() : 0,
    mm: props.endTime ? dayjs(props.endTime).minute() : 0,
    ss: props.endTime ? dayjs(props.endTime).second() : 0,
  },
});
const hoverDate = ref(-1);

// 切换年月
const changeYearOrMonth = (type: "year" | "month", num: number) => {
  if (type === "year") {
    startTime.year += num;
  } else {
    let month = startTime.month + num;
    if (month > 11) {
      month = 0;
      startTime.year++;
    } else if (month < 0) {
      month = 11;
      startTime.year--;
    }
    startTime.month = month;
  }
};

// 监听年月, 刷新日期
watch(
  () => [startTime.year, startTime.month],
  () => {
    prevDateList.value = setDateList(startTime.year, startTime.month);
    nextDateList.value = setDateList(startTime.year, startTime.month + 1);
  },
  { immediate: true }
);

//关闭选择时间的面板
const dropdownTimePanelRefLeft = ref();
const dropdownTimePanelRefRight = ref();
const dropdownYearPanelRefLeft = ref();
const dropdownYearPanelRefRight = ref();
const dropdownMonthPanelRefLeft = ref();
const dropdownMonthPanelRefRight = ref();
const closeTimePanel = () => {
  if (dropdownTimePanelRefLeft.value) dropdownTimePanelRefLeft.value.hide();
  if (dropdownTimePanelRefRight.value) dropdownTimePanelRefRight.value.hide();
  if (dropdownYearPanelRefLeft.value) dropdownYearPanelRefLeft.value.hide();
  if (dropdownMonthPanelRefLeft.value) dropdownMonthPanelRefLeft.value.hide();
};
const closeRightYearPanel = () => {
  if (dropdownYearPanelRefRight.value) dropdownYearPanelRefRight.value.hide();
  startTime.year = endTime.year;
};
const closeRightMonthPanel = () => {
  dropdownMonthPanelRefRight.value.hide();
  let month = endTime.month - 1;
  if (month > 11) {
    month = 0;
    startTime.year++;
  } else if (month < 0) {
    month = 11;
    startTime.year--;
  }
  startTime.month = month;
};

//关闭回调
const footOnOk = () => {
  let format =
    datePicker.type === "datetime" ? "YYYY-MM-DD HH:mm:ss" : "YYYY-MM-DD";
  let startTimeVal =
    startTime.day !== -1 && endTime.day !== -1
      ? dayjs(startTime.day)
          .hour(startTime.hms.hh)
          .minute(startTime.hms.mm)
          .second(startTime.hms.ss)
          .format(format)
      : "";
  let endTimeVal =
    startTime.day !== -1 && endTime.day !== -1
      ? dayjs(endTime.day)
          .hour(endTime.hms.hh)
          .minute(endTime.hms.mm)
          .second(endTime.hms.ss)
          .format(format)
      : "";
  emits("update:startTime", startTimeVal);
  emits("update:endTime", endTimeVal);
  datePicker.ok();
};

//现在回调
const footOnNow = () => {
  startTime.year = dayjs().year();
  startTime.month = dayjs().month();
  startTime.day = new Date(new Date().toDateString()).getTime();
  startTime.hms.hh = dayjs().hour();
  startTime.hms.mm = dayjs().minute();
  startTime.hms.ss = dayjs().second();
  endTime.day = -1;
};

//清空回调
const footOnClear = () => {
  startTime.day = -1;
  endTime.day = -1;
};
</script>
