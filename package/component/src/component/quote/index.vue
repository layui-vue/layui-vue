<script lang="ts">
export default {
  name: "LayQuote",
};
</script>

<script setup lang="ts">
import "./index.less";

export interface QuoteProps {
  type?: string;
}

const props = defineProps<QuoteProps>();
</script>

<template>
  <div class="layui-quote" :class="[type ? `layui-quote-${props.type}` : '']">
    <slot></slot>
  </div>
</template>
