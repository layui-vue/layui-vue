<template>
  <div class="layui-qrcode">
    <canvas ref="qrcode"></canvas>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, nextTick, watch } from "vue";
import { isString } from "@vue/shared";
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
    if (!ctx) return;

    const images = Array.isArray(props.images)
      ? props.images
      : [props.images as string];
    images.forEach((i: QrcodeImageProps | string) => {
      let {
        image,
        width = 32,
        height = 32,
        top = ctx.canvas.height / 2 - height / 2,
        left = ctx.canvas.width / 2 - width / 2,
        size,
        background = true,
        backgroundColor = "#fff",
      }: QrcodeImageProps = isString(i)
        ? { image: i }
        : (i as QrcodeImageProps);

      if (size) {
        width = size;
        height = size;
        top = ctx.canvas.height / 2 - height / 2;
        left = ctx.canvas.width / 2 - width / 2;
      }

      const el = document.createElement("img");
      el.src = image;
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
      el.onerror = () => {
        console.error(`LayQrcode images:${image} Parsing failed`);
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
