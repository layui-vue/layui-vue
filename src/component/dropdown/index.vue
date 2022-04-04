<script lang="ts">
export default {
  name: "LayDropdown",
};
</script>

<script setup lang="ts">
import "./index.less";
import { provide, ref } from "vue";
import { onClickOutside } from "@vueuse/core";
import { DropdownTrigger } from "./interface";

export interface LayDropdownProps {
  trigger?: DropdownTrigger;
  disabled?: boolean
}

const props = withDefaults(defineProps<LayDropdownProps>(), {
  trigger: "click",
  disabled: false
});

const openState = ref(false);
const dropdownRef = ref<null | HTMLElement>(null);

onClickOutside(dropdownRef, (event) => {
  openState.value = false;
});

const open = function () {
  if (props.disabled === false)
    openState.value = true;
};

const hide = function () {
  openState.value = false;
};

const toggle = function () {
  if (props.disabled === false)
    openState.value = !openState.value;
};

provide("openState", openState);

defineExpose({ open, hide, toggle });
</script>

<template>
  <div
    ref="dropdownRef"
    class="layui-dropdown"
    @mouseenter="trigger === 'hover' && open()"
    @mouseleave="trigger === 'hover' && hide()"
    :class="{ 'layui-dropdown-up': openState }"
  >
    <div @click="trigger === 'click' && toggle()">
      <slot></slot>
    </div>
    <dl class="layui-anim layui-anim-upbit">
      <slot name="content"></slot>
    </dl>
  </div>
</template>
