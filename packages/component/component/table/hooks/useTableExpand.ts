import type { RequiredTableProps, TableEmit } from "../typing";
import { loopForEach } from "@layui/component/utils";

import { reactive, watch } from "vue";

type KeyType = string | number;

export function useTableExpand(props: RequiredTableProps, emit: TableEmit) {
  const tableExpandKeys = reactive<KeyType[]>([...props.expandKeys]);

  watch(
    () => props.expandKeys,
    () => {
      tableExpandKeys.splice(0, tableExpandKeys.length, ...props.expandKeys);
    },
    {
      deep: true,
    },
  );

  /**
   * 监听 default-expand-all 变化，修改 expandKeys 内部属性
   *
   * @remark 向内向外，都是响应式
   */
  watch(
    () => [props.defaultExpandAll, props.dataSource],
    () => {
      if (props.defaultExpandAll) {
        const keys: KeyType[] = [];

        loopForEach(props.dataSource, props.childrenColumnName, (data) => {
          keys.push(data[props.id]);
        });

        tableExpandKeys.splice(0, tableExpandKeys.length, ...keys);
      }
    },
    {
      immediate: true,
      deep: true,
    },
  );

  watch(
    () => [props.defaultExpandAll],
    () => {
      if (!props.defaultExpandAll) {
        tableExpandKeys.splice(0, tableExpandKeys.length);
      }
    },
    {
      deep: true,
    },
  );

  function checkExpand(key: KeyType) {
    return tableExpandKeys.includes(key);
  }

  function toggleExpand(key: KeyType, state: boolean) {
    if (state) {
      tableExpandKeys.push(key);
    }
    else {
      tableExpandKeys.splice(tableExpandKeys.indexOf(key), 1);
    }

    emit("update:expandKeys", tableExpandKeys);
  }

  return {
    checkExpand,
    toggleExpand,
  };
}

export type UseTableExpandReturn = ReturnType<typeof useTableExpand>;
