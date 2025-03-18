<script setup lang="ts">
import { type StyleValue, inject } from "vue";
import {
  type TableProps,
  type TableColumn,
  type SortType,
  sortType,
} from "../typing";
import { LAY_TABLE_CONTEXT } from "../constant";
import LayCheckboxV2 from "@layui/component/component/checkboxV2/index.vue";
import { startResize } from "../hooks/useResize";

defineOptions({
  name: "LayTableHeader",
});

const {
  tableEmits,

  // tableDataSource,
  tableRef,
  tableBodyTableRef,
  tableHeaderRef,
  tableHeaderTableRef,

  columnsState,
  selectedState,

  commonGetClasses,
  commonGetStylees,
} = inject(LAY_TABLE_CONTEXT)!;

const props = defineProps<{
  tableProps: TableProps;
  lastLevelShowColumns: TableColumn[];
  hierarchicalColumns: TableColumn[][];
  tableBodyScrollWidth: number;
}>();

const thSort = (e: Event, column: any) => {
  const spanDom = (e.currentTarget as HTMLElement).querySelector(
    "span[lay-sort]"
  ) as HTMLSpanElement;

  if (!spanDom) return;

  const sortValue = spanDom.getAttribute("lay-sort") as SortType;

  const currentIndex = sortType.indexOf(sortValue);
  const nextSort = sortType[(currentIndex + 1) % sortType.length];

  baseSort(spanDom, column, nextSort);
};

const iconSort = (e: Event, column: any, sort: Exclude<SortType, "">) => {
  const spanDom = (e.target as HTMLElement).parentNode as HTMLSpanElement;

  const sortValue = spanDom.getAttribute("lay-sort") as SortType;

  baseSort(spanDom, column, sortValue !== sort ? sort : "");
};

/**
 *
 * @param spanDom 包含lay-sort属性的span dom
 * @param column column
 * @param nextSort 下一次的sort
 */
const baseSort = (
  spanDom: HTMLSpanElement,
  column: any,
  nextSort: SortType
) => {
  const { key, sort } = column;

  removeAllSortState();
  spanDom.setAttribute("lay-sort", nextSort);

  if (sort !== "custom") {
    defaultSort(key, nextSort);
  }

  tableEmits("sort-change", key, nextSort);
};

const defaultSort = (key: string, sortType: SortType) => {
  // switch (sortType) {
  //   case "":
  //     tableDataSource.value = [...props.tableProps.dataSource];
  //     break;
  //   case "asc":
  //     tableDataSource.value.sort((a: any, b: any) => a[key] - b[key]);
  //     break;
  //   case "desc":
  //     tableDataSource.value.sort((a: any, b: any) => b[key] - a[key]);
  //     break;
  // }
};

// 清空所有的sort状态
const removeAllSortState = () => {
  const sortElements = tableRef.value!.querySelectorAll("[lay-sort]");
  if (sortElements && sortElements.length > 0) {
    sortElements.forEach((element) => {
      element.setAttribute("lay-sort", "");
    });
  }
};
</script>

<template>
  <div
    class="layui-table-header"
    :style="[{ 'padding-right': `${tableBodyScrollWidth}px` }]"
  >
    <div class="layui-table-header-wrapper" ref="tableHeaderRef">
      <table
        class="layui-table"
        :lay-size="tableProps.size"
        :lay-skin="tableProps.skin"
        ref="tableHeaderTableRef"
      >
        <colgroup>
          <col
            v-for="(column, index) in lastLevelShowColumns"
            :key="index"
            :width="column.width"
            :style="{ minWidth: column.minWidth }"
          />
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
              :key="columnIndex"
            >
              <th
                v-if="!column.hide"
                :key="columnIndex + tableHeadColumnIndex"
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
                <template v-if="column.type == 'checkbox'">
                  <layCheckboxV2
                    :modelValue="selectedState.allMSelected.value"
                    :is-indeterminate="selectedState.someMSelected.value"
                    skin="primary"
                    value="all"
                    @change="selectedState.setMAllSelected"
                  />
                </template>
                <template v-else>
                  <span>
                    <template v-if="column.titleSlot">
                      <slot
                        :name="column.titleSlot"
                        :column="column"
                        :columnIndex="columnIndex"
                      ></slot>
                    </template>
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
                      @click.stop="iconSort($event, column, 'asc')"
                      class="layui-edge layui-table-sort-asc"
                      title="升序"
                    ></i>
                    <i
                      @click.stop="iconSort($event, column, 'desc')"
                      class="layui-edge layui-table-sort-desc"
                      title="降序"
                    ></i>
                  </span>
                </template>
                <!-- 列宽拖动区 -->
                <div
                  v-if="tableProps.resize || column.resize"
                  class="lay-table-cols-resize"
                  @mousedown.stop="
                    startResize(
                      $event,
                      column,
                      tableHeaderTableRef,
                      tableBodyTableRef
                    )
                  "
                  @click.stop
                ></div>
              </th>
            </template>
          </tr>
        </thead>
      </table>
    </div>
  </div>
</template>
