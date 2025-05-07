import type { DropdownTeleportProps } from "@layui/component/component/dropdown/interface";
import type { CommonClass, CommonSize } from "@layui/component/types/common";
import type { ConfigType, Dayjs } from "dayjs";
import type { Component, InjectionKey, Slots, StyleValue } from "vue";

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
  disabledDate?: (date: Date) => boolean;
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
   * @version 2.22.1
   */
  static?: boolean;
  teleportProps?: DropdownTeleportProps;
}

export interface RequiredDatePickerProps extends DatePickerProps {
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

export interface DatePickerEmits {
  (e: "update:modelValue", value: string | Array<string>): void;
  (e: "change", value: string | Array<string>): void;
  (e: "blur", event: Event): void;
  (e: "focus", event: Event): void;
  (e: "clear"): void;
}

export type DatePickerValue = Dayjs | Array<Dayjs> | null | undefined;
export type DatePickerValueNotArray = Exclude<DatePickerValue, Array<Dayjs>>;

export interface DatePickerRenderComponentProps extends RequiredDatePickerProps {
  modelValue: DatePickerValue;
}

export interface DatePickerContextType extends RequiredDatePickerProps {
  modelValue: DatePickerValue;
  datePickerSlots: Slots;
}

export const DATE_PICKER_CONTEXT: InjectionKey<DatePickerContextType>
  = Symbol("LayDatePicker");

export interface Shortcuts {
  text: string | number;
  value:
    | DatePickerModelValueSingleType
    | Array<DatePickerModelValueSingleType>
    | (() => DatePickerModelValueSingleType)
    | (() => Array<DatePickerModelValueSingleType>);
}

export interface DatePickerDefaultSlotParams {
  type: "date" | "month" | "year";
  unix: number;
  dayjs: Dayjs;
}

export interface DatePickerFooterSlotParams {
  current: DatePickerValueNotArray;
  start: DatePickerValueNotArray;
  end: DatePickerValueNotArray;
}

export type DatePickerRenderProps = Partial<DatePickerDefaultSlotParams> & Partial<DatePickerFooterSlotParams> & {
  /**
   * @type base
   * DatePicker组件插槽名
   */
  render?: string;
};
