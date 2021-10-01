<template>
  <fieldset class="layui-elem-field">
    <legend>{{title}}</legend>
    <div class="layui-field-box">
      <slot></slot>
    </div>
  </fieldset>
</template>

<script setup name="LayField" lang="ts">
const props =
  defineProps<{
    title?: string
  }>()
</script>
