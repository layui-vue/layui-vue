import type { PropType } from "vue";
import type { LayTableContextType } from "../constant";
import type { TableColumn, TableDefaultToolbar } from "../typing";
import type { TableToolBarType } from "./types";

import LayRender from "@layui/component/component/_components/render";
import LayCheckboxV2 from "@layui/component/component/checkboxV2/index.vue";
import LayDropdown from "@layui/component/component/dropdown/index.vue";
import LayIcon from "@layui/component/component/icon";
import LaySpace from "@layui/component/component/space/index.vue";
import { clsPrefix, isValueArray } from "@layui/component/utils";

import { defineComponent, h, inject } from "vue";
import { LAY_TABLE_CONTEXT } from "../constant";
import { useToolBar } from "../hooks/useToolbar";

function handleCheckChange(column: TableColumn) {
  column.hide = !column.hide;
}

const ToolbarItem = defineComponent({
  name: "ToolbarItem",

  props: {
    resetParams: {
      required: true,
      type: Object as PropType<
        Omit<ReturnType<typeof useToolBar>, "showToolbars"> & {
          hierarchicalColumns: TableToolBarType["hierarchicalColumns"];
        }
      >,
    },

    toolbar: {
      required: true,
      type: [String, Object] as PropType<TableDefaultToolbar>,
    },
  },

  setup(props) {
    return () => {
      const { toolbar, resetParams: { t, exportData, hierarchicalColumns, print } } = props;

      // filter
      if (toolbar === "filter") {
        return h(LayDropdown, { placement: "bottom-end" }, {
          default: () => h(
            "div",
            {
              class: clsPrefix("table-toolbar-item"),
              title: t("table.filter"),
            },
            h(LayIcon, { type: clsPrefix("icon-slider") }),
          ),

          content: () => h(
            "div",
            { class: clsPrefix("table-tool-checkbox") },
            hierarchicalColumns[0].map((column, columnIndex) => h(LayCheckboxV2, {
              skin: "primary",
              key: column.key || column.type || columnIndex,
              value: columnIndex,
              modelValue: !column.hide,
              disabled: isValueArray(column.children),

              onChange: () => handleCheckChange(column),
            }, () => column.title)),
          ),
        });
      }

      // export
      if (toolbar === "export") {
        return h("div", {
          title: t("table.export"),
          class: clsPrefix("table-toolbar-item"),

          onClick: exportData,
        }, h(LayIcon, { type: clsPrefix("icon-export") }));
      }

      // print
      if (toolbar === "print") {
        return h("div", {
          title: t("table.print"),
          class: clsPrefix("table-toolbar-item"),

          onClick: print,
        }, h(LayIcon, { type: clsPrefix("icon-print") }));
      }

      // render
      if (toolbar?.render) {
        return toolbar.render();
      }

      return h("div", {
        title: toolbar.title,
        class: clsPrefix("table-toolbar-item"),

        onClick: toolbar.onClick,
      }, h(LayIcon, { type: toolbar.icon }));
    };
  },
});

const TableToolbar = defineComponent({
  name: "TableToolbar",

  props: {
    defaultToolbar: {
      required: true,
      type: [Array, Boolean] as PropType<TableToolBarType["defaultToolbar"]>,
    },

    hierarchicalColumns: {
      required: true,
      type: Array as PropType<TableToolBarType["hierarchicalColumns"]>,
    },

    spanMethod: {
      required: true,
      type: Function as PropType<TableToolBarType["spanMethod"]>,
    },

    lastLevelAllColumns: {
      required: true,
      type: Array as PropType<TableToolBarType["lastLevelAllColumns"]>,
    },

    tableDataSource: {
      required: true,
      type: Array as PropType<TableToolBarType["tableDataSource"]>,
    },

    tableRef: {
      required: true,
      type: [Object, null] as PropType<TableToolBarType["tableRef"]>,
    },
  },

  setup(props) {
    const { tableSlots } = inject(LAY_TABLE_CONTEXT) as LayTableContextType;
    const { showToolbars, ...resetToolBar } = useToolBar(props);

    return () => {
      if (!isValueArray(showToolbars.value) && !tableSlots.toolbar) {
        return null;
      }

      return h("div", { class: clsPrefix("table-tool") }, [
        h("div", { class: clsPrefix("table-tool-temp") }, [
          h(LayRender, { slots: tableSlots, render: "toolbar" }),
        ]),

        isValueArray(showToolbars.value) && h(
          "div",
          { class: clsPrefix("table-tool-self") },
          h(LaySpace, () => showToolbars.value.map((toolbar, index) => {
            return h(ToolbarItem, {
              toolbar,
              key: index,
              resetParams: {
                ...resetToolBar,
                hierarchicalColumns: props.hierarchicalColumns,
              },
            });
          })),
        ),
      ]);
    };
  },
});

export default TableToolbar;
