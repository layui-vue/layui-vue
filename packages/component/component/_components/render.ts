import { defineComponent, VNodeTypes, Slots, defineAsyncComponent } from "vue";

import type { Component, PropType } from "vue";

type RenderFunc = (props: Record<string, unknown>) => VNodeTypes;

export default defineComponent({
  name: "LayRender",
  props: {
    render: {
      type: [String, Function] as PropType<string | RenderFunc>,
    },
    slots: {
      type: Object as PropType<Slots>,
    },
  },
  setup(props, ctx) {
    return () => {
      if (typeof props.render === "string") {
        return props.slots?.[props.render]?.(ctx.attrs);
      }
      return (props.render as RenderFunc)(ctx.attrs);
    };
  },
});

const AsyncRenderer = (c: Component, delay?: number) =>
  defineAsyncComponent({
    loader: () => Promise.resolve(c),
    delay,
  });

export { AsyncRenderer };
