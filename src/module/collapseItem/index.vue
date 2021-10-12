<template>
  <div class="layui-colla-item">
    <h2 class="layui-colla-title" @click="showHandle">
      {{ title
      }}<i class="layui-icon layui-colla-icon">{{ isShow ? '' : '' }}</i>
    </h2>
    <div class="layui-colla-content" :class="isShow ? 'layui-show' : ''">
      <p>
        <slot />
      </p>
    </div>
  </div>
</template>

<script setup name="LayCollapseItem" lang="ts">
import { defineProps, Ref, ref } from 'vue'

const props = defineProps<{
  show?: boolean
  title?: string
}>()

const isShow = ref(props.show) as Ref

const showHandle = function () {
  isShow.value = !isShow.value
}
</script>
