<script lang="ts" setup>
import "./index.less";

import type {
  PopperTrigger as PopperV2Trigger,
  Placement,
  ContentComponentInstance,
} from "../popper/index";

import LayPopper from "../popper/popper.vue";
import {
  computed,
  nextTick,
  onMounted,
  PropType,
  ref,
  shallowRef,
  StyleValue,
  unref,
} from "vue";
import { useEventListener } from "@vueuse/core";

export type PopperTrigger = "click" | "hover" | "focus" | "contextMenu";

defineOptions({
  name: "LayTooltip",
  inheritAttrs: false,
});

const props = defineProps({
  content: {
    type: [Number, String],
    required: false,
  },
  position: {
    type: String,
    default: "top",
  },
  isDark: {
    type: Boolean,
    default: false,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  isCanHide: {
    type: Boolean,
    default: true,
  },
  isAutoShow: {
    type: Boolean,
    default: false,
  },
  visible: {
    type: Boolean,
    default: false,
  },
  trigger: {
    type: String as PropType<PopperTrigger | PopperTrigger[]>,
    default: "hover",
  },
  enterable: {
    type: Boolean,
    default: true,
  },
  popperClass: {
    type: [String, Array, Object],
  },
  popperStyle: {
    type: [String, Object] as PropType<StyleValue>,
  },
});

const disabledPopper = ref(false);
const tooltipRef = shallowRef<HTMLElement | undefined>(undefined);
const popperRef = ref<ContentComponentInstance>();

const popperProps = computed(() => {
  return {
    modelValue: props.visible,
    trigger: props.trigger as PopperV2Trigger,
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

const observer = new MutationObserver(() => {
  nextTick(() => {
    setEllipsis();
  });
});

onMounted(() => {
  if (props.isAutoShow) {
    useEventListener("resize", () => {
      setEllipsis();
    });
    if (tooltipRef.value) {
      observer.observe(tooltipRef.value, {
        childList: true,
        characterData: true,
        subtree: true,
      });
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
