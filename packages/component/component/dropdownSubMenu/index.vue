<script setup lang="ts">
import type { DropdownTeleportProps } from "@layui/component/component/dropdown/interface";
import type { Placement, PopperTrigger } from "@layui/component/component/popper/index";

import LayDropdown from "@layui/component/component/dropdown/index.vue";
import LayDropdownMenu from "@layui/component/component/dropdownMenu/index.vue";
import LayDropdownMenuItem from "@layui/component/component/dropdownMenuItem/index.vue";
import { LayIcon } from "@layui/icons-vue";

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

withDefaults(defineProps<DropdownSubMenuProps>(), {
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
  <LayDropdown
    :trigger="trigger"
    :placement="placement"
    :auto-fit-min-width="false"
    :content-offset="contentOffset"
    :teleport-props="teleportProps"
    :disabled="disabled"
  >
    <LayDropdownMenuItem :disabled="disabled">
      <template v-if="$slots.prefix" #prefix>
        <slot name="prefix" />
      </template>
      <template v-if="$slots.default" #default>
        <slot />
      </template>
      <template #suffix>
        <slot name="suffix">
          <LayIcon type="layui-icon-right" size="14px" />
        </slot>
      </template>
    </LayDropdownMenuItem>
    <template #content>
      <LayDropdownMenu>
        <slot name="content" />
      </LayDropdownMenu>
    </template>
  </LayDropdown>
</template>
