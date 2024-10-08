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
                'layui-this': index == hms[item.type],
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
import { inject, onMounted, ref, nextTick, watch, computed } from "vue";

import type { BasePanelProps } from "../interface";

import { useI18n } from "../../../../language";
import { DATE_PICKER_CONTEXT } from "../../interface";

export interface HmsType {
  hh: number;
  mm: number;
  ss: number;
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
  hh: props.modelValue.hour(),
  mm: props.modelValue.minute(),
  ss: props.modelValue.second(),
});

const hmsMap = {
  hh: "hour",
  mm: "minute",
  ss: "second",
} as const;

const cellDisabled = computed(() => {
  return (type: keyof typeof hmsMap, value: number) => {
    const haveValue = typeof value !== "undefined";
    const _hms: Record<string, number> = {
      hh: haveValue ? hms.value.hh : dayjs().hour(),
      mm: haveValue ? hms.value.mm : dayjs().minute(),
      ss: haveValue ? hms.value.ss : dayjs().second(),
    };
    haveValue && (_hms[type!] = value);

    const currentDate = props.modelValue
      .startOf("day")
      .hour(_hms.hh)
      .minute(_hms.mm)
      .second(_hms.ss);

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

    const hmsDate = dayjs({
      hour: hms.value.hh,
      minute: hms.value.mm,
      second: hms.value.ss,
    });

    const newData = props.modelValue
      .clone()
      .set("hour", hmsDate.hour())
      .set("minute", hmsDate.minute())
      .set("second", hmsDate.second());

    emits("pick", newData);
  }
};

const timePanelRef = ref();

onMounted(() => {
  scrollTo();
});

watch(
  () => props.inputDate,
  () => {
    hms.value = {
      hh: props.modelValue.hour(),
      mm: props.modelValue.minute(),
      ss: props.modelValue.second(),
    };

    scrollTo();
  }
);
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
</script>
