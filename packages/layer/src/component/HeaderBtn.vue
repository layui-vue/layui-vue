<script setup lang="ts">
import { computed } from "vue";
import { LayIcon } from "@layui/icons-vue";
import "@layui/icons-vue/lib/index.css";

export interface HeaderBtnProps {
  maxmin?: boolean;
  min?: boolean;
  max?: boolean;
  closeBtn?: string | boolean;
}

defineOptions({
  name: "HeaderBtn",
});

const props = withDefaults(defineProps<HeaderBtnProps>(), {
  closeBtn: "1",
});
const emits = defineEmits(["onMin", "onMax", "onClose"]);

const closeIcon = computed(() => {
  return props.closeBtn === "1" ? "layui-icon-close" : "layui-icon-clear";
});

const hanldeMin = () => {
  emits("onMin");
};

const hanldeMax = () => {
  emits("onMax");
};

const hanldeClose = () => {
  emits("onClose");
};
</script>

<template>
  <span class="layui-layer-setwin">
    <LayIcon
      v-if="props.maxmin && !props.max"
      :type="props.min ? 'layui-icon-screen-full' : 'layui-icon-subtraction'"
      size="16"
      @click="hanldeMin"
    ></LayIcon>
    <LayIcon
      v-if="props.maxmin && !props.min"
      :type="props.max ? 'layui-icon-screen-restore' : 'layui-icon-screen-full'"
      size="16"
      @click="hanldeMax"
    ></LayIcon>
    <LayIcon
      v-if="props.closeBtn"
      :class="`layui-layer-close${closeBtn}`"
      :type="closeIcon"
      size="16"
      @click="hanldeClose"
    ></LayIcon>
  </span>
</template>
