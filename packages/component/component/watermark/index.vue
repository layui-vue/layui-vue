<script lang="ts" setup>
import "./index.less";
import { onMounted, onBeforeUnmount, watch, shallowRef } from "vue";
import { useMutationObserver } from "@vueuse/core";
import { reRendering } from "./utils";

export interface Props {
  content: string;
  fontSize?: string;
  fontFamily?: string;
  color?: string;
  rotate?: number;
  height?: number;
  width?: number;
  elementBox?: string;
}

defineOptions({
  name: "LayWatermark",
});

const props = withDefaults(defineProps<Props>(), {
  content: "",
  fontSize: "20px",
  fontFamily: "serif",
  color: "rgba(184, 184, 184, 0.8)",
  rotate: -45,
  height: 200,
  width: 200,
  elementBox: "body",
});

const parentElement = shallowRef<HTMLElement>();
const watermarkElement = shallowRef<HTMLDivElement>();

onMounted(() => {
  parentElement.value = document.querySelector(props.elementBox) as HTMLElement;

  useMutationObserver(parentElement, onMutation, {
    attributes: true,
    subtree: true,
    childList: true,
  });

  renderWatermark();
});

watch(
  () => props,
  () => {
    renderWatermark();
  },
  {
    deep: true,
    flush: "post",
  }
);

const destroyWatermark = () => {
  if (watermarkElement.value) {
    watermarkElement.value.remove();
    watermarkElement.value = undefined;
  }
};

// 渲染Watermark
const renderWatermark = () => {
  const watermarkCanvas = document.createElement("canvas");
  if (!watermarkElement.value) {
    watermarkElement.value = document.createElement("div");
  }

  watermarkCanvas.setAttribute("width", `${props.width}`);
  watermarkCanvas.setAttribute("height", `${props.height}`);
  const ctx = <CanvasRenderingContext2D>watermarkCanvas.getContext("2d");
  ctx.font = `${props.fontSize} ${props.fontFamily}`;
  ctx.fillStyle = props.color;
  ctx.textAlign = "center";
  ctx.translate(props.width / 2, props.height / 2);
  ctx.rotate((Math.PI / 180) * props.rotate);
  ctx.fillText(props.content, 0, 0);
  const base64Url = watermarkCanvas.toDataURL();

  let backgroundImg = `position: absolute;
                        top: 0;
                        left: 0;
                        pointer-events: none;
                        z-index: 999;
                        width: 100%;
                        height: 100%;
                        mix-blend-mode: multiply;
                        background-repeat:repeat;
                        background-image:url('${base64Url}');
                        `;
  watermarkElement.value.classList.add("lay-watermark-box");
  watermarkElement.value.setAttribute("style", backgroundImg);

  if (parentElement.value) {
    parentElement.value.appendChild(watermarkElement.value);
  }
};

onBeforeUnmount(() => {
  destroyWatermark();
});

const onMutation = (mutations: MutationRecord[]) => {
  mutations.forEach((mutation) => {
    if (reRendering(mutation, watermarkElement.value)) {
      destroyWatermark();
      renderWatermark();
    }
  });
};
</script>

<template>
  <slot></slot>
</template>
