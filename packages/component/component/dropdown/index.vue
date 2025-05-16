<script setup lang="ts">
import type { UseResizeObserverReturn } from "@vueuse/core";

import type { CSSProperties } from "vue";
import type {
  PopperProps,
} from "../popper/types";
import type { Middlewares } from "../popper/usePopper/index";
import type {
  DropdownProps as _DropdownProps,
  DropdownContext,
  DropdownEmits,
  pointType,
} from "./interface";
import LayPopper from "@layui/component/component/popper/popper.vue";

import { normalizeArray } from "@layui/component/utils";
import { useResizeObserver } from "@vueuse/core";
import {
  computed,
  inject,
  onMounted,
  onUnmounted,
  provide,
  reactive,
  ref,
  watch,
} from "vue";
import { flip, hide, offset, shift } from "../popper/usePopper/index";

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
  return normalizeArray(props.trigger);
});

const open = ref(props.visible);

const popperRef = ref<InstanceType<typeof LayPopper>>();

const triggerCustomEvents = computed(() => {
  return {
    click: (e: Event) => {
      if (!_trigger.value.includes("click")) {
        return;
      }

      if (open.value && !props.clickToClose) {
        return;
      }

      if (props.alignPoint) {
        setPoint(e as PointerEvent);
      }

      toggle();
    },
    contextmenu: (e: Event) => {
      if (!_trigger.value.includes("contextMenu")) {
        return;
      }

      if (open.value && !props.clickToClose) {
        return;
      }

      if (props.alignPoint) {
        setPoint(e as PointerEvent);
      }

      e.preventDefault();
      toggle();
    },
    focusout: () => {
      if (!_trigger.value.includes("focus") || !props.blurToClose) {
        return;
      }

      doHidden();
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

const triggerWidth = ref<number>();

let triggerStop: UseResizeObserverReturn | null;

onMounted(() => {
  triggerStop = useResizeObserver(popperRef.value?.TriggerRef, (entries) => {
    const entry = entries[0];
    const { width } = entry.contentRect;

    triggerWidth.value = width;
  });
});

onUnmounted(() => {
  triggerStop && triggerStop.stop();
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

const middlewares = computed(() => {
  return [
    offset(offsetValue.value),
    shift(),
    props.autoFitPosition && flip(),
    props.alignPoint && pointMiddleware(point),
    hide(),
  ].filter(Boolean) as Middlewares;
});

const popperProps = computed<PopperProps>(() => {
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
    showAfter: showAfter.value,
    hideAfter: hideAfter.value,
    popperStyle: [props.contentStyle, _contentStyle.value],
    clickOutsideToClose: props.clickOutsideToClose,
    middlewares: middlewares.value,
    teleportProps: props.teleportProps,
    triggerCustomEvents: triggerCustomEvents.value,
  };
});

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

const dropdownContext = inject<DropdownContext>(DROPDOWN_INJECTION_KEY, {});

function provideHide() {
  doHidden();
  dropdownContext?.hide && dropdownContext?.hide();
}

provide(DROPDOWN_INJECTION_KEY, {
  hide: provideHide,
});

function show() {
  open.value = true;
}

function doHidden() {
  open.value = false;
}

function toggle() {
  open.value = !open.value;
}

defineExpose({ show, hide: doHidden, toggle });
</script>

<template>
  <LayPopper ref="popperRef" v-model="open" v-bind="popperProps">
    <slot />

    <template #content>
      <slot name="content" />
    </template>
  </LayPopper>
</template>
