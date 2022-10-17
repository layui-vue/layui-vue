<script lang="ts">
export default {
  name: "LayLayout",
};
</script>

<script setup lang="ts">
import { Component, computed, useSlots } from "vue";
import Header from "../header/index.vue";
import Footer from "../footer/index.vue";
import "./index.less";

export interface LayoutProps {
  isVertical?: boolean;
}

const slots = useSlots();

const props = withDefaults(defineProps<LayoutProps>(), {
  isVertical: false,
});

const isVertical = computed(() => {
  if (!slots.default) return false;
  const vNodes = slots.default();
  return vNodes.some((vNode) => {
    const componentName = (vNode.type as Component).name;
    if (!componentName) return false;
    return (
      [Header.name].includes(componentName) ||
      [Footer.name].includes(componentName)
    );
  });
});

const classes = computed(() => {
  return ["layui-layout", { "layui-layout-vertical": isVertical.value }];
});
</script>

<template>
  <section :class="classes">
    <slot></slot>
  </section>
</template>
