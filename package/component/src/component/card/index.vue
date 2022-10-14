<script lang="ts">
export default {
  name: "LayCard",
};
</script>

<script setup lang="ts">
import "./index.less";
import { computed, useSlots } from "vue";
import { String } from "../../types";
import { CardShadow } from "./interface";

export interface CardProps {
  title?: String;
  shadow?: CardShadow;
}

const props = withDefaults(defineProps<CardProps>(), {
  shadow: "always",
});

const slot = useSlots();

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
        <slot name="title">{{ title }}</slot>
      </span>
      <span class="layui-card-header-extra" v-if="slot.extra">
        <slot name="extra"></slot>
      </span>
    </div>
    <div class="layui-card-body">
      <slot name="body" v-if="slot.body"></slot>
      <slot v-else></slot>
    </div>
    <div class="layui-card-footer" v-if="slot.footer">
      <slot name="footer"></slot>
    </div>
  </div>
</template>
