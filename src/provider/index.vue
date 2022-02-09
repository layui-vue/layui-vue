<script lang="ts">
import { watch } from '@vue/runtime-core';
import { useI18n } from 'vue-i18n';
export default {
  name: "lay-config-provider",
};
</script>

<script setup lang="ts">
const { locale } = useI18n(); 

export interface LayConfigProviderProps {
    locale?: string;
    theme?: string;
    themeVariable?: object;
}

const props = withDefaults(defineProps<LayConfigProviderProps>(),
  {
    locale: 'en_US', 
    theme: 'light',
  }
);

const changeLocale = (lang: string) => {
  locale.value = lang
}

const changeTheme = (theme: string) => {
  document.body.removeAttribute("lay-theme");
  document.body.setAttribute("lay-theme", theme);
}

const changeThemeVariable = (vars: any) => {
    if(vars!=null){
      const keys = Object.keys(vars);
      for(let i=0;i<keys.length;i++){
        const key = keys[i];
        const value=vars[key];
        document.documentElement.style.setProperty(key,value);
      }
    }
};

watch(() => props.locale, (lang) => {
  changeLocale(lang)
},{immediate: true})

watch(() => props.theme, (theme) => {
  changeTheme(theme);
},{immediate: true});

watch(() => props.themeVariable, (vars) => {
    changeThemeVariable(vars);
},{immediate: true, deep: true});

</script>

<template>
  <div class="lay-config-provider">
    <slot></slot>
  </div>
</template>