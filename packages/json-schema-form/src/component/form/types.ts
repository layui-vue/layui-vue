import type { VNode, Slots } from "vue";
import type { ColProps } from "@layui/component/component/col/index.vue";
import type { FormItemProps } from "@layui/component/component/formItem/index.vue";
import type { FormProps } from "@layui/component/component/form/index.vue";

import type { ValidateError } from "async-validator";

export type Type =
  | "input"
  | "select"
  | "textarea"
  | "switch"
  | "radio"
  | "date"
  | "rate"
  | "checkbox";

export type modelType = {
  [key: string]: any;
};

type customRenderFnParamsOptions = {
  schemaKey: string;
  schemaValue: SchemaValueType;
  model: modelType;
};

export type customRenderFnType = (param: customRenderFnParamsOptions) => VNode;
export type customRenderType = string | customRenderFnType;

export interface JsonSchemaFormProps extends /** @vue-ignore */ FormProps {
  space?: number | string;
  schema: SchemaProps;
}

export interface SchemaProps {
  [key: string]: SchemaValueType;
}

export interface SchemaValueType extends /** @vue-ignore */ FormItemProps {
  type?: Type;
  hidden?: boolean;
  props?: modelType;
  slots?: SlotsType;
  listeners?: listenersType;
  colProps?: ColProps;
}

export type SlotsType = {
  customRender?: customRenderType;
} & customSlotType;

export type customSlotType = {
  [key: string]: customRenderType;
};

export type listenersType = {
  [key: string]: () => void;
};

export interface FormCallback {
  (isValid?: boolean, model?: modelType, errors?: ValidateError[] | null): void;
}
