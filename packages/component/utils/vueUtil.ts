import type {
  Component,
  ComponentInternalInstance,
  VNode,
  VNodeTypes,
} from "vue";
import { camelize } from "vue";

import { isArray } from "./arrayUtil";

export enum ShapeFlags {
  ELEMENT = 1,
  FUNCTIONAL_COMPONENT = 1 << 1,
  STATEFUL_COMPONENT = 1 << 2,
  COMPONENT = ShapeFlags.STATEFUL_COMPONENT | ShapeFlags.FUNCTIONAL_COMPONENT,
  TEXT_CHILDREN = 1 << 3,
  ARRAY_CHILDREN = 1 << 4,
  SLOTS_CHILDREN = 1 << 5,
  TELEPORT = 1 << 6,
  SUSPENSE = 1 << 7,
  COMPONENT_SHOULD_KEEP_ALIVE = 1 << 8,
  COMPONENT_KEPT_ALIVE = 1 << 9,
}

export function isElement(vn: VNode) {
  return Boolean(vn && vn.shapeFlag & ShapeFlags.ELEMENT);
}

export function isComponent(vn: VNode, type?: VNodeTypes): type is Component {
  return Boolean(vn && vn.shapeFlag & ShapeFlags.COMPONENT);
}

export function isArrayChildren(vn: VNode, children: VNode["children"]): children is VNode[] {
  return Boolean(vn && vn.shapeFlag & ShapeFlags.ARRAY_CHILDREN);
}

/**
 * 同时支持驼峰命名和破折号命名的插槽，示例：back-icon 和 backIcon
 * @param vm 组件实例
 * @param name 插槽名
 */
export function convertSlotName(vm: ComponentInternalInstance, name: string) {
  const camelCaseName = camelize(name);
  const kebabCaseName = kebabCase(name);
  return vm.slots[camelCaseName]
    ? camelCaseName
    : vm.slots[kebabCaseName]
      ? kebabCaseName
      : name;
}

export function kebabCase(key: string) {
  const result = key.replace(/([A-Z])/g, " $1").trim();
  return result.split(" ").join("-").toLowerCase();
}

export function flattedVNode(children: VNode[]) {
  const vNodes = isArray(children) ? children : [children];
  const result: VNode[] = [];

  vNodes.forEach((vNode) => {
    if (isArrayChildren(vNode, vNode.children)) {
      result.push(...flattedVNode(vNode.children));
    }
    else {
      result.push(vNode);
    }
  });

  return result;
}

/**
 * 将props对象的key从kebab-case转换为camelCase
 * @param props props集合
 */
export function normalizeProps<T extends Record<string, any>>(props: T): T {
  return Object.keys(props).reduce((pre, next) => {
    pre[camelize(next) as keyof T] = props[next];
    return pre;
  }, {} as T);
}
