import { defineComponent, VNodeTypes } from "vue";

import type { PropType } from "vue";

export type RenderFunc = (props: Record<string, unknown>) => VNodeTypes;

export default defineComponent({
  name: "RenderFunction",
  props: {
    renderFunc: {
      type: Function as PropType<RenderFunc>,
      default: null,
    },
  },
  setup(props, ctx) {
    return () => {
      if (typeof props.renderFunc !== "function") {
        return null;
      }
      return props.renderFunc(ctx.attrs);
    };
  },
});
