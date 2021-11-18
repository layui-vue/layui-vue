<script lang="ts">
export default {
  name: "LayCheckbox",
};
</script>

<script setup name="LayCheckbox" lang="ts">
import { computed, defineProps, inject } from "vue";
import "./index.less";

export interface LayCheckboxProps {
  name?: string;
  skin?: string;
  label?: string;
  modelValue?: boolean;
  disabled?: boolean;
}

const props = withDefaults(defineProps<LayCheckboxProps>(), {
  modelValue: false,
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
      return props.modelValue;
    }
  },
  set(val) {
    if (isGroup.value) {
      setModelValue(val);
    }
    emit("change", val);
    emit("update:modelValue", val);
  },
});

const setModelValue = function (checked: any) {
  let groupModelValue = [...checkboxGroup.modelValue.value];
  if (!checked) {
    groupModelValue.splice(groupModelValue.indexOf(props.label), 1);
  } else {
    groupModelValue.push(props.label);
  }
  checkboxGroup.modelValue.value = groupModelValue;
};

const handleClick = function () {
  if (!props.disabled) {
    isChecked.value = !isChecked.value;
  }
};
</script>

<template>
  <span @click.stop="handleClick">
    <input type="checkbox" :name="name" :value="label" />
    <div
      class="layui-unselect layui-form-checkbox"
      :class="{
        'layui-checkbox-disbaled layui-disabled': disabled,
        'layui-form-checked': isChecked,
      }"
      :lay-skin="skin"
    >
      <span v-if="$slots?.default"><slot /></span>
      <i class="layui-icon layui-icon-ok" />
    </div>
  </span>
</template>