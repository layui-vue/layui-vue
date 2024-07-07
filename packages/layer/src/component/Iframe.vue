<script lang="ts" setup>
import { computed } from "vue";

export interface IframeProps {
  src?: string;
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
