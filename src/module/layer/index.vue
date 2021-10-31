<template>
  <!-- 遮盖 -->
  <div
    class="layui-layer-shade"
    style="z-index: 19891020; background-color: rgb(0, 0, 0); opacity: 0.1"
    @click="shadeHandle"
    v-if="visible && shade"
  ></div>
  <!-- 元素 -->
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
      <div v-if="type === 1" :style="{ height: contentHeight }">
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
        v-if="maxmin"
        class="layui-layer-ico layui-layer-max"
        :class="[max ? 'layui-layer-maxmin' : '']"
        href="javascript:;"
        @click="maxHandle"
      ></a>
      <a
        class="layui-layer-ico layui-layer-close layui-layer-close1"
        href="javascript:;"
        @click="closeHandle"
      ></a
    ></span>
    <div v-if="btn && btn.length > 0" class="layui-layer-btn">
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
import { onMounted, onUpdated, ref, useSlots, watch } from 'vue'
import useMove from '../../hooks/useMove'

const slot = useSlots()

onMounted(() => {
  moveHandle()
})

onUpdated(() => {
  moveHandle()
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
    shade?: boolean
    shadeClose?: boolean
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
    shade: false,
    shadeClose: true,
  }
)

const top = ref(props.offset[0])
const left = ref(props.offset[1])
const width = ref(props.width)
const height = ref(props.height)
const max = ref(false)
const contentHeight = ref(
  props.btn.length > 0
    ? 'calc(' + height.value + ' - 100px)'
    : 'calc(' + height.value + ' - 50px)'
)

const emit = defineEmits(['close', 'update:visible'])

const moveHandle = function () {
  if (props.move) {
    const el = document.getElementById(props.id)
    if (el != null) {
      useMove(el)
    }
  }
}

const shadeHandle = function () {
  if (props.shadeClose) {
    emit('close')
    emit('update:visible', false)
  }
}

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
