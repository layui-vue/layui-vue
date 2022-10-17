<script lang="ts">
export default {
  name: "LaySubMenu",
};
</script>

<script setup lang="ts">
import { computed, inject, ref, Ref, useSlots, watchEffect } from "vue";
import LayTransition from "../transition/index.vue";
import SubMenuPopup from "./SubMenuPopup.vue";
import { indentHandle } from "../menu/utils";
import { provideLevel, default as useLevel } from "../menu/useLevel";

export interface SubMenuProps {
  id: string;
  title?: string;
}

const slots = useSlots();
const props = defineProps<SubMenuProps>();

const { level } = useLevel();
const isTree: Ref<boolean> = inject("isTree") as Ref<boolean>;
const selectedKey: Ref<string> = inject("selectedKey") as Ref<string>;
const openKeys: Ref<string[]> = inject("openKeys") as Ref<string[]>;
const indent = inject("indent") as Ref<string | boolean>;
const isCollapse: Ref<boolean | string> = inject("isCollapse") as Ref<
  boolean | string
>;
const isCollapseTransition: Ref<boolean> = inject(
  "isCollapseTransition"
) as Ref<boolean>;

const isOpen = computed(() => {
  return openKeys.value.includes(props.id);
});

const nextLevel = computed(() => level.value + 1);

provideLevel(nextLevel);

const needPopup = ref(false);
watchEffect(() => {
  if (isTree.value) {
    const _isCollapse =
      isCollapse.value === true || isCollapse.value === "true";
    if (_isCollapse && level.value === 1) {
      setTimeout(() => {
        needPopup.value = isTree.value && _isCollapse;
      }, 200);
    } else {
      needPopup.value = isTree.value && _isCollapse;
    }
  } else if (slots.default && slots.default().length > 0) {
    needPopup.value = true;
  }
});

const openHandle = function () {
  if (!isCollapse.value) {
    let newOpenKeys = [...openKeys.value];
    if (openKeys.value.includes(props.id)) {
      newOpenKeys.splice(newOpenKeys.indexOf(props.id), 1);
    } else {
      newOpenKeys.push(props.id);
    }
    openKeys.value = newOpenKeys;
  }
};
</script>

<template>
  <li v-if="!needPopup" class="layui-nav-item">
    <a
      href="javascript:void(0)"
      @click="openHandle()"
      :style="indentHandle({ indent, level, basePadding: 23, isTree })"
    >
      <!-- 图标 -->
      <i v-if="slots.icon" class="layui-sub-menu-icon">
        <slot name="icon"></slot>
      </i>
      <!-- 标题 -->
      <span>
        <slot v-if="slots.title" name="title"></slot>
      </span>
      <!-- 扩展 -->
      <i v-if="slots.expandIcon" class="layui-nav-more">
        <slot name="expandIcon" :isExpand="isOpen"></slot>
      </i>
      <i
        v-else
        :class="[
          isOpen ? 'layui-nav-mored' : '',
          'layui-icon layui-icon-down',
          'layui-nav-more',
        ]"
      ></i>
    </a>
    <template v-if="isTree">
      <lay-transition :enable="isCollapseTransition">
        <div v-if="isOpen">
          <dl class="layui-nav-child">
            <slot></slot>
          </dl>
        </div>
      </lay-transition>
    </template>
  </li>
  <SubMenuPopup v-else :id="id">
    <template v-if="slots.icon" #icon>
      <slot name="icon"></slot>
    </template>
    <template v-if="slots.title" #title>
      <slot name="title"></slot>
    </template>
    <template #expandIcon>
      <slot name="expandIcon"></slot>
    </template>
    <template #default>
      <slot name="default"></slot>
    </template>
  </SubMenuPopup>
</template>
