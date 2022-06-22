<script lang="ts">
export default {
  name: "LayDropdown",
};
</script>

<script setup lang="ts">
import "./index.less";
import {
  CSSProperties,
  nextTick,
  onBeforeUnmount,
  onMounted,
  provide,
  ref,
  shallowRef,
} from "vue";
import {
  onClickOutside,
  useResizeObserver,
  useThrottleFn,
  useWindowSize,
} from "@vueuse/core";
import { DropdownTrigger, dropdownPlacement } from "./interface";

export interface LayDropdownProps {
  trigger?: DropdownTrigger;
  placement?: dropdownPlacement;
  disabled?: boolean;
  autoFitPosition?: boolean;
  autoFitWidth?: boolean;
  autoFitMinWidth?: boolean;
  updateAtScroll?: boolean;
  autoFixPosition?: boolean;
  clickOutsideToClose?: boolean;
  contentOffset?: number;
}

const props = withDefaults(defineProps<LayDropdownProps>(), {
  trigger: "click",
  disabled: false,
  placement: "bottom-left",
  autoFitPosition: true,
  autoFitMinWidth: true,
  autoFitWidth: false,
  updateAtScroll: false,
  autoFixPosition: true,
  clickOutsideToClose: true,
  contentOffset: 2,
});

const dropdownRef = shallowRef<HTMLElement | undefined>();
const contentRef = shallowRef<HTMLElement | undefined>();
const contentStyle = ref<CSSProperties>({});
const { width: windowWidth, height: windowHeight } = useWindowSize();
const openState = ref(false);

const emit = defineEmits(["open", "hide"]);

onClickOutside(dropdownRef, () => {
  if (props.clickOutsideToClose) {
    changeVisible(false);
  }
});

const open = (): void => {
  if (props.disabled == false) {
    changeVisible(true);
    emit("open");
  }
};

const hide = (): void => {
  changeVisible(false);
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

const changeVisible = (visible: boolean) => {
  if (visible === openState.value) {
    return;
  }
  openState.value = visible;
  nextTick(() => {
    updateContentStyle();
  });
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
  placement: dropdownPlacement,
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
  placement: dropdownPlacement,
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
  placement: dropdownPlacement,
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
}, 300);

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
}),
  provide("openState", openState);

defineExpose({ open, hide, toggle });
</script>

<template>
  <div
    ref="dropdownRef"
    class="layui-dropdown"
    @mouseenter="trigger == 'hover' && open()"
    @mouseleave="trigger == 'hover' && hide()"
    :class="{ 'layui-dropdown-up': openState }"
  >
    <div
      @click="trigger == 'click' && toggle()"
      @contextmenu.prevent="trigger == 'contextMenu' && toggle()"
    >
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
