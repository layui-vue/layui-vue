<template>
  <div class="layui-laydate-main laydate-time-show">
    <div class="layui-laydate-header">
      <div class="laydate-set-ym">
        <slot name="header">
          <span class="laydate-time-text">{{
            t("datePicker.selectTime")
          }}</span>
        </slot>
      </div>
    </div>
    <div class="layui-laydate-content" style="height: 210px">
      <ul class="layui-laydate-list laydate-time-list" ref="timePanelRef">
        <li
          class="num-list"
          v-for="item in els"
          :key="item.type"
          :data-type="item.type"
        >
          <ol class="scroll" @click="chooseTime">
            <li
              v-for="(it, index) in item.count"
              :id="item.type + index.toString()"
              :data-value="index.toString().padStart(2, '0')"
              :data-type="item.type"
              :key="it"
              :class="{
                num: true,
                'layui-this': index === hms[item.type],
                'layui-disabled': cellDisabled(item.type, index),
              }"
            >
              {{ index.toString().padStart(2, "0") }}
            </li>
          </ol>
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts" setup>
import dayjs from "dayjs";
import { inject, ref, nextTick, watch, computed } from "vue";

import type { BasePanelProps } from "../interface";

import { useI18n } from "../../../../language";
import { DATE_PICKER_CONTEXT } from "../../interface";

export interface HmsType {
  hh: number | null;
  mm: number | null;
  ss: number | null;
}

defineOptions({
  name: "TimePanel",
});

const props = withDefaults(defineProps<BasePanelProps>(), {});
const emits = defineEmits(["pick"]);

const DatePickerContext = inject(DATE_PICKER_CONTEXT)!;
const { t } = useI18n();

const els: Array<{
  count: number;
  type: keyof typeof hmsMap;
}> = [
  { count: 24, type: "hh" },
  { count: 60, type: "mm" },
  { count: 60, type: "ss" },
];

const hms = ref<HmsType>({
  hh: null,
  mm: null,
  ss: null,
});

const hmsMap = {
  hh: "hour",
  mm: "minute",
  ss: "second",
} as const;

const cellDisabled = computed(() => {
  return (type: keyof typeof hmsMap, value: number) => {
    const haveValue = typeof value !== "undefined";
    const _hms: Record<string, number | null> = {
      hh: haveValue ? hms.value.hh : dayjs().hour(),
      mm: haveValue ? hms.value.mm : dayjs().minute(),
      ss: haveValue ? hms.value.ss : dayjs().second(),
    };
    haveValue && (_hms[type!] = value);

    const currentDate = (props.modelValue || props.showDate)
      .startOf("day")
      .hour(_hms.hh as number)
      .minute(_hms.mm as number)
      .second(_hms.ss as number);

    const diffType = hmsMap[type] as (typeof hmsMap)[keyof typeof hmsMap];

    if (
      DatePickerContext.min &&
      currentDate.isBefore(
        dayjs(DatePickerContext.min, DatePickerContext.format),
        diffType
      )
    ) {
      return true;
    }

    if (
      DatePickerContext.max &&
      currentDate.isAfter(
        dayjs(DatePickerContext.max, DatePickerContext.format),
        diffType
      )
    ) {
      return true;
    }

    return false;
  };
});

// 点击时间 - hms
const chooseTime = (e: any) => {
  if (e.target.nodeName == "LI") {
    let { value, type } = e.target.dataset;

    if (cellDisabled.value(type, parseInt(value))) {
      return;
    }

    hms.value[type as keyof typeof hms.value] = parseInt(value);

    let hmsDate = dayjs({
      hour: hms.value.hh || 0,
      minute: hms.value.mm || 0,
      second: hms.value.ss || 0,
    });

    if (
      hmsDate.isBefore(dayjs(DatePickerContext.min, DatePickerContext.format))
    ) {
      hmsDate = dayjs(DatePickerContext.min, DatePickerContext.format);
    } else if (
      hmsDate.isAfter(dayjs(DatePickerContext.max, DatePickerContext.format))
    ) {
      hmsDate = dayjs(DatePickerContext.max, DatePickerContext.format);
    }

    const newData = (props.modelValue || props.showDate)
      .clone()
      .set("hour", hmsDate.hour())
      .set("minute", hmsDate.minute())
      .set("second", hmsDate.second());

    emits("pick", newData);
  }
};

const timePanelRef = ref();

const scrollTo = () => {
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
  });
};

watch(
  () => props.modelValue,
  (modelValue) => {
    hms.value = {
      hh: modelValue ? modelValue.hour() : null,
      mm: modelValue ? modelValue.minute() : null,
      ss: modelValue ? modelValue.second() : null,
    };

    scrollTo();
  },
  {
    immediate: true,
    flush: "post",
  }
);
</script>
