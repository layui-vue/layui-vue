import type { StyleValue } from "vue";
import type { TableToolBarType } from "../components/types";

import { useI18n } from "../../../language";

export const useToolBar = (props: TableToolBarType) => {
  const { t } = useI18n();

  const showToolbar = (toolbarName: string) => {
    if (props.defaultToolbar instanceof Array) {
      return props.defaultToolbar.includes(toolbarName);
    }
    return props.defaultToolbar;
  };

  const toolbarStyle = (toolbarName: string) => {
    if (props.defaultToolbar instanceof Array) {
      return { order: props.defaultToolbar.indexOf(toolbarName) } as StyleValue;
    }
  };

  // 报表导出
  const exportData = () => {
    let tableStr = ``;
    for (const tableHeadColumn of props.tableHeadColumns) {
      tableStr += "<tr>";
      for (const column of tableHeadColumn) {
        if (!column.ignoreExport) {
          // 如果 column.type 等于 checkbox 或 radio 时，该列不导出
          if ((column.type && column.type === "number") || !column.type) {
            tableStr += `<td colspan=${column.colspan} rowspan=${
              column.rowspan
            }>${column.title || ""}</td>`;
          }
        }
      }
      tableStr += "</tr>";
    }
    const doExport = (source: Array<any>) => {
      source.forEach((item, rowIndex) => {
        tableStr += "<tr>";
        props.tableBodyColumns.forEach((tableColumn, columnIndex) => {
          if (!tableColumn.ignoreExport) {
            // 如果该列是特殊列，并且类型为 number 时，特殊处理
            if (tableColumn.type && tableColumn.type == "number") {
              tableStr += `<td>${rowIndex + 1}</td>`;
            } else {
              // 如果不是特殊列，进行字段匹配处理
              if (tableColumn.type == undefined) {
                let columnData = undefined;
                Object.keys(item).forEach((name) => {
                  if (tableColumn.key === name) {
                    columnData = item;
                  }
                });
                // 拼接列
                const rowColSpan = props.spanMethod?.(
                  item,
                  tableColumn,
                  rowIndex,
                  columnIndex
                );
                const rowspan = rowColSpan ? rowColSpan[0] : 1;
                const colspan = rowColSpan ? rowColSpan[1] : 1;

                // 如果 rowspan 和 colspan 是 0 说明该列作为合并列的辅助列。
                // 则不再进行结构拼接。
                if (rowspan != 0 && colspan != 0) {
                  tableStr += `<td colspan=${colspan} rowspan=${rowspan} x:str>${
                    columnData ? columnData[tableColumn.key] : ""
                  }</td>`;
                }
              }
            }
          }
        });
        tableStr += "</tr>";
        if (item.children) doExport(item.children);
      });
    };
    doExport(props.tableDataSource);
    const worksheet = "Sheet1";
    const uri = "data:application/vnd.ms-excel;base64,";
    const exportTemplate = `<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel"
        xmlns="http://www.w3.org/TR/REC-html40">
        <head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet>
            <x:Name>${worksheet}</x:Name>
                <x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet>
            </x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]-->
        </head>
        <body>
            <table syle="table-layout: fixed;word-wrap: break-word; word-break: break-all;">${tableStr}</table>
        </body>
    </html>`;
    window.location.href =
      uri + window.btoa(unescape(encodeURIComponent(exportTemplate)));
    return;
  };

  const print = () => {
    const subOutputRankPrint = props.tableRef!;
    const newContent = subOutputRankPrint.innerHTML;
    const oldContent = document.body.innerHTML;
    document.body.innerHTML = newContent;
    window.print();
    window.location.reload();
    document.body.innerHTML = oldContent;
  };

  const handleToolbarFilterCheck = (value: string[], column: any) => {
    column.hide = !value.some((v) => v === column.key);
  };

  return {
    t,
    showToolbar,
    toolbarStyle,
    exportData,
    print,
    handleToolbarFilterCheck,
  };
};