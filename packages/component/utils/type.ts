export function isFunction<T extends (...args: any[]) => any>(val: unknown): val is T {
  return typeof val === "function";
}

export const isUndefined = (val: any): val is undefined => val === undefined;

export const isNumber = (val: any): val is number => typeof val === "number";

export const isString = (val: any): val is string => typeof val === "string";

export function isDate(val: Date): boolean {
  return val instanceof Date && !Number.isNaN(val.valueOf());
}

export function isBoolean(val: unknown): val is boolean {
  return typeof val === "boolean";
}

/**
 * 过滤出非undefined | null | '' 的集合
 * @param {any[]} val 数据源
 * @returns {any[]} 过滤后数据
 */
type NotFalsy<T> = T extends "" | null | undefined ? never : T;

export function normalizeValue<T>(val: T[]): NotFalsy<T>[] {
  return val.filter((v): v is NotFalsy<T> => v !== undefined && v !== null && v !== "");
}

export function isNil(val: any): boolean {
  return val === undefined || val === null;
}

/**
 * Object.is
 * @param value
 * @param diffValue
 */
export function isEqual(value: any, diffValue: any): boolean {
  return Object.is(value, diffValue);
}
