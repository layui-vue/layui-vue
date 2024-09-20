<script lang="ts" setup>
import { PropsContentType } from "../types";
import { RenderFunction, StyleValue, computed } from "vue";
import LayRender from "../../../component/component/_components/render";

export interface FooterProps {
  footer: string | boolean | Function | PropsContentType;
  footerStyle: string | StyleValue;
}

defineOptions({
  name: "Footer",
});

const props = defineProps<FooterProps>();
</script>

<template>
  <div class="layui-layer-footer" :style="footerStyle">
    <LayRender :render="() => (footer as RenderFunction)"></LayRender>
  </div>
</template>
