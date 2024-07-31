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
          :readonly="!search"
          :size="size"
          @clear="onClear"
          @input="handleInputSearch"
        ></lay-input>
        <lay-tag-input
          v-model="_displayValue"
          @clear="onClear"
          @remove="onRemove"
          :placeholder="placeholder"
          :allow-clear="true"
          :disabled="disabled"
          :readonly="!search"
          v-model:input-value="_searchValue"
          @update:input-value="handleInputSearch"
          @keyup.delete.capture.prevent.stop
          v-else
        ></lay-tag-input>
      </div>

      <template #content>
        <lay-cascader-panel
          v-show="!_isSearching"
          :options="_dataSource"
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
          :lazy="props.lazy"
          :load="props.load"
          :changeOnSelect="_changeOnSelect"
          :fullpath="props.fullpath"
        >
          <template v-for="(_, key) in slots" :key="key" #[key]>
            <template v-if="key != 'default'">
              <slot :name="key"></slot>
            </template>
          </template>
        </lay-cascader-panel>
        <div v-show="_isSearching">
          <lay-scroll height="200px" class="layui-cascader-search-result-list">
            <template v-if="_matchedList.length > 0">
              <div
                :class="[
                  'layui-cascader-search-result-item',
                  {
                    'layui-cascader-search-result-item-active':
                      _selectKeys.includes(item.value),
                  },
                ]"
                v-for="(item, i) in _matchedList"
                :key="i"
                @click="clickCheckItem(item)"
              >
                {{ buildFullPath(item) }}
              </div>
            </template>
            <template v-else>
              <lay-empty class="layui-cascader-empty"></lay-empty>
            </template>
          </lay-scroll>
        </div>
      </template>
    </lay-dropdown>
  </div>
</template>

<script setup lang="ts">
import "./index.less";
import LayDropdown from "../dropdown/index.vue";
import LayTagInput from "../tagInput/index.vue";
import { ref, useSlots, computed, watch, Ref, provide } from "vue";
import { CascaderProps } from "./interface";
import {
  CascaderPanelItemProps,
  CascaderPanelItemPropsInternal,
} from "../cascaderPanel/interface";
import useProps from "./index.hooks";
import { CASCADER_CONTEXT_KEY } from "./cascader";
import useCascaderPanel from "../cascaderPanel/index.hook";

defineOptions({
  name: "LayCascader",
});

const props = withDefaults(defineProps<CascaderProps>(), {
  options: undefined,
  modelValue: "",
  decollator: "/",
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
  load: undefined,
  checkStrictly: false,
  fullpath: true,
});

const _context = useCascaderPanel({
  ...props,
});
provide(CASCADER_CONTEXT_KEY, _context);

const hasContent = computed(
  () => props.modelValue !== "" && props.modelValue !== null
);
const { size } = useProps(props);
const emit = defineEmits(["update:modelValue", "change", "clear"]);

const slots = useSlots();
const dropdownRef = ref();
const openState = ref(false);
const _isSearching = ref(false);
const _searchValue = ref("");
const _matchedList: Ref<Array<CascaderPanelItemPropsInternal>> = ref([]);
const _innerProcess = computed(() => _context);
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
const _selectKeys = ref<Array<string>>(_innerProcess.value.selectKeys.value);
const _displayValue = computed({
  get: () => _innerProcess.value.selectLabel.value,
  set: (v) => {},
});
const _changeOnSelect = ref(props.changeOnSelect);

const doSearchValue = (str: string) =>
  (props.search &&
    props.searchMethod &&
    _innerProcess.value.sanitizer(props.searchMethod(str), undefined)) ||
  _innerProcess.value.flatData.value.filter(
    (a: CascaderPanelItemPropsInternal) => a.label.includes(str)
  );

/**
 * 清空内容
 */
const onClear = () => {
  _innerProcess.value.multipleSelectItem.value.forEach(
    (a) => (a.checked = a.indeterminate = false)
  );
  _innerProcess.value.buildMultipleStatus();
  _innerProcess.value.multipleSelectItem.value.clear();
  _innerProcess.value.selectKeys.value = [];
  emit("update:modelValue", _multiple.value ? [] : undefined);
  emit("clear");
};
/**
 * 删除单个 Tag
 * @param value Tag的Label路径
 */
const onRemove = (value: string, e: KeyboardEvent) => {
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
  obj!.checked = obj!.indeterminate = false;
  _innerProcess.value.multipleSelectItem.value.delete(obj!.value);
  _innerProcess.value.buildMultipleStatus();
  emit("update:modelValue", _selectKeys.value);
  dropdownRef.value.hide();
};

const _updateValue = (selectKeys: string[] | string) => {
  _innerProcess.value.selectKeys.value =
    typeof selectKeys === "string"
      ? selectKeys.split(props.decollator)
      : selectKeys;
  if (!_multiple.value) dropdownRef.value.hide();

  let output =
    typeof props.modelValue === "string"
      ? typeof selectKeys === "string"
        ? selectKeys
        : selectKeys.join(props.decollator)
      : selectKeys;
  emit("update:modelValue", output);
};

const _updateMultipleSelectItem = (
  map: Map<string, CascaderPanelItemProps>
) => {
  emit("update:modelValue", Array.from(map.keys()));
};

const _onChange = (selectKeys: string[] | string) => {
  emit("update:modelValue", selectKeys);
};

const clickCheckItem = (item: CascaderPanelItemPropsInternal) => {
  if (_checkStrictly.value) {
    if (!_selectKeys.value.includes(item.value))
      (_selectKeys.value as Array<string>).push(item.value);
    else
      (_selectKeys.value as Array<string>).splice(
        _selectKeys.value.indexOf(item.value),
        1
      );
    emit("update:modelValue", _selectKeys.value);
  } else {
    let obj: CascaderPanelItemPropsInternal | undefined = item;
    const leafs: Array<CascaderPanelItemPropsInternal> = [];
    const onlyLeaf = (item: CascaderPanelItemPropsInternal) => {
      if (item.children?.length) {
        item.children.forEach((a) => onlyLeaf(a));
      } else {
        leafs.push(item);
      }
    };
    onlyLeaf(obj);
    leafs.forEach((a) =>
      _selectKeys.value.includes(a.value)
        ? (_selectKeys.value as Array<string>).splice(
            _selectKeys.value.indexOf(a.value),
            1
          )
        : (_selectKeys.value as Array<string>).push(a.value)
    );
    emit("update:modelValue", _selectKeys.value);
  }
};

const buildFullPath = (item: CascaderPanelItemPropsInternal) => {
  let obj: CascaderPanelItemPropsInternal | undefined = item;
  let fullPath = [];
  while (obj) {
    fullPath.push(obj.label);
    obj = obj.parent;
  }
  return fullPath.reverse().join(_decollator.value);
};

const handleInputSearch = (val: string) => {
  _isSearching.value = val.length > 0;
  if (!_isSearching.value) return;
  dropdownRef.value.show();
  _matchedList.value = doSearchValue(val);
};

watch(
  () => props.modelValue,
  () => {
    _innerProcess.value.modelValue.value = props.modelValue;
  }
);
</script>
