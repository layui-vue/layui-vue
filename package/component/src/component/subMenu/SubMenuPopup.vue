<script lang="ts">
export default {
  name: "SubMenuPopup",
};
</script>

<script setup lang="ts">
import { computed, inject, Ref } from "vue";
import LayDropdown from "../dropdown/index.vue";
import { LayIcon } from "@layui/icons-vue";
import useLevel from "../menu/useLevel";

export interface SubMenuPopupProps {
  id: string;
  title?: string;
}

const props = defineProps<SubMenuPopupProps>();

const { level } = useLevel();
const isTree: Ref<boolean> = inject("isTree") as Ref<boolean>;
const theme = inject("menuTheme") as Ref<string>;

const computedTheme = computed(() => {
  return theme.value === "light" ? "-light" : "";
});

const computedExpandIcon = computed(() => {
  if (isTree.value) return "layui-icon-right";
  return level.value === 2 ? "layui-icon-down" : "layui-icon-right";
});

const computedPlacement = computed(() => {
  return !isTree.value && level.value === 2 ? "bottom" : "right-start";
});
</script>

<template>
  <lay-dropdown
    trigger="hover"
    class="layui-sub-menu-popup"
    :placement="computedPlacement"
    :autoFitMinWidth="false"
    :updateAtScroll="true"
    :contentOffset="3"
  >
    <li class="layui-nav-item">
      <a href="javascript:void(0)" style="justify-content: space-between">
        <div>
          <i v-if="$slots.icon" class="layui-sub-menu-icon">
            <slot name="icon"></slot>
          </i>
          <span v-if="$slots.title">
            <slot name="title"></slot>
          </span>
        </div>
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
