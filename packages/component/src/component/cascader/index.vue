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
          :check-strictly="_checkStrictly"
          @update:model-value="
            (selectKeys: string[] | string) => {
              _selectKeys = selectKeys;
              if (!_multiple) dropdownRef.hide();
              emit('update:modelValue', _selectKeys);
            }
          "
          @update:states="
            ({ selectKeys, selectLabel }) => {
              emit('update:modelValue', selectKeys);
            }
          "
          @update:multiple-select-item="
            ({ selectKeys, selectLabel }) => {
              _selectKeys = selectKeys;
              emit('update:modelValue', _selectKeys);
            }
          "
          @select-item="
            ({ index, value, selectKeys, selectLabel }) => {
              if (props.changeOnSelect) {
                _selectKeys = selectKeys;
                emit('update:modelValue', _selectKeys);
              }
            }
          "
          :lazy="props.load"
        >
          <template v-for="(_, key) in slots" :key="key" #[key]>
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
import "./index.less";
import LayInput from "../input/index.vue";
import LayDropdown from "../dropdown/index.vue";
import { ref, useSlots, StyleValue, computed, watch } from "vue";
import { CascaderSize } from "./interface";
import useProps from "./index.hooks";
import {
  CascaderPanelItemProps,
  CascaderPanelLazyloadFunction,
} from "../cascaderPanel/interface";
import useCascaderPanel from "../cascaderPanel/index.hook";

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
  checkStrictly?: boolean;
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
  load: () => {},
  checkStrictly: false,
});

const hasContent = computed(
  () => props.modelValue != "" && props.modelValue != null
);
const { size } = useProps(props);
const emit = defineEmits(["update:modelValue", "change", "clear"]);

const slots = useSlots();
const dropdownRef = ref();
const openState = ref(false);

const _innerProcess = computed(() =>
  useCascaderPanel({
    modelValue: props.modelValue,
    data: props.options,
    multiple: _multiple.value,
    replaceFields: _replaceFields.value,
    decollator: _decollator.value,
    onlyLastLevel: _onlyLastLevel.value,
    checkStrictly: _checkStrictly.value,
  })
);
const _dataSource = ref(props.options);
const _multiple = ref(props.multiple);
const _decollator = ref(props.decollator);
const _onlyLastLevel = ref(props.onlyLastLevel);
const _disabled = ref(props.disabled);
const _checkStrictly = ref(props.checkStrictly);
const _replaceFields = ref({
  label: props.replaceFields?.label ?? "label",
  value: props.replaceFields?.value ?? "value",
  children: props.replaceFields?.children ?? "children",
});
const _selectKeys = ref<string | Array<string>>(
  _innerProcess.value.selectKeys.value
);
const _displayValue = computed(() => _innerProcess.value.selectLabel.value);

const onClear = () => {
  _selectKeys.value = [];
  emit("update:modelValue", null);
  emit("clear");
};

watch(
  () => props.modelValue,
  () => (_selectKeys.value = _innerProcess.value.selectKeys.value)
);
</script>
