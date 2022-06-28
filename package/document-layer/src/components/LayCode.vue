<template>
  <div class="lay-code">
    <div id="source" class="source">
      <slot></slot>
      <div v-if="$slots.description" class="description">
        <slot name="description"></slot>
      </div>
    </div>
    <div ref="meta" class="meta">
      <div class="language-html">
        <slot name="code"></slot>
      </div>
    </div>
    <div :class="{ 'is-fixed': isFixContorl }" class="control">
      <i class="layui-icon layui-icon-play btn" @click="onPlayground" />
      <i class="layui-icon layui-icon-file btn" @click="copy"></i>
      <i class="layui-icon layui-icon-fonts-code btn" @click="toggle"></i>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref, watch } from "vue";
import { usePlayGround } from "../composable/usePlayground";

const meta = ref<HTMLElement>({} as HTMLElement);
const isFixContorl = ref(false);
const codeAreaHeight = ref(0);

const show = ref(false);

const toggle = function () {
  show.value = !show.value;
};

const onPlayground = async function () {
  const foundCode = meta.value.querySelector(".language-html");
  const sourceCode = foundCode?.textContent ?? "";
  const { link } = await usePlayGround(sourceCode, true);
  window.open(link);
};

const copy = function () {
  const foundCodes = meta.value.getElementsByClassName("language-html");
  const foundCode = foundCodes[0];
  let successful = false;
  if (navigator.clipboard && document.hasFocus()) {
    const text = foundCode.textContent || "";
    navigator.clipboard.writeText(text);
    successful = true;
  } else if (window.getSelection()) {
    var range = document.createRange();
    let copyDiv;
    if (show.value) {
      range.selectNode(foundCode);
    } else {
      copyDiv = document.createElement("div");
      copyDiv.innerHTML = foundCode.innerHTML;
      copyDiv.style.position = "fixed";
      copyDiv.style.left = "-9999px";
      document.body.appendChild(copyDiv);
      range.selectNode(copyDiv);
    }
    window.getSelection()?.addRange(range);
    try {
      successful = document.execCommand("copy");
    } catch (err) {
      successful = false;
      console.error(err);
    }
    window.getSelection()?.removeAllRanges();
    copyDiv?.remove();
  }

  if (successful) {
    window.alert("复制成功");
  } else {
    window.alert("复制失败");
  }
};

onMounted(() => {
  const foundDescs = meta.value.getElementsByClassName("description");
  const foundCodes = meta.value.getElementsByClassName("language-html");

  if (foundDescs.length) {
    codeAreaHeight.value =
      foundDescs[0].clientHeight + foundCodes[0].clientHeight + 30;
  } else {
    codeAreaHeight.value = foundCodes[0].clientHeight + 20;
  }
});

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
});

watch(show, (value) => {
  if (value) {
    meta.value.style.height = `${codeAreaHeight.value}px`;
    window.addEventListener("scroll", handleScroll);
    setTimeout(handleScroll, 100);
  } else {
    meta.value.style.height = "0";
    window.removeEventListener("scroll", handleScroll);
  }
});

function handleScroll() {
  const { top, bottom } = meta.value.getBoundingClientRect();
  isFixContorl.value =
    bottom > window.innerHeight && top + 44 <= window.innerHeight;
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
  padding-bottom: 15px;
}
.lay-code .meta {
  padding: 0 10px;
  height: 0;
  background-color: var(--c-page-background);
  overflow: hidden;
  transition: height 0.2s;
}
.lay-code .source .description {
  padding: 20px;
  margin: 20px 0;
  margin-bottom: 0px;
  border: 1px solid whitesmoke;
  box-sizing: border-box;
  background: var(--c-bg);
  font-size: 14px;
  line-height: 22px;
  color: var(--c-text-light-1);
  word-break: break-word;
}
.lay-code .source .description p {
  margin: 0 !important;
  line-height: 26px !important;
}
.lay-code .source .description code {
  display: inline-block;
  padding: 1px 5px;
  margin: 0 4px;
  height: 18px;
  border-radius: 2px;
  background-color: var(--code-inline-bg-color);
  font-size: 12px;
  line-height: 18px;
  color: var(--c-text-light);
}
.lay-code pre {
  margin: 1rem 0.8rem 1rem 0.8rem;
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
  padding-left: 10px;
  padding-right: 10px;
}
.btn:hover::before {
  color: #5fb878;
}
</style>
