<script lang="ts">
export default {
  name: "LayRadioGroup",
};
</script>

<script setup lang="ts">
import { provide, ref, watch } from "vue";

export interface LayRadioGroupProps {
  modelValue?: string | boolean;
  name?: string;
}

const props = withDefaults(defineProps<LayRadioGroupProps>(), {});

const emit = defineEmits(["update:modelValue", "change"]);

const modelValue = ref(props.modelValue);

provide("radioGroup", { name: "LayRadioGroup", modelValue: modelValue, naiveName: props.name });

watch(
  () => modelValue,
  (val) => {
    emit("change", modelValue.value);
    emit("update:modelValue", modelValue.value);
  },
  { deep: true }
);

watch(
  () => props.modelValue,
  (val) => (modelValue.value = val)
);
</script>

<template>
  <div class="layui-radio-group">
    <slot></slot>
  </div>
</template>
