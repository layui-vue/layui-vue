<template>
  <div
    ref="selectRef"
    class="layui-unselect layui-form-select"
    :class="[openState ? 'layui-form-selected' : '']"
  >
    <div class="layui-select-title" @click="open">
      <input
        type="text"
        placeholder="请选择"
        :value="selectItem.label"
        readonly=""
        :name="name"
        class="layui-input layui-unselect"
      /><i class="layui-edge" />
    </div>
    <dl class="layui-anim layui-anim-upbit">
      <slot />
    </dl>
  </div>
</template>

<script setup name="LaySelect" lang="ts">
import { defineProps, provide, reactive, ref, watch } from 'vue'
import useClickOutside from '../../hooks/useClickOutside'

const selectRef = ref<null | HTMLElement>(null)
const isClickOutside = useClickOutside(selectRef)

watch(isClickOutside, () => {
  if (isClickOutside.value) {
    openState.value = false
  }
})

const props = defineProps<{
  modelValue?: string
  name?: string
}>()

const openState = ref(false)

const open = function () {
  openState.value = true
}

const selectItem = reactive({ label: '', value: props.modelValue })

provide('selectItem', selectItem)
provide('openState', openState)

// select update 时, 通知 change 事件
const emit = defineEmits(['update:modelValue', 'change'])

watch(selectItem, function (item) {
  emit('change', item.value)
  emit('update:modelValue', item.value)
})
</script>
