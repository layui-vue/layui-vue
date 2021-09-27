<template>
  <div class="lay-code">
    <div class="source">
      <slot />
    </div>
    <div
      ref="meta"
      class="meta"
    >
      <div
        v-if="$slots.description"
        class="description"
      >
        <slot name="description" />
      </div>
      <div class="language-html">
        <slot name="code" />
      </div>
    </div>
    <div
      :class="{ 'is-fixed': isFixContorl }"
      class="control"
      @click="toggleShow"
    >
      <i :class="[show ? 'layui-icon layui-icon-up' : 'layui-icon layui-icon-down']" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref, watch } from 'vue'

const meta = ref<HTMLElement>({} as HTMLElement)
const isFixContorl = ref(false)
const codeAreaHeight = ref(0)

const show = ref(false);

const toggleShow = function() {
  show.value = !show.value;
}

onMounted(() => {
  const foundDescs = meta.value.getElementsByClassName('description')
  const foundCodes = meta.value.getElementsByClassName('language-html')

  if (foundDescs.length) {
    codeAreaHeight.value =
      foundDescs[0].clientHeight + foundCodes[0].clientHeight + 30
  } else {
    codeAreaHeight.value = foundCodes[0].clientHeight + 20
  }
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})

watch(show, (value) => {
  if (value) {
    meta.value.style.height = `${codeAreaHeight.value}px`
    window.addEventListener('scroll', handleScroll)
    setTimeout(handleScroll, 100)
  } else {
    meta.value.style.height = '0'
    window.removeEventListener('scroll', handleScroll)
  }
})

function handleScroll() {
  const { top, bottom } = meta.value.getBoundingClientRect()
  isFixContorl.value =
    bottom > window.innerHeight && top + 44 <= window.innerHeight
}
</script>

<style>
.lay-code {
  margin: 1rem 0;
  border: 1px solid whitesmoke;
  border-radius: 3px;
  background: var(--c-bg);
  transition: all 0.2s;
}
.lay-code:hover {
  box-shadow: var(--shadow-2);
}
.lay-code .source {
  padding: 24px;
}
.lay-code .meta {
  padding: 0 10px;
  height: 0;
  background-color: var(--c-page-background);
  overflow: hidden;
  transition: height 0.2s;
}
.lay-code .meta .description {
  padding: 20px;
  margin: 10px 0;
  border: 1px solid var(--c-divider);
  box-sizing: border-box;
  background: var(--c-bg);
  font-size: 14px;
  line-height: 22px;
  color: var(--c-text-light-1);
  word-break: break-word;
}
.lay-code .meta .description p {
  margin: 0 !important;
  line-height: 26px !important;
}
.lay-code .meta .description code {
  display: inline-block;
  padding: 1px 5px;
  margin: 0 4px;
  height: 18px;
  border-radius: 3px;
  background-color: var(--code-inline-bg-color);
  font-size: 12px;
  line-height: 18px;
  color: var(--c-text-light);
}
.lay-code .control {
  height: 44px;
  box-sizing: border-box;
  margin-top: 10px;
  border-top: 1px solid whitesmoke;
  border-bottom-left-radius: 4px;
  border-bottom-right-radius: 4px;
  background: var(--c-bg);
  text-align: center;
  color: var(--c-text);
  cursor: pointer;
  width: 100%;
  user-select: none;
}
.lay-code .control.is-fixed {
  position: sticky;
  z-index: 11;
  bottom: 0;
}
.lay-code .control:hover {
  background-color: var(--c-page-background);
  color: var(--c-brand);
}
.lay-code .control > i {
  display: inline-block;
  font-size: 16px;
  line-height: 44px;
  transition: all 0.3s;
}
</style>
