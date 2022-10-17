<template>
  <template v-if="enable">
    <LayCollapseTransition v-if="type === 'collapse'"
      ><slot></slot
    ></LayCollapseTransition>
    <LayFadeTransition v-if="type === 'fade'"><slot></slot></LayFadeTransition>
  </template>
  <template v-else>
    <slot></slot>
  </template>
</template>

<script lang="ts">
export default {
  name: "LayTransition",
};
</script>

<script setup lang="ts">
import { provide } from "vue";
import LayCollapseTransition from "./transitions/collapseTransition.vue";
import LayFadeTransition from "./transitions/fadeTransition.vue";

export interface TransitionProps {
  type?: string;
  enable?: boolean;
  time?: string | number;
}

const props = withDefaults(defineProps<TransitionProps>(), {
  type: "collapse",
  enable: true,
  time: 0.3,
});

provide("time", props.time);
</script>
