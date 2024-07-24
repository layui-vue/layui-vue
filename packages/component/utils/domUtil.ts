import type { VNode } from "vue";
import { isVNode } from "vue";

/**
 * 获取 top 属性值
 * <p>
 * @param elem dom
 * */
export function getTop(elem: any): any {
  return (
    elem.offsetTop + ((elem.offsetParent && getTop(elem.offsetParent)) || 0)
  );
}

/**
 * 获取 left 属性值
 * <p>
 * @param elem dom
 * */
export function getLeft(elem: any): any {
  return (
    elem.offsetLeft + ((elem.offsetParent && getLeft(elem.offsetParent)) || 0)
  );
}

/**
 * 事件绑定
 * <p>
 * @param elem dom
 * @param events 事件
 * @param handler 事件回调
 * */
export function on(elem: any, events: any, handler: any) {
  []
    .concat(events)
    .forEach((event) => elem.addEventListener(event, handler, false));
}

/**
 * 单次事件
 * <p>
 * @param elem dom
 * @param events 事件
 * @param handler 事件回调
 * */
export function once(elem: any, events: any, handler: any) {
  const listener = function (_this: any, args: any) {
    handler.apply(_this, args);
    off(elem, events, listener);
  };
  on(elem, events, listener);
}

/**
 * 事件解除
 * <p>
 * @param elem dom
 * @param events 事件
 * @param handler 事件回调
 * */
export function off(elem: any, events: any, handler: any) {
  []
    .concat(events)
    .forEach((event) => elem.removeEventListener(event, handler, false));
}

export const flattedChildren = (children) => {
  const vNodes = Array.isArray(children) ? children : [children];
  const result: VNode[] = [];

  vNodes.forEach((child: VNode) => {
    if (Array.isArray(child)) {
      result.push(...flattedChildren(child));
    } else if (isVNode(child) && Array.isArray(child.children)) {
      result.push(...flattedChildren(child.children));
    } else {
      result.push(child);
      if (isVNode(child) && child.component?.subTree) {
        result.push(...flattedChildren(child.component.subTree));
      }
    }
  });
  return result;
};
