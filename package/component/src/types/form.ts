import type {
  ValidateCallback,
  ValidateError,
  ValidateMessages,
} from "async-validator";

export interface LayFormContext {
  model: modelType;
  required?: boolean;
  requiredErrorMessage?: string;
  validateMessage: ValidateMessages;
  rules?: Record<string, unknown>;
  useCN: boolean;
  requiredIcons?: string;
  addField: (field: LayFormItemContext) => void;
  removeField: (field: LayFormItemContext) => void;
}

export interface LayFormItemContext {
  prop?: string;
  $el: HTMLDivElement;
  required?: boolean;
  rules?: Record<string, unknown>;
  validate(callback?: ValidateCallback): void;
  clearValidate(): void;
}

export declare type modelType = { [key: string]: any };

export declare interface FormCallback {
  (isValid?: boolean, model?: modelType, errors?: ValidateError[] | null): void;
}

export declare interface FieldValidateError extends ValidateError {
  label?: string;
}
