<template>
  <div :class="['lay-skeleton', animated ? 'lay-skeleton-animated': '',]" v-bind="$attrs">
    <template v-if="loading">
      <slot name="skeleton">
        <lay-skeleton-item
            v-for="item in rows"
            :class="[
              item===1? 'lay-skeleton-first': '',
              item === rows? 'lay-skeleton-last': '']"
            type="p"
        ></lay-skeleton-item>
      </slot>
    </template>
    <slot v-else></slot>
  </div>
</template>

<script setup name="LaySkeleton" lang="ts">
import LaySkeletonItem from '../skeletonItem/index.vue'
import './index.less'
import { defineProps, withDefaults} from "vue";

export interface LaySkeletonProps {
  rows?: number;
  loading?: boolean;
  animated?: boolean;
}

const props = withDefaults(defineProps<LaySkeletonProps>(), {
  rows: 4,
  loading: false,
  animated: false,
});
</script>-
