<script lang="ts">
export default {
  name: "LayEmpty",
};
</script>

<script setup lang="ts">
import "./index.less";
import { useSlots, withDefaults } from "vue";

export interface LayEmptyProps {
  description?: string;
  image?: string;
}

const props = withDefaults(defineProps<LayEmptyProps>(), {
  description: "暂无数据",
});

const slots = useSlots();
</script>

<template>
  <div class="layui-empty">
    <div class="layui-empty-image">
      <slot v-if="slots.image" name="image"></slot>
      <img v-else class="layui-empty-image-default" src="./index.svg" />
    </div>
    <div class="layui-empty-description">{{ description }}</div>
    <div class="layui-empty-extra">
      <slot name="extra"></slot>
    </div>
  </div>
</template>
