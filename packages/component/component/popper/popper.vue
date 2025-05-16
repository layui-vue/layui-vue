<script setup lang="ts">
import type {
  ContentComponentInstance,
  ContentProps,
  PopperProps,
  TriggerProps,
} from "./types";
import { normalizeArray } from "@layui/component/utils";
import { computed, provide, ref, watch } from "vue";

import Content from "./component/content.vue";
import Trigger from "./component/trigger.vue";
import useDelayTrigger from "./hook/useDelayTrigger";
import { POPPER_INJECTION_KEY } from "./utils";
import "./index.less";

defineOptions({
  name: "LayPopper",
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
  clickOutsideToClose: true,
  teleportProps: () => ({
    to: "body",
  }),
});

const emit = defineEmits(["update:modelValue"]);

const open = ref(props.modelValue);

const TriggerRef = ref<HTMLElement | null>(null);

const triggerProps = computed<TriggerProps>(() => {
  return {
    trigger: normalizeArray(props.trigger),
    triggerCustomEvents: props.triggerCustomEvents,
  };
});

const contentProps = computed<ContentProps>(() => {
  return {
    modelValue: open.value,
    trigger: normalizeArray(props.trigger),
    placement: props.placement,
    disabled: props.disabled,
    showArrow: props.showArrow,
    offset: props.offset,
    enterable: props.enterable,
    popperClass: props.popperClass,
    popperStyle: props.popperStyle,
    clickOutsideToClose: props.clickOutsideToClose,
    middlewares: props.middlewares,
    teleportProps: props.teleportProps,
  };
});

watch(
  () => props.modelValue,
  () => {
    open.value = props.modelValue;
  },
);

function show() {
  if (props.disabled) {
    return;
  }

  open.value = true;
  emit("update:modelValue", true);
}

function hidden() {
  open.value = false;
  emit("update:modelValue", false);
}

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

const ContentRef = ref<ContentComponentInstance>();

defineExpose({
  show: () => ContentRef.value?.show(),
  hidden: () => ContentRef.value?.hidden(),
  update: () => ContentRef.value?.update(),

  TriggerRef,
  ContentRef,
});
</script>

<template>
  <Trigger v-bind="triggerProps">
    <slot />
  </Trigger>
  <Content v-bind="contentProps" ref="ContentRef">
    <slot name="content" />
  </Content>
</template>
