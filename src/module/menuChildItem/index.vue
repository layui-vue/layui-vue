<template>
  <dd :class="[selectedKey === id ? 'layui-this' : '']" @click="selectHandle()">
    <slot v-if="slots.title" name="title"></slot>
    <a v-else href="javascript:void(0)">
      {{ title }}
    </a>
  </dd>
</template>

<script setup name="LayMenuChildItem" lang="ts">
import { defineProps, inject, Ref, useSlots } from "vue";

const slots = useSlots();

const props = defineProps<{
  id: string;
  title: string;
}>();

const selectedKey: Ref<string> = inject("selectedKey") as Ref<string>;

const selectHandle = function () {
  selectedKey.value = props.id;
};
</script>
