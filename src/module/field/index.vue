<template>

  <fieldset v-if="slot.default" class="layui-elem-field">
    <legend>{{ title }}</legend>
    <div class="layui-field-box">
      <slot />
    </div>
  </fieldset>

  <fieldset v-else class="layui-elem-field layui-field-title">
    <legend><a name="docend">结语</a></legend>
  </fieldset>

</template>

<script setup name="LayField" lang="ts">
import { defineProps, useSlots } from 'vue'

const slot = useSlots()

const props =
  defineProps<{
    title?: string
  }>()
</script>
