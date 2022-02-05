<script lang="ts">
export default {
  name: "LayField"
}
</script>

<script setup lang="ts">
import { useSlots } from "vue";

const slot = useSlots();

const props = defineProps<{
  title?: string;
}>();
</script>

<template>
  <fieldset v-if="slot.default" class="layui-elem-field">
    <legend>{{ title }}</legend>
    <div class="layui-field-box">
      <slot></slot>
    </div>
  </fieldset>

  <fieldset v-else class="layui-elem-field layui-field-title">
    <legend>
      <a name="docend">{{ title }}</a>
    </legend>
  </fieldset>
</template>