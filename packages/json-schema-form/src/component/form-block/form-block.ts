import type { InputsProps, modelType, InputsType } from "../form/types";
import type { PropType, Component } from "vue";
import { defineComponent, h, inject } from "vue";

import {
  LayInput,
  LayRate,
  LaySelect,
  LaySwitch,
  LayTextarea,
} from "@layui/layui-vue";
import LayRadio from "../radio";
import LayCheckbox from "../checkbox";

const getComponent = (input: InputsProps): Component => {
  // 自定义Compoents
  if (typeof input.getComponent === "function") {
    return input.getComponent.call(undefined);
  }

  const type = input.type.toLowerCase() as InputsType;

  switch (type) {
    case "text":
      return LayInput;
    case "textarea":
      return LayTextarea;
    case "select":
      return LaySelect;
    case "switch":
      return LaySwitch;
    case "rate":
      return LayRate;
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
    const component = getComponent(props.input);

    const LayJsonSchemaFormData = inject("LayJsonSchemaForm") as modelType;

    return () => {
      return h(component, {
        modelValue: LayJsonSchemaFormData.model[props.input.name],
        "onUpdate:modelValue": (v: any) =>
          (LayJsonSchemaFormData.model[props.input.name] = v),
        ...props.input,
      });
    };
  },
});
