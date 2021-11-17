<script lang="ts">
export default {
  name: "LaySwitch",
};
</script>

<script setup lang="ts">
import { defineProps, defineEmits } from "vue";
import "./index.less"

export interface LaySwitchProps {
  modelValue: boolean;
  disabled?: boolean;
  activeText?: string;
  inactiveText?: string;
}

const props = withDefaults(defineProps<LaySwitchProps>(), {
  activeText: "启用",
  inactiveText: "禁用",
});

const emit = defineEmits(["update:modelValue", "change"]);

const handleClick = function () {
  if (!props.disabled) {
    emit("update:modelValue", !props.modelValue);
    emit("change", !props.modelValue);
  }
};
</script>

<template>
  <span @click.stop="handleClick">
    <div
      class="layui-unselect layui-form-switch"
      :class="{
        'layui-form-onswitch': modelValue,
        'layui-checkbox-disbaled layui-disabled': disabled,
      }"
    >
      <em>{{ modelValue == true ? activeText : inactiveText }}</em>
      <i />
    </div>
  </span>
</template>
