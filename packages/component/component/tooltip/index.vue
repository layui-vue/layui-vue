<script lang="ts" setup>
import type {
  PopperTrigger as _PopperTrigger,
  ContentComponentInstance,
  Placement,
} from "../popper/index";

import type { TooltipProps } from "./types";
import {
  useEventListener,
  useMutationObserver,
  useResizeObserver,
} from "@vueuse/core";

import { computed, nextTick, onMounted, ref, shallowRef, unref } from "vue";
import LayPopper from "../popper/popper.vue";
import "./index.less";

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
      "layui-anim-fadein",
      { "layui-dark": props.isDark },
      props.popperClass,
    ],
    popperStyle: props.popperStyle,
    teleportProps: props.teleportProps,
  };
});

function setEllipsis() {
  if (tooltipRef.value) {
    const tooltipHtml = tooltipRef.value;
    if (
      tooltipHtml.scrollWidth > tooltipHtml.clientWidth
      || tooltipHtml.scrollHeight > tooltipHtml.clientHeight
    ) {
      disabledPopper.value = false;
    }
    else {
      disabledPopper.value = true;
    }
  }
  else {
    disabledPopper.value = false;
  }
}

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

function show() {
  nextTick(() => {
    popperRef.value!.show();
  });
}

function doHidden() {
  nextTick(() => {
    popperRef.value!.hidden();
  });
}

function update() {
  nextTick(() => {
    popperRef.value!.update();
  });
}

defineExpose({ show, hide: doHidden, update });
</script>

<template>
  <LayPopper ref="popperRef" v-bind="popperProps">
    <div v-if="isAutoShow" ref="tooltipRef" class="lay-tooltip-content">
      <span>
        <slot />
      </span>
    </div>
    <slot v-else />
    <template #content>
      <slot name="content">
        <span v-if="content">
          {{ content }}
        </span>
      </slot>
    </template>
  </LayPopper>
</template>
