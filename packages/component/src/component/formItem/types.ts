import type { Rule } from "async-validator";

export interface FormItemProps {
  prop?: string;
  mode?: string;
  label?: string;
  labelPosition?: string;
  labelWidth?: string | number;
  errorMessage?: string;
  rules?: Rule;
  required?: boolean;
  requiredErrorMessage?: string;
  size?: string;
  tips?: string;
}
