<script setup lang="ts">
import { StyleValue, computed, useSlots } from "vue";
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

defineOptions({
  name: "LayLine",
});

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

const lineStyle = computed(() => {
  return props.direction === "horizontal"
    ? ({
        "border-bottom-color": !isBuiltInColor ? props.theme : undefined,
        "border-bottom-width": props.borderWidth,
        "border-bottom-style": props.borderStyle,
        margin: `${props.margin} 0`,
        "border-right": "none",
        "border-left": "none",
        "border-top": "none",
      } as StyleValue)
    : ({
        "border-left-color": !isBuiltInColor ? props.theme : undefined,
        "border-left-width": props.borderWidth,
        "border-left-style": props.borderStyle,
        margin: `0 ${props.margin}`,
        "border-bottom": "none",
        "border-right": "none",
        "border-top": "none",
      } as StyleValue);
});

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
