<template>
  <LayCodeWrapper :out-props="props"></LayCodeWrapper>
</template>

<script setup lang="ts">
import { LayCodeProps } from "./ILayCode";
import "./LayCode.less";
import LayCodeWrapper from "./LayCodeWrapper";

defineOptions({
  name: "LayCode",
});

const props = withDefaults(defineProps<LayCodeProps>(), {
  code: "",
  preview: true,
  layout: () => ["code", "preview"],
  style: () => ({}),
  codeStyle: () => ({}),
  previewStyle: () => ({}),
  className: () => [],
  tools: () => [],
  toolsEvent: () => ({}),
  copy: true,
  text: () => ({
    code: "</>",
    preview: "Preview",
  }),
  header: false,
  ln: true,
  theme: "light",
  encode: false,
  lang: "typescript",
  langMarker: true,
  wordWrap: false,
  highlighter: "",
  isCanChooseHighlighter: true,
  isAllowCodeSelect: true,
});
</script>
