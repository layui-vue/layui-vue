<script setup lang="ts">
import type {
  ComputedRef,
  Ref,
  WritableComputedRef,
} from "vue";
import {
  computed,
  inject,
  ref,
} from "vue";
import LayCheckbox from "../checkbox/index.vue";

export interface SelectOptionProps {
  label?: string;
  value: string | number | object;
  disabled?: boolean;
  keyword?: string;
}

defineOptions({
  name: "LaySelectOption",
});
const props = withDefaults(defineProps<SelectOptionProps>(), {
  disabled: false,
  keyword: "",
  label: "",
});

const searchValue: Ref<string> = inject("searchValue") as Ref<string>;
const selectRef: Ref<HTMLElement> = inject("selectRef") as Ref<HTMLElement>;
const searchMethod: Function = inject("searchMethod") as Function;
const selectedValue: WritableComputedRef<any> = inject(
  "selectedValue",
) as WritableComputedRef<any>;
const multiple: ComputedRef = inject("multiple") as ComputedRef;
const checkboxRef = ref<HTMLElement>();

function handleSelect() {
  if (multiple.value) {
    if (!props.disabled) {
      // @ts-expect-error TODO
      checkboxRef.value?.toggle();
    }
  }
  else {
    if (!props.disabled) {
      // @ts-expect-error TODO
      selectRef.value.hide();
      selectedValue.value = props.value;
    }
  }
}

const selected = computed(() => {
  if (multiple.value) {
    return selectedValue.value.includes(props.value);
  }
  else {
    return selectedValue.value === props.value;
  }
});

const first = ref(true);

const display = computed(() => {
  if (searchMethod && !first.value) {
    return searchMethod(searchValue.value, props);
  }
  // eslint-disable-next-line vue/no-side-effects-in-computed-properties
  first.value = false;
  return (
    props.keyword?.toString().includes(searchValue.value)
    || props.label?.toString().includes(searchValue.value)
  );
});

const classes = computed(() => {
  return [
    "layui-select-option",
    {
      "layui-this": selected.value,
      "layui-disabled": props.disabled,
    },
  ];
});
</script>

<template>
  <dd v-show="display" :class="classes" @click="handleSelect">
    <template v-if="multiple">
      <LayCheckbox
        ref="checkboxRef"
        v-model="selectedValue"
        skin="primary"
        :disabled="disabled"
        :value="value"
      />
    </template>
    <slot>{{ label }}</slot>
  </dd>
</template>
