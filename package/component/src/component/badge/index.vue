<!--
 * @Author: baobaobao
 * @Date: 2023-10-18 12:54:03
 * @LastEditTime: 2023-10-29 22:43:22
 * @LastEditors: baobaobao
-->
<script lang="ts">
export default {
  name: "LayBadge",
};
</script>

<script setup lang="ts">
import { computed, StyleValue, useSlots } from "vue";
import "./index.less";
export type Position =
  | "top-right"
  | "top-left"
  | "bottom-right"
  | "bottom-left";
export interface BadgeProps {
  theme?: string;
  color?: string;
  ripple?: boolean;
  type?: "dot" | "rim";
  value?: string | number;
  badgeStyle?: StyleValue;
  position?: Position;
  showZero?: boolean;
  max?: number;
}
const slot = useSlots();
const props = withDefaults(defineProps<BadgeProps>(), {
  type: "rim",
  value: 0,
  position: "top-right",
  max: 99,
  showZero: false,
});
const calcValue = computed(() => {
  if (props.type !== "dot") {
    if (!isNaN(+props.value)) {
      const newVal = Math.max(0, +props.value);
      return +newVal > props.max ? `${props.max}+` : newVal;
    }
  }
  return props.value;
});
const badgeClass = computed(() => {
  return [
    {
      [`layui-bg-${props.theme}`]: props.theme,
      "layui-badge-number": props.type == "rim",
      "layui-badge-dot": props.type == "dot",
      "is-bottom-right": props.position === "bottom-right",
      "is-bottom-left": props.position === "bottom-left",
      "is-top-left": props.position === "top-left",
    },
  ];
});

const rippleColor = computed(() => {
  return props.color ? props.color : props.theme ?? "red";
});

const badgeStyle = computed(() => {
  return [
    {"background-color": props.color},
    props.badgeStyle,
  ]
})

const isCondition = computed(() => {
  if (props.type === "dot") return true;
  if (slot.custom) return true;
  if (isNaN(+props.value)) return true;
  if (+props.value <= 0 && props.showZero) return true;
  if (+props.value <= 0 && !props.showZero) return false;
  return true;
});
</script>

<template>
  <div class="layui-badge">
    <slot></slot>
    <sup :class="badgeClass" :style="badgeStyle" v-if="isCondition">
      <template v-if="type !== 'dot' && !slot.custom">
        {{ calcValue }}
      </template>
      <slot name="custom" v-if="slot.custom"></slot>
      <span class="layui-badge-dot-ripple" v-if="ripple"></span>
    </sup>
  </div>
</template>

<style scoped lang="less">
@import "./index.less";
@keyframes layui-badge-dot-anim-ripple {
  from {
    box-shadow: 0 0 0.5px 0px v-bind(rippleColor);
    opacity: 0.8;
  }

  to {
    box-shadow: 0 0 0.5px 4.5px v-bind(rippleColor);
    opacity: 0;
  }
}
</style>
