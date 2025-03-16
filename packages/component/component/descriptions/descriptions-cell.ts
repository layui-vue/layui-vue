import type { PropType } from "vue";
import type { DescriptionsContext } from "./descriptions";
import type { DescriptionsItemsNode } from "../descriptionsItem/interface";

import { inject, h, defineComponent } from "vue";
import { DESCRIPTIONS_INJECTION_KEY } from "./descriptions";
import { isNil, normalizeProps } from "../../utils";

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
  setup() {
    const descriptionsContext = inject(
      DESCRIPTIONS_INJECTION_KEY,
      {} as DescriptionsContext
    );

    return { descriptionsContext };
  },
  render() {
    const { border, direction } = this.descriptionsContext;
    const itemProps = normalizeProps(this.cell.props);
    const label = this.cell.children?.label?.() || itemProps.label;
    const content = this.cell.children?.default?.();

    const span = itemProps.span;
    const align = itemProps.align ? `is-${itemProps.align}` : "";
    const labelAlign = itemProps.labelAlign ? `is-${itemProps.labelAlign}` : "";
    const style = itemProps.style;
    const labelStyle = itemProps.labelStyle;
    const classes = itemProps.class ?? "";
    const labelClasses = itemProps.labelClass ?? "";

    const isVertical = direction === "vertical";
    const isLabel = this.type === "label";

    switch (this.type) {
      case "label":
      case "content":
        return h(
          this.tag,
          {
            style: isLabel ? labelStyle : style,
            class: [
              "layui-descriptions-cell",
              `layui-descriptions-${this.type}`,
              isLabel ? `${labelClasses} ${labelAlign}` : `${classes} ${align}`,
              ,
              {
                [`is-border-${this.type}`]: border,
                [`is-vertical-${this.type}`]: isVertical,
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
  },
});
