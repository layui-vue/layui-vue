<template>
  <div class="layui-laydate">
    <div class="layui-laydate-main laydate-main-list-0 laydate-time-show">
      <div class="layui-laydate-header">
        <div class="laydate-set-ym">
          <span class="laydate-time-text">选择时间</span>
        </div>
      </div>
      <div class="layui-laydate-content" style="height: 210px">
        <ul class="layui-laydate-list laydate-time-list" ref="timePanelRef">
          <li class="num-list" v-for="item in els" :key="item.type" :data-type="item.type">
            <ol class="scroll" @click="choseTime">
              <li v-for="(it, index) in item.count" :id="item.type + index.toString()"
                :data-value="index.toString().padStart(2, '0')" :data-type="item.type" :key="it" :class="[
                  'num',
                  index.toString().padStart(2, '0') == datePicker.hms.value[item.type]
                    ? 'layui-this'
                    : '',
                ]">
                {{ index.toString().padStart(2, "0") }}
              </li>
            </ol>
          </li>
        </ul>
      </div>
    </div>
    <PanelFoot></PanelFoot>
  </div>
</template>
<script lang="ts">
export default {
  name: "TimePanel",
};
</script>
<script lang="ts" setup>
import { inject } from 'vue';
import { provideType } from '../interface';
import PanelFoot from './PanelFoot.vue'
const datePicker: provideType = inject('datePicker') as provideType;
const els = [
  { count: 24, type: "hh" },
  { count: 60, type: "mm" },
  { count: 60, type: "ss" },
];

// 点击时间 - hms
const choseTime = (e: any) => {
  if (e.target.nodeName == "LI") {
    let { value, type } = e.target.dataset;
    datePicker.hms.value[type as keyof typeof datePicker.hms.value] = value;
  }
};
</script>