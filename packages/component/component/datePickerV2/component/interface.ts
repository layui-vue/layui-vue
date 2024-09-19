import type { ComputedRef, StyleValue } from "vue";
import type { Dayjs } from "dayjs";
import type {
  DatePickerModelValueSingleType,
  DatePickerProps,
  DatePickerType,
} from "../interface";
import type { CommonSize, CommonClass } from "../../../types/common";

export interface CommonBlockProps {
  name?: string;
  modelValue:
    | DatePickerModelValueSingleType
    | Array<DatePickerModelValueSingleType>;
  classes: CommonClass;
  size: CommonSize;
  disabled: boolean;
  allowClear: boolean;
  format?: string;
  range: boolean;
  rangeSeparator: string;
  readonly: boolean;
  prefixIcon?: string;
  suffixIcon?: string;
  contentClass?: CommonClass;
  contentStyle?: StyleValue;
  [key: string]: any;
}

export type BaseDateTypeProps = DatePickerProps & {
  modelValue: Dayjs;
  dateType: DatePickerType;
};

import type { InjectionKey } from "vue";

export type CommonBlockContext = {
  // initDate: ComputedRef<Array<Dayjs>>;
  // setNowDate: () => void;
};

export const PICKER_CONTEXT = Symbol("PickerContext");
export const COMMON_BLOCK_CONTEXT: InjectionKey<CommonBlockContext> =
  Symbol("CommonBlock");
export const YEAR_CONTEXT = Symbol("YearContext");
export const HEADER_YEAR_CONTEXT = Symbol("HeaderYearContext");
