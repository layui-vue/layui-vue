import type { BuiltInParserName } from "prettier";
import { zlibSync, unzlibSync, strToU8, strFromU8 } from "fflate";
import extraCss from "../assets/css/index.css?raw";

const scriptRe = /<script[^>]*>([\s\S]*)<\/script>/;
const exportDefaultRe = /export\s*default\s*\{([\s\S]*)\}\;?\s*<\/script>/;
const setupRe = /setup\s*\(\)\s*\{([\s\S]*)return\s*\{([\s\S]*)\}\;?\s*\}\;?/;
const layerRe = /import\s*\{\s*layer\s*\}\s*from\s*[\"|\'][^\;\"\']*[\"|\']/;

const MAIN_FILE_NAME = "App.vue";

/**
 * 将代码编码为 URI hash, 生成 playground 链接
 * @param source 源码
 * @param convertSetupSugar 转换 setup，仅字符串替换，没有做任何语法分析
 * @returns 处理后的代码，URI hsah， playground 链接
  }
 */
export const usePlayGround = async (
  source: string,
  convertSetupSugar: boolean
) => {
  const decodeCode = source;
  const scriptResult = decodeCode.match(scriptRe);

  // 替换 script 标签
  // $1 正则第一个括号匹配的内容
  let code: string | undefined = decodeCode;
  if (convertSetupSugar) {
    if (scriptResult) {
      code = decodeCode.replace(
        scriptRe,
        `<script lang="ts" setup>$1
        </script>`
      );
    } else {
      code = `${decodeCode}
      <script lang="ts" setup>

      </script>`;
    }

    // 去除 export default,保留其中的内容
    const exportDefaultResult = code.match(exportDefaultRe);
    if (exportDefaultResult) {
      code = code.replace(
        exportDefaultRe,
        trimBr(exportDefaultResult[1] + `</script>`).trim()
      );
      // console.log("export",code);
    }
    // 去除 setup 函数,保留其中的内容
    const setupResult = code.match(setupRe);
    if (setupResult) {
      code = code.replace(setupRe, trimBr(setupResult[1]));
      // console.log("setup",code);
    }
  }
  // 替换 layer 引入语句
  // playground 中使用最新版 layer 请从 @layui/layer-vue 引入
  if (code.match(layerRe)) {
    code = code.replace(layerRe, `import { layer } from "@layui/layer-vue"`);
    // console.log("layer",code);
  }

  code = await formatCode(MAIN_FILE_NAME, code);
  const originCode = {
    [MAIN_FILE_NAME]: code,
    "index.css": extraCss,
  };

  const encoded = utoa(JSON.stringify(originCode));
  const link = `https://layui-vue.gitee.io/sandbox-vue/#${encoded}`;
  return {
    code,
    encoded,
    link,
  };
};

/**
 *
 * @returns 格式化代码
 */
async function formatCode(filename: string, data: string) {
  const [format, parserHtml, parserTypeScript, parserBabel, parserPostcss] =
    await Promise.all([
      import("prettier/standalone").then((r) => r.format),
      import("prettier/parser-html").then((m) => m.default),
      import("prettier/parser-typescript").then((m) => m.default),
      import("prettier/parser-babel").then((m) => m.default),
      import("prettier/parser-postcss").then((m) => m.default),
    ]);
  let code = data;
  let parser: BuiltInParserName;
  if (filename.endsWith(".vue")) {
    parser = "vue";
  } else if (filename.endsWith(".js")) {
    parser = "babel";
  } else if (filename.endsWith(".ts")) {
    parser = "typescript";
  } else if (filename.endsWith(".json")) {
    parser = "json";
  } else {
    return;
  }
  code = format(code, {
    parser,
    plugins: [parserHtml, parserTypeScript, parserBabel, parserPostcss],
    semi: false, // 语句末尾打印分号
    singleQuote: true, // 使用单引号
    vueIndentScriptAndStyle: false, // 是否缩进 Vue 文件中的 script 和 style 标签
  });

  return code;
}

/**
 * 去除字符串两端的空白行
 * @param str
 * @returns
 */
function trimBr(str: string): string {
  return str.replace(/(^[\r\n]*)|([\r\n]*$)/, "");
}

export function utoa(data: string): string {
  const buffer = strToU8(data);
  const zipped = zlibSync(buffer, { level: 9 });
  const binary = strFromU8(zipped, true);
  return btoa(binary);
}

export function atou(base64: string): string {
  const binary = atob(base64);

  // zlib header (x78), level 9 (xDA)
  if (binary.startsWith("\x78\xDA")) {
    const buffer = strToU8(binary, true);
    const unzipped = unzlibSync(buffer);
    return strFromU8(unzipped);
  }

  // old unicode hacks for backward compatibility
  // https://base64.guru/developers/javascript/examples/unicode-strings
  return decodeURIComponent(escape(binary));
}
