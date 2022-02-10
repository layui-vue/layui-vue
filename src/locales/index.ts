import { createI18n } from 'vue-i18n'
import zh_CN from "./zh_CN";
import en_US from './en_US';

const i18n = createI18n({
  locale: 'en_US', // set locale
  messages: {
    zh_CN: zh_CN,
    en_US: en_US,
  },
})

export default i18n