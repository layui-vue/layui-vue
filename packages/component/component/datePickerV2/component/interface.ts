import type { StyleValue } from "vue";
import type { CommonSize, CommonClass } from "../../../types/common";

export interface CommonBlockProps {
  name: string;
  classes: CommonClass;
  size: CommonSize;
  disabled: boolean;
  allowClear: boolean;
  range: boolean;
  rangeSeparator: string;
  readonly: boolean;
  prefixIcon?: string;
  suffixIcon?: string;
  contentClass?: CommonClass;
  contentStyle?: StyleValue;
}
