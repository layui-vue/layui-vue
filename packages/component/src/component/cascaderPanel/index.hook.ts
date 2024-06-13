import { ComputedRef, Ref, computed, ref } from "vue";
import {
  CascaderPanelItemProps,
  CascaderPanelItemPropsInternal,
  CascaderPanelProps,
} from "./interface";

export default function useCascaderPanel(props: CascaderPanelProps) {
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
   * 每列已选中的 key
   */
  const selectKeys: Ref<Array<string>> = ref(
    (() => {
      let ret: Array<string> = [];
      if (!props.modelValue) return ret;
      ret =
        props.modelValue instanceof Array
          ? props.modelValue
          : props.modelValue.split(props.decollator ?? "");
      return ret;
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
  originData.value = sanitizer(props.data ?? []);

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
   * 选中项的 label
   */
  const selectLabel: ComputedRef<string> = computed(() => {
    const path = flatter(originData.value).flatMap(
      (v, i) => v.find((c) => c.value === selectKeys.value.at(i))?.label
    );
    return onlyLastLevel.value ? path.pop() : path.join(props.decollator);
  });

  /**
   * 已处理的数据源
   */
  const dataSource = computed(() => {
    return flatter(originData.value).filter(
      (_, i) => i <= selectKeys.value.length
    );
  });

  /**
   * 迭代器收集器
   * @param {IterableIterator<T>} iter 迭代器
   * @return {Array<T>}
   */
  const iterCollector = (iter: IterableIterator<any>) => {
    const ret = [];
    let tmp = iter.next();
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
    const iter = originData.value;
    const flatter = (target: Array<CascaderPanelItemPropsInternal>) => {
      target.forEach((item) => {
        ret.push(item);
        if (item.children?.length) flatter(item.children);
      });
    };
    return ret;
  });

  return {
    dataSource,
    sanitizer,
    onlyLastLevel,
    multiple,
    decollator,
    multipleSelectItem,
    alwaysLazy,
    loadingTheme,
    selectKeys,
    selectLabel,
    iterCollector,
    flatData,
  };
}
