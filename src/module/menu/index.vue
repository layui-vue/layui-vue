<template>
  <ul class="layui-nav" :class="[tree ? 'layui-nav-tree' : '']">
    <slot />
  </ul>
</template>

<script setup name="LayMenu" lang="ts">
import { defineProps, provide, ref, watch } from 'vue'

const props = withDefaults(
  defineProps<{
    selectedKey?: string
    openKeys?: string[]
    tree?: boolean
  }>(),
  {
    selectedKey: '',
    openKeys: function() {
      return []
    },
    tree: false,
  }
)

const isTree = ref(props.tree)
const selectedKey = ref(props.selectedKey)
const openKeys = ref([...props.openKeys])

provide('isTree', isTree)
provide('selectedKey', selectedKey)
provide('openKeys',openKeys)

const emit = defineEmits(['update:selectedKey','update:openKeys'])

watch(selectedKey, function(val) {
  emit('update:selectedKey',val)
})

watch(openKeys, function(val) {
  emit('update:openKeys',val)
},{deep : true})
</script>
