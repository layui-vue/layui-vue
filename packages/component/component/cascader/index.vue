<script setup lang="ts">
import type {
  CascaderPanelItemProps,
  CascaderPanelItemPropsInternal,
} from "@layui/component/component/cascaderPanel/interface";
import type { Ref } from "vue";
import type { CascaderProps } from "./interface";

import useCascaderPanel from "@layui/component/component/cascaderPanel/index.hook";
import LayCascaderPanel from "@layui/component/component/cascaderPanel/index.vue";
import LayDropdown from "@layui/component/component/dropdown/index.vue";
import LayEmpty from "@layui/component/component/empty/index.vue";
import LayInput from "@layui/component/component/input/index.vue";
import LayScroll from "@layui/component/component/scroll/index.vue";
import LayTagInput from "@layui/component/component/tagInput/index.vue";
import { isValueArray } from "@layui/component/utils";
import { LayIcon } from "@layui/icons-vue";
import { computed, nextTick, provide, ref, useSlots, watch } from "vue";
import { CASCADER_CONTEXT_KEY } from "./cascader";
import useProps from "./index.hooks";
import "./index.less";

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
  minCollapsedNum: 3,
  collapseTagsTooltip: true,
});

const emit = defineEmits(["update:modelValue", "change", "clear"]);

const _context = useCascaderPanel(props);

provide(CASCADER_CONTEXT_KEY, _context);

const { size } = useProps(props);
const slots = useSlots();
const dropdownRef = ref();
const openState = ref(false);
const _isSearching = ref(false);
const _searchValue = ref("");
const _matchedList: Ref<Array<CascaderPanelItemPropsInternal>> = ref([]);
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
const _selectKeys = ref<Array<string>>(_context.selectKeys.value);
const _displayValue = computed(() => _context.selectLabel.value);
const _changeOnSelect = ref(props.changeOnSelect);

const hasContent = computed(() =>
  _multiple.value ? isValueArray(props.modelValue) : !!props.modelValue,
);

/**
 * 执行搜索
 * @param str 搜索内容
 */
function doSearchValue(str: string) {
  return (props.search
    && props.searchMethod
    && _context.sanitizer(props.searchMethod(str), undefined))
  || _context.flatData.value.filter((a: CascaderPanelItemPropsInternal) =>
    a.label.includes(str),
  );
}

/**
 * 清空内容
 */
function onClear() {
  _context.multipleSelectItem.value.forEach(
    a => (a.checked = a.indeterminate = false),
  );
  _context.buildMultipleStatus();
  _context.multipleSelectItem.value.clear();
  _context.selectKeys.value = [];
  _selectKeys.value = [];
  emit("update:modelValue", _multiple.value ? [] : undefined);
  emit("clear");
}
/**
 * 删除单个 Tag
 * @param value Tag的Label路径
 */
function onRemove(value: string) {
  const _k = value.split(_decollator.value);
  const k = _k.shift();
  let obj: CascaderPanelItemPropsInternal | undefined
    = _context.flatData.value.find(a => a.label === k);
  while (obj && _k.length) {
    const k = _k.shift();
    obj = obj.children?.find(a => a.label === k);
  }
  if (obj !== undefined) {
    _context.selectKeys.value.splice(
      _context.selectKeys.value.findIndex(a => a === obj!.value),
      1,
    );
  }
  obj!.checked = obj!.indeterminate = false;
  _context.multipleSelectItem.value.delete(obj!.value);
  _context.buildMultipleStatus();
  _selectKeys.value = [..._selectKeys.value.filter(v => v !== obj!.value)];
  emit("update:modelValue", _selectKeys.value);
  dropdownRef.value.hide();
}
/**
 * 更新事件
 * @param selectKeys 选中的keys
 */
function _updateValue(selectKeys: string[] | string) {
  _context.selectKeys.value
    = typeof selectKeys === "string"
      ? selectKeys.split(props.decollator)
      : selectKeys;
  if (!_multiple.value)
    dropdownRef.value.hide();

  const output
    = typeof props.modelValue === "string"
      ? typeof selectKeys === "string"
        ? selectKeys
        : selectKeys.join(props.decollator)
      : selectKeys;
  emit("update:modelValue", output);
}
/**
 * 多选事件
 * @param map 内部状态map
 */
function _updateMultipleSelectItem(map: Map<string, CascaderPanelItemProps>) {
  emit("update:modelValue", Array.from(map.keys()));
}
/**
 * changeOnSelect 事件
 * @param selectKeys 选中的keys
 */
function _onChange(selectKeys: string[] | string) {
  emit("update:modelValue", selectKeys);
}
/**
 * 选中搜索结果中的node
 * @param item 被点击的node
 */
function clickCheckItem(item: CascaderPanelItemPropsInternal) {
  if (_multiple.value) {
    /**
     * 多选且开启了严格模式时，直接把node装入选中的keys中，等待dropdown面板关闭后更新到内部状态中
     */
    if (_checkStrictly.value) {
      if (!_selectKeys.value.includes(item.value)) {
        (_selectKeys.value as Array<string>).push(item.value);
      }
      else {
        (_selectKeys.value as Array<string>).splice(
          _selectKeys.value.indexOf(item.value),
          1,
        );
      }
    }
    else {
      /**
       * 多选且未开启严格模式时，需要判断是否是叶子节点，如果是叶子节点则直接选中，否则需要递归遍历所有叶子节点并选中
       */
      const itemNode: CascaderPanelItemPropsInternal | undefined = item;
      const allNode: Array<CascaderPanelItemPropsInternal> = [];
      const onlyLeaf = (item: CascaderPanelItemPropsInternal) => {
        if (item.children?.length) {
          item.children.forEach(a => onlyLeaf(a));
        }
        else {
          allNode.push(item);
        }
      };
      onlyLeaf(itemNode);
      allNode.forEach((node) => {
        if (_selectKeys.value.includes(node.value)) {
          _selectKeys.value = [
            ..._selectKeys.value.filter(v => v !== node.value),
          ];
        }
        else {
          _selectKeys.value = [..._selectKeys.value, node.value];
        }
      });
    }
  }
  else {
    /**
     * 单选时，根据选择的node来构建路径
     */
    _selectKeys.value = buildFullPath(item, true) as string[];
  }
  emit("update:modelValue", _selectKeys.value);
}
/**
 * 构建路径
 * @param item 当前node
 * @param getVal 是否获取value
 */
