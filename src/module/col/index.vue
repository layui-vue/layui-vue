<script lang="ts">
export default {
  name: "LayCol",
};
</script>

<script setup lang="ts">
import { computed, defineProps } from "vue";

const props = defineProps<{
  md?: string;
  xs?: string;
  sm?: string;
  lg?: string;
  mdOffset?: string;
  xsOffset?: string;
  smOffset?: string;
  lgOffset?: string;
}>();

const classes = computed(() => {
  return [
    props.md ? "layui-col-md" + props.md : "",
    props.xs ? "layui-col-xs" + props.xs : "",
    props.sm ? "layui-col-sm" + props.sm : "",
    props.lg ? "layui-col-lg" + props.lg : "",
    props.mdOffset ? "layui-col-md-offset" + props.mdOffset : "",
    props.xsOffset ? "layui-col-xs-offset" + props.xsOffset : "",
    props.smOffset ? "layui-col-sm-offset" + props.smOffset : "",
    props.lgOffset ? "layui-col-lg-offset" + props.lgOffset : "",
  ];
});
</script>

<template>
  <div class="layui-col" :class="classes">
    <slot />
  </div>
</template>
