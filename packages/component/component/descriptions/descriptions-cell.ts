import type { PropType, VNode } from "vue";
import type { DescriptionsContext } from "./descriptions";
import type { DescriptionsItemsNode } from "../descriptionsItem/interface";

import { inject, h, defineComponent } from "vue";
import { DESCRIPTIONS_INJECTION_KEY } from "./descriptions";
import { isNil } from "../../utils";

export default defineComponent({
  name: "LayDescriptionsCell",
  props: {
    cell: {
      type: Object as PropType<DescriptionsItemsNode>,
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

    const itemProps = props.cell.props || {};
    const label = props.cell.children?.label?.() || itemProps.label;
    const content = props.cell.children?.default?.();
    const span = itemProps.span;
    const align = itemProps.align ? `is-${itemProps.align}` : "";
    const labelAlign = itemProps.labelAlign ? `is-${itemProps.labelAlign}` : "";
    const style = itemProps.style;
    const labelStyle = itemProps.labelStyle;
    const classes = itemProps.class;
    const labelClasses = itemProps.labelClass;

    const isVertical = direction === "vertical";
    const isLabel = props.type === "label";

    return () => {
      switch (props.type) {
        case "label":
        case "content":
          return h(
            props.tag,
            {
              style: isLabel ? labelStyle : style,
              class: [
                "layui-descriptions-cell",
                `layui-descriptions-${props.type}`,
                isLabel
                  ? `${labelClasses} ${labelAlign}`
                  : `${classes} ${align}`,
                ,
                {
                  [`is-border-${props.type}`]: border,
                  [`is-vertical-${props.type}`]: isVertical,
                },
              ],
              colSpan: isVertical ? span : isLabel ? 1 : span! * 2 - 1,
            },
            isLabel ? label : content
          );
        default:
          return h(
            "td",
            {
              class: ["layui-descriptions-cell"],
              colSpan: span,
            },
            [
              !isNil(label)
                ? h(
                    "span",
                    {
                      style: labelStyle,
                      class: [
                        "layui-descriptions-label",
                        labelClasses,
                        labelAlign,
                      ],
                    },
                    label
                  )
                : undefined,
              h(
                "span",
                {
                  style: style,
                  class: ["layui-descriptions-content", classes, align],
                },
                content
              ),
            ]
          );
      }
    };
  },
});
