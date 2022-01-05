<template>
  <div :class="['lay-skeleton-item',`lay-skeleton-type--${type}`]" v-bind="$attrs">
    <div v-if="type==='image'" >
      <lay-icon type="layui-icon-picture"></lay-icon>
    </div>
  </div>
</template>

<script setup name="LaySkeletonItem" lang="ts">
import { defineProps, withDefaults} from "vue";

export interface LaySkeletonProps {
  type?: string;
}

const props = withDefaults(defineProps<LaySkeletonProps>(), {
  type: 'p',
});
</script>-
