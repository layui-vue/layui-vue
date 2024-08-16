<script setup lang="ts">
import { provide, ref, watch } from "vue";

export interface RadioGroupProps {
  modelValue?: string | boolean | number;
  name?: string;
  disabled?: boolean;
}

defineOptions({
  name: "LayRadioGroup",
});

const props = withDefaults(defineProps<RadioGroupProps>(), {
  disabled: false,
});

const emit = defineEmits(["update:modelValue", "change"]);

const modelValue = ref(props.modelValue);
const disabled = ref(props.disabled);

const changeRadioGroup = (value: string | boolean | number) => {
  emit("change", value);
  emit("update:modelValue", value);
};

provide("radioGroup", {
  name: "LayRadioGroup",
  modelValue: modelValue,
  naiveName: props.name,
  disabled: disabled,
  changeRadioGroup,
});

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
