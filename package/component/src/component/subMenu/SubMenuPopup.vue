<script lang="ts">
export default {
  name: "SubMenuPopup",
};
</script>
<script setup lang="ts">
import { computed, inject, Ref, useSlots } from "vue";
import LayDropdown from "../dropdown/index.vue";
import useLevel from "../menu/useLevel";

export interface LaySubMenuPopupProps {
  id: string;
  title?: string;
}

const slots = useSlots();
const props = defineProps<LaySubMenuPopupProps>();

const openKeys: Ref<string[]> = inject("openKeys") as Ref<string[]>;
const { level } = useLevel();

const isOpen = computed(() => {
  return openKeys.value.includes(props.id);
});
</script>

<template>
  <li :class="['layui-nav-item sub-menu-popup', level > 2 ? 'original' : '']">
    <lay-dropdown
      trigger="hover"
      placement="right-top"
      :autoFitMinWidth="false"
      :contentOffset="3"
    >
      <a href="javascript:void(0)">
        <!-- 图标 -->
        <i>
          <slot v-if="slots.icon" name="icon"></slot>
        </i>
        <!-- 标题 -->
        <span>
          <slot v-if="slots.title" name="title"></slot>
        </span>
        <!-- 扩展 -->
        <i v-if="slots.expandIcon" class="layui-nav-more">
          <slot name="expandIcon">
            <lay-icon type="layui-icon-right"></lay-icon>
          </slot>
        </i>
      </a>
      <template #content>
        <slot></slot>
      </template>
    </lay-dropdown>
  </li>
</template>
<style lang="less">
.sub-menu-popup {
  line-height: inherit;
}

.sub-menu-popup > .layui-dropdown > div > a {
  width: auto;
  display: block;
  text-overflow: clip;
  height: 40px;
  line-height: 40px;
  position: relative;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  padding: 5px 23px 5px 23px;
}

.sub-menu-popup > .layui-dropdown dl {
  border-radius: 4px;
  background-color: #393d49;
}

.sub-menu-popup > .layui-dropdown dl > li > a {
  span {
    display: inline;
  }

  .layui-nav-item > a {
    text-overflow: clip;
  }

  .layui-nav-more {
    display: inline-block;
  }
}

.layui-nav.layui-nav-collapse .sub-menu-popup.original {
  width: 100%;

  span {
    display: inline;
  }

  .layui-nav-item > a {
    text-overflow: clip;
  }

  .layui-nav-more {
    display: inline-block;
    right: 2px;
    top: 5.5px;
  }
}
</style>
