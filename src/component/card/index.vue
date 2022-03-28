<script lang="ts">
export default {
  name: "LayCard",
};
</script>

<script setup lang="ts">
import { computed, useSlots } from "vue";
import "./index.less";
import { String } from "src/types";
import { CardShadow } from "./interface";

const slot = useSlots();

export interface LayCardProps {
  title?: String;
  shadow?: CardShadow;
}

const props = withDefaults(defineProps<LayCardProps>(), {
  shadow: "always",
});

const classes = computed(() => {
  return {
    shadow: props.shadow === "always",
    "is-hover-shadow": props.shadow === "hover",
  };
});
</script>

<template>
  <div class="layui-card" :class="classes">
    <div class="layui-card-header" v-if="slot.title || title || slot.extra">
      <span class="layui-card-header-title">
        <slot name="title" v-if="slot.title"></slot>
        <template v-else>{{ title }}</template>
      </span>
      <span class="layui-card-header-extra">
        <slot name="extra" v-if="slot.extra"></slot>
      </span>
    </div>
    <div class="layui-card-body">
      <slot name="body" v-if="slot.body"></slot>
      <slot v-else></slot>
    </div>
  </div>
</template>
