import type {
  modelType,
  Type,
  SchemaValueType,
  customSlotType,
  customRenderFnType,
} from "../form/types";
import type { PropType, Component } from "vue";
import { defineComponent, h, inject } from "vue";

import {
  LayInput,
  LayRate,
  LaySwitch,
  LayTextarea,
  LayDatePicker,
  LaySelect,
} from "@layui/layui-vue";
import LayRadio from "../radio";
import LayCheckbox from "../checkbox";

const getCustomRenderVNode = (
  LayJsonSchemaFormData: modelType,
  schemaValue: SchemaValueType
) => {
  const vnode = (schemaValue.slots.customRender as customRenderFnType).call(
    undefined,
    schemaValue,
    LayJsonSchemaFormData.model
  );

  // bind listeners
  vnode.props = {
    ...schemaValue.listeners,
    ...vnode.props,
  };

  return vnode;
};

const getComponent = (
  schemaValue: SchemaValueType,
  fieldName: string
): Component => {
  if (schemaValue.type) {
    const type = schemaValue.type.toLowerCase() as Type;

    switch (type) {
      case "input":
        return LayInput;
      case "textarea":
        return LayTextarea;
      case "select":
        return LaySelect;
      case "switch":
        return LaySwitch;
      case "rate":
        return LayRate;
      case "date":
        return LayDatePicker;
      case "radio":
        return LayRadio;
      case "checkbox":
        return LayCheckbox;
    }
  }

  throw new Error(
    `(LayJsonSchemaForm): schema.${fieldName}的componentProps.type为未知类型  `
  );
};

const getComponentSlots = (
  LayJsonSchemaFormData: modelType,
  schemaValue: SchemaValueType
) => {
  const slotRenders: customSlotType = {};
  const { slots: LayJsonSchemaFormSlot } = LayJsonSchemaFormData;
  const { slots: schemaSlot } = schemaValue;

  for (const slotKey in schemaSlot) {
    const slotValue = schemaSlot[slotKey];

    // 当slot[slotkey]的值为string
    if (
      typeof slotValue === "string" &&
      LayJsonSchemaFormSlot.hasOwnProperty(slotValue)
    ) {
      slotRenders[slotKey] = LayJsonSchemaFormSlot[slotValue];
    } else {
      slotRenders[slotKey] = () =>
        (slotValue as customRenderFnType).call(
          undefined,
          schemaValue,
          LayJsonSchemaFormData.model
        );
    }
  }

  return slotRenders;
};

export default defineComponent({
  name: "LayJsonSchemaFormBlock",
  props: {
    schemaValue: {
      type: Object as PropType<SchemaValueType>,
      default: () => ({}),
    },
    fieldName: {
      required: true,
      type: String,
    },
  },
  setup(props, ctx) {
    return () => {
      const { schemaValue, fieldName } = props;
      const LayJsonSchemaFormData = inject("LayJsonSchemaForm") as modelType;

      if (
        schemaValue.slots &&
        typeof schemaValue.slots.customRender === "function"
      ) {
        return getCustomRenderVNode(LayJsonSchemaFormData, schemaValue);
      }

      const component = getComponent(schemaValue, fieldName);
      const slots = getComponentSlots(LayJsonSchemaFormData, schemaValue);

      return h(
        component,
        {
          modelValue: LayJsonSchemaFormData.model[fieldName],
          "onUpdate:modelValue": (v: any) =>
            (LayJsonSchemaFormData.model[fieldName] = v),
          ...schemaValue.props,
          ...schemaValue.listeners,
        },
        slots
      );
    };
  },
});
