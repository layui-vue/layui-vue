<template>
  <div>
    <lay-dropdown>
      <lay-input :value="dateValue || modelValue" readonly />
      <template #content>
        <!-- 日期选择 -->
        <div class="layui-laydate" v-show="showPanel === 'date'">
          <div class="layui-laydate-main laydate-main-list-0">
            <div class="layui-laydate-header">
              <i
                class="layui-icon laydate-icon laydate-prev-y"
                @click="changeYearOrMonth('year', -1)"
                ></i
              ><i
                class="layui-icon laydate-icon laydate-prev-m"
                @click="changeYearOrMonth('month', -1)"
                ></i
              >
              <div class="laydate-set-ym">
                <span @click="showYearPanel">{{ currentYear }} 年</span
                ><span @click="showPanel = 'month'"
                  >{{ currentMonth + 1 }} 月</span
                >
              </div>
              <i
                class="layui-icon laydate-icon laydate-next-m"
                @click="changeYearOrMonth('month', 1)"
                ></i
              ><i
                class="layui-icon laydate-icon laydate-next-y"
                @click="changeYearOrMonth('year', 1)"
                ></i
              >
            </div>
            <div class="layui-laydate-content">
              <table>
                <thead>
                  <tr>
                    <th v-for="item of WEEK_NAME" :key="item">{{ item }}</th>
                  </tr>
                </thead>
                <tbody>
                  <template
                    v-for="(o, i) of dateList.length % 7 == 0
                      ? dateList.length / 7
                      : Math.floor(dateList.length / 7) + 1"
                    :key="i"
                  >
                    <tr>
                      <td
                        v-for="(item, index) of dateList.slice(
                          i * 7,
                          i * 7 + 7
                        )"
                        :key="index"
                        :data-unix="item.value"
                        :class="{
                          'laydate-day-prev': item.type !== 'current',
                          'layui-this': item.value === selectedDay,
                        }"
                        @click="handleDayClick(item)"
                      >
                        {{ item.day }}
                      </td>
                    </tr>
                  </template>
                </tbody>
              </table>
            </div>
          </div>
          <div class="layui-laydate-footer">
            <span
              v-if="type === 'datetime'"
              @click="showPanel = 'time'"
              class="layui-laydate-preview"
              style="color: rgb(102, 102, 102)"
            >
              {{ `${hms.hh}:${hms.mm}:${hms.ss}` }}
            </span>

            <div class="laydate-footer-btns">
              <span lay-type="clear" class="laydate-btns-clear">清空</span
              ><span lay-type="now" class="laydate-btns-now">现在</span
              ><span lay-type="confirm" class="laydate-btns-confirm">确定</span>
            </div>
          </div>
        </div>

        <!-- 年份选择器 -->
        <div class="layui-laydate" v-show="showPanel === 'year'">
          <div class="layui-laydate-main laydate-main-list-0 laydate-ym-show">
            <div class="layui-laydate-header">
              <div class="laydate-set-ym">
                <span class="laydate-time-text">选择年份</span>
              </div>
            </div>
            <div
              class="layui-laydate-content"
              style="height: 220px; overflow-y: auto"
            >
              <ul class="layui-laydate-list laydate-year-list">
                <li
                  v-for="item of yearList"
                  :key="item"
                  :class="[{ 'layui-this': currentYear === item }]"
                  @click="
                    currentYear = item;
                    showPanel = 'date';
                  "
                >
                  {{ item }}
                </li>
              </ul>
            </div>
          </div>
          <div class="layui-laydate-footer">
            <span
              class="layui-laydate-preview"
              title="当前选中的结果"
              style="color: rgb(102, 102, 102)"
              >2022</span
            >
            <div class="laydate-footer-btns">
              <span lay-type="clear" class="laydate-btns-clear">清空</span
              ><span lay-type="now" class="laydate-btns-now">现在</span
              ><span lay-type="confirm" class="laydate-btns-confirm">确定</span>
            </div>
          </div>
        </div>

        <!-- 月份选择器 -->
        <div class="layui-laydate" v-show="showPanel === 'month'">
          <div class="layui-laydate-main laydate-main-list-0 laydate-ym-show">
            <div class="layui-laydate-header">
              <i
                class="layui-icon laydate-icon laydate-prev-y"
                @click="changeYearOrMonth('year', -1)"
                ></i
              >
              <div class="laydate-set-ym">
                <span @click="showYearPanel">{{ currentYear }} 年</span
                ><span @click="showPanel = 'month'"
                  >{{ currentMonth + 1 }} 月</span
                >
              </div>
              <i
                class="layui-icon laydate-icon laydate-next-y"
                @click="changeYearOrMonth('year', 1)"
                ></i
              >
            </div>
            <div class="layui-laydate-content" style="height: 220px">
              <ul class="layui-laydate-list laydate-month-list">
                <li
                  v-for="item of MONTH_NAME"
                  :key="item"
                  :class="[
                    { 'layui-this': MONTH_NAME.indexOf(item) === currentMonth },
                  ]"
                  @click="
                    currentMonth = MONTH_NAME.indexOf(item);
                    showPanel = 'date';
                  "
                >
                  {{ item.slice(0, 3) }}
                </li>
              </ul>
            </div>
          </div>
          <div class="layui-laydate-footer">
            <span
              class="layui-laydate-preview"
              title="当前选中的结果"
              style="color: rgb(102, 102, 102)"
              >2022-03</span
            >
            <div class="laydate-footer-btns">
              <span lay-type="clear" class="laydate-btns-clear">清空</span
              ><span lay-type="now" class="laydate-btns-now">现在</span
              ><span lay-type="confirm" class="laydate-btns-confirm">确定</span>
            </div>
          </div>
        </div>

        <!-- 时间选择器 -->
        <div class="layui-laydate" v-if="showPanel == 'time'">
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
                    <li
                      v-for="(it, index) in item.count"
                      :id="item.type + index.toString()"
                      :data-value="index.toString().padStart(2, '0')"
                      :data-type="item.type"
                      :key="it"
                      :class="[
                        'num',
                        index.toString().padStart(2, '0') == hms[item.type]
                          ? 'layui-this'
                          : '',
                      ]"
                    >
                      {{ index.toString().padStart(2, "0") }}
                    </li>
                  </ol>
                </li>
              </ul>
            </div>
          </div>
          <div class="layui-laydate-footer">
            <span @click="showPanel = 'date'" class="layui-laydate-preview"
              >返回</span
            >
            <div class="laydate-footer-btns">
              <span lay-type="clear" class="laydate-btns-clear">清空</span
              ><span lay-type="now" class="laydate-btns-now">现在</span
              ><span lay-type="confirm" class="laydate-btns-confirm">确定</span>
            </div>
          </div>
        </div>
      </template>
    </lay-dropdown>
  </div>
