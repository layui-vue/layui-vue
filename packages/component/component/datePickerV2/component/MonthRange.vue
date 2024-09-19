<script setup lang="ts">
import dayjs, { type Dayjs } from "dayjs";
import { computed, ref, watch } from "vue";
import type { RangePickerProps } from "./interface";

import { useI18n } from "../../../language";

import LayIcon from "../../icon";
import Month from "./common/Month.vue";
import Footer from "./common/Footer.vue";

const props = withDefaults(defineProps<RangePickerProps>(), {});
const emits = defineEmits(["pick"]);

const { t } = useI18n();

const startDate = ref();
const endDate = ref();
const leftDate = ref(dayjs());
const rightDate = ref(dayjs());

const hoverMonth = ref<Dayjs | undefined>();

watch(
  () => props.modelValue,
  () => {
    const [start, end] = props.modelValue;
    startDate.value = start;
    endDate.value = end;
    leftDate.value = start || dayjs();
  },
  { immediate: true }
);

watch(
  () => leftDate.value,
  () => {
    rightDate.value = leftDate.value.add(1, "year");
  },
  { immediate: true }
);

const classes = computed(() => {
  return (Date: Dayjs) => {
    const _endDate = hoverMonth.value || endDate.value;

    return {
      "layui-this":
        startDate.value?.isSame(Date, "month") ||
        endDate.value?.isSame(Date, "month"),
      "laydate-range-hover":
        !!(
          startDate.value &&
          Date.isSameOrAfter(startDate.value, "month") &&
          Date.isSameOrBefore(_endDate, "month")
        ) ||
        !!(
          startDate.value &&
          Date.isSameOrBefore(startDate.value, "month") &&
          Date.isSameOrAfter(_endDate, "month")
        ),
    };
  };
});

const handleMonthPick = (date: Dayjs) => {
  if (!startDate.value || (startDate.value && endDate.value)) {
    startDate.value = date;
    endDate.value = undefined;
  } else if (date.isSameOrBefore(startDate.value, "month")) {
    endDate.value = startDate.value;
    startDate.value = date;
  } else {
    endDate.value = date;
  }
};

const handleMonthHover = (date: Dayjs) => {
  if (!startDate.value || endDate.value) {
    hoverMonth.value = undefined;
    return;
  }

  hoverMonth.value = date;
};

const formatValue = () => {
  // format 正确传 format后的格式，否则传Date对象
  if (startDate.value && endDate.value) {
    return [startDate.value, endDate.value].map((date: Dayjs) => {
      return props.format ? date.format(props.format) : date.toDate();
    });
  } else {
    return [];
  }
};
const handleConfirm = () => {
  emits("pick", formatValue());
};
</script>

<template>
  <div class="layui-laydate-range">
    <div class="layui-laydate-range-main">
      <Month
        :modelValue="leftDate"
        :inputDate="leftDate"
        :classes="classes"
        @pick="handleMonthPick"
        @hover-cell="handleMonthHover"
      >
        <template #header>
          <LayIcon
            type="layui-icon-prev"
            @click="leftDate = leftDate.subtract(1, 'year')"
          />
          <span>{{ leftDate.year() }} {{ t("datePicker.year") }}</span>
          <LayIcon type="layui-icon-next" style="visibility: hidden" />
        </template>
      </Month>
      <Month
        :modelValue="rightDate"
        :inputDate="rightDate"
        :classes="classes"
        @pick="handleMonthPick"
        @hover-cell="handleMonthHover"
      >
        <template #header>
          <LayIcon type="layui-icon-prev" style="visibility: hidden" />
          <span>
            {{ leftDate.add(1, "year").year() }}
            {{ t("datePicker.year") }}</span
          >
          <LayIcon
            type="layui-icon-next"
            @click="leftDate = leftDate.add(1, 'year')"
          />
        </template>
      </Month>
    </div>
    <Footer :showNow="false" @confirm="handleConfirm">
      {{ startDate?.format(props.inputFormat) }}
      {{ props.rangeSeparator }}
      {{ endDate?.format(props.inputFormat) }}
    </Footer>
  </div>
</template>
