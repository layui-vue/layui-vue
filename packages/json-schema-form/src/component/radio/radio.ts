import type { PropType } from "vue";
import { defineComponent, h } from "vue";
import { LayRadioGroup, LayRadio, LayRadioButton } from "@layui/component";

interface RadioOptions {
  label: string;
  value: string;
}

export default defineComponent({
  name: "LayJsonSchemaFormRadio",
  props: {
    modelValue: {
      type: [String, Boolean, Number],
      default: "",
    },
    name: {
      type: String,
      default: "",
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    options: {
      type: Array as PropType<RadioOptions[]>,
      default: () => [],
    },
    button: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, ctx) {
    return () => {
      const children = props.options.map((option) => {
        return h(props.button ? LayRadioButton : LayRadio, option);
      });

      const updateModelFn = ctx.attrs["onUpdate:modelValue"] as Function;
      return h(
        LayRadioGroup,
        {
          ...props,
          "onUpdate:modelValue": (v) => updateModelFn.call(undefined, v),
        },
        {
          default: () => children,
        }
      );
    };
  },
});
