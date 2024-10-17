<script setup lang="ts">
import { inject, Ref } from "vue";
import type { DropdownContext } from "../dropdown/interface";
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

const handleClick = () => {
  if (props.disabled) {
    return;
  }
  dropdownCtx?.hide && dropdownCtx?.hide();
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
