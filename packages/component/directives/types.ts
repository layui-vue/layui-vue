import { VNode } from "vue";

type VueDirectiveBindings = {
  value: any;
  oldValue: any;
  expression: string;
  arg: string;
  modifiers: Record<string, boolean>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  dir: VueDirective;
};

type VueDirective = {
  created?: (
    el: HTMLElement,
    bindings: VueDirectiveBindings,
    vnode: VNode
  ) => void;
  beforeMounted?: (
    el: HTMLElement,
    bindings: VueDirectiveBindings,
    vnode: VNode
  ) => void;
  mounted?: (
    el: HTMLElement,
    bindings: VueDirectiveBindings,
    vnode: VNode
  ) => void;
  beforeUpdate?: (
    el: HTMLElement,
    bindings: VueDirectiveBindings,
    vnode: VNode,
    prevVnode?: VNode
  ) => void;
  updated?: (
    el: HTMLElement,
    bindings: VueDirectiveBindings,
    vnode: VNode,
    prevVnode?: VNode
  ) => void;
  beforeUnmount?: (
    el: HTMLElement,
    bindings: VueDirectiveBindings,
    vnode: VNode
  ) => void;
  unmounted?: (
    el: HTMLElement,
    bindings: VueDirectiveBindings,
    vnode: VNode
  ) => void;
};

export type { VueDirectiveBindings, VueDirective };
