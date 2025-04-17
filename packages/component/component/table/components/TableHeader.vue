<script setup lang="ts">
import type { SortType, TableColumn } from "../typing";
import LayRender from "@layui/component/component/_components/render";
import LayCheckboxV2 from "@layui/component/component/checkboxV2/index.vue";

import { isValueArray } from "@layui/component/utils";

import { inject } from "vue";
import { LAY_TABLE_CONTEXT } from "../constant";
import { startResize } from "../hooks/useResize";
import { sortType } from "../typing";

defineOptions({
  name: "LayTableHeader",
});

defineProps<{
  lastLevelShowColumns: TableColumn[];
  hierarchicalColumns: TableColumn[][];
  tableBodyScrollWidth: number;
}>();

const {
  tableProps,
  tableEmits,
  tableSlots,

  tableDataSource,
  tableRef,
  tableBodyTableRef,
  tableHeaderRef,
  tableHeaderTableRef,
  tableTotalTableRef,

  columnsState,
  selectedState,

  commonGetClasses,
  commonGetStylees,
} = inject(LAY_TABLE_CONTEXT)!;

function thSort(e: Event, column: any) {
  const spanDom = (e.currentTarget as HTMLElement).querySelector(
    "span[lay-sort]",
  ) as HTMLSpanElement;

  if (!spanDom)
    return;

  const sortValue = spanDom.getAttribute("lay-sort") as SortType;

  const currentIndex = sortType.indexOf(sortValue);
  const nextSort = sortType[(currentIndex + 1) % sortType.length];

  baseSort(spanDom, column, nextSort);
}

function iconSort(e: Event, column: any, sort: Exclude<SortType, "">) {
  const spanDom = (e.target as HTMLElement).parentNode as HTMLSpanElement;

  const sortValue = spanDom.getAttribute("lay-sort") as SortType;

  baseSort(spanDom, column, sortValue !== sort ? sort : "");
}

/**
 *
 * @param spanDom 包含lay-sort属性的span dom
 * @param column column
 * @param nextSort 下一次的sort
 */
function baseSort(spanDom: HTMLSpanElement, column: any, nextSort: SortType) {
  const { key, sort } = column;

  removeAllSortState();
  spanDom.setAttribute("lay-sort", nextSort);

  if (sort !== "custom") {
    defaultSort(key, nextSort);
  }

  tableEmits("sort-change", key, nextSort);
}

function defaultSort(key: string, sortType: SortType) {
  switch (sortType) {
    case "":
      tableDataSource.splice(
        0,
        tableDataSource.length,
        ...tableProps.dataSource,
      );
      break;
    case "asc":
      tableDataSource.sort((a: any, b: any) => a[key] - b[key]);
      break;
    case "desc":
      tableDataSource.sort((a: any, b: any) => b[key] - a[key]);
      break;
  }
}

// 清空所有的sort状态
function removeAllSortState() {
  const sortElements = tableRef.value!.querySelectorAll("[lay-sort]");
  if (sortElements && sortElements.length > 0) {
    sortElements.forEach((element) => {
      element.setAttribute("lay-sort", "");
    });
  }
}
</script>

<template>
  <div
    class="layui-table-header"
    :style="[{ 'padding-right': `${tableBodyScrollWidth}px` }]"
  >
    <div ref="tableHeaderRef" class="layui-table-header-wrapper">
      <table
        ref="tableHeaderTableRef"
        class="layui-table"
        :lay-size="tableProps.size"
        :lay-skin="tableProps.skin"
      >
        <colgroup>
          <col
            v-for="(column, index) in lastLevelShowColumns"
            :key="column.key || column.type || index"
            :width="column.width"
            :style="{ minWidth: column.minWidth }"
          >
        </colgroup>
        <thead>
          <tr
            v-for="(
              tableHeadColumn, tableHeadColumnIndex
            ) in hierarchicalColumns"
            :key="tableHeadColumnIndex"
          >
            <template
              v-for="(column, columnIndex) in tableHeadColumn"
              :key="column.key || column.type || columnIndex"
            >
              <th
                v-if="!column.hide"
                :colspan="columnsState.setColSpanValue(column)"
                :rowspan="columnsState.setRowSpanValue(column)"
                :class="
                  commonGetClasses(column, {
                    'layui-table-is-sort': !!column.sort,
                  })
                "
                :style="commonGetStylees(column)"
                @click="thSort($event, column)"
              >
                <template v-if="column.type === 'checkbox'">
                  <LayCheckboxV2
                    :model-value="selectedState.allMSelected.value"
                    :is-indeterminate="selectedState.someMSelected.value"
                    skin="primary"
                    value="all"
                    @change="selectedState.setMAllSelected"
                  />
                </template>
                <template v-else>
                  <span>
                    <LayRender
                      v-if="column.titleSlot"
                      :slots="tableSlots"
                      :render="column.titleSlot"
                      :column="column"
                      :column-index="columnIndex"
                    />

                    <template v-else>
                      {{ column.title }}
                    </template>
                  </span>
                  <!-- 插槽 -->
                  <span
                    v-if="!!column.sort"
                    class="layui-table-sort layui-inline"
                    :lay-sort="
                      tableProps.initSort?.field === column.key
                        ? tableProps.initSort.type
                        : ''
                    "
                  >
                    <i
                      class="layui-edge layui-table-sort-asc"
                      title="升序"
                      @click.stop="iconSort($event, column, 'asc')"
                    />
                    <i
                      class="layui-edge layui-table-sort-desc"
                      title="降序"
                      @click.stop="iconSort($event, column, 'desc')"
                    />
                  </span>
                </template>
                <!-- 列宽拖动区 -->
                <div
                  v-if="
                    (tableProps.resize || column.resize)
                      && !isValueArray(column.children)
                  "
                  class="lay-table-cols-resize"
                  @mousedown.stop="
                    startResize(
                      $event,
                      column,
                      tableHeaderTableRef,
                      tableBodyTableRef,
                      tableTotalTableRef,
                    )
                  "
                  @click.stop
                />
              </th>
            </template>
          </tr>
        </thead>
      </table>
    </div>
  </div>
</template>
