<script setup lang="ts">
import type { DropdownContext } from "@layui/component/component/dropdown/interface";
import type { ComputedRef, Ref } from "vue";

import { DROPDOWN_INJECTION_KEY } from "@layui/component/component/dropdown/interface";
import useLevel from "@layui/component/component/menu/useLevel";
import { indentHandle } from "@layui/component/component/menu/utils";
import LayTooltip from "@layui/component/component/tooltip/index.vue";
import { computed, inject, useSlots } from "vue";

export interface MenuItemProps {
  id?: string;
  title?: string;
}

defineOptions({
  name: "LayMenuItem",
});

const props = withDefaults(defineProps<MenuItemProps>(), {});

const slots = useSlots();
const { level } = useLevel();
const selectedKey: Ref<string | undefined> = inject(
  "selectedKey",
) as Ref<string>;
const isTree = inject("isTree") as ComputedRef<boolean>;
const isCollapse = inject("isCollapse") as ComputedRef<boolean | string>;
const theme = inject("menuTheme") as Ref<string>;
const indent = inject("indent") as Ref<string | boolean>;
const dropdownCtx = inject<DropdownContext | undefined>(
  DROPDOWN_INJECTION_KEY,
  undefined,
);

function selectHandle() {
  selectedKey.value = props.id;
  dropdownCtx?.hide && dropdownCtx?.hide();
}

const needTooltip = computed(
  () =>
    isTree.value
    && (isCollapse.value === true || isCollapse.value === "true")
    && level.value === 1,
);
</script>

<template>
  <li
    class="layui-nav-item" :class="[{ 'layui-this': selectedKey === id }]"
    :style="indentHandle({ indent, level, isTree })"
    @click="selectHandle()"
  >
    <template v-if="needTooltip">
      <LayTooltip position="right" :is-dark="theme !== 'light'">
        <a href="javascript:void(0)">
          <i v-if="slots.icon">
            <slot name="icon" />
          </i>
        </a>
        <template #content>
          <span v-if="slots.title">
            <slot name="title" />
          </span>
        </template>
      </LayTooltip>
    </template>

    <template v-else>
      <a href="javascript:void(0)">
        <i v-if="slots.icon" class="layui-sub-menu-icon">
          <slot name="icon" />
        </i>
        <span v-if="slots.title">
          <slot name="title" />
        </span>
        <span v-else>
          <slot />
        </span>
      </a>
    </template>
  </li>
</template>
