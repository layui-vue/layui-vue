<script lang="ts">
export default {
  name: "LayLine",
};
</script>

<script setup lang="ts">
import { computed, useSlots } from "vue";
import "./index.less";
export interface LineProps {
  direction?: "horizontal" | "vertical";
  contentPosition?: "center" | "left" | "right";
  borderWidth?: string;
  borderStyle?: string;
  offset?: string;
  theme?: string;
  margin?: string;
}

const props = withDefaults(defineProps<LineProps>(), {
  direction: "horizontal",
  contentPosition: "center",
  borderWidth: "1px",
  borderStyle: "solid",
  offset: "25px",
  margin: "8px",
});

const slots = useSlots();
const lineTheme: string[] = [
  "red",
  "orange",
  "green",
  "cyan",
  "blue",
  "black",
  "gray",
];
const isBuiltInColor: boolean = lineTheme.includes(props.theme ?? "");

const lineClass = computed(() => [
  `layui-line-${props.direction}`,
  {
    [`layui-border-${props.theme}`]: isBuiltInColor,
    [`layui-line-with-text`]: Boolean(slots.default),
  },
]);

const lineStyle = computed(() => ({
  "border-color": !isBuiltInColor ? props.theme : undefined,
  "--layui-line-border-width": props.borderWidth,
  "--layui-line-border-style": props.borderStyle,
  "--layui-line-margin": props.margin,
}));

const lineTextStyle = computed(() => ({
  "--layui-line-text-offset":
    props.contentPosition != "center" ? props.offset : "50%",
  transform: calcTranslate(),
}));

function calcTranslate() {
  if (props.offset.includes("%")) {
    return props.contentPosition === "right"
      ? "translate(50%, -50%)"
      : "translate(-50%, -50%)";
  }
  return undefined;
}
</script>

<template>
  <div :class="lineClass" :style="lineStyle">
    <span
      v-if="$slots.default && direction === 'horizontal'"
      :class="[`layui-line-text layui-line-text-${contentPosition}`]"
      :style="lineTextStyle"
    >
      <slot />
    </span>
  </div>
</template>
