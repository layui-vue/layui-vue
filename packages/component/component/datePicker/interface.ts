import type { Dayjs, ConfigType } from "dayjs";
import type { StyleValue, Component, InjectionKey } from "vue";
import type { CommonSize, CommonClass } from "../../types/common";

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
  defaultTime?:
    | DatePickerModelValueSingleType
    | Array<DatePickerModelValueSingleType>;
  contentStyle?: StyleValue;
  contentClass?: CommonClass;
  /**
   * 年份分页
   * @version 2.19.0
   */
  yearPage?: number;
  // yearStep?: number;
  /**
   * 快捷选项
   * @version 2.19.0
   */
  shortcuts?: Array<Shortcuts>;
  /**
   * 静态面板
   * @version 2.19.0
   */
  static?: boolean;
}

export interface RequiredDatePickerProps
  extends /* @vue-ignore */ DatePickerProps {
  size: CommonSize;
  type: DatePickerType;
  disabled: boolean;
  readonly: boolean;
  allowClear: boolean;
  simple: boolean;
  range: boolean;
  rangeSeparator: string;
  prefixIcon: string;
  suffixIcon: string;
  timestamp: boolean;
  yearPage: number;
}

export type DatePickerEmits = {
  (e: "update:modelValue", value: string | Array<string>): void;
  (e: "change", value: string | Array<string>): void;
  (e: "blur", event: Event): void;
  (e: "focus", event: Event): void;
  (e: "clear"): void;
};

export type DatePickerValue = Dayjs | Array<Dayjs> | null | undefined;

export interface DatePickerContextType
  extends /* @vue-ignore */ RequiredDatePickerProps {
  modelValue: DatePickerValue;
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
