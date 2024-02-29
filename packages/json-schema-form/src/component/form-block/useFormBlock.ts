import type { SchemaProps } from "../form/types";
import { computed } from "vue";

export const useFormBlock = (schema: SchemaProps) => {
  const Schema = computed(() => {
    return Object.keys(schema).reduce(
      (_Schema: SchemaProps, schemaKey: string): SchemaProps => {
        if (Reflect.has(_Schema, schemaKey)) {
          throw new Error(
            `(LayJsonSchemaForm): schema中key (${schemaKey}) 重复`
          );
        }

        const schemaValue = schema[schemaKey];

        _Schema[schemaKey] = {
          ...schemaValue,

          hidden: schemaValue.hidden ?? false,

          colProps: {
            ...schemaValue.colProps,
            md: schemaValue.colProps?.md || 24,
          },
        };

        return _Schema;
      },
      {}
    );
  });

  return { Schema };
};
