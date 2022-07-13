<template>
  <div>
    <lay-dropdown ref="dropdownRef" :disabled="props.disabled">
      <lay-input readonly :name="name" :model-value="dateValue || modelValue" :placeholder="placeholder"
        prefix-icon="layui-icon-date">
      </lay-input>
      <template #content>
        <!-- 日期选择 -->
        <div class="layui-laydate" v-show="showPane === 'date' || showPane === 'datetime'">
          <div class="layui-laydate-main laydate-main-list-0">
            <div class="layui-laydate-header">
              <i class="layui-icon laydate-icon laydate-prev-y" @click="changeYearOrMonth('year', -1)"></i>
              <i class="layui-icon laydate-icon laydate-prev-m" @click="changeYearOrMonth('month', -1)"></i>
              <div class="laydate-set-ym">
                <span @click="showYearPanel">{{ currentYear }} 年</span>
                <span @click="showPane = 'month'">{{ currentMonth + 1 }} 月</span>
              </div>
              <i class="layui-icon laydate-icon laydate-next-m" @click="changeYearOrMonth('month', 1)"></i>
              <i class="layui-icon laydate-icon laydate-next-y" @click="changeYearOrMonth('year', 1)"></i>
            </div>
            <div class="layui-laydate-content">
              <table>
                <thead>
                  <tr>
                    <th v-for="item of WEEK_NAME" :key="item">{{ item }}</th>
                  </tr>
                </thead>
                <tbody>
                  <template v-for="(o, i) of dateList.length % 7 == 0
                  ? dateList.length / 7
                  : Math.floor(dateList.length / 7) + 1" :key="i">
                    <tr>
                      <td v-for="(item, index) of dateList.slice(
                        i * 7,
                        i * 7 + 7
                      )" :key="index" :data-unix="item.value" :class="{
  'laydate-day-prev': item.type !== 'current',
  'layui-this': item.value === currentDay,
}" @click="handleDayClick(item)">
                        {{ item.day }}
                      </td>
                    </tr>
                  </template>
                </tbody>
              </table>
            </div>
          </div>
          <div class="layui-laydate-footer">
            <span v-if="type === 'datetime'" @click="showPane = 'time'" class="laydate-btns-time">选择时间</span>
            <div class="laydate-footer-btns">
              <span lay-type="clear" class="laydate-btns-clear" @click="clear">清空</span>
              <span lay-type="now" class="laydate-btns-now" @click="now">现在</span>
              <span lay-type="confirm" class="laydate-btns-confirm" @click="ok">确定</span>
            </div>
          </div>
        </div>
        <!-- 年份选择器 -->
        <div class="layui-laydate" v-show="showPane === 'year' || showPane === 'yearmonth'">
          <div class="layui-laydate-main laydate-main-list-0 laydate-ym-show">
            <div class="layui-laydate-header">
              <div class="laydate-set-ym">
                <span class="laydate-time-text">选择年份</span>
              </div>
            </div>
            <div class="layui-laydate-content" style="height: 220px; overflow-y: auto">
              <ul class="layui-laydate-list laydate-year-list">
                <li v-for="item of yearList" :key="item" :class="[{ 'layui-this': currentYear === item }]"
                  @click="handleYearClick(item)">
                  {{ item }}
                </li>
              </ul>
            </div>
          </div>
          <div class="layui-laydate-footer">
            <span class="layui-laydate-preview" title="当前选中的结果" style="color: rgb(102, 102, 102)">{{ dateValue }}</span>
            <div class="laydate-footer-btns">
              <span lay-type="clear" class="laydate-btns-clear" @click="clear">清空</span>
              <span lay-type="now" class="laydate-btns-now" @click="now">现在</span>
              <span lay-type="confirm" class="laydate-btns-confirm" @click="ok">确定</span>
            </div>
          </div>
        </div>
        <!-- 月份选择器 -->
        <div class="layui-laydate" v-show="showPane === 'month'">
          <div class="layui-laydate-main laydate-main-list-0 laydate-ym-show">
            <div class="layui-laydate-header">
              <i class="layui-icon laydate-icon laydate-prev-y" @click="changeYearOrMonth('year', -1)"></i>
              <div class="laydate-set-ym">
                <span @click="showYearPanel" v-if="showPane === 'date' || showPane === 'datetime'">{{ currentYear }}
                  年</span>
                <span @click="showPane = 'month'">{{ currentMonth + 1 }} 月</span>
              </div>
              <i class="layui-icon laydate-icon laydate-next-y" @click="changeYearOrMonth('year', 1)"></i>
            </div>
            <div class="layui-laydate-content" style="height: 220px">
              <ul class="layui-laydate-list laydate-month-list">
                <li v-for="item of MONTH_NAME" :key="item" :class="[
                  { 'layui-this': MONTH_NAME.indexOf(item) === currentMonth },
                ]" @click="handleMonthClick(item)">
                  {{ item.slice(0, 3) }}
                </li>
              </ul>
            </div>
          </div>
          <div class="layui-laydate-footer">
            <span class="layui-laydate-preview" title="当前选中的结果" style="color: rgb(102, 102, 102)">{{ dateValue }}</span>
            <div class="laydate-footer-btns">
              <span lay-type="clear" class="laydate-btns-clear" @click="clear">清空</span>
              <span lay-type="now" class="laydate-btns-now" @click="now">现在</span>
              <span lay-type="confirm" class="laydate-btns-confirm" @click="ok">确定</span>
            </div>
          </div>
        </div>
        <!-- 时间选择器 -->
        <div class="layui-laydate" v-if="showPane == 'time'">
          <div class="layui-laydate-main laydate-main-list-0 laydate-time-show">
            <div class="layui-laydate-header">
              <div class="laydate-set-ym">
                <span class="laydate-time-text">选择时间</span>
              </div>
            </div>
            <div class="layui-laydate-content" style="height: 210px">
              <ul class="layui-laydate-list laydate-time-list">
                <li class="num-list" v-for="item in els" :key="item.type">
                  <ol class="scroll" @click="choseTime">
                    <li v-for="(it, index) in item.count" :id="item.type + index.toString()"
                      :data-value="index.toString().padStart(2, '0')" :data-type="item.type" :key="it" :class="[
                        'num',
                        index.toString().padStart(2, '0') == hms[item.type]
                          ? 'layui-this'
                          : '',
                      ]">
                      {{ index.toString().padStart(2, "0") }}
                    </li>
                  </ol>
                </li>
              </ul>
            </div>
          </div>
          <div class="layui-laydate-footer">
            <span @click="showPane = 'date'" v-if="type != 'time'" class="laydate-btns-time">返回日期</span>
            <div class="laydate-footer-btns">
              <span lay-type="clear" class="laydate-btns-clear" @click="clear">清空</span>
              <span lay-type="now" class="laydate-btns-now" @click="now">现在</span>
              <span lay-type="confirm" class="laydate-btns-confirm" @click="ok">确定</span>
            </div>
          </div>
        </div>
      </template>
    </lay-dropdown>
  </div>
