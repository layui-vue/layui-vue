<script lang="ts" setup>
import { PropsContentType } from "../types";
import { StyleValue } from "vue";
import LayRender from "@layui/component/component/_components/render";

import { renderContent } from "../utils";

export interface FooterProps {
  footer: PropsContentType | boolean;
  footerStyle: string | StyleValue;
}

defineOptions({
  name: "Footer",
});

const props = defineProps<FooterProps>();
</script>

<template>
  <div class="layui-layer-footer" :style="footerStyle">
    <slot>
      <LayRender
        :render="() => renderContent(footer as PropsContentType)"
      ></LayRender>
    </slot>
  </div>
</template>
