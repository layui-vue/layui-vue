<script setup lang="ts">
import { inject, computed } from "vue";
import { DATE_PICKER_CONTEXT, type Shortcuts } from "../../interface";

import { isValueArray } from "../../../../utils";

const emits = defineEmits<{
  (e: "change-shortcut", shortcut: Shortcuts): void;
}>();
const DatePickerContext = inject(DATE_PICKER_CONTEXT)!;

const shortcuts = computed<Shortcuts[]>(() => {
  return DatePickerContext.shortcuts || [];
});

const ChangeShortcut = (shortcut: Shortcuts) => {
  emits("change-shortcut", shortcut);
};
</script>

<template>
  <ul class="layui-laydate-shortcut" v-if="isValueArray(shortcuts)">
    <li
      v-for="(shortcut, index) in shortcuts"
      :key="index"
      @click="ChangeShortcut(shortcut)"
    >
      {{ shortcut.text }}
    </li>
  </ul>
</template>
