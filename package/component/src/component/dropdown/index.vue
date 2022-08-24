<script lang="ts">
export default {
  name: "LayDropdown",
};
</script>

<script setup lang="ts">
import "./index.less";
import { ComputedRef, CSSProperties, inject, reactive, Ref } from "vue";
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
import {
  dropdownInjectionKey,
  DropdownPlacement,
  ElementScrollRect,
  DropdownContext,
} from "./interface";
import TeleportWrapper from "./TeleportWrapper.vue";

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
  popupContainer?: string | undefined;
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
  popupContainer: "body",
});

const childrenRefs = new Set<Ref<HTMLElement>>();
const dropdownCtx = inject<DropdownContext | undefined>(
  dropdownInjectionKey,
  undefined
);
const dropdownRef = shallowRef<HTMLElement | undefined>();
const contentRef = shallowRef<HTMLElement | undefined>();
const contentStyle = ref<CSSProperties>({});
const { width: windowWidth, height: windowHeight } = useWindowSize();
const { x: mouseLeft, y: mouseTop } = useMouse();
const openState = ref(false);

const containerRef = computed(() =>
  props.popupContainer
    ? document.querySelector<HTMLElement>(props.popupContainer) ?? document.body
    : dropdownRef.value
) as ComputedRef<HTMLElement>;

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

const getElementScrollRect = (element: HTMLElement, containerRect: DOMRect) => {
  const rect = element.getBoundingClientRect();

  return {
    top: rect.top,
    bottom: rect.bottom,
    left: rect.left,
    right: rect.right,
    width: rect.width,
    height: rect.height,
    scrollTop: rect.top - containerRect.top,
    scrollBottom: rect.bottom - containerRect.top,
    scrollLeft: rect.left - containerRect.left,
    scrollRight: rect.right - containerRect.left,
  };
};

const updateContentStyle = () => {
  if (!containerRef.value || !dropdownRef.value || !contentRef.value) {
    return;
  }
  const containerRect = containerRef.value.getBoundingClientRect();
  const triggerRect = getElementScrollRect(dropdownRef.value, containerRect);
  const contentRect = getElementScrollRect(contentRef.value, containerRect);
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
      const triggerRect = getElementScrollRect(
        dropdownRef.value as HTMLElement,
        containerRect
      );
      const contentRect = getElementScrollRect(
        contentRef.value as HTMLElement,
        containerRect
      );
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
  triggerRect: ElementScrollRect,
  contentRect: ElementScrollRect,
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
  triggerRect: ElementScrollRect,
  contentRect: ElementScrollRect
) => {
  // FIXME 反转后仍溢出的场景
  const position = getPosition(placement);
  if (["top", "bottom"].includes(position)) {
    // 溢出屏幕底部
    if (contentRect.bottom > windowHeight.value) {
      top = triggerRect.scrollTop - contentRect.height - props.contentOffset;
    }
    // 溢出屏幕顶部
    if (contentRect.top < 0) {
      top = triggerRect.scrollBottom + props.contentOffset;
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
      left = triggerRect.scrollRight + props.contentOffset;
    }
    // 溢出屏幕右边
    if (contentRect.right > windowWidth.value) {
      left = triggerRect.scrollLeft - contentRect.width - props.contentOffset;
    }
  }

  return {
    top,
    left,
  };
};

