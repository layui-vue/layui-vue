import { PropType, defineComponent, ref, useSlots, watch } from "vue";
import { CascaderProps } from "./interface";
import { LayInput, LayTagInput } from "@layui/layui-vue";

export default defineComponent({
  name: "LayCascaderInputs",
  props: {
    inputProps: Object as PropType<CascaderProps>,
    processInstance: Object as PropType<any>,
    onClear: Function,
  },
  emits: ["update:modelValue", "focus", "blur", "clear"],
  setup(props, { emit }) {
    const slots = useSlots();
    const defaultSlot = slots?.default;
    const modelValue = ref(props.inputProps?.modelValue);
    console.log(props.processInstance);

    const normalInputs = () => {
      return (
        <LayInput
          v-model={modelValue.value}
          suffix-icon="layui-icon-triangle-d"
          placeholder={props.inputProps?.placeholder}
          allow-clear={props.inputProps?.allowClear}
          disabled={props.inputProps?.disabled}
          readonly={true}
          size={props.inputProps?.size}
          onFocus={(event) => emit("focus", event)}
          onClear={() => emit("clear")}
        ></LayInput>
      );
    };

    const multipleInputs = () => {
      return (
        <LayTagInput
          readonly={true}
          // v-model={props.processInstance.selectLabel.value}
          minCollapsedNum={3}
          onFocus={(event) => emit("focus", event)}
          onClear={() => emit("clear")}
        ></LayTagInput>
      );
    };

    return () => (
      <>
        {defaultSlot ? (
          <div class="slot-area">
            <slot></slot>
          </div>
        ) : props.inputProps?.multiple ? (
          multipleInputs()
        ) : (
          normalInputs()
        )}
      </>
    );
  },
});
