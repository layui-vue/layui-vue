import vue from '@vitejs/plugin-vue'
import Markdown from 'vite-plugin-md'
import container from 'markdown-it-container'
import highlight from './highlight'
import snippet from './snippet'
import demo from './demo'
import createContainer from './create-container'
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
        .use(...createContainer('field', '描述信息'))
    },
  }),
]

export default plugins
