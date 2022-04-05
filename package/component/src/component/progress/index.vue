<script lang="ts">
export default {
  name: "LayProgress",
};
</script>

<script setup lang="ts">
import "./index.less";
import { computed } from "vue";

export interface LayProgressProps {
  percent: number | string;
  theme?: string;
  color?: string;
  size?: string;
  showText?: boolean;
  text?: string;
}

const props = defineProps<LayProgressProps>();

const styles = computed(() => {
  return [
    props.color ? "background-color: " + props.color : "",
    {
      width: props.percent + "%",
    },
  ];
});
</script>

<template>
  <div class="layui-progress" :class="'layui-progress-' + size">
    <div
      class="layui-progress-bar"
      :class="'layui-bg-' + theme"
      :style="styles"
    >
      <span v-if="showText" class="layui-progress-text">
        {{ text ? text : percent + "%" }}
      </span>
    </div>
  </div>
</template>
