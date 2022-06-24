import container from "markdown-it-container";
import type Token from "markdown-it/lib/token";

type ContainerArgs = [
  typeof container,
  string,
  { render(tokens: Token[], idx: number): string }
];

export default function createContainer(klass: string): ContainerArgs {
  return [
    container,
    klass,
    {
      render(tokens, idx) {
        const token = tokens[idx];
        if (token.nesting === 1) {
          const anchors = [];
          for (const token of tokens) {
            if (token.nesting === 1 && token.info.includes("title")) {
              const info = token.info.trim().slice(klass.length).trim();
              anchors.push(info);
            }
          }
          // 此处仅支持 string | number | boolean 类型
          return `<lay-anchor anchors="${anchors}" :currIndex="-1" :show="true">`;
        } else {
          return "</lay-anchor>\n";
        }
      },
    },
  ];
}
