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
                  item.value === selectKeys.at(i),
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
import "./index.less";
import { Ref, computed, onMounted, ref, useSlots } from "vue";
import {
  CascaderPanelItemProps,
  CascaderPanelItemPropsInternal,
  CascaderPanelProps,
  FLUSH_SIGNAL,
} from "./interface";
import useCascaderPanel from "./index.hook";
import LayCheckboxV2 from "../checkboxV2/index.vue";

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
  data: () => [],
  alwaysLazy: false,
  multiple: false,
  onlyLastLevel: false,
  lazy: () => {},
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
  decollator: () => " / ",
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
  multiple,
  checkStrictly,
  multipleSelectItem,
  alwaysLazy,
  loadingTheme,
  selectKeys,
  flatData,
  changeOnSelect,
} = useCascaderPanel(props);
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
 * 自顶向下构建森林
 */
onMounted(() => {
  if (!props.modelValue?.length) {
    selectKeys.value = [];
    return;
  }

  if (!multiple.value) {
    // 单选且非严格模式下，直接读到选中的键里面
    selectKeys.value =
      props.modelValue instanceof Array
        ? props.modelValue
        : props.modelValue.split(props.decollator);

    if (checkStrictly.value) {
      // 单选且严格模式下，从展平的数据中找到对应的项，然后设置选中
      const item = flatData.value.find(
        (c) => c.value === selectKeys.value.at(selectKeys.value.length - 1)
      );
      item && (item.selected = true);
    }
  } else {
    let mValue = props.modelValue;
    if (typeof mValue === "string") mValue = mValue.split(props.decollator);

    if (multiple.value) {
      // 多选，此时不管是否严格关系都可以直接读到多选键中，自底向上构建路径
      mValue.forEach((v) => {
        const item = flatData.value.find((c) => c.value === v);
        if (!item) return;
        item.checked = true;
        multipleSelectItem.value.set(v, item);
      });
    }
    // 执行一次自底向上构建
    buildMultipleStatus();
  }
});
/**
 * 懒加载
 * @param item 当前项
 */
const doLazyLoad = (item: CascaderPanelItemPropsInternal) => {
  if (props.lazy) {
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
    };

    Promise.resolve(props.lazy(item, process)).then(() => {
      item.loading = false;
      // 有下层节点
      if (item.children?.length)
        props.modelValue instanceof Array &&
          props.modelValue.forEach((v) => {
            const item = flatData.value.find((c) => c.value === v);
            if (item) {
              // 选中当前的项目，然后添加到已选的多选项中
              // TODO 讨论：如果存在多个相同 value 值的对象是否抛异常，我认为这一般是用户的业务问题
              item.checked = true;
              multipleSelectItem.value.set(v, item);
            } else multipleSelectItem.value.delete(v);
          });
      // 没有下层节点
      else
        flushOut(multiple.value ? FLUSH_SIGNAL.MULTIPLE : FLUSH_SIGNAL.SINGLE);
      multipleItemTrigger(item);
    });
  } else {
    multipleItemTrigger(item);
    flushOut(multiple.value ? FLUSH_SIGNAL.MULTIPLE : FLUSH_SIGNAL.SINGLE);
  }
};
/**
 * 刷新输出
 */
const flushOut = (signal: FLUSH_SIGNAL, source: Ref = selectKeys) => {
  switch (signal) {
    case FLUSH_SIGNAL.CHANGE:
      emits("change", source.value);
      break;

    case FLUSH_SIGNAL.SINGLE:
      emits("update:modelValue", source.value);
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
  let keys = selectKeys.value;
  // 回溯，清除n ~ n + 2列的内容
  if (index < keys.length) keys = keys.filter((_, i) => i <= index);
  // 检查数组长度，并补齐，避免自动转换成object
  while (keys.length <= index) keys.push(multiple.value ? item.value : "");
  selectKeys.value = keys;
  selectKeys.value[index] = item.value;
};
/**
 * 自底向上构建森林
 *
 * 需要更新的层数为最大为森林深度 n-1
 */
const buildMultipleStatus = () => {
  if (checkStrictly.value) return;

  // Leaf nodes
  flatData.value
    .filter((c) => !c.children?.length)
    .forEach((item) => {
      if (item.parent) {
        // chilren 全部勾全的情况
        item.parent.checked =
          item.parent.children?.every((a) => a.checked) || false;
        if (!item.parent.checked)
          // children 中有勾选，但是没有勾全
          item.parent.indeterminate =
            item.parent.children?.some((a) => a.checked) || false;
      }
    });

  // Not root nodes & leaf nodes
  flatData.value
    .filter((c) => c.parent)
    .forEach((item) => {
      // children 全部勾选的情况
      item.parent!.checked =
        item.parent!.children?.every((a) => a.checked) || false;
      // children 中有勾选，但是没有勾全
      if (!item.parent!.checked)
        item.parent!.indeterminate =
          item.parent!.children?.some((a) => a.checked || a.indeterminate) ||
          false;
    });

  // Root nodes
  flatData.value
    .filter((c) => !c.parent && c.children?.length)
    .forEach((item) => {
      item.checked = item.children?.every((a) => a.checked) || false;
      if (!item.checked)
        item.indeterminate =
          item.children?.some((a) => a.indeterminate || a.checked) || false;
    });
};
</script>

<style lang="less" scoped>
.layui-cascader-panel {
  height: v-bind(_height);
  min-height: v-bind(_height);
}
</style>
