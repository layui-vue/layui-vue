<template>
  <div
    v-if="trigger === 'click'"
    class="layui-dropdown"
    :class="[openState ? 'layui-dropdown-up' : '']"
  >
    <div @click="open">
      <slot></slot>
    </div>
    <dl class="layui-anim layui-anim-upbit">
      <ul class="layui-menu layui-dropdown-menu">
        <slot name="content"></slot>
      </ul>
    </dl>
  </div>
  <div
    v-if="trigger === 'hover'"
    class="layui-dropdown"
    @mouseenter="open"
    @mouseleave="open"
    :class="[openState ? 'layui-dropdown-up' : '']"
  >
    <slot></slot>
    <dl class="layui-anim layui-anim-upbit">
      <ul class="layui-menu layui-dropdown-menu">
        <slot name="content"></slot>
      </ul>
    </dl>
  </div>
</template>

<script setup name="LaySelect" lang="ts">
import { defineProps, ref } from 'vue'

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
</script>
