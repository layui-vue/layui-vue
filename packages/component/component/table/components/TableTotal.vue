<script setup lang="ts">
import type { TableColumn } from "../typing";
import { computed, inject } from "vue";

import { LAY_TABLE_CONTEXT } from "../constant";

defineOptions({
  name: "LayTableTotal",
});

const props = defineProps<{
  lastLevelShowColumns: TableColumn[];
  tableBodyScrollWidth: number;
}>();

const {
  tableTotalRef,
  tableTotalTableRef,
  tableDataSource,
  commonGetClasses,
  commonGetStylees,
} = inject(LAY_TABLE_CONTEXT)!;

function renderTotalRowCell(column: TableColumn) {
  if (column.totalRow) {
    if (column.totalRow !== true) {
      return column.totalRow;
    }
    else {
      if (column.totalRowMethod) {
        return column.totalRowMethod(column, tableDataSource);
      }
      else {
        return totalRowMethod(column, tableDataSource);
      }
    }
  }
}

function totalRowMethod(column: TableColumn, dataSource: any[]) {
  let precision = 0;
  const values = dataSource.map(item => Number(item[column.key as string]));

  values.forEach((value) => {
    const decimal = `${value}`.split(".")[1];
    precision = Math.max(precision, decimal ? decimal.length : 0);
  });

  return values.reduce((pre, next) => {
    return Number.parseFloat((pre + next).toFixed(Math.min(precision, 20)));
  }, 0);
}

const stylees = computed(() => {
  return {
    "padding-right": `${props.tableBodyScrollWidth}px`,
    "margin-top": `${!props.tableBodyScrollWidth ? 0 : 1}px`,
  };
});
</script>

<template>
  <div class="table-total-wrapper" :style="stylees">
    <div ref="tableTotalRef" class="table-total-wrapper-main">
      <table ref="tableTotalTableRef" class="layui-table">
        <colgroup>
          <col
            v-for="(column, columnIndex) in lastLevelShowColumns"
            :key="column.key || column.type || columnIndex"
            :width="column.width"
            :style="{ minWidth: column.minWidth }"
          >
        </colgroup>
        <tbody>
          <tr class="layui-table-total">
            <template
              v-for="(column, columnIndex) in lastLevelShowColumns"
              :key="column.key || column.type || columnIndex"
            >
              <td
                :class="
                  commonGetClasses(column, {
                    'layui-table-is-sort': !!column.sort,
                  })
                "
                :style="
                  commonGetStylees(column, {
                    whiteSpace: column.ellipsisTooltip ? 'nowrap' : 'normal',
                  })
                "
                v-html="renderTotalRowCell(column)"
              />
            </template>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
