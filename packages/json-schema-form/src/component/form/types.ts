import type { VNode } from "vue";
import type { ColProps } from "@layui/component/component/col/interface";
import type { FormItemProps } from "@layui/component/component/formItem/types";
import type { FormProps } from "@layui/component/component/form/interface";

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

export interface JsonSchemaFormProps extends FormProps {
  space?: number | string;
  schema: SchemaProps;
}

export interface SchemaProps {
  [key: string]: SchemaValueType;
}

export interface SchemaValueType extends FormItemProps {
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
