<script lang="ts">
export default {
  name: 'ColorBox',
}
</script>
<script setup lang="ts">
import { Nullable } from '/@src/module/type'
import { computed, onMounted, ref } from 'vue'
import { HSBToHEX, RGBSTo, RGBToHSB } from '/@src/module/colorPicker/colorUtil'
import ColorPicker from './ColorPicker.vue'
import { usePosition } from '/@src/use/usePosition'

interface BoxProps {
  color?: string
  size?: Nullable<string>
  alpha?: boolean
  format?: 'hex' | 'rgb'
  predefine?: boolean
  colors?: string[]
}

const colorBoxProps = withDefaults(defineProps<BoxProps>(), {
  color: '',
  size: () => null,
  alpha: false,
  format: 'hex',
  predefine: false,
  colors: () => [
    //默认预定义颜色列表
    '#009688',
    '#5FB878',
    '#1E9FFF',
    '#FF5722',
    '#FFB800',
    '#01AAED',
    '#999',
    '#c00',
    '#ff8c00',
    '#ffd700',
    '#90ee90',
    '#00ced1',
    '#1e90ff',
    '#c71585',
    'rgb(0, 186, 189)',
    'rgb(255, 120, 0)',
    'rgb(250, 212, 0)',
    '#393D49',
    'rgba(0,0,0,.5)',
    'rgba(255, 69, 0, 0.68)',
    'rgba(144, 240, 144, 0.5)',
    'rgba(31, 147, 255, 0.73)',
  ],
})

const triggerSpanStyle = computed(() => {
  let bgstr = ''
  if (colorBoxProps.color) {
    bgstr = colorBoxProps.color

    if ((colorBoxProps.color.match(/[0-9]{1,3}/g) || []).length > 3) {
      //需要优化
      if (!(colorBoxProps.alpha && colorBoxProps.format == 'rgb')) {
        bgstr = '#' + HSBToHEX(RGBToHSB(RGBSTo(colorBoxProps.color)))
      }
    }
  }

  return {
    background: bgstr,
  }
})

const colorPickerWrapper = computed(() => {
  return colorBoxProps.size ? `layui-colorpicker-${colorBoxProps.size}` : ''
})

const colorBoxRefEl = ref<HTMLElement | null>(null)
const colorPickerRefEl = ref<HTMLElement | null>(null)

onMounted(() => {
  console.log('colorPickerRefEl =>>>', colorPickerRefEl.value.teleportRefEl)
  usePosition(colorBoxRefEl.value, colorPickerRefEl.value.teleportRefEl)
})
</script>
<template>
  <div ref="colorBoxRefEl" class="layui-unselect layui-colorpicker">
    <span
      :class="[
        {
          'layui-colorpicker-trigger-bgcolor': format == 'rgb' && alpha,
        },
        size ? colorPickerWrapper : '',
      ]"
    >
      <span class="layui-colorpicker-trigger-span" :style="triggerSpanStyle">
        <!-- ICON_PICKER_DOWN = 'layui-icon-down', ICON_PICKER_CLOSE = 'layui-icon-close' -->
        <i
          :class="[
            'layui-icon layui-colorpicker-trigger-i',
            color ? 'layui-icon-down' : 'layui-icon-close',
          ]"
        ></i>
      </span>
    </span>
    <ColorPicker
      ref="colorPickerRefEl"
      :visible="true"
      :alpha="alpha"
      :predefine="predefine"
    ></ColorPicker>
  </div>
</template>
<style scoped lang="less"></style>
