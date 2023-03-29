import { Recordable } from "../../../types";
import { TableColumn } from "../typing";
import { Ref, watchEffect, ComputedRef } from "vue";

/**
 * 列自动设置宽度
 *
 * ( 宽度 < minWidth ) ==> minWidth
 * ( minWidth < 宽度 < 300px )  ==> 宽度
 * ( 宽度 > 300px ) ==> 300px
 *
 * @param columns 表格列
 * @param dataSource 表格数据
 */
export default function useAutoColsWidth(
  columns: ComputedRef<Recordable[]>,
  dataSource: Ref<any[]>
): void {
  watchEffect(() => {
    // 如果 columns 或 dataSource 为空，停止计算
    if (columns.value.length === 0 || dataSource.value.length === 0) return;

    // 标记列配置：不处理带有width、不处理没有key、对有children递归
    const colsMap: Map<string, TableColumn> = new Map();
    handleCols(columns.value, colsMap); // 时间复杂度 n

    // 基于编辑列配置colsMap，记录数据最长的字段
    const longestMap: Map<string, string> = new Map();
    handleLongest(dataSource.value, longestMap, colsMap); // 最大时间复杂度 100n

    // 单元格内距
    const padding = 16;
    longestMap.forEach((value, key) => {
      // 获取最长单元格宽度
      const width = getTextWidth(value) + padding;

      // 获取当前单元格对象
      const colsItem = colsMap.get(key);

      // 为 column 设置宽度，但最大值不
      // 超过 300px, 最小值不超过 50px.
      if (width < 300 && width > 50) {
        colsItem && (colsItem.width = `${width}px`);
      } else if (width < 50) {
        colsItem && (colsItem.width = `50px`);
      } else {
        colsItem && (colsItem.width = `300px`);
      }
    });
  });
}

function handleCols(data: Recordable[], colsMap: Map<string, TableColumn>) {
  data.forEach((item) => {
    // 有width配置不处理
    if (item.width) return;

    // 复杂表头带有children配置递归
    if (item.children) {
      handleCols(item.children, colsMap);
      return;
    }

    // 未配置key字段不处理且没有children
    if (!item.key) return;

    colsMap.set(item.key, item as TableColumn);
  });
}

function handleLongest(
  data: any[],
  longestMap: Map<string, string>,
  colsMap: Map<string, TableColumn>
) {
  // 最大时间复杂度 100n
  for (let i = 0; i < data.length && i < 100; i++) {
    const sourceItem = data[i];
    colsMap.forEach((value, key) => {
      if (value.width) return;
      if (typeof sourceItem[key] !== "string") return;
      const longestKey = longestMap.get(key);
      if (longestKey) {
        if (longestKey.length < sourceItem[key].length) {
          longestMap.set(key, sourceItem[key]);
        }
      } else {
        longestMap.set(key, sourceItem[key]);
      }
    });
  }
}

/**
 * 获取 text 的宽度
 *
 * @param text 文本
 * @returns number 宽度
 */
function getTextWidth(text: string): number {
  let result = 0;
  const bodyStyles = window.getComputedStyle(document.body);
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");
  if (context) {
    context.font = bodyStyles.font;
    const metrics = context.measureText(text);
    result = metrics.width;
  }
  return result;
}
