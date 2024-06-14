<script setup lang="ts">
import "./index.less";
import type { Placement } from "./usePopper/index";

import { ref, provide, computed } from "vue";
import Trigger from "./component/trigger.vue";
import Content from "./component/content.vue";
import { POPPER_INJECTION_KEY } from "./utils";

type PopperProps = {
  modelValue?: boolean;
  trigger?: "click" | "hover";
  placement?: Placement;
};

defineOptions({
  name: "LayPopperV2",
});

const props = withDefaults(defineProps<PopperProps>(), {
  modelValue: false,
  trigger: "click",
  placement: "bottom",
});

const emit = defineEmits(["update:modelValue"]);

const open = ref(props.modelValue);

const TriggerRef = ref<HTMLElement | null>(null);
// const ContentRef = ref(null);

const triggerProps = computed(() => {
  return {
    modelValue: open.value,
    trigger: props.trigger,
  };
});

const contentProps = computed(() => {
  return {
    modelValue: open.value,
    placement: props.placement,
  };
});

const onShow = () => {
  open.value = true;
  emit("update:modelValue", true);
};

const onHidden = () => {
  open.value = false;
  emit("update:modelValue", false);
};

provide(POPPER_INJECTION_KEY, {
  TriggerRef,
  onShow,
  onHidden,
});
</script>

<template>
  <Trigger v-bind="triggerProps">
    <slot></slot>
  </Trigger>
  <Content v-bind="contentProps">
    <slot name="content"></slot>
  </Content>
</template>
