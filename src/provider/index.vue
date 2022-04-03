<script lang="ts">
export default {
  name: "lay-config-provider",
};
</script>

<script setup lang="ts">
import { watch } from "vue";
import { useI18n } from "vue-i18n";
import {
  enable as enableDarkMode,
  disable as disableDarkMode,
} from "darkreader";

const { locale, setLocaleMessage, mergeLocaleMessage } = useI18n();

export interface LayConfigProviderProps {
  locale?: string;
  locales?: [];
  theme?: string;
  themeVariable?: any;
}

const props = withDefaults(defineProps<LayConfigProviderProps>(), {
  locale: "en_US",
  theme: "light",
});

const changeLocale = (lang: string) => {
  locale.value = lang;
};

const changeLocales = (lang: string, locales: any, merge: boolean) => {
  if (merge) {
    mergeLocaleMessage(lang, locales);
  } else {
    setLocaleMessage(lang, locales);
  }
};

const changeTheme = (theme: string) => {
  if (theme === "dark") {
    enableDarkMode(
      {
        mode: 1,
        brightness: 100,
        contrast: 90,
        sepia: 0,
        darkSchemeTextColor: getComputedStyle(document.documentElement).getPropertyValue("--global-dark-text-color"),
        darkSchemeBackgroundColor: getComputedStyle(document.documentElement).getPropertyValue("--global-dark-background-color")
      },
      {
        invert: [],
        css: ``,
        ignoreInlineStyle: [
          ".layui-colorpicker-trigger-span",
          "div.layui-color-picker *",
        ],
        ignoreImageAnalysis: [],
        disableStyleSheetsProxy: false,
      }
    );
    localStorage.setItem('layui-vue-theme-dark','true')
  } else {
    disableDarkMode();
    localStorage.setItem('layui-vue-theme-dark','false')
  }
};

const changeThemeVariable = (vars: any) => {
  if (vars != null) {
    const keys = Object.keys(vars);
    for (let i = 0; i < keys.length; i++) {
      const key = keys[i];
      const value = vars[key];
      document.documentElement.style.setProperty(key, value);
    }
  }
};

watch(
  () => props.locale,
  (lang) => {
    changeLocale(lang);
  },
  { immediate: true }
);

watch(
  () => props.locales,
  (locals) => {
    locals?.forEach((item: any) => {
      changeLocales(item.name, item.locale, item.merge);
    });
  },
  { immediate: true, deep: true }
);

watch(
  () => props.theme,
  (theme) => {
    changeTheme(theme);
  },
  { immediate: true }
);

watch(
  () => props.themeVariable,
  (vars) => {
    changeThemeVariable(vars);
  },
  { immediate: true, deep: true }
);
</script>

<template>
  <slot></slot>
</template>
