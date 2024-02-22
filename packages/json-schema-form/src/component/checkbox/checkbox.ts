import type { PropType } from "vue";
import type { CheckboxSize } from "@layui/layui-vue/types/component/checkbox/interface";
import type { Recordable } from "@layui/layui-vue/types/types";
import { defineComponent, h } from "vue";
import { LayCheckboxGroup, LayCheckbox } from "@layui/layui-vue";

interface CheckboxOptions {
  label: string;
  value: string | number;
  skin?: string;
  disabled?: boolean;
  size?: CheckboxSize;
}

export default defineComponent({
  name: "LayJsonSchemaFormCheckbox",
  props: {
    modelValue: {
      type: Array as PropType<Recordable[]>,
      default: () => [],
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
      type: Array as PropType<CheckboxOptions[]>,
      default: () => [],
    },
    button: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, ctx) {
    return () => {
      const children = props.options.map((option: CheckboxOptions) => {
        return h(LayCheckbox, { ...option, name: props.name });
      });

      const updateModelFn = ctx.attrs["onUpdate:modelValue"] as Function;
      return h(
        LayCheckboxGroup,
        {
          modelValue: props.modelValue,
          disabled: props.disabled,
          "onUpdate:modelValue": (v) => updateModelFn.call(undefined, v),
        },
        {
          default: () => children,
        }
      );
    };
  },
});