</template>

<script lang="ts">
export default {
  name: "LayDatePicker",
};
</script>

<script lang="ts" setup>
import "./index.less";
import dayjs from "dayjs";
import { LayIcon } from "@layui/icons-vue";
import LayInput from "../input/index.vue";
import LayDropdown from "../dropdown/index.vue";
import { getDayLength, getYears, getMonth, getYear } from "./day";
import { ref, watch, computed, defineProps, defineEmits, onMounted } from "vue";

export interface LayDatePickerProps {
  type?: "date" | "datetime" | "year" | "time" | "month" | "yearmonth";
  placeholder?: string;
  modelValue?: string;
  disabled?: boolean;
  simple?: boolean;
  name?: string;
  max?: string;
  min?: string;
}

const props = withDefaults(defineProps<LayDatePickerProps>(), {
  modelValue: "",
  type: "date",
  disabled: false,
  simple: false,
});

const dropdownRef = ref(null);
const $emits = defineEmits(["update:modelValue"]);

const WEEK_NAME = ["日", "一", "二", "三", "四", "五", "六"];
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

const hms = ref({
  hh: dayjs(props.modelValue).hour(),
  mm: dayjs(props.modelValue).minute(),
  ss: dayjs(props.modelValue).second(),
});

const els = [
  { count: 24, type: "hh" },
  { count: 60, type: "mm" },
  { count: 60, type: "ss" },
];

const currentYear = ref(getYear());
const currentMonth = ref(getMonth());
const currentDay = ref<number>();

const yearList = ref<number[]>(getYears());
const dateList = ref<any[]>([]);
const showPane = ref("date");

watch(
  () => props.type,
  () => {
    showPane.value = props.type;
  },
  { immediate: true }
);

onMounted(() => {
  currentDay.value = new Date(props.modelValue).getTime();
  hms.value.hh = dayjs(props.modelValue).hour();
  hms.value.mm = dayjs(props.modelValue).minute();
  hms.value.ss = dayjs(props.modelValue).second();
});

