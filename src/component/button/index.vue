<script lang="ts">
export default {
  name: "LayButton",
};
</script>

<script setup lang="ts">
import "./index.less";
import { computed } from "vue";
import {
  ButtonBorder,
  ButtonNativeType,
  ButtonSize,
  ButtonType,
} from "./interface";
import { Boolean, BooleanOrString, String } from "../../types";

export interface LayButtonProps {
  type?: ButtonType;
  size?: ButtonSize;
  prefixIcon?: String;
  suffixIcon?: String;
  border?: ButtonBorder;
  fluid?: BooleanOrString;
  radius?: BooleanOrString;
  loading?: BooleanOrString;
  disabled?: BooleanOrString;
  nativeType?: ButtonNativeType;
}

const props = withDefaults(defineProps<LayButtonProps>(), {
  fluid: false,
  radius: false,
  loading: false,
  disabled: false,
  nativeType: "button"
});

const emit = defineEmits(["click"]);

const onClick = (event: any) => {
  if (!props.disabled) {
    emit("click", event);
  }
};

const classes = computed(() => {
  return [
    {
      "layui-btn-fluid": props.fluid,
      "layui-btn-radius": props.radius,
      "layui-btn-disabled": props.disabled,
    },
    props.type ? `layui-btn-${props.type}` : "",
    props.size ? `layui-btn-${props.size}` : "",
    props.border ? `layui-border-${props.border}` : "",
  ];
});
</script>

<template>
  <button
    class="layui-btn"
    :class="classes"
    :type="nativeType"
    @click="onClick"
  >
    <i v-if="prefixIcon" :class="`layui-icon ${prefixIcon}`"></i>
    <i
      v-if="loading"
      class="layui-icon layui-icon-loading-one layui-anim layui-anim-rotate layui-anim-loop"
    ></i>
    <slot v-else></slot>
    <i v-if="suffixIcon" :class="`layui-icon ${suffixIcon}`"></i>
  </button>
</template>
