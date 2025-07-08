import { isFunction, isNumber } from "./type";

export function check(arr: any[], value: any) {
  return arr.includes(value);
}

export function isValueNull(v: any) {
  return Array.isArray(v) ? !v.length : !v;
}

export function isArray(val: any): val is Array<any> {
  return val && Array.isArray(val);
}

export function isValueArray(val: unknown): val is ArrayLike<unknown> {
  return isArray(val) && val.length > 0;
}

export function normalizeArray<T>(value?: T | T[]): T[] {
  return isArray(value) ? value : ([value] as T[]);
}

type callback = (item: any, index: number, parent?: any) => void;
type loopForEachCallback = callback | callback[];
/**
 * 递归遍历array，执行 callback
 * @param array 数据源
 * @param children  子节点字段 | `callback`
 * @param callback 回调函数 `() => void` | `Array<() => void>` | `parent`
 * @param parent 上级节点
 */
export function loopForEach(
  array: any[] | undefined,
  children: string,
  callback: loopForEachCallback,
  parent?: any
): void;
export function loopForEach(
  array: any[] | undefined,
  callback: loopForEachCallback,
  parent?: any
): void;
export function loopForEach(
  array: any[] | undefined,
  children: string | loopForEachCallback,
  callback: loopForEachCallback,
  parent?: any,
) {
  if (!isValueArray(array))
    return;

  let _children: string;
  let _callback: callback[];
  let _parent = parent;

  if (isFunction(children) || isArray(children)) {
    _children = "children";
    _callback = isFunction(children) ? [children] : children;
    _parent = callback;
  }
  else {
    _children = children;
    _callback = isFunction(callback) ? [callback] : callback;
  }

  if (!isValueArray(_callback) || _callback.some(cb => !isFunction(cb)))
    return;

  for (let index = 0; index < array.length; index++) {
    const item = array[index];
    for (let cbIndex = 0; cbIndex < _callback.length; cbIndex++) {
      const cb = _callback[cbIndex];
      cb(item, index, _parent);
    }

    if (item?.[_children]) {
      loopForEach(item[_children], _children, _callback, item);
    }
  }
}

/**
 * 递归找出某级所有节点
 */
export function loopSomeLevelALLChildren(
  lists: any[],
  childrenKey: string,
  level: number
): any[];
export function loopSomeLevelALLChildren(
  lists: any[],
  childrenKey: number
): any[];
export function loopSomeLevelALLChildren(
  lists: any[],
  childrenKey: string | number,
  level = 1,
): any[] {
  let _childrenKey: string;
  let _level: number = level;
  if (isNumber(childrenKey)) {
    _childrenKey = "children";
    _level = childrenKey;
  }

  const result: any[] = [];
  _forEach(lists);

  function _forEach(lists: any[], forEachIndex = 1) {
    for (let index = 0; index < lists.length; index++) {
      const item = lists[index];

      if (forEachIndex === _level) {
        result.push(item);
        continue;
      }
      if (item?.[_childrenKey]) {
        _forEach(item[_childrenKey], forEachIndex + 1);
      }
    }
  }

  return result;
}

export function arrayEverySame<T extends any[]>(arr1: T, arr2: T): boolean {
  return arr1.every(i => arr2.includes(i)) && arr2.every(i => arr1.includes(i));
}
