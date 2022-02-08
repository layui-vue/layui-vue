<script lang="ts">
import { watch } from '@vue/runtime-core';
export default {
  name: "lay-config-provider",
};
</script>

<script setup lang="ts">

export interface LayConfigProviderProps {
    theme?: object;
}

const props = withDefaults(defineProps<LayConfigProviderProps>(),
  {
    
  }
);


const changeTheme = (vars: any) => {
  // @ts-ignore
  if (!window.less || !window.less.modifyVars) {
    return;
  }
  // @ts-ignore
  window.less.modifyVars(vars).then((res) => {
      console.log(res);
  }).catch((res: any) => {
      console.log(res);
  });
};

watch(() => props.theme, (vars) => {
    changeTheme(vars);
},{immediate: true})

</script>

<template>
  <div class="lay-config-provider">
    <slot></slot>
  </div>
</template>