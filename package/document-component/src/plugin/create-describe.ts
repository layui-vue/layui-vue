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
          return `<p style="padding-left: 30px;padding-top: 20px;padding-bottom: 20px;">${info}`;
        } else {
          return "</p>\n";
        }
      },
    },
  ];
}
