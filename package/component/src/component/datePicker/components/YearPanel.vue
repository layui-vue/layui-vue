<template>
  <div class="layui-laydate">
    <div class="layui-laydate-main laydate-main-list-0 laydate-ym-show">
      <div class="layui-laydate-header">
        <div class="laydate-set-ym">
          <span class="laydate-time-text">选择年份</span>
        </div>
      </div>
    </div>
    <div class="layui-laydate-content" style="height: 220px; overflow-y: auto" ref="ScrollRef">
      <ul class="layui-laydate-list laydate-year-list">
        <li v-for="item of datePicker.yearList.value" :key="item"
          :class="{ 'layui-this': datePicker.currentYear.value === item }" @click="handleYearClick(item)">{{ item }}
        </li>
      </ul>
    </div>
    <PanelFoot></PanelFoot>
  </div>
</template>
<script lang="ts">
export default {
  name: "YearPanel",
};
</script>
<script lang="ts" setup>
import dayjs from 'dayjs';
import { inject, nextTick, onMounted, ref, watch } from 'vue';
import { provideType } from '../interface';
import PanelFoot from './PanelFoot.vue'
const datePicker: provideType = inject('datePicker') as provideType;
const unWatch = ref(false)
// 点击年份
const handleYearClick = (item: any) => {
  unWatch.value = true;
  datePicker.currentYear.value = item;
  if (datePicker.type === "year") {
    datePicker.currentDay.value = dayjs().year(item).valueOf();
  } else if (datePicker.type === "yearmonth") {
    datePicker.currentDay.value = dayjs().year(item).valueOf();
    datePicker.showPanel.value = "month";
  } else {
    datePicker.showPanel.value = "date";
  }
  setTimeout(() => {
    unWatch.value = false;
  }, 0);
};

const ScrollRef = ref();
onMounted(() => {
  scrollTo();
})
watch([datePicker.currentYear], () => {
  if (!unWatch.value)
    scrollTo();
})
const scrollTo = () => {
  nextTick(() => {
    let scrollTop = 0;
    for (const child of ScrollRef.value.firstElementChild.childNodes) {
      if (child.classList && child.classList.contains('layui-this')) {
        scrollTop = child.offsetTop - (ScrollRef.value.offsetHeight - child.offsetHeight) / 2;
        break;
      }
    }
    ScrollRef.value.scrollTo(0, scrollTop)
  })
}
</script>