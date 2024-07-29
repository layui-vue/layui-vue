<template>
  <div class="layui-cascader-panel">
    <div class="layui-cascader-panel-container">
      <ul
        class="layui-cascader-panel-list"
        v-for="(list, i) in dataSource"
        :key="i"
        :class="[
          {
            'layui-cascader-panel-list-striped': stripe,
          },
        ]"
      >
        <lay-scroll>
          <li
            class="layui-cascader-panel-item"
            v-for="(item, j) in list"
            :key="j"
            @click.stop="clickSelectItem(item, i)"
            :class="[
              {
                'layui-cascader-panel-item-active':
                  item.value === showKeys.at(i),
              },
              {
                'layui-cascader-panel-item-disabled': item.disabled,
              },
            ]"
            :title="item.label"
          >
            <slot>
              <div class="layui-cascader-panel-selection">
                <template v-if="checkStrictly || multiple">
                  <lay-radio
                    v-if="!multiple"
                    :value="!item.selected"
                    @update:model-value="(val: boolean) => {
                      dataSource.forEach((list: Array<CascaderPanelItemPropsInternal>) => list.forEach((i: CascaderPanelItemPropsInternal) => (i.selected = false)));
                      item.selected = !item.selected;
                      clickSelectItem(item, i);
                      flushOut(FLUSH_SIGNAL.CHANGE);
                    }"
                  />
                  <lay-checkbox-v2
                    v-else-if="!item.loading"
                    size="md"
                    skin="primary"
                    v-model="item.checked"
                    :value="item.checked ? 1 : 0"
                    :isIndeterminate="item.indeterminate"
                    @update:model-value="
                      () => {
                        multipleItemTrigger(item);
                        flushOut(FLUSH_SIGNAL.MULTIPLE);
                      }
                    "
                  />
                </template>
                <slot
                  :name="item.slot"
                  v-if="item.slot && slots[item.slot]"
                ></slot>
                <template v-else>{{ item.label }}</template>
              </div>
              <lay-badge
                class="layui-cascader-panel-item-loading"
                type="dot"
                :theme="loadingTheme"
                ripple
                v-if="item.loading"
              />
              <i
                class="layui-icon"
                :class="{
                  'layui-icon-right': item.children && item.children.length,
                }"
              ></i>
            </slot>
          </li>
        </lay-scroll>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Ref, computed, inject, onMounted, provide, ref, useSlots } from "vue";
import LayCheckboxV2 from "../checkboxV2/index.vue";
import useCascaderPanel from "./index.hook";
import { tCascaderPanel } from "./interface";
import "./index.less";
import {
  CascaderPanelItemProps,
  CascaderPanelItemPropsInternal,
  CascaderPanelProps,
  FLUSH_SIGNAL,
} from "./interface";

defineOptions({
  name: "LayCascaderPanel",
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
  (
    event: "states",
    value: {
      selectKeys: Array<string>;
      selectLabel: Array<CascaderPanelItemPropsInternal>;
    }
  ): void;
}>();

const props = withDefaults(defineProps<CascaderPanelProps>(), {
  options: () => [],
  alwaysLazy: false,
  multiple: false,
  onlyLastLevel: false,
  lazy: false,
  load: () => {},
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
 * Hook
 */
const {
  dataSource,
  sanitizer,
  onlyLastLevel,
  multiple,
  checkStrictly,
  decollator,
  multipleSelectItem,
  alwaysLazy,
  loadingTheme,
  selectKeys,
  showKeys,
  selectLabel,
  iterCollector,
  flatData,
  changeOnSelect,
  buildMultipleStatus,
  modelValue,
  setup,
} = (inject("CascaderContext") as tCascaderPanel) ?? useCascaderPanel(props);
onMounted(() => setup());
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
    : props.height ?? "200px"
);
/**
 * 懒加载
 * @param item 当前项
 */
const doLazyLoad = (item: CascaderPanelItemPropsInternal) => {
  if (props.lazy && props.load) {
    if (!alwaysLazy.value && item.children?.length) {
      return;
    }
    item.loading = true;
    item.children = [];

    // 追加新数据到数据源
    const process = (res: string | Array<CascaderPanelItemProps> | void) => {
      if (!res) res = [];
      if (typeof res === "string")
        res = JSON.parse(res) as Array<CascaderPanelItemProps>;
      item.children = sanitizer(res, item);
      item.orig!.children = res;

      item.loading = false;
      // 有下层节点
      if (item.children?.length)
        modelValue.value instanceof Array &&
          modelValue.value.forEach((v) => {
            const item = flatData.value.find((c) => c.value === v);
            if (item) {
              // 选中当前的项目，然后添加到已选的多选项中
              item.checked = true;
              multipleSelectItem.value.set(v, item);
            } else multipleSelectItem.value.delete(v);
          });
      // 没有下层节点
      else {
        flushOut(multiple.value ? FLUSH_SIGNAL.MULTIPLE : FLUSH_SIGNAL.SINGLE);
      }
      multipleItemTrigger(item);
    };

    Promise.resolve(props.load(item, process));
  } else {
    multipleItemTrigger(item);
    if (!item.children?.length || checkStrictly.value) {
      selectKeys.value = showKeys.value;
      flushOut(multiple.value ? FLUSH_SIGNAL.MULTIPLE : FLUSH_SIGNAL.SINGLE);
    }
  }
};
/**
 * 刷新输出
 */
const flushOut = (signal: FLUSH_SIGNAL) => {
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
};
/**
 * 收集多选的选中项
 * @param item 当前项
 */
const multipleItemTrigger = (item: CascaderPanelItemPropsInternal) => {
  if (!multiple.value) return;

  if (item.children?.length && !checkStrictly.value) {
    item.children.forEach((c) => {
      c.checked = item.checked;
      multipleItemTrigger(c);
    });
    return;
  }

  if (item.checked) multipleSelectItem.value.set(item.value, item);
  else multipleSelectItem.value.delete(item.value);
};
/**
 * 点击 li 事件
 * @description 点击 li 的时候展开子项，如果配置了懒加载就进行懒加载
 * @param item 当前项
 * @param index 当前列索引
 */
const clickSelectItem = (
  item: CascaderPanelItemPropsInternal,
  index: number
) => {
  clickChooseItem(item, index);
  doLazyLoad(item);
  if (changeOnSelect.value) flushOut(FLUSH_SIGNAL.CHANGE);
};
/**
 * 选中事件
 * @description 选中一个项目，并且加入 selectKeys 数组中
 * @param item 当前项
 * @param index 当前列索引
 */
const clickChooseItem = (
  item: CascaderPanelItemPropsInternal,
  index: number
) => {
  if (item.disabled) return;
  let keys = showKeys.value;
  // 回溯，清除n ~ n + 2列的内容
  if (index < keys.length) keys = keys.filter((_, i) => i <= index);
  // 检查数组长度，并补齐，避免自动转换成object
  while (keys.length <= index) keys.push(multiple.value ? item.value : "");
  showKeys.value = keys;
  showKeys.value[index] = item.value;
};
</script>

<style lang="less" scoped>
.layui-cascader-panel {
  height: v-bind(_height);
  min-height: v-bind(_height);
}
</style>
