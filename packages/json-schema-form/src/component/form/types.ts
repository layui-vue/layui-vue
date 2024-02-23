import type { VNode } from "vue";
import type { ColProps } from "@layui/layui-vue/types/component/col/index.vue";
import type { ValidateError, Rule } from "async-validator";

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

type ErrorMessage = {
  errorMessage: string;
  requiredErrorMessage: string;
};

type customRenderFnType = (input: InputsProps, model: modelType) => VNode;
type customRenderType = string | customRenderFnType;

export interface JsonSchemaFormProps {
  model?: modelType;
  initValidate?: boolean;
  useCN?: boolean;
  required?: boolean;
  requiredIcons?: string;
  pane?: boolean;
  labelPosition?: string;
  size?: string;
  labelWidth?: string;
  space?: number | string;
  inputs: InputsProps[];
}

export interface InputsProps extends modelType {
  label: string;
  type: InputsType;
  name: string;
  required?: boolean;
  rules?: Rule;
  errorMessage: ErrorMessage;
  hidden?: boolean;
  colProps?: ColProps;
  customRender?: customRenderType;
}

export declare interface FormCallback {
  (isValid?: boolean, model?: modelType, errors?: ValidateError[] | null): void;
}
