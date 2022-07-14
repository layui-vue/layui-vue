<script lang="ts">
import { computed, inject } from "vue";
export default {
  name: "LayRadio",
};
</script>

<script setup lang="ts">
import "./index.less";
import { disable } from "@umijs/ssr-darkreader";

export interface LayRadioProps {
  modelValue?: string | boolean;
  disabled?: boolean;
  value?: string;
  label?: string;
  name?: string;
}

const props = defineProps<LayRadioProps>();

const emit = defineEmits(["update:modelValue", "change"]);

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
  <span class="layui-radio">
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
