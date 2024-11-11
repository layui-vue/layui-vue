import type {
  ValidateCallback,
  ValidateError,
  ValidateMessages,
  ValidateFieldsError,
  Values,
} from "async-validator";
import { LayTooltipContext } from "./tooltip";

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
  pane?: boolean;
  labelPosition?: boolean;
  labelWidth?: string;
  size?: "xs" | "sm" | "md" | "lg";
  mode?: "block" | "inline";
  isLabelTooltip?: boolean;
  tooltipProps: LayTooltipContext;
  inlineWidth?: string | number;
}

export interface LayFormItemContext {
  prop?: string;
  $el: HTMLDivElement;
  required?: boolean;
  rules?: Record<string, unknown>;
  validate(callback?: ValidateCallback): Promise<FormItemValidateReturn>;
  clearValidate(): void;
}

export declare type modelType = { [key: string]: any };

export declare interface FormCallback {
  (isValid?: boolean, model?: modelType, errors?: ValidateError[] | null): void;
}

export declare interface FieldValidateError extends ValidateError {
  label?: string;
}

export type FormItemValidateReturn =
  | {
      errors: FieldValidateError[];
      fields: ValidateFieldsError | Values;
    }
  | undefined;
