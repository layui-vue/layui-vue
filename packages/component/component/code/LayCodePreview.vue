<template>
  <iframe
    v-if="lang == 'html'"
    class="layui-code-iframe"
    :srcdoc="code"
  ></iframe>
  <div v-else class="layui-code-preview">{{ props.code }}</div>
</template>

<script setup lang="ts">
defineOptions({
  name: "LayCodePreview",
});

const props = withDefaults(
  defineProps<{
    code?: string;
    lang?: string;
  }>(),
  {
    code: "",
    lang: "html",
  }
);
</script>

<style>
.layui-code-iframe {
  border: 0;
  width: 100%;
  border: 1px solid #eaeaea;
  margin: none;
}

.layui-code-preview {
  padding: 12px;
  width: 100%;
  border: 1px solid #eaeaea;
  line-height: 24px;
  white-space: pre;
}
</style>
