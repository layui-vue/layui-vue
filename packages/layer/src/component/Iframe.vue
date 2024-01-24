<script lang="ts">
import { computed, VNodeTypes } from "vue";
export default {
  name: "Iframe",
};
</script>

<script lang="ts" setup>
export interface IframeProps {
  src?: string | Function | object | VNodeTypes;
}

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
