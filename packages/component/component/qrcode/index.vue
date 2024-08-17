<template>
  <div class="layui-qrcode">
    <canvas ref="qrcode"></canvas>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, nextTick, watch } from "vue";
import QRCode from "qrcode";
import "./index.less";

export interface QrcodeImageProps {
  image: string;
  left?: number;
  top?: number;
  width?: number;
  height?: number;
  size?: number;
  background?: boolean;
  backgroundColor?: string;
}

export interface QrcodeProps {
  text: string;
  backgroundColor?: string;
  width?: number;
  color?: string;
  options?: Record<string, any>;
  images?: Array<QrcodeImageProps> | Array<string> | string;
}

defineOptions({
  name: "LayQrcode",
});
const props = defineProps<QrcodeProps>();

const qrcode = ref<HTMLElement | undefined>();

onMounted(() => {
  nextTick(() => {
    buildQrcode();
  });
});

watch(
  () => props,
  () => {
    buildQrcode();
  },
  { deep: true }
);

const drawImage = () => {
  if (!props.images?.length) return;
  nextTick(() => {
    const ctx = (qrcode.value as HTMLCanvasElement)?.getContext("2d");
    const images = Array.isArray(props.images) ? props.images : [props.images];
    if (!ctx) return;
    images
      .filter((i) => i !== undefined)
      ?.forEach((i) => {
        let src = typeof i === "string" ? i : i.image;
        let width, height, top, left, size, background, backgroundColor;
        width = typeof i === "string" ? 32 : i.width;
        height = typeof i === "string" ? 32 : i.height;
        top = typeof i === "string" ? undefined : i.top;
        left = typeof i === "string" ? undefined : i.left;
        size = typeof i === "string" ? 32 : i.size;
        background = typeof i === "string" ? true : i.background;
        backgroundColor =
          typeof i === "string" ? props.backgroundColor : i.backgroundColor;

        if (size) {
          width = size;
          height = size;
        }

        if (width === undefined) width = 32;
        if (height === undefined) height = 32;
        if (top === undefined) top = ctx.canvas.height / 2 - height / 2;
        if (left === undefined) left = ctx.canvas.width / 2 - width / 2;
        if (background === undefined) background = true;
        if (backgroundColor === undefined) backgroundColor = "#fff";

        const el = document.createElement("img");
        el.src = src;
        el.onload = () => {
          if (background) {
            ctx.fillStyle = backgroundColor;
            ctx.fillRect(left, top, width, height);
          }
          ctx.drawImage(
            el,
            left, // src left
            top, // src top
            width, // src width
            height // src height
          );
        };
      });
  });
};

const buildQrcode = () => {
  QRCode.toCanvas(qrcode.value, props.text, {
    width: props.width,
    color: {
      dark: props.color,
      light: props.backgroundColor,
    },
    ...props.options,
  }).then(() => {
    drawImage();
  });
};
</script>
