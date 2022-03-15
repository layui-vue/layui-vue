<template>
  <div>
    <lay-dropdown>
      <lay-input v-model="dateValue" readonly />
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
                <span @click="showYearPanel">{{ curYear }} 年</span
                ><span @click="showPanel = 'month'">{{ curMonth + 1 }} 月</span>
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
                  :class="[{ 'layui-this': curYear === item }]"
                  @click="
                    curYear = item;
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

        <div class="layui-laydate" v-show="showPanel === 'month'">
          <div class="layui-laydate-main laydate-main-list-0 laydate-ym-show">
            <div class="layui-laydate-header">
              <i
                class="layui-icon laydate-icon laydate-prev-y"
                @click="changeYearOrMonth('year', -1)"
                ></i
              >
              <div class="laydate-set-ym">
                <span @click="showYearPanel">{{ curYear }} 年</span
                ><span @click="showPanel = 'month'">{{ curMonth + 1 }} 月</span>
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
                    { 'layui-this': MONTH_NAME.indexOf(item) === curMonth },
                  ]"
                  @click="
                    curMonth = MONTH_NAME.indexOf(item);
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

        <div class="layui-laydate" v-if="showPanel == 'time'">
          <div class="layui-laydate-main laydate-main-list-0 laydate-time-show">
            <div class="layui-laydate-header">
              <div class="laydate-set-ym">
                <span class="laydate-time-text">选择时间</span>
              </div>
            </div>
            <div class="layui-laydate-content" style="height: 210px">
              <ul class="layui-laydate-list laydate-time-list">
                <li
                  class="num-list"
                  v-for="item in hms.insertEls"
                  :key="item.type"
                >
                  <ol class="scroll" @click="chooseTime">
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
import { computed, nextTick, ref, watch, defineProps, defineEmits } from "vue";
import LayInput from "../input/index.vue";
import LayDropdown from "../dropdown/index.vue";

defineProps({
  modelValue: { type: String, required: false },
});

const $emits = defineEmits(["update:modelValue"]);
const currentDate = new Date();
const yearList = ref<number[]>([]);
const dateList = ref<any[]>([]);
const curYear = ref(currentDate.getFullYear());
const curMonth = ref(currentDate.getMonth());
const showPanel = ref("date");
const showDropdown = ref(false);
const selectedDay = ref<number>();

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
  hh: "00",
  mm: "00",
  ss: "00",
  insertEls: [
    {
      count: 24,
      type: "hh",
    },
    {
      count: 60,
      type: "mm",
    },
    {
      count: 60,
      type: "ss",
    },
  ],
});

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

// 生成近100年的年份列表
(() => {
  for (let i = 1970; i < curYear.value + 100; i++) {
    yearList.value.push(i);
  }
})();

// 获取传入的月份有多少天
const getDayLength = (year: number, month: number): number => {
  return new Date(year, month + 1, 0).getDate();
};

// 设置日期列表
const setDateList = (year: number, month: number) => {
  const curDays = getDayLength(year, month); // 当月天数
  const prevDays = getDayLength(year, month - 1); // 上月天数
  const curFirstDayWeek = new Date(year, month, 1).getDay(); // 当月第一天星期几
  const list: any[] = [];
  // 填充上月最后几天
  for (let i = prevDays - curFirstDayWeek + 1; i <= prevDays; i++) {
    list.push({
      day: i,
      value: +new Date(year, month - 1, i),
      isRange: false,
      isSelected: false,
      type: "prev",
    });
  }

  // 填充当月
  for (let i = 1; i <= curDays; i++) {
    list.push({
      day: i,
      value: +new Date(year, month, i),
      isRange: false,
      isSelected: false,
      type: "current",
    });
  }

  const nextDays = 7 - (list.length % 7);
  if (nextDays !== 7) {
    // 填充下月
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

watch(
  [curYear, curMonth],
  () => {
    setDateList(curYear.value, curMonth.value);
  },
  { immediate: true }
);

// 点击日期
const handleDayClick = (item: any) => {
  selectedDay.value = item.value;
  if (item.type !== "current") {
    curMonth.value =
      item.type === "prev" ? curMonth.value - 1 : curMonth.value + 1;
  }
  showDropdown.value = false;
};

// 切换年月
const changeYearOrMonth = (type: "year" | "month", num: number) => {
  if (type === "year") {
    curYear.value += num;
  } else {
    let month = curMonth.value + num;

    if (month > 11) {
      month = 0;
      curYear.value++;
    } else if (month < 0) {
      month = 11;
      curYear.value--;
    }
    curMonth.value = month;
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

const showHmPanel = ref(false);

const openHmPanel = () => {
  let activeEl = document.querySelectorAll(".hms-change .isactive") as any;
  let count = 0;
  const initScrollIntoView = () => {
    if (count > activeEl.length) return;
    activeEl[count].scrollIntoView({ behavior: "smooth" });
    count++;
    setTimeout(initScrollIntoView, Number(activeEl[count].dataset.value) * 16);
  };

  initScrollIntoView();
  showHmPanel.value = !showHmPanel.value;
};

const chooseTime = (e: any) => {
  if (e.target.nodeName == "LI") {
    let { value, type } = e.target.dataset;
    hms.value[type as keyof typeof hms.value] = value;
    e.target.scrollIntoView({ behavior: "smooth" });
  }
};
</script>
