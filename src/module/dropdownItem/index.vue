<template>
  <li>
    <div class="layui-menu-body-title" @click="click">
      <slot />
    </div>
  </li>
</template>

<script setup name="LayDropdownItem" lang="ts">
import { inject, Ref } from "vue";

const openState: Ref<boolean> = inject("openState") as Ref<boolean>;

const click = function () {
  openState.value = false;
};
</script>
