<template>
  <div
    ref="selectRef"
    class="layui-unselect layui-form-select"
    :class="{ 'layui-form-selected': openState }"
  >
    <div class="layui-select-title" @click="open">
      <input
        type="text"
        :placeholder="
          selectItem.value !== null &&
          Array.isArray(selectItem.value) &&
          selectItem.value.length > 0
            ? ''
            : emptyMessage ?? placeholder
        "
        :disabled="disabled"
        readonly
        :value="
          !selectItem.multiple && selectItem.value !== null
            ? selectItem.label
            : null
        "
        :name="name"
        :class="[
          'layui-input',
          'layui-unselect',
          { 'layui-disabled': disabled },
        ]"
      />
      <i :class="['layui-edge', { 'layui-disabled': disabled }]" />
      <!-- 多选 -->
      <div
        v-if="selectItem.multiple && Array.isArray(selectItem.label)"
        class="layui-multiple-select-row"
      >
        <div class="layui-multiple-select-badge">
          <template v-for="(item, index) in selectItem.label" :key="index">
            <lay-badge theme="green">
              <span>{{ item }}</span>
              <i
                :class="['layui-icon', { 'layui-icon-close': true }]"
                v-if="
                  !disabled &&
                  !(
                    Array.isArray(selectItem.value) &&
                    selectItem.value.length > 0 &&
                    disabledItemMap[selectItem.value[index]]
                  )
                "
                @click="
                  removeItemHandle($event, {
                    label: item,
                    value: Array.isArray(selectItem.value)
                      ? selectItem.value[index]
                      : null,
                  })
                "
              >
              </i>
            </lay-badge>
          </template>
        </div>
      </div>
    </div>
    <dl class="layui-anim layui-anim-upbit">
      <!-- 多选不支持空提示 -->
      <template v-if="!multiple && showEmpty">
        <lay-select-option
          :value="null"
          :label="emptyMessage ?? placeholder"
        ></lay-select-option>
      </template>
      <slot />
    </dl>
  </div>
</template>

<script setup name="LaySelect" lang="ts">
import "./index.less";
import LaySelectOption from "../selectOption/index.vue";
import {
  defineProps,
  provide,
  isProxy,
  ref,
  watch,
  computed,
  reactive,
  toRefs,
  Ref,
} from "vue";
import { useClickOutside } from "@layui/hooks-vue";
import { SelectItem } from "../type";

const selectRef = ref<null | HTMLElement>(null);
const isClickOutside = useClickOutside(selectRef);

watch(isClickOutside, () => {
  if (isClickOutside.value) {
    openState.value = false;
  }
});

const props = withDefaults(
  defineProps<{
    modelValue?: string | number | [] | null;
    name?: string;
    placeholder?: string;
    disabled?: boolean;
    showEmpty?: boolean;
    emptyMessage?: string;
    multiple?: boolean;
  }>(),
  {
    modelValue: null,
    placeholder: "请选择",
    disabled: false,
    showEmpty: true,
    multiple: false,
  }
);

const openState = ref(false);

const open = function () {
  // 禁用
  if (props.disabled) {
    openState.value = false;
    return;
  }
  openState.value = !openState.value;
};

const emit = defineEmits(["update:modelValue", "change"]);
const selectItem = ref<SelectItem>({
  value: !props.multiple
    ? props.modelValue
    : props.modelValue
    ? ([] as any[]).concat(props.modelValue)
    : [],
  label: props.multiple ? [] : null,
  multiple: props.multiple,
} as SelectItem);

watch(
  () => selectItem.value.value,
  (val) => {
    emit("update:modelValue", val);
    emit("change", val);
  },
  {
    deep: true,
  }
);

watch(
  () => props.modelValue,
  (value) => {
    selectItem.value.value = value;
    if (!value && value !== 0) {
      props.multiple && (selectItem.value.value = []);
      selectItem.value.label = props.multiple ? [] : null;
    }
  }
);

// 禁止操作子项
const disabledItemMap: { [key: string | number]: boolean } = {};
const selectItemHandle = function (
  _selectItem: SelectItem,
  isChecked?: boolean
) {
  if (!props.multiple) {
    openState.value = false;
  }
  disabledItemMap[_selectItem.value as string | number] =
    _selectItem.disabled as boolean;
  if (typeof isChecked !== "boolean") {
    props.multiple
      ? (selectItem.value.label as any[]).push(_selectItem.label)
      : (selectItem.value.label = _selectItem.label);
    return;
  }
  let values = selectItem.value.value;
  if (props.multiple && Array.isArray(values)) {
    const _values = values as any[];
    const _labels = selectItem.value.label as any[];
    if (isChecked) {
      _values.push(_selectItem.value);
      _labels.push(_selectItem.label);
    } else {
      _values.splice(_values.indexOf(_selectItem.value), 1);
      _labels.splice(_labels.indexOf(_selectItem.label), 1);
    }
    selectItem.value.value = _values;
    selectItem.value.label = _labels;
  } else {
    selectItem.value.value = _selectItem.value;
    selectItem.value.label = _selectItem.label;
  }
};

const removeItemHandle = function (e: MouseEvent, _selectItem: SelectItem) {
  e.stopPropagation();
  selectItemHandle(_selectItem, false);
};

provide("selectItemHandle", selectItemHandle);
provide("selectItem", selectItem);
</script>
