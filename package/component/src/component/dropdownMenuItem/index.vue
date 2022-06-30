<script lang="ts">
export default {
  name: "LayDropdownMenuItem",
};
</script>

<script setup lang="ts">
import { inject, Ref } from "vue";

const openState: Ref<boolean> = inject("openState") as Ref<boolean>;

const handleClick = () => {
  openState.value = false;
};
</script>

<template>
  <li
    @click="handleClick"
    :style="$slots.suffix ? `justify-content: space-between;` : ''"
  >
    <span class="layui-menu-body-title">
      <span v-if="$slots.prefix" class="layui-dropdown-menu-prefix">
        <slot name="prefix" />
      </span>
      <slot />
    </span>
    <span v-if="$slots.suffix" class="layui-dropdown-menu-suffix">
      <slot name="suffix" />
    </span>
  </li>
</template>
