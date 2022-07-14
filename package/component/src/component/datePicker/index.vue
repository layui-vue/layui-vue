<template>
  <div>
    <lay-dropdown ref="dropdownRef" :disabled="disabled" @open="openDropDown">
      <lay-input readonly :name="name" :model-value="dateValue" :placeholder="placeholder" prefix-icon="layui-icon-date"
        :disabled="disabled">
      </lay-input>
      <template #content>
        <!-- 日期选择 -->
        <DatePanel v-if="!range && (showPanel === 'date' || showPanel === 'datetime')">
        </DatePanel>
        <!-- 时间选择 -->
        <TimePanel v-if="!range && showPanel === 'time'"></TimePanel>
        <!-- 年份选择器 -->
        <YearPanel v-if="!range && (showPanel === 'year' || showPanel === 'yearmonth')"></YearPanel>
        <!-- 月份选择器 -->
        <MonthPanel v-if="!range && showPanel === 'month'"></MonthPanel>
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
import { getDayLength, getYears, getMonth, getYear, getDay } from "./day";
import { ref, watch, computed, defineProps, defineEmits, onMounted, nextTick, reactive, provide } from "vue";
import DatePanel from './components/DatePanel.vue';
import TimePanel from './components/TimePanel.vue';
import YearPanel from './components/YearPanel.vue';
import MonthPanel from './components/MonthPanel.vue';

export interface LayDatePickerProps {
  type?: "date" | "datetime" | "year" | "time" | "month" | "yearmonth";
  placeholder?: string;
  modelValue?: string;
  disabled?: boolean;
  simple?: boolean;
  name?: string;
  max?: string;
  min?: string;
  range?: boolean
}

const props = withDefaults(defineProps<LayDatePickerProps>(), {
  modelValue: "",
  type: "date",
  disabled: false,
  simple: false,
  range: false
});

const dropdownRef = ref(null);
const $emits = defineEmits(["update:modelValue"]);



const hms = ref({
  hh: dayjs(props.modelValue).hour(),
  mm: dayjs(props.modelValue).minute(),
  ss: dayjs(props.modelValue).second(),
});

const currentYear = ref(getYear(props.modelValue));
const currentMonth = ref(getMonth(props.modelValue));
const currentDay = ref<number>(getDay(props.modelValue));

const yearList = ref<number[]>(getYears());
const dateList = ref<any[]>([]);
const dateListNext = ref<any[]>([]);
const showPanel = ref("date");

const yearmonthScrollRef = ref()

watch(
  () => props.type,
  () => {
    showPanel.value = props.type;
    if (props.type === 'yearmonth') {
      showPanel.value = 'year';
    }
  },
  { immediate: true }
);

onMounted(() => {
  //初始值为空时的容错
  if (currentDay.value == -1) {
    setTimeout(() => {
      now();
      clear();
    }, 0);
  }
  let modelValue = props.modelValue;
  if (modelValue.length === 8) { //dayjs 解析时间容错
    modelValue = '1970-01-01 ' + modelValue;
  }
  hms.value.hh = dayjs(modelValue).hour();
  hms.value.mm = dayjs(modelValue).minute();
  hms.value.ss = dayjs(modelValue).second();
  getDateValue()
});

// 计算结果日期
const dateValue = ref('')
const getDateValue = (checkCurrentDay = true) => {
  if (checkCurrentDay) {
    if (currentDay.value === -1) {
      $emits("update:modelValue", "");
      return "";
    }
  } else {
    if (currentDay.value === -1) {
      currentDay.value = new Date(new Date().toDateString()).getTime();
    }
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
  dateValue.value = dayjsVal;
  $emits("update:modelValue", dayjsVal);
  return dayjsVal;
};

// 确认事件
const ok = () => {
  getDateValue(false)
  if (dropdownRef.value)
    // @ts-ignore
    dropdownRef.value.hide();
};

// 现在时间
const now = () => {
  currentDay.value = dayjs().valueOf();
  hms.value.hh = dayjs().hour();
  hms.value.mm = dayjs().minute();
  hms.value.ss = dayjs().second();
};

// 清空日期
const clear = () => {
  currentDay.value = -1;
};

//simple
watch(currentDay, () => {
  if (props.simple) {
    getDateValue();
    ok();
  }
})
watch(currentMonth, () => {
  if (props.simple && props.type !== 'date') {
    getDateValue();
    ok();
  }
})
watch(currentYear, () => {
  if (props.simple && props.type !== 'date') {
    getDateValue();
    ok();
  }
})

provide('datePicker', {
  currentYear: currentYear,
  currentMonth: currentMonth,
  currentDay: currentDay,
  dateValue: dateValue,
  type: props.type,
  showPanel: showPanel,
  dateList: dateList,
  yearList: yearList,
  hms: hms,
  clear: () => clear(),
  now: () => now(),
  ok: () => ok(),
  getDateValue: () => getDateValue,
  range: props.range
});

const openDropDown = () => {
  nextTick(() => {
    // if (showPanel.value == 'year' || showPanel.value == 'yearmonth') {
    //   let scrollTop = 0;
    //   for (const child of yearmonthScrollRef.value.firstElementChild.childNodes) {
    //     if (child.classList && child.classList.contains('layui-this')) {
    //       scrollTop = child.offsetTop - (yearmonthScrollRef.value.offsetHeight - child.offsetHeight) / 2;
    //       break;
    //     }
    //   }
    //   yearmonthScrollRef.value.scrollTo(0, scrollTop)
    // } else if (showPanel.value == 'time') {
    //   scrollToCurrentTime()
    // }
  })
}

//时间定位
const timePanelRef = ref()
const scrollToCurrentTime = () => {
  nextTick(() => {
    timePanelRef.value.childNodes.forEach((element: HTMLElement) => {
      if (element.nodeName === "LI") {
        let scrollTop = 0;
        let parentDom = element.firstElementChild as HTMLElement;
        let childList = parentDom.childNodes;
        for (let index = 0; index < childList.length; index++) {
          const child = childList[index] as HTMLElement;
          if (child.nodeName !== "LI") {
            continue;
          }
          if (child.classList && child.classList.contains("layui-this")) {
            scrollTop =
              child.offsetTop -
              (parentDom.offsetHeight - child.offsetHeight) / 2;
            parentDom.scrollTo(0, scrollTop);
            break;
          }
        }
      }
    });
  })
}

//范围选择
const rangeValue = reactive({
  first: '', last: '', hover: ''
})
const dayItemMouseEnter = (event: MouseEvent, item: any) => {
  if (!props.range) {
    return;
  }
  if (!rangeValue.first) {
    return;
  }
  if (item.type !== 'current') {
    return;
  }
  rangeValue.hover = (event.target as HTMLElement).dataset.unix as string
}
const ifHasRangeHoverClass = computed(() => {
  return function (item: any) {
    if (!props.range) {
      return false
    }
    if (!rangeValue.first) {
      return false
    }
    if (item.type !== 'current') {
      return false
    }
    if (item.value == parseInt(rangeValue.first) || item.value == parseInt(rangeValue.last)) {
      return true;
    }
    let hover = rangeValue.last ? rangeValue.last : rangeValue.hover;
    let max = rangeValue.first > hover ? rangeValue.first : hover;
    let min = rangeValue.first < hover ? rangeValue.first : hover
    if (item.value >= parseInt(min) && item.value <= parseInt(max)) {
      return true
    }
    return false
  }
})
</script>
