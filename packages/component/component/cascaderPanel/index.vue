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
                    @change="
                      (val) => {
                        clickSelectItem(item, i);
                      }
                    "
                    :value="selectKeys.at(i) != item.value"
                  />
                  <lay-checkbox
                    v-else-if="!item.loading"
                    size="md"
                    skin="primary"
                    v-model="item.checked"
                    :isIndeterminate="
                      (() => {
                        if (checkStrictly) return;
                        if (item.children?.length) {
                          item.children.filter((i) => i.checked).length == 0
                            ? (item.checked = false)
                            : (item.checked = true);
                        }
                        return (
                          (item.checked &&
                            item.children?.length &&
                            item.children.filter((i) => !i.checked).length >
                              0) ||
                          false
                        );
                      })()
                    "
                    @update:model-value="
                      (value) => {
                        item.checked = value;
                        clickSelectItem(item, i);
                        multipleItemTrigger(item);
                        flushOut();
                      }
                    "
                    :value="item.checked ? 1 : 0"
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
import { computed, nextTick, onMounted, ref, useSlots, watch } from "vue";
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
  checkStrictly: false,
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
 * 高度
 */
const height = computed(() => props.height ?? "200px");

onMounted(() => {
  if (!props.modelValue?.length) {
    selectKeys.value = [];
    return;
  }

  if (!multiple.value) {
    selectKeys.value =
      props.modelValue instanceof Array
        ? props.modelValue
        : props.modelValue.split(props.decollator);

    dataSource.value.at(0)?.forEach((item) => {
      doLazyLoad(item);
    });
  } else {
    if (props.modelValue instanceof Array) {
      props.modelValue.forEach((v) => {
        const item = flatData.value.find((c) => c.value === v)!;
        console.log(v, item);
        item.checked = true;
        multipleSelectItem.value.set(v, item);
      });
      dataSource.value.at(0)?.forEach((item) => {
        doLazyLoad(item);
      });
    }
  }
});
/**
 * 懒加载
 * @param item 当前项
 */
const doLazyLoad = (item: CascaderPanelItemPropsInternal) => {
  if (props.lazy) {
    if (!alwaysLazy.value && item.children?.length) return false;
    item.loading = true;
    item.children = [];

    const process = (res: string | Array<CascaderPanelItemProps> | void) => {
      if (!res) res = [];
      if (typeof res === "string")
        res = JSON.parse(res) as Array<CascaderPanelItemProps>;
      item.children = sanitizer(res);
    };

    Promise.resolve(props.lazy(item, process))
      .then(process)
      .then(() => {
        item.loading = false;
        if (item.children?.length)
          props.modelValue instanceof Array &&
            props.modelValue.forEach((v) => {
              const item = flatData.value.find((c) => c.value === v);
              item!.checked = true;
              multipleSelectItem.value.set(v, item!);
            });
        multipleItemTrigger(item);
        if (!multiple.value) flushOut();
      });
    return true;
  } else {
    multipleItemTrigger(item);
    if (!multiple.value) flushOut();
  }
  return false;
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
  if (!multiple.value || checkStrictly.value) return;

  if (item.children?.length)
    item.children.forEach((c) => {
      c.checked = item.checked;
      multipleItemTrigger(c);
    });
  else {
    if (item.checked) multipleSelectItem.value.set(item.value, item);
    else multipleSelectItem.value.delete(item.value);
  }
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
  let keys = selectKeys.value;
  // 回溯，清除n ~ n + 2列的内容
  if (index < keys.length) keys = keys.filter((_, i) => i <= index);
  // 检查数组长度，并补齐，避免自动转换成object
  while (keys.length <= index) keys.push(multiple.value ? item.value : "");
  selectKeys.value = keys;
  selectKeys.value[index] = item.value;

  if (doLazyLoad(item)) return;

  if (checkStrictly.value)
    emits("update:states", {
      selectKeys: selectKeys.value,
      selectLabel: selectLabel.value,
    });
  else if (!multiple.value)
    emits("selectItem", {
      index,
      value: item.value,
      selectKeys: selectKeys.value,
      selectLabel: selectLabel.value,
    });
};
</script>

<style lang="less">
.layui-cascader-panel {
  height: v-bind(height);
}
</style>
