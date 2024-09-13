import type { Dayjs } from "dayjs";
import type { DatePickerType, PanelPickerProps } from "../interface";

export interface BasePanelProps {
  modelValue: Dayjs;
  dateType: DatePickerType;
}

export interface UniquePickerProps extends PanelPickerProps {
  modelValue: Dayjs;
}
