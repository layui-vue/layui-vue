<template>
  <div id="docsearch"></div>
</template>

<script setup name="LaySelect" lang="ts">
import docsearch from "@docsearch/js";
import { onMounted } from "vue";
import "@docsearch/css";

onMounted(() => {
  docsearch({
    container: "#docsearch",
    appId: "R2IYF7ETH7",
    apiKey: "599cec31baffa4868cae4e79f180729b",
    indexName: "docsearch",
  });
});
</script>

<style>

.DocSearch-Button {
  outline: none;
  box-shadow:var(--docsearch-searchbox-shadow)
}

.DocSearch-Button .DocSearch-Search-Icon,
.DocSearch-Button-Placeholder {
  color: whitesmoke;
}

:root {

  --docsearch-primary-color: var(--global-primary-color) ;
  --docsearch-searchbox-background: transparent;
  --docsearch-searchbox-focus-background: transparent;
  --docsearch-logo-color: var(--global-primary-color);
}
</style>
