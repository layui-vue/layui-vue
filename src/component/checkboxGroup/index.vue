<script lang="ts">
export default {
  name: "LayCheckboxGroup",
};
</script>

<script setup lang="ts">
import { computed, defineProps, provide, ref, watch } from "vue";
import { Recordable } from "../../types";

export interface LayCheckboxGroupProps {
  modelValue?: Recordable[];
}

const props = withDefaults(defineProps<LayCheckboxGroupProps>(), {
  modelValue: () => [],
});

const emit = defineEmits(["update:modelValue", "change"]);

const modelValue = ref(props.modelValue);

provide("checkboxGroup", { name: "LayCheckboxGroup", modelValue: modelValue });

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
  <div class="layui-checkbox-group">
    <slot></slot>
  </div>
</template>