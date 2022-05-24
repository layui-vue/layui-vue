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
const dropdownRef = ref<null | HTMLElement>(null);
const dropdownX = ref<number | string>(0);
const dropdownY = ref<number | string>("auto");
const emit = defineEmits(["open", "hide"]);
// @ts-ignore
onClickOutside(dropdownRef, (event) => {
  openState.value = false;
});

const open = function (event?: Event): void {
  if (props.disabled === false) {
    if (event) {
      const el = event.currentTarget;
      // @ts-ignore
      const rect = el.getBoundingClientRect();
      // @ts-ignore
      dropdownX.value = event.clientX - rect.left + "px";
      // @ts-ignore
      dropdownY.value = event.clientY - rect.top + "px";
    }

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

const dropdownStyle = computed(() => ({
  "--layui-dropdown-left": dropdownX.value,
  "--layui-dropdown-top": dropdownY.value,
}));

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
    :style="dropdownStyle"
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
