import type { DescriptionsContext } from "./descriptions";

import { inject, h, defineComponent } from "vue";
import { DESCRIPTIONS_INJECTION_KEY } from "./descriptions";

import LayDescriptionsCell from "./descriptions-cell";

export default defineComponent({
  name: "LayDescriptionsRow",
  props: {
    row: {
      type: Array,
      default: () => [],
    },
  },

  setup(props) {
    const { direction, border } = inject(
      DESCRIPTIONS_INJECTION_KEY,
      {} as DescriptionsContext
    );

    return () => {
      if (direction === "vertical") {
        return [
          h(
            "tr",
            props.row.map((cell: any) => {
              return h(LayDescriptionsCell, {
                cell,
                tag: "th",
                type: "label",
              });
            })
          ),
          h(
            "tr",
            props.row.map((cell: any) => {
              return h(LayDescriptionsCell, {
                cell,
                tag: "td",
                type: "content",
              });
            })
          ),
        ];
      } else {
        return h(
          "tr",
          props.row.map((cell: any) => {
            return border
              ? [
                  h(LayDescriptionsCell, {
                    cell,
                    tag: "td",
                    type: "label",
                  }),
                  h(LayDescriptionsCell, {
                    cell,
                    tag: "td",
                    type: "content",
                  }),
                ]
              : h(LayDescriptionsCell, {
                  cell,
                  tag: "td",
                  type: "item",
                });
          })
        );
      }
    };
  },
});
