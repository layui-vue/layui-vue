const path = require('path')
const { isCommonType, getTypeSymbol, isUnionType, arrayToRegExp } = require('components-helper')
const helper = require('components-helper').default
const pkg = require('../package.json')

const { name: packageName, version: packageVersion } = pkg
const entryPaths = "../document-component/src/document/zh-CN/components/*.md"

const typeMap = {
  vue: ['Component', 'VNode', 'CSSProperties', 'StyleValue'],
}

helper({
  name: packageName,
  version: packageVersion,
  entry: entryPaths,
  outDir: 'types',
  separator: ' ',
  space: 2,
  reComponentName,
  reAttribute,
  reDocUrl,
  reWebTypesSource,
  reWebTypesType,
  props: '属性',
  propsName: '名称',
  propsDescription: '描述',
  propsType: '类型',
  propsDefault: '默认值',
  propsOptions: '可选值',
  events: '事件',
  eventsName: '名称',
  eventsDescription: '描述',
  slots: '插槽',
  slotsName: '名称',
  slotsDescription: '描述',
  slotsType: '类型',
  directives: '指令',
  directivesName: '名称',
  directivesDescription: '描述',
  directivesType: '类型',
  titleRegExp: /:{3}\s+title\s+(?:([A-Za-z]+\s*)+)[\u4e00-\u9fa5]*\s*\n+:{3}\n+:{3}\s+describe\s+(.*)\n+:{3}/g,
  tableRegExp: /:{3}\s+title(.*\s*属性|.*\s*事件|.*\s*插槽|.*\s*指令|)\n+:{3}\n+:{3}\s+table\n+(\|?.+\|.+)\n\|?\s*:?-+:?\s*\|.+((\n\|?.+\|.+)+)\n+:{3}/g
})


function reComponentName (title) {
  return `lay-${title.replace(/\B([A-Z])/g, '-$1').toLowerCase().replace(/[ ]+/g, '-') }`
}

function reWebTypesSource(title){
  const symbol = `Lay${title
    .replace(/-/g, ' ')
    .replace(/^\w|\s+\w/g, (item) => item.trim().toUpperCase())
  }`
  return { symbol }
}

function reDocUrl(fileName) {
  const docs = 'http://www.layui-vue.com/zh-CN/components/'

  return `${docs}${fileName}`
}

function reWebTypesType (type) {
  const isPublicType = isCommonType(type)
  const symbol = getTypeSymbol(type)
  const isUnion = isUnionType(symbol)
  const module = findModule(symbol)

  return isPublicType || !symbol || isUnion
    ? type
    : { name: type, source: { symbol, module } }
}

function findModule(type){
  let result;
  for (const key in typeMap) {
    const regExp = arrayToRegExp(typeMap[key])
    const inModule = regExp.test(getTypeSymbol(type))

    if (inModule) {
      result = key
      break
    }
  }
  return result
}

function reAttribute(value, key) {
  const str = value
    .replace(/^\*\*(.*)\*\*$/, '$1')
    .replace(/^`(.*)`$/, '$1')
    .replace(/^~~(.*)~~$/, '')
    .replace(/<del>.*<\/del>/g, '')

  if (key === '名称' && /^(-|—)+$/.test(str)) {
    return 'default'
  } else if (str === '' || /^(-|—)+$/.test(str)) {
    return undefined
  } else if (key === '名称' && /v-model:(.+)/.test(str)) {
    const _str = str.match(/v-model:(.+)/)
    return _str ? _str[1] : undefined
  } else if (key === '名称' && /v-model/.test(str)) {
    return 'model-value'
  } else if (key === '名称') {
    return str
      .replace(/\s*[\\*]\s*/g, '')
      .replace(/\B([A-Z])/g, '-$1')
      .toLowerCase()
  } else if (key === '类型') {
    return str
      .replace(/\bfunction(\(.*\))?(:\s*\w+)?\b/gi, 'Function')
      .replace(/\bdate\b/g, 'Date')
      .replace(/\([^)]*\)(?!\s*=>)/g, '')
      .replace(/(<[^>]*>|\{[^}]*}|\([^)]*\))/g, (item) => {
        return item.replace(/(\/|\|)/g, '=_0!')
      })
      .replace(/(\b\w+)\s*\|/g, '$1 /')
      .replace(/\|\s*(\b\w+)/g, '/ $1')
      .replace(/=_0!/g, '|')
  } else if (key === '可选值') {
    return /\[.+\]\(.+\)/.test(str) || /^\*$/.test(str)
      ? undefined
      : str.replace(/`/g, '').replace(/\([^)]*\)(?!\s*=>)/g, '')
  } else {
    return str
  }
}