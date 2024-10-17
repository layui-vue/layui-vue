<script lang="ts" setup>
import { PropsContentType } from "../types";
import { StyleValue, computed } from "vue";
import LayRender from "@layui/component/component/_components/render";

import { renderContent } from "../utils";

export interface HeaderProps {
  title: PropsContentType;
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
    <slot>
      <LayRender :render="() => renderContent(title)"></LayRender>
    </slot>
  </div>
</template>
