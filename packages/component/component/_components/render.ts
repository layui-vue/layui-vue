import type { PropType, Slots, VNodeTypes } from "vue";

import { defineComponent } from "vue";

type RenderFunc = (props: Record<string, unknown>) => VNodeTypes;

export default defineComponent({
  name: "LayRender",
  inheritAttrs: false,
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
        return (props.slots)?.[props.render]?.(ctx.attrs);
      }
      return (props.render as RenderFunc)(ctx.attrs);
    };
  },
});
