import type { Rule } from "async-validator";

export interface FormItemProps {
  prop?: string;
  mode?: "block" | "inline";
  label?: string;
  labelPosition?: "right" | "left" | "top";
  labelWidth?: string | number;
  errorMessage?: string;
  rules?: Rule;
  required?: boolean;
  requiredErrorMessage?: string;
  size?: "xs" | "sm" | "md" | "lg";
  tips?: string;
  inlineWidth?: string | number;
}
