import type { DescriptionsContext } from "./descriptions";

import { inject, h, defineComponent, ComponentOptions } from "vue";
import { DESCRIPTIONS_INJECTION_KEY } from "./descriptions";
import { isNil } from "../../utils";

export default defineComponent({
  name: "LayDescriptionsCell",
  props: {
    cell: {
      type: Object,
      default: () => ({}),
    },
    tag: {
      type: String,
      default: "",
    },
    type: {
      type: String,
      default: "",
    },
  },
  setup(props) {
    const { border, direction } = inject(
      DESCRIPTIONS_INJECTION_KEY,
      {} as DescriptionsContext
    );

    const itemProps: any = props.cell.props || {};
    const label = props.cell.children?.label?.() || itemProps.label;
    const content = props.cell.children?.default?.();

    const isVertical = direction === "vertical";
    const isLabel = props.type === "label";

    return () => {
      switch (props.type) {
        case "label":
        case "content":
          return h(
            props.tag,
            {
              class: [
                "layui-descriptions-cell",
                `layui-descriptions-${props.type}`,
                {
                  [`is-border-${props.type}`]: border,
                  [`is-vertical-${props.type}`]: isVertical,
                },
              ],
              colSpan: isVertical
                ? itemProps.span
                : isLabel
                ? 1
                : itemProps.span * 2 - 1,
            },
            isLabel ? label : content
          );
        default:
          return h(
            "td",
            {
              class: ["layui-descriptions-cell"],
              colSpan: itemProps.span,
            },
            [
              !isNil(label)
                ? h(
                    "span",
                    {
                      class: ["layui-descriptions-label"],
                    },
                    label
                  )
                : undefined,
              h(
                "span",
                {
                  class: ["layui-descriptions-content"],
                },
                content
              ),
            ]
          );
      }
    };
  },
});
