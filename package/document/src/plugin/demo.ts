import markdown from "markdown-it";
import highlight from "./highlight";
import type Token from "markdown-it/lib/token";

function assignScript(script: string) {
  const dependencies = {} as Record<string, string[]>;
  const attrs = {} as Record<string, string>;
  const content = script
    .replace(/import\s?\{.*\}.*/g, (item) => {
      const key = getInnerString(item.replace(/'/g, '"'), '"', '"');
      const value = getInnerString(item.replace(/\s+/g, ""), "{", "}");
      const list = value ? value.split(",") : [];
      if (key && dependencies[key]) {
        dependencies[key] = dependencies[key].concat(list);
      } else if (key) {
        dependencies[key] = list;
      }
      return "";
    })
    /**
     * const -> let
     *
     * const a = -> let a =
     * const a = -> a =
     */
    .replace(/(const|let|var)\s\w*\s?=/g, (item) => {
      const attr = getInnerString(item, "\\s", "\\s?=");
      if (attr && !(attr in attrs)) {
        attrs[attr] = attr;
        return `let ${attr} =`;
      } else {
        return attr + " =";
      }
    })
    // Remove extra line breaks
    .replace(/\n+/gm, "\n");
  // Combine the import
  const reImport = Object.keys(dependencies).reduce((all, item) => {
    const filterAttrs = [...new Set(dependencies[item])];
    return all + `import {${filterAttrs + ","}} from '${item}';\n`;
  }, "");

  return reImport + content;
}

/**
 * Extract part of the new string from the middle of the string
 * @param {string} string string
 * @param {string} prefix RegExp string
 * @param {string} postfix RegExp string
 * @param {string} type g | m | i
 */
function getInnerString(
  string: string,
  prefix: string,
  postfix = "",
  type: "i" | "g" | "m" = "i"
): string | undefined {
  const result = new RegExp(`${prefix}(.*)${postfix}`, type);
  const match = string.match(result);
  return match ? match[1].trim() : undefined;
}

let script = ""; // Record the <script> label of the current page

export default {
  render: (tokens: Token[], idx: number): string => {
    // the `demo` block of the current page
    const htmlBlock = tokens.filter((item) => item.type === "html_block");
    const { nesting, info = "", map } = tokens[idx];

    if (nesting === -1) {
      return "</lay-code>";
    }

    const matchedInfo = info.trim().match(/^demo\s+(.*)$/);
    const description = matchedInfo && matchedInfo[1];
    const descTemplate = markdown().render(description || "");
    let str = ""; // copy the current `demo` block code
    let lastLine = NaN;

    for (let i = 0; i < htmlBlock.length; i++) {
      const item = htmlBlock[i];

      if (item.map && map && item.map[0] >= map[0] && item.map[1] <= map[1]) {
        const { map, content } = item;
        const delta = map[0] - (lastLine || map[1]);

        if (delta > 0) {
          str += "\n".repeat(delta);
        }
        str += content;
        lastLine = map[1];
        if (i === 0) {
          script = "";
        }
        // Remove top <template>
        if (/^<template>/.test(content)) {
          const reContent = content.match(/^<template>((\s|\S)*)<\/template>/m);

          htmlBlock[i].content = (reContent && reContent[1]) || "";
        }
        // Extract the <script> label content
        if (content.includes("<script")) {
          if (/export\sdefault\s?\{/m.test(content)) {
            const setup = content.match(
              /setup\s?\(\)\s?\{((\s|\S)*)return\s?\{/m
            );
            const reContent = content.replace(
              /export\sdefault\s?\{((\s|\S)*)\}/m,
              (setup && setup[1]) || ""
            );
            const reScript = reContent.match(
              /^<script\s?.*?>((\s|\S)*)<\/script>/m
            );
            script += (reScript && reScript[1]) || "";
          } else {
            const reScript = content.match(
              /^<script\s?.*?>((\s|\S)*)<\/script>/m
            );
            script += (reScript && reScript[1]) || "";
          }
          htmlBlock[i].content = "";
        }
        // Change the last content to <script> of the current page
        if (i + 1 === htmlBlock.length) {
          htmlBlock[i].content = `
          <script setup>
            ${assignScript(script)}
          </script>`;
        }
      }
    }

    return `
    <lay-code>
      ${description ? `<template #description>${descTemplate}</template>` : ""}
      <template #code>${highlight(str, "vue")}</template>
    `;
  },
};
