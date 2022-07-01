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
<style lang="less">
// popup-menu 面板样式
.layui-sub-menu-popup.layui-dropdown > dl {
  border: unset;
  border-radius: 2px;
  background-color: #393d49;
}
// popup-menu item样式
.layui-nav.layui-nav-collapse {
  .layui-sub-menu-popup dl .layui-nav-item {
    width: 100%;
    > a {
      display: flex;
      align-items: center;
      text-overflow: ellipsis;
      padding: 5px 20px 5px 20px;
      // height: 35px;
      // width: 95px;

      .layui-sub-menu-icon {
        margin-right: 8px;
      }
    }

    span {
      display: inline-block;
      margin-left: 0;
    }

    .layui-nav-more {
      position: relative;
      display: inline-block;
      font-size: 12.5px !important;
      margin-top: 0;
      margin-left: 30px;
      padding: 0;
      right: -8px;
    }
  }
}
</style>
