<script lang="ts">
export default {
  name: "CloseBtn",
};
</script>

<script lang="ts" setup>
import { computed, defineEmits } from "vue";

const emit = defineEmits(["closeHandle"]);

const closeHandle = () => {
  emit("closeHandle");
};
</script>

<template>
  <a
    class="layui-layer-ico layui-layer-close layui-layer-close1"
    href="javascript:;"
    @click="closeHandle"
  ></a>
</template>
