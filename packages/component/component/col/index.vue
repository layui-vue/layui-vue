<script setup lang="ts">
import type { ColProps as _ColProps } from "./interface";

import { computed } from "vue";

export type ColProps = _ColProps;

defineOptions({
  name: "LayCol",
});

const props = defineProps<ColProps>();

const classes = computed(() => {
  return [
    props.md ? `layui-col-md${props.md}` : "",
    props.xs ? `layui-col-xs${props.xs}` : "",
    props.sm ? `layui-col-sm${props.sm}` : "",
    props.lg ? `layui-col-lg${props.lg}` : "",
    props.mdOffset ? `layui-col-md-offset${props.mdOffset}` : "",
    props.xsOffset ? `layui-col-xs-offset${props.xsOffset}` : "",
    props.smOffset ? `layui-col-sm-offset${props.smOffset}` : "",
    props.lgOffset ? `layui-col-lg-offset${props.lgOffset}` : "",
    props.mdPull ? `layui-col-md-pull${props.mdPull}` : "",
    props.xsPull ? `layui-col-xs-pull${props.xsPull}` : "",
    props.smPull ? `layui-col-sm-pull${props.smPull}` : "",
    props.lgPull ? `layui-col-lg-pull${props.lgPull}` : "",
    props.mdPush ? `layui-col-md-push${props.mdPush}` : "",
    props.xsPush ? `layui-col-xs-push${props.xsPush}` : "",
    props.smPush ? `layui-col-sm-push${props.smPush}` : "",
    props.lgPush ? `layui-col-lg-push${props.lgPush}` : "",
  ];
});
</script>

<template>
  <div class="layui-col" :class="classes">
    <slot></slot>
  </div>
</template>
