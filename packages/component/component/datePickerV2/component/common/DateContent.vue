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
                'layui-this': item.value === modelValue,
                'layui-disabled': cellDisabled(item),
                'layui-laydate-current':
                  item.value === dayjs().startOf('day').valueOf(),
                ...classes(item),
              }"
              @click="handleDayClick(item)"
              @mouseenter="dayItemMouseEnter(item)"
            >
              {{ item.day }}
            </td>
          </tr>
        </template>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts" setup>
import { useI18n } from "../../../../language";
import { computed, inject } from "vue";
import { DATE_PICKER_CONTEXT } from "../../interface";
import dayjs from "dayjs";

export interface DateContentProps {
  dateList: any;
  modelValue?: number;
  classes?: (val: any) => Record<string, boolean>;
}

defineOptions({
  name: "DateContent",
});

const props = withDefaults(defineProps<DateContentProps>(), {
  dateList: [],
  modelValue: -1,
  classes: () => ({}),
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

const DatePickerContext = inject(DATE_PICKER_CONTEXT)!;

const emits = defineEmits(["update:modelValue", "hover-cell"]);

// 判断日期是否可以点击
const cellDisabled = computed(() => {
  return (item: { type: string; value: number }) => {
    if (item.type !== "current" && DatePickerContext.range) {
      return true;
    }

    if (
      DatePickerContext.min &&
      dayjs(item.value).isBefore(dayjs(DatePickerContext.min), "day")
    ) {
      return true;
    }

    if (
      DatePickerContext.max &&
      dayjs(item.value).isAfter(dayjs(DatePickerContext.max), "day")
    ) {
      return true;
    }
    return false;
  };
});

// 点击日期
const handleDayClick = (item: any) => {
  if (cellDisabled.value(item)) return;

  if (DatePickerContext.range && item.type !== "current") return;

  emits("update:modelValue", item.value);
};

const dayItemMouseEnter = (item: any) => {
  if (!DatePickerContext.range || cellDisabled.value(item)) return;

  emits("hover-cell", item.value);
};
</script>
