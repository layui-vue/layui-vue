<script lang="ts">
export default {
  name: "LaySelectOption",
};
</script>

<script setup lang="ts">
import LayCheckbox from "../checkbox/index.vue";
import { computed, ComputedRef, inject, WritableComputedRef, Ref } from "vue";

export interface LaySelectOptionProps {
  label: string;
  value: string | object;
  disabled?: boolean;
  keyword?: string;
}

const props = withDefaults(defineProps<LaySelectOptionProps>(), {
  disabled: false,
  keyword: "",
  label: "",
});

const selectedValue: WritableComputedRef<any> = inject("selectedValue") as WritableComputedRef<any>;
const searchValue: Ref<string> = inject("searchValue") as Ref<string>;
const multiple: ComputedRef = inject("multiple") as ComputedRef;

const handleSelect = () => {
  if (!multiple.value) {
    selectedValue.value = props.value;
  }
};

const selected = computed(() => {
  if (multiple.value) {
    return selectedValue.value.indexOf(props.value) != -1;
  } else {
    return selectedValue.value === props.value;
  }
});

const display = computed(() => {
  return (
    props.keyword.indexOf(searchValue.value) > -1 ||
    props.label.indexOf(searchValue.value) > -1
  );
});
</script>

<template>
  <dd
    v-show="display"
    :class="['layui-select-option', { 'layui-this': selected && !multiple }]"
    @click="handleSelect"
  >
    <template v-if="multiple">
      <lay-checkbox
        v-model="selectedValue"
        :value="value"
        skin="primary"
      ></lay-checkbox>
    </template>
    <slot>{{ label }}</slot>
  </dd>
</template>
