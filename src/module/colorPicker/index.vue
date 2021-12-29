<script lang="ts">
export default {
  name: "LayColorPicker",
};
</script>

<script lang="ts" setup>
import { Nullable } from "/@src/module/type";
import ColorBox from "./ColorBox.vue";

interface ColorPickerProps {
  color?: string;
  size?: Nullable<string>;
  alpha?: boolean;
  format?: "hex" | "rgb";
  predefine?: boolean;
  colors?: string[];
}

const colorPickerProps = withDefaults(defineProps<ColorPickerProps>(), {
  color: "",
  size: () => null,
  alpha: false,
  format: "hex",
  predefine: false,
  colors: () => [
    //默认预定义颜色列表
    "#009688",
    "#5FB878",
    "#1E9FFF",
    "#FF5722",
    "#FFB800",
    "#01AAED",
    "#999",
    "#c00",
    "#ff8c00",
    "#ffd700",
    "#90ee90",
    "#00ced1",
    "#1e90ff",
    "#c71585",
    "rgb(0, 186, 189)",
    "rgb(255, 120, 0)",
    "rgb(250, 212, 0)",
    "#393D49",
    "rgba(0,0,0,.5)",
    "rgba(255, 69, 0, 0.68)",
    "rgba(144, 240, 144, 0.5)",
    "rgba(31, 147, 255, 0.73)",
  ],
});
</script>

<template>
  <div class="layui-inline'">
    <ColorBox />
  </div>
</template>
