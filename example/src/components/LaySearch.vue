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
    appId: "Y8NT7MICRP",
    apiKey: "fb23e7bbc001828e56c50d66e6be26b2",
    indexName: "indexName",
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
