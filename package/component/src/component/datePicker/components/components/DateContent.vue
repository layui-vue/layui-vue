<template>
  <div class="layui-laydate-content">
    <table>
      <thead>
        <tr>
          <th v-for="item of WEEK_NAME" :key="item">{{ item }}</th>
        </tr>
      </thead>
      <tbody>
        <template
          v-for="(o, i) of dateList.value.length % 7 == 0
            ? dateList.value.length / 7
            : Math.floor(dateList.value.length / 7) + 1"
          :key="i"
        >
          <tr>
            <td
              v-for="(item, index) of dateList.value.slice(i * 7, i * 7 + 7)"
              :key="index"
              :data-unix="item.value"
              :class="{
                'laydate-day-prev': item.type !== 'current',
                'layui-this':
                  item.value === modelValue ||
                  (datePicker.range &&
                    (item.value ==
                      parseInt(datePicker.rangeValue.value.first) ||
                      item.value ==
                        parseInt(datePicker.rangeValue.value.last))),
                'laydate-range-hover': ifHasRangeHoverClass(item),
              }"
              @click="handleDayClick(item)"
              @mouseenter="dayItemMouseEnter($event, item)"
            >
              {{ item.day }}
            </td>
          </tr>
        </template>
      </tbody>
    </table>
  </div>
</template>
<script lang="ts">
export default {
  name: "DateContent",
};
</script>
<script lang="ts" setup>
import { computed, inject, ref, Ref } from "vue";
import { provideType } from "../../interface";

export interface LayDatePickerProps {
  dateList: any;
  modelValue: number;
}

const props = withDefaults(defineProps<LayDatePickerProps>(), {
  dateList: [],
  modelValue: -1,
});
const WEEK_NAME = ["日", "一", "二", "三", "四", "五", "六"];
const datePicker: provideType = inject("datePicker") as provideType;
const emits = defineEmits(["update:modelValue"]);

// 点击日期
const handleDayClick = (item: any) => {
  if (datePicker.range) {
    if (item.type !== "current") {
      return;
    }
  }
  emits("update:modelValue", item.value);

  if (item.type !== "current") {
    datePicker.currentMonth.value =
      item.type === "prev"
        ? datePicker.currentMonth.value - 1
        : datePicker.currentMonth.value + 1;
  }

  if (datePicker.range) {
    if (
      datePicker.rangeValue.value.first === "" &&
      datePicker.rangeValue.value.last === ""
    ) {
      //props.rangeValue.first = item.value
    } else if (
      datePicker.rangeValue.value.first !== "" &&
      datePicker.rangeValue.value.last !== ""
    ) {
      // rangeValue.first = item.value
      // rangeValue.last = ''
    } else if (
      datePicker.rangeValue.value.first !== "" &&
      datePicker.rangeValue.value.last === ""
    ) {
      //rangeValue.last = item.value
    }
  }
};

const dayItemMouseEnter = (event: MouseEvent, item: any) => {
  if (!datePicker.range) {
    return;
  }
  if (!datePicker.rangeValue.value.first) {
    return;
  }
  if (item.type !== "current") {
    return;
  }
  //rpropsangeValue.hover = (event.target as HTMLElement).dataset.unix as string
};
const ifHasRangeHoverClass = computed(() => {
  return function (item: any) {
    if (!datePicker.range) {
      return false;
    }
    if (!datePicker.rangeValue.value.first) {
      return false;
    }
    if (item.type !== "current") {
      return false;
    }
    if (
      item.value == parseInt(datePicker.rangeValue.value.first) ||
      item.value == parseInt(datePicker.rangeValue.value.last)
    ) {
      return true;
    }
    let hover = datePicker.rangeValue.value.last
      ? datePicker.rangeValue.value.last
      : datePicker.rangeValue.value.hover;
    let max =
      datePicker.rangeValue.value.first > hover
        ? datePicker.rangeValue.value.first
        : hover;
    let min =
      datePicker.rangeValue.value.first < hover
        ? datePicker.rangeValue.value.first
        : hover;
    if (item.value >= parseInt(min) && item.value <= parseInt(max)) {
      return true;
    }
    return false;
  };
});
</script>
