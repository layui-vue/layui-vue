<script lang="ts">
export default {
  name: "LayEmpty",
};
</script>

<script setup lang="ts">
import "./index.less";
import { withDefaults } from "vue";
import { String } from "src/types";

export interface LayEmptyProps {
  description?: String;
  image?: String;
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
    <div class="layui-empty-description">
      {{ description }}
    </div>
    <div class="layui-empty-extra">
      <slot name="extra"></slot>  
    </div> 
  </div>
</template>
