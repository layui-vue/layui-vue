/** * @name:watermark * @author:dingyongya * @date:2023/5/12 16:54 *
@update:2023/5/12 16:54 */
<script lang="ts">
export default {
  name: "LayWatermark",
};
</script>
<script lang="ts" setup>
import "./index.less";
import { ref, withDefaults, onMounted } from "vue";

export interface WatermarkProps {
  content: string;
  font: string;
  color: string;
  rotate: number;
  height: number;
  width: number;
}

const props = withDefaults(defineProps<WatermarkProps>(), {
  content: "",
  font: "20px",
  color: "rgba(184, 184, 184, 0.6)",
  rotate: -45,
  width: 100,
  height: 100,
});

onMounted(() => {
  initWatermark();
});

const watermark = ref<any>("watermark");

// 初始化
const initWatermark = () => {
  const watermarkCanvas = document.createElement("canvas");
  const content = watermark.value;
  watermarkCanvas.setAttribute("width", `${props.width}`);
  watermarkCanvas.setAttribute("height", `${props.height}`);
  const ctx = <CanvasRenderingContext2D>watermarkCanvas.getContext("2d");
  ctx.font = props.font;
  ctx.fillStyle = props.color;
  ctx.translate(
    10,
    props.rotate < 0
      ? props.height / 2 + (props.content.length / 2) * 10
      : props.height / 2 - (props.content.length / 2) * 10
  );
  ctx.rotate((Math.PI / 180) * props.rotate);

  ctx.fillText(props.content, 10, 10);

  const base64Url = watermarkCanvas.toDataURL();
  content.setAttribute(
    "style",
    `background-repeat:repeat;background-image:url('${base64Url}')`
  );
};
</script>

<template>
  <div ref="watermark" class="lay-watermark-box">
    <slot></slot>
  </div>
</template>
