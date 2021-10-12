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
import { defineProps, inject, Ref, ref } from 'vue'

const props = defineProps<{
  id: string
  title: string
}>()

const openKeys = inject("openKeys") as String[]

const isShow = ref(openKeys.includes(props.id))

const showHandle = function () {
  isShow.value = !isShow.value
  if(openKeys.indexOf(props.id) != -1) {
    openKeys.splice(openKeys.indexOf(props.id),1)
  } else {
    openKeys.push(props.id)
  }
}
</script>
