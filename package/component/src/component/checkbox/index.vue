<script lang="ts">
export default {
  name: "LayCheckbox",
};
</script>

<script setup lang="ts">
import { LayIcon } from "@layui/icons-vue";
import { computed, inject } from "vue";
import "./index.less";

export interface LayCheckboxProps {
  name?: string;
  skin?: string;
  label: string | object;
  isIndeterminate?: boolean;
  modelValue?: boolean | Array<string | object>;
  disabled?: boolean;
}

const props = withDefaults(defineProps<LayCheckboxProps>(), {
  isIndeterminate: false,
  modelValue: false,
  disabled: false,
});

const checkboxGroup: any = inject("checkboxGroup", {});

const isGroup = computed(() => {
  return (
    checkboxGroup != undefined && checkboxGroup?.name === "LayCheckboxGroup"
  );
});

const emit = defineEmits(["update:modelValue", "change"]);

const isChecked = computed({
  get() {
    if (isGroup.value) {
      return checkboxGroup.modelValue.value.includes(props.label);
    } else {
      if (Array.isArray(props.modelValue)) {
        return props.modelValue.includes(props.label);
      } else {
        return props.modelValue;
      }
    }
  },
  set(val) {
    if (isGroup.value) {
      setGroupModelValue(val);
    } else {
      if (Array.isArray(props.modelValue)) {
        setArrayModelValue(val);
      } else {
        emit("change", val);
        emit("update:modelValue", val);
      }
    }
  },
});

const arrayModelValue = computed(() => {
  if (Array.isArray(props.modelValue)) {
    return [...props.modelValue];
  } else {
    return [];
  }
});

const setGroupModelValue = function (checked: any) {
  let groupModelValue = [...checkboxGroup.modelValue.value];
  if (!checked) {
    groupModelValue.splice(groupModelValue.indexOf(props.label), 1);
  } else {
    groupModelValue.push(props.label);
  }
  checkboxGroup.modelValue.value = groupModelValue;
};

const setArrayModelValue = function (checked: any) {
  let arr = [...arrayModelValue.value];
  if (!checked) {
    arr.splice(arr.indexOf(props.label), 1);
  } else {
    arr.push(props.label);
  }
  emit("change", arr);
  emit("update:modelValue", arr);
};

const handleClick = function () {
  if (!props.disabled) {
    isChecked.value = !isChecked.value;
  }
};
</script>

<template>
  <span @click.stop="handleClick" class="layui-checkbox">
    <input type="checkbox" :name="name" :value="label" />
    <div
      class="layui-unselect layui-form-checkbox"
      :class="{
        'layui-checkbox-disabled layui-disabled': disabled,
        'layui-form-checked': isChecked,
      }"
      :lay-skin="skin"
    >
      <span v-if="$slots?.default"><slot></slot></span>
      <lay-icon
        :type="
          props.isIndeterminate && isChecked
            ? 'layui-icon-subtraction'
            : isChecked
            ? 'layui-icon-ok'
            : ''
        "
      ></lay-icon>
    </div>
  </span>
</template>
