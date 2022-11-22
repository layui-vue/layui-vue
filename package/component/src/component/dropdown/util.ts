import { DropdownPlacement } from "./interface";

import { Component, onMounted, onUpdated, ref, VNode, VNodeTypes } from "vue";
import { isArrayChildren, isComponent, isElement } from "../../utils";

export interface SlotChildren {
  value?: VNode[];
}

export const isScrollElement = (element: HTMLElement) => {
  return (
    element.scrollHeight > element.offsetHeight ||
    element.scrollWidth > element.offsetWidth
  );
};

export const getScrollElements = (container: HTMLElement | undefined) => {
  const scrollElements: HTMLElement[] = [];
  let element: HTMLElement | undefined = container;
  while (element && element !== document.documentElement) {
    if (isScrollElement(element)) {
      scrollElements.push(element);
    }
    element = element.parentElement ?? undefined;
  }
  return scrollElements;
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

export const transformPlacement = (
  placement: DropdownPlacement
): DropdownPlacement => {
  const shouldTransform = placement.includes("-");
  const placementMap: any = {
    top: "start",
    left: "start",
    bottom: "end",
    right: "end",
  };

  if (shouldTransform) {
    const separated = placement.split("-");
    return `${separated[0]}-${
      placementMap[separated[1]] || separated[1]
    }` as DropdownPlacement;
  }
  return placement;
};
