<template>
  <div class="layui-laydate">
    <div class="layui-laydate-main laydate-main-list-0 laydate-ym-show">
      <div class="layui-laydate-header">
        <div class="laydate-set-ym">
          <span class="laydate-time-text">{{
            t("datePicker.selectYear")
          }}</span>
        </div>
      </div>
    </div>
    <div
      class="layui-laydate-content"
      style="height: 220px; overflow-y: auto"
      ref="ScrollRef"
    >
      <ul class="layui-laydate-list laydate-year-list">
        <li
          v-for="item of yearList"
          :key="item"
          :class="{
            'layui-this': Year === item,
            'layui-laydate-current': !Year && item === dayjs().year(),
          }"
          @click="handleYearClick(item)"
        >
          {{ item }}
        </li>
      </ul>
    </div>
    <PanelFoot @ok="footOnOk" @now="footOnNow" @clear="footOnClear">
      <span
        v-if="datePicker.type === 'yearmonth'"
        @click="datePicker.showPanel.value = 'month'"
        class="laydate-btns-time"
        >{{ t("datePicker.selectMonth") }}</span
      >
      <template v-else-if="Year > 0">{{ Year }}</template>
    </PanelFoot>
  </div>
</template>
<script lang="ts">
export default {
  name: "YearPanel",
};
</script>
<script lang="ts" setup>
import dayjs from "dayjs";
import { useI18n } from "../../../language";
import { inject, nextTick, onMounted, ref, watch } from "vue";
import { getYears } from "../day";
import { provideType } from "../interface";
import PanelFoot from "./PanelFoot.vue";

export interface TimePanelProps {
  modelValue: number | string;
  max?: number;
}
const props = withDefaults(defineProps<TimePanelProps>(), {
  max: dayjs().year() + 100,
});
const emits = defineEmits(["update:modelValue", "ok"]);
const datePicker: provideType = inject("datePicker") as provideType;
const yearList = ref<number[]>(getYears());
const unWatch = ref(false);
const Year = ref(props.modelValue);
const { t } = useI18n();

// 点击年份
const handleYearClick = (item: any) => {
  unWatch.value = true;
  Year.value = item;
  if (!datePicker.range) {
    if (datePicker.type === "year") {
      datePicker.currentDay.value = dayjs().year(item).valueOf();
    } else if (datePicker.type === "yearmonth") {
      datePicker.currentDay.value = dayjs().year(item).valueOf();
      datePicker.showPanel.value = "month";
      emits("update:modelValue", Year.value);
    } else {
      emits("update:modelValue", Year.value);
      datePicker.showPanel.value = datePicker.type;
    }
  }

  setTimeout(() => {
    unWatch.value = false;
  }, 0);

  if (datePicker.simple) {
    footOnOk();
  }
};

const ScrollRef = ref();
onMounted(() => {
  scrollTo();
});
watch(
  () => Year,
  () => {
    Year.value = props.modelValue;
  }
);
const scrollTo = () => {
  nextTick(() => {
    let scrollTop = 0;
    for (const child of ScrollRef.value.firstElementChild.childNodes) {
      if (child.classList && child.classList.contains("layui-this")) {
        scrollTop =
          child.offsetTop -
          (ScrollRef.value.offsetHeight - child.offsetHeight) / 2;
        break;
      }
    }
    ScrollRef.value.scrollTo(0, scrollTop);
  });
};

//关闭回调
const footOnOk = () => {
  emits("update:modelValue", Year.value ? Year.value : -1);
  if (datePicker.range) {
    //关闭菜单
    emits("ok");
    return;
  } else {
    if (datePicker.type === "datetime" || datePicker.type === "date") {
      datePicker.showPanel.value = datePicker.type;
    } else {
      datePicker.ok();
    }
  }
};

//现在回调
const footOnNow = () => {
  Year.value = dayjs().year();
  if (datePicker.type === "yearmonth") {
    datePicker.currentMonth.value = dayjs().month();
  }
  scrollTo();
};

//清空回调
const footOnClear = () => {
  Year.value = "";
};
</script>