function buildFullPath(item: CascaderPanelItemPropsInternal, getVal = false): string[] | string {
  let obj: CascaderPanelItemPropsInternal | undefined = item;
  const fullPath = [];
  while (obj) {
    fullPath.push(getVal ? obj.value : obj.label);
    obj = obj.parent;
  }
  return getVal
    ? fullPath.reverse()
    : fullPath.reverse().join(_decollator.value);
}
/**
 * 处理搜索
 * @param val 输入的内容
 */
function handleInputSearch(val: string) {
  _isSearching.value = val.length > 0;
  if (!_isSearching.value)
    return;
  dropdownRef.value.show();
  _matchedList.value = doSearchValue(val);
}

/**
 * 监听dropdown面板开关
 */
watch(
  () => openState.value,
  (val) => {
    if (!val) {
      // 在这里手工更新内部状态
      if (!_multiple.value && props.search) {
        _context.selectKeys.value = [];
        nextTick(() => {
          _context.selectKeys.value = _context.showKeys.value
            = _selectKeys.value;
        });
      }
      _isSearching.value = false;
      _searchValue.value = "";
    }
  },
);
/**
 * 监听modelValue
 */
watch(
  () => props.modelValue,
  () => {
    _context.modelValue.value = props.modelValue;
  },
);

defineExpose({
  getSelectLabel: _context.selectLabel,
});
</script>

<template>
  <div
    :size="size"
    class="layui-cascader" :class="[
      {
        'layui-cascader-opend': openState,
        'layui-cascader-disabled': disabled,
        'layui-cascader-multiple': multiple,
        'has-content': hasContent,
        'has-clear': allowClear,
      },
    ]"
  >
    <LayDropdown
      ref="dropdownRef"
      :trigger="trigger"
      :auto-fit-min-width="false"
      :disabled="disabled"
      :content-class="contentClass"
      :content-style="contentStyle"
      @show="openState = true"
      @hide="openState = false"
    >
      <div v-if="slots.default" class="slot-area">
        <slot name="default" />
      </div>

      <div v-else>
        <LayInput
          v-if="!_multiple"
          v-model="_displayValue"
          suffix-icon="layui-icon-triangle-d"
          :placeholder="placeholder"
          :title="_displayValue"
          :allow-clear="allowClear"
          :disabled="disabled"
          :readonly="!search"
          :size="size"
          @clear="onClear"
          @input="handleInputSearch"
        >
          <template #suffix>
            <LayIcon
              :class="{ 'is-expand': openState }"
              type="layui-icon-triangle-d"
            />
          </template>
        </LayInput>
        <LayTagInput
          v-else
          v-model="(_displayValue as string[])"
          v-model:input-value="_searchValue"
          :placeholder="placeholder"
          :allow-clear="allowClear"
          :disabled="disabled"
          :readonly="!search"
          :min-collapsed-num="minCollapsedNum"
          :collapse-tags-tooltip="collapseTagsTooltip"
          @update:input-value="handleInputSearch"
          @clear="onClear"
          @remove="onRemove"
          @keyup.delete.capture.prevent.stop
        >
          <template #suffix>
            <LayIcon
              :class="{ 'is-expand': openState }"
              type="layui-icon-triangle-d"
            />
          </template>
        </LayTagInput>
      </div>

      <template #content>
        <LayCascaderPanel
          v-show="!_isSearching"
          v-model="_selectKeys"
          :options="_dataSource"
          :replace-fields="_replaceFields"
          :multiple="_multiple"
          :decollator="_decollator"
          :only-last-level="_onlyLastLevel"
          :disabled="_disabled"
          :check-strictly="_checkStrictly"
          :lazy="props.lazy"
          :load="props.load"
          :change-on-select="_changeOnSelect"
          :fullpath="props.fullpath"
          @change="_onChange"
          @update:model-value="_updateValue"
          @update:multiple-select-item="_updateMultipleSelectItem"
        >
          <template v-for="(_, key) in slots" :key="key" #[key]>
            <template v-if="key !== 'default'">
              <slot :name="key" />
            </template>
          </template>
        </LayCascaderPanel>
        <div v-show="_isSearching">
          <LayScroll height="200px" class="layui-cascader-search-result-list">
            <template v-if="_matchedList.length > 0">
              <div
                v-for="(item, i) in _matchedList" :key="i"
                class="layui-cascader-search-result-item"
                :class="[
                  {
                    'layui-cascader-search-result-item-active': !multiple
                      ? _selectKeys.at(_selectKeys.length - 1) === item.value
                      : _selectKeys.includes(item.value),
                  },
                ]"
                @click="clickCheckItem(item)"
              >
                {{ buildFullPath(item) }}
              </div>
            </template>
            <template v-else>
              <LayEmpty class="layui-cascader-empty" />
            </template>
          </LayScroll>
        </div>
      </template>
    </LayDropdown>
  </div>
</template>
