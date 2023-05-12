<script lang="ts">
export default {
  name: "LayPopconfirm",
};
</script>

<script setup lang="ts">
import "./index.less";
import LayTooltip from "../tooltip/index.vue";
import { compile, computed, ref } from "vue";

export interface PopconfirmProps {
  content: string;
  disabled?: boolean;
  btnAlign?: string;
  confirmText?: string;
  cancelText?: string;
}

const props = withDefaults(defineProps<PopconfirmProps>(), {
  confirmText: "确认",
  btnAlign: "right",
  cancelText: "取消",
});

const emits = defineEmits(["confirm", "cancel"]);

const handleConfirm = () => {
  emits("confirm");
};

const handleCancel = () => {
  emits("cancel");
};

const footerStyle = computed(() => {
  return [props.btnAlign ? `text-align:${props.btnAlign}` : ""];
});
</script>

<template>
  <lay-tooltip :disabled="disabled">
    <slot></slot>
    <template #content>
      <div class="layui-propconfirm-content">
        <slot name="content">{{ content }}</slot>
      </div>
      <div class="layui-popconfirm-footer" :style="footerStyle">
        <lay-button size="xs" @click="handleConfirm" type="primary">{{
          confirmText
        }}</lay-button>
        <lay-button size="xs" @click="handleCancel">{{
          cancelText
        }}</lay-button>
      </div>
    </template>
  </lay-tooltip>
</template>
