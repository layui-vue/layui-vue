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
import useClickOutside from '../../hooks/useClickOutside'

const dropdownRef = ref<null | HTMLElement>(null)
const isClickOutside = useClickOutside(dropdownRef)

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

watch(isClickOutside, () => {
  if (isClickOutside.value) {
    openState.value = false
  }
})
</script>
