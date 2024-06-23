import type { Slots, SlotsType, PropType } from "vue";
import type { FormItemProps } from "./types";
import type { LayFormContext } from "../../types/form";

import { defineComponent, inject } from "vue";

export default defineComponent({
  slots: Object as SlotsType<{
    label: { props: Object };
    required: { props: Object };
  }>,
  props: {
    itemSlots: {
      type: Object as PropType<Slots>,
      default: () => ({}),
    },
    isRequired: {
      type: Boolean,
      default: false,
    },
    outProps: {
      type: Object as PropType<FormItemProps>,
      default: () => ({}),
    },
  },
  setup(props) {
    const layForm = inject("LayForm", {} as LayFormContext);
    const slotsData = { ...props.outProps, model: layForm.model };

    const getLabelSlot = () => {
      return props.itemSlots.label
        ? props.itemSlots.label({ props: slotsData })
        : props.outProps.label;
    };

    const getRequiredLabelSlots = () => {
      return props.outProps.prop && props.isRequired ? (
        <span
          class={["layui-required", "layui-icon"].concat(
            layForm.requiredIcons ?? ""
          )}
        >
          {props.itemSlots.required
            ? props.itemSlots.required({ props: slotsData })
            : layForm.requiredIcons
            ? ""
            : "*"}
        </span>
      ) : (
        ""
      );
    };

    return () => (
      <span>
        {getRequiredLabelSlots()}
        {getLabelSlot()}
      </span>
    );
  },
});
