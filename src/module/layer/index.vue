<template>
  <div
    v-if="visible"
    :id="id"
    class="layui-layer"
    style="z-index: 19891021; position: fixed"
    :style="{
      top: top,
      left: left,
      width: width,
      height: height,
    }"
  >
    <div class="layui-layer-title" style="cursor: move">
      {{ title }}
    </div>
    <div class="layui-layer-content">
      <div :style="{ height: contentHeight }" v-if="type === 1">
        <slot v-if="slot.default"></slot>
        <template v-else>
          {{ content }}
        </template>
      </div>
      <iframe
        v-if="type === 2"
        scrolling="auto"
        allowtransparency="true"
        frameborder="0"
        :src="content"
        style="width: 100%"
        :style="{ height: contentHeight }"
      ></iframe>
    </div>
    <span class="layui-layer-setwin"
      ><a
        v-if="maxmin"
        class="layui-layer-min"
        href="javascript:;"
        @click="minHandle"
        ><cite></cite></a
      ><a
        class="layui-layer-ico layui-layer-max"
        :class="[max ? 'layui-layer-maxmin' : '']"
        href="javascript:;"
        v-if="maxmin"
        @click="maxHandle"
      ></a>
      <a
        class="layui-layer-ico layui-layer-close layui-layer-close1"
        href="javascript:;"
        @click="closeHandle"
      ></a
    ></span>
    <div class="layui-layer-btn" v-if="btn && btn.length > 0">
      <template v-for="(b, index) in btn" :key="index">
        <a :class="['layui-layer-btn' + index]" @click="b.callback">{{
          b.text
        }}</a>
      </template>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'LayLayer',
}
</script>

<script lang="ts" setup>
import { onMounted, onUpdated, ref, useSlots } from 'vue'
import useMove from '../../hooks/useMove'

const slot = useSlots()

onMounted(() => {
  if (props.move) {
    const el = document.getElementById(props.id)
    if (el != null) {
      useMove(el)
    }
  }
})

onUpdated(() => {
  if (props.move) {
    const el = document.getElementById(props.id)
    if (el != null) {
      useMove(el)
    }
  }
})

const props = withDefaults(
  defineProps<{
    id?: string
    title?: string
    offset?: string[]
    width?: string
    height?: string
    visible?: boolean
    maxmin?: boolean
    btn: Record<string, unknown>[]
    move?: boolean
    type?: number
    content?: string
  }>(),
  {
    id: 'layer',
    title: '标题',
    offset: () => ['50%', '50%'],
    width: '390px',
    height: '330px',
    visible: true,
    maxmin: false,
    move: false,
    type: 1,
    btn: () => [],
  }
)

const top = ref(props.offset[0])
const left = ref(props.offset[1])
const width = ref(props.width)
const height = ref(props.height)
const max = ref(false)
const contentHeight = ref(
  props.btn.length > 0
    ? 'calc(' + props.height + ' - 100px)'
    : 'calc(' + props.height + ' - 50px)'
)

const emit = defineEmits(['close', 'update:visible'])

const closeHandle = function () {
  emit('close')
  emit('update:visible', false)
}

const minHandle = function () {
  emit('close')
  emit('update:visible', false)
}

const maxHandle = function () {
  if (max.value) {
    width.value = props.width
    height.value = props.height
    top.value = props.offset[0]
    left.value = props.offset[1]
  } else {
    width.value = '100%'
    height.value = '100%'
    top.value = '0px'
    left.value = '0px'
  }
  max.value = !max.value
}
</script>
