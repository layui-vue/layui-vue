import dayjs, { type Dayjs } from "dayjs";
import { inject } from "vue";
import {
  DATE_PICKER_CONTEXT,
  type Shortcuts,
  type DatePickerModelValueSingleType,
} from "../interface";

import { normalizeDayjsValue } from "../util";
import { isFunction } from "../../../utils";

export const useShortcutsRange = () => {
  const DatePickerContext = inject(DATE_PICKER_CONTEXT)!;

  const handleChangeShortcut = (shortcuts: Shortcuts): Array<Dayjs> => {
    const dates = (
      isFunction(shortcuts.value) ? shortcuts.value() : shortcuts.value
    ) as Array<DatePickerModelValueSingleType>;

    return [
      normalizeDayjsValue(dates[0], DatePickerContext.format!),
      normalizeDayjsValue(dates[1], DatePickerContext.format!),
    ].filter(Boolean) as Array<Dayjs>;
  };

  return handleChangeShortcut;
};
