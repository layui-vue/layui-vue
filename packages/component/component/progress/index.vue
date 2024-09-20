<script setup lang="ts">
import { isArray } from "../../utils";
import "./index.less";
import { computed, ComputedRef, ref, watch } from "vue";

export type ProgressLineProps = {
  percent: number | string;
  theme?: string;
  color?: string;
  showText?: boolean;
  text?: string;
};

export interface ProgressProps {
  percent: number | string | Array<ProgressLineProps>;
  theme?: string;
  color?: string;
  size?: string;
  showText?: boolean;
  text?: string;
  circle?: boolean;
  circleSize?: number;
  circleWidth?: number;
  animated?: boolean;
  fullAnimated?: boolean;
  indeterminate?: boolean;
}

defineOptions({
  name: "LayProgress",
});

const props = withDefaults(defineProps<ProgressProps>(), {
  circle: false,
  circleSize: 150,
  circleWidth: 6,
});

const getColorByTheme = (theme?: string) => {
  switch (theme) {
    case "red":
      return "#ff5722";
    case "orange":
      return "#ffb800";
    case "green":
      return "#009688";
    case "cyan":
      return "#2f4056";
    case "blue":
      return "#1e9fff";
    case "black":
      return "#393d49";
    case "gray":
      return "#fafafa";
    default:
      return "#5FB878";
  }
};

watch(
  () => props.percent,
  () => normalizePercent(),
  { deep: true }
);

const normalizePercent = () => {
  const base = {
    percent: 0,
    theme: props.theme,
    color: props.color,
    showText: props.showText,
    text: props.text,
  };

  if (props.indeterminate)
    return [
      {
        ...base,
        percent: 100,
      },
    ];

  return isArray(props.percent)
    ? props.percent.map((i) => {
        return {
          ...base,
          ...i,
          percent: Number(i.percent),
        };
      })
    : [
        {
          ...base,
          percent: Number(props.percent),
        },
      ];
};

const percents = computed(() => normalizePercent());

const percentsTotal = computed(() =>
  percents.value.map((i) => i.percent).reduce((a, b) => a + b, 0)
);

const percentMaxWidth = computed(() => `${percentsTotal.value}%`);

const linearStyles = computed(() => {
  return percents.value.map((i, v) => {
    const sum = percents.value
      .map((i) => Number(i.percent))
      .slice(0, v)
      .reduce((a, b) => a + b, 0);
    return {
      left: `${sum}%`,
      width: `${100 - sum > i.percent ? i.percent : 100 - sum}%`,
      backgroundColor: i.color ?? getColorByTheme(i.theme),
    };
  });
});

const getCircleColor = computed(() => {
  return props.color ?? getColorByTheme(props.theme);
});

const getStrokeDasharray = computed(() => {
  if (isArray(props.percent)) return;
  let percent = Number(props.percent);
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
  <div
    class="layui-progress"
    :class="[
      'layui-progress-' + size,
      {
        'layui-progress-animated':
          animated && !indeterminate && (percentsTotal < 100 || fullAnimated),
      },
      { 'layui-progress-indeterminate': indeterminate },
    ]"
    v-else
  >
    <div class="layui-progress-bar-container">
      <div
        class="layui-progress-bar"
        :style="linearStyles.at(v)"
        v-for="(i, v) in percents"
        :key="v"
      >
        <span v-if="i.showText" class="layui-progress-text">
          {{ i.text ? i.text : i.percent + "%" }}
        </span>
      </div>
    </div>
  </div>
</template>

<style>
.layui-progress-animated::after {
  content: "";
  position: absolute;
  background-color: #fff;
  height: 100%;
  width: v-bind(percentMaxWidth);
  border-radius: var(--progress-bar-border-radius);
  animation: progressMove 2s ease-in-out infinite;
}

.layui-progress-indeterminate::after {
  content: "";
  position: absolute;
  background-color: #fff;
  opacity: 0.8;
  height: 100%;
  border-radius: calc(var(--progress-bar-border-radius) * -1);
  animation: progressIndeterminate 3s linear infinite;
}

@keyframes progressMove {
  0% {
    width: 0;
    opacity: 0;
  }

  50% {
    opacity: 0.5;
  }

  100% {
    width: v-bind(percentMaxWidth);
    opacity: 0;
  }
}

@keyframes progressIndeterminate {
  0% {
    left: 0;
    width: 0;
  }

  20% {
    left: 50%;
    width: 50%;
  }

  40% {
    left: 100%;
    width: 0;
  }

  50% {
    left: 0;
    width: 0;
  }

  60% {
    left: 0%;
    width: 100%;
  }

  80% {
    left: 60%;
    width: 40%;
  }

  100% {
    left: 100%;
    width: 0%;
  }
}
</style>
