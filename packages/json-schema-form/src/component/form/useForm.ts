import type { JsonSchemaFormProps } from "./types";
import { computed } from "vue";
import { useFormBlock } from "../form-block/useFormBlock";

export const useForm = (props: JsonSchemaFormProps) => {
  const { nInputs } = useFormBlock(props.inputs);

  const formProps = computed(() => {
    return {
      initValidate: props.initValidate || undefined,
      useCN: props.useCN || undefined,
      requiredIcons: props.requiredIcons || undefined,
      pane: props.pane || undefined,
      labelPosition: props.labelPosition || undefined,
      size: props.size || undefined,
      labelWidth: props.labelWidth || undefined,
    };
  });

  return {
    nInputs,
    formProps,
  };
};
