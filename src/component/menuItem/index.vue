<script lang="ts">
export default {
  name: "LayMenuItem",
};
</script>

<script setup lang="ts">
import { inject, Ref, useSlots } from "vue";

export interface LayMenuItemProps {
  id: string;
  title?: string;
}

const slots = useSlots();
const props = defineProps<LayMenuItemProps>();
const selectedKey: Ref<string> = inject("selectedKey") as Ref<string>;
const selectHandle = function () {
  selectedKey.value = props.id;
};
</script>

<template>
  <li
    class="layui-nav-item"
    :class="[selectedKey === id ? 'layui-this' : '']"
    @click="selectHandle()"
  >
    <a href="javascript:void(0)">
      <i v-if="slots.icon">
        <slot name="icon"></slot>
      </i>
      <span v-if="slots.title">
        <slot name="title"></slot>
      </span>
      <span v-else>
        <slot></slot>
      </span>
    </a>
  </li>
</template>
