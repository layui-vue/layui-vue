<script setup lang="ts">
import type { Shortcuts } from "../../interface";
import { computed, inject } from "vue";

import { isValueArray } from "../../../../utils";
import { DATE_PICKER_CONTEXT } from "../../interface";

const emits = defineEmits<{
  (e: "change-shortcut", shortcut: Shortcuts): void;
}>();
const DatePickerContext = inject(DATE_PICKER_CONTEXT)!;

const shortcuts = computed<Shortcuts[]>(() => {
  return DatePickerContext.shortcuts || [];
});

function ChangeShortcut(shortcut: Shortcuts) {
  emits("change-shortcut", shortcut);
}
</script>

<template>
  <ul v-if="isValueArray(shortcuts)" class="layui-laydate-shortcut">
    <li
      v-for="(shortcut, index) in shortcuts"
      :key="index"
      @click="ChangeShortcut(shortcut)"
    >
      {{ shortcut.text }}
    </li>
  </ul>
</template>
