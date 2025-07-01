<script setup lang="ts">
import type { CascaderPanelItemProps, CascaderPanelItemPropsInternal, CascaderPanelProps, tCascaderPanel } from "./interface";
import { CASCADER_CONTEXT_KEY } from "@layui/component/component/cascader/cascader";
import LayCheckboxV2 from "@layui/component/component/checkboxV2/index.vue";
import LayEmpty from "@layui/component/component/empty/index.vue";
import LayRadio from "@layui/component/component/radio/index.vue";
import LayScroll from "@layui/component/component/scroll/index.vue";
import { LayIcon } from "@layui/icons-vue";
import { computed, inject, ref, useSlots } from "vue";
import useCascaderPanel from "./index.hook";
import { FLUSH_SIGNAL } from "./interface";
import "./index.less";

defineOptions({
  name: "LayCascaderPanel",
});

const props = withDefaults(defineProps<CascaderPanelProps>(), {
  options: () => [],
  alwaysLazy: false,
  multiple: false,
  onlyLastLevel: false,
  lazy: false,
  load: undefined,
  style: () => {
    return {
      stripe: false,
      loadingTheme: "",
    };
  },
  replaceFields: () => ({
    label: "label",
    value: "value",
    children: "children",
  }),
  modelValue: () => [],
  decollator: () => "/",
  height: "200px",
  checkStrictly: false,
  changeOnSelect: false,
  fullpath: true,
});

/**
 * 输出
 */
const emits = defineEmits<{
  (event: "update:modelValue", value: Array<string>): void;
  (
    event: "update:multipleSelectItem",
    value: Map<string, CascaderPanelItemPropsInternal>
  ): void;
  (event: "change", value: Array<string>): void;
}>();

/**
 * Hook
 */
const {
  dataSource,
  sanitizer,
  multiple,
  checkStrictly,
  multipleSelectItem,
  alwaysLazy,
  loadingTheme,
  selectKeys,
  showKeys,
  flatData,
  changeOnSelect,
  buildMultipleStatus,
  modelValue,
}
  = ((inject(CASCADER_CONTEXT_KEY) as tCascaderPanel) || null)
    ?? useCascaderPanel(props);
/**
 * 插槽
 */
const slots = useSlots();
/**
 * 开启条纹
 */
const stripe = ref(props.style?.stripe);
/**
 * 高度
 */
const _height = computed(() =>
  typeof props.height === "number"
    ? `${props.height}px`
    : props.height ?? "200px",
);
/**
 * 懒加载
 * @param item 当前项
 */
function doLazyLoad(item: CascaderPanelItemPropsInternal) {
  if (!alwaysLazy.value && item.children?.length) {
    return;
  }
  item.loading = true;

  // 追加新数据到数据源
  const process = (res?: Array<CascaderPanelItemProps>) => {
    item.children = [];
    if (!res)
      res = [];
    item.children = sanitizer(res, item);
    item.orig!.children = res;

    item.loading = false;
    // 有下层节点
    if (item.children?.length) {
      Array.isArray(modelValue.value)
      && modelValue.value.forEach((v) => {
        const item = flatData.value.find(c => c.value === v);
        if (item) {
          // 选中当前的项目，然后添加到已选的多选项中
          item.checked = true;
          multipleSelectItem.value.set(v, item);
        }
        else {
          multipleSelectItem.value.delete(v);
        }
      });
    }
    // 没有下层节点
    else {
      selectKeys.value = showKeys.value;
      flushOut(multiple.value ? FLUSH_SIGNAL.MULTIPLE : FLUSH_SIGNAL.SINGLE);
    }
  };

  props.load?.(item, process);
}
/**
 * 刷新输出
 */
function flushOut(signal: FLUSH_SIGNAL) {
  switch (signal) {
    case FLUSH_SIGNAL.CHANGE:
      emits("change", showKeys.value);
      break;

    case FLUSH_SIGNAL.SINGLE:
      emits("update:modelValue", selectKeys.value);
      break;

    case FLUSH_SIGNAL.MULTIPLE:
      buildMultipleStatus();
      emits("update:multipleSelectItem", multipleSelectItem.value);
      emits("update:modelValue", Array.from(multipleSelectItem.value.keys()));
      break;
  }
}
/**
 * 收集多选的选中项
 * @param item 当前项
 */
