import type {
  DatePickerModelValueSingleType,
  DatePickerRenderComponentProps,
} from "../interface";

import dayjs from "dayjs";

export function useBaseDatePicker(props: DatePickerRenderComponentProps) {
  const getDefaultValue = () => {
    const _defaultValue = dayjs(
      props.defaultValue as DatePickerModelValueSingleType,
    );

    return _defaultValue.isValid()
      ? _defaultValue.startOf("day")
      : dayjs().startOf("day");
  };

  return { getDefaultValue };
}
