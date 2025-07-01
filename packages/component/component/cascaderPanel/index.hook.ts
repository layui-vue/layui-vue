import type { ComputedRef, Ref } from "vue";
import type {
  CascaderPanelItemProps,
  CascaderPanelItemPropsInternal,
  CascaderPanelProps,
  tCascaderPanel,
} from "./interface";
import { computed, onMounted, ref, watch } from "vue";

export default function useCascaderPanel(
  props: CascaderPanelProps,
): tCascaderPanel {
  /**
   * 原始数据
   */
  const originData: Ref<Array<CascaderPanelItemPropsInternal>> = ref([]);
  /**
   * 只显示最后一层
   */
  const onlyLastLevel = ref(props.onlyLastLevel);
  /**
   * 是否多选
   */
  const multiple = ref(props.multiple);
  /**
   * 分割符号
   */
  const decollator = ref(props.decollator);
  /**
   * 多选选中项
   */
  const multipleSelectItem: Ref<Map<string, CascaderPanelItemPropsInternal>>
    = ref(new Map());
  /**
   * 启用懒加载时，是否始终懒加载，默认缓存上一次懒加载结果
   */
  const alwaysLazy = ref(props.alwaysLazy);
  /**
   * 懒加载 Badge 样式
   */
  const loadingTheme = ref(props.style?.loadingTheme);
  /**
   * 级联选择
   */
  const checkStrictly = ref(props.checkStrictly);
  /**
   * 即时输出
   */
  const changeOnSelect = ref(props.changeOnSelect);
  /**
   * 显示的Keys
   */
  const showKeys: Ref<Array<string>> = ref([]);
  /**
   * modelValue
   */
  const modelValue: Ref<string | string[]> = ref(props.modelValue ?? []);

  /**
   * 每列已选中的 key
   */
  const selectKeys: Ref<Array<string>> = ref(
    (() => {
      if (typeof modelValue.value === "string")
        return modelValue.value.split(decollator.value ?? "/");
      if (Array.isArray(modelValue.value))
        return [...modelValue.value];
      return [];
    })(),
  );

  /**
   * 替换字段
   */
  const replaceFields = ref({
    label: props.replaceFields?.label ?? "label",
    value: props.replaceFields?.value ?? "value",
    children: props.replaceFields?.children ?? "children",
  });

  /**
   * 外部数据源规范化处理
   * @param data 数据源
   */
  const sanitizer = (
    data: Array<CascaderPanelItemProps>,
    parent: CascaderPanelItemPropsInternal | undefined,
  ): Array<CascaderPanelItemPropsInternal> => {
    return data.map((item) => {
      const d: any = {
        label: item[replaceFields.value.label],
        value: item[replaceFields.value.value],
        loading: false,
        slot: item.slot,
        indeterminate: false,
        checked: false,
        selected: false,
        disabled: item.disabled,
        children: undefined,
        orig: undefined,
        parent,
      };
      d.children = item[replaceFields.value.children]
        ? sanitizer(item[replaceFields.value.children], d)
        : undefined;
      d.orig = item;
      return d;
    });
  };
  originData.value = sanitizer(props.options ?? [], undefined);

  /**
   * 单颗树转换成森林
   * @param data 数据源
   */
  const flatter = (
    data: Array<CascaderPanelItemPropsInternal>,
  ): Array<Array<CascaderPanelItemPropsInternal>> => {
    const ret: Array<Array<CascaderPanelItemPropsInternal>> = [];
    // 第一层
    ret.push(data);
    // 内层进行相对查找
    let prevLevel:
      | Array<CascaderPanelItemPropsInternal>
      | CascaderPanelItemPropsInternal
      | undefined = data;
    showKeys.value.forEach((key) => {
      if (Array.isArray(prevLevel))
        prevLevel = prevLevel.find(a => a.value === key);
      else prevLevel = prevLevel?.children?.find(a => a.value === key);
      ret.push(prevLevel?.children ?? []);
    });
    return ret.filter(a => a.length);
  };

  /**
   * 树深度降维成森林
   */
  const flatData = computed(() => {
    const ret: Array<CascaderPanelItemPropsInternal> = [];
    const flatter = (target: Array<CascaderPanelItemPropsInternal>) => {
      target.forEach((item) => {
        ret.push(item);
        if (item.children?.length)
          flatter(item.children);
      });
    };
    flatter(originData.value);
    return ret;
  });

  /**
   * 选中项的 label
   */
  const selectLabel: ComputedRef<string | Array<string>> = computed(() => {
    // 从展平的数据中选择，将选中的value映射到每一个原始对象
    const items: Array<CascaderPanelItemPropsInternal | undefined>
      = multiple.value
        ? [...multipleSelectItem.value.values()].map(v =>
            flatData.value.find(c => c.value === v.value),
          )
        : selectKeys.value.map(v =>
            flatData.value.find(c => c.value === v),
          );

    const fullpath = (target: CascaderPanelItemPropsInternal | undefined) => {
      if (!target)
        return [];
      let ret: Array<string> = [];
      if (target.parent)
        ret = [...fullpath(target.parent), target.label];
      else ret = [target.label];
      return ret;
    };

    const path: Array<string> = items.map(item =>
      props.fullpath && multiple.value
        ? fullpath(item).join(props.decollator)
        : item?.label ?? "",
    );

    if (multiple.value)
      return path;

    return onlyLastLevel.value
      ? path?.pop() ?? ""
      : path.join(` ${props.decollator} `);
  });

  /**
   * 已处理的数据源
   */
  const dataSource = computed(() => {
    return flatter(originData.value).filter(
      (_, i) => i <= showKeys.value.length,
    );
  });

  /**
   * 迭代器收集器
   * @param {IterableIterator<T>} iter 迭代器
   * @return {Array<T>}
   */
  const iterCollector = (iter: IterableIterator<any>) => {
    const ret: Array<any> = [];
    let tmp: any = iter.next();
    do {
      if (tmp.done)
        break;
      ret.push(tmp.value);
      tmp = iter.next();
    } while (!tmp.done);
    return ret;
  };

  watch(
    () => props.options,
    () => {
      originData.value = sanitizer(props.options ?? [], undefined);
    },
    { deep: true },
  );

  watch(
    () => props.checkStrictly,
    val => (checkStrictly.value = val ?? false),
  );

  /**
   * 监听多选开关变化
   */
  watch(
    () => multiple.value,
    () => {
      const iter = multipleSelectItem.value.values();
      let tmp = iter.next();
      do {
        if (tmp.done)
          break;
        tmp.value.checked = false;
        tmp = iter.next();
      } while (!tmp.done);
      multipleSelectItem.value.clear();
    },
  );

  /**
   * 监听选中数据变化
   */
  // watch(
  //   () => modelValue.value,
  //   () => {
  //     if (!modelValue.value?.length) {
  //       selectKeys.value = [];
  //       return;
  //     }

  //     if (!multiple.value)
  //       selectKeys.value =
  //         modelValue.value instanceof Array
  //           ? modelValue.value
  //           : modelValue.value.split(decollator.value ?? " / ");
  //     else {
  //       if (modelValue.value instanceof Array) {
  //         modelValue.value.forEach((v) => {
  //           multipleSelectItem.value.set(
  //             v,
  //             flatData.value.find((c) => c.value === v)!
  //           );
  //         });
  //       }
  //     }
  //   }
  // );

  /**
   * 自底向上构建森林
   *
   * 需要更新的层数为最大为森林深度 n-1
   */
  const buildMultipleStatus = (): void => {
    if (checkStrictly.value)
      return;

    // Leaf nodes
    flatData.value
      .filter(c => !c.children?.length)
      .forEach((item) => {
        if (item.parent) {
          // chilren 全部勾全的情况
          item.parent.checked
            = item.parent.children?.every(a => a.checked) || false;
          if (!item.parent.checked) {
            // children 中有勾选，但是没有勾全
            item.parent.indeterminate
              = item.parent.children?.some(a => a.checked) || false;
          }
        }
      });

    // Not root nodes & leaf nodes
    flatData.value
      .filter(c => c.parent)
      .forEach((item) => {
        // children 全部勾选的情况
        item.parent!.checked
          = item.parent!.children?.every(a => a.checked) || false;
        // children 中有勾选，但是没有勾全
        if (!item.parent!.checked) {
          item.parent!.indeterminate
            = item.parent!.children?.some(a => a.checked || a.indeterminate)
              || false;
        }
      });

    // Root nodes
    flatData.value
      .filter(c => !c.parent && c.children?.length)
      .forEach((item) => {
        item.checked = item.children?.every(a => a.checked) || false;
        if (!item.checked) {
          item.indeterminate
            = item.children?.some(a => a.indeterminate || a.checked) || false;
        }
      });
  };

  const setup = () => {
    if (!modelValue.value?.length) {
      selectKeys.value = [];
      return;
    }

    if (!multiple.value) {
      // 单选且非严格模式下，直接读到选中的键里面
      selectKeys.value
        = Array.isArray(modelValue.value)
          ? modelValue.value
          : modelValue.value.split(decollator.value ?? "");

      if (checkStrictly.value) {
        // 单选且严格模式下，从展平的数据中找到对应的项，然后设置选中
        const item = flatData.value.find(
          c => c.value === selectKeys.value.at(selectKeys.value.length - 1),
        );
        item && (item.selected = true);
      }

      if (selectKeys.value.length)
        showKeys.value = selectKeys.value;
    }
    else {
      let mValue = modelValue.value;
      if (typeof mValue === "string")
        mValue = mValue.split(decollator.value ?? "");

      if (multiple.value) {
        // 多选，此时不管是否严格关系都可以直接读到多选键中，自底向上构建路径
        (mValue as Array<string>).forEach((v: string) => {
          const item = flatData.value.find(c => c.value === v);
          if (!item)
            return;
          item.checked = true;
          multipleSelectItem.value.set(v, item);
        });
      }
      // 执行一次自底向上构建
      buildMultipleStatus();
    }
  };

  watch(
    () => modelValue.value,
    (newVal, oldVal) => {
      if (multiple.value) {
        if (Array.isArray(newVal)) {
          const [addDiff, removeDiff] = _diffValue(newVal, oldVal as string[]);
          addDiff.forEach((v) => {
            const item = flatData.value.find(c => c.value === v);
            if (!item)
              return;
            item.checked = true;
            multipleSelectItem.value.set(v, item);
          });

          removeDiff.forEach((v) => {
            const item = flatData.value.find(c => c.value === v);
            if (!item)
              return;
            item.checked = false;
            multipleSelectItem.value.delete(v);
          });
        }
        buildMultipleStatus();
      }
      else {
        selectKeys.value
          = Array.isArray(newVal)
            ? newVal
            : newVal.split(decollator.value ?? "");
        if (selectKeys.value.length)
          showKeys.value = selectKeys.value;
      }
    },
  );

  function _diffValue(array: string[] = [], values: string[] = []) {
    const addDiff = array.filter(data => !values.includes(data)) || [];
    const removeDiff = values.filter(data => !array.includes(data)) || [];
    return [addDiff, removeDiff];
  };

  onMounted(() => setup());

  return {
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
  };
}
