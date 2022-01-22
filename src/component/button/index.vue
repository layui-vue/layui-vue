<script lang="ts">
export default {
  name: "LayButton",
};
</script>

<script setup lang="ts">
import "./index.less";
import { computed } from "vue";

export interface LayButtonProps {
  type?: "primary" | "normal" | "warm" | "danger";
  size?: "lg" | "sm" | "xs";
  fluid?: boolean | string;
  radius?: boolean | string;
  border?: "green" | "blue" | "orange" | "red" | "black";
  disabled?: boolean | string;
  loading?: boolean | string;
  nativeType?: "button" | "submit" | "reset";
}

const props = withDefaults(defineProps<LayButtonProps>(), {
  fluid: false,
  radius: false,
  loading: false,
  disabled: false,
  nativeType: "button",
});

const emit = defineEmits(["click"]);

const onClick = (event : any) => {
  if(!props.disabled) {
    emit("click", event);
  }
}

const classes = computed(() => {
  return [
    props.type ? `layui-btn-${props.type}` : "",
    props.size ? `layui-btn-${props.size}` : "",
    props.border ? `layui-border-${props.border}` : "",
  ];
});
</script>

<template>
  <button
    class="layui-btn"
    :class="[
      {
        'layui-btn-fluid': fluid,
        'layui-btn-radius': radius,
        'layui-btn-disabled': disabled,
      },
      classes,
    ]"
    :type="nativeType"
    @click="onClick"
  >
    <i
      v-if="loading"
      class="layui-icon layui-icon-loading-one layui-anim layui-anim-rotate layui-anim-loop"
    ></i>
    <slot v-else></slot>
  </button>
</template>
