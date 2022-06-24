<script lang="ts">
export default {
  name: "LayDropdown",
};
</script>

<script setup lang="ts">
import "./index.less";
import type { CSSProperties } from "vue";
import {
  computed,
  nextTick,
  onBeforeUnmount,
  onMounted,
  provide,
  ref,
  shallowRef,
  watch,
} from "vue";
import {
  onClickOutside,
  useResizeObserver,
  useThrottleFn,
  useWindowSize,
} from "@vueuse/core";
import type { DropdownPlacement } from "./interface";

export type DropdownTrigger = "click" | "hover" | "focus" | "contextMenu";

export interface LayDropdownProps {
  visible?: boolean;
  trigger?: DropdownTrigger | DropdownTrigger[];
  placement?: DropdownPlacement;
  disabled?: boolean;
  autoFitPosition?: boolean;
  autoFitWidth?: boolean;
  autoFitMinWidth?: boolean;
  updateAtScroll?: boolean;
  autoFixPosition?: boolean;
  clickToClose?: boolean;
  blurToClose?: boolean;
  clickOutsideToClose?: boolean;
  contentOffset?: number;
}

const props = withDefaults(defineProps<LayDropdownProps>(), {
  visible: false,
  trigger: "click",
  disabled: false,
  placement: "bottom-left",
  autoFitPosition: true,
  autoFitMinWidth: true,
  autoFitWidth: false,
  updateAtScroll: false,
  autoFixPosition: true,
  clickToClose: true,
  blurToClose: true,
  clickOutsideToClose: true,
  contentOffset: 2,
});

const dropdownRef = shallowRef<HTMLElement | undefined>();
const contentRef = shallowRef<HTMLElement | undefined>();
const contentStyle = ref<CSSProperties>({});
const { width: windowWidth, height: windowHeight } = useWindowSize();
const openState = ref(false);

const triggerMethods = computed(() =>
  ([] as Array<DropdownTrigger>).concat(props.trigger)
);

const emit = defineEmits(["open", "hide"]);

let delayTimer = 0;

const cleanDelayTimer = () => {
  if (delayTimer) {
    window.clearTimeout(delayTimer);
    delayTimer = 0;
  }
};

const open = (delay?: number): void => {
  if (props.disabled == false) {
    changeVisible(true, delay);
    emit("open");
  }
};

const hide = (delay?: number): void => {
  changeVisible(false, delay);
  emit("hide");
};

const toggle = (): void => {
  if (props.disabled == false)
    if (openState.value) {
      hide();
    } else {
      open();
    }
};

const changeVisible = (visible: boolean, delay?: number) => {
  if (visible === openState.value && delayTimer === 0) {
    return;
  }
  const update = () => {
    openState.value = visible;
    nextTick(() => {
      updateContentStyle();
    });
  };

  if (delay) {
    cleanDelayTimer();
    if (visible !== openState.value) {
      delayTimer = window.setTimeout(update, delay);
    }
  } else {
    update();
  }
};

const updateContentStyle = () => {
  if (!dropdownRef.value || !contentRef.value) {
    return;
  }
  const triggerRect = dropdownRef.value.getBoundingClientRect();
  const contentRect = contentRef.value.getBoundingClientRect();
  const { style } = getContentStyle(props.placement, triggerRect, contentRect, {
    autoFitPosition: props.autoFitPosition,
  });

  if (props.autoFitMinWidth) {
    style.minWidth = `${triggerRect.width}px`;
  }
  if (props.autoFitWidth) {
    style.width = `${triggerRect.width}px`;
  }

  contentStyle.value = style;
};

const getContentStyle = (
  placement: DropdownPlacement,
  triggerRect: DOMRect,
  contentRect: DOMRect,
  {
    autoFitPosition = false,
    customStyle = {},
  }: {
    autoFitPosition?: boolean;
    customStyle?: CSSProperties;
  } = {}
) => {
  let { top, left } = getContentOffset(placement, triggerRect, contentRect);
  if (autoFitPosition) {
    const { top: fitTop, left: fitLeft } = getFitPlacement(
      top,
      left,
      placement,
      triggerRect,
      contentRect
    );
    top = fitTop;
    left = fitLeft;
  }
  const style = {
    top: `${top}px`,
    left: `${left}px`,
    ...customStyle,
  };
  return {
    style,
  };
};

const getFitPlacement = (
  top: number,
  left: number,
  placement: DropdownPlacement,
  triggerRect: DOMRect,
  contentRect: DOMRect
) => {
  // 溢出屏幕底部
  if (triggerRect.bottom + contentRect.height > windowHeight.value) {
    top = -contentRect.height - props.contentOffset;
  }
  // 溢出屏幕顶部
  if (triggerRect.top - contentRect.height < 0) {
    top = triggerRect.height + props.contentOffset;
  }
  if (["bottom-right", "top-right"].includes(placement)) {
    // 溢出屏幕左边
    const contentRectLeft =
      triggerRect.left - (contentRect.width - triggerRect.width);
    if (contentRectLeft < 0) {
      left = left + (0 - contentRectLeft);
    }
  }

  if (["bottom-left", "top-left"].includes(placement)) {
    // 溢出屏幕右边
    const contentRectRight =
      triggerRect.right + (contentRect.width - triggerRect.width);
    if (contentRectRight > windowWidth.value) {
      left = left - (contentRectRight - windowWidth.value);
    }
  }

  if (["bottom", "top"].includes(placement)) {
    const contentRectLeft =
      triggerRect.left - (contentRect.width - triggerRect.width) / 2;
    const contentRectRight =
      triggerRect.right + (contentRect.width - triggerRect.width) / 2;
    // 溢出屏幕左边
    if (contentRectLeft < 0) {
      left = left + (0 - contentRectLeft);
    }
    // 溢出屏幕右边
    if (contentRectRight > windowWidth.value) {
      left = left - (contentRectRight - windowWidth.value);
    }
  }
  return {
    top,
    left,
  };
};

