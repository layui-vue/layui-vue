import { defineComponent, VNodeTypes, Slots } from "vue";

import type { PropType } from "vue";

type RenderFunc = (props: Record<string, unknown>) => VNodeTypes;

export default defineComponent({
  name: "LayRender",
  inheritAttrs: false,
  props: {
    outProps: {
      type: Object as PropType<Record<string, unknown>>,
    },
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
        return (props.slots ?? ctx.slots)?.[props.render]?.(
          Object.assign({}, props.outProps, ctx.attrs)
        );
      }
      return (props.render as RenderFunc)(
        Object.assign({}, props.outProps, ctx.attrs)
      );
    };
  },
});
