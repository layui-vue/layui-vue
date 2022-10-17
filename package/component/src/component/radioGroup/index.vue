<script lang="ts">
export default {
  name: "LayRadioGroup",
};
</script>

<script setup lang="ts">
import { provide, ref, watch } from "vue";

export interface RadioGroupProps {
  modelValue?: string | boolean | number;
  name?: string;
  disabled?: boolean;
}

const props = withDefaults(defineProps<RadioGroupProps>(), {
  disabled: false,
});

const emit = defineEmits(["update:modelValue", "change"]);

const modelValue = ref(props.modelValue);
const disabled = ref(props.disabled);

provide("radioGroup", {
  name: "LayRadioGroup",
  modelValue: modelValue,
  naiveName: props.name,
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
  <div class="layui-radio-group">
    <slot></slot>
  </div>
</template>
