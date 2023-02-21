<script lang="ts">
export default {
  name: "LayRipple",
};
</script>

<script setup lang="ts">
import { computed, onMounted, ref, watch } from "vue";
import "./index.less";
import { RippleTrigger, RippleType } from "./interface";

export interface RippleProps {
  type?: RippleType;
  color?: string;
  borderRadius?: string;
  spreadWidth?: string;
  spreadSize?: string;
  trigger?: RippleTrigger;
  center?: boolean;
}

const props = withDefaults(defineProps<RippleProps>(), {
  type: "inset",
  color: "currentColor",
  borderRadius: "0",
  spreadWidth: "6px",
  trigger: "click",
  center: false,
});

const isActiveRef = ref(false);
const spreadSizeRef = ref<string>("0px");
const ripplesRefEl = ref<HTMLElement | null>(null);
const waterRipplesContainerRefEl = ref<HTMLElement | null>(null);

const isOut = computed(() => {
  return props.type === "out";
});

const rippleX = ref<string | number | undefined>(undefined);
const rippleY = ref<string | number | undefined>(undefined);

const onActive = function (eventParam: Event) {
  isActiveRef.value = true;

  // 计算点击位置和波纹大小
  if (props.type === "inset" && !props.spreadSize && !props.center) {
    const el = eventParam.currentTarget;
    // @ts-ignore
    const rect = el.getBoundingClientRect();
    // @ts-ignore
    const rippleOffsetLeft = event.clientX - rect.left;
    // @ts-ignore
    const rippleOffsetTop = event.clientY - rect.top;
    const sizeX = Math.max(rippleOffsetLeft, rect.width - rippleOffsetLeft);
    const sizeY = Math.max(rippleOffsetTop, rect.height - rippleOffsetTop);
    rippleX.value = rippleOffsetLeft + "px";
    rippleY.value = rippleOffsetTop + "px";
    spreadSizeRef.value = Math.sqrt(sizeX ** 2 + sizeY ** 2) * 2 + "px";
  }
};

const initWidth = function () {
  let container = waterRipplesContainerRefEl.value;
  let ripples = ripplesRefEl.value;
  if (!container || !ripples) return;
  if (props.type == "out") {
    ripples.style.width = container.clientWidth + "px";
  } else {
    container.style.overflow = "hidden";
    if (!props.spreadSize || props.center) {
      spreadSizeRef.value = container.clientWidth * 1.1 + "px";
    } else {
      spreadSizeRef.value = props.spreadSize;
    }
  }
  ripples.addEventListener(
    "animationend",
    () => {
      isActiveRef.value = false;
    },
    false
  );
};

onMounted(() => {
  initWidth();
});

watch(
  () => props.trigger,
  (val) => (isActiveRef.value = val === "always"),
  { immediate: true }
);
</script>

<template>
  <div
    class="layui-water-ripples-container"
    ref="waterRipplesContainerRefEl"
    @[trigger]="onActive"
  >
    <div
      ref="ripplesRefEl"
      :class="{
        'layui-out-ripples': isOut,
        'layui-inset-ripples': type == 'inset',
        'layui-animate-always--out':
          isActiveRef && trigger == 'always' && type == 'out',
        'layui-animate-once--out':
          isActiveRef &&
          (trigger == 'mouseenter' || trigger == 'click') &&
          type == 'out',
        'layui-animate-always--inset':
          isActiveRef && trigger == 'always' && type == 'inset',
        'layui-animate-once--inset':
          isActiveRef &&
          (trigger == 'mouseenter' || trigger == 'click') &&
          type == 'inset',
      }"
      :style="{
        borderRadius: isOut ? borderRadius : '50%',
        left: rippleX,
        top: rippleY,
        '--layui-ripple-color': color,
        '--layui-spread-width': spreadWidth,
        '--layui-spread-size': spreadSizeRef,
      }"
    ></div>
    <slot></slot>
  </div>
</template>
