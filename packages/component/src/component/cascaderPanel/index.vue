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
// TODO 解决多选时 panel 总是会重置的问题

import "./index.less";
import { ComputedRef, Ref, computed, ref, useSlots, watch } from "vue";
import { CascaderPanelItemProps, CascaderPanelProps } from "./interface";

defineOptions({
  name: "LayCascaderPanel",
});

/**
 * 输出
 */
const output = defineEmits<{
  (
    event: "update:modelValue",
    value: {
      selectKeys: Array<string>;
      selectLabel: string;
    }
  ): void;
  (
    event: "change",
    value: {
      index: number;
      value: any;
      selectKeys: Array<string>;
      selectLabel: string | Array<string>;
    }
  ): void;
  (
    event: "multipleSelectItem",
    value: {
      selectKeys: Array<string>;
      selectLabel: Array<CascaderPanelItemPropsInternal>;
    }
  ): void;
}>();

interface CascaderPanelItemPropsInternal {
  label: any;
  value: any;
  slot?: any;
  checked: boolean;
  loading: boolean;
  disabled?: boolean;
  children?: Array<CascaderPanelItemPropsInternal>;
}

const input = withDefaults(defineProps<CascaderPanelProps>(), {
  data: () => [],
  alwaysLazy: false,
  multiple: false,
  onlyLastLevel: false,
  lazy: (_, resolve) => resolve([]),
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
 * 插槽
 */
const slots = useSlots();
/**
 * 原始数据
 */
const originData: Ref<Array<CascaderPanelItemPropsInternal>> = ref([]);
/**
 * 每列已选中的 key
 */
const selectKeys: Ref<Array<string>> = ref(
  (() => {
    let ret: Array<string> = [];
    if (!input.modelValue) return ret;
    ret =
      input.modelValue instanceof Array
        ? input.modelValue
        : input.modelValue.split(input.decollator);
    return ret;
  })()
);
/**
 * 启用懒加载时，是否始终懒加载，默认缓存上一次懒加载结果
 */
const alwaysLazy = ref(input.alwaysLazy);
/**
 * 懒加载 Badge 样式
 */
const loadingTheme = ref(input.style.loadingTheme);
/**
 * 只显示最后一层
 */
const onlyLastLevel = ref(input.onlyLastLevel);
/**
 * 是否多选
 */
const multiple = ref(input.multiple);
/**
 * 开启条纹
 */
const stripe = ref(input.style.stripe);
/**
 * 分割符号
 */
const decollator = ref(input.decollator);
/**
 * 多选选中项
 */
const multipleSelectItem: Ref<Map<string, CascaderPanelItemPropsInternal>> =
  ref(new Map());
/**
 * 自定义Key
 */
const replaceFields = ref({
  label: input.replaceFields?.label ?? "label",
  value: input.replaceFields?.value ?? "value",
  children: input.replaceFields?.children ?? "children",
});
/**
 * 迭代器收集器
 * @param {IterableIterator<T>} iter 迭代器
 * @return {Array<T>}
 */
const iterCollector = (iter: IterableIterator<any>) => {
  let ret = [];
  let tmp = iter.next();
  do {
    if (tmp.done) break;
    ret.push(tmp.value);
    tmp = iter.next();
  } while (!tmp.done);
  return ret;
};

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
  () => input.modelValue,
  () => {
    if (!input.modelValue?.length) {
      selectKeys.value = [];
      return;
    }

    if (!multiple.value)
      selectKeys.value =
        input.modelValue instanceof Array
          ? input.modelValue
          : input.modelValue.split(input.decollator);
    else {
      if (input.modelValue instanceof Array) {
        input.modelValue.forEach((v) => {
          multipleSelectItem.value.set(
            v,
            flatData.value.find((c) => c.value === v)!
          );
        });
      }
    }
    output("update:modelValue", {
      selectKeys: selectKeys.value,
      selectLabel: selectLabel.value,
    });
  }
);
/**
 * 外部数据源规范化处理
 * @param data 数据源
 */
const sanitizer = (
  data: Array<CascaderPanelItemProps>
): Array<CascaderPanelItemPropsInternal> => {
  return data.map((item) => {
    return {
      label: item[replaceFields.value.label],
      value: item[replaceFields.value.value],
      loading: false,
      slot: item.slot,
      checked: false,
      disabled: item.disabled,
      children: item[replaceFields.value.children]
        ? sanitizer(item[replaceFields.value.children])
        : undefined,
    };
  });
};
originData.value = sanitizer(input.data);

/**
 * 选中的 Label
 */
const selectLabel: ComputedRef<string> = computed(() => {
  const path = flatter(originData.value).flatMap(
    (v, i) => v.find((c) => c.value === selectKeys.value.at(i))?.label
  );
  return onlyLastLevel.value ? path.pop() : path.join(input.decollator);
});

/**
 * 单颗树转换成森林
 * @param data 数据源
 */
const flatter = (
  data: Array<CascaderPanelItemPropsInternal>
): Array<Array<CascaderPanelItemPropsInternal>> => {
  const ret: Array<Array<CascaderPanelItemPropsInternal>> = [];
  // 第一层
  ret.push(data);
  // 内层进行相对查找
  let prevLevel:
    | Array<CascaderPanelItemPropsInternal>
    | CascaderPanelItemPropsInternal
    | undefined = data;
  selectKeys.value.forEach((key) => {
    if (prevLevel instanceof Array)
      prevLevel = prevLevel.find((a) => a.value === key);
    else prevLevel = prevLevel?.children?.find((a) => a.value === key);
    ret.push(prevLevel?.children ?? []);
  });
  return ret.filter((a) => a.length);
};
/**
 * 已处理的数据源
 */
const dataSource = computed(() => {
  return flatter(originData.value).filter(
    (_, i) => i <= selectKeys.value.length
  );
});
/**
 * 树深度降维成森林
 */
const flatData = computed(() => {
  const ret: Array<CascaderPanelItemPropsInternal> = [];
  const iter = originData.value;
  const flatter = (target: Array<CascaderPanelItemPropsInternal>) => {
    target.forEach((item) => {
      ret.push(item);
      if (item.children?.length) flatter(item.children);
    });
  };
  return ret;
});

/**
 * 懒加载
 * @param item 当前项
 */
const doLazyLoad = (item: CascaderPanelItemPropsInternal) => {
  if (input.lazy) {
    if (!alwaysLazy.value && item.children?.length) return;
    item.loading = true;
    item.children = [];
    if (typeof input.lazy === "function") {
      new Promise(
        (r: (res: string | Array<CascaderPanelItemProps>) => void, _) =>
          input.lazy(item, r)
      )
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
          }
        });
    }
    if (input.lazy instanceof Promise) {
      const hndl = input.lazy as unknown as (
        item: CascaderPanelItemProps
      ) => Promise<Array<CascaderPanelItemProps>>;
      hndl(item)
        .then((res) => (item.children = sanitizer(res)))
        .then(() => {
          item.loading = false;
          if (!item.children?.length) {
            multipleItemTrigger(item);
            flushOut();
          }
        });
    }
  } else {
    multipleItemTrigger(item);
    flushOut();
  }
};

const flushOut = () => {
  if (multiple.value)
    output("multipleSelectItem", {
      selectKeys: iterCollector(
        multipleSelectItem.value.keys()
      ) as Array<string>,
      selectLabel: iterCollector(
        multipleSelectItem.value.values()
      ) as Array<CascaderPanelItemPropsInternal>,
    });
  else
    output("update:modelValue", {
      selectKeys: selectKeys.value,
      selectLabel: selectLabel.value,
    });
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
  output("change", {
    index,
    value: item.value,
    selectKeys: selectKeys.value,
    selectLabel: selectLabel.value,
  });
  doLazyLoad(item);
};
</script>
