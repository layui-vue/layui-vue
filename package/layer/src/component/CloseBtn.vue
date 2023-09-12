<script lang="ts">
export default {
  name: "CloseBtn",
};
</script>

<script lang="ts" setup>
import { defineEmits } from "vue";

export interface CloseBtnProps {
  closeBtn?: number | string | boolean;
}

const props = defineProps<CloseBtnProps>();

const emit = defineEmits(["closeHandle"]);

const closeHandle = () => {
  emit("closeHandle");
};
</script>

<template>
  <a
    :class="['layui-layer-ico layui-layer-close layui-layer-close' + closeBtn]"
    href="javascript:;"
    @click="closeHandle"
  ></a>
</template>
