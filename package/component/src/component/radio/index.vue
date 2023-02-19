<script lang="ts">
import { computed, inject } from "vue";
import { RadioSize } from "./typing";
export default {
  name: "LayRadio",
};
</script>

<script setup lang="ts">
import "./index.less";

export interface RadioProps {
  name?: string;
  size?: RadioSize;
  disabled?: boolean;
  modelValue?: string | boolean | number;
  value?: string | boolean | number;
  label?: string;
}

export interface RadioEmits {
  (e: "update:modelValue", value: string | boolean | number | undefined): void;
  (e: "change", value: string | boolean | number | undefined): void;
}

const props = withDefaults(defineProps<RadioProps>(), {
  size: "md",
});

const emit = defineEmits<RadioEmits>();

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
      radioGroup.modelValue.value = props.value;
    } else {
      if (val) {
        emit("change", props.value);
        emit("update:modelValue", props.value);
      }
    }
  },
});

const handleClick = function () {
  if (!ifDisabled.value) {
    isChecked.value = !isChecked.value;
  }
};
const ifDisabled = computed(() => {
  if (props.disabled) {
    return true;
  }
  if (radioGroup.hasOwnProperty("disabled") && radioGroup.disabled.value) {
    return true;
  }
  return false;
});
</script>

<template>
  <span class="layui-radio" :size="size">
    <input type="radio" :value="value" :name="naiveName" />
    <div
      class="layui-unselect layui-form-radio"
      :class="{
        'layui-form-radioed': isChecked,
        'layui-radio-disabled layui-disabled': ifDisabled,
      }"
      @click.stop="handleClick"
    >
      <i v-if="isChecked" class="layui-anim layui-icon layui-anim-scaleSpring"
        >&#xe643;</i
      >
      <i v-else class="layui-icon layui-form-radioed">&#xe63f;</i>
      <span>
        <slot>{{ label }}</slot>
      </span>
    </div>
  </span>
</template>
