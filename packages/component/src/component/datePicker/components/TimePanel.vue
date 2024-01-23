<template>
  <div class="layui-laydate">
    <div class="layui-laydate-main laydate-main-list-0 laydate-time-show">
      <div class="layui-laydate-header">
        <div class="laydate-set-ym">
          <span class="laydate-time-text">{{
            t("datePicker.selectTime")
          }}</span>
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
    <PanelFoot @ok="footOnOk" @now="footOnNow" @clear="footOnClear">
      <span
        v-if="datePicker.type === 'datetime' && !datePicker.range"
        @click="datePicker.showPanel.value = 'datetime'"
        class="laydate-btns-time"
        >{{ t("datePicker.selectDate") }}</span
      >
      <template v-else-if="!isNaN(hms.hh) && !isNaN(hms.mm) && !isNaN(hms.ss)">
        {{
          dayjs().hour(hms.hh).minute(hms.mm).second(hms.ss).format("HH:mm:ss")
        }}
      </template>
    </PanelFoot>
  </div>
</template>

<script lang="ts" setup>
import dayjs from "dayjs";
import { useI18n } from "../../../language";
import { inject, onMounted, ref, nextTick, watch, computed } from "vue";
import { provideType } from "../interface";
import PanelFoot from "./PanelFoot.vue";
export interface hmsType {
  hh: number;
  mm: number;
  ss: number;
  [key: string]: any;
}
export interface TimePanelProps {
  modelValue: hmsType;
}

defineOptions({
  name: "TimePanel",
});

const props = withDefaults(defineProps<TimePanelProps>(), {});
const emits = defineEmits(["update:modelValue", "ok"]);
const datePicker: provideType = inject("datePicker") as provideType;
const { t } = useI18n();

const els = [
  { count: 24, type: "hh" },
  { count: 60, type: "mm" },
  { count: 60, type: "ss" },
];
const hms = ref<hmsType>({
  hh: props.modelValue.hh,
  mm: props.modelValue.mm,
  ss: props.modelValue.ss,
});

const cellDisabled = computed(() => {
  return (type?: string, value?: number) => {
    const haveValue = typeof value !== "undefined";
    const toDay = dayjs().format("YYY-MM-DD");
    const _hms: Record<string, number> = {
      hh: haveValue ? hms.value.hh : dayjs().hour(),
      mm: haveValue ? hms.value.mm : dayjs().minute(),
      ss: haveValue ? hms.value.ss : dayjs().second(),
    };
    haveValue && (_hms[type!] = value);
    const time = `${_hms.hh}:${_hms.mm}:${_hms.ss}`;
    if (
      datePicker.min &&
      dayjs(`${toDay} ${time}`).isBefore(dayjs(`${toDay} ${datePicker.min}`))
    ) {
      return true;
    }

    if (
      datePicker.max &&
      dayjs(`${toDay} ${time}`).isAfter(dayjs(`${toDay} ${datePicker.max}`))
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
    if (datePicker.type === "datetime") {
      emits("update:modelValue", hms.value);
    }
  }
};

const timePanelRef = ref();
onMounted(() => {
  scrollTo();
});
watch(
  () => props.modelValue,
  () => {
    hms.value = {
      hh: props.modelValue.hh,
      mm: props.modelValue.mm,
      ss: props.modelValue.ss,
    };
  },
  { deep: true }
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

//确认关闭回调
const footOnOk = () => {
  emits("update:modelValue", hms.value);
  if (datePicker.range) {
    //关闭菜单
    emits("ok");
    return;
  } else {
    if (datePicker.type === "datetime") {
      datePicker.showPanel.value = "date";
      if (datePicker.currentDay.value < 1) {
        return;
      }
    }
    datePicker.ok();
  }
};
//现在回调
const footOnNow = () => {
  if (cellDisabled.value()) {
    return;
  }

  hms.value.hh = dayjs().hour();
  hms.value.mm = dayjs().minute();
  hms.value.ss = dayjs().second();
  scrollTo();
  if (datePicker.type === "datetime") {
    emits("update:modelValue", hms.value);
  }
};

//清空回调
const footOnClear = () => {
  hms.value.hh = 0;
  hms.value.mm = 0;
  hms.value.ss = 0;
  scrollTo();
};
</script>
