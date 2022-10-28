<template>
  <div class="lay-code">
    <div id="source" class="source">
      <slot />
      <div v-if="$slots.description" class="description">
        <slot name="description" />
      </div>
    </div>
    <div ref="meta" class="meta">
      <div class="language-html">
        <slot name="code" />
      </div>
    </div>
    <div :class="{ 'is-fixed': isFixContorl }" class="control">
      <i
        class="layui-icon layui-icon-file btn"
        @click="copy"
        title="复制代码"
      />
      <i
        class="layui-icon layui-icon-fonts-code btn"
        @click="toggle"
        title="查看代码"
      />
      <i
        class="layui-icon layui-icon-component btn"
        @click="onPlayground"
        title="在 sandbox-vue 打开"
      />
      <i
        class="layui-icon layui-icon-chart btn"
        title="在 stackblitz 打开"
        @click="onStackblitz"
      >
      </i>
    </div>
  </div>
</template>

<script setup lang="ts">
import { layer } from "@layui/layer-vue";
import { onMounted, onUnmounted, ref, watch } from "vue";
import { openPlayground } from "../utils/code-playground";
import { openStackblitz } from "../utils/code-stackblitz";

const meta = ref<HTMLElement>({} as HTMLElement);
const isFixContorl = ref(false);
const codeAreaHeight = ref(0);

const show = ref(false);

const toggle = function () {
  show.value = !show.value;
};

const onPlayground = async function () {
  const foundCodes = meta.value.getElementsByClassName("language-html");
  const foundCode = foundCodes[0];
  const SourceCode = foundCode.textContent || "";

  const { link } = await openPlayground(SourceCode, true);
  window.open(link);
};

const onStackblitz = function () {
  const foundCodes = meta.value.getElementsByClassName("language-html");
  const foundCode = foundCodes[0];
  const SourceCode = foundCode.textContent || "";
  openStackblitz(SourceCode);
};

const copy = function () {
  const foundCodes = meta.value.getElementsByClassName("language-html");
  const foundCode = foundCodes[0];
  let successful = false;
  // 使用原生系统剪贴板，只适用被授权安全的站点，http下不能使用
  if (navigator.clipboard && document.hasFocus()) {
    const text = foundCode.textContent || "";
    navigator.clipboard.writeText(text);
    successful = true;
  } else if (window.getSelection()) {
    // 使用 document.execCommand
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
    layer.msg("复制成功", { icon: 1, time: 1000 }, () => {});
  } else {
    layer.msg("复制失败", { icon: 2, time: 1000 }, () => {});
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
  transition: all 0.2s;
}

.lay-code .source {
  padding: 24px;
  padding-bottom: 15px;
}

.lay-code .meta {
  padding: 0 10px;
  height: 0;
  overflow: hidden;
  transition: height 0.2s;
}

.lay-code .source .description {
  padding: 20px;
  margin: 20px 0;
  margin-bottom: 0px;
  border: 1px solid whitesmoke;
  box-sizing: border-box;
  font-size: 14px;
  line-height: 22px;
  word-break: break-word;
}

.lay-code .source .description p {
  margin: 0 !important;
  line-height: 26px !important;
}

.lay-code .source .description code {
  margin: 0 1px;
  padding: 0.2em 0.4em;
  font-size: 0.9em;
  background: #f2f4f5;
  border: 1px solid rgba(0, 0, 0, 0.06);
  border-radius: 3px;
}

.lay-code .control {
  height: 44px;
  box-sizing: border-box;
  margin-top: 10px;
  border-top: 1px solid whitesmoke;
  border-bottom-left-radius: 4px;
  border-bottom-right-radius: 4px;
  background-color: white;
  text-align: center;
  cursor: pointer;
  width: 100%;
  user-select: none;
}

.lay-code .control.is-fixed {
  position: sticky;
  z-index: 11;
  bottom: 0;
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

.btn:hover svg > path {
  fill: #5fb878;
}
</style>
