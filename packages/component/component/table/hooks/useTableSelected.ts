import type { RequiredTableProps, TableEmit } from "../typing";
import { arrayEverySame, isValueArray, loopForEach } from "@layui/component/utils";

import { computed, reactive, ref, toRaw, watch } from "vue";

export function useTableSelected(props: RequiredTableProps, emit: TableEmit) {
  /**
   * radio
   */
  const tableSelectedKey = ref<RequiredTableProps["selectedKey"]>(
    props.selectedKey,
  );

  watch(
    () => props.selectedKey,
    (newValue) => {
      tableSelectedKey.value = newValue;
    },
  );

  function toggleSelected(key: RequiredTableProps["selectedKey"]) {
    tableSelectedKey.value = key;

    emit("update:selectedKey", key);
  }

  const tableMSelectedKeys = reactive<
    NonNullable<RequiredTableProps["selectedKeys"]>
  >(props.selectedKeys);

  const allKeys = computed(() => {
    const keys: RequiredTableProps["selectedKeys"] = [];

    const getKeys = (dataList: RequiredTableProps["dataSource"]) => {
      dataList.forEach((data) => {
        keys.push(data[props.id!] as number | string);
        if (isValueArray(data[props.childrenColumnName])) {
          getKeys(data[props.childrenColumnName]);
        }
      });
    };

    getKeys(props.dataSource);
    return keys;
  });

  watch(
    () => props.selectedKeys,
    (newValue) => {
      tableMSelectedKeys.splice(
        0,
        tableMSelectedKeys.length,
        ...toRaw(newValue || []),
      );
    },
    {
      deep: true,
    },
  );

  /**
   * Multiple checkbox
   */
  const allMSelected = computed(() => {
    return allKeys.value.length > 0 && allKeys.value.every(key =>
      tableMSelectedKeys.includes(key),
    );
  });

  const someMSelected = computed(() => {
    return allKeys.value.length > 0 && allKeys.value.some(key =>
      tableMSelectedKeys.includes(key),
    );
  });

  watch(
    tableMSelectedKeys,
    (tableMultipleSelectedKeysValue) => {
      if (!arrayEverySame(tableMultipleSelectedKeysValue, props.selectedKeys)) {
        emit("update:selectedKeys", [...tableMultipleSelectedKeysValue]);
      }
    },
    {
      deep: true,
    },
  );

  /**
   * 设置表格全选状态
   */
  function setMAllSelected(value: boolean) {
    if (value) {
      // 添加当前数据源中不存在的key
      tableMSelectedKeys.push(
        ...allKeys.value.filter(key => !tableMSelectedKeys.includes(key)),
      );
    }
    else {
      // 移除dataSource中的所有id
      // 这里需要保留不是dataSource的id 所以不能直接清空tableMultipleSelectedKeys
      // 列如 tableMSelectedKeys = [1,2,3]. dataSource = [{id: 1}, {id: 2}]. 这里需要保留 `3`
      tableMSelectedKeys.splice(
        0,
        tableMSelectedKeys.length,
        ...tableMSelectedKeys.filter(key => !allKeys.value.includes(key)),
      );
    }

    emit("checkbox-all", value ? allKeys.value : []);
  }

  /**
   * 切换单个选中状态
   */
  function toggleMSelected(
    data: RequiredTableProps["dataSource"][number],
    state: boolean,
  ) {
    if (state) {
      tableMSelectedKeys.push(data[props.id]);
    }
    else {
      tableMSelectedKeys.splice(tableMSelectedKeys.indexOf(data[props.id]), 1);
    }

    emit("checkbox", state, toRaw(data));
  }

  function getAllSelectedDataSource(): RequiredTableProps["dataSource"] {
    const keys = [...new Set([tableSelectedKey.value, ...tableMSelectedKeys])];

    const result: RequiredTableProps["dataSource"] = [];
    loopForEach(props.dataSource, props.childrenColumnName, (data) => {
      if (keys.includes(data[props.id])) {
        result.push({ ...data });
      }
    });

    return result;
  }

  return {
    /**
     * single radio
     */
    tableSelectedKey,
    toggleSelected,
    /**
     * Multiple
     */
    // 是否对于dataSource全选
    allMSelected,
    // 切换全选状态
    setMAllSelected,
    // 对于dataSource是否存在部分选中
    someMSelected,
    // 当前dataSource选中的key，可能包括不存在dataSource的key
    tableMSelectedKeys,
    // 切换单个选中状态
    toggleMSelected,

    // 获得所有选中(radio/checkbox)的数据
    getAllSelectedDataSource,
  };
}

export type UseTableSelectedReturn = ReturnType<typeof useTableSelected>;
