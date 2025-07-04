import type {
  DatePickerModelValueSingleType,
  DatePickerRenderComponentProps,
} from "../interface";

import { isArray } from "@layui/component/utils";
import dayjs from "dayjs";
import { computed } from "vue";
import { normalizeDayjsValue } from "../util";

export function useBaseDatePicker(props: DatePickerRenderComponentProps) {
  const getDefaultValue = () => {
    const _defaultValue = dayjs(
      props.defaultValue as DatePickerModelValueSingleType,
    );

    return _defaultValue.isValid()
      ? _defaultValue.startOf("day")
      : dayjs().startOf("day");
  };

  const defaultTimeValue = computed(() => {
    if (props.type !== "datetime")
      return [];

    const times = isArray(props.defaultTime)
      ? props.defaultTime
      : [props.defaultTime, props.defaultTime];

    return times.map(t => normalizeDayjsValue(t, "HH:mm:ss"));
  });

  return { defaultTimeValue, getDefaultValue };
}

export type UseBaseDatePicker = ReturnType<typeof useBaseDatePicker>;
