<script lang="ts">
</script>

<script setup lang="ts">
import "./index.less"
import { defineProps, useSlots } from "vue";

export interface LayResultProps {
  title?: string,
  status?: 'success' | 'failure',
  describe?: string
}

const slots = useSlots();

const props = withDefaults(defineProps<LayResultProps>(), {
  title: "Exception",
  describe: "describe"
});
</script>

<template>
  <div class="result">
    <div class="error">
      <svg
        viewBox="64 64 896 896"
        data-icon="close-circle"
        width="80px"
        height="80px"
        fill="currentColor"
        aria-hidden="true"
        focusable="false"
        class=""
      >
        <path
          d="M685.4 354.8c0-4.4-3.6-8-8-8l-66 .3L512 465.6l-99.3-118.4-66.1-.3c-4.4 0-8 3.5-8 8 0 1.9.7 3.7 1.9 5.2l130.1 155L340.5 670a8.32 8.32 0 0 0-1.9 5.2c0 4.4 3.6 8 8 8l66.1-.3L512 564.4l99.3 118.4 66 .3c4.4 0 8-3.5 8-8 0-1.9-.7-3.7-1.9-5.2L553.5 515l130.1-155c1.2-1.4 1.8-3.3 1.8-5.2z"
        ></path>
        <path
          d="M512 65C264.6 65 64 265.6 64 513s200.6 448 448 448 448-200.6 448-448S759.4 65 512 65zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z"
        ></path>
      </svg>
    </div>
    <h2 class="title">提交失败</h2>
    <p class="desc">
      请核对并修改以下信息后，再重新提交。如果仅是简单操作，使用 Message
      全局提示反馈即可。 本文字区域可以展示简单的补充说明，如果有类似展示
      “单据”的需求，下面这个灰色区域可以呈现比较复杂的内容。
    </p>
    <div class="content"></div>
    <div class="action">
      <lay-button>返回修改</lay-button>
      &nbsp;&nbsp;&nbsp;
      <lay-button type="primary">返回首页</lay-button>
    </div>
  </div>
</template>