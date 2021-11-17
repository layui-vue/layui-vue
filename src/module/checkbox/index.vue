<script lang="ts">
export default {
  name: "LayCheckbox",
};
</script>

<script setup name="LayCheckbox" lang="ts">
import { computed, defineProps } from "vue";
import "./index.less";

export interface LayCheckbox {
  name?: string;
  skin?: string;
  label?: string;
  modelValue?: boolean;
  disabled?: boolean;
}

const props = withDefaults(defineProps<LayCheckbox>(), {
  modelValue: false
});

const emit = defineEmits(["update:modelValue", "change"]);

const handleClick = function () {
  if (!props.disabled) {
    emit("update:modelValue", !props.modelValue);
    emit("change", { checked: !props.modelValue, value: props.label });
  }
};
</script>

<template>
  <span @click.stop="handleClick">
    <input type="checkbox" :name="name" :value="label" />
    <div
      class="layui-unselect layui-form-checkbox"
      :class="{
        'layui-checkbox-disbaled layui-disabled': disabled,
        'layui-form-checked': props.modelValue,
      }"
      :lay-skin="skin"
    >
      <span v-if="$slots?.default"><slot /></span>
      <i class="layui-icon layui-icon-ok" />
    </div>
  </span>
</template>