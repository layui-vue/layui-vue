<script setup lang="ts">
import type { TriggerProps } from "../types";

import { inject, watch } from "vue";
import { POPPER_INJECTION_KEY } from "../utils";
import ForwardRef from "./forward-ref";

const props = withDefaults(defineProps<TriggerProps>(), {});

const { TriggerRef, onShow, onHidden } = inject(POPPER_INJECTION_KEY)!;

const events = {
  click: onClick,
  mouseenter: onMouseenter,
  mouseleave: onMouseleave,
  contextmenu: onContextMenu,
  focusin: onFocusin,
  focusout: onFocusout,
  ...props.triggerCustomEvents,
};

function setTriggerRef(el: HTMLElement | null) {
  TriggerRef.value = el;
}

function setEvents<T extends (e: Event) => void>(el: HTMLElement | null | undefined, events: Record<string, T>, type: "addEventListener" | "removeEventListener") {
  if (el) {
    Object.entries(events).forEach(([name, handler]) => {
      el[type](name, handler);
    });
  }
}

watch(TriggerRef, (newEl, oldEl) => {
  setEvents(newEl, events, "addEventListener");
  setEvents(oldEl, events, "removeEventListener");
});

function onClick() {
  if (!props.trigger?.includes("click"))
    return;
  onShow();
}

function onMouseenter() {
  if (!props.trigger?.includes("hover"))
    return;
  onShow();
}

function onMouseleave() {
  if (!props.trigger?.includes("hover"))
    return;
  onHidden();
}

function onContextMenu(e: Event) {
  if (!props.trigger?.includes("contextMenu"))
    return;
  e.preventDefault();
  onShow();
}

function onFocusin() {
  if (!props.trigger?.includes("focus"))
    return;
  onShow();
}

function onFocusout() {
  if (!props.trigger?.includes("focus"))
    return;
  onHidden();
}
</script>

<template>
  <ForwardRef :set-ref="setTriggerRef">
    <slot />
  </ForwardRef>
</template>
