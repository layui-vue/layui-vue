import dayjs from "dayjs";
import type { DatePickerModelValueSingleType } from "./interface";

export const normalizeDayjsValue = (
  value: DatePickerModelValueSingleType,
  format: string
) => {
  const date = dayjs(value, format);

  return date.isValid() ? date : dayjs(value);
};
