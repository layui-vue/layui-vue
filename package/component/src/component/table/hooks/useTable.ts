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

  const calculateDataSourceCount = function(dataSource: Recordable[]) {
    const count: number[] = [0];
    const forEach = function(dataSource: Recordable[], count: number[]) {
      dataSource.map((item) => {
        count[0]++;
        if(item.children) {
          forEach(item.children, count);
        }
      })
    }
    forEach(dataSource, count);
    return count[0];
  }

  const dataSourceCount = computed(() => {
    return calculateDataSourceCount(props.dataSource);
  })

  return { columnSlotNames, dataSourceCount };
};

export default useTable;
