export const isFunction = (val: unknown): val is Function =>
  typeof val === "function";

export const isUndefined = (val: any): val is undefined => val === undefined;

export const isNumber = (val: any): val is number => typeof val === "number";

export const isString = (val: any): val is string => typeof val === "string";
export const isDate = (val: Date): boolean =>
  val instanceof Date && !isNaN(val.valueOf());

/**
 * 过滤出非undefined | null | '' 的集合
 * @param {any[]} val 数据源
 * @returns {any[]} 过滤后数据
 */
export const normalizeValue = (val: any[]): any => {
  return val.filter((v) => v !== undefined && v !== null && v !== "");
};

export const isNil = (val: any): boolean => {
  return val === undefined || val === null;
};
