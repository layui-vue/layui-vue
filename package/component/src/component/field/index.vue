<script setup lang="ts">
import "./index.less";
import { useSlots } from "vue";

export interface FieldProps {
  title?: string;
}

defineOptions({
  name: "LayField",
});

const slot = useSlots();
const props = defineProps<FieldProps>();
</script>

<template>
  <fieldset v-if="slot.default" class="layui-field">
    <legend>
      <slot name="title">
        {{ title }}
      </slot>
    </legend>
    <div class="layui-field-box">
      <slot></slot>
    </div>
  </fieldset>
  <fieldset v-else class="layui-field layui-field-title">
    <legend>
      <a name="docend">
        <slot name="title">
          {{ title }}
        </slot>
      </a>
    </legend>
  </fieldset>
</template>
