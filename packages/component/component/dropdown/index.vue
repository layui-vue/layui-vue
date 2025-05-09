<script setup lang="ts">
import type { CSSProperties, TeleportProps } from "vue";
import type {
  ContentComponentInstance,
  ContentProps,
  TriggerProps,
} from "../popper/types";
import type { Middlewares } from "../popper/usePopper/index";
import type {
  DropdownProps as _DropdownProps,
  DropdownContext,
  DropdownEmits,
  pointType,
} from "./interface";
import { useResizeObserver } from "@vueuse/core";

import {
  computed,
  inject,
  onUnmounted,
  provide,
  reactive,
  ref,
  watch,
} from "vue";
import { isArray } from "../../utils";
import Content from "../popper/component/content.vue";
import Trigger from "../popper/component/trigger.vue";
import useDelayTrigger from "../popper/hook/useDelayTrigger";
import { flip, hide, offset, shift } from "../popper/usePopper/index";
import { POPPER_INJECTION_KEY } from "../popper/utils";

import { DROPDOWN_INJECTION_KEY } from "./interface";
import { pointMiddleware } from "./utils";
import "./index.less";

defineOptions({
  name: "LayDropdown",
});

const props = withDefaults(defineProps<DropdownProps>(), {
  visible: false,
  trigger: "click",
  placement: "bottom-start",
  autoFitPosition: true,
  autoFitWidth: false,
  autoFitMinWidth: true,
  clickToClose: true,
  blurToClose: true,
  clickOutsideToClose: true,
  contentOffset: "2px",
  mouseEnterDelay: 150,
  mouseLeaveDelay: 150,
  focusDelay: 150,
});

const emits = defineEmits<DropdownEmits>();

export type DropdownProps = _DropdownProps;

const _trigger = computed(() => {
  return isArray(props.trigger) ? props.trigger : [props.trigger];
});

const _teleportProps = computed<TeleportProps>(() => {
  return {
    to: props.teleportProps?.to || "body",
    disabled: props.teleportProps?.disabled ?? false,
  };
});

const open = ref(props.visible);

const TriggerRef = ref<HTMLElement | null>(null);

const showAfter = computed(() => {
  return _trigger.value.includes("hover")
    ? props.mouseEnterDelay
    : _trigger.value.includes("focus")
      ? props.focusDelay
      : 0;
});

const hideAfter = computed(() => {
  return _trigger.value.includes("hover")
    ? props.mouseLeaveDelay
    : _trigger.value.includes("focus")
      ? props.focusDelay
      : 0;
});

const { onShow, onHidden } = useDelayTrigger({
  showAfter: showAfter.value,
  hideAfter: hideAfter.value,
  show,
  hidden,
});

const customEvents = computed(() => {
  return {
    click: (e: Event) => {
      if (!_trigger.value.includes("click"))
        return;
      if (open.value && !props.clickToClose)
        return;
      if (props.alignPoint)
        setPoint(e as PointerEvent);
      toggle();
    },
    contextmenu: (e: Event) => {
      if (!_trigger.value.includes("contextMenu"))
        return;
      if (open.value && !props.clickToClose)
        return;
      if (props.alignPoint)
        setPoint(e as PointerEvent);

      e.preventDefault();
      toggle();
    },
    focusout: () => {
      if (!_trigger.value.includes("focus") || !props.blurToClose)
        return;
      onHidden();
    },
  };
});

const point = reactive<pointType>({
  x: 0,
  y: 0,
});

function setPoint(e: PointerEvent) {
  point.x = e.pageX;
  point.y = e.pageY;
}

const triggerProps = computed<TriggerProps>(() => {
  return {
    trigger: _trigger.value,
    customEvents: customEvents.value,
  };
});

const triggerWidth = ref<number>();

const { stop: triggerStop } = useResizeObserver(TriggerRef, (entries) => {
  const entry = entries[0];
  const { width } = entry.contentRect;

  triggerWidth.value = width;
});

onUnmounted(() => {
  triggerStop && triggerStop();
});

const _contentStyle = computed(() => {
  const style: CSSProperties = {};

  const width = props.alignPoint ? 0 : triggerWidth.value || 0;

  if (props.autoFitMinWidth) {
    style.minWidth = `${width}px`;
  }

  if (props.autoFitWidth) {
    style.width = `${width}px`;
  }

  return style;
});

const offsetValue = computed(() => {
  return Number(`${props.contentOffset}`.replace("px", "") ?? 0);
});

const middlewares = computed(() => {
  return [
    offset(offsetValue.value),
    shift(),
    props.autoFitPosition && flip(),
    props.alignPoint && pointMiddleware(point),
    hide(),
  ].filter(Boolean) as Middlewares;
});

const contentProps = computed<ContentProps>(() => {
  return {
    modelValue: open.value,
    trigger: _trigger.value,
    placement: props.placement,
    disabled: props.disabled,
    enterable: true,
    popperClass: [
      "layui-anim-upbit",
      "layui-dropdown-content",
      props.contentClass,
    ],
    popperStyle: [props.contentStyle, _contentStyle.value],
    clickOutsideToClose: props.clickOutsideToClose,
    middlewares: middlewares.value,
    teleportProps: _teleportProps.value,
  };
});

function show() {
  if (props.disabled)
    return;
  open.value = true;
}

function hidden() {
  open.value = false;
}

watch(
  () => open.value,
  (newVal) => {
    if (newVal) {
      emits("show", newVal);
    }
    else {
      emits("hide", newVal);
    }
  },
);

provide(POPPER_INJECTION_KEY, {
  TriggerRef,
  onShow,
  onHidden,
});

const ContentRef = ref<ContentComponentInstance>();

function exposeShow() {
  onShow();
}

function exposeHide() {
  onHidden();
}

function toggle() {
  if (open.value) {
    onHidden();
  }
  else {
    onShow();
  }
}

const dropdownContext = inject<DropdownContext>(DROPDOWN_INJECTION_KEY, {});

function provideHide() {
  hidden();
  dropdownContext?.hide && dropdownContext?.hide();
}

provide(DROPDOWN_INJECTION_KEY, {
  hide: provideHide,
});

defineExpose({ show: exposeShow, hide: exposeHide, toggle });
</script>

<template>
  <Trigger v-bind="triggerProps">
    <slot />
  </Trigger>
  <Content v-bind="contentProps" ref="ContentRef">
    <slot name="content" />
  </Content>
</template>
