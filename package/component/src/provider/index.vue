<script lang="ts">
export default {
  name: "lay-config-provider",
};
</script>

<script setup lang="ts">
import { watch } from "vue";
import { useI18n } from "../language";
import {
  Theme,
  DynamicThemeFix,
  enable as enableDarkMode,
  disable as disableDarkMode,
  auto as followSystemColorScheme,
} from "@umijs/ssr-darkreader";

export interface LayConfigProviderProps {
  locale?: string;
  locales?: [];
  theme?: string;
  themeVariable?: any;
  darkPartial?: any;
}

const props = withDefaults(defineProps<LayConfigProviderProps>(), {
  locale: "zh_CN",
  theme: "light",
});

const { locale, setLocaleMessage, mergeLocaleMessage } = useI18n();

const ignoreInlineStyle = [
  ".layui-colorpicker-trigger-span",
  "div.layui-color-picker *",
];

const fixCss = `
.lay-progress-circle svg path {
    filter: invert(98%) hue-rotate(180deg) contrast(80%) !important;
}
`

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
  const defaultPartial: Partial<Theme> = {
    mode: 1,
    brightness: 100,
    contrast: 90,
    sepia: 0,
    grayscale: 0,
  };

  const defaultFixes: DynamicThemeFix = {
    css: fixCss,
    invert: [".lay-progress-circle svg"],
    ignoreImageAnalysis: [],
    disableStyleSheetsProxy: false,
    ignoreInlineStyle: ignoreInlineStyle,
  };
  Object.assign(defaultPartial, props.darkPartial);
  if (theme === "dark") {
    enableDarkMode(defaultPartial, defaultFixes);
  } else if (theme === "light") {
    disableDarkMode();
  } else if (theme === "auto") {
    followSystemColorScheme(defaultPartial, defaultFixes);
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
