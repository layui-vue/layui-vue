<script lang="ts">
export default {
  name: "LayField",
};
</script>

<script setup lang="ts">
import "./index.less";
import { useSlots } from "vue";

const slot = useSlots();

export interface LayFieldProps {
  title?: string;
}

const props = defineProps<LayFieldProps>();
</script>

<template>
  <fieldset v-if="slot.default" class="layui-field">
    <legend>{{ title }}</legend>
    <div class="layui-field-box">
      <slot></slot>
    </div>
  </fieldset>

  <fieldset v-else class="layui-field layui-field-title">
    <legend>
      <a name="docend">{{ title }}</a>
    </legend>
  </fieldset>
</template>
