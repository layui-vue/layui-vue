<script lang="ts">
export default {
  name: "LayMenu",
};
</script>

<script setup lang="ts">
import { computed, provide, ref, watch } from "vue";
import "./index.less";

export interface LayMenuProps {
  selectedKey?: string;
  openKeys?: string[];
  tree?: boolean;
  theme?: string;
  inverted?: boolean | string;
  level?: boolean | string;
  collapse?: boolean | string;
}

const emit = defineEmits(["update:selectedKey", "update:openKeys"]);

const props = withDefaults(defineProps<LayMenuProps>(), {
  selectedKey: "",
  openKeys: () => [],
  tree: false,
  theme: "dark",
  inverted: false,
  level: false,
  collapse: false,
});

let oldOpenKeys = ref<string[]>([]);

const isTree = computed(() => props.tree);
const isCollapse = computed(() => props.collapse);

const openKeys = computed({
  get() {
    return props.openKeys;
  },
  set(val) {
    emit("update:openKeys", val);
  },
});

const selectedKey = computed({
  get() {
    return props.selectedKey;
  },
  set(val) {
    emit("update:selectedKey", val);
  },
});

watch(
  () => props.collapse,
  () => {
    if (props.collapse) {
      // 删除所有打开
      oldOpenKeys.value = props.openKeys;
      emit("update:openKeys", []);
    } else {
      // 赋值所有打开
      emit("update:openKeys", oldOpenKeys.value);
    }
  },
  { immediate: true }
);

provide("isTree", isTree);
provide("selectedKey", selectedKey);
provide("openKeys", openKeys);
provide("isCollapse", isCollapse);
</script>

<template>
  <ul
    class="layui-nav"
    :class="[
      level ? 'level' : '',
      inverted ? 'inverted' : '',
      tree ? 'layui-nav-tree' : '',
      theme === 'dark' ? 'layui-nav-dark' : 'layui-nav-light',
      collapse ? 'layui-nav-collapse' : '',
    ]"
  >
    <slot></slot>
  </ul>
</template>
