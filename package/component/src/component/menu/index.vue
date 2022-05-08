<script lang="ts">
export default {
  name: "LayMenu",
};
</script>

<script setup lang="ts">
import {
  computed,
  ComputedRef,
  provide,
  Ref,
  ref,
  watch,
  WritableComputedRef,
} from "vue";
import "./index.less";

export interface LayMenuProps {
  selectedKey?: string;
  openKeys?: string[];
  tree?: boolean;
  theme?: string;
  inverted?: boolean | string;
  level?: boolean | string;
  collapse?: boolean | string;
  collapseTransition?: boolean | string;
  childSpacing?: boolean;
}

const emit = defineEmits([
  "update:selectedKey",
  "update:openKeys",
  "changeSelectedKey",
  "changeOpenKeys",
]);

const props = withDefaults(defineProps<LayMenuProps>(), {
  selectedKey: "",
  openKeys: () => [],
  tree: false,
  theme: "dark",
  inverted: false,
  level: true,
  collapse: false,
  collapseTransition: true,
  childSpacing: false,
});

const isTree: ComputedRef = computed(() => props.tree);
const isCollapse: ComputedRef = computed(() => props.collapse);
const isCollapseTransition: ComputedRef = computed(
  () => props.collapseTransition
);
const oldOpenKeys: Ref = ref<string[]>(props.openKeys);

const openKeys = computed({
  get() {
    return props.openKeys;
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

watch(
  () => props.collapse,
  () => {
    if (props.collapse) {
      oldOpenKeys.value = props.openKeys;
      openKeys.value = [];
    } else {
      openKeys.value = oldOpenKeys.value;
    }
  },
  { immediate: true }
);

provide("isTree", isTree);
provide("selectedKey", selectedKey);
provide("openKeys", openKeys);
provide("isCollapse", isCollapse);
provide("isCollapseTransition", isCollapseTransition);
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
      childSpacing ? 'layui-nav-child-spacing' : '',
    ]"
  >
    <slot></slot>
  </ul>
</template>
