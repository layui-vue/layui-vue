<script setup lang="ts">
import { inject } from "vue";
import type { TableToolBarType } from "./types";
import type { TableColumn, TableDefaultToolbarComplex } from "../typing";

import LayIcon from "@layui/component/component/icon";
import LayDropdown from "@layui/component/component/dropdown/index.vue";
import LayCheckboxV2 from "@layui/component/component/checkboxV2/index.vue";
import LayRender from "@layui/component/component/_components/render";
import { isValueArray } from "@layui/component/utils";

import { useToolBar } from "../hooks/useToolbar";
import { LAY_TABLE_CONTEXT } from "../constant";

defineOptions({
  name: "LayTableToolBar",
});

const props = defineProps<TableToolBarType>();

const { tableSlots } = inject(LAY_TABLE_CONTEXT)!;

const { t, showToolbars, toolbarStyle, exportData, print } = useToolBar(props);

function handleCheckChange(column: TableColumn) {
  column.hide = !column.hide;
}
</script>

<template>
  <div
    v-if="isValueArray(showToolbars) || tableSlots.toolbar"
    class="layui-table-tool"
  >
    <div class="layui-table-tool-temp">
      <LayRender :slots="tableSlots" render="toolbar"></LayRender>
    </div>

    <div v-if="isValueArray(showToolbars)" class="layui-table-tool-self">
      <template v-for="(toolbar, index) in showToolbars" :key="index">
        <!-- 筛选 -->
        <LayDropdown v-if="toolbar === 'filter'" placement="bottom-end">
          <div
            class="layui-inline"
            :title="t('table.filter')"
            lay-event
            :style="toolbarStyle(toolbar)"
          >
            <LayIcon type="layui-icon-slider" />
          </div>
          <template #content>
            <div class="layui-table-tool-checkbox">
              <LayCheckboxV2
                v-for="(column, columnIndex) in hierarchicalColumns[0]"
                :modelValue="!column.hide"
                skin="primary"
                :disabled="isValueArray(column.children)"
                :key="column.key || column.type || columnIndex"
                :value="columnIndex"
                @change="() => handleCheckChange(column)"
                >{{ column.title }}</LayCheckboxV2
              >
            </div>
          </template>
        </LayDropdown>

        <div
          v-else-if="toolbar === 'export'"
          class="layui-inline"
          :title="t('table.export')"
          lay-event
          :style="toolbarStyle(toolbar)"
          @click="exportData()"
        >
          <LayIcon type="layui-icon-export" />
        </div>

        <!-- 打印 -->
        <div
          v-else-if="toolbar === 'print'"
          :style="toolbarStyle(toolbar)"
          class="layui-inline"
          :title="t('table.print')"
          lay-event
          @click="print()"
        >
          <LayIcon type="layui-icon-print" />
        </div>

        <div
          v-else
          :style="toolbarStyle(toolbar)"
          class="layui-inline"
          :title="(toolbar as TableDefaultToolbarComplex).title"
          lay-event
          @click="(toolbar as TableDefaultToolbarComplex)?.onClick?.()"
        >
          <LayIcon :type="(toolbar as TableDefaultToolbarComplex).icon" />
        </div>
      </template>
    </div>
  </div>
</template>
