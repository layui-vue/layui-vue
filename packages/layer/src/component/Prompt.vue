<script lang="ts">
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Prompt",
};
</script>

<script lang="ts" setup>
import { computed, ref } from "vue";
import { LayIcon } from "@layui/icons-vue";

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
const showPassword = ref(false);
const hasContent = computed(() => data.value.length > 0);
const emits = defineEmits(["update:_content"]);
</script>

<template>
  <template v-if="multiLine">
    <div class="layui-textarea-wrapper">
      <textarea
        @input="$emit('update:_content', data)"
        class="layui-textarea"
        v-model="data"
        :maxlength="$props.maxLength"
      ></textarea>
    </div>
  </template>
  <template v-else>
    <div class="layui-input">
      <div class="layui-input-wrapper">
        <input
          @input="$emit('update:_content', data)"
          :placeholder="$props.placeholder"
          :type="isPassword ? 'password' : 'text'"
          v-model="data"
          :maxlength="$props.maxLength"
        />
        <span
          class="layui-input-password"
          @click="showPassword"
          v-if="isPassword && hasContent"
        >
          <lay-icon type="layui-icon-show" v-if="isPassword"></lay-icon>
          <lay-icon type="layui-icon-hide" v-else></lay-icon>
        </span>
        <span class="layui-input-clear" v-if="hasContent">
          <lay-icon
            type="layui-icon-close-fill"
            @click.stop="onClear"
          ></lay-icon>
        </span>
      </div>
    </div>
  </template>
</template>
