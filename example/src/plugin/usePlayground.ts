const scriptRe = /<script[^>]*>([\s\S]*)<\/script>/;
const exportDefaultRe = /export\s*default\s*\{([\s\S]*)\}\;?\s*<\/script>/;
const setupRe = /setup\s*\(\)\s*\{([\s\S]*)return\s*\{([\s\S]*)\}\;?\s*\}\;?/;
const layerRe = /import\s?\{\s?layer\s?\}\s?from\s?[\"|\']\@layui\/layer-vue[\"|\']/;

// danger: 以下字符串拼接代码不可改动缩进或换行,否则会影响 URI hash 解码后代码的排版
const MAIN_FILE_NAME = 'App.vue';
// 用于全局引入 layui
const SETUP_CODE = `import { setupLayuiVue } from './layui-vue.js'
setupLayuiVue()`;

/**
 * √方案一:转换为setup语法糖 
 * 方案二:和文档代码保持一致,仅在 setup() 中添加 setupLayuiVue(),全局引入 layui
 * 方案三:<script> 和 <script setup> 标签同时存在,文档中的代码都在<script>中, <script setup>仅用来设置 layui
 * @param source 
 * @returns 
 */
export const usePlayGround = (source: string) => {
  const decodeCode = source;
  const result = decodeCode.match(scriptRe)
  
  // 替换 script 标签
  // $1 正则第一个括号匹配的内容
  let code: string
  if (result) {
    code = decodeCode.replace(
      scriptRe,
      `<script lang="ts" setup>
${SETUP_CODE}
$1
</script>`
    )
  } else {
    code = `${decodeCode}
<script lang="ts" setup>
${SETUP_CODE}
</script>
`
  }

  // 去除 export default,保留其中的内容
  const exportDefaultResult = code.match(exportDefaultRe)
  if(exportDefaultResult){
    code = code.replace(exportDefaultRe,trim(trimBr(exportDefaultResult[1]+`</script>`)))
     // console.log("export",code);
  }
  // 去除 setup 函数,保留其中的内容
  const setupResult = code.match(setupRe)
  if(setupResult){
    code = code.replace(setupRe,trimBr(setupResult[1]))
     // console.log("setup",code);
  }
  // TODO 这是临时方案,需要在 playground 中支持 @layui/layer-vue
  // 替换 layer 引入语句  
  if(code.match(layerRe)){
    code = code.replace(layerRe,`import { layer } from "@layui/layui-vue"`)
     // console.log("layer",code);
  }
  const originCode = {
    [MAIN_FILE_NAME]: code,
  }

  const encoded = utoa(JSON.stringify(originCode))
  const link = `https://layui-vue.gitee.io/layui-vue-playground/#${encoded}`
  return {
    encoded,
    link,
  }
}

//编码
function utoa(data: string): string {
  return btoa(unescape(encodeURIComponent(data)));
}

// 去除字符串两端的空白行
function trimBr(str: string): string{
  return str.replace(/(^[\r\n]*)|([\r\n]*$)/,"")
}

// 去除字符串两端的空格 
function trim(str: string): string { 
return str.replace(/(^\s*)|(\s*$)/g, ""); 
} 