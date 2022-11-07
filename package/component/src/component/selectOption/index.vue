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
  onMounted
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
const selectedValue: WritableComputedRef<any> = inject(
  "selectedValue"
) as WritableComputedRef<any>;
const multiple: ComputedRef = inject("multiple") as ComputedRef;

const handleSelect = () => {
  if (!multiple.value && !props.disabled) {
    // @ts-ignore
    selectRef.value.hide();
    selectedValue.value = props.value;
    select();
  }
};

const selected = computed(() => {
  if (multiple.value) {
    return selectedValue.value.indexOf(props.value) != -1;
  } else {
    return selectedValue.value === props.value;
  }
});

const select = () => {
  if (multiple.value) {
    if (Array.isArray(selectedValue.value)) {
      if (notChecked.value) selectedValue.value.push(props.value);
    } else {
      selectedValue.value = [props.value];
    }
  } else {
    selectedValue.value = props.value;
  }
};

const display = computed(() => {
  return (
    props.keyword?.toString().indexOf(searchValue.value) > -1 ||
    props.label?.toString().indexOf(searchValue.value) > -1
  );
});

const notChecked = computed(() => {
  return (
    selectedValue.value.find((item: any) => {
      return item === props.value;
    }) === undefined
  );
});

onMounted(() => {
  selected.value && select();
});
</script>

<template>
  <dd
    v-show="display"
    :class="[
      'layui-select-option',
      { 'layui-this': selected, 'layui-disabled': disabled },
    ]"
    @click="handleSelect"
  >
    <template v-if="multiple">
      <lay-checkbox
        v-model="selectedValue"
        :disabled="disabled"
        :value="value"
        skin="primary"
      ></lay-checkbox>
    </template>
    <slot>{{ label }}</slot>
  </dd>
</template>
