<script lang="ts" setup>
import "./index.less";

import type { TooltipProps } from "./types";
import type {
  PopperTrigger as _PopperTrigger,
  Placement,
  ContentComponentInstance,
} from "../popper/index";

import LayPopper from "../popper/popper.vue";
import { computed, nextTick, onMounted, ref, shallowRef, unref } from "vue";
import {
  useEventListener,
  useResizeObserver,
  useMutationObserver,
} from "@vueuse/core";

export type PopperTrigger = _PopperTrigger;

defineOptions({
  name: "LayTooltip",
  inheritAttrs: false,
});

const props = withDefaults(defineProps<TooltipProps>(), {
  position: "top",
  trigger: "hover",
  enterable: true,
});

const disabledPopper = ref(false);
const tooltipRef = shallowRef<HTMLElement | undefined>(undefined);
const popperRef = ref<ContentComponentInstance>();

const popperProps = computed(() => {
  return {
    modelValue: props.visible,
    trigger: props.trigger as PopperTrigger,
    placement: props.position as Placement,
    enterable: props.enterable,
    showArrow: true,
    disabled: props.disabled || unref(disabledPopper),
    popperClass: [
      "lay-tooltip",
      { "layui-dark": props.isDark },
      props.popperClass,
    ],
    popperStyle: props.popperStyle,
  };
});

const setEllipsis = function () {
  if (tooltipRef.value) {
    let tooltipHtml = tooltipRef.value;
    if (
      tooltipHtml.scrollWidth > tooltipHtml.clientWidth ||
      tooltipHtml.scrollHeight > tooltipHtml.clientHeight
    ) {
      disabledPopper.value = false;
    } else {
      disabledPopper.value = true;
    }
  } else {
    disabledPopper.value = false;
  }
};

onMounted(() => {
  if (props.isAutoShow) {
    useEventListener("resize", () => {
      setEllipsis();
    });
    if (tooltipRef.value) {
      useMutationObserver(tooltipRef.value, setEllipsis, {
        childList: true,
        attributes: true,
        characterData: true,
        subtree: true,
      });

      useResizeObserver(tooltipRef.value, setEllipsis);
    }
  }
  nextTick(() => {
    setEllipsis();
  });
});

const show = function () {
  nextTick(() => {
    popperRef.value!.show();
  });
};

const doHidden = function () {
  nextTick(() => {
    popperRef.value!.hidden();
  });
};

const update = function () {
  nextTick(() => {
    popperRef.value!.update();
  });
};

defineExpose({ show, hide: doHidden, update });
</script>
<template>
  <lay-popper ref="popperRef" v-bind="popperProps">
    <div ref="tooltipRef" v-if="isAutoShow" class="lay-tooltip-content">
      <span>
        <slot></slot>
      </span>
    </div>
    <slot v-else></slot>
    <template #content>
      <slot name="content">
        <span v-if="content">
          {{ content }}
        </span>
      </slot>
    </template>
  </lay-popper>
</template>
