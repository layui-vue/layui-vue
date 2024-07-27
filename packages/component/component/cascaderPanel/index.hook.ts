import { ComputedRef, Ref, computed, ref, watch } from "vue";
import {
  CascaderPanelItemProps,
  CascaderPanelItemPropsInternal,
  CascaderPanelProps,
} from "./interface";

export default function useCascaderPanel(props: CascaderPanelProps) {
  return (function () {
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
    const multipleSelectItem: Ref<Map<string, CascaderPanelItemPropsInternal>> =
      ref(new Map());
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
     * `内部` 显示的Keys
     */
    const _showKeys: Ref<Array<string>> = ref([]);

    /**
     * 每列已选中的 key
     */
    const selectKeys: Ref<Array<string>> = ref(
      (() => {
        if (typeof props.modelValue === "string")
          return props.modelValue.split(decollator.value ?? "/");
        if (Array.isArray(props.modelValue)) return [...props.modelValue];
        return [];
      })()
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
      parent: CascaderPanelItemPropsInternal | undefined
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
      _showKeys.value.forEach((key) => {
        if (prevLevel instanceof Array)
          prevLevel = prevLevel.find((a) => a.value === key);
        else prevLevel = prevLevel?.children?.find((a) => a.value === key);
        ret.push(prevLevel?.children ?? []);
      });
      return ret.filter((a) => a.length);
    };

    /**
     * 选中项的 label
     */
    const selectLabel: ComputedRef<string | Array<string>> = computed(() => {
      // 从展平的数据中选择，将选中的value映射到每一个原始对象
      const items: Array<CascaderPanelItemPropsInternal | undefined> =
        selectKeys.value.map((v) => flatData.value.find((c) => c.value === v));

      const fullpath = (target: CascaderPanelItemPropsInternal | undefined) => {
        if (!target) return [];
        let ret: Array<string> = [];
        if (target.parent) ret = [...fullpath(target.parent), target.label];
        else ret = [target.label];
        return ret;
      };

      const path: Array<string> = items.map((item) =>
        props.fullpath && multiple.value
          ? fullpath(item).join(props.decollator)
          : item?.label ?? ""
      );

      if (multiple.value) return path;

      return onlyLastLevel.value
        ? path?.pop() ?? ""
        : path.join(props.decollator);
    });

    /**
     * 已处理的数据源
     */
    const dataSource = computed(() => {
      return flatter(originData.value).filter(
        (_, i) => i <= _showKeys.value.length
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
        if (tmp.done) break;
        ret.push(tmp.value);
        tmp = iter.next();
      } while (!tmp.done);
      return ret;
    };

    /**
     * 树深度降维成森林
     */
    const flatData = computed(() => {
      const ret: Array<CascaderPanelItemPropsInternal> = [];
      const flatter = (target: Array<CascaderPanelItemPropsInternal>) => {
        target.forEach((item) => {
          ret.push(item);
          if (item.children?.length) flatter(item.children);
        });
      };
      flatter(originData.value);
      return ret;
    });

    watch(
      () => props.options,
      () => (originData.value = sanitizer(props.options ?? [], undefined))
    );

    watch(
      () => props.checkStrictly,
      (val) => (checkStrictly.value = val ?? false)
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
              : props.modelValue.split(decollator.value ?? " / ");
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
     * 监听selectkeys，如果清空或取消选择则不更新showkeys
     */
    watch(
      () => selectKeys.value,
      (val, _) => {
        if (!val.length) {
          selectKeys.value = _showKeys.value;
          return;
        }
        _showKeys.value = val;
      }
    );

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
      selectLabel,
      iterCollector,
      flatData,
      changeOnSelect,
    };
  })();
}
