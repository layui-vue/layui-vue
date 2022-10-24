<script lang="ts">
export default {
  name: "LayColorPicker",
};
</script>

<script lang="ts" setup>
import "./index.less";
import LayDropdown from "../dropdown/index.vue";
import EyeDropper from "./EyeDropper.vue";
import { ref, computed, watch, onMounted, StyleValue } from "vue";
import { useEyeDropper } from "@vueuse/core";

export interface ColorPicker {
  modelValue?: any;
  preset?: any;
  disabled?: boolean;
  eyeDropper?: boolean;
  contentClass?: string | Array<string | object> | object;
  contentStyle?: StyleValue;
}

const emit = defineEmits(["update:modelValue"]);

const props = withDefaults(defineProps<ColorPicker>(), {
  modelValue: { r: 255, g: 255, b: 255, a: 1 },
  preset: ["#009688", "#1e9fff", "#ffb800", "#ff5722", "#5fb878"],
  disabled: false,
});

const saturationValue = ref<null | HTMLElement>(null);
const hueSlider = ref<null | HTMLElement>(null);
const alphaSlider = ref<null | HTMLElement>(null);
const { isSupported, open, sRGBHex } = useEyeDropper();

let pointStyle = ref("top: 25%;left: 80%;");
let hueSliderStyle = ref("left: 0;");
let alphaSliderStyle = ref("left: calc(100% - 6px);");

let hue = ref(0);
let saturation = ref(1);
let value = ref(1);

let red = ref(255);
let green = ref(0);
let blue = ref(0);
let alpha = ref(1);

const openEyeDropper = function () {
  if (isSupported) {
    open();
  } else {
    console.warn("LayColorPicker: Eye dropper not supported by your browser!");
  }
};

onMounted(() => {
  let { r, g, b, a } = parseColor(props.modelValue);
  red.value = r;
  green.value = g;
  blue.value = b;
  alpha.value = a;
});

watch(sRGBHex, (sRGBHex) => {
  let { r, g, b, a } = hex2rgba(sRGBHex);
  red.value = r;
  green.value = g;
  blue.value = b;
  alpha.value = a;
});

watch([red, green, blue], (newValue) => {
  emit(
    "update:modelValue",
    rgba2hex(red.value, green.value, blue.value, alpha.value)
  );
  let { h, s, v } = rgb2hsv(red.value, green.value, blue.value);
  hue.value = h;
  saturation.value = s;
  value.value = v;
  pointStyle.value = `top: ${100 - v * 100}%;left: ${s * 100}%;`;
  hueSliderStyle.value = `left: ${(hue.value / 360) * 100}%;`;
});

watch(alpha, () => {
  emit(
    "update:modelValue",
    rgba2hex(red.value, green.value, blue.value, alpha.value)
  );
  alphaSliderStyle.value = `left: ${
    alpha.value >= 1 ? "calc(100% - 6px)" : alpha.value * 100 + "%"
  };`;
});

let colorObj = computed(() => {
  let r = red.value;
  let g = green.value;
  let b = blue.value;
  let a = alpha.value;
  let h = hue.value;
  let s = saturation.value;
  let v = value.value;
  return {
    rgb: `rgba(${r},${g},${b})`,
    rgba: `rgba(${r},${g},${b},${a})`,
    hex6: rgba2hex(r, g, b),
    hex8: rgba2hex(r, g, b, a),
    hsv: `hsv(${h},${s},${v})`,
    hsl: ``,
  };
});

function hexChange(e: any) {
  let v = e.target.value;
  if (/^#?([0-9a-fA-F]{6}|[0-9a-fA-F]{8})$/.test(v)) {
    let { r, g, b, a } = hex2rgba(v);
    red.value = r;
    green.value = g;
    blue.value = b;
    alpha.value = a;
  }
}

function redChange(e: any) {
  let v = e.target.value;
  if (v !== "") {
    v > 255 && (red.value = 255);
    v < 0 && (red.value = 0);
    v >= 0 && v <= 255 && (red.value = parseInt(v));
  }
}

function greenChange(e: any) {
  let v = e.target.value;
  if (v !== "") {
    v > 255 && (green.value = 255);
    v < 0 && (green.value = 0);
    v >= 0 && v <= 255 && (green.value = parseInt(v));
  }
}

