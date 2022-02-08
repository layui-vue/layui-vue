<script lang="ts">
import { watch } from '@vue/runtime-core';
export default {
  name: "lay-config-provider",
};
</script>

<script setup lang="ts">

export interface LayConfigProviderProps {
    local?: string;
    theme?: string;
    themeVariable?: object;
}

const props = withDefaults(defineProps<LayConfigProviderProps>(),
  {
    local: 'zh_cn', 
    theme: 'light',
  }
);

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