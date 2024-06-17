<script setup lang="ts">
import "./index.less";
import type { ComponentPublicInstance } from "vue";
import type { PopperProps, ContentProps } from "./types";

import { ref, provide, computed, toRef } from "vue";
import Trigger from "./component/trigger.vue";
import Content from "./component/content.vue";
import { POPPER_INJECTION_KEY } from "./utils";
import useDelayTrigger from "./hook/useDelayTrigger";

defineOptions({
  name: "LayPopperV2",
});

const props = withDefaults(defineProps<PopperProps>(), {
  modelValue: false,
  trigger: "hover",
  disabled: false,
  placement: "bottom",
  showArrow: false,
  offset: 10,
  enterable: true,
  showAfter: 0,
  hideAfter: 200,
});

const emit = defineEmits(["update:modelValue"]);

const open = ref(props.modelValue);

const TriggerRef = ref<HTMLElement | null>(null);

const triggerProps = computed(() => {
  return {
    modelValue: open.value,
    trigger: props.trigger,
    disabled: props.disabled,
  };
});

const contentProps = computed<ContentProps>(() => {
  return {
    modelValue: open.value,
    trigger: props.trigger,
    placement: props.placement,
    showArrow: props.showArrow,
    offset: props.offset,
    enterable: props.enterable,
  };
});

const show = () => {
  if (props.disabled) return;
  open.value = true;
  emit("update:modelValue", true);
};

const hidden = () => {
  open.value = false;
  emit("update:modelValue", false);
};

const { onShow, onHidden } = useDelayTrigger({
  showAfter: props.showAfter,
  hideAfter: props.hideAfter,
  show,
  hidden,
});

provide(POPPER_INJECTION_KEY, {
  TriggerRef,
  onShow,
  onHidden,
});

const ContentRef = ref<
  ComponentPublicInstance<{
    show: () => void;
    hidden: () => void;
  }>
>();

defineExpose({
  show: () => ContentRef.value?.show(),
  hidden: () => ContentRef.value?.hidden(),
});
</script>

<template>
  <Trigger v-bind="triggerProps">
    <slot></slot>
  </Trigger>
  <Content v-bind="contentProps" ref="ContentRef">
    <slot name="content"></slot>
  </Content>
</template>