function blueChange(e: any) {
  let v = e.target.value;
  if (v !== "") {
    v > 255 && (blue.value = 255);
    v < 0 && (blue.value = 0);
    v >= 0 && v <= 255 && (blue.value = parseInt(v));
  }
}

function alphaChange(e: any) {
  let v = e.target.value;
  if (v !== "") {
    v = parseFloat(v);
    alpha.value = v;
    v > 1 && (alpha.value = 1);
    v < 0 && (alpha.value = 0);
    v >= 0 && v <= 1 && (alpha.value = v);
  }
}

function presetChange(item: any) {
  if (/^#?([0-9a-fA-F]{6}|[0-9a-fA-F]{8})$/.test(item)) {
    let { r, g, b, a } = hex2rgba(item);
    red.value = r;
    green.value = g;
    blue.value = b;
    alpha.value = a;
  }
}

function handleChangeSV(e: any) {
  // @ts-ignore
  let w = saturationValue.value.clientWidth;
  // @ts-ignore
  let h = saturationValue.value.clientHeight;
  // @ts-ignore
  let x = e.pageX - saturationValue.value.getBoundingClientRect().left;
  // @ts-ignore
  let y = e.pageY - saturationValue.value.getBoundingClientRect().top;
  x = x < w && x > 0 ? x : x > w ? w : 0;
  y = y < h && y > 0 ? y : y > h ? h : 0;
  // 计算饱和度和亮度
  saturation.value = Math.floor((x / w) * 100 + 0.5) / 100;
  value.value = Math.floor((1 - y / h) * 100 + 0.5) / 100;
  // hsv转化为rgb
  let { r, g, b } = hsv2rgb(hue.value, saturation.value, value.value);
  red.value = r;
  green.value = g;
  blue.value = b;
  // 移动背景板圆圈
  pointStyle.value = `top: ${y}px;left: ${x}px;`;
}

function mousedownSV(e: any) {
  // 鼠标按下计算饱和度和亮度并添加事件
  handleChangeSV(e);
  // 添加整个页面的鼠标事件
  window.addEventListener("mousemove", handleChangeSV);
  window.addEventListener("mouseup", mouseupSV);
}

function mouseupSV(e: any) {
  // 鼠标松开后移除事件
  window.removeEventListener("mousemove", handleChangeSV);
  window.removeEventListener("mouseup", mouseupSV);
}

// 色调
function handleChangeHue(e: any) {
  // @ts-ignore
  let w = hueSlider.value.clientWidth;
  // @ts-ignore
  let x = e.pageX - saturationValue.value.getBoundingClientRect().left;
  x = x < w && x > 0 ? x : x > w ? w : 0;
  // 计算色调
  hue.value = Math.floor((x / w) * 360 + 0.5);
  // hsv转化为rgb
  let { r, g, b } = hsv2rgb(hue.value, saturation.value, value.value);
  red.value = r;
  green.value = g;
  blue.value = b;
  // 移动滑块
  hueSliderStyle.value = `left: ${x >= w - 6 ? w - 6 : x}px;`;
}

function mousedownHue(e: any) {
  handleChangeHue(e);
  window.addEventListener("mousemove", handleChangeHue);
  window.addEventListener("mouseup", mouseupHue);
}

function mouseupHue(e: any) {
  window.removeEventListener("mousemove", handleChangeHue);
  window.removeEventListener("mouseup", mouseupHue);
}

// 透明度
function handleChangeAlpha(e: any) {
  // @ts-ignore
  let w = alphaSlider.value.clientWidth;
  // @ts-ignore
  let x = e.pageX - saturationValue.value.getBoundingClientRect().left;
  x = x < w && x > 0 ? x : x > w ? w : 0;
  // 计算透明度
  alpha.value = Math.floor((x / w) * 100 + 0.5) / 100;
  // 移动滑块
  alphaSliderStyle.value = `left: ${x >= w - 6 ? w - 6 : x}px;`;
}

function mousedownAlpha(e: any) {
  handleChangeAlpha(e);
  window.addEventListener("mousemove", handleChangeAlpha);
  window.addEventListener("mouseup", mouseupAlpha);
}

