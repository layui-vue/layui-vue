import vue from '@vitejs/plugin-vue'
import Markdown from 'vite-plugin-md'
import container from 'markdown-it-container'
import highlight from './highlight'
import snippet from './snippet'
import demo from './demo'
import createTitle from './create-title'
import createBlock from './create-block'
import createDescribe from './create-describe'
import preWrapper from './pre-wrapper'

const plugins = [
  vue({
    include: [/\.vue$/, /\.md$/],
  }),
  Markdown({
    markdownItOptions: {
      html: true,
      linkify: true,
      typographer: true,
      highlight,
    },
    markdownItSetup(md) {
      md.use(snippet)
        .use(preWrapper)
        .use(container, 'demo', demo)
        .use(...createBlock('block', '描述信息'))
        .use(...createTitle('title', '标题信息'))
        .use(...createDescribe('describe', '描述信息'))
    },
  }),
] as any

export default plugins
