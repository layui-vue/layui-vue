<template>
  <div class="layui-barcode">
    <canvas ref="barcodeRef"></canvas>
  </div>
</template>

<script lang="ts">
export default {
  name: "LayBarcode",
};
</script>

<script lang="ts" setup>
import { ref, onMounted, defineProps, watch, nextTick } from "vue";
import JsBarcode from "jsbarcode";
import "./index.less";

const props = defineProps({
  value: [String, Number],
  format: {
    type: [String],
    default: "CODE39",
  },
  width: {
    type: [String, Number],
    default: 2,
  },
  height: {
    type: [String, Number],
    default: 80,
  },
  text: [String, Number],
  fontOptions: {
    type: [String],
    default: "bold italic",
  },
  font: [String, Number],
  textAlign: [String],
  textPosition: [String],
  textMargin: [String, Number],
  fontSize: {
    type: [String, Number],
    default: 15,
  },
  lineColor: [String],
  background: {
    type: [String],
    default: "#fff",
  },
  margin: [String, Number],
  displayValue: {
    type: [String, Boolean],
    default: false,
  },
});

const removeUndefinedProps = (obj: any) => {
  for (let prop in obj) {
    if (obj.hasOwnProperty(prop) && obj[prop] === undefined) {
      delete obj[prop];
    }
  }
};

const barcodeRef = ref(null);

onMounted(() => {
  nextTick(() => {
    buildBarcode();
  });
});

watch(
  () => props,
  () => {
    buildBarcode();
  },
  { deep: true }
);

const buildBarcode = () => {
  const settings: any = {
    format: props.format,
    width: props.width,
    height: props.height,
    displayValue: props.displayValue,
    text: props.text,
    fontOptions: props.fontOptions,
    font: props.font,
    textAlign: props.textAlign,
    textPosition: props.textPosition,
    textMargin: props.textMargin,
    fontSize: props.fontSize,
    background: props.background,
    lineColor: props.lineColor,
    margin: props.margin,
  };
  removeUndefinedProps(settings);
  JsBarcode(barcodeRef.value, String(props.value), settings);
};
</script>
