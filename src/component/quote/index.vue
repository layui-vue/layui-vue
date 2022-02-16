<script lang="ts">
export default {
  name: "LayQuote",
};
</script>

<script setup lang="ts">
import "./index.less";

export interface LayQuoteProps {
  type?: string;
}

const props = defineProps<LayQuoteProps>();
</script>

<template>
  <blockquote
    class="layui-quote"
    :class="[type ? `layui-quote-${props.type}` : '']"
  >
    <slot></slot>
  </blockquote>
</template>
