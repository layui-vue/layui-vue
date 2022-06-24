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
        const info = token.info.trim().slice(klass.length).trim();
        if (token.nesting === 1) {
          return `<lay-quote style="margin-left:0px;margin-right:0px;margin-top:20px;margin-bottom:40px;">${info}`;
        } else {
          return "</lay-quote>\n";
        }
      },
    },
  ];
}
