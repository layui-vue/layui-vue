<script lang="ts">
export default {
  name: "LayDropdown",
};
</script>

<script setup lang="ts">
import { provide, ref, watch } from "vue";
import { useClickOutside } from "@layui/hooks-vue";

export interface LayDropdownProps {
  trigger?: string;
}

const dropdownRef = ref<null | HTMLElement>(null);
const isClickOutside = useClickOutside(dropdownRef);

const props = withDefaults(defineProps<LayDropdownProps>(), {
  trigger: "click",
});

const openState = ref(false);

const open = function () {
  openState.value = true;
};

const hide = function () {
  openState.value = false;
};

const toggle = function () {
  openState.value = !openState.value;
};

watch(isClickOutside, () => {
  if (isClickOutside.value) {
    openState.value = false;
  }
});

provide("openState", openState);

defineExpose({ open, hide, toggle });
</script>

<template>
  <div
    v-if="trigger === 'click'"
    ref="dropdownRef"
    class="layui-dropdown"
    :class="[openState ? 'layui-dropdown-up' : '']"
  >
    <div @click="toggle">
      <slot></slot>
    </div>
    <dl class="layui-anim layui-anim-upbit">
      <ul class="layui-menu layui-dropdown-menu">
        <slot name="content"></slot>
      </ul>
    </dl>
  </div>
  <div
    v-if="trigger === 'hover'"
    class="layui-dropdown"
    :class="[openState ? 'layui-dropdown-up' : '']"
    @mouseenter="open"
    @mouseleave="hide"
  >
    <div>
      <slot></slot>
    </div>
    <dl class="layui-anim layui-anim-upbit">
      <ul class="layui-menu layui-dropdown-menu">
        <slot name="content"></slot>
      </ul>
    </dl>
  </div>
</template>
