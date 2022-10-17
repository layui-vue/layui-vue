<script lang="ts">
export default {
  name: "LayCollapse",
};
</script>

<script setup lang="ts">
import "./index.less";
import { withDefaults, provide, ref, watch } from "vue";

export interface CollapseProps {
  accordion?: boolean;
  modelValue?: number | string | number[] | string[];
  collapseTransition?: boolean;
}

const props = withDefaults(defineProps<CollapseProps>(), {
  modelValue: () => [],
  accordion: false,
  collapseTransition: true,
});

watch(
  () => props.modelValue,
  (val) => {
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
