import type { JsonSchemaFormProps } from "./types";
import { computed } from "vue";
import { useFormBlock } from "../form-block/useFormBlock";

export const useForm = (props: JsonSchemaFormProps) => {
  const { Schema } = useFormBlock(props.schema);

  const formProps = computed(() => {
    const formProps = Object.assign({}, props);

    Reflect.deleteProperty(formProps, "space");
    Reflect.deleteProperty(formProps, "schema");

    return formProps;
  });

  return {
    Schema,
    formProps,
  };
};
