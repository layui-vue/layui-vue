export const check = (arr: any[], value: any) => {
  return arr.indexOf(value) > -1;
};

/**
 * 计算数组差异
 *
 * @param arr1 数组
 * @param arr2 数组
 */
function diff(arr1: any[], arr2: any[]) {
  var newArr = [];
  arr1 = Array.from(new Set(arr1)); // 去重
  arr2 = Array.from(new Set(arr2)); // 去重
  newArr = arr1.concat(arr2);
  return newArr.filter((x) => !(arr1.includes(x) && arr2.includes(x)));
}
