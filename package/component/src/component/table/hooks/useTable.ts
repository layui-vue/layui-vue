import { Recordable } from "../../../types";
import { computed } from "vue";

const useTable = (props: any) => {
  const columnSlotNames = computed<string[]>(() => {
    return findColumnSlotProperties(props.columns);
  });

  const findColumnSlotProperties = function (columns: Recordable[]) {
    const outcome: string[] = [];
    const forEach = function (columns: Recordable[], outcome: string[]) {
      columns.map((column: Recordable) => {
        if (column.children) {
          forEach(column.children, outcome);
        } else {
          if (column.customSlot) {
            outcome.push(column.customSlot);
          }
        }
      });
    };
    forEach(columns, outcome);
    return outcome;
  };

  const calculateDataSourceCount = function (dataSource: Recordable[]) {
    const count: number[] = [0];
    const forEach = function (dataSource: Recordable[], count: number[]) {
      dataSource.map((item) => {
        count[0]++;
        if (item.children) {
          forEach(item.children, count);
        }
      });
    };
    forEach(dataSource, count);
    return count[0];
  };

  const dataSourceCount = computed(() => {
    return calculateDataSourceCount(props.dataSource);
  });

  const calculateNeedSelectedKeys = function (dataSource: Recordable[]) {
    const keys: string[] = [];
    const forEach = function (dataSource: Recordable[], keys: string[]) {
      dataSource.map((item, index) => {
        if (!props.getCheckboxProps(item, index)?.disabled) {
          keys.push(item[props.id]);
        }
        if (item.children) {
          forEach(item.children, keys);
        }
      });
    };
    forEach(dataSource, keys);
    return keys;
  };

  const needSelectedKeys = computed(() => {
    return calculateNeedSelectedKeys(props.dataSource);
  });

  return { columnSlotNames, dataSourceCount, needSelectedKeys };
};

export default useTable;
