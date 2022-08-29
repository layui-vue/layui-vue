<script lang="ts">
export default {
  name: "SubMenuPopup",
};
</script>

<script setup lang="ts">
import { computed, inject, Ref, useSlots } from "vue";
import LayDropdown from "../dropdown/index.vue";
import { LayIcon } from "@layui/icons-vue";
import useLevel from "../menu/useLevel";

export interface LaySubMenuPopupProps {
  id: string;
  title?: string;
}
const props = defineProps<LaySubMenuPopupProps>();

const { level } = useLevel();
const isTree: Ref<boolean> = inject("isTree") as Ref<boolean>;
const openKeys: Ref<string[]> = inject("openKeys") as Ref<string[]>;
const theme = inject("menuTheme") as Ref<string>;

const isOpen = computed(() => {
  return openKeys.value.includes(props.id);
});

const computedTheme = computed(() => {
  if (isTree.value) {
    return theme.value === "light" ? "-light" : "";
  }
  return theme.value === "light" ? "" : "-light";
});

const computedExpandIcon = computed(() => {
  if (isTree.value) return "layui-icon-right";
  return level.value === 2 ? "layui-icon-down" : "layui-icon-right";
});

const computedPlacement = computed(() => {
  return !isTree.value && level.value === 2 ? "bottom-start" : "right-start";
});

const computedTrigger = computed(() => {
  return !isTree.value && level.value === 2 ? "click" : "hover";
});
</script>

<template>
  <lay-dropdown
    :trigger="computedTrigger"
    :placement="computedPlacement"
    :autoFitMinWidth="false"
    :contentOffset="3"
    updateAtScroll
    class="layui-sub-menu-popup"
  >
    <li :class="['layui-nav-item']">
      <a href="javascript:void(0)" style="justify-content: space-between">
        <div>
          <!-- 图标 -->
          <i v-if="$slots.icon" class="layui-sub-menu-icon">
            <slot name="icon"></slot>
          </i>

          <!-- 标题 -->
          <span v-if="$slots.title">
            <slot name="title"></slot>
          </span>
        </div>

        <!-- 扩展 -->
        <span v-if="$slots.expandIcon" class="layui-nav-more">
          <slot name="expandIcon">
            <lay-icon :type="computedExpandIcon" />
          </slot>
        </span>
      </a>
    </li>
    <template #content>
      <div
        :class="[
          'layui-sub-menu-popup-content',
          `layui-sub-menu-popup-theme${computedTheme}`,
        ]"
      >
        <slot></slot>
      </div>
    </template>
  </lay-dropdown>
</template>
