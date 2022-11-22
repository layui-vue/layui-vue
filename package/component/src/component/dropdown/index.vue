<script lang="ts">
export default {
  name: "LayDropdown",
  inheritAttrs: false,
};
</script>

<script setup lang="ts">
import "./index.less";
import {
  ComputedRef,
  CSSProperties,
  h,
  inject,
  reactive,
  Ref,
  toRefs,
  useSlots,
  Fragment,
  cloneVNode,
  useAttrs,
  StyleValue,
} from "vue";
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
import {
  dropdownInjectionKey,
  DropdownPlacement,
  ElementScrollRect,
  DropdownContext,
} from "./interface";
import TeleportWrapper from "../_components/teleportWrapper.vue";
import { useFirstElement, getScrollElements, transformPlacement } from "./util";
import RenderFunction from "../_components/renderFunction";

export type DropdownTrigger = "click" | "hover" | "focus" | "contextMenu";

export interface DropdownProps {
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
  mouseEnterDelay?: number;
  mouseLeaveDelay?: number;
  focusDelay?: number;
  alignPoint?: boolean;
  contentClass?: string | Array<string | object> | object;
  contentStyle?: StyleValue;
  popupContainer?: string | undefined;
}

const props = withDefaults(defineProps<DropdownProps>(), {
  visible: false,
  trigger: "click",
  disabled: false,
  placement: "bottom-start",
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

const emit = defineEmits(["show", "hide"]);

const slots = useSlots();
const attrs = useAttrs();
const childrenRefs = new Set<Ref<HTMLElement>>();
const dropdownCtx = inject<DropdownContext | undefined>(
  dropdownInjectionKey,
  undefined
);
const { children, firstElement: dropdownRef } = useFirstElement();
const contentRef = shallowRef<HTMLElement | undefined>();
const contentStyle = ref<CSSProperties>({});
const { width: windowWidth, height: windowHeight } = useWindowSize();
const mousePosition = reactive({
  x: 0,
  y: 0,
});
const { x: mouseLeft, y: mouseTop } = toRefs(mousePosition);
const openState = ref(false);
let scrollElements: HTMLElement[] | undefined;

const containerRef = computed(() =>
  props.popupContainer
    ? document.querySelector<HTMLElement>(props.popupContainer) ?? document.body
    : dropdownRef.value
) as ComputedRef<HTMLElement>;

const triggerMethods = computed(() =>
  ([] as Array<DropdownTrigger>).concat(props.trigger)
);

const computedPlacement = computed(() => {
  return transformPlacement(props.placement);
});

let delayTimer = 0;

const cleanDelayTimer = () => {
  if (delayTimer) {
    window.clearTimeout(delayTimer);
    delayTimer = 0;
  }
};

const show = (delay?: number): void => {
  if (props.disabled == false) {
    changeVisible(true, delay);
    emit("show");
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
      show();
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

const getTriggerRect = () => {
  return {
    top: mouseTop.value,
    bottom: mouseTop.value,
    left: mouseLeft.value,
    right: mouseLeft.value,
    scrollTop: mouseTop.value,
    scrollBottom: mouseTop.value,
    scrollLeft: mouseLeft.value,
    scrollRight: mouseLeft.value,
    width: 0,
    height: 0,
  };
};

const updateContentStyle = () => {
  if (!containerRef.value || !dropdownRef.value || !contentRef.value) {
    return;
  }

  const containerRect = containerRef.value.getBoundingClientRect();
  const triggerRect = props.alignPoint
    ? getTriggerRect()
    : getElementScrollRect(dropdownRef.value, containerRect);
  const contentRect = getElementScrollRect(contentRef.value, containerRect);
  const { style } = getContentStyle(
    computedPlacement.value,
    triggerRect,
    contentRect
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
      const triggerRect = props.alignPoint
        ? getTriggerRect()
        : getElementScrollRect(dropdownRef.value as HTMLElement, containerRect);
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
        computedPlacement.value,
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

const updateMousePosition = (e: MouseEvent) => {
  if (props.alignPoint) {
    const { pageX, pageY } = e;
    mousePosition.x = pageX;
    mousePosition.y = pageY;
  }
};

const getContentStyle = (
  placement: DropdownPlacement,
  triggerRect: ElementScrollRect,
  contentRect: ElementScrollRect,
  {
    customStyle = {},
  }: {
    customStyle?: CSSProperties;
  } = {}
) => {
  let { top, left } = getContentOffset(placement, triggerRect, contentRect);
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
  if (["top", "top-start", "top-end"].includes(placement)) {
    return "top";
  }
  if (["bottom", "bottom-start", "bottom-end"].includes(placement)) {
    return "bottom";
  }
  if (["left", "left-start", "left-end"].includes(placement)) {
    return "left";
  }
  if (["right", "right-start", "right-end"].includes(placement)) {
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
  contentRect: ElementScrollRect
) => {
  switch (placement) {
    case "top":
      return {
        top: triggerRect.scrollTop - contentRect.height - props.contentOffset,
        left:
          triggerRect.scrollLeft +
          Math.round((triggerRect.width - contentRect.width) / 2),
      };
    case "top-start":
      return {
        top: triggerRect.scrollTop - contentRect.height - props.contentOffset,
        left: triggerRect.scrollLeft,
      };
    case "top-end":
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
    case "bottom-start":
      return {
        top: triggerRect.scrollBottom + props.contentOffset,
        left: triggerRect.scrollLeft,
      };
    case "bottom-end":
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
    case "right-start":
      return {
        top: triggerRect.scrollTop,
        left: triggerRect.scrollRight + props.contentOffset,
      };
    case "right-end":
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
    case "left-start":
      return {
        top: triggerRect.scrollTop,
        left: triggerRect.scrollLeft - contentRect.width - props.contentOffset,
      };
    case "left-end":
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

const handleScroll = useThrottleFn(() => {
  if (openState.value) {
    updateContentStyle();
  }
}, 10);

const handleClick = (e: MouseEvent) => {
  if (props.disabled || (openState.value && !props.clickToClose)) {
    return;
  }
  if (triggerMethods.value.includes("click")) {
    updateMousePosition(e);
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
    updateMousePosition(e);
    toggle();
  }
};

const handleMouseEnter = (e: MouseEvent) => {
  if (props.disabled || !triggerMethods.value.includes("hover")) {
    return;
  }
  show(props.mouseEnterDelay);
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
  show(props.focusDelay);
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

const handleContextHide = () => {
  hide();
  dropdownCtx?.hide();
};

const addChildRef = (ref: any) => {
  childrenRefs.add(ref);
  dropdownCtx?.addChildRef(ref);
};
const removeChildRef = (ref: any) => {
  childrenRefs.delete(ref);
  dropdownCtx?.removeChildRef(ref);
};

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
    !openState.value ||
    dropdownRef.value?.contains(e.target as HTMLElement) ||
    contentRef.value?.contains(e.target as HTMLElement)
  ) {
    return;
  }
  for (const item of childrenRefs) {
    if (item.value?.contains(e.target as HTMLElement)) {
      return;
    }
  }

  hide();
});

const onlyChildRenderFunc = () => {
  const slotContent = slots.default ? slots.default() : [];
  const transformedSlotContent = slotContent.map((vnode) =>
    cloneVNode(
      vnode,
      {
        onClick: handleClick,
        onContextmenu: handleContextMenuClick,
        onMouseenter: handleMouseEnter,
        onMouseleave: handleMouseLeave,
        onFocusin: handleFocusin,
        onFocusout: handleFocusout,
        ...attrs,
      },
      true
    )
  );

  children.value = transformedSlotContent;
  return h(Fragment, children.value);
};

onMounted(() => {
  if (props.updateAtScroll) {
    scrollElements = getScrollElements(dropdownRef.value);
    for (const item of scrollElements) {
      item.addEventListener("scroll", handleScroll);
    }
  }
  window.addEventListener("resize", handleScroll);
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
  window.removeEventListener("resize", handleScroll);
});

watch(
  () => props.visible,
  (newVal, oldVal) => {
    openState.value = newVal;
  },
  { immediate: true }
);

provide(
  dropdownInjectionKey,
  reactive({
    onMouseenter: handleMouseEnterWithContext,
    onMouseleave: handleMouseLeaveWithContext,
    addChildRef,
    removeChildRef,
    hide: handleContextHide,
  })
);

provide("openState", openState);

defineExpose({ show, hide, toggle });
</script>

<template>
  <RenderFunction
    :renderFunc="onlyChildRenderFunc"
    v-bind="$attrs"
  ></RenderFunction>
  <TeleportWrapper :to="popupContainer" :disabled="disabled">
    <div
      v-if="openState"
      ref="contentRef"
      :class="[
        'layui-dropdown-content',
        'layui-anim',
        'layui-anim-upbit',
        props.contentClass,
      ]"
      :style="[contentStyle, props.contentStyle ?? '']"
      @mouseenter="handleMouseEnterWithContext"
      @mouseleave="handleMouseLeaveWithContext"
    >
      <slot name="content"></slot>
    </div>
  </TeleportWrapper>
</template>
