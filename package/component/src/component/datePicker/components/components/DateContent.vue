<template>
  <div class="layui-laydate-content">
    <table style="width: 100%">
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
              v-for="(item, index) of dateList.slice(i * 7, i * 7 + 7)"
              :key="index"
              :data-unix="item.value"
              :class="{
                'laydate-day-prev': item.type !== 'current',
                'layui-this':
                  item.value === modelValue ||
                  (datePicker.range &&
                    item.type === 'current' &&
                    (item.value == startDate || item.value == endDate)),
                'laydate-range-hover': ifHasRangeHoverClass(item),
                'layui-disabled': item.type !== 'current' && datePicker.range,
                'layui-laydate-current':
                  modelValue === -1 &&
                  item.value === dayjs().startOf('day').valueOf(),
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
import { useI18n } from "../../../../language";
import { computed, inject } from "vue";
import { provideType } from "../../interface";
import dayjs from "dayjs";

export interface DateContentProps {
  dateList: any;
  modelValue?: number;
  startDate?: number;
  endDate?: number;
  hoverDate?: number;
}

const props = withDefaults(defineProps<DateContentProps>(), {
  dateList: [],
  modelValue: -1,
  hoverDate: -1,
  startDate: -1,
  endDate: -1,
});

const { t } = useI18n();

const WEEK_NAME = computed(() => [
  t("datePicker.sunday"),
  t("datePicker.monday"),
  t("datePicker.tuesday"),
  t("datePicker.wednesday"),
  t("datePicker.thursday"),
  t("datePicker.friday"),
  t("datePicker.saturday"),
]);

const datePicker: provideType = inject("datePicker") as provideType;

const emits = defineEmits([
  "update:modelValue",
  "update:startDate",
  "update:endDate",
  "update:hoverDate",
  "simple",
]);

// 点击日期
const handleDayClick = (item: any) => {
  if (datePicker.range) {
    if (item.type !== "current") {
      return;
    }

    if (props.startDate === -1 && props.endDate === -1) {
      emits("update:startDate", item.value);
    } else if (props.startDate !== -1 && props.endDate !== -1) {
      emits("update:hoverDate", item.value);
      emits("update:startDate", item.value);
      emits("update:endDate", -1);
    } else if (props.startDate !== -1 && props.endDate === -1) {
      emits("update:endDate", item.value);
      if (item.value < props.startDate) {
        //swap
        const first = props.startDate;
        const last = item.value;
        emits("update:startDate", last);
        emits("update:endDate", first);
      }
    }
  } else {
    emits("update:modelValue", item.value);
    if (item.type !== "current") {
      datePicker.currentMonth.value =
        item.type === "prev"
          ? datePicker.currentMonth.value - 1
          : datePicker.currentMonth.value + 1;
    }
    if (datePicker.simple) {
      emits("simple");
    }
  }
};

const dayItemMouseEnter = (event: MouseEvent, item: any) => {
  if (!datePicker.range) {
    return;
  }
  if (props.startDate === -1) {
    return;
  }
  if (item.type !== "current") {
    return;
  }
  if (props.startDate !== -1 && props.endDate !== -1) {
    emits("update:hoverDate", -1);
    return;
  }
  emits(
    "update:hoverDate",
    parseInt((event.target as HTMLElement).dataset.unix as string)
  );
};
const ifHasRangeHoverClass = computed(() => {
  return function (item: any) {
    if (!datePicker.range) {
      return false;
    }
    if (props.startDate === -1) {
      return false;
    }
    if (item.type !== "current") {
      return false;
    }
    if (props.hoverDate === -1 && props.endDate === -1) {
      return false;
    }
    let hover = props.endDate !== -1 ? props.endDate : props.hoverDate;
    let max = props.startDate > hover ? props.startDate : hover;
    let min = props.startDate < hover ? props.startDate : hover;
    if (item.value >= min && item.value <= max) {
      return true;
    }
    return false;
  };
});
</script>
