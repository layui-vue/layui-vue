import type {
  modelType,
  InputsType,
  ComponentsProps,
  SchemaValueType,
} from "../form/types";
import type { PropType, Component } from "vue";
import { defineComponent, h, inject } from "vue";

import {
  LayInput,
  LayRate,
  LaySelect,
  LaySwitch,
  LayTextarea,
  LayDatePicker,
} from "@layui/layui-vue";
import LayRadio from "../radio";
import LayCheckbox from "../checkbox";

const getComponent = (componentsProps: ComponentsProps): Component => {
  if (componentsProps.type) {
    const type = componentsProps.type.toLowerCase() as InputsType;

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
    `(LayJsonSchemaForm): componentsProps.type：${componentsProps.type} 未知组件类型`
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

      if (
        typeof props.schemaValue.componentsProps.customRender === "function"
      ) {
        const vnode = props.schemaValue.componentsProps.customRender.call(
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

      const component = getComponent(props.schemaValue.componentsProps);

      return h(component, {
        modelValue: LayJsonSchemaFormData.model[props.fieldName],
        "onUpdate:modelValue": (v: any) =>
          (LayJsonSchemaFormData.model[props.fieldName] = v),
        ...props.schemaValue.componentsProps,
        ...props.schemaValue.listeners,
      });
    };
  },
});
