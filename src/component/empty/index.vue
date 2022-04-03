<script lang="ts">
export default {
  name: "LayEmpty",
};
</script>

<script setup lang="ts">
import "./index.less";
import { withDefaults } from "vue";

export interface LayEmptyProps {
  description?: string;
  image?: string;
}

const props = withDefaults(defineProps<LayEmptyProps>(), {
  description: "暂无数据",
});
</script>

<template>
  <div class="layui-empty">
    <div class="layui-empty-image">
      <img class="layui-empty-image-default" src="./index.svg" />
    </div>
    <div class="layui-empty-description">{{ description }}</div>
  </div>
</template>
