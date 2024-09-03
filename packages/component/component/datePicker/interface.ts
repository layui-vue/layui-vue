import type { Ref, StyleValue } from "vue";

export type DatePickerType = "date" | "datetime" | "year" | "time" | "month";

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

export interface DatePickerProps {
  name?: string;
  modelValue?: string | number | string[];
  type?: "date" | "datetime" | "year" | "month" | "time" | "yearmonth";
  disabled?: boolean;
  readonly?: boolean;
  placeholder?: string | string[];
  allowClear?: boolean;
  simple?: boolean;
  max?: string;
  min?: string;
  range?: boolean;
  rangeSeparator?: string;
  size?: "lg" | "md" | "sm" | "xs";
  prefixIcon?: string;
  suffixIcon?: string;
  timestamp?: boolean;
  format?: string;
  defaultTime?: string | string[];
  contentStyle?: StyleValue;
  contentClass?: string | Array<string | object> | object;
  yearPage?: number;
  yearStep?: number;
}
