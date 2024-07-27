<template>
  <div class="layui-code" :class="[`layui-code-${_theme}`]">
    <div class="layui-code-header" v-if="_header">
      <span class="layui-code-render" v-if="_isCanChooseHighlighter">
        Renderer
        <select class="layui-code-renderer" v-model="_highlighter">
          <option value="">none</option>
          <option
            v-for="(hl, i) in builtinHighlighter"
            :key="i"
            :selected="props.highlighter == hl"
          >
            {{ hl }}
          </option>
        </select>
      </span>
      {{ props.text.code }}
      <span v-if="_langMarker" class="layui-code-language">{{ _lang }}</span>
      <lay-icon
        v-if="_copy"
        class="layui-code-copy"
        type="layui-icon-file-b"
      ></lay-icon>
    </div>
    <div class="layui-code-wrap" style="width: 100%">
      <lay-icon
        v-if="_copy && !_header && _codeLine.length > 1"
        class="layui-code-copy layui-code-copy-floating"
        type="layui-icon-file-b"
      ></lay-icon>
      <div class="layui-code-lines">
        <pre><div v-for="(line, ln) in _highlightedCodeLine" :key="ln" class="layui-code-line">
                    <div class="layui-code-linenumber" v-if="_ln">{{ getFormalLn(ln + 1) }}.</div>
                    <div
                        class="layui-code-pre" :class="[
                        { 'layui-code-pre-no-selection': !_isAllowCodeSelect },
                        { 'layui-code-pre-no-ln': !_ln },
                        `language-${_lang}`,
                    ]" v-html="line"></div>
                </div></pre>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Ref, computed, onUnmounted, ref } from "vue";
import { LayCodePanelProps } from "./ILayCodePanel";
import "./LayCodePanel.less";
import "./hljs.css";
import "./prism.css";
import Prism from "prismjs";
import hljs from "highlight.js";
import { Highlighter } from "shiki";
import { useShiki } from "./useShiki";
import { watch } from "vue";

defineOptions({
  name: "LayCodePanel",
});

const props = withDefaults(defineProps<LayCodePanelProps>(), {
  code: "",
  preview: true,
  style: () => ({}),
  codeStyle: () => ({}),
  className: () => [],
  copy: true,
  text: () => ({
    code: "</>",
    preview: "Preview",
  }),
  header: false,
  ln: true,
  theme: "light",
  encode: false,
  lang: "typescript",
  langMarker: true,
  wordWrap: false,
  highlighter: "",
  isCanChooseHighlighter: true,
  isAllowCodeSelect: true,
  isAllowRemoteScript: false,
});

const digitLength = (digit: number) => {
  let length = 0;
  while (digit > 0) {
    length += 1;
    digit = Math.floor(digit / 10);
  }
  return length;
};

const builtinHighlighter = ref(["hljs", "prism", "shiki"]);
const _highlighter = ref(props.highlighter);
const _theme = ref(props.theme);
const _copy = ref(props.copy);
const _code = ref(
  (() =>
    props.isAllowRemoteScript
      ? props.code
      : props.code.replace(/<script(>.*<\/script>|.*?>)/g, ""))()
);
const _lang = ref(props.lang);
const _langMarker = ref(props.langMarker);
const _wordWrap = ref(props.wordWrap);
const _header = ref(props.header);
const _preview = ref(props.preview);
const _encode = ref(props.encode);
const _codeStyle = ref(props.codeStyle);
const _className = ref(props.className);
const _isCanChooseHighlighter = ref(props.isCanChooseHighlighter);
const _codeLine = computed(() => _code.value.split("\n"));
const _shiki: Ref<undefined | Highlighter> = ref();
useShiki(_theme, _lang, (hl) => (_shiki.value = hl));
const _ln = ref(props.ln);
const _isAllowCodeSelect = ref(props.isAllowCodeSelect);

// @ts-ignore
const _render: () => string = () => {
  switch (_highlighter.value) {
    case "hljs":
      return hljs.highlight(_code.value, { language: _lang.value }).value;
    case "prism":
      return Prism.highlight(
        _code.value,
        Prism.languages[_lang.value],
        _lang.value
      );
    case "shiki":
      return _shiki.value?.codeToHtml(_code.value, {
        lang: _lang.value,
        theme: `${_theme.value}-plus`,
      });
    default:
      const el = document.createElement("div");
      el.textContent = _code.value;
      return el.innerHTML;
  }
};

const _highlightedCodeLine = computed(() => _render()?.split("\n"));

const getFormalLn = (ln: number) => {
  return ln.toString().padStart(digitLength(_codeLine.value.length), "0");
};

onUnmounted(() => {
  if (_shiki.value) {
    _shiki.value = undefined;
  }
});
</script>

<style lang="less">
.layui-code {
  position: relative;

  &-lines {
    width: 100%;

    div {
      line-height: 24px;
    }

    .layui-code-line {
      display: flex;
      position: relative;

      .layui-code-linenumber {
        position: absolute;
        user-select: none;
        text-align: right;
        width: 46px;
      }

      .layui-code-pre {
        width: 100%;
        margin-left: 50px;
        min-height: 24px;
        padding-left: 6px;

        &-no-selection {
          user-select: none;
        }

        &-no-ln {
          margin-left: unset;
        }
      }
    }
  }
}

.layui-code-light {
  border-color: #eee;
  color: #333;

  .layui-code-lines {
    background-color: #fafafa;
  }

  .layui-code-pre {
    background-color: #fff;
    border-left: 1px solid #eee;
  }
}

.layui-code-dark {
  border-color: #555;
  color: #ccc;

  .layui-code-lines {
    background-color: #222;
  }

  .layui-code-pre {
    background-color: #333;
    border-left: 1px solid #555;
  }
}
</style>
