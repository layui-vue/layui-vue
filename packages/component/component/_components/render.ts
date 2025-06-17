import type { PropType, Slots, VNodeChild } from "vue";

import { normalizeProps } from "@layui/component/utils";
import { defineComponent } from "vue";

export type RenderFunc = (props: Record<string, unknown>) => VNodeChild;

export interface RenderProps {
  render: string | RenderFunc;
  slots: Slots;
}

export default defineComponent({
  name: "LayRender",
  inheritAttrs: false,
  props: {
    render: {
      type: [String, Function] as PropType<RenderProps["render"]>,
    },
    slots: {
      type: Object as PropType<RenderProps["slots"]>,
    },
  },
  setup(props, ctx) {
    return () => {
      if (typeof props.render === "string") {
        return (props.slots)?.[props.render]?.(normalizeProps(ctx.attrs));
      }
      return (props.render as RenderFunc)(normalizeProps(ctx.attrs));
    };
  },
});