</template>

<script lang="ts" setup>
import {
  computed,
  nextTick,
  ref,
  watch,
  defineProps,
  defineEmits,
  onMounted,
} from "vue";
import LayInput from "../input/index.vue";
import LayDropdown from "../dropdown/index.vue";
import { getDayLength, getYears, getDate, getMonth, getYear } from "./day";

const $emits = defineEmits(["update:modelValue"]);

const WEEK_NAME = ["日", "一", "二", "三", "四", "五", "六"];
const MONTH_NAME = ["1月","2月","3月","4月","5月","6月","7月","8月","9月","10月","11月","12月"];

const hms = ref({ hh: "00", mm: "00", ss: "00" });
const els = [
  { count: 24, type: "hh" },
  { count: 60, type: "mm" },
  { count: 60, type: "ss" },
];

export interface LayDatePickerProps {
  modelValue?: string;
  type: "date" | "datetime" | "year" | "time" | "month";
}

const props = withDefaults(defineProps<LayDatePickerProps>(), {
  modelValue: "",
  type: "date",
});

const currentDate = getDate();
const currentYear = ref(getYear());
const currentMonth = ref(getMonth());

const yearList = ref<number[]>(getYears());
const dateList = ref<any[]>([]);
const showPanel = ref("date");
const selectedDay = ref<number>();

// 最终结果
const dateValue = computed<string>(() => {
  if (!selectedDay.value) return "";
  const d = new Date(selectedDay.value);
  const y = d.getFullYear();
  const m = (d.getMonth() + 1).toString().padStart(2, "0");
  const day = d.getDate().toString().padStart(2, "0");
  const currentValue = `${y}-${m}-${day} ${hms.value.hh}:${hms.value.mm}:${hms.value.ss}`;
  $emits("update:modelValue", currentValue);
  return currentValue;
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

// 点击日期
const handleDayClick = (item: any) => {
  selectedDay.value = item.value;
  if (item.type !== "current") {
    currentMonth.value =
      item.type === "prev" ? currentMonth.value - 1 : currentMonth.value + 1;
  }
};

// 确认事件
const ok = () => {};

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
  showPanel.value = "year";
  nextTick(() => {
    (
      document.querySelector(".year-panel-item.active") as HTMLElement
    ).scrollIntoView({ block: "center" });
  });
};

// 点击时间 - hms
const choseTime = (e: any) => {
  if (e.target.nodeName == "LI") {
    let { value, type } = e.target.dataset;
    hms.value[type as keyof typeof hms.value] = value;
    e.target.scrollIntoView({ behavior: "smooth" });
  }
};
</script>
