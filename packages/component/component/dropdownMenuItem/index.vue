<script setup lang="ts">
import type { DropdownContext } from "../dropdown/interface";
import { inject } from "vue";
import { DROPDOWN_INJECTION_KEY } from "../dropdown/interface";

export interface DropdownMenuItemProps {
  disabled?: boolean;
}

defineOptions({
  name: "LayDropdownMenuItem",
});

const props = withDefaults(defineProps<DropdownMenuItemProps>(), {
  disabled: false,
});

const dropdownCtx = inject<DropdownContext>(DROPDOWN_INJECTION_KEY, {});

function handleClick() {
  if (props.disabled) {
    return;
  }
  dropdownCtx?.hide && dropdownCtx?.hide();
}
</script>

<template>
  <li
    :class="{ 'layui-disabled': disabled }"
    :style="$slots.suffix ? `justify-content: space-between;` : ''"
    @click="handleClick"
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
