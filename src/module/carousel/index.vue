<template>
  <div
    class="layui-carousel"
    lay-anim
    lay-indicator="inside"
    lay-arrow="always"
    :style="{ width: width, height: height }"
  >
    <div carousel-item>
      <slot></slot>
    </div>
    <div class="layui-carousel-ind">
      <ul>
        <li
          v-for="ss in slots"
          :key="ss"
          :class="[ss.props.id === modelValue ? 'layui-this' : '']"
          @click.stop="change(ss.props.id)"
        ></li>
      </ul>
    </div>
    <button class="layui-icon layui-carousel-arrow" lay-type="sub" @click="prev"></button
    ><button class="layui-icon layui-carousel-arrow" lay-type="add" @click="next"></button>
  </div>
</template>
<script setup name="LayCarousel" lang="ts">
import { withDefaults, defineProps, provide, useSlots, ref } from 'vue'

const slot = useSlots() as any
const slots = slot.default && slot.default()

const props = withDefaults(
  defineProps<{
    width?: string
    height?: string
    modelValue: string
  }>(),
  {
    width: '100%',
    height: '280px',
  }
)

const active = ref(props.modelValue)

const emit = defineEmits(['update:modelValue','change','close'])

const change = function (id: any) {
  emit('update:modelValue', id)
  emit('change', id)
  active.value = id
}

provide('active', active)

const prev = function() {
    console.log("上一页")
}

const next = function() {
    console.log("下一页")
}
</script>