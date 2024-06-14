import { Fragment, defineComponent, ref } from "vue";

import type { Ref, ComponentPublicInstance, VNodeArrayChildren } from "vue";

export type RefSetter = (el: HTMLElement | null) => void;

const isArray = Array.isArray;
const isFunction = (val) => typeof val === "function";

const composeRefs = (...refs: (Ref<HTMLElement | undefined> | RefSetter)[]) => {
  return (el: Element | ComponentPublicInstance | null) => {
    refs.forEach((_ref) => {
      if (isFunction(_ref)) {
        _ref(el as Element | ComponentPublicInstance);
      } else {
        _ref.value = el as HTMLElement | undefined;
      }
    });
  };
};

const ensureOnlyChild = (children: VNodeArrayChildren | undefined) => {
  if (!isArray(children) || children.length > 1) {
    throw new Error("expect to receive a single Vue element child");
  }
  return children[0];
};

export default defineComponent({
  props: {
    setRef: {
      type: Function,
      required: true,
    },
  },
  setup(props, { slots }) {
    const fragmentRef = ref();
    const setRef = composeRefs(fragmentRef, (el) => {
      if (el) {
        props.setRef(
          (el as HTMLElement).nextElementSibling as HTMLElement | null
        );
      } else {
        props.setRef(null);
      }
    });
    return () => {
      const [firstChild] = slots.default?.() || [];
      const child = ensureOnlyChild(firstChild.children as VNodeArrayChildren);
      return <Fragment ref={setRef as any}>{child}</Fragment>;
    };
  },
});
