<script lang="ts">
export default {
  name: "LayCarouselItem",
};
</script>

<script setup lang="ts">
import { inject, Ref } from "vue";

const props = defineProps<{
  id: string;
}>();

const active = inject("active");
const slotsChange: Ref<boolean> = inject("slotsChange") as Ref<boolean>;
slotsChange.value = !slotsChange.value;

</script>

<template>
  <li :class="[active === id ? 'layui-this' : '']">
    <slot></slot>
  </li>
</template>
