import { Highlighter, getHighlighter } from "shiki";
import { Ref } from "vue";

export function useShiki(
  _theme: Ref<string>,
  _lang: Ref<string>,
  resolve?: (highlighter: Highlighter) => {}
) {
  getHighlighter({
    // @ts-ignore
    warnings: false,
    themes: [`${_theme.value}-plus`],
    langs: [`${_lang.value}`],
  }).then((highlighter) => resolve?.(highlighter));
}
