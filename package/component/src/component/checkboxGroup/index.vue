<script lang="ts">
export default {
  name: "LayCheckboxGroup",
};
</script>

<script setup lang="ts">
import { provide, ref, watch } from "vue";
import { Recordable } from "../../types";

export interface CheckboxGroupProps {
  modelValue?: Recordable[];
  disabled?: boolean;
}

const props = withDefaults(defineProps<CheckboxGroupProps>(), {
  modelValue: () => [],
  disabled: false,
});

const emit = defineEmits(["update:modelValue", "change"]);

const modelValue = ref(props.modelValue);
const disabled = ref(props.disabled);

provide("checkboxGroup", {
  name: "LayCheckboxGroup",
  modelValue: modelValue,
  disabled: disabled,
});

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

watch(
  () => props.disabled,
  (val) => (disabled.value = val)
);
</script>

<template>
  <div
    class="layui-checkbox-group"
    :class="{ 'layui-checkbox-group-disabled': disabled }"
  >
    <slot></slot>
  </div>
</template>
