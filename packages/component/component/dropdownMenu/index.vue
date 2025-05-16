<script lang="ts" setup>
import { computed, h, useSlots } from "vue";

defineOptions({
  name: "LayDropdownMenu",
});

const slots = useSlots();

const defaultSlot = computed(() => {
  const children = slots.default ? slots.default() : [];

  return h(
    "div",
    null,
    children.map((child) => {
      if ((child as any)?.type?.name === "LayDropdownSubMenu") {
        child.props = {
          ...child.props,
          teleportProps: {
            disabled: false,
          },
        };
      }
      return child;
    }),
  );
});
</script>

<template>
  <ul class="layui-menu layui-dropdown-menu">
    <defaultSlot />
  </ul>
</template>
