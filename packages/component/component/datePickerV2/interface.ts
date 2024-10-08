import type { Dayjs, ConfigType } from "dayjs";
import type { StyleValue, Component, InjectionKey, ComputedRef } from "vue";
import type { CommonSize, CommonClass } from "../../types/common";
import type { RequiredByKeys } from "../../types/util";

export type DatePickerType =
  | "date"
  | "datetime"
  | "year"
  | "month"
  | "time"
  | "yearmonth";

export type TypeMap = {
  [k in DatePickerType]: {
    component: Component;
    format: string;
  };
};

export type DatePickerModelValueSingleType = ConfigType;

export interface DatePickerProps {
  name?: string;
  modelValue?:
    | DatePickerModelValueSingleType
    | Array<DatePickerModelValueSingleType>;
  type?: DatePickerType;
  disabled?: boolean;
  readonly?: boolean;
  placeholder?: string | Array<string>;
  allowClear?: boolean;
  simple?: boolean;
  max?: string;
  min?: string;
  range?: boolean;
  rangeSeparator?: string;
  size?: CommonSize;
  prefixIcon?: string;
  suffixIcon?: string;
  timestamp?: boolean;
  format?: string;
  inputFormat?: string;
  defaultValue?:
    | DatePickerModelValueSingleType
    | Array<DatePickerModelValueSingleType>;
  defaultTime?: string | Array<string>;
  contentStyle?: StyleValue;
  contentClass?: CommonClass;
  yearPage?: number;
  // yearStep?: number;
  shortcuts?: Array<Shortcuts>;
}

export type DatePickerEmits = {
  (e: "update:modelValue", value: string | Array<string>): void;
  (e: "change", value: string | Array<string>): void;
  (e: "blur", event: Event): void;
  (e: "focus", event: Event): void;
  (e: "clear"): void;
};

export type RequiredDatePickerProps = RequiredByKeys<
  DatePickerProps,
  | "type"
  | "disabled"
  | "readonly"
  | "allowClear"
  | "simple"
  | "range"
  | "rangeSeparator"
  | "prefixIcon"
  | "yearPage"
  // | "yearStep"
>;

export interface PanelPickerProps extends DatePickerProps {
  modelValue: Dayjs | Array<Dayjs>;
  defaultFormat: string;
}

export interface DatePickerContextType extends RequiredDatePickerProps {
  modelValue: Dayjs | Array<Dayjs>;
  defaultFormat: string;
}

export const DATE_PICKER_CONTEXT: InjectionKey<DatePickerContextType> =
  Symbol("LayDatePicker");

export interface Shortcuts {
  text: string | number;
  value:
    | DatePickerModelValueSingleType
    | Array<DatePickerModelValueSingleType>
    | (() => DatePickerModelValueSingleType)
    | (() => Array<DatePickerModelValueSingleType>);
}