// 计算结果日期
const dateValue = computed<string>(() => {
  if (currentDay.value === -1) {
    $emits("update:modelValue", "");
    return "";
  }
  let dayjsVal;
  let dayjsObj = dayjs(currentDay.value)
    .hour(hms.value.hh)
    .minute(hms.value.mm)
    .second(hms.value.ss);
  switch (props.type) {
    case "date":
      dayjsVal = dayjsObj.format("YYYY-MM-DD");
      break;
    case "datetime":
      dayjsVal = dayjsObj.format("YYYY-MM-DD HH:mm:ss");
      break;
    case "year":
      dayjsVal = dayjsObj.format("YYYY");
      break;
    case "month":
      dayjsVal = dayjsObj.format("MM");
      break;
    case "time":
      dayjsVal = dayjsObj.format("HH:mm:ss");
      break;
    case "yearmonth":
      dayjsVal = dayjsObj.format("YYYY-MM");
      break;
    default:
      dayjsVal = dayjsObj.format();
      break;
  }
  $emits("update:modelValue", dayjsVal);
  if (props.simple && unWatch.value) {
    ok();
  }
  setTimeout(() => {
    unWatch.value = false;
  }, 0);
  return dayjsVal;
});

// 设置日期列表
const setDateList = (year: number, month: number) => {
  const curDays = getDayLength(year, month); // 当月天数
  const prevDays = getDayLength(year, month - 1); // 上月天数
  const curFirstDayWeek = new Date(year, month, 1).getDay(); // 当月第一天星期几
  const list: any[] = [];
  // 填充上月天数
  for (let i = prevDays - curFirstDayWeek + 1; i <= prevDays; i++) {
    list.push({
      day: i,
      value: +new Date(year, month - 1, i),
      isRange: false,
      isSelected: false,
      type: "prev",
    });
  }
  // 填充当月天数
  for (let i = 1; i <= curDays; i++) {
    list.push({
      day: i,
      value: +new Date(year, month, i),
      isRange: false,
      isSelected: false,
      type: "current",
    });
  }
  // 填充下月天数
  const nextDays = 7 - (list.length % 7);
  if (nextDays !== 7) {
    for (let i = 1; i <= nextDays; i++) {
      list.push({
        day: i,
        value: +new Date(year, month + 1, i),
        isRange: false,
        isSelected: false,
        type: "next",
      });
    }
  }
  dateList.value = list;
};

// 监听年月, 刷新日期
watch(
  [currentYear, currentMonth],
  () => {
    setDateList(currentYear.value, currentMonth.value);
  },
  { immediate: true }
);
const unWatch = ref(true)
watch(() => props.modelValue, () => {
  if (!unWatch.value) {
    currentDay.value = new Date(props.modelValue).getTime();
  }
})
// 确认事件
const ok = () => {
  if (dropdownRef.value)
    // @ts-ignore
    dropdownRef.value.hide();
};

// 现在时间
const now = () => {
  unWatch.value = true
  currentDay.value = dayjs().valueOf();
  hms.value.hh = dayjs().hour();
  hms.value.mm = dayjs().minute();
  hms.value.ss = dayjs().second();
};

// 清空日期
const clear = () => {
  unWatch.value = true
  currentDay.value = -1;
};

// 切换年月
const changeYearOrMonth = (type: "year" | "month", num: number) => {
  if (type === "year") {
    currentYear.value += num;
  } else {
    let month = currentMonth.value + num;
    if (month > 11) {
      month = 0;
      currentYear.value++;
    } else if (month < 0) {
      month = 11;
      currentYear.value--;
    }
    currentMonth.value = month;
  }
};

// 显示年列表面板
const showYearPanel = () => {
  showPane.value = "year";
};

// 点击年份
const handleYearClick = (item: any) => {
  unWatch.value = true
  currentYear.value = item;
  if (props.type === "year") {
    currentDay.value = dayjs().year(item).valueOf();
  } else if (props.type === "yearmonth") {
    currentDay.value = dayjs().year(item).valueOf();
    showPane.value = "month";
  } else {
    showPane.value = "date";
  }
};

// 点击月份
const handleMonthClick = (item: any) => {
  unWatch.value = true
  currentMonth.value = MONTH_NAME.indexOf(item);
  if (props.type === "month") {
    currentDay.value = dayjs(currentDay.value)
      .month(MONTH_NAME.indexOf(item))
      .valueOf();
  } else if (props.type === "yearmonth") {
    currentDay.value = dayjs(currentDay.value)
      .month(MONTH_NAME.indexOf(item))
      .valueOf();
  } else {
    showPane.value = "date";
  }
};

// 点击日期
const handleDayClick = (item: any) => {
  unWatch.value = true
  currentDay.value = item.value;
  if (item.type !== "current") {
    currentMonth.value =
      item.type === "prev" ? currentMonth.value - 1 : currentMonth.value + 1;
  }
};

// 点击时间 - hms
const choseTime = (e: any) => {
  unWatch.value = true
  if (e.target.nodeName == "LI") {
    let { value, type } = e.target.dataset;
    hms.value[type as keyof typeof hms.value] = value;
  }
};
</script>
