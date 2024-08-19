<script setup lang="ts">
import "./index.less";
import { computed, inject } from "vue";
import { RadioButtonSize } from "./typing";
import { ButtonType } from "../button/interface";
import useProps from "./index.hooks";
import LayButton from "../button/index.vue";

export interface RadioProps {
  name?: string;
  size?: RadioButtonSize;
  disabled?: boolean;
  modelValue?: string | boolean | number;
  value?: string | boolean | number;
  label?: string;
}

export interface RadioButtonEmits {
  (e: "update:modelValue", value: string | boolean | number | undefined): void;
  (e: "change", value: string | boolean | number | undefined): void;
}

defineOptions({
  name: "LayRadioButton",
});

const props = withDefaults(defineProps<RadioProps>(), {});

const { size } = useProps(props);

const emit = defineEmits<RadioButtonEmits>();

const radioGroup: any = inject("radioGroup", {});

const isGroup = computed(() => {
  return radioGroup != undefined && radioGroup?.name === "LayRadioGroup";
});

const naiveName = computed(() => {
  if (radioGroup.naiveName) {
    return radioGroup.naiveName;
  } else {
    return props.name;
  }
});

const isChecked = computed({
  get() {
    if (isGroup.value) {
      return radioGroup.modelValue.value === props.value;
    } else {
      return props.modelValue === props.value;
    }
  },
  set(val) {
    if (isGroup.value) {
      radioGroup.changeRadioGroup(props.value);
    } else {
      if (val) {
        emit("change", props.value);
        emit("update:modelValue", props.value);
      }
    }
  },
});

const handleClick = function () {
  if (!isDisabled.value) {
    isChecked.value = !isChecked.value;
  }
};

const isDisabled = computed(() => {
  if (props.disabled) {
    return true;
  }
  if (radioGroup.hasOwnProperty("disabled") && radioGroup.disabled.value) {
    return true;
  }
  return false;
});

const buttonType = computed(() => {
  if (isChecked.value) {
    return "primary" as ButtonType;
  }
  return "default" as ButtonType;
});
</script>

<template>
  <span class="layui-radio-button" :size="size">
    <input type="radio" :value="value" :name="naiveName" />
    <lay-button
      :size="size"
      :type="buttonType"
      :disabled="isDisabled"
      @click.stop="handleClick"
    >
      <slot>{{ label }}</slot>
    </lay-button>
  </span>
</template>
