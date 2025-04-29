import type { Recordable } from "@layui/component/types";
import type { PropType } from "vue";
import type { TableColumn } from "../../typing";

import LayIcon from "@layui/component/component/icon";
import { isString } from "@layui/component/utils";
import {
  computed,
  defineComponent,
  inject,

} from "vue";

import { columnsTypeList, LAY_TABLE_CONTEXT } from "../../constant";

export default defineComponent({
  name: "LayTableMainTd",
  inheritAttrs: false,
  props: {
    data: {
      type: Object as PropType<Recordable>,
      default: () => ({}),
    },
    dataIndex: {
      type: Number,
      default: 0,
    },
    column: {
      type: Object as PropType<TableColumn>,
      default: () => ({}),
    },
    columnIndex: {
      type: Number,
      default: 0,
    },
    expandSpace: {
      type: Boolean,
    },
    expandIndex: {
      type: Number,
      default: 0,
    },
    currentIndentSize: {
      type: Number,
      default: 0,
    },
  },
  emits: ["update:expandKeys"],
  setup(
    {
      data,
      column,
      dataIndex,
      columnIndex,
      expandSpace,
      expandIndex,
      currentIndentSize,
    },
    { slots },
  ) {
    const {
      tableProps,
      tableSlots,
      tableEmits,
      expandState,

      commonGetClasses,
      commonGetStylees,
    } = inject(LAY_TABLE_CONTEXT)!;

    const spanMethodAttr = (
      data: Recordable,
      column: TableColumn,
      dataIndex: number,
      columnIndex: number,
    ) => {
      const attrs = tableProps.spanMethod(data, column, dataIndex, columnIndex);
      if (Array.isArray(attrs)) {
        return { rowspan: attrs[0], colspan: attrs[1] };
      }
      else if (attrs instanceof Object) {
        return attrs;
      }
      else {
        return { rowspan: 1, colspan: 1 };
      }
    };

    const isAutoShow = (
      data: Recordable,
      column: TableColumn,
      dataIndex: number,
      columnIndex: number,
    ) => {
      const attrs = spanMethodAttr(data, column, dataIndex, columnIndex);
      if (attrs.colspan === 0 && attrs.rowspan === 0) {
        return false;
      }
      else {
        return true;
      }
    };

    const renderCellClassOrStyle = (
      type: "cellStyle" | "cellClassName",
      {
        data,
        column,
        dataIndex,
        columnIndex,
      }: {
        data: Recordable;
        column: TableColumn;
        dataIndex: number;
        columnIndex: number;
      },
    ) => {
      if (isString(tableProps[type])) {
        return tableProps[type];
      }
      else {
        return (tableProps[type] as Function)(
          data,
          column,
          dataIndex,
          columnIndex,
        );
      }
    };

    const isExpand = computed(() => {
      return expandState.checkExpand(data[tableProps.id]);
    });

    const expandIconType = computed(() => {
      return isExpand.value ? "layui-icon-subtraction" : "layui-icon-addition";
    });

    const handleExpand = (e: MouseEvent) => {
      expandState.toggleExpand(data[tableProps.id], !isExpand.value);

      tableEmits("expand-change", data, e);
    };

    const ChildrenComponent = () => {
      return (
        <>
          {expandSpace && columnIndex === expandIndex && (
            <span style={{ marginRight: `${currentIndentSize}px` }}></span>
          )}

          {expandSpace
            && !data[tableProps.childrenColumnName]
            && !tableSlots.expand
            && columnIndex === expandIndex && (
            <span class="layui-table-cell-expand-icon-spaced"></span>
          )}

          {(tableSlots.expand || data[tableProps.childrenColumnName])
            && columnIndex === expandIndex && (
            <LayIcon
              class="layui-table-cell-expand-icon"
              type={expandIconType.value}
              // @ts-expect-error TODO
              onClick={handleExpand}
            >
            </LayIcon>
          )}
          {slots.default?.()}
        </>
      );
    };

    /**
     * 是否有效的类型
     */
    const isValidType = computed(() => {
      return column.type && columnsTypeList.includes(column.type);
    });

    return () => {
      return (
        isAutoShow(data, column, dataIndex, columnIndex) && (
          <td
            class={commonGetClasses(
              column,
              renderCellClassOrStyle("cellClassName", {
                data,
                column,
                dataIndex,
                columnIndex,
              }),
            )}
            style={commonGetStylees(
              column,
              {
                whiteSpace: column.ellipsisTooltip ? "nowrap" : "normal",
              },
              renderCellClassOrStyle("cellStyle", {
                data,
                column,
                dataIndex,
                columnIndex,
              }),
            )}
            colspan={
              spanMethodAttr(data, column, dataIndex, columnIndex).colspan
            }
            rowspan={
              spanMethodAttr(data, column, dataIndex, columnIndex).rowspan
            }
            onDblclick={
              isValidType.value
                ? e => tableEmits("cell-double", column.key ? data[column.key] : undefined, e)
                : undefined
            }
          >
            {isValidType.value
              ? (
                  <ChildrenComponent />
                )
              : (
                  <div
                    class="layui-table-cell-content"
                    style={{
                      textAlign: column.align,
                      justifyContent: column.align,
                    }}
                  >
                    <ChildrenComponent />
                  </div>
                )}
          </td>
        )
      );
    };
  },
});
