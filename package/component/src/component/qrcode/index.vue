<template>
  <div class="layui-qrcode">
    <canvas ref="qrcode"></canvas>
  </div>
</template>

<script lang="ts">
export default {
  name: "LayQrcode",
};
</script>

<script lang="ts" setup>
import { ref, onMounted, defineProps, nextTick, watch } from "vue";
import QRCode from "qrcode";
import "./index.less";

export interface QrcodeProps {
  text: string;
  backgroundColor?: string;
  width?: number;
  color?: string;
}

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

const buildQrcode = () => {
  QRCode.toCanvas(qrcode.value, props.text, {
    width: props.width,
    color: {
      dark: props.color,
      light: props.backgroundColor,
    },
  });
};
</script>
