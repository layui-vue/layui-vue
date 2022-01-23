<template>
  <div class="layui-tab-item" :class="[active === id ? 'layui-show' : '']">
    <slot></slot>
  </div>
</template>

<script lang="ts">
export default {
  name: "LayTabItem",
};
</script>

<script setup name="LayTabItem" lang="ts">
import { withDefaults, defineProps, inject, Ref } from "vue";

const props = withDefaults(
  defineProps<{
    id: string;
    title: string;
    closable?: boolean | string;
  }>(),
  {
    closable: true,
  }
);

const active = inject("active");
const slotsChange: Ref<boolean> = inject("slotsChange") as Ref<boolean>;
slotsChange.value = !slotsChange.value;
</script>
