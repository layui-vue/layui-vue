<template>
  <div
    class="layui-col"
    :class="[
      md ? 'layui-col-md' + md : '',
      xs ? 'layui-col-xs' + xs : '',
      sm ? 'layui-col-sm' + sm : '',
      lg ? 'layui-col-lg' + lg : '',
      mdOffset ? 'layui-col-md-offset' + mdOffset : '',
      xsOffset ? 'layui-col-xs-offset' + xsOffset : '',
      smOffset ? 'layui-col-sm-offset' + smOffset : '',
      lgOffset ? 'layui-col-lg-offset' + lgOffset : '',
    ]"
  >
    <slot />
  </div>
</template>

<script setup name="LayCol" lang="ts">
import { defineProps } from 'vue'

const props = defineProps<{
  md?: string
  xs?: string
  sm?: string
  lg?: string
  mdOffset?: string
  xsOffset?: string
  smOffset?: string
  lgOffset?: string
}>()
</script>
