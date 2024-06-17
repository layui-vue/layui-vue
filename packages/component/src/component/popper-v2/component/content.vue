<template>
  <Teleport to="body">
    <div
      class="layui-popper-v2 layui-anim layui-anim-fadein"
      v-show="visible"
      :style="popperStyle"
      ref="ContentRef"
      @mouseenter="onContentEnter"
      @mouseleave="onContentLeave"
    >
      <slot></slot>
      <div ref="ArrowRef" data-popper-arrow v-if="showArrow"></div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import type { Ref } from "vue";
import type { ContentProps } from "../types";

import { ref, computed, inject, watch } from "vue";
import { onClickOutside } from "@vueuse/core";
import { usePopper, flip, hide, arrow, offset } from "../usePopper/index";

import {
  POPPER_INJECTION_KEY,
  arrowMiddleware,
  getArrowPlacement,
  getArrowOffer,
} from "../utils";

const props = withDefaults(defineProps<ContentProps>(), {});

const ContentRef = ref<HTMLElement | null>(null);
const ArrowRef = ref<HTMLDivElement | null>(null);

const { TriggerRef, onShow, onHidden } = inject(POPPER_INJECTION_KEY)!;

const _visible = ref(false);

const visible = computed(() => {
  return props.modelValue || _visible.value;
});

const { popperStyle, middlewareData } = usePopper(
  TriggerRef as Ref<HTMLElement>,
  ContentRef as Ref<HTMLElement>,
  {
    placement: props.placement,
    middleware: [
      offset(props.offset),
      flip(),
      arrowMiddleware({
        arrowRef: ArrowRef,
        padding: 5,
      }),
      getArrowPlacement(),
      getArrowOffer({ arrowRef: ArrowRef }),
      hide(),
    ],
  }
);

watch(
  () => middlewareData.value.hide,
  (data) => {
    if (ContentRef.value) {
      Object.assign(ContentRef.value.style, {
        visibility: data!.referenceHidden ? "hidden" : "visible",
      });
    }
  }
);

onClickOutside(ContentRef, (event: PointerEvent) => {
  if (
    !visible.value ||
    (TriggerRef.value as HTMLElement).contains(event.target as HTMLElement)
  )
    return;

  onHidden();
});

const onContentEnter = () => {
  if (props.enterable && props.trigger === "hover") {
    onShow();
  }
};

const onContentLeave = () => {
  if (props.trigger === "hover") {
    onHidden();
  }
};

const show = () => {
  _visible.value = true;
};

const hidden = () => {
  _visible.value = false;
};

defineExpose({ show, hidden });
</script>
