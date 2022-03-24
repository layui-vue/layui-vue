<script lang="ts">
export default {
  name: "LayCollapse",
};
</script>

<script setup lang="ts">
import "./index.less";
import { withDefaults, provide, ref, watch } from "vue";

export interface LayCollapseProps {
  modelValue?: number | string | [];
  accordion?: boolean;
  collapseTransition?: boolean;
}

const props = withDefaults(defineProps<LayCollapseProps>(), {
  modelValue: () => [],
  accordion: false,
  collapseTransition: true,
});

// 监听传入的值
watch(
  () => props.modelValue,
  (val, oldVal) => {
    activeValues.value = ([] as any[]).concat(val);
  }
);
const emit = defineEmits(["update:modelValue", "change"]);

const activeValues = ref<Array<any>>(([] as any[]).concat(props.modelValue));

provide("layCollapse", {
  accordion: props.accordion,
  collapseTransition: props.collapseTransition,
  activeValues,
  emit,
});
</script>

<template>
  <div class="layui-collapse">
    <slot></slot>
  </div>
</template>
