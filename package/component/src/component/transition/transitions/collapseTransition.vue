<template>
  <transition
    v-on:before-enter="beforeEnter"
    v-on:enter="enter"
    v-on:after-enter="afterEnter"
    v-on:before-leave="beforeLeave"
    v-on:leave="leave"
    v-on:after-leave="afterLeave"
  >
    <slot></slot>
  </transition>
</template>

<script lang="ts">
export default {
  name: "LayCollapseTransition",
};
</script>

<script setup lang="ts">
import { inject } from "vue";

const time = inject("time");
const elTransition = `${time}s height ease-in-out, ${time}s padding-top ease-in-out, ${time}s padding-bottom ease-in-out`;

const beforeEnter = (el: any) => {
  el.style.transition = elTransition;
  if (!el.dataset) el.dataset = {};
  el.dataset.oldPaddingTop = el.style.paddingTop;
  el.dataset.oldPaddingBottom = el.style.paddingBottom;
  el.style.height = 0;
  el.style.paddingTop = 0;
  el.style.paddingBottom = 0;
};

const enter = (el: any) => {
  el.dataset.oldOverflow = el.style.overflow;
  if (el.scrollHeight !== 0) {
    el.style.height = el.scrollHeight + "px";
    el.style.paddingTop = el.dataset.oldPaddingTop;
    el.style.paddingBottom = el.dataset.oldPaddingBottom;
  } else {
    el.style.height = "";
    el.style.paddingTop = el.dataset.oldPaddingTop;
    el.style.paddingBottom = el.dataset.oldPaddingBottom;
  }
  el.style.overflow = "hidden";
};

const afterEnter = (el: any) => {
  el.style.transition = "";
  el.style.height = "";
  el.style.overflow = el.dataset.oldOverflow;
};

const beforeLeave = (el: any) => {
  if (!el.dataset) el.dataset = {};
  el.dataset.oldPaddingTop = el.style.paddingTop;
  el.dataset.oldPaddingBottom = el.style.paddingBottom;
  el.dataset.oldOverflow = el.style.overflow;
  var computedStyle = getComputedStyle(el, null);
  el.style.height =
    el.scrollHeight -
    parseInt(computedStyle.paddingTop) -
    parseInt(computedStyle.paddingBottom) +
    "px";
  el.style.overflow = "hidden";
};

const leave = (el: any) => {
  if (el.scrollHeight !== 0) {
    el.style.transition = elTransition;
    el.style.height = 0;
    el.style.paddingTop = 0;
    el.style.paddingBottom = 0;
  }
};

const afterLeave = (el: any) => {
  el.style.transition = "";
  el.style.height = "";
  el.style.overflow = el.dataset.oldOverflow;
  el.style.paddingTop = el.dataset.oldPaddingTop;
  el.style.paddingBottom = el.dataset.oldPaddingBottom;
};
</script>
