<template>
  <div id="docsearch"></div>
</template>

<script setup name="LaySelect" lang="ts">
// @ts-ignore
import docsearch from "@docsearch/js";
import { onMounted } from "vue";
import "@docsearch/css";

onMounted(() => {
  docsearch({
    container: "#docsearch",
    appId: "BIYZTK0F0Q",
    apiKey: "4b228ca4dcda0f1d5d9ff9938c2b4f59",
    indexName: "layui-vue"
  });
});
</script>

<style>

.DocSearch-Button {
  outline: none;
  box-shadow: none;
}

.DocSearch-Button .DocSearch-Search-Icon, 
.DocSearch-Button-Placeholder {
  color: whitesmoke;
}

:root {
  --docsearch-logo-color: var(--global-primary-color);
  --docsearch-primary-color: var(--global-primary-color) ;
  --docsearch-searchbox-background: rgba(255, 255, 255, 0.05);
  --docsearch-searchbox-focus-background: rgba(255, 255, 255, 0.05);
  --docsearch-container-background: rgba(0, 0, 0, 0.1);;
}
</style>