const getContentOffset = (
  placement: DropdownPlacement,
  triggerRect: DOMRect,
  contentRect: DOMRect
) => {
  switch (placement) {
    case "top":
      return {
        top: -contentRect.height - props.contentOffset,
        left: -(contentRect.width - triggerRect.width) / 2,
      };
    case "top-left":
      return {
        top: -contentRect.height - props.contentOffset,
        left: 0,
      };
    case "top-right":
      return {
        top: -contentRect.height - props.contentOffset,
        left: -(contentRect.width - triggerRect.width),
      };
    case "bottom":
      return {
        top: triggerRect.height + props.contentOffset,
        left: -(contentRect.width - triggerRect.width) / 2,
      };
    case "bottom-left":
      return {
        top: triggerRect.height + props.contentOffset,
        left: 0,
      };
    case "bottom-right":
      return {
        top: triggerRect.height + props.contentOffset,
        left: -(contentRect.width - triggerRect.width),
      };
    default:
      return {
        left: 0,
        top: 0,
      };
  }
};

const isScrollElement = (element: HTMLElement) => {
  return (
    element.scrollHeight > element.offsetHeight ||
    element.scrollWidth > element.offsetWidth
  );
};

const getScrollElements = (container: HTMLElement | undefined) => {
  const scrollElements: HTMLElement[] = [];
  let element: HTMLElement | undefined = container;
  while (element && element !== document.documentElement) {
    if (isScrollElement(element)) {
      scrollElements.push(element);
    }
    element = element.parentElement ?? undefined;
  }
  return scrollElements;
};

const handleScroll = useThrottleFn(() => {
  if (openState.value) {
    updateContentStyle();
  }
}, 250);

const handleClick = () => {
  if (props.disabled || (openState.value && !props.clickToClose)) {
    return;
  }
  if (
    triggerMethods.value.includes("click") ||
    triggerMethods.value.includes("contextMenu")
  ) {
    toggle();
  }
};

const handleMouseEnter = () => {
  if (props.disabled || !triggerMethods.value.includes("hover")) {
    return;
  }
  open(250);
};

const handleMouseLeave = () => {
  if (props.disabled || !triggerMethods.value.includes("hover")) {
    return;
  }
  hide(150);
};

const handleFocusin = () => {
  if (props.disabled || !triggerMethods.value.includes("focus")) {
    return;
  }
  open();
};

const handleFocusout = () => {
  if (props.disabled || !triggerMethods.value.includes("focus")) {
    return;
  }
  if (!props.blurToClose) {
    return;
  }
  hide();
};

const { stop: removeContentResizeObserver } = useResizeObserver(
  contentRef,
  () => {
    if (openState.value && props.autoFixPosition) {
      updateContentStyle();
    }
  }
);

const { stop: removeTriggerResizeObserver } = useResizeObserver(
  dropdownRef,
  () => {
    if (openState.value && props.autoFixPosition) {
      updateContentStyle();
    }
  }
);

onClickOutside(dropdownRef, () => {
  if (props.clickOutsideToClose) {
    hide();
  }
});

let scrollElements: HTMLElement[] | undefined;

onMounted(() => {
  if (props.updateAtScroll) {
    scrollElements = getScrollElements(dropdownRef.value);
    for (const item of scrollElements) {
      item.addEventListener("scroll", handleScroll);
    }
  }
});

onBeforeUnmount(() => {
  if (scrollElements) {
    for (const item of scrollElements) {
      item.removeEventListener("scroll", handleScroll);
    }
    scrollElements = undefined;
  }
  removeContentResizeObserver();
  removeTriggerResizeObserver();
});

watch(
  () => props.visible,
  (newVal, oldVal) => {
    openState.value = newVal;
  },
  { immediate: true }
);

provide("openState", openState);

defineExpose({ open, hide, toggle });
</script>

<template>
  <div
    ref="dropdownRef"
    class="layui-dropdown"
    @mouseenter="handleMouseEnter()"
    @mouseleave="handleMouseLeave()"
    @focusin="handleFocusin()"
    @focusout="handleFocusout()"
    :class="{ 'layui-dropdown-up': openState }"
  >
    <div @click="handleClick()" @contextmenu.prevent="handleClick()">
      <slot></slot>
    </div>
    <dl
      ref="contentRef"
      class="layui-anim layui-anim-upbit"
      :style="contentStyle"
    >
      <slot name="content"></slot>
    </dl>
  </div>
</template>
