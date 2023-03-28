<template>
    <div class="layui-laydate layui-laydate-range">
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
              <ol class="scroll" @click="chooseStartTime">
                <li
                  v-for="(it, index) in item.count"
                  :id="item.type + index.toString()"
                  :data-value="index.toString().padStart(2, '0')"
                  :data-type="item.type"
                  :key="it"
                  :class="['num', index == startHms[item.type] ? 'layui-this' : '']"
                >
                  {{ index.toString().padStart(2, "0") }}
                </li>
              </ol>
            </li>
          </ul>
        </div>
      </div>
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
              <ol class="scroll" @click="chooseEndTime">
                <li
                  v-for="(it, index) in item.count"
                  :id="item.type + index.toString()"
                  :data-value="index.toString().padStart(2, '0')"
                  :data-type="item.type"
                  :key="it"
                  :class="['num', index == endHms[item.type] ? 'layui-this' : '']"
                >
                  {{ index.toString().padStart(2, "0") }}
                </li>
              </ol>
            </li>
          </ul>
        </div>
      </div>
      <PanelFoot @ok="footOnOk" @now="footOnNow" @clear="footOnClear">
        <template v-if="!isNaN(startHms.hh) && !isNaN(startHms.mm) && !isNaN(startHms.ss)">
          {{
            dayjs().hour(startHms.hh).minute(startHms.mm).second(startHms.ss).format("HH:mm:ss")
          }}
        </template>
        至
        <template v-if="!isNaN(endHms.hh) && !isNaN(endHms.mm) && !isNaN(endHms.ss)">
          {{
            dayjs().hour(endHms.hh).minute(endHms.mm).second(endHms.ss).format("HH:mm:ss")
          }}
        </template>
      </PanelFoot>
    </div>
  </template>
  <script lang="ts">
  export default {
    name: "TimePanel",
  };
  </script>
  <script lang="ts" setup>
  import dayjs from "dayjs";
  import { useI18n } from "../../../language";
  import { inject, onMounted, ref, nextTick, watch } from "vue";
  import { provideType } from "../interface";
  import PanelFoot from "./PanelFoot.vue";

  export interface hmsType {
    hh: number;
    mm: number;
    ss: number;
    [key: string]: any;
  }

  export interface TimeRangeProps {
    startTime: string;
    endTime: string;
  }
  
  const props = withDefaults(defineProps<TimeRangeProps>(), {});
  const emits = defineEmits(["update:modelValue", "ok", "update:startTime", "update:endTime"]);
  const datePicker: provideType = inject("datePicker") as provideType;
  const { t } = useI18n();
  
  const els = [
    { count: 24, type: "hh" },
    { count: 60, type: "mm" },
    { count: 60, type: "ss" },
  ];

  const startHms = ref<hmsType>({
    hh: dayjs(props.startTime).hour(),
    mm: dayjs(props.startTime).minute(),
    ss: dayjs(props.startTime).second(),
  })

  const endHms = ref<hmsType>({
    hh: dayjs(props.endTime).hour(),
    mm: dayjs(props.endTime).minute(),
    ss: dayjs(props.endTime).second(),
  })

  watch(
    () => props.startTime,
    () => {
        startHms.value = {
            hh: dayjs(props.startTime).hour(),
            mm: dayjs(props.startTime).minute(),
            ss: dayjs(props.startTime).second(),
        };
    },
    { deep: true }
  );

  watch(
    () => props.endTime,
    () => {
        endHms.value = {
            hh: dayjs(props.endTime).hour(),
            mm: dayjs(props.endTime).minute(),
            ss: dayjs(props.endTime).second(),
        };
    },
    { deep: true }
  );

  const chooseStartTime = (e: any) => {
    if (e.target.nodeName == "LI") {
      let { value, type } = e.target.dataset;
      startHms.value[type as keyof typeof startHms.value] = parseInt(value);
    }
  };

  const chooseEndTime = (e: any) => {
    if (e.target.nodeName == "LI") {
      let { value, type } = e.target.dataset;
      endHms.value[type as keyof typeof endHms.value] = parseInt(value);
    }
  };
  
  onMounted(() => {
    scrollTo();
  });

  const startTimePanelRef = ref();
  const endTimePanelRef = ref();

  const startTimeScrollTo = () => {
    nextTick(() => {
        startTimePanelRef.value.childNodes.forEach((element: HTMLElement) => {
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
  
  const endTimeScrollTo = () => {
    nextTick(() => {
        endTimePanelRef.value.childNodes.forEach((element: HTMLElement) => {
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
    emits("update:startTime", dayjs().hour(startHms.value.hh).minute(startHms.value.mm).second(startHms.value.ss));
    emits("update:endTime", dayjs().hour(endHms.value.hh).minute(endHms.value.mm).second(endHms.value.ss));
    datePicker.ok();
  };

  //现在回调
  const footOnNow = () => {
    startHms.value.hh = dayjs().hour();
    startHms.value.mm = dayjs().minute();
    startHms.value.ss = dayjs().second();
    endHms.value.hh = dayjs().hour();
    endHms.value.mm = dayjs().minute();
    endHms.value.ss = dayjs().second();
    scrollTo();
  };
  
  //清空回调
  const footOnClear = () => {
    startHms.value.hh = 0;
    startHms.value.mm = 0;
    startHms.value.ss = 0;
    endHms.value.hh = 0;
    endHms.value.mm = 0;
    endHms.value.ss = 0;
    scrollTo();
  };
  </script>  