function multipleItemTrigger(item: CascaderPanelItemPropsInternal) {
  if (!multiple.value)
    return;

  if (item.children?.length && !checkStrictly.value) {
    item.children.forEach((c) => {
      c.checked = item.checked;
      multipleItemTrigger(c);
    });
    return;
  }

  if (item.checked)
    multipleSelectItem.value.set(item.value, item);
  else multipleSelectItem.value.delete(item.value);
}
/**
 * 选中当前项目
 * @description 点击选择当前的项目，如果配置了懒加载就进行懒加载
 * @param item 当前项
 * @param index 当前列索引
 */
function clickSelectItem(item: CascaderPanelItemPropsInternal, index: number) {
  clickChooseItem(item, index);
  if (changeOnSelect.value)
    flushOut(FLUSH_SIGNAL.CHANGE);

  if (props.lazy && props.load) {
    doLazyLoad(item);
  }
  else {
    // multipleItemTrigger(item);
    if (!item.children?.length || checkStrictly.value) {
      selectKeys.value = showKeys.value;
      flushOut(multiple.value ? FLUSH_SIGNAL.MULTIPLE : FLUSH_SIGNAL.SINGLE);
    }
  }
}
/**
 * 展开一个项目
 * @description 选中一个项目，并且加入 selectKeys 数组中
 * @param item 当前项
 * @param index 当前列索引
 */
function clickChooseItem(item: CascaderPanelItemPropsInternal, index: number) {
  if (item.disabled)
    return;
  let keys = showKeys.value;
  // 回溯，清除n ~ n + 2列的内容
  if (index < keys.length)
    keys = keys.filter((_, i) => i <= index);
  // 检查数组长度，并补齐，避免自动转换成object
  while (keys.length <= index) keys.push(multiple.value ? item.value : "");
  showKeys.value = keys;
  showKeys.value[index] = item.value;
}

function handleRadioUpdateModelValue(item: CascaderPanelItemPropsInternal, i: number) {
  dataSource.value.forEach((list: Array<CascaderPanelItemPropsInternal>) =>
    list.forEach((i: CascaderPanelItemPropsInternal) => (i.selected = false)),
  );
  item.selected = !item.selected;
  clickSelectItem(item, i);
  flushOut(FLUSH_SIGNAL.CHANGE);
}

function handleCheckboxUpdateModelValue(item: CascaderPanelItemPropsInternal) {
  multipleItemTrigger(item);
  flushOut(FLUSH_SIGNAL.MULTIPLE);
}
</script>

<template>
  <div
    class="layui-cascader-panel"
    :style="{ height: _height, minHeight: _height }"
  >
    <div
      v-if="dataSource && dataSource.length"
      class="layui-cascader-panel-container"
    >
      <ul
        v-for="(list, i) in dataSource"
        :key="i"
        class="layui-cascader-panel-list"
        :class="[
          {
            'layui-cascader-panel-list-striped': stripe,
          },
        ]"
      >
        <LayScroll>
          <li
            v-for="(item, j) in list"
            :key="j"
            class="layui-cascader-panel-item"
            :class="[
              {
                'layui-cascader-panel-item-active':
                  item.value === showKeys.at(i),
                'layui-cascader-panel-item-disabled': item.disabled,
              },
            ]"
            :title="item.label"
            @click.stop="clickSelectItem(item, i)"
          >
            <slot>
              <div class="layui-cascader-panel-selection">
                <template v-if="checkStrictly || multiple">
                  <LayRadio
                    v-if="!multiple"
                    :value="!item.selected"
                    @update:model-value="handleRadioUpdateModelValue(item, i)"
                  />
                  <LayCheckboxV2
                    v-else-if="!item.loading"
                    v-model="item.checked"
                    size="md"
                    skin="primary"
                    :value="item.checked ? 1 : 0"
                    :is-indeterminate="item.indeterminate"
                    @update:model-value="handleCheckboxUpdateModelValue(item)"
                  />
                </template>
                <slot
                  v-if="item.slot && slots[item.slot]"
                  :name="item.slot"
                />
                <template v-else>
                  {{ item.label }}
                </template>
              </div>
              <LayIcon
                v-if="item.loading"
                class="layui-cascader-panel-item-icon layui-anim layui-anim-rotate layui-anim-loop"
                type="layui-icon-loading"
                :theme="loadingTheme"
              />
              <LayIcon
                v-else-if="item.children && item.children.length"
                class="layui-cascader-panel-item-icon"
                type="layui-icon-right"
              />
            </slot>
          </li>
        </LayScroll>
      </ul>
    </div>

    <LayEmpty v-else />
  </div>
</template>
