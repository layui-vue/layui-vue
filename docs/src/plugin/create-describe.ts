import type Token from "markdown-it/lib/token";
import markdown from "markdown-it";
// @ts-expect-error TODO
import container from "markdown-it-container";

type ContainerArgs = [
  typeof container,
  string,
  { render: (tokens: Token[], idx: number) => string },
];

export default function createContainer(klass: string): ContainerArgs {
  return [
    container,
    klass,
    {
      render(tokens, idx) {
        const token = tokens[idx];
        // eslint-disable-next-line regexp/no-super-linear-backtracking
        const matchedInfo = token.info.trim().match(/^describe\s+(.*)$/);
        const description = matchedInfo && matchedInfo[1];
        const descTemplate = markdown({
          html: true,
        }).render(description || "");
        if (token.nesting === 1 && description) {
          return `<div class="describe-plugin">${descTemplate}`;
        }
        else {
          return "</div>\n";
        }
      },
    },
  ];
}
