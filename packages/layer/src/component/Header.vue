<script lang="ts" setup>
import { StyleValue, computed } from "vue";

export interface HeaderProps {
  title: string | boolean | Function;
  titleStyle: string | StyleValue;
  move: boolean;
}

defineOptions({
  name: "Title",
});

const renderContent = function (content: any) {
  if (typeof content === "function") {
    return content();
  }
  return content;
};

const props = defineProps<HeaderProps>();

const titleStyle = computed(() => {
  return [props.move ? "cursor: move" : "", props.titleStyle];
});
</script>

<template>
  <div class="layui-layer-title" :style="titleStyle">
    <slot>{{ renderContent(title) }}</slot>
  </div>
</template>
