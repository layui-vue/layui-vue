<script lang="ts">
export default {
  name: "LaySkeleton",
};
</script>

<script setup lang="ts">
import LaySkeletonItem from "../skeletonItem/index.vue";
import "./index.less";
import { withDefaults } from "vue";

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
</script>

<template>
  <div
    :class="['lay-skeleton', animated ? 'lay-skeleton-animated' : '']"
    v-bind="$attrs"
  >
    <template v-if="loading">
      <slot name="skeleton">
        <lay-skeleton-item
          v-for="item in rows"
          :key="item"
          :class="[
            item === 1 ? 'lay-skeleton-first' : '',
            item === rows ? 'lay-skeleton-last' : '',
          ]"
          type="p"
        ></lay-skeleton-item>
      </slot>
    </template>
    <slot v-else></slot>
  </div>
</template>
