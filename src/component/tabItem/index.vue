<script lang="ts">
export default {
  name: "LayTabItem",
};
</script>

<script setup lang="ts">
import { withDefaults, inject, Ref } from "vue";

export interface LayTabItemProps {
  id: string;
  title: string;
  closable?: boolean | string;
}

const props = withDefaults(defineProps<LayTabItemProps>(), {
  closable: true,
});

const active = inject("active");
const slotsChange: Ref<boolean> = inject("slotsChange") as Ref<boolean>;
slotsChange.value = !slotsChange.value;
</script>

<template>
  <div class="layui-tab-item" :class="[active === id ? 'layui-show' : '']">
    <slot></slot>
  </div>
</template>
