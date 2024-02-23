import type { InputsProps, modelType, InputsType } from "../form/types";
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

const getComponent = (input: InputsProps): Component => {
  const type = input.type.toLowerCase() as InputsType;

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

  throw new Error(`(LayJsonSchemaForm): 未知的组件类型：${type}`);
};

export default defineComponent({
  name: "LayJsonSchemaFormBlock",
  props: {
    input: {
      type: Object as PropType<InputsProps>,
      default: null,
    },
  },
  setup(props, ctx) {
    return () => {
      const LayJsonSchemaFormData = inject("LayJsonSchemaForm") as modelType;

      if (typeof props.input.customRender === "function") {
        return props.input.customRender.call(
          undefined,
          props.input,
          LayJsonSchemaFormData.model
        );
      }

      const component = getComponent(props.input);

      return h(component, {
        modelValue: LayJsonSchemaFormData.model[props.input.name],
        "onUpdate:modelValue": (v: any) =>
          (LayJsonSchemaFormData.model[props.input.name] = v),
        ...props.input,
      });
    };
  },
});
