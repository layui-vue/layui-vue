<script lang="ts">
export default {
  name: "LaySelectOption",
};
</script>

<script setup lang="ts">
import LayCheckbox from "../checkbox/index.vue";
import {
  computed,
  ComputedRef,
  inject,
  WritableComputedRef,
  Ref,
  ref,
} from "vue";

export interface SelectOptionProps {
  label?: string;
  value: string | number | object;
  disabled?: boolean;
  keyword?: string;
}

const props = withDefaults(defineProps<SelectOptionProps>(), {
  disabled: false,
  keyword: "",
  label: "",
});

const searchValue: Ref<string> = inject("searchValue") as Ref<string>;
const selectRef: Ref<HTMLElement> = inject("selectRef") as Ref<HTMLElement>;
const searchMethod: Function = inject("searchMethod") as Function;
const selectedValue: WritableComputedRef<any> = inject(
  "selectedValue"
) as WritableComputedRef<any>;
const multiple: ComputedRef = inject("multiple") as ComputedRef;
const checkboxRef = ref<HTMLElement>();

const handleSelect = () => {
  if (multiple.value) {
    if (!props.disabled) {
      // @ts-ignore
      checkboxRef.value?.toggle();
    }
  } else {
    if (!props.disabled) {
      // @ts-ignore
      selectRef.value.hide();
      selectedValue.value = props.value;
    }
  }
};

const selected = computed(() => {
  if (multiple.value) {
    return selectedValue.value.indexOf(props.value) != -1;
  } else {
    return selectedValue.value === props.value;
  }
});

const first = ref(true);

const display = computed(() => {
  if (searchMethod && !first.value) {
    return searchMethod(searchValue.value, props);
  }
  first.value = false;
  return (
    props.keyword?.toString().indexOf(searchValue.value) > -1 ||
    props.label?.toString().indexOf(searchValue.value) > -1
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
      <lay-checkbox
        skin="primary"
        ref="checkboxRef"
        v-model="selectedValue"
        :disabled="disabled"
        :value="value"
      ></lay-checkbox>
    </template>
    <slot>{{ label }}</slot>
  </dd>
</template>
