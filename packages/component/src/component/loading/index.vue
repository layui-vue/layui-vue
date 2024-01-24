<template>
  <div class="layui-loading">
    <div class="layui-loading-spinning" v-if="loading">
      <template v-if="$slots.indicator">
        <slot name="indicator"></slot>
      </template>
      <template v-else>
        <img v-if="type === 0" src="./loading-0.svg" />
        <img v-if="type === 1" src="./loading-1.svg" />
        <img v-if="type === 2" src="./loading-2.svg" />
      </template>
      <div class="layui-loading-spinning-text" v-if="tip">{{ tip }}</div>
    </div>
    <div class="layui-loading-container">
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import "./index.less";
import { ref, watch } from "vue";

export interface LoadingProps {
  loading?: boolean;
  delay?: number;
  type?: number;
  tip?: string;
}

defineOptions({
  name: "LayLoading",
});

const props = withDefaults(defineProps<LoadingProps>(), {
  loading: true,
  delay: 0,
  type: 0,
});

const loading = ref(props.loading);

watch(
  () => props.loading,
  () => {
    setTimeout(() => {
      loading.value = props.loading;
    }, props.delay);
  }
);
</script>
