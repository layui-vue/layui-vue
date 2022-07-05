<script lang="ts">
export default {
  name: "LayDropdownMenuItem",
};
</script>

<script setup lang="ts">
import { inject, Ref } from "vue";

export interface LayDropdownMenuItemProps {
  disabled?: boolean;
}

const props = withDefaults(defineProps<LayDropdownMenuItemProps>(), {
  disabled: false,
});

const openState: Ref<boolean> = inject("openState") as Ref<boolean>;

const handleClick = () => {
  if (props.disabled) {
    return;
  }
  openState.value = false;
};
</script>

<template>
  <li
    @click="handleClick"
    :class="{ 'layui-disabled': disabled }"
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
