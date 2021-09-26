const helper = require('components-helper')
const { name, version } = require('./package.json')

helper({
  name,
  version,
  entry: 'docs/docs/en-US/components/*.md',
  outDir: 'lib',
  reComponentName,
  reDocUrl,
  reAttribute,
  titleRegExp: '#+\\s+(.*)\n+>\\s*([^(#|\\n)]*)',
  tableRegExp:
    '#+\\s+(.*\\s*Props|.*\\s*Events|.*\\s*Slots|.*\\s*Directives)\\s*\\n+(\\|?.+\\|.+)\\n\\|?\\s*:?-+:?\\s*\\|.+((\\n\\|?.+\\|.+)+)',
})

function reComponentName(title) {
  return 'ele-' + title.replace(/\B([A-Z])/g, '-$1').toLowerCase()
}

function reDocUrl(fileName, header) {
  // TODO: `zh-CN` -> `en-US`
  const docs = 'https://gitee.com/Jmysy/layui-vue'
  const _header = header ? header.replace(/[ ]+/g, '-') : undefined
  return docs + fileName + (_header ? '#' + header : '')
}

function reAttribute(value, key) {
  if (key === 'Name' && /^(-|—)$/.test(value)) {
    return 'default'
  } else if (key === 'Name' && /v-model:(.+)/.test(value)) {
    const _value = value.match(/v-model:(.+)/)
    return _value ? _value[1] : undefined
  } else if (key === 'Name' && /v-model/.test(value)) {
    return 'model-value'
  } else if (key === 'Name') {
    return value.replace(/\B([A-Z])/g, '-$1').toLowerCase()
  } else if (key === 'Type') {
    return value
      .replace(/\s*\/\s*/g, '|')
      .replace(/\s*,\s*/g, '|')
      .replace(/\(.*\)/g, '')
      .toLowerCase()
  } else if (value === '' || /^(-|—)$/.test(value)) {
    return undefined
  } else if (key === 'Options') {
    return /\[.+\]\(.+\)/.test(value) || /^\*$/.test(value)
      ? undefined
      : value.replace(/`/g, '')
  } else {
    return value
  }
}