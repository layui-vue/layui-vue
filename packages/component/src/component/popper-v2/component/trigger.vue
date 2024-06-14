<script setup lang="ts">
import { inject, watch } from "vue";
import ForwardRef from "./forward-ref";
import { POPPER_INJECTION_KEY } from "../utils";

const { TriggerRef, onShow, onHidden } = inject(POPPER_INJECTION_KEY)!;

const props = defineProps({
  modelValue: Boolean,
  trigger: String,
});

const setTriggerRef = (el: HTMLElement | null) => {
  TriggerRef.value = el;
};

const setEvents = <T extends (e: Event) => void>(
  el: HTMLElement | null | undefined,
  events: Record<string, T>,
  type: "addEventListener" | "removeEventListener"
) => {
  if (el) {
    Object.entries(events).forEach(([name, handler]) => {
      el[type](name, handler);
    });
  }
};

watch(TriggerRef, (newEl, oldEl) => {
  setEvents(newEl, events, "addEventListener");
  setEvents(oldEl, events, "removeEventListener");
});

const onClick = () => {
  if (props.trigger === "hover") return;
  onShow();
};

const onMouseenter = () => {
  if (props.trigger === "click") return;
  onShow();
};

const onMouseleave = () => {
  if (props.trigger === "click") return;
  onHidden();
};

const events = {
  click: onClick,
  mouseenter: onMouseenter,
  mouseleave: onMouseleave,
};
</script>

<template>
  <forward-ref :set-ref="setTriggerRef">
    <slot />
  </forward-ref>
</template>
