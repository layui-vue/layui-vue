/** * @name:watermark * @author:dingyongya * @date:2023/5/12 16:54 *
@update:2023/5/12 16:54 */
<script lang="ts">
export default {
  name: "LayWatermark",
};
</script>
<script lang="ts" setup name="dWatermark">
import { onMounted, nextTick } from "vue";

export interface Props {
  content: string;
  font?: string;
  color?: string;
  rotate?: number;
  height?: number;
  width?: number;
  elementBox?: string;
}

const props = withDefaults(defineProps<Props>(), {
  content: "",
  font: "20px serif",
  color: "rgba(184, 184, 184, 0.8)",
  rotate: -45,
  height: 200,
  width: 200,
  elementBox: "body",
});

onMounted(() => {
  nextTick(() => {
    initWatermark();
  });
});

// 初始化
const initWatermark = () => {
  const watermarkCanvas = document.createElement("canvas");
  const parentElement = document.querySelector(props.elementBox) as Element;
  const content = document.createElement("div");

  watermarkCanvas.setAttribute("width", `${props.width}`);
  watermarkCanvas.setAttribute("height", `${props.height}`);
  const ctx = <CanvasRenderingContext2D>watermarkCanvas.getContext("2d");
  ctx.font = `${props.font}`;
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
  content.classList.add("lay-watermark-box");
  content.setAttribute("style", backgroundImg);
  const observer = new MutationObserver(() => {
    const wortmarkBox = parentElement.querySelector(".lay-watermark-box");
    if (
      (wortmarkBox && wortmarkBox.getAttribute("style") !== backgroundImg) ||
      !wortmarkBox
    ) {
      if (wortmarkBox) {
        wortmarkBox.setAttribute("style", backgroundImg);
      } else {
        parentElement.appendChild(content);
      }
    }
  });
  observer.observe(document.body, {
    attributes: true,
    subtree: true,
    childList: true,
  });
};
</script>

<template></template>
