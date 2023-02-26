import { Recordable } from "../../../types";
import { computed } from "vue";

const useTable = (props: any) => {
  const columnSlotNames = computed(() => {
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
  return { columnSlotNames };
};

export default useTable;
