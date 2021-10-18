<template>
  <div class="layui-tab" :class="[type ? 'layui-tab-' + type : '']">
    <ul class="layui-tab-title">
      <li
        v-for="ss in slots"
        :key="ss"
        :class="[ss.props.id === active ? 'layui-this' : '']"
        @click.stop="change(ss.props.id)"
      >
        {{ ss.props.title }}
        <i
          @click.stop="close(ss.props.id)"
          v-if="allowClose"
          class="layui-icon layui-icon-close layui-unselect layui-tab-close"
        ></i>
      </li>
    </ul>
    <div class="layui-tab-content">
      <slot />
    </div>
  </div>
</template>

<script setup name="LayTab" lang="ts">
import { computed, defineProps, provide, ref, useSlots } from 'vue'

const slot = useSlots() as any
const slots = slot.default && slot.default()

const props = defineProps<{
  type?: string
  modelValue: string
  allowClose?: boolean
}>()

// select update 时, 通知 change 事件
const emit = defineEmits(['update:modelValue', 'change', 'close'])

const active = computed({
  get() {
    return props.modelValue
  },
  set(val) {
    emit('update:modelValue', val)
  }
})

const change = function (id: any) {
  emit('update:modelValue', id)
  emit('change', id)
}

const close = function (id: any) {
  emit('close', id)
}

provide('active', active)
</script>
