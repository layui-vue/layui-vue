<script lang="ts">
export default {
  name: "LayInput",
};
</script>

<script setup lang="ts">
import "./index.less";
import { useI18n } from "vue-i18n";
import { computed, useSlots } from "vue-demi";

const { t } = useI18n();
const slots = useSlots();

export interface LayInputProps {
  name?: string;
  type?: string;
  value?: string;
  disabled?: boolean;
  modelValue?: string;
  placeholder?: string;
  allowClear?: boolean;
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

const clear = () => {
    emit("update:modelValue", "");
}
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
    <span class="layui-input-clear" v-if="allowClear">
      <lay-icon type="layui-icon-close-fill" @click="clear"></lay-icon>
    </span>
  </div>
</template>
