import prism from "prismjs";
import loadLanguages from "prismjs/components/index";
import escapeHtml from "escape-html";

loadLanguages(["markup", "css", "javascript"]);

function wrap(code: string, lang: string): string {
  if (lang === "text") {
    code = escapeHtml(code);
  }
  return `<pre v-pre><code>${code}</code></pre>`;
}

export default (str: string, lang: string): string => {
  if (!lang) {
    return wrap(str, "text");
  }
  lang = lang.toLowerCase();
  const rawLang = lang;
  if (lang === "vue" || lang === "html") {
    lang = "markup";
  }
  if (lang === "md") {
    lang = "markdown";
  }
  if (lang === "ts") {
    lang = "typescript";
  }
  if (lang === "py") {
    lang = "python";
  }
  if (!prism.languages[lang]) {
    try {
      loadLanguages([lang]);
    } catch (e) {
      console.warn(lang, e);
    }
  }
  if (prism.languages[lang]) {
    const code = prism.highlight(str, prism.languages[lang], lang);
    return wrap(code, rawLang);
  }
  return wrap(str, "text");
};
