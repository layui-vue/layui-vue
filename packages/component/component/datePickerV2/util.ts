import dayjs, { type Dayjs } from "dayjs";
import type { DatePickerModelValueSingleType } from "./interface";

export const normalizeDayjsValue = (
  value: DatePickerModelValueSingleType,
  format: string
) => {
  const date = dayjs(value, format);

  return date.isValid() ? date : dayjs(value);
};

export const dayjsToString = (
  value: DatePickerModelValueSingleType,
  format: string
) => {
  const date = dayjs(value, format);

  return date.isValid()
    ? dayjs(value, format).format(format)
    : dayjs(value).isValid()
    ? dayjs(value).format(format)
    : "";
};

export const checkRangeValue = (values: Array<Dayjs | null>) => {
  const [start, end] = values;
  if (!start || !end) return false;
  return start.isValid() && end.isValid();
};
