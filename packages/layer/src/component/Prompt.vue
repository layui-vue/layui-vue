<script lang="ts" setup>
import { computed, ref } from "vue";
import LayInput from "@layui/component/component/input/index";
import LayTextarea from "@layui/component/component/textarea/index";

export interface PromptProps {
  promptValue?: string;
  formType?: 0 | 1 | 2 | "text" | "password" | "textarea";
  maxLength?: number;
  placeholder?: string;
}

defineOptions({
  name: "Prompt",
});

const props = withDefaults(defineProps<PromptProps>(), {
  mode: "text",
  placeholder: "",
});

const inputValue = ref(props.promptValue);

const multiLine = computed(() => {
  switch (typeof props.formType) {
    case "string":
      return props.formType === "textarea";
    case "number":
      return props.formType === 2;
    default:
      return false;
  }
});
const isPassword = computed(
  () => props.formType == 1 || props.formType == "password"
);
const emits = defineEmits(["update:promptValue"]);
</script>

<template>
  <template v-if="multiLine">
    <lay-textarea
      @input="$emit('update:promptValue', inputValue)"
      v-model="inputValue"
      :maxlength="props.maxLength"
      :placeholder="props.placeholder"
    >
    </lay-textarea>
  </template>
  <template v-else>
    <lay-input
      @input="$emit('update:promptValue', inputValue)"
      v-model="inputValue"
      :allowClear="true"
      :type="isPassword ? 'password' : 'text'"
      :password="isPassword"
      :placeholder="props.placeholder"
    ></lay-input>
  </template>
</template>
