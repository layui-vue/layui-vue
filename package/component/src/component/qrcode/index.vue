<template>
    <div class="lay-qrcode">
        <canvas ref="qrcode"></canvas>
    </div>
</template>

<script lang="ts">
export default {
  name: "LayQrcode",
};
</script>

<script lang="ts" setup>
import { ref, onMounted, defineProps } from "vue";
import QRCode from "qrcode";

export interface QrcodeProps {
  text: string;
  width: number;
  color: string;
  backgroundColor: string;
}

const props = defineProps<QrcodeProps>();

const qrcode = ref(null);

onMounted(() => {
  QRCode.toCanvas(qrcode.value, props.text, { width: props.width, color: {
    dark: props.color,  
    light: props.backgroundColor 
  }});
});
</script>
