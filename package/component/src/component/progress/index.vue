<script lang="ts">
export default {
  name: "LayProgress",
};
</script>

<script setup lang="ts">
import "./index.less";
import { computed } from "vue";

export interface ProgressProps {
  percent: number | string;
  theme?: string;
  color?: string;
  size?: string;
  showText?: boolean;
  text?: string;
  circle?: boolean;
  circleSize?: number;
  circleWidth?: number;
}

const props = withDefaults(defineProps<ProgressProps>(), {
  circle: false,
  circleSize: 150,
  circleWidth: 6,
});

const styles = computed(() => {
  return [
    props.color ? "background-color: " + props.color : "",
    {
      width: props.percent + "%",
    },
  ];
});

const getCircleColor = computed(() => {
  let color;
  switch (props.theme) {
    case "red":
      color = "#ff5722";
      break;
    case "orange":
      color = "#ffb800";
      break;
    case "green":
      color = "#009688";
      break;
    case "cyan":
      color = "#2f4056";
      break;
    case "blue":
      color = "#1e9fff";
      break;
    case "black":
      color = "#393d49";
      break;
    case "gray":
      color = "#fafafa";
      break;
    default:
      color = "#5FB878";
      break;
  }
  color = props.color ? props.color : color;
  return color;
});

const getCircleRotate = computed(() => {
  let percent;
  if (typeof props.percent == "string") {
    percent = parseInt(props.percent);
  } else {
    percent = props.percent;
  }
  return (percent / 100) * 360;
});

const getStrokeDasharray = computed(() => {
  let percent;
  if (typeof props.percent == "string") {
    percent = parseInt(props.percent);
  } else {
    percent = props.percent;
  }
  let radii = props.circleSize / 2 - props.circleWidth / 2;
  let perimeter = Math.PI * 2 * radii;
  return `${(percent / 100) * perimeter}px ${perimeter}px`;
});

const getPathD = computed(() => {
  let circleSize = props.circleSize;
  let circleWidth = props.circleWidth;
  return `M ${circleSize / 2} ${circleSize / 2} m 0, -${
    (circleSize - circleWidth) / 2
  } a ${(circleSize - circleWidth) / 2}, ${
    (circleSize - circleWidth) / 2
  } 0 1, 1 0, ${circleSize - circleWidth} a ${
    (circleSize - circleWidth) / 2
  }, ${(circleSize - circleWidth) / 2} 0 1, 1 0, -${circleSize - circleWidth}`;
});
</script>

<template>
  <div class="lay-progress-circle" v-if="circle">
    <svg
      :viewBox="`0 0 ${circleSize} ${circleSize}`"
      :width="circleSize"
      :height="circleSize"
    >
      <path
        :d="getPathD"
        style="fill: none; stroke: var(--global-neutral-color-3)"
        :style="{ strokeWidth: `${circleWidth}px` }"
      ></path>
      <path
        :d="getPathD"
        style="fill: none; stroke-linecap: round"
        :style="{
          strokeDasharray: getStrokeDasharray,
          stroke: getCircleColor,
          strokeWidth: `${circleWidth}px`,
        }"
      ></path>
    </svg>
    <div class="layui-progress-text lay-progress-circle__text" v-if="showText">
      {{ text ? text : percent + "%" }}
    </div>
  </div>

  <div class="layui-progress" :class="'layui-progress-' + size" v-else>
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
