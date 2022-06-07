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
  <li>
    <div class="layui-menu-body-title" @click="handleClick">
      <slot></slot>
    </div>
  </li>
</template>
