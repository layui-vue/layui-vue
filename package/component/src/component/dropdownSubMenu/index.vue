<script lang="ts">
export default {
  name: "LayDropdownSubMenu",
};
</script>

<script setup lang="ts">
import { inject, Ref } from "vue";
import LayDropdown from "../dropdown/index.vue";
import LayDropdownMenu from "../dropdownMenu/index.vue";
import LayDropdownMenuItem from "../dropdownMenuItem/index.vue";
import { LayIcon } from "@layui/icons-vue";
import { DropdownPlacement } from "../dropdown/interface";

export type DropdownTrigger = "click" | "hover" | "focus" | "contextMenu";

export interface DropdownSubMenuProps {
  trigger?: DropdownTrigger | DropdownTrigger[];
  placement?: DropdownPlacement;
  disabled?: boolean;
  contentOffset?: number;
}

const props = withDefaults(defineProps<DropdownSubMenuProps>(), {
  trigger: "hover",
  disabled: false,
  placement: "right-start",
  contentOffset: 2,
});
</script>

<template>
  <lay-dropdown
    :trigger="trigger"
    :placement="placement"
    :auto-fit-min-width="false"
    :contentOffset="contentOffset"
    :disabled="disabled"
    updateAtScroll
  >
    <lay-dropdown-menu-item :disabled="disabled">
      <template v-if="$slots.prefix" #prefix>
        <slot name="prefix" />
      </template>
      <template v-if="$slots.default" #default>
        <slot />
      </template>
      <template #suffix>
        <slot name="suffix">
          <lay-icon type="layui-icon-right" size="14px"></lay-icon>
        </slot>
      </template>
    </lay-dropdown-menu-item>
    <template #content>
      <lay-dropdown-menu>
        <slot name="content" />
      </lay-dropdown-menu>
    </template>
  </lay-dropdown>
</template>
