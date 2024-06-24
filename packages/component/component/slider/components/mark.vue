<template>
  <div class="layui-slider-mark-text" :style="mark?.style">
    <slot v-if="slot.mark" name="mark" :mark="mark"></slot>
    <template v-else>
      <template v-if="isVNode(mark.label)">
        <component :is="mark.label"></component>
      </template>
      <template v-else>
        {{ mark.label }}
      </template>
    </template>
  </div>
</template>

<script lang="ts" setup>
import { isVNode, useSlots } from "vue";
import { StyledMark } from "../types/sliderType";

export interface Mark {
  mark: StyledMark;
}

defineOptions({
  name: "LaySliderMark",
});
const slot = useSlots();
const props = withDefaults(defineProps<Mark>(), {});
</script>
