<script setup lang="ts">
import type { Ref, StyleValue, CSSProperties } from "vue";
import type { ContentProps } from "../types";

import {
  ref,
  computed,
  inject,
  watch,
  nextTick,
  useSlots,
  onBeforeUnmount,
} from "vue";
import { onClickOutside } from "@vueuse/core";
import { usePopper, flip, hide, offset, shift } from "../usePopper/index";

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

const isExist = ref(props.modelValue);
const _visible = ref(false);
const innerVisible = ref(props.modelValue);
const slots = useSlots();
// content slot中是否有内容
const hasDefaultContent = slots.default!()[0].children?.length;

watch(
  () => [props.modelValue, _visible.value],
  () => {
    if (!props.disabled) {
      if (!isExist.value) {
        isExist.value = props.modelValue || _visible.value;
      }
      nextTick(() => {
        innerVisible.value = props.modelValue || _visible.value;
      });
    }
  }
);

const classes = computed(() => {
  return ["layui-popper", "layui-anim", props.popperClass];
});

const stylees = computed(() => {
  return [_popperStyle.value as CSSProperties, props.popperStyle] as StyleValue;
});

const teleportProps = computed(() => {
  return props.teleportProps!;
});

const {
  popperStyle: _popperStyle,
  middlewareData,
  update,
  stopAutoUpdate,
  startAutoUpdate,
} = usePopper(TriggerRef as Ref<HTMLElement>, ContentRef as Ref<HTMLElement>, {
  placement: props.placement,
  middleware: props.middlewares ?? [
    offset(props.offset),
    shift(),
    flip(),
    arrowMiddleware({
      arrowRef: ArrowRef,
      padding: 5,
    }),
    getArrowPlacement(),
    getArrowOffer({ arrowRef: ArrowRef }),
    hide(),
  ],
});

watch(
  () => middlewareData.value.hide,
  (data) => {
    if (ContentRef.value) {
      Object.assign(ContentRef.value.style, {
        display: data!.referenceHidden
          ? "none"
          : !innerVisible.value
          ? "none"
          : "block",
      });
    }
  }
);

watch(innerVisible, () => {
  if (innerVisible.value) {
    startAutoUpdate.value && startAutoUpdate.value();
  } else {
    stopAutoUpdate.value && stopAutoUpdate.value();
  }
});

onBeforeUnmount(() => {
  stopAutoUpdate.value && stopAutoUpdate.value();
});

onClickOutside(ContentRef, (event: PointerEvent) => {
  if (
    !props.clickOutsideToClose ||
    !innerVisible.value ||
    (TriggerRef.value as HTMLElement).contains(event.target as HTMLElement)
  )
    return;

  onHidden();
});

const onContentEnter = () => {
  if (props.enterable && props.trigger?.includes("hover")) {
    onShow();
  }
};

const onContentLeave = () => {
  if (props.trigger?.includes("hover")) {
    onHidden();
  }
};

const show = () => {
  _visible.value = true;
};

const hidden = () => {
  _visible.value = false;
};

defineExpose({ show, hidden, update });
</script>

<template>
  <Teleport
    :to="teleportProps.to"
    :disabled="teleportProps.disabled"
    v-if="isExist && hasDefaultContent"
  >
    <div
      :class="classes"
      v-show="innerVisible"
      :style="stylees"
      ref="ContentRef"
      @mouseenter="onContentEnter"
      @mouseleave="onContentLeave"
    >
      <slot></slot>
      <div ref="ArrowRef" data-popper-arrow v-if="showArrow"></div>
    </div>
  </Teleport>
</template>
