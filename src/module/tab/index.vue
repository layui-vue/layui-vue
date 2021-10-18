<template>
  <div class="layui-tab" :class="[type ? 'layui-tab-' + type : '']">
    <ul class="layui-tab-title">
      <li
        v-for="s in slots"
        :key="s"
        :class="[s.props.id === active ? 'layui-this' : '']"
        @click.stop="change(s.props.id)"
      >
        {{ s.props.title }}
        <i
          v-if="allowClose"
          class="layui-icon layui-icon-close layui-unselect layui-tab-close"
          @click.stop="close(s.props.id)"
        ></i>
      </li>
    </ul>
    <div class="layui-tab-content">
      <slot />
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'LayTab',
}
</script>

<script setup lang="ts">
import { computed, defineProps, provide, ref, useSlots } from 'vue'

const slot = useSlots()
const slots = slot.default && slot.default()

const props = defineProps<{
  type?: string
  modelValue: string
  allowClose?: boolean
}>()

const emit = defineEmits(['update:modelValue', 'change', 'close'])

const active = computed({
  get() {
    return props.modelValue
  },
  set(val) {
    emit('update:modelValue', val)
  },
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
