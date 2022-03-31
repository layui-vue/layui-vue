<script lang="ts">
export default {
  name: "LayInput",
};
</script>

<script setup lang="ts">
import "./index.less";
import { useSlots } from "vue";
import { useI18n } from "vue-i18n";
import { Boolean, String } from 'src/types';

const { t } = useI18n();
const slots = useSlots();

export interface LayInputProps {
  name?: String;
  type?: String;
  value?: String;
  disabled?: Boolean;
  modelValue?: String;
  placeholder?: String;
  allowClear?: Boolean;
}

const props = withDefaults(defineProps<LayInputProps>(), {});

const emit = defineEmits(["update:modelValue", "input", "change", "focus", "blur"]);

const onInput = function (event: InputEvent) {
  const inputElement = event.target as HTMLInputElement;
  emit("update:modelValue", inputElement.value);
  emit("input", event);
};

const onClear = () => {
  emit("update:modelValue", "");
};

const onFocus = (event: FocusEvent) => {
  emit("focus", event);
};

const onChange = () => {
  emit("change");
}

const onBlur = () => {
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
      @change="onChange"
    />
    <span class="layui-input-suffix" v-if="slots.suffix">
      <slot name="suffix"></slot>
    </span>
    <span class="layui-input-clear" v-if="allowClear">
      <lay-icon type="layui-icon-close-fill" @click="onClear"></lay-icon>
    </span>
  </div>
</template>