function mouseupAlpha(e: any) {
  window.removeEventListener("mousemove", handleChangeAlpha);
  window.removeEventListener("mouseup", mouseupAlpha);
}

function parseColor(color: any) {
  if (color) {
    let r, g, b, a;
    if (typeof color === "string") {
      if (
        /^#?([0-9a-fA-F]{6}|[0-9a-fA-F]{8}|[0-9a-fA-F]{3}|[0-9a-fA-F]{4})$/.test(
          color
        )
      ) {
        return hex2rgba(color);
      }
    } else {
      r = color.r > 255 ? 255 : color.r < 0 ? 0 : color.r;
      g = color.g > 255 ? 255 : color.g < 0 ? 0 : color.g;
      b = color.b > 255 ? 255 : color.b < 0 ? 0 : color.b;
      a = color.a > 1 ? 1 : color.a < 0 ? 0 : color.a;
      return { r, g, b, a };
    }
  } else {
    return null;
  }
}

function hsv2rgb(h: any, s: any, v: any) {
  h === 360 && (h = 0);
  let i = Math.floor(h / 60) % 6;
  let f = h / 60 - i;
  let p = v * (1 - s);
  let q = v * (1 - s * f);
  let t = v * (1 - s * (1 - f));
  let r, g, b;
  if (i === 0) {
    r = v;
    g = t;
    b = p;
  } else if (i === 1) {
    r = q;
    g = v;
    b = p;
  } else if (i === 2) {
    r = p;
    g = v;
    b = t;
  } else if (i === 3) {
    r = p;
    g = q;
    b = v;
  } else if (i === 4) {
    r = t;
    g = p;
    b = v;
  } else if (i === 5) {
    r = v;
    g = p;
    b = q;
  }
  r = Math.floor(r * 255 + 0.5);
  g = Math.floor(g * 255 + 0.5);
  b = Math.floor(b * 255 + 0.5);
  return { r, g, b };
}

function rgb2hsv(r: any, g: any, b: any) {
  let r1 = r / 255;
  let g1 = g / 255;
  let b1 = b / 255;
  let cmax = Math.max(r1, g1, b1);
  let cmin = Math.min(r1, g1, b1);
  let d = cmax - cmin;
  let h, s, v;
  if (d === 0) {
    h = 0;
  } else if (cmax === r1) {
    h = ((60 * (g1 - b1)) / d + 360) % 360;
  } else if (cmax === g1) {
    h = 60 * ((b1 - r1) / d + 2);
  } else if (cmax === b1) {
    h = 60 * ((r1 - g1) / d + 4);
  }
  if (cmax === 0) {
    s = 0;
  } else {
    s = d / cmax;
  }
  v = cmax;
  // @ts-ignore
  h = Math.floor(h + 0.5);
  s = Math.floor(s * 100 + 0.5) / 100;
  v = Math.floor(v * 100 + 0.5) / 100;
  return { h, s, v };
}

function rgba2hex(r: any, g: any, b: any, a = 1) {
  r = parseInt(r);
  let r1 = r.toString(16).length !== 2 ? "0" + r.toString(16) : r.toString(16);
  g = parseInt(g);
  let g1 = g.toString(16).length !== 2 ? "0" + g.toString(16) : g.toString(16);
  b = parseInt(b);
  let b1 = b.toString(16).length !== 2 ? "0" + b.toString(16) : b.toString(16);
  // @ts-ignore
  a = parseFloat(a);
  let a1 = "";
  if (a !== 1) {
    let temp = Math.floor(256 * a);
    a1 =
      temp.toString(16).length !== 2
        ? "0" + temp.toString(16)
        : temp.toString(16);
  }
  return `#${r1}${g1}${b1}${a1}`.toUpperCase();
}