const getContentOffset = (
  placement: DropdownPlacement,
  triggerRect: ElementScrollRect,
  contentRect: ElementScrollRect,
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
        top: triggerRect.scrollTop - contentRect.height - props.contentOffset,
        left:
          triggerRect.scrollLeft +
          Math.round((triggerRect.width - contentRect.width) / 2),
      };
    case "top-left":
      return {
        top: triggerRect.scrollTop - contentRect.height - props.contentOffset,
        left: triggerRect.scrollLeft,
      };
    case "top-right":
      return {
        top: triggerRect.scrollTop - contentRect.height - props.contentOffset,
        left: triggerRect.scrollRight - contentRect.width,
      };
    case "bottom":
      return {
        top: triggerRect.scrollBottom + props.contentOffset,
        left:
          triggerRect.scrollLeft +
          Math.round((triggerRect.width - contentRect.width) / 2),
      };
    case "bottom-left":
      return {
        top: triggerRect.scrollBottom + props.contentOffset,
        left: triggerRect.scrollLeft,
      };
    case "bottom-right":
      return {
        top: triggerRect.scrollBottom + props.contentOffset,
        left: triggerRect.scrollRight - contentRect.width,
      };
    case "right":
      return {
        top:
          triggerRect.scrollTop +
          Math.round((triggerRect.height - contentRect.height) / 2),
        left: triggerRect.scrollRight + props.contentOffset,
      };
    case "right-top":
      return {
        top: triggerRect.scrollTop,
        left: triggerRect.scrollRight + props.contentOffset,
      };
    case "right-bottom":
      return {
        top: triggerRect.scrollBottom - contentRect.height,
        left: triggerRect.scrollRight + props.contentOffset,
      };
    case "left":
      return {
        top:
          triggerRect.scrollTop +
          Math.round((triggerRect.height - contentRect.height) / 2),
        left: triggerRect.scrollLeft - contentRect.width - props.contentOffset,
      };
    case "left-top":
      return {
        top: triggerRect.scrollTop,
        left: triggerRect.scrollLeft - contentRect.width - props.contentOffset,
      };
    case "left-bottom":
      return {
        top: triggerRect.scrollBottom - contentRect.height,
        left: triggerRect.scrollLeft - contentRect.width - props.contentOffset,
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
}, 10);

const handleClick = () => {
  if (props.disabled || (openState.value && !props.clickToClose)) {
    return;
  }
  if (triggerMethods.value.includes("click")) {
    toggle();
  }
};

const handleContextMenuClick = (e: MouseEvent) => {
  if (props.disabled || (openState.value && !props.clickToClose)) {
    return;
  }
  if (triggerMethods.value.includes("contextMenu")) {
    e.preventDefault();
    if (props.alignPoint) {
      hide();
    }
    toggle();
  }
};

const handleMouseEnter = (e: MouseEvent) => {
  if (props.disabled || !triggerMethods.value.includes("hover")) {
    return;
  }
  open(props.mouseEnterDelay);
};

const handleMouseEnterWithContext = (e: MouseEvent) => {
  if (!props.popupContainer) {
    return;
  }
  dropdownCtx?.onMouseenter(e);
  handleMouseEnter(e);
};

const handleMouseLeave = (e: MouseEvent) => {
  if (props.disabled || !triggerMethods.value.includes("hover")) {
    return;
  }
  hide(props.mouseLeaveDelay);
};

const handleMouseLeaveWithContext = (e: MouseEvent) => {
  if (!props.popupContainer) {
    return;
  }
  dropdownCtx?.onMouseleave(e);
  handleMouseLeave(e);
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

const addChildRef = (ref: any) => {
  childrenRefs.add(ref);
  dropdownCtx?.addChildRef(ref);
};
const removeChildRef = (ref: any) => {
  childrenRefs.delete(ref);
  dropdownCtx?.removeChildRef(ref);
};

provide(
  dropdownInjectionKey,
  reactive({
    onMouseenter: handleMouseEnterWithContext,
    onMouseleave: handleMouseLeaveWithContext,
    addChildRef,
    removeChildRef,
  })
);

dropdownCtx?.addChildRef(contentRef);

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

onClickOutside(dropdownRef, (e) => {
  if (
    !props.clickOutsideToClose ||
    dropdownRef.value?.contains(e.target as HTMLElement) ||
    contentRef.value?.contains(e.target as HTMLElement)
  )
    return;
  for (const item of childrenRefs) {
    if (item.value?.contains(e.target as HTMLElement)) {
      return;
    }
  }
  hide();
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
  dropdownCtx?.removeChildRef(contentRef);
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
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
    @focusin="handleFocusin()"
    @focusout="handleFocusout()"
    :class="{ 'layui-dropdown-up': openState }"
  >
    <div @click="handleClick()" @contextmenu="handleContextMenuClick">
      <slot></slot>
    </div>
    <TeleportWrapper :to="popupContainer">
      <dl
        v-if="openState"
        ref="contentRef"
        class="layui-dropdown-content layui-anim layui-anim-upbit"
        :style="contentStyle"
        @mouseenter="handleMouseEnterWithContext"
        @mouseleave="handleMouseLeaveWithContext"
      >
        <slot name="content"></slot>
      </dl>
    </TeleportWrapper>
  </div>
</template>
