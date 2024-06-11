<!--
 * @Author: baobaobao
 * @Date: 2023-10-18 12:54:03
 * @LastEditTime: 2023-10-30 14:01:23
 * @LastEditors: baobaobao
-->

<script setup lang="ts">
import { computed, shallowRef, StyleValue, useSlots } from "vue";
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

defineOptions({
  name: "LayBadge",
});

const slot = useSlots();
const layBadge = shallowRef<HTMLElement | null>(null);
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
      "layui-badge-base": !slot.default,
      "layui-badge-dot": props.type == "dot",
      "is-bottom-right": props.position === "bottom-right",
      "is-bottom-left": props.position === "bottom-left",
      "is-top-left": props.position === "top-left",
    },
  ];
});

const badgeStyle = computed(() => {
  return [{ "background-color": props.color }, props.badgeStyle];
});

const rippleColor = computed(
  () =>
    (layBadge.value && getComputedStyle(layBadge.value).backgroundColor) ?? ""
);
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
    <sup
      ref="layBadge"
      :class="badgeClass"
      :style="badgeStyle"
      v-if="isCondition"
    >
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

.layui-badge-dot-ripple {
  pointer-events: none;
  animation: ripple-animation 1.2s ease-out infinite;
  background: v-bind(rippleColor);
}

@keyframes ripple-animation {
  from {
    opacity: 0.8;
  }

  to {
    transform: scale(3);
    opacity: 0;
  }
}
</style>
