<script lang="ts" setup>
import type { VNodeTypes } from "vue";
import { computed } from "vue";

export interface IframeProps {
  src?: string | Function | object | VNodeTypes;
}

defineOptions({
  name: "Iframe",
});

const props = defineProps<IframeProps>();

const src = computed(() => {
  return props.src as string;
});
</script>

<template>
  <iframe
    scrolling="auto"
    class="layui-layer-iframe"
    allowtransparency="true"
    frameborder="0"
    :src="src"
  ></iframe>
</template>
