import { getCurrentInstance } from "vue";
import { createI18n, useI18n as __useI18n__ } from "vue-i18n";
import zh_CN from "./locales/zh_CN";
import en_US from "./locales/en_US";

const i18n = createI18n({
  legacy: false,
  locale: "zh_CN",
  messages: {
    zh_CN: zh_CN,
    en_US: en_US,
  },
});

export function useI18n() {
  let i18nInstance;
  const app = getCurrentInstance()?.appContext.app;

  try {
    i18nInstance = __useI18n__();
  } catch (e) {
    app?.use(i18n);
    i18nInstance = __useI18n__();
  }

  return i18nInstance;
}

export default i18n;
