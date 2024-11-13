<script setup lang="ts">
import "./index.less";
import type { Placement } from "../popper/index";
import LayTooltip from "../tooltip/index.vue";
import LayButton from "../button/index.vue";
import { computed, ref, type TeleportProps } from "vue";

export interface PopconfirmProps {
  content?: string;
  disabled?: boolean;
  btnAlign?: string;
  confirmText?: string;
  cancelText?: string;
  position?: Placement;
  trigger?: "click" | "hover" | "focus" | "contextMenu";
  teleportProps?: TeleportProps;
}

defineOptions({
  name: "LayPopconfirm",
});

const props = withDefaults(defineProps<PopconfirmProps>(), {
  confirmText: "确认",
  btnAlign: "right",
  cancelText: "取消",
});

const tooltipRef = ref<InstanceType<typeof LayTooltip>>();

const emits = defineEmits(["confirm", "cancel"]);

const handleConfirm = () => {
  tooltipRef.value && tooltipRef.value.hide();
  emits("confirm");
};

const handleCancel = () => {
  tooltipRef.value && tooltipRef.value.hide();
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
    :teleportProps="teleportProps"
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
