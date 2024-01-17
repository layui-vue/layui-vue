<script setup lang="ts">
import "./index.less";
import { computed } from "vue";
import {
  ButtonBorder,
  ButtonEmits,
  ButtonNativeType,
  ButtonSize,
  ButtonType,
} from "./interface";
import useProps from "./index.hooks";

export interface ButtonProps {
  type?: ButtonType;
  size?: ButtonSize;
  prefixIcon?: string;
  suffixIcon?: string;
  loadingIcon?: string;
  borderStyle?: string;
  border?: ButtonBorder;
  fluid?: boolean;
  radius?: boolean;
  loading?: boolean;
  disabled?: boolean;
  nativeType?: ButtonNativeType;
}

defineOptions({
  name: "LayButton",
});

const props = withDefaults(defineProps<ButtonProps>(), {
  borderStyle: "soild",
  radius: false,
  loadingIcon: "layui-icon-loading-one",
  nativeType: "button",
  fluid: false,
  loading: false,
});

const { size } = useProps(props);

const emits = defineEmits(ButtonEmits);

const onClick = (event: MouseEvent) => {
  if (!props.disabled && !props.loading) {
    emits("click", event);
  }
};

const styles = computed(() => {
  return {
    border: `1px ${props.borderStyle}`,
  };
});

const classes = computed(() => {
  return [
    {
      "layui-btn-fluid": props.fluid,
      "layui-btn-radius": props.radius,
      "layui-btn-disabled": props.disabled,
    },
    props.type ? `layui-btn-${props.type}` : "",
    size.value ? `layui-btn-${size.value}` : "",
    props.border ? `layui-border-${props.border}` : "",
  ];
});
</script>

<template>
  <button
    class="layui-btn"
    :class="classes"
    :style="styles"
    :type="nativeType"
    @click="onClick"
  >
    <i v-if="prefixIcon" :class="`layui-icon ${prefixIcon}`"></i>
    <i
      v-if="loading"
      :class="loadingIcon"
      class="layui-icon layui-anim layui-anim-rotate layui-anim-loop"
    ></i>
    <span>
      <slot></slot>
    </span>
    <i v-if="suffixIcon" :class="`layui-icon ${suffixIcon}`"></i>
  </button>
</template>
