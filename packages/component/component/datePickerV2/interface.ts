import type { Ref, StyleValue, Component, DefineComponent } from "vue";
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

export type DatePickerModelValueSingleType = number | string | Date;

export interface DatePickerProps {
  name?: string;
  modelValue?:
    | DatePickerModelValueSingleType
    | Array<DatePickerModelValueSingleType>;
  type?: DatePickerType;
  disabled?: boolean;
  readonly?: boolean;
  placeholder?: string | string[];
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
  defaultTime?: string | string[];
  contentStyle?: StyleValue;
  contentClass?: CommonClass;
  yearPage?: number;
  yearStep?: number;
}

export type DatePickerEmits = {
  (e: "update:modelValue", value: string | Array<string>): void;
  (e: "change", value: string | Array<string>): void;
  (e: "blur", event: Event): void;
  (e: "focus", event: Event): void;
  (e: "clear"): void;
};

export type provideType = {
  currentYear: Ref;
  currentMonth: Ref;
  currentDay: Ref;
  dateValue: Ref;
  hms: Ref;
  type: string;
  showPanel: Ref;
  clear: Function;
  now: Function;
  ok: Function;
  range: boolean;
  rangeValue: {
    first: string;
    last: string;
    hover: string;
    firstTime: { hh: number; mm: number; ss: number };
    lastTime: { hh: number; mm: number; ss: number };
  };
  rangeSeparator: string;
  simple: boolean;
  timestamp: boolean;
  max: Ref<string>;
  min: Ref<string>;
  defaultTime: string | string[];
  yearPage: Ref<number>;
  yearStep: Ref<number>;
};
