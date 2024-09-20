<script lang="ts" setup>
import { PropsContentType } from "../types";
import { RenderFunction, StyleValue, computed } from "vue";
import LayRender from "../../../component/component/_components/render";

export interface HeaderProps {
  title: string | boolean | Function | PropsContentType;
  titleStyle: string | StyleValue;
  move: boolean;
}

defineOptions({
  name: "Title",
});

const props = defineProps<HeaderProps>();

const titleStyle = computed(() => {
  return [props.move ? "cursor: move" : "", props.titleStyle];
});
</script>

<template>
  <div class="layui-layer-title" :style="titleStyle">
    <LayRender :render="() => (title as RenderFunction)"></LayRender>
  </div>
</template>
