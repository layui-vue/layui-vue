import type { Component } from "vue";
import type { ColProps } from "@layui/layui-vue/types/component/col/index.vue";
import type { ValidateError, Rule } from "async-validator";

export type InputsType = "text" | "select";

export type modelType = {
  [key: string]: any;
};

type ErrorMessage = {
  errorMessage: string;
  requiredErrorMessage: string;
};

export interface InputsProps {
  label: string;
  type: InputsType;
  name: string;
  value?: any;
  required?: boolean;
  rules?: Rule;
  errorMessage: ErrorMessage;
  colProps?: ColProps;
  getComponent?: () => Component;
}

export interface JsonSchemaFormProps {
  initValidate?: boolean;
  pane?: boolean;
  labelPosition?: string;
  size?: string;
  labelWidth: string;
  space?: number | string;
  inputs: InputsProps[];
}

export declare interface FormCallback {
  (isValid?: boolean, model?: modelType, errors?: ValidateError[] | null): void;
}
