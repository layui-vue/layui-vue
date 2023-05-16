<script lang="ts">
export default {
  name: "LayPopconfirm",
};
</script>

<script setup lang="ts">
import "./index.less";
import LayTooltip from "../tooltip/index.vue";
import LayButton from "../button/index.vue";
import { computed, ref } from "vue";

export interface PopconfirmProps {
  content: string;
  disabled?: boolean;
  btnAlign?: string;
  confirmText?: string;
  cancelText?: string;
  position?: string;
  trigger?: "click" | "hover" | "focus" | "contextMenu";
}

const props = withDefaults(defineProps<PopconfirmProps>(), {
  confirmText: "确认",
  btnAlign: "right",
  cancelText: "取消",
});

const tooltipRef = ref<HTMLElement | undefined>();

const emits = defineEmits(["confirm", "cancel"]);

const handleConfirm = () => {
  // @ts-ignore
  tooltipRef.value?.hide();
  emits("confirm");
};

const handleCancel = () => {
  // @ts-ignore
  tooltipRef.value?.hide();
  emits("cancel");
};

const footerStyle = computed(() => {
  return [props.btnAlign ? `text-align:${props.btnAlign}` : ""];
});
</script>

<template>
  <lay-tooltip
    ref="tooltipRef"
    :disabled="disabled"
    :position="position"
    :trigger="trigger"
  >
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
