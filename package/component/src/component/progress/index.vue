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
</script>

<template>
  <template v-if="circle">
    <div class="lay-progress-circle-container">
      <div class="lay-progress-circle-bg">
        <div
          class="lay-progress-circle"
          :style="{
            background: `conic-gradient(${getCircleColor} 0, ${getCircleColor} ${props.percent}%, transparent ${percent}%, transparent)`,
          }"
        ></div>
      </div>
      <div style="position: absolute; top: 0; left: 0">
        <div
          class="lay-progress-circle-corner"
          :style="{
            backgroundColor: getCircleColor,
            transform: `translate(0, -72px)`,
          }"
        ></div>
        <div
          class="lay-progress-circle-corner"
          :style="{
            backgroundColor: getCircleColor,
            transform: `rotate(${getCircleRotate}deg) translate(0, -72px)`,
          }"
        ></div>
      </div>

      <div
        class="layui-progress-text lay-progress-circle__text"
        v-if="showText"
      >
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
