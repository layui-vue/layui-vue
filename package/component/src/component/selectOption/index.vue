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
  onMounted,
} from "vue";

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

const selectedItem: Ref<any> = inject("selectedItem") as Ref<any>;
const openState: Ref<boolean> = inject("openState") as Ref<boolean>;
const selectedValue: WritableComputedRef<any> = inject(
  "selectedValue"
) as WritableComputedRef<any>;
const searchValue: Ref<string> = inject("searchValue") as Ref<string>;
const multiple: ComputedRef = inject("multiple") as ComputedRef;

const handleSelect = () => {
  if (!multiple.value && !props.disabled) {
    openState.value = false;
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
  const info = {
    label: props.label,
    value: props.value,
    dispabled: props.disabled,
    keyword: props.keyword,
  };

  if (multiple.value) {
    if (Array.isArray(selectedItem.value)) {
      if (notChecked.value) selectedItem.value.push(info);
    } else {
      selectedItem.value = [info];
    }
  } else {
    selectedItem.value = info;
  }
};

const display = computed(() => {
  return (
    props.keyword.indexOf(searchValue.value) > -1 ||
    props.label.indexOf(searchValue.value) > -1
  );
});

const notChecked = computed(() => {
  return (
    selectedItem.value.find((item: any) => {
      return item.value === props.value;
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
