import type { VNode } from "vue";
import type { ColProps } from "@layui/layui-vue/types/component/col/index.vue";
import type { FormItemProps } from "@layui/layui-vue/types/component/formItem/index.vue";
import type { FormProps } from "@layui/layui-vue/types/component/form/index.vue";

import type { ValidateError } from "async-validator";

export type InputsType =
  | "text"
  | "password"
  | "select"
  | "textarea"
  | "switch"
  | "radio"
  | "date"
  | "datetime"
  | "year"
  | "month"
  | "time"
  | "yearmonth"
  | "rate"
  | "checkbox";

export type modelType = {
  [key: string]: any;
};

type customRenderFnType = (
  componentsProps: ComponentsProps,
  model: modelType
) => VNode;
type customRenderType = string | customRenderFnType;

export interface JsonSchemaFormProps extends FormProps {
  space?: number | string;
  schema: SchemaProps;
}

export interface SchemaProps {
  [key: string]: SchemaValueType;
}

export type SchemaValueType = {
  hidden?: boolean;
  componentsProps: ComponentsProps;
  colProps?: ColProps;
  formItemProps?: FormItemProps;
  listeners?: listenersType;
};

export type ComponentsProps = {
  type?: string;
  customRender?: customRenderType;
} & modelType;

export type listenersType = {
  [key: string]: () => void;
};

export declare interface FormCallback {
  (isValid?: boolean, model?: modelType, errors?: ValidateError[] | null): void;
}
