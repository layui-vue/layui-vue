<template>
  <template v-if="enable">
    <LayCollapseTransition v-if="type === 'collapse'"><slot></slot></LayCollapseTransition>
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
import LayCollapseTransition from "./collapseTransition.vue";
import LayFadeTransition from "./fadeTransition.vue";

export interface LayTransitionProps {
  type?: string;
  enable?: boolean;
}

const props = withDefaults(defineProps<LayTransitionProps>(), {
  type: "collapse",
  enable: true
});
</script>
