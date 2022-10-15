<template>
  <div id="docsearch"></div>
</template>

<script setup name="LaySelect" lang="ts">
import { onMounted } from "vue";

onMounted(() => {
  // @ts-ignore
  docsearch({
    appId: "BIYZTK0F0Q",
    apiKey: "de599990b844bc1b325310f61ad19a78",
    indexName: "layui-vue",
    container: "#docsearch",
    debug: false,
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
  --docsearch-primary-color: var(--global-primary-color);
  --docsearch-searchbox-background: rgba(255, 255, 255, 0.02);
  --docsearch-searchbox-focus-background: rgba(255, 255, 255, 0.02);
  --docsearch-container-background: rgba(0, 0, 0, 0.1);
  --docsearch-searchbox-shadow: inset 0 0 0 1px var(--docsearch-primary-color);
}
.DocSearch-Button {
  width: 150px;
  border-radius: 50px;
}
.DocSearch-Button,
.DocSearch-Button:hover,
.DocSearch-Button:active,
.DocSearch-Button:focus {
  border: 1px solid rgb(224, 224, 230);
  box-shadow: none;
}
.DocSearch-Button .DocSearch-Search-Icon,
.DocSearch-Button-Placeholder {
  color: rgba(0, 0, 0, 0.6);
}
</style>
