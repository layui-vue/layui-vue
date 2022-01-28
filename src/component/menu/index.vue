<template>
  <ul class="layui-nav" :class="[tree ? 'layui-nav-tree' : '']">
    <slot></slot>
  </ul>
</template>

<script setup name="LayMenu" lang="ts">
import { computed, defineProps, provide } from "vue";
import "./index.less";

export interface LayMenuProps {
  selectedKey?: string;
  openKeys?: string[];
  tree?: boolean;
}

const emit = defineEmits(["update:selectedKey", "update:openKeys"]);

const props = withDefaults(defineProps<LayMenuProps>(), {
  selectedKey: "",
  openKeys: () => [],
  tree: false,
});

const isTree = computed(() => props.tree);

const openKeys = computed({
  get() {
    return props.openKeys;
  },
  set(val) {
    emit("update:selectedKey", val);
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

provide("isTree", isTree);
provide("selectedKey", selectedKey);
provide("openKeys", openKeys);
</script>
