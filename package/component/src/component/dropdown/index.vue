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
  useMouse,
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
  // 以下暂不开放
  mouseEnterDelay?: number;
  mouseLeaveDelay?: number;
  focusDelay?: number;
  alignPoint?: boolean;
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
  mouseEnterDelay: 150,
  mouseLeaveDelay: 150,
  focusDelay: 150,
  alignPoint: false,
});

const dropdownRef = shallowRef<HTMLElement | undefined>();
const contentRef = shallowRef<HTMLElement | undefined>();
const contentStyle = ref<CSSProperties>({});
const { width: windowWidth, height: windowHeight } = useWindowSize();
const { x: mouseLeft, y: mouseTop } = useMouse();
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
  const triggerRect = dropdownRef.value!.getBoundingClientRect();
  const contentRect = contentRef.value.getBoundingClientRect();
  const { style } = getContentStyle(
    props.placement,
    triggerRect,
    contentRect,
    props.alignPoint
  );

  if (props.autoFitMinWidth) {
    style.minWidth = `${triggerRect.width}px`;
  }
  if (props.autoFitWidth) {
    style.width = `${triggerRect.width}px`;
  }
  contentStyle.value = style;

  if (props.autoFitPosition) {
    nextTick(() => {
      const triggerRect = dropdownRef.value!.getBoundingClientRect();
      const contentRect = contentRef.value!.getBoundingClientRect();
      let { top, left } = style;
      top = Number(top.toString().replace("px", ""));
      left = Number(left.toString().replace("px", ""));
      const { top: fitTop, left: fitLeft } = getFitPlacement(
        top,
        left,
        props.placement,
        triggerRect,
        contentRect
      );
      style.top = `${fitTop}px`;
      style.left = `${fitLeft}px`;
      contentStyle.value = {
        ...style,
      };
    });
  }
};

const getContentStyle = (
  placement: DropdownPlacement,
  triggerRect: DOMRect,
  contentRect: DOMRect,
  isAlignPoint?: boolean,
  {
    customStyle = {},
  }: {
    customStyle?: CSSProperties;
  } = {}
) => {
  let { top, left } = getContentOffset(
    placement,
    triggerRect,
    contentRect,
    isAlignPoint
  );
  const style = {
    top: `${top}px`,
    left: `${left}px`,
    ...customStyle,
  };
  return {
    style,
  };
};

const getPosition = (placement: DropdownPlacement) => {
  if (["top", "top-left", "top-right"].includes(placement)) {
    return "top";
  }
  if (["bottom", "bottom-left", "bottom-right"].includes(placement)) {
    return "bottom";
  }
  if (["left", "left-bottom", "left-top"].includes(placement)) {
    return "left";
  }
  if (["right", "right-bottom", "right-top"].includes(placement)) {
    return "right";
  }
  return "bottom";
};

const getFitPlacement = (
  top: number,
  left: number,
  placement: DropdownPlacement,
  triggerRect: DOMRect,
  contentRect: DOMRect
) => {
  // FIXME 反转后仍溢出的场景
  const position = getPosition(placement);
  if (["top", "bottom"].includes(position)) {
    // 溢出屏幕底部
    if (contentRect.bottom > windowHeight.value) {
      top = -contentRect.height - props.contentOffset;
    }
    // 溢出屏幕顶部
    if (contentRect.top < 0) {
      top = triggerRect.height + props.contentOffset;
    }
    // 溢出屏幕左边
    if (contentRect.left < 0) {
      left = left + (0 - contentRect.left);
    }
    // 溢出屏幕右边
    if (contentRect.right > windowWidth.value) {
      left = left - (contentRect.right - windowWidth.value);
    }
  }
  if (["left", "right"].includes(position)) {
    // 溢出屏幕底部
    if (contentRect.bottom > windowHeight.value) {
      top = top - (contentRect.bottom - windowHeight.value);
    }
    // 溢出屏幕顶部
    if (contentRect.top < 0) {
      top = top + (0 - contentRect.top);
    }
    // 溢出屏幕左边
    if (contentRect.left < 0) {
      left = triggerRect.width + props.contentOffset;
    }
    // 溢出屏幕右边
    if (contentRect.right > windowWidth.value) {
      left = -(contentRect.width + props.contentOffset);
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
  contentRect: DOMRect,
  isAlignPoint?: boolean
) => {
  if (isAlignPoint) {
    return {
      top: mouseTop.value - triggerRect.top,
      left: mouseLeft.value - triggerRect.left,
    };
  }
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
    case "right":
      return {
        top: -(contentRect.height - triggerRect.height) / 2,
        left: triggerRect.width + props.contentOffset,
      };
    case "right-top":
      return {
        top: 0,
        left: triggerRect.width + props.contentOffset,
      };
    case "right-bottom":
      return {
        top: -(contentRect.height - triggerRect.height),
        left: triggerRect.width + props.contentOffset,
      };
    case "left":
      return {
        top: -(contentRect.height - triggerRect.height) / 2,
        left: -(contentRect.width + props.contentOffset),
      };
    case "left-top":
      return {
        top: 0,
        left: -(contentRect.width + props.contentOffset),
      };
    case "left-bottom":
      return {
        top: -(contentRect.height - triggerRect.height),
        left: -(contentRect.width + props.contentOffset),
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
  if (triggerMethods.value.includes("click")) {
    toggle();
  }
};

const handleContextMenuClick = () => {
  if (props.disabled || (openState.value && !props.clickToClose)) {
    return;
  }
  if (triggerMethods.value.includes("contextMenu")) {
    toggle();
  }
};

const handleMouseEnter = () => {
  if (props.disabled || !triggerMethods.value.includes("hover")) {
    return;
  }
  open(props.mouseEnterDelay);
};

const handleMouseLeave = () => {
  if (props.disabled || !triggerMethods.value.includes("hover")) {
    return;
  }
  hide(props.mouseLeaveDelay);
};

const handleFocusin = () => {
  if (props.disabled || !triggerMethods.value.includes("focus")) {
    return;
  }
  open(props.focusDelay);
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

const getTriggerRect = (isAlignPoint: boolean) => {
  return isAlignPoint
    ? ({
        top: mouseTop.value,
        bottom: mouseTop.value,
        left: mouseLeft.value,
        right: mouseLeft.value,
        width: 0,
        height: 0,
        x: mouseLeft.value,
        y: mouseTop.value,
      } as DOMRect)
    : dropdownRef.value!.getBoundingClientRect();
};

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
    <div @click="handleClick()" @contextmenu.prevent="handleContextMenuClick()">
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
