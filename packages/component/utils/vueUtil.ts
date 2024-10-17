import { Component, ComponentInternalInstance, VNode, VNodeTypes } from "vue";

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

export const isElement = (vn: VNode) => {
  return Boolean(vn && vn.shapeFlag & ShapeFlags.ELEMENT);
};

export const isComponent = (
  vn: VNode,
  type?: VNodeTypes
): type is Component => {
  return Boolean(vn && vn.shapeFlag & ShapeFlags.COMPONENT);
};

export const isArrayChildren = (
  vn: VNode,
  children: VNode["children"]
): children is VNode[] => {
  return Boolean(vn && vn.shapeFlag & ShapeFlags.ARRAY_CHILDREN);
};

/**
 * 同时支持驼峰命名和破折号命名的插槽，示例：back-icon 和 backIcon
 * @param vm 组件实例
 * @param name 插槽名
 */
export function convertSlotName(vm: ComponentInternalInstance, name: string) {
  const camelCaseName = camelCase(name);
  const kebabCaseName = kebabCase(name);
  return vm.slots[camelCaseName]
    ? camelCaseName
    : vm.slots[kebabCaseName]
    ? kebabCaseName
    : name;
}

export function camelCase(str: string) {
  return str.replace(/-(\w)/g, (_, c) => (c ? c.toUpperCase() : ""));
}

export function kebabCase(key: string) {
  const result = key.replace(/([A-Z])/g, " $1").trim();
  return result.split(" ").join("-").toLowerCase();
}
