import type { ComponentPublicInstance, Ref, VNodeArrayChildren } from "vue";

import { defineComponent, Fragment, ref } from "vue";

type RefSetter = (el: Element | ComponentPublicInstance | undefined) => void;

const isArray = Array.isArray;
const isFunction = (val: unknown): val is Function => typeof val === "function";

function composeRefs(...refs: (Ref<HTMLElement | undefined> | RefSetter)[]) {
  return (el: HTMLElement | ComponentPublicInstance | null) => {
    refs.forEach((ref) => {
      if (isFunction(ref)) {
        ref(el as HTMLElement | ComponentPublicInstance);
      }
      else {
        ref.value = el as HTMLElement | undefined;
      }
    });
  };
}

function ensureOnlyChild(children: VNodeArrayChildren | undefined) {
  if (!isArray(children) || children.length > 1) {
    throw new Error("expect to receive a single Vue element child");
  }
  return children[0];
}

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
          (el as HTMLElement).nextElementSibling as HTMLElement | null,
        );
      }
      else {
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
