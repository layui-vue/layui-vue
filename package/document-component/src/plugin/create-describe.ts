import container from "markdown-it-container";
import type Token from "markdown-it/lib/token";
import highlight from "./highlight";
import markdown from "markdown-it";

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
        const matchedInfo = token.info.trim().match(/^describe\s+(.*)$/);
        const description = matchedInfo && matchedInfo[1];
        const descTemplate = markdown({
          html: true
        }).render(description || "");
        if (token.nesting === 1) {
          return `<p class="describe-plugin">
          ${descTemplate}`;
        } else {
          return "</p>\n";
        }
      },
    },
  ];
}
