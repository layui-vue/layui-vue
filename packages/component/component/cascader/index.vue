<template>
  <div
    :size="size"
    :class="[
      {
        'layui-cascader-opend': openState,
        'layui-cascader-disabled': disabled,
        'layui-cascader': true,
        'layui-cascader-multiple': multiple,
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
      <div class="slot-area" v-if="slots.default">
        <slot name="default"></slot>
      </div>

      <div v-else>
        <lay-input
          v-if="!_multiple"
          v-model="_displayValue"
          suffix-icon="layui-icon-triangle-d"
          :placeholder="placeholder"
          :allow-clear="allowClear"
          :disabled="disabled"
          :readonly="true"
          :size="size"
          @clear="onClear"
        ></lay-input>
        <lay-tag-input
          v-model="_displayValue"
          @clear="onClear"
          @remove="onRemove"
          :placeholder="placeholder"
          :allow-clear="true"
          v-else
        ></lay-tag-input>
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
          @change="_onChange"
          @update:model-value="_updateValue"
          @update:multiple-select-item="_updateMultipleSelectItem"
          :lazy="props.load"
          :changeOnSelect="_changeOnSelect"
          :fullpath="props.fullpath"
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
import LayDropdown from "../dropdown/index.vue";
import LayTagInput from "../tagInput/index.vue";
import { ref, useSlots, computed, watch, onUnmounted } from "vue";
import { CascaderProps } from "./interface";
import {
  CascaderPanelItemProps,
  CascaderPanelItemPropsInternal,
} from "../cascaderPanel/interface";
import useProps from "./index.hooks";
import useCascaderPanel from "../cascaderPanel/index.hook";

defineOptions({
  name: "LayCascader",
});

// FIXME 需要修复多选时，第一层级勾选状态不正确的问题
// FIXME 需要修复样式被覆盖的问题，疑似是json-schema-form/form带来的样式错误？

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
  fullpath: true,
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
    fullpath: props.fullpath,
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
const _displayValue = computed({
  get: () => _innerProcess.value.selectLabel.value,
  set: (v) => {},
});
const _changeOnSelect = ref(props.changeOnSelect);

/**
 * 清空内容
 */
const onClear = () => {
  if (_multiple.value) {
    _innerProcess.value.multipleSelectItem.value.clear();
    emit("update:modelValue", []);
  } else {
    _innerProcess.value.selectKeys.value = [];
    emit("update:modelValue", undefined);
  }
  emit("clear");
};
/**
 * 删除单个 Tag
 * @param value Tag的Label路径
 */
const onRemove = (value: string) => {
  let _k = value.split(_decollator.value);
  const k = _k.shift();
  let obj: CascaderPanelItemPropsInternal | undefined =
    _innerProcess.value.flatData.value.find((a) => a.label === k);
  while (obj && _k.length) {
    const k = _k.shift();
    obj = obj.children?.find((a) => a.label === k);
  }
  if (obj !== undefined)
    _innerProcess.value.selectKeys.value.splice(
      _innerProcess.value.selectKeys.value.findIndex((a) => a === obj!.value),
      1
    );
  emit("update:modelValue", _selectKeys.value);
};

const _updateValue = (selectKeys: string[] | string) => {
  _innerProcess.value.selectKeys.value =
    typeof selectKeys === "string"
      ? selectKeys.split(props.decollator)
      : selectKeys;
  if (!_multiple.value) dropdownRef.value.hide();
  emit("update:modelValue", selectKeys);
};

const _updateMultipleSelectItem = (
  map: Map<string, CascaderPanelItemProps>
) => {
  emit("update:modelValue", Array.from(map.keys()));
};

const _onChange = (selectKeys: string[] | string) => {
  emit("update:modelValue", selectKeys);
};

watch(
  () => props.modelValue,
  () => (_selectKeys.value = _innerProcess.value.selectKeys.value)
);
</script>
