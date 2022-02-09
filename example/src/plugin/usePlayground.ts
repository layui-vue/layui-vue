const scriptRe = /<script[^>]*>([\s\S]*)<\/script>/;
const exportDefaultRe = /export\s*default\s*\{([\s\S]*)\}\;?\s*<\/script>/;
const setupRe = /setup\s*\(\)\s*\{([\s\S]*)return\s*\{([\s\S]*)\}\;?\s*\}\;?/;
const layerRe = /import\s?\{\s?layer\s?\}\s?from\s?[\"|\']\@layui\/layer-vue[\"|\']/;

// danger: 以下字符串拼接代码不可改动缩进或换行,否则会影响 URI hash 解码后代码的排版
const MAIN_FILE_NAME = 'App.vue';

/**
 * 将代码编码为 URI hash, 生成 playground 链接
 * @param source 源码
 * @param convertSetupSugar 转换 setup，仅字符串替换，没有做任何语法分析
 * @returns 处理后的代码，URI hsah， playground 链接
  }
 */
export const usePlayGround = (source: string, convertSetupSugar: boolean) => {
  const decodeCode = source;
  const scriptResult = decodeCode.match(scriptRe)

  // 替换 script 标签
  // $1 正则第一个括号匹配的内容
  let code: string = decodeCode
  if (convertSetupSugar) {
    if (scriptResult) {
      code = decodeCode.replace(
        scriptRe,
        `<script lang="ts" setup>$1
</script>`
      )
    } else {
      code = `${decodeCode}
<script lang="ts" setup>

</script>
`
    }

    // 去除 export default,保留其中的内容
    const exportDefaultResult = code.match(exportDefaultRe)
    if (exportDefaultResult) {
      code = code.replace(exportDefaultRe, trimBr(exportDefaultResult[1] + `</script>`).trim())
      // console.log("export",code);
    }
    // 去除 setup 函数,保留其中的内容
    const setupResult = code.match(setupRe)
    if (setupResult) {
      code = code.replace(setupRe, trimBr(setupResult[1]))
      // console.log("setup",code);
    }
  }
  // 替换 layer 引入语句
  // playground 中使用最新版 layer 请从 @layui/layer-vue 引入
  if (code.match(layerRe)) {
    code = code.replace(layerRe, `import { layer } from "@layui/layui-vue"`)
    // console.log("layer",code);
  }
  const originCode = {
    [MAIN_FILE_NAME]: code,
  }

  const encoded = utoa(JSON.stringify(originCode))
  const link = `https://layui-vue.gitee.io/layui-vue-playground/#${encoded}`
  //const link = `http://localhost:3001/layui-vue-playground/#${encoded}`
  return {
    code,
    encoded,
    link,
  }
}

//编码
function utoa(data: string): string {
  return btoa(unescape(encodeURIComponent(data)));
}

// 去除字符串两端的空白行
function trimBr(str: string): string {
  return str.replace(/(^[\r\n]*)|([\r\n]*$)/, "")
}
