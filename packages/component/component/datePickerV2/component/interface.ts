import type { Dayjs } from "dayjs";
import type { DatePickerType, PanelPickerProps } from "../interface";

export interface BasePanelProps {
  modelValue: Dayjs;
  inputDate?: Dayjs;
  dateType?: DatePickerType;
  classes?: (val: Dayjs) => Record<string, boolean>;
}

export interface UniquePickerProps extends PanelPickerProps {
  modelValue: Dayjs;
}

export interface RangePickerProps extends PanelPickerProps {
  modelValue: Array<Dayjs>;
}

export interface DateContentSingleDateObject {
  day: number;
  value: number;
  isRange: boolean;
  isSelected: boolean;
  type: "prev" | "current" | "next";
}
