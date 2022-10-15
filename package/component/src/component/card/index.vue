<script lang="ts">
export default {
  name: "LayCard",
};
</script>

<script setup lang="ts">
import "./index.less";
import { computed, useSlots } from "vue";
import { CardShadow } from "./interface";

export interface CardProps {
  title?: string;
  shadow?: CardShadow;
}

const props = withDefaults(defineProps<CardProps>(), {
  shadow: "always",
});

const slots = useSlots();

const classes = computed(() => {
  return {
    shadow: props.shadow === "always",
    "is-hover-shadow": props.shadow === "hover",
  };
});
</script>

<template>
  <div class="layui-card" :class="classes">
    <div class="layui-card-header" v-if="slots.title || title || slots.extra">
      <span class="layui-card-header-title">
        <slot name="title">{{ title }}</slot>
      </span>
      <span class="layui-card-header-extra" v-if="slots.extra">
        <slot name="extra"></slot>
      </span>
    </div>
    <div class="layui-card-body">
      <slot name="body" v-if="slots.body"></slot>
      <slot v-else></slot>
    </div>
    <div class="layui-card-footer" v-if="slots.footer">
      <slot name="footer"></slot>
    </div>
  </div>
</template>
