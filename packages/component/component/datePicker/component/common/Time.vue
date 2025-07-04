<script lang="ts" setup>
import type { BasePanelProps } from "../interface";
import dayjs from "dayjs";

import { inject, nextTick, ref, watch } from "vue";

import { useI18n } from "../../../../language";
import { DATE_PICKER_CONTEXT } from "../../interface";

export interface HmsType {
  hh: number | null;
  mm: number | null;
  ss: number | null;
}

type HmsKeys = keyof HmsType;

defineOptions({
  name: "TimePanel",
});

const props = withDefaults(defineProps<BasePanelProps>(), {});
const emits = defineEmits(["pick"]);

const DatePickerContext = inject(DATE_PICKER_CONTEXT)!;
const { t } = useI18n();

const els: Array<{
  count: number;
  type: HmsKeys;
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

function cellDisabled(type: HmsKeys, value: number) {
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

  const diffType = hmsMap[type] as (typeof hmsMap)[HmsKeys];

  if (DatePickerContext.disabledDate) {
    return DatePickerContext.disabledDate(currentDate.toDate());
  }

  if (
    DatePickerContext.min
    && currentDate.isBefore(
      dayjs(DatePickerContext.min, DatePickerContext.format),
      diffType,
    )
  ) {
    return true;
  }

  if (
    DatePickerContext.max
    && currentDate.isAfter(
      dayjs(DatePickerContext.max, DatePickerContext.format),
      diffType,
    )
  ) {
    return true;
  }

  return false;
}

// 点击时间 - hms
function chooseTime(e: Event) {
  if (e.target && (e.target as HTMLElement).nodeName === "LI") {
    const { value, type } = (e.target as HTMLElement).dataset as { value: string; type: HmsKeys };

    if (cellDisabled(type, Number.parseInt(value))) {
      return;
    }

    hms.value[type as keyof typeof hms.value] = Number.parseInt(value);

    let hmsDate = dayjs({
      hour: hms.value.hh || 0,
      minute: hms.value.mm || 0,
      second: hms.value.ss || 0,
    });

    if (
      hmsDate.isBefore(dayjs(DatePickerContext.min, DatePickerContext.format))
    ) {
      hmsDate = dayjs(DatePickerContext.min, DatePickerContext.format);
    }
    else if (
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
}

const timePanelRef = ref();

function scrollTo() {
  nextTick(() => {
    timePanelRef.value.childNodes.forEach((element: HTMLElement) => {
      if (element.nodeName === "LI") {
        let scrollTop = 0;
        const parentDom = element.firstElementChild as HTMLElement;
        const childList = parentDom.childNodes;
        for (let index = 0; index < childList.length; index++) {
          const child = childList[index] as HTMLElement;
          if (child.nodeName !== "LI") {
            continue;
          }
          if (child.classList && child.classList.contains("layui-this")) {
            scrollTop
              = child.offsetTop
                - (parentDom.offsetHeight - child.offsetHeight) / 2;
            parentDom.scrollTo(0, scrollTop);
            break;
          }
        }
      }
    });
  });
}

watch(
  () => [props.modelValue, props.showDate],
  ([modelValue, showDate]) => {
    const dateValue = modelValue || showDate;

    hms.value = {
      hh: dateValue ? dateValue.hour() : null,
      mm: dateValue ? dateValue.minute() : null,
      ss: dateValue ? dateValue.second() : null,
    };

    scrollTo();
  },
  {
    immediate: true,
    flush: "post",
  },
);
</script>

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
      <ul ref="timePanelRef" class="layui-laydate-list laydate-time-list">
        <li
          v-for="item in els"
          :key="item.type"
          class="num-list"
          :data-type="item.type"
        >
          <ol class="scroll" @click="chooseTime">
            <li
              v-for="(it, index) in item.count"
              :id="item.type + index.toString()"
              :key="it"
              :data-value="index.toString().padStart(2, '0')"
              :data-type="item.type"
              class="num" :class="{
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
