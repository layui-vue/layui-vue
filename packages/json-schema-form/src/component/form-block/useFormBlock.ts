import type { InputsProps } from "../form/types";
import { computed } from "vue";

const checkInput = (input: InputsProps, cacheName: string[]) => {
  if (!input.name) {
    throw new Error(`(LayJsonSchemaForm): inputs中name属性不能为空`);
  }

  if (cacheName.includes(input.name)) {
    throw new Error(`(LayJsonSchemaForm): inputs中name属性(${input.name})重复`);
  }
};

export const useFormBlock = (inputs: InputsProps[]) => {
  const nInputs = computed<InputsProps[]>(() => {
    const cacheName: string[] = [];

    return inputs.map((input: InputsProps) => {
      checkInput(input, cacheName);

      const { colProps, name } = input;
      cacheName.push(name);

      return {
        ...(input as InputsProps),
        colProps: {
          md: colProps?.md || 24,
        },
      };
    });
  });

  return { nInputs };
};
