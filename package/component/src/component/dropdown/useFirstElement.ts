import { Component, onMounted, onUpdated, ref, VNode, VNodeTypes } from "vue";

export interface SlotChildren {
  value?: VNode[];
}

// Quoted from arco-vue
// https://github.com/arco-design/arco-design-vue/blob/main/packages/web-vue/components/_utils/vue-utils.ts
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

export const getChildrenArray = (vn: VNode): VNode[] | undefined => {
  if (isArrayChildren(vn, vn.children)) {
    return vn.children;
  }
  if (Array.isArray(vn)) {
    return vn;
  }
  return undefined;
};

export const getFirstElementFromVNode = (
  vn: VNode
): HTMLElement | undefined => {
  if (isElement(vn)) {
    return vn.el as HTMLElement;
  }
  if (isComponent(vn)) {
    if ((vn.el as Node)?.nodeType === 1) {
      return vn.el as HTMLElement;
    }
    if (vn.component?.subTree) {
      const ele = getFirstElementFromVNode(vn.component.subTree);
      if (ele) return ele;
    }
  } else {
    const children = getChildrenArray(vn);
    return getFirstElementFromChildren(children);
  }
  return undefined;
};

export const getFirstElementFromChildren = (
  children: VNode[] | undefined
): HTMLElement | undefined => {
  if (children && children.length > 0) {
    for (const child of children) {
      const element = getFirstElementFromVNode(child);
      if (element) return element;
    }
  }
  return undefined;
};

export const useFirstElement = () => {
  const children: SlotChildren = {};
  const firstElement = ref<HTMLElement>();

  const getFirstElement = () => {
    const element = getFirstElementFromChildren(children.value);
    if (element !== firstElement.value) {
      firstElement.value = element;
    }
  };

  onMounted(() => getFirstElement());

  onUpdated(() => getFirstElement());

  return {
    children,
    firstElement,
  };
};
