<template>
  <Teleport to="body">
    <transition name="fade">
      <div
        class="layui-popper-v2"
        v-show="visible"
        :style="popperStyle"
        ref="ContentRef"
      >
        <slot></slot>
        <div ref="ArrowRef" data-popper-arrow></div>
      </div>
    </transition>
  </Teleport>
</template>

<script setup lang="ts">
import type { Placement } from "../usePopper/index";
import type { Ref } from "vue";
import { useSlots, ref, computed, inject, watch } from "vue";
// import { usePopper, flip, hide, arrow, offset } from "@layui/popper-core";
import { onClickOutside } from "@vueuse/core";
import { usePopper, flip, hide, arrow, offset } from "../usePopper/index";

import {
  POPPER_INJECTION_KEY,
  arrowMiddleware,
  getArrowPlacement,
  getArrowOffer,
} from "../utils";

type ContentProps = {
  modelValue: boolean;
  placement: Placement;
};

const props = withDefaults(defineProps<ContentProps>(), {});

const ContentRef = ref<HTMLElement | null>(null);
const ArrowRef = ref<HTMLDivElement | null>(null);

const { TriggerRef, onShow, onHidden } = inject(POPPER_INJECTION_KEY)!;

const visible = computed(() => {
  return props.modelValue;
});

const { popperStyle, middlewareData } = usePopper(
  TriggerRef as Ref<HTMLElement>,
  ContentRef as Ref<HTMLElement>,
  {
    placement: props.placement,
    middleware: [
      offset(10),
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

console.log(middlewareData.value, "middlewareData");

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

onClickOutside(ContentRef, (event) => {
  if (
    !visible.value ||
    (TriggerRef.value as HTMLElement).contains(event.target)
  )
    return;

  onHidden();
});
</script>

<style>
/* .fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
.fade-enter-to,
.fade-leave-from {
  opacity: 1;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.6s ease;
} */
</style>
