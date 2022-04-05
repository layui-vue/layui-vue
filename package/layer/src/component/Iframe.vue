<script lang="ts">
export default {
  name: "Iframe",
};
</script>

<script lang="ts" setup>
export interface IframeProps {
  src: string;
}

const props = defineProps<IframeProps>();
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
