import { createI18n } from 'vue-i18n'

const i18n = createI18n({
  locale: 'en_US', // set locale
  messages: {
    zh_CN: {
      input: {
        hello: '你好世界',
      },
      page: {
        prev: '上一页',
        next: '下一页'
      }
    },
    en_US: {
      input: {
        hello: 'hello world',
      },
      page: {
        prev: 'prev',
        next: 'next'
      }
    },
  },
})

export default i18n