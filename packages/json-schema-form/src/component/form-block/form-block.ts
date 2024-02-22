import type { InputsProps, modelType, InputsType } from "../form/types";
import type { PropType, Component, VNodeTypes } from "vue";
import { defineComponent, h, inject, isVNode } from "vue";

import {
  LayInput,
  LayRate,
  LaySelect,
  LaySwitch,
  LayTextarea,
} from "@layui/layui-vue";
import LayRadio from "../radio";
import LayCheckbox from "../checkbox";

const getComponent = (input: InputsProps): Component | VNodeTypes => {
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

      if (isVNode(component)) {
        return component;
      }

      return h(component as Component, {
        modelValue: LayJsonSchemaFormData.model[props.input.name],
        "onUpdate:modelValue": (v: any) =>
          (LayJsonSchemaFormData.model[props.input.name] = v),
        ...props.input,
      });
    };
  },
});
