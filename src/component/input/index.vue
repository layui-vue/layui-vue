<script lang="ts">
export default {
  name: "LayInput",
};
</script>

<script setup lang="ts">
import "./index.less";
import { useI18n } from "vue-i18n";
import { useSlots } from "vue-demi";

const { t } = useI18n();
const slots = useSlots();

export interface LayInputProps {
  name?: string;
  type?: string;
  value?: string;
  disabled?: boolean;
  modelValue?: string | number;
  placeholder?: string;
}

const props = withDefaults(defineProps<LayInputProps>(), {});

const emit = defineEmits(["update:modelValue", "input", "focus", "blur"]);

const onInput = function (event: InputEvent) {
  const inputElement = event.target as HTMLInputElement;
  emit("update:modelValue", inputElement.value);
  emit("input", event);
};

const onFocus = function (event: FocusEvent) {
  emit("focus", event);
};

const onBlur = function () {
  emit("blur");
};
</script>

<template>
  <div class="layui-input-wrapper">
    <span class="layui-input-prefix" v-if="slots.prefix">
      <slot name="prefix"></slot>
    </span>
    <input
      :type="type"
      :name="name"
      :value="modelValue || value"
      :disabled="disabled"
      :placeholder="placeholder"
      :class="{ 'layui-disabled': disabled }"
      class="layui-input"
      @input="onInput"
      @focus="onFocus"
      @blur="onBlur"
    />
    <span class="layui-input-suffix" v-if="slots.suffix">
      <slot name="suffix"></slot>
    </span>
  </div>
</template>
