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
          :title="_displayValue"
          :allow-clear="allowClear"
          :disabled="disabled"
          :readonly="!search"
          :size="size"
          @clear="onClear"
          @input="handleInputSearch"
        >
          <template #suffix>
            <lay-icon
              :class="{ 'is-expand': openState }"
              type="layui-icon-triangle-d"
            ></lay-icon>
          </template>
        </lay-input>
        <lay-tag-input
          v-model="_displayValue"
          v-model:input-value="_searchValue"
          :placeholder="placeholder"
          :allow-clear="allowClear"
          :disabled="disabled"
          :readonly="!search"
          @update:input-value="handleInputSearch"
          @clear="onClear"
          @remove="onRemove"
          @keyup.delete.capture.prevent.stop
          v-else
        >
          <template #suffix>
            <lay-icon
              :class="{ 'is-expand': openState }"
              type="layui-icon-triangle-d"
            ></lay-icon>
          </template>
        </lay-tag-input>
      </div>

      <template #content>
        <lay-cascader-panel
          v-model="_selectKeys"
          v-show="!_isSearching"
          :options="_dataSource"
          :replace-fields="_replaceFields"
          :multiple="_multiple"
          :decollator="_decollator"
          :only-last-level="_onlyLastLevel"
          :disabled="_disabled"
          :check-strictly="_checkStrictly"
          :lazy="props.lazy"
          :load="props.load"
          :changeOnSelect="_changeOnSelect"
          :fullpath="props.fullpath"
          @change="_onChange"
          @update:model-value="_updateValue"
          @update:multiple-select-item="_updateMultipleSelectItem"
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
                    'layui-cascader-search-result-item-active': !multiple
                      ? _selectKeys.at(_selectKeys.length - 1) == item.value
                      : _selectKeys.includes(item.value),
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
import { LayIcon } from "@layui/icons-vue";
import LayDropdown from "../dropdown/index.vue";
import LayInput from "../input/index.vue";
import LayTagInput from "../tagInput/index.vue";
import LayScroll from "../scroll/index.vue";
import LayEmpty from "../empty/index.vue";
import LayCascaderPanel from "../cascaderPanel/index.vue";
import { ref, useSlots, computed, watch, Ref, provide, nextTick } from "vue";
import { CascaderProps } from "./interface";
import {
  CascaderPanelItemProps,
  CascaderPanelItemPropsInternal,
} from "../cascaderPanel/interface";
import useProps from "./index.hooks";
import { CASCADER_CONTEXT_KEY } from "./cascader";
import useCascaderPanel from "../cascaderPanel/index.hook";
import { isValueArray } from "../../utils";

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

const _context = useCascaderPanel(props);

provide(CASCADER_CONTEXT_KEY, _context);

const hasContent = computed(() =>
  _multiple.value ? isValueArray(props.modelValue) : !!props.modelValue
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
/**
 * 执行搜索
 * @param str 搜索内容
 */
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
  _selectKeys.value = [];
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
  _selectKeys.value = [..._selectKeys.value.filter((v) => v !== obj!.value)];
  emit("update:modelValue", _selectKeys.value);
  dropdownRef.value.hide();
};
/**
 * 更新事件
 * @param selectKeys 选中的keys
 */
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
/**
 * 多选事件
 * @param map 内部状态map
 */
const _updateMultipleSelectItem = (
  map: Map<string, CascaderPanelItemProps>
) => {
  emit("update:modelValue", Array.from(map.keys()));
};
/**
 * changeOnSelect 事件
 * @param selectKeys 选中的keys
 */
const _onChange = (selectKeys: string[] | string) => {
  emit("update:modelValue", selectKeys);
};
/**
 * 选中搜索结果中的node
 * @param item 被点击的node
 */
const clickCheckItem = (item: CascaderPanelItemPropsInternal) => {
  if (_multiple.value) {
    /**
     * 多选且开启了严格模式时，直接把node装入选中的keys中，等待dropdown面板关闭后更新到内部状态中
     */
    if (_checkStrictly.value) {
      if (!_selectKeys.value.includes(item.value))
        (_selectKeys.value as Array<string>).push(item.value);
      else
        (_selectKeys.value as Array<string>).splice(
          _selectKeys.value.indexOf(item.value),
          1
        );
    } else {
      /**
       * 多选且未开启严格模式时，需要判断是否是叶子节点，如果是叶子节点则直接选中，否则需要递归遍历所有叶子节点并选中
       */
      const itemNode: CascaderPanelItemPropsInternal | undefined = item;
      const allNode: Array<CascaderPanelItemPropsInternal> = [];
      const onlyLeaf = (item: CascaderPanelItemPropsInternal) => {
        if (item.children?.length) {
          item.children.forEach((a) => onlyLeaf(a));
        } else {
          allNode.push(item);
        }
      };
      onlyLeaf(itemNode);
      allNode.forEach((node) => {
        if (_selectKeys.value.includes(node.value)) {
          _selectKeys.value = [
            ..._selectKeys.value.filter((v) => v !== node.value),
          ];
        } else {
          _selectKeys.value = [..._selectKeys.value, node.value];
        }
      });
    }
  } else {
    /**
     * 单选时，根据选择的node来构建路径
     */
    _selectKeys.value = buildFullPath(item, true) as string[];
  }
  emit("update:modelValue", _selectKeys.value);
};
/**
 * 构建路径
 * @param item 当前node
 * @param getVal 是否获取value
 */
const buildFullPath = (
  item: CascaderPanelItemPropsInternal,
  getVal = false
): string[] | string => {
  let obj: CascaderPanelItemPropsInternal | undefined = item;
  let fullPath = [];
  while (obj) {
    fullPath.push(getVal ? obj.value : obj.label);
    obj = obj.parent;
  }
  return getVal
    ? fullPath.reverse()
    : fullPath.reverse().join(_decollator.value);
};
/**
 * 处理搜索
 * @param val 输入的内容
 */
const handleInputSearch = (val: string) => {
  _isSearching.value = val.length > 0;
  if (!_isSearching.value) return;
  dropdownRef.value.show();
  _matchedList.value = doSearchValue(val);
};

/**
 * 监听dropdown面板开关
 */
watch(
  () => openState.value,
  (val) => {
    if (!val) {
      // 在这里手工更新内部状态
      if (!_multiple.value && props.search) {
        _innerProcess.value.selectKeys.value = [];
        nextTick(() => {
          _innerProcess.value.selectKeys.value =
            _innerProcess.value.showKeys.value = _selectKeys.value;
        });
      }
      _isSearching.value = false;
      _searchValue.value = "";
    }
  }
);
/**
 * 监听modelValue
 */
watch(
  () => props.modelValue,
  () => {
    _innerProcess.value.modelValue.value = props.modelValue;
  }
);
</script>
