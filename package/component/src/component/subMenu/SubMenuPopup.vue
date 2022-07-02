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

const openKeys: Ref<string[]> = inject("openKeys") as Ref<string[]>;
const { level } = useLevel();

const isOpen = computed(() => {
  return openKeys.value.includes(props.id);
});
</script>

<template>
  <lay-dropdown
    trigger="hover"
    placement="right-top"
    :autoFitMinWidth="false"
    :contentOffset="3"
    class="layui-sub-menu-popup"
  >
    <li :class="['layui-nav-item']">
      <a href="javascript:void(0)">
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
            <lay-icon type="layui-icon-right"></lay-icon>
          </slot>
        </span>
      </a>
    </li>
    <template #content>
      <slot></slot>
    </template>
  </lay-dropdown>
</template>
