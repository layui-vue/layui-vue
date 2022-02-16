<script lang="ts">
export default {
  name: "LayCarouselItem",
};
</script>

<script setup lang="ts">
import { inject } from "vue";

const props = defineProps<{
  id: string;
}>();

const active = inject("active");
</script>

<template>
  <li :class="[active === id ? 'layui-this' : '']">
    <slot></slot>
  </li>
</template>
