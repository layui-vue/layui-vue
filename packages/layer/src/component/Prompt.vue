<script lang="ts">
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Prompt",
};
</script>

<script lang="ts" setup>
import { computed, ref } from "vue";
import LayInput from "@layui/layui-vue/es/input/index";
import LayTextarea from "@layui/layui-vue/es/textarea/index";

export interface PromptProps {
  formType?: 0 | 1 | 2 | "text" | "password" | "textarea";
  value?: string;
  maxLength?: number | "";
  placeholder?: string;
}

const props = withDefaults(defineProps<PromptProps>(), {
  mode: "text",
  value: "",
  placeholder: "",
});

const data = ref(props.value);
const isShowPassword = ref(false);
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
const onClear = () => {
  data.value = "";
  emits("update:_content", "");
};
const showPassword = () => {
  isShowPassword.value = !isShowPassword.value;
};
const hasContent = computed(() => data.value.length > 0);
const emits = defineEmits(["update:_content"]);
</script>

<template>
  <template v-if="multiLine">
    <lay-textarea
      @input="$emit('update:_content', data)"
      v-model="data"
      :maxlength="$props.maxLength"
    >
    </lay-textarea>
  </template>
  <template v-else>
    <lay-input
      @input="$emit('update:_content', data)"
      v-model="data"
      :allowClear="true"
      :type="isPassword ? 'password' : 'text'"
      :password="isPassword"
      :placeholder="$props.placeholder"
    ></lay-input>
  </template>
</template>
