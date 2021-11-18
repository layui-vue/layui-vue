<script lang="ts">
export default {
  name: "LaySwitch",
};
</script>

<script setup lang="ts">
import { defineProps, defineEmits, computed, ref } from "vue";
import "./index.less";

export interface LaySwitchProps {
  disabled?: boolean;
  activeText?: string;
  modelValue?: boolean;
  inactiveText?: string;
}

const props = withDefaults(defineProps<LaySwitchProps>(), {
  disabled: false,
  activeText: "启用",
  inactiveText: "禁用",
});

const emit = defineEmits(["update:modelValue", "change"]);

const isActive = computed({
  get() {
    return props.modelValue;
  },
  set(val) {
    emit("change", val);
    emit("update:modelValue", val);
  },
});

const handleClick = function () {
  if (!props.disabled) {
    isActive.value = !isActive.value;
  }
};
</script>

<template>
  <span @click.stop="handleClick">
    <div
      class="layui-unselect layui-form-switch"
      :class="{
        'layui-disabled': disabled,
        'layui-form-onswitch': isActive,
        'layui-checkbox-disbaled': disabled,
      }"
    >
      <em>{{ isActive == true ? activeText : inactiveText }}</em>
      <i />
    </div>
  </span>
</template>
