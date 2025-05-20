import type { Dayjs } from "dayjs";
import type {
  DatePickerRenderComponentProps,
  DatePickerType,
  DatePickerValueNotArray,
} from "../interface";

export interface BasePanelProps {
  modelValue: DatePickerValueNotArray;
  showDate: Dayjs;
  dateType?: DatePickerType;
  classes?: (val: Dayjs) => Record<string, boolean>;
}

export interface UniquePickerProps extends DatePickerRenderComponentProps {
  modelValue: DatePickerValueNotArray;
}

export interface RangePickerProps extends DatePickerRenderComponentProps {
  modelValue: Array<Dayjs>;
}

export interface DateContentSingleDateObject {
  day: number;
  value: number;
  isRange: boolean;
  isSelected: boolean;
  type: "prev" | "current" | "next";
}
