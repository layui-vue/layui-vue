<script lang="ts">
export default {
  name: "LayMenu",
};
</script>

<script setup lang="ts">
import { computed, ComputedRef, provide, Ref, ref, watch } from "vue";
import { provideLevel } from "./useLevel";
import "./index.less";

export interface MenuProps {
  selectedKey?: string;
  openKeys?: string[];
  tree?: boolean;
  theme?: string;
  inverted?: boolean | string;
  level?: boolean | string;
  collapse?: boolean | string;
  collapseTransition?: boolean | string;
  indent?: boolean | string; // 菜单栏是否缩进
}

const emit = defineEmits([
  "update:selectedKey",
  "update:openKeys",
  "changeSelectedKey",
  "changeOpenKeys",
]);

const props = withDefaults(defineProps<MenuProps>(), {
  selectedKey: "",
  openKeys: () => [],
  tree: false,
  theme: "dark",
  inverted: false,
  level: true,
  collapse: false,
  collapseTransition: true,
  indent: false,
});

const isTree: ComputedRef<boolean> = computed(() => props.tree);
const isCollapse: ComputedRef<boolean | string> = computed(
  () => props.collapse
);
const isCollapseTransition: ComputedRef = computed(
  () => props.collapseTransition
);
const oldOpenKeys: Ref = ref<string[]>(props.openKeys);
const menuTheme = computed(() => props.theme);

const openKeys = computed({
  get() {
    return props.collapse ? [] : props.openKeys;
  },
  set(val) {
    emit("update:openKeys", val);
    emit("changeOpenKeys", val);
  },
});

const selectedKey = computed({
  get() {
    return props.selectedKey;
  },
  set(val) {
    emit("update:selectedKey", val);
    emit("changeSelectedKey", val);
  },
});

const indent = computed(() => {
  return props.indent;
});

watch(
  () => props.collapse,
  () => {
    if (props.collapse) {
      oldOpenKeys.value = props.openKeys;
      openKeys.value = [];
    } else {
      openKeys.value = oldOpenKeys.value;
    }
  }
);

provideLevel(1);
provide("isTree", isTree);
provide("selectedKey", selectedKey);
provide("openKeys", openKeys);
provide("isCollapse", isCollapse);
provide("isCollapseTransition", isCollapseTransition);
provide("menuTheme", menuTheme);
provide("indent", indent);
</script>

<template>
  <ul
    class="layui-nav"
    :class="[
      level ? '' : 'not-level',
      inverted ? 'inverted' : '',
      tree ? 'layui-nav-tree' : '',
      theme === 'dark' ? 'layui-nav-dark' : 'layui-nav-light',
      collapse ? 'layui-nav-collapse' : '',
    ]"
  >
    <slot></slot>
  </ul>
</template>
