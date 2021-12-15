<template>
  <div class="layui-slider layui-slider-vertical" style="height: 200px" v-if="vertical">
    <div class="layui-slider-tips"></div>
    <div class="layui-slider-bar" style="background: #009688; height: 0%; bottom: 0"></div>
    <div class="layui-slider-wrap" style="bottom: 0%">
      <div class="layui-slider-wrap-btn" style="border: 2px solid #009688"></div>
    </div>
  </div>

  <div class="layui-slider-v" v-else>
    <div ref="tracker" @mousedown.stop="handle_mousedown" class="layui-slider-track-v">
      <lay-tooltip :content="modelValue + ''">
        <div :style="{ left: modelValue + '%' }" class="layui-slider-btn-v"></div>
      </lay-tooltip>

      <div :style="{ width: modelValue + '%' }" class="layui-slider-rate-v"></div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { defineProps, reactive, ref } from 'vue'
import { on, off } from 'evtd'
import './index.less'

const emit = defineEmits(["update:modelValue"]);

interface LaySliderProps {
  vertical?: boolean,
  modelValue?: number,
  min?: number,
  max?: number,
}

const props = withDefaults(defineProps<LaySliderProps>(), {
  vertical: false,
  modelValue: 0,
})

const tracker = ref<HTMLElement | null>(null)
const style = reactive({
  left: props.modelValue,
  width: props.modelValue
})

function handle_mousedown() {
  on('selectstart', window, handle_select, { once: true })
  on('mouseup', window, handle_mouseup)
  on('mousemove', window, handle_mousemove)

}

function handle_mousemove(e: MouseEvent) {
  if (!tracker.value) {
    return
  }
  let tracker_rect = tracker.value.getBoundingClientRect()
  let origin_left = tracker_rect.left
  let point_left = e.clientX
  let distance = point_left - origin_left
  if (distance < 0) {
    style.left = 0
    style.width = 0
    props.modelValue = 0
  } else {
    let rate = (distance / tracker_rect.width) * 100
    style.left = Math.floor(rate)
    style.width = Math.floor(rate)
    props.modelValue = Math.floor(rate)
    if (style.left > 100) {
      style.left = 100
      style.width = 100
      props.modelValue = 100
    }
  }
  emit('update:modelValue', style.left)
}

function handle_mouseup() {
  // off('selectstart', document, handle_select)
  off('mouseup', window, handle_mouseup)
  off('mousemove', window, handle_mousemove)

}

function handle_select(e: Event): void {
  e.preventDefault()
}

</script>