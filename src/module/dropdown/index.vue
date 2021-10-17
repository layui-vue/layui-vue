<template>
  <div
    v-if="trigger === 'click'"
    class="layui-dropdown"
    ref="dropdownRef"
    :class="[openState ? 'layui-dropdown-up' : '']"
  >
    <div @click="open">
      <slot />
    </div>
    <dl class="layui-anim layui-anim-upbit">
      <ul class="layui-menu layui-dropdown-menu">
        <slot name="content" />
      </ul>
    </dl>
  </div>
  <div
    v-if="trigger === 'hover'"
    class="layui-dropdown"
    :class="[openState ? 'layui-dropdown-up' : '']"
    @mouseenter="open"
    @mouseleave="open"
  >
    <slot />
    <dl class="layui-anim layui-anim-upbit">
      <ul class="layui-menu layui-dropdown-menu">
        <slot name="content" />
      </ul>
    </dl>
  </div>
</template>

<script setup name="LaySelect" lang="ts">
import { defineProps, ref, watch } from 'vue'
import useClickOutside from '../use/useClickOutside'

const dropdownRef = ref<null | HTMLElement>(null)

const props = withDefaults(
  defineProps<{
    trigger?: string
  }>(),
  {
    trigger: 'click',
  }
)

const openState = ref(false)

const open = function () {
  openState.value = !openState.value
}
// 控制点击事件
const isClickOutside = useClickOutside(dropdownRef)

// 通过 watch 去监听事件的变化
watch(isClickOutside, () => {
  if (isClickOutside.value) {
    openState.value = false
  }
})
</script>
