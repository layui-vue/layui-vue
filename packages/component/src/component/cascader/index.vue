<template>
  <div
    :size="size"
    :class="[
      {
        'layui-cascader-opend': openState,
        'layui-cascader-disabled': disabled,
        'layui-cascader': true,
        'has-content': hasContent,
        'has-clear': allowClear,
      },
    ]"
  >
    <lay-dropdown
      ref="dropdownRef"
      :trigger="trigger"
      :autoFitMinWidth="false"
      :updateAtScroll="true"
      :disabled="disabled"
      :contentClass="contentClass"
      :contentStyle="contentStyle"
      @show="openState = true"
      @hide="openState = false"
    >
      <lay-input
        v-if="!slots.default"
        v-model="_displayValue"
        suffix-icon="layui-icon-triangle-d"
        :placeholder="placeholder"
        :allow-clear="allowClear"
        :disabled="disabled"
        :readonly="true"
        :size="size"
        @clear="onClear"
      ></lay-input>

      <div class="slot-area" v-else>
        <slot></slot>
      </div>

      <template #content>
        <lay-cascader-panel
          :data="_dataSource"
          :replace-fields="_replaceFields"
          :multiple="_multiple"
          :decollator="_decollator"
          :only-last-level="_onlyLastLevel"
          :disabled="_disabled"
          v-model="_selectKeys"
          @update:model-value="
            ({ selectKeys, selectLabel }) => {
              console.log('onUpdateModelValue', selectKeys, selectLabel);
              _selectKeys = selectKeys;
              _displayValue = selectLabel;
              dropdownRef.hide();
              emit('update:modelValue', _selectKeys);
            }
          "
          @multiple-select-item="
            ({ selectKeys, selectLabel }) => {
              console.log(
                'onUpdateMultipleSelectItem',
                selectKeys,
                selectLabel
              );
              _selectKeys = selectKeys;
              _displayValue = selectLabel.join(decollator);
              emit('update:modelValue', _selectKeys);
            }
          "
          @change="
            ({ index, value, selectKeys, selectLabel }) => {
              console.log('onChange', index, value, selectKeys, selectLabel);
              if (props.changeOnSelect) {
                _selectKeys = selectKeys;
                _displayValue = selectLabel;
                emit('update:modelValue', _selectKeys);
              }
            }
          "
          :lazy="props.load"
        >
          <template v-for="(item, key) in $slots" :key="key" #[key]>
            <template v-if="key != 'default'">
              <slot :name="key"></slot>
            </template>
          </template>
        </lay-cascader-panel>
      </template>
    </lay-dropdown>
  </div>
</template>

<script setup lang="ts">
// TODO 解决初次渲染时未能传递数据到 panel 的问题
// TODO 解决多选时总是重置悬浮窗的问题

import "./index.less";
import LayInput from "../input/index.vue";
import LayDropdown from "../dropdown/index.vue";
import { ref, useSlots, StyleValue, computed, watch, nextTick } from "vue";
import { CascaderSize } from "./interface";
import useProps from "./index.hooks";
import {
  CascaderPanelItemProps,
  CascaderPanelLazyloadFunction,
} from "../cascaderPanel/interface";

export type DropdownTrigger = "click" | "hover" | "focus" | "contextMenu";

export interface CascaderProps {
  options?: Array<CascaderPanelItemProps>;
  modelValue?: string | Array<string>;
  decollator?: string;
  placeholder?: string;
  onlyLastLevel?: boolean;
  disabled?: boolean;
  replaceFields?: { label?: string; value?: string; children?: string };
  allowClear?: boolean;
  size?: CascaderSize;
  trigger?: DropdownTrigger | DropdownTrigger[];
  contentClass?: string | Array<string | object> | object;
  contentStyle?: StyleValue;
  changeOnSelect?: boolean;
  multiple?: boolean;
  lazy?: boolean;
  load?: CascaderPanelLazyloadFunction;
}

defineOptions({
  name: "LayCascader",
});

const props = withDefaults(defineProps<CascaderProps>(), {
  options: undefined,
  modelValue: "",
  decollator: " / ",
  placeholder: "",
  onlyLastLevel: false,
  allowClear: false,
  disabled: false,
  trigger: () => ["click"],
  changeOnSelect: false,
  replaceFields: () => ({
    label: "label",
    value: "value",
    children: "children",
  }),
  multiple: false,
  lazy: false,
  load: (_, resolve) => resolve([]),
});

const hasContent = computed(
  () => props.modelValue != "" && props.modelValue != null
);
const { size } = useProps(props);
const emit = defineEmits(["update:modelValue", "change", "clear"]);

const slots = useSlots();
const dropdownRef = ref();
// const cascaderPanelRef = ref();
const openState = ref(false);

const _selectKeys = ref<string | Array<string>>(
  typeof props.modelValue === "string"
    ? props.modelValue.split(props.decollator)
    : props.modelValue
);
const _displayValue = ref<string | Array<string>>("");
const _dataSource = ref(props.options);
const _multiple = ref(props.multiple);
const _decollator = ref(props.decollator);
const _onlyLastLevel = ref(props.onlyLastLevel);
const _disabled = ref(props.disabled);
const _replaceFields = ref({
  label: props.replaceFields?.label ?? "label",
  value: props.replaceFields?.value ?? "value",
  children: props.replaceFields?.children ?? "children",
});

const onClear = () => {
  _selectKeys.value = [];
  emit("update:modelValue", null);
  emit("clear");
};

watch(
  () => props.modelValue,
  () => {
    _selectKeys.value =
      typeof props.modelValue === "string"
        ? props.modelValue.split(props.decollator)
        : props.modelValue;
  }
);
</script>
