import type {
  modelType,
  InputsType,
  ComponentProps,
  SchemaValueType,
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

const getComponent = (
  schemaValue: SchemaValueType,
  fieldName: string
): Component => {
  if (schemaValue.type) {
    const type = schemaValue.type.toLowerCase() as InputsType;

    switch (type) {
      case "text":
      case "password":
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
      case "datetime":
      case "year":
      case "month":
      case "time":
      case "yearmonth":
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
      const LayJsonSchemaFormData = inject("LayJsonSchemaForm") as modelType;

      if (typeof props.schemaValue.componentProps.customRender === "function") {
        const vnode = props.schemaValue.componentProps.customRender.call(
          undefined,
          props.schemaValue,
          LayJsonSchemaFormData.model
        );

        // bind listeners
        vnode.props = {
          ...props.schemaValue.listeners,
          ...vnode.props,
        };

        return vnode;
      }

      const component = getComponent(
        props.schemaValue,
        props.fieldName
      );

      return h(component, {
        modelValue: LayJsonSchemaFormData.model[props.fieldName],
        "onUpdate:modelValue": (v: any) =>
          (LayJsonSchemaFormData.model[props.fieldName] = v),
        ...props.schemaValue.componentProps,
        ...props.schemaValue.listeners,
      });
    };
  },
});
