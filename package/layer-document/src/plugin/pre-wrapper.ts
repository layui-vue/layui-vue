import MarkdownIt from "markdown-it";

export default (md: MarkdownIt): void => {
  const fence = md.renderer.rules.fence!;
  md.renderer.rules.fence = (...args) => {
    const [tokens, idx] = args;
    const token = tokens[idx];
    const rawCode = fence(...args);
    return `<div class="language-${token.info.trim()}">${rawCode}</div>`;
  };
};
