<script lang="ts">
export default {
  name: "LayDropdown",
};
</script>

<script setup lang="ts">
import "./index.less";
import { computed, provide, ref } from "vue";
import { onClickOutside } from "@vueuse/core";
import { DropdownTrigger } from "./interface";

export interface LayDropdownProps {
  trigger?: DropdownTrigger;
  disabled?: boolean;
}

const props = withDefaults(defineProps<LayDropdownProps>(), {
  trigger: "click",
  disabled: false,
});

const openState = ref(false);
const dropdownRef = ref<null | HTMLElement>();
const dropdownX = ref<number | string>(0);
const dropdownY = ref<number | string>("auto");
const emit = defineEmits(["open", "hide"]);

onClickOutside(dropdownRef, () => {
  openState.value = false;
});

const open = function (event?: Event): void {
  if (props.disabled === false) {
    
    openState.value = true;
    emit("open");
  }
};

const hide = function (): void {
  openState.value = false;
  emit("hide");
};

const toggle = function (event?: Event): void {
  if (props.disabled === false)
    if (openState.value) {
      hide();
    } else {
      open(event);
    }
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
    <div
      @click="trigger === 'click' && toggle()"
      @contextmenu.prevent="trigger === 'contextMenu' && toggle($event)"
    >
      <slot></slot>
    </div>
    <dl class="layui-anim layui-anim-upbit">
      <slot name="content"></slot>
    </dl>
  </div>
</template>
