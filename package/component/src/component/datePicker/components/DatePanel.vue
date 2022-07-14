<template>
  <div class="layui-laydate">
    <div class="layui-laydate-main laydate-main-list-0">
      <div class="layui-laydate-header">
        <i class="layui-icon laydate-icon laydate-prev-y" @click="changeYearOrMonth('year', -1)"></i>
        <i class="layui-icon laydate-icon laydate-prev-m" @click="changeYearOrMonth('month', -1)"></i>
        <div class="laydate-set-ym">
          <span @click="datePicker.showPanel.value = 'year'">{{ datePicker.currentYear.value }} 年</span>
          <span @click="datePicker.showPanel.value = 'month'">{{ datePicker.currentMonth.value + 1 }} 月</span>
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
            <template v-for="(o, i) of datePicker.dateList.value.length % 7 == 0
            ? datePicker.dateList.value.length / 7
            : Math.floor(datePicker.dateList.value.length / 7) + 1" :key="i">
              <tr>
                <td v-for="(item, index) of datePicker.dateList.value.slice(
                  i * 7,
                  i * 7 + 7
                )" :key="index" :data-unix="item.value" :class="{
  'laydate-day-prev': item.type !== 'current',
  'layui-this': item.value === datePicker.currentDay.value || (range && (item.value == parseInt(rangeValue.first) || item.value == parseInt(rangeValue.last))),
  'laydate-range-hover': ifHasRangeHoverClass(item),
}" @click="handleDayClick(item)" @mouseenter="dayItemMouseEnter($event, item)">
                  {{ item.day }}
                </td>
              </tr>
            </template>
          </tbody>
        </table>
      </div>
      <PanelFoot></PanelFoot>
    </div>
  </div>
</template>
<script lang="ts">
export default {
  name: "DatePanel",
};
</script>
<script lang="ts" setup>
import { computed, inject, ref, watch } from 'vue';
import { provideType } from '../interface';
import { setDateList } from '../day';
import PanelFoot from './PanelFoot.vue'

export interface Props {
  range?: boolean,
  rangeValue?: { first: string, last: string, hover: string }
}

const props = withDefaults(defineProps<Props>(), {
  range: false,
  rangeValue: () => { return { first: '', last: '', hover: '' } }
});

const datePicker: provideType = inject('datePicker') as provideType;
const WEEK_NAME = ["日", "一", "二", "三", "四", "五", "六"];





// 监听年月, 刷新日期
watch(
  [datePicker.currentYear, datePicker.currentMonth],
  () => {
    datePicker.dateList.value = setDateList(datePicker.currentYear.value, datePicker.currentMonth.value);
  },
  { immediate: true }
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

// 点击日期
const handleDayClick = (item: any) => {
  if (props.range) {
    if (item.type !== "current") {
      return;
    }
  }
  datePicker.currentDay.value = item.value;

  if (item.type !== "current") {
    datePicker.currentMonth.value = item.type === "prev" ? datePicker.currentMonth.value - 1 : datePicker.currentMonth.value + 1;
  }

  if (props.range) {
    if (props.rangeValue.first === '' && props.rangeValue.last === '') {
      //props.rangeValue.first = item.value
    } else if (props.rangeValue.first !== '' && props.rangeValue.last !== '') {
      // rangeValue.first = item.value
      // rangeValue.last = ''
    } else if (props.rangeValue.first !== '' && props.rangeValue.last === '') {
      //rangeValue.last = item.value
    }
  }
};

const dayItemMouseEnter = (event: MouseEvent, item: any) => {
  if (!props.range) {
    return;
  }
  if (!props.rangeValue.first) {
    return;
  }
  if (item.type !== 'current') {
    return;
  }
  //rpropsangeValue.hover = (event.target as HTMLElement).dataset.unix as string
}
const ifHasRangeHoverClass = computed(() => {
  return function (item: any) {
    if (!props.range) {
      return false
    }
    if (!props.rangeValue.first) {
      return false
    }
    if (item.type !== 'current') {
      return false
    }
    if (item.value == parseInt(props.rangeValue.first) || item.value == parseInt(props.rangeValue.last)) {
      return true;
    }
    let hover = props.rangeValue.last ? props.rangeValue.last : props.rangeValue.hover;
    let max = props.rangeValue.first > hover ? props.rangeValue.first : hover;
    let min = props.rangeValue.first < hover ? props.rangeValue.first : hover
    if (item.value >= parseInt(min) && item.value <= parseInt(max)) {
      return true
    }
    return false
  }
})

</script>