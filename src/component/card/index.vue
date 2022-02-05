<script lang="ts">
export default {
  name: "LayCard"
}
</script>

<script setup lang="ts">
import { useSlots } from "vue";
import "./index.less";

export interface LayCardProps {
  title?: string;
}

const slot = useSlots();

const props = defineProps<LayCardProps>();
</script>

<template>
  <div class="layui-card">
    <div class="layui-card-header" v-if="slot.header || title">
      <slot name="header" v-if="slot.header"></slot>
      <span v-else>{{ title }}</span>
    </div>
    <div class="layui-card-body">
      <slot name="body" v-if="slot.body"></slot>
      <slot v-else></slot>
    </div>
  </div>
</template>