<template>
  <div class="layui-laydate-main laydate-main-list-0 laydate-ym-show">
    <div class="layui-laydate-year-panel-header">
      <div class="laydate-set-ym">
        <lay-icon
          type="layui-icon-left"
          @click="props.currentDate.value -= props.yearPage ?? 15"
        ></lay-icon>
        <span class="laydate-time-text">
          {{ props.yearRange.value.join(" - ") }}
        </span>
        <lay-icon
          type="layui-icon-right"
          @click="props.currentDate.value += props.yearPage ?? 15"
        ></lay-icon>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { inject, Ref } from "vue";
import { HEADER_YEAR_CONTEXT } from "../interface";

defineOptions({
  name: "PanelHeaderYear",
});

interface HeaderYearProps {
  yearRange: Ref<string[]>;
  currentDate: Ref<number>;
  yearPage: number;
}

const props = inject(HEADER_YEAR_CONTEXT) as HeaderYearProps;
</script>
