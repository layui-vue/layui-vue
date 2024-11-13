<script setup lang="ts">
import type { DropdownTeleportProps } from "../dropdown/interface";

import LayDropdown from "../dropdown/index.vue";
import LayDropdownMenu from "../dropdownMenu/index.vue";
import LayDropdownMenuItem from "../dropdownMenuItem/index.vue";
import { LayIcon } from "@layui/icons-vue";
import type { PopperTrigger, Placement } from "../popper/index";

export interface DropdownSubMenuProps {
  trigger?: PopperTrigger | Array<PopperTrigger>;
  placement?: Placement;
  disabled?: boolean;
  contentOffset?: number;
  teleportProps?: DropdownTeleportProps;
}

defineOptions({
  name: "LayDropdownSubMenu",
});

const props = withDefaults(defineProps<DropdownSubMenuProps>(), {
  trigger: () => ["hover"],
  disabled: false,
  placement: "right-start",
  contentOffset: 2,
  teleportProps: () => ({
    disabled: true,
  }),
});
</script>

<template>
  <lay-dropdown
    :trigger="trigger"
    :placement="placement"
    :auto-fit-min-width="false"
    :contentOffset="contentOffset"
    :teleportProps="teleportProps"
    :disabled="disabled"
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
