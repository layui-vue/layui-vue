<script lang="ts">
export default {
  name: "LayRadio"
}
</script>

<script setup lang="ts">
import { defineProps, defineEmits } from "vue";

const props = defineProps<{
  modelValue: string;
  disabled?: boolean;
  label?: string;
  name: string;
}>();

const emit = defineEmits(["update:modelValue", "change"]);

const handleClick = function () {
  if (props.disabled) {
    return;
  }
  emit("change", props.label);
  emit("update:modelValue", props.label);
};
</script>

<template>
  <span>
    <input type="radio" :value="label" :name="name" />
    <div
      class="layui-unselect layui-form-radio"
      :class="{
        'layui-form-radioed': modelValue == label,
        'layui-radio-disbaled layui-disabled': disabled,
      }"
      @click.stop="handleClick"
    >
      <i
        v-if="modelValue == label"
        class="layui-anim layui-icon layui-anim-scaleSpring"
        >&#xe643;</i
      >
      <i
        v-else
        class="layui-anim layui-icon layui-anim-scaleSpring layui-form-radioed"
        >&#xe63f;</i
      >
      <span><slot></slot></span>
    </div>
  </span>
</template>