// @ts-ignore
function hex2rgba(s: any) {
  if (/^#?[0-9a-fA-F]{3}$/.test(s)) {
    let b = s.substring(s.length - 1, s.length);
    let g = s.substring(s.length - 2, s.length - 1);
    let r = s.substring(s.length - 3, s.length - 2);
    return hex2rgba(`${r + r}${g + g}${b + b}`);
  }
  if (/^#?[0-9a-fA-F]{4}$/.test(s)) {
    let a = s.substring(s.length - 1, s.length);
    let b = s.substring(s.length - 2, s.length - 1);
    let g = s.substring(s.length - 3, s.length - 2);
    let r = s.substring(s.length - 4, s.length - 3);
    return hex2rgba(`${r + r}${g + g}${b + b}${a + a}`);
  }
  if (/^#?[0-9a-fA-F]{6}$/.test(s)) {
    let b = parseInt("0x" + s.substring(s.length - 2, s.length));
    let g = parseInt("0x" + s.substring(s.length - 4, s.length - 2));
    let r = parseInt("0x" + s.substring(s.length - 6, s.length - 4));
    return { r, g, b, a: 1 };
  }
  if (/^#?[0-9a-fA-F]{8}$/.test(s)) {
    let a = parseInt("0x" + s.substring(s.length - 2, s.length));
    a = a / 255;
    let b = parseInt("0x" + s.substring(s.length - 4, s.length - 2));
    let g = parseInt("0x" + s.substring(s.length - 6, s.length - 4));
    let r = parseInt("0x" + s.substring(s.length - 8, s.length - 6));
    return { r, g, b, a };
  }
}
</script>

<template>
  <lay-dropdown
    :disabled="disabled"
    :contentClass="contentClass"
    :contentStyle="contentStyle"
    updateAtScroll
  >
    <div
      class="layui-unselect layui-colorpicker"
      :class="[{ 'layui-colorpicker-disabled': disabled }]"
    >
      <span>
        <span
          class="layui-colorpicker-trigger-span"
          lay-type=""
          :style="`background-color: ${colorObj.rgba}`"
        >
          <i class="layui-icon layui-colorpicker-trigger-i layui-icon-down"></i>
        </span>
      </span>
    </div>
    <template #content>
      <div class="layui-color-picker">
        <div
          class="saturation-value"
          ref="saturationValue"
          @mousedown="mousedownSV"
        >
          <div :style="`background-color: hsl(${hue}, 100%, 50%);`">
            <div class="point" :style="pointStyle"></div>
          </div>
          <div class="saturation-value-2"></div>
          <div class="saturation-value-3"></div>
        </div>
        <div class="layui-color-picker-middle">
          <div style="flex: auto">
            <div class="hue-slider" ref="hueSlider" @mousedown="mousedownHue">
              <div class="slider" :style="hueSliderStyle"></div>
            </div>
            <div
              class="alpha-slider"
              ref="alphaSlider"
              @mousedown="mousedownAlpha"
            >
              <div class="slider" :style="alphaSliderStyle"></div>
              <div
                :style="`background: linear-gradient(to right, rgba(0,0,0,0), ${colorObj.rgb});width: 100%;height: 100%`"
              ></div>
            </div>
          </div>
          <div
            v-if="eyeDropper"
            @click="openEyeDropper"
            style="margin-left: 5px"
          >
            <EyeDropper />
          </div>
          <div class="color-diamond">
            <div
              :style="`background-color: ${colorObj.rgba};width: 100%;height: 100%;box-shadow: inset 0 0 0 1px rgba(0, 0, 0, .15), inset 0 0 4px rgba(0, 0, 0, .25);`"
            ></div>
          </div>
        </div>
        <div class="color-value">
          <div class="hex">
            <label>
              <input
                :value="colorObj.hex8"
                @input="hexChange"
                spellcheck="false"
              />
            </label>
          </div>
          <div class="rgba-r">
            <label>
              <input :value="red" @input="redChange" />
            </label>
          </div>
          <div class="rgba-g">
            <label>
              <input :value="green" @input="greenChange" />
            </label>
          </div>
          <div class="rgba-b">
            <label>
              <input :value="blue" @input="blueChange" />
            </label>
          </div>
          <div class="rgba-a">
            <label>
              <input :value="alpha" @input="alphaChange" />
            </label>
          </div>
        </div>
        <ul class="preset">
          <li
            v-for="item in preset"
            :key="item"
            :style="`background-color: ${item}`"
            @click="presetChange(item)"
          ></li>
        </ul>
      </div>
    </template>
  </lay-dropdown>
</template>
