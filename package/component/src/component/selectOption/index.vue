<script lang="ts">
export default {
  name: "LaySelectOption",
};
</script>

<script setup lang="ts">
import LayCheckbox from "../checkbox/index.vue";
import { computed, ComputedRef, inject, WritableComputedRef } from "vue";

export interface LaySelectOptionProps {
  value: string | object;
  label: string;
  keyword?: string;
  disabled?: boolean;
}

const props = withDefaults(defineProps<LaySelectOptionProps>(), {
  disabled: false,
  keyword: "",
  label: "",
});

const selectedValue: WritableComputedRef<any> = inject("selectedValue") as WritableComputedRef<any>;
const multiple: ComputedRef = inject("multiple") as ComputedRef;

const handleSelect = () => {
  if(!multiple.value) {
    selectedValue.value = props.value;
  }
}

const isSelected = computed(() => {
  if (multiple.value) {
    return selectedValue.value.indexOf(props.value) != -1;
  } else {
    return selectedValue.value === props.value;
  }
});
</script>

<template>
  <dd class="layui-select-option" :class="{ 'layui-this': isSelected && !multiple }" @click="handleSelect">
    <template v-if="multiple">
      <lay-checkbox v-model="selectedValue" :value="value" skin="primary"
        ><slot>{{ label }}</slot></lay-checkbox
      >
    </template>
    <template v-else>
      <slot>{{ label }}</slot>
    </template>
  </dd>
</template>
