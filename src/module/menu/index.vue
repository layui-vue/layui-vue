<template>
  <ul class="layui-nav" :class="[tree ? 'layui-nav-tree' : '']">
    <slot />
  </ul>
</template>

<script setup name="LayMenu" lang="ts">
import { computed, defineProps, provide, ref, watch } from 'vue'

const emit = defineEmits(['update:selectedKey', 'update:openKeys'])

const props = withDefaults(
  defineProps<{
    selectedKey?: string
    openKeys?: string[]
    tree?: boolean
  }>(),
  {
    selectedKey: '',
    openKeys: function () {
      return []
    },
    tree: false,
  }
)

const isTree = computed(() => props.tree)

const openKeys = computed({
  get() {
    return props.openKeys
  },
  set(val) {
    emit('update:selectedKey', val)
  },
})

const selectedKey = computed({
  get() {
    return props.selectedKey
  },
  set(val) {
    emit('update:selectedKey', val)
  },
})

watch(selectedKey, function (val) {
  emit('update:selectedKey', val)
})

watch(
  openKeys,
  function (val) {
    emit('update:openKeys', val)
  },
  { deep: true }
)

provide('isTree', isTree)
provide('selectedKey', selectedKey)
provide('openKeys', openKeys)
</script>
