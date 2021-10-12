<template>
  <li
    v-if="slots.default"
    class="layui-nav-item"
    :class="[isOpen && isTree ? 'layui-nav-itemed' : '']"
  >
    <a href="javascript:void(0)" @click="openHandle">
      {{ title }}
      <i class="layui-icon layui-icon-down layui-nav-more" />
    </a>
    <dl
      class="layui-nav-child"
      :class="[
        isOpen && !isTree ? 'layui-show' : '',
        !isTree ? 'layui-anim layui-anim-upbit' : '',
      ]"
    >
      <slot />
    </dl>
  </li>

  <li
    v-else
    class="layui-nav-item"
    :class="[selectKey === id ? 'layui-this' : '']"
    @click="selectHandle()"
  >
    <a href="javascript:void(0)">{{ title }} </a>
  </li>
</template>

<script setup name="LayMenuItem" lang="ts">
import { defineProps, inject, Ref, ref, useSlots } from 'vue'
const slots = useSlots()

const props = defineProps<{
  id: string
  title: string
}>()

const isOpen = ref(false)

const isTree = inject('isTree')
const selectKey: Ref<string> = inject('selectKey') as Ref<string>

const openHandle = function () {
  isOpen.value = !isOpen.value
}

const selectHandle = function () {
  selectKey.value = props.id
}
</script>
