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
  --docsearch-searchbox-background: rgba(255, 255, 255, 0.05);
  --docsearch-searchbox-focus-background: rgba(255, 255, 255, 0.05);
  --docsearch-container-background: rgba(0, 0, 0, 0.1);
}
</style>
