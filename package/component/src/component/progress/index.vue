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
  circle?: boolean;
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

const getStrokeDasharray = computed(() => {
  let percent;
  if (typeof props.percent == "string") {
    percent = parseInt(props.percent);
  } else {
    percent = props.percent;
  }
  return `${percent * 31.4}` + "px 3140px";
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
      color = "var(--global-checked-color)";
      break;
  }
  color = props.color ? props.color : color;
  return color;
});
</script>

<template>
  <template v-if="circle">
    <div class="lay-progress-circle">
      <svg viewBox="0 0 1060 1060">
        <path
          d="M 530 530 m 0, -500 a 500, 500 0 1, 1 0, 1000 a 500, 500 0 1, 1 0, -1000"
          style="
            fill: none;
            stroke-width: 50px;
            stroke: var(--global-neutral-color-3);
          "
        ></path>
        <path
          d="M 530 530 m 0, -500 a 500, 500 0 1, 1 0, 1000 a 500, 500 0 1, 1 0, -1000"
          style="stroke-width: 51px; fill: none; stroke-linecap: round"
          :style="{
            strokeDasharray: getStrokeDasharray,
            stroke: getCircleColor,
          }"
        ></path>
      </svg>
      <div class="lay-progress-circle__text" v-if="showText">
        {{ text ? text : percent + "%" }}
      </div>
    </div>
  </template>
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
