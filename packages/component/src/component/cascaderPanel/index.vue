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
            @click="clickSelectItem(item, i)"
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
              <lay-checkbox
                v-if="
                  multiple === true && !item.children?.length && !item.loading
                "
                size="md"
                skin="primary"
                v-model="item.checked"
                :value="item.checked ? 1 : 0"
                :label="item.label"
                @click.stop="clickSelectItem(item, i)"
              ></lay-checkbox>
              <span v-else>
                <slot
                  :name="item.slot"
                  v-if="item.slot && slots[item.slot]"
                ></slot>
                <template v-else>{{ item.label }}</template>
              </span>
              <lay-badge
                class="layui-cascader-panel-item-loading"
                type="dot"
                :theme="loadingTheme"
                ripple
                v-if="item.loading"
              ></lay-badge>
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
import { ref, useSlots, watch } from "vue";
import {
  CascaderPanelItemProps,
  CascaderPanelItemPropsInternal,
  CascaderPanelProps,
} from "./interface";
import useCascaderPanel from "./index.hook";

defineOptions({
  name: "LayCascaderPanel",
});

/**
 * 输出
 */
const emits = defineEmits<{
  (event: "update:modelValue", value: Array<string>): void;
  (
    event: "update:states",
    value: {
      selectKeys: Array<string>;
      selectLabel: Array<string> | string;
    }
  ): void;
  (
    event: "update:multipleSelectItem",
    value: {
      selectKeys: Array<string>;
      selectLabel: Array<CascaderPanelItemPropsInternal>;
    }
  ): void;
  (
    event: "selectItem",
    value: {
      index: number;
      value: any;
      selectKeys: Array<string>;
      selectLabel: string | Array<string>;
    }
  ): void;
}>();

const props = withDefaults(defineProps<CascaderPanelProps>(), {
  data: () => [],
  alwaysLazy: false,
  multiple: false,
  onlyLastLevel: false,
  lazy: () => [],
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
});
/**
 * Hook
 */
const {
  dataSource,
  sanitizer,
  multiple,
  multipleSelectItem,
  alwaysLazy,
  loadingTheme,
  selectKeys,
  selectLabel,
  iterCollector,
  flatData,
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
 * 监听多选开关变化
 */
watch(
  () => multiple.value,
  () => {
    const iter = multipleSelectItem.value.values();
    let tmp = iter.next();
    do {
      if (tmp.done) break;
      tmp.value.checked = false;
      tmp = iter.next();
    } while (!tmp.done);
    multipleSelectItem.value.clear();
  }
);
/**
 * 监听选中数据变化
 */
watch(
  () => props.modelValue,
  () => {
    if (!props.modelValue?.length) {
      selectKeys.value = [];
      return;
    }

    if (!multiple.value)
      selectKeys.value =
        props.modelValue instanceof Array
          ? props.modelValue
          : props.modelValue.split(props.decollator);
    else {
      if (props.modelValue instanceof Array) {
        props.modelValue.forEach((v) => {
          multipleSelectItem.value.set(
            v,
            flatData.value.find((c) => c.value === v)!
          );
        });
      }
    }
  }
);
/**
 * 懒加载
 * @param item 当前项
 */
const doLazyLoad = (item: CascaderPanelItemPropsInternal) => {
  if (props.lazy) {
    if (!alwaysLazy.value && item.children?.length) return;
    item.loading = true;
    item.children = [];

    Promise.resolve(props.lazy(item))
      .then((res: string | Array<CascaderPanelItemProps>) => {
        if (typeof res === "string")
          res = JSON.parse(res) as Array<CascaderPanelItemProps>;
        item.children = sanitizer(res);
      })
      .then(() => {
        item.loading = false;
        if (!item.children?.length) {
          multipleItemTrigger(item);
          flushOut();
        } else {
          props.modelValue instanceof Array &&
            props.modelValue.forEach((v) => {
              multipleSelectItem.value.set(
                v,
                flatData.value.find((c) => c.value === v)!
              );
            });
        }
      });
  } else {
    multipleItemTrigger(item);
    flushOut();
  }
};
/**
 * 刷新
 */
const flushOut = () => {
  if (multiple.value) {
    emits(
      "update:modelValue",
      iterCollector(multipleSelectItem.value.keys()) as Array<string>
    );
    emits("update:multipleSelectItem", {
      selectKeys: iterCollector(
        multipleSelectItem.value.keys()
      ) as Array<string>,
      selectLabel: iterCollector(
        multipleSelectItem.value.values()
      ) as Array<CascaderPanelItemPropsInternal>,
    });
  } else {
    emits("update:modelValue", selectKeys.value);
    emits("update:states", {
      selectKeys: selectKeys.value,
      selectLabel: selectLabel.value,
    });
  }
};
/**
 * 收集多选的选中项
 * @param item 当前项
 */
const multipleItemTrigger = (item: CascaderPanelItemPropsInternal) => {
  if (!multiple.value) return;
  if (item.checked) multipleSelectItem.value.set(item.value, item);
  else multipleSelectItem.value.delete(item.value);
};
/**
 * 点击事件
 * @param item 当前项
 * @param index 当前列索引
 */
const clickSelectItem = (
  item: CascaderPanelItemPropsInternal,
  index: number
) => {
  if (item.disabled) return;
  // 回溯，清除n + 2列的内容
  if (index < selectKeys.value.length)
    selectKeys.value = selectKeys.value.filter((_, i) => i <= index);
  // 检查数组长度，并补齐
  while (selectKeys.value.length < index)
    selectKeys.value.push(multiple.value ? item.value : "");
  selectKeys.value[index] = item.value;
  if (!multiple.value)
    emits("selectItem", {
      index,
      value: item.value,
      selectKeys: selectKeys.value,
      selectLabel: selectLabel.value,
    });
  doLazyLoad(item);
};
</script>
