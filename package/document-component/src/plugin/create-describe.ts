/*
 * @Author: baobaobao
 * @Date: 2023-05-05 16:42:45
 * @LastEditTime: 2023-05-06 21:34:09
 * @LastEditors: baobaobao
 */
import container from "markdown-it-container";
import type Token from "markdown-it/lib/token";
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
          html: true,
        }).render(description || "");
        if (token.nesting === 1 && description) {
          return `<div class="describe-plugin">${descTemplate}`;
        } else {
          return "</div>\n";
        }
      },
    },
  ];
}
