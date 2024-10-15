import type { Dayjs } from "dayjs";
import type {
  DatePickerType,
  DatePickerContextType,
  DatePickerValue,
} from "../interface";

export interface BasePanelProps {
  modelValue: Exclude<DatePickerValue, Array<Dayjs>>;
  showDate: Dayjs;
  dateType?: DatePickerType;
  classes?: (val: Dayjs) => Record<string, boolean>;
}

export type UniquePickerProps = DatePickerContextType & {
  modelValue: Exclude<DatePickerValue, Array<Dayjs>>;
};

export type RangePickerProps = DatePickerContextType & {
  modelValue: Array<Dayjs>;
};

export interface DateContentSingleDateObject {
  day: number;
  value: number;
  isRange: boolean;
  isSelected: boolean;
  type: "prev" | "current" | "next";
}
