<template>
  <div class="layui-tab" :class="[type ? 'layui-tab-' + type : '']">
    <ul class="layui-tab-title">
      <li
        v-for="children in childrens"
        :key="children"
        :class="[children.props.id === active ? 'layui-this' : '']"
        @click.stop="change(children.props.id)"
      >
        {{ children.props.title }}
        <i
          v-if="allowClose"
          class="layui-icon layui-icon-close layui-unselect layui-tab-close"
          @click.stop="close(children.props.id)"
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
import tabItem from "../tabItem/index.vue"
import {
  Component,
  computed,
  defineProps,
  provide,
  Ref,
  ref,
  useSlots,
  VNode
} from 'vue'

const slot = useSlots()
const slots = slot.default && slot.default()
const childrens: Ref<VNode[]> = ref([])

const setItemInstanceBySlot = function (nodeList: VNode[]) {
  nodeList?.map((item) => {
    let component = item.type as Component
    if (component.name != tabItem.name) {
      setItemInstanceBySlot(item.children as VNode[])
    } else {
      childrens.value.push(item)
    }
  })
}

setItemInstanceBySlot(slots as any[])

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
