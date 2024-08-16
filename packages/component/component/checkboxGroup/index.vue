<script setup lang="ts">
import { provide, ref, watch } from "vue";

export interface CheckboxGroupProps {
  modelValue?: Array<string | number | object>;
  disabled?: boolean;
}

defineOptions({
  name: "LayCheckboxGroup",
});

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
  changeCheckboxGroup,
});

function changeCheckboxGroup(groupModelValue: any[]) {
  emit("update:modelValue", groupModelValue);
  emit("change", groupModelValue);
}

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
