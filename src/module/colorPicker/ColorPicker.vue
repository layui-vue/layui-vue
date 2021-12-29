<script lang="ts">
export default {
  name: "ColorPicker",
};
</script>
<script setup lang="ts">
import { ref } from "vue";

interface CProps {
  visible: boolean;
  alpha: boolean;
  predefine: boolean;
}

const props = defineProps<CProps>();

const domRefEl = ref<HTMLElement | null>(null);
defineExpose({
  teleportRefEl: domRefEl,
});
</script>
<template>
  <teleport to="body">
    <div
      v-if="visible"
      ref="domRefEl"
      class="layui-anim layui-anim-downbit layui-colorpicker-main"
    >
      <!--    //颜色面板-->
      <div class="layui-colorpicker-main-wrapper">
        <div class="layui-colorpicker-basis">
          <div class="layui-colorpicker-basis-white"></div>
          <div class="layui-colorpicker-basis-black"></div>
          <div class="layui-colorpicker-basis-cursor"></div>
        </div>
        <div class="layui-colorpicker-side">
          <div class="layui-colorpicker-side-slider"></div>
        </div>
      </div>
      <!--    //透明度条块-->
      <div
        :class="[
          {
            'layui-colorpicker-main-alpha': true,
            'layui-show': alpha,
          },
        ]"
      >
        <div class="layui-colorpicker-alpha-bgcolor">
          <div class="layui-colorpicker-alpha-slider"></div>
        </div>
      </div>
      <!--    //预设颜色列表-->
      <div v-if="predefine" class="layui-colorpicker-main-pre">
        <div
          v-for="c in colors"
          :key="c"
          :class="{
            'layui-colorpicker-pre': true,
            'layui-colorpicker-pre-isalpha':
              (c.match(/[0-9]{1,3}/g) || []).length > 3,
          }"
        >
          <div :style="{ background: c }"></div>
        </div>
      </div>
      <!--    //底部表单元素区域-->
      <div class="layui-colorpicker-main-input">
        <div class="layui-inline">
          <input type="text" class="layui-input" />
        </div>
        <div class="layui-btn-container">
          <button
            class="layui-btn layui-btn-primary layui-btn-sm"
            colorpicker-events="clear"
          >
            清空
          </button>
          <button
            class="layui-btn layui-btn-sm"
            colorpicker-events="confirm"
            type="submit"
          >
            确定
          </button>
        </div>
      </div>
    </div>
  </teleport>
</template>
<style scoped lang="less"></style